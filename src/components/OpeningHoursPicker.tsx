import React, { useState, useEffect } from 'react';
import { Checkbox, TimePicker, Button, Space } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

interface TimeRange {
  start: Dayjs;
  end: Dayjs;
}

interface DaySchedule {
  enabled: boolean;
  timeRanges: TimeRange[];
}

interface OpeningHoursPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_ABBREVIATIONS: Record<string, string> = {
  'Monday': 'Mo',
  'Tuesday': 'Tu',
  'Wednesday': 'We',
  'Thursday': 'Th',
  'Friday': 'Fr',
  'Saturday': 'Sa',
  'Sunday': 'Su'
};
const DEFAULT_START_TIME = '09:00';
const DEFAULT_END_TIME = '18:00';

const parseTimeString = (timeStr: string): Dayjs => {
  const baseDate = dayjs().startOf('day');
  const [hours, minutes] = timeStr.split(':').map(Number);
  return baseDate.hour(hours).minute(minutes);
};

const mergeTimeRanges = (ranges: TimeRange[]): TimeRange[] => {
  if (ranges.length <= 1) return ranges;

  // Convert times to minutes since midnight for easier comparison
  const toMinutes = (time: Dayjs) => time.hour() * 60 + time.minute();
  const fromMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return dayjs().startOf('day').hour(hours).minute(mins);
  };

  // Sort ranges by start time
  const sortedRanges = [...ranges].sort((a, b) => 
    toMinutes(a.start) - toMinutes(b.start)
  );

  const merged: TimeRange[] = [];
  let current = sortedRanges[0];

  for (let i = 1; i < sortedRanges.length; i++) {
    const next = sortedRanges[i];
    const currentEndMinutes = toMinutes(current.end);
    const nextStartMinutes = toMinutes(next.start);
    
    // Check if ranges overlap or are continuous (end time of current = start time of next)
    if (currentEndMinutes >= nextStartMinutes - 1) {
      // Merge the ranges
      current = {
        start: current.start,
        end: toMinutes(current.end) > toMinutes(next.end) ? current.end : next.end
      };
    } else {
      merged.push(current);
      current = next;
    }
  }
  merged.push(current);

  return merged;
};

const parseOpeningHours = (value: string): Record<string, DaySchedule> => {
  const schedule: Record<string, DaySchedule> = DAYS.reduce((acc, day) => {
    acc[day] = {
      enabled: false,
      timeRanges: [{
        start: parseTimeString(DEFAULT_START_TIME),
        end: parseTimeString(DEFAULT_END_TIME)
      }]
    };
    return acc;
  }, {} as Record<string, DaySchedule>);

  if (!value) return schedule;

  const dayGroups = value.split(';').map(group => group.trim()).filter(Boolean);

  dayGroups.forEach(group => {
    const [daysStr, ...timeRangesStr] = group.split(' ');
    const days = daysStr.split(',');
    const timeRanges = timeRangesStr.map(timeRange => {
      const [start, end] = timeRange.split('-');
      return {
        start: parseTimeString(start),
        end: parseTimeString(end)
      };
    });

    DAYS.forEach(day => {
      const abbr = DAY_ABBREVIATIONS[day];
      if (days.includes(abbr)) {
        schedule[day] = {
          enabled: true,
          timeRanges: timeRanges
        };
      }
    });
  });

  return schedule;
};

const formatOpeningHours = (schedule: Record<string, DaySchedule>): string => {
  const timeRangeGroups = new Map<string, string[]>();

  DAYS.forEach(day => {
    if (!schedule[day].enabled) return;

    const sortedRanges = mergeTimeRanges(schedule[day].timeRanges);
    const timeRangesStr = sortedRanges
      .map(range => `${range.start.format('HH:mm')}-${range.end.format('HH:mm')}`)
      .join(', ');

    const existing = timeRangeGroups.get(timeRangesStr) || [];
    existing.push(DAY_ABBREVIATIONS[day]);
    timeRangeGroups.set(timeRangesStr, existing);
  });

  const parts: string[] = [];
  timeRangeGroups.forEach((days, timeRanges) => {
    if (days.length > 0) {
      parts.push(`${days.join(',')} ${timeRanges}`);
    }
  });

  return parts.join('; ');
};

const OpeningHoursPicker: React.FC<OpeningHoursPickerProps> = ({ value = '', onChange }) => {
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>(() => parseOpeningHours(value));

  useEffect(() => {
    const formattedValue = formatOpeningHours(schedule);
    if (formattedValue !== value) {
      onChange?.(formattedValue);
    }
  }, [schedule, value, onChange]);

  const handleDayToggle = (day: string) => (e: CheckboxChangeEvent) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: e.target.checked
      }
    }));
  };

  const handleTimeChange = (day: string, rangeIndex: number, type: 'start' | 'end') => (time: Dayjs | null) => {
    if (!time) return;

    setSchedule(prev => {
      const newSchedule = { ...prev };
      newSchedule[day] = {
        ...newSchedule[day],
        timeRanges: [...newSchedule[day].timeRanges]
      };
      newSchedule[day].timeRanges[rangeIndex] = {
        ...newSchedule[day].timeRanges[rangeIndex],
        [type]: time
      };

      return newSchedule;
    });
  };

  const addTimeRange = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeRanges: [
          ...prev[day].timeRanges,
          {
            start: parseTimeString(DEFAULT_START_TIME),
            end: parseTimeString(DEFAULT_END_TIME)
          }
        ]
      }
    }));
  };

  return (
    <div className="space-y-4">
      {DAYS.map(day => (
        <div key={day} className="flex items-center space-x-4">
          <Checkbox
            checked={schedule[day].enabled}
            onChange={handleDayToggle(day)}
            className="w-32"
          >
            {day}
          </Checkbox>
          <div className="flex-1">
            {schedule[day].timeRanges.map((range, index) => (
              <Space key={index} className="mb-2" size="small">
                <TimePicker
                  value={range.start}
                  format="HH:mm"
                  onChange={handleTimeChange(day, index, 'start')}
                  disabled={!schedule[day].enabled}
                />
                <span>-</span>
                <TimePicker
                  value={range.end}
                  format="HH:mm"
                  onChange={handleTimeChange(day, index, 'end')}
                  disabled={!schedule[day].enabled}
                />
              </Space>
            ))}
          </div>
          <Button
            type="text"
            onClick={() => addTimeRange(day)}
            disabled={!schedule[day].enabled}
          >
            +
          </Button>
        </div>
      ))}
    </div>
  );
};

export default OpeningHoursPicker;
