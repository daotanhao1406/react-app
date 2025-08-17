export interface MenuSegment {
  id: number;
  isSelected?: boolean;
  isActive?: boolean;
  icon?: string;
}

export interface ActionButton {
  id: string;
  icon: string;
  position: 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left';
  variant: 'primary' | 'danger' | 'success' | 'cyan' | 'teal' | 'gray';
}

export interface CenterAction {
  id: string;
  label: string;
  icon?: string;
  variant?: 'default' | 'apply';
}

export interface RadialActionMenuProps {
  isOpen: boolean;
  segments: MenuSegment[];
  actionButtons: ActionButton[];
  centerContent: {
    title: string;
    actions: CenterAction[];
  };
  selectedSector?: number;
  onSegmentSelect: (segmentId: number) => void;
  onActionSelect: (actionId: string) => void;
  onCenterActionClick: (actionId: string) => void;
}
