export interface ColumnInfo {
  name: string;
  type: string;
  description?: string;
}

export interface TableInfo {
  name: string;
  description: string;
  columns: ColumnInfo[];
  tags: string[];
}

export const MOCK_TABLES: TableInfo[] = [
  {
    name: "cpu_usage",
    description: "CPU usage metrics per host",
    tags: ["host", "region", "cpu"],
    columns: [
      { name: "time", type: "TIMESTAMP", description: "Measurement timestamp" },
      { name: "host", type: "STRING", description: "Hostname" },
      { name: "region", type: "STRING", description: "Cloud region" },
      { name: "cpu", type: "STRING", description: "CPU core identifier" },
      { name: "usage_idle", type: "FLOAT", description: "CPU idle percentage" },
      {
        name: "usage_user",
        type: "FLOAT",
        description: "CPU user space percentage",
      },
      {
        name: "usage_system",
        type: "FLOAT",
        description: "CPU system percentage",
      },
      {
        name: "usage_iowait",
        type: "FLOAT",
        description: "CPU IO wait percentage",
      },
    ],
  },
  {
    name: "memory_usage",
    description: "Memory usage metrics per host",
    tags: ["host", "region"],
    columns: [
      { name: "time", type: "TIMESTAMP" },
      { name: "host", type: "STRING" },
      { name: "region", type: "STRING" },
      {
        name: "used_percent",
        type: "FLOAT",
        description: "Memory used percentage",
      },
      { name: "used", type: "BIGINT", description: "Used memory in bytes" },
      {
        name: "available",
        type: "BIGINT",
        description: "Available memory in bytes",
      },
      { name: "total", type: "BIGINT", description: "Total memory in bytes" },
    ],
  },
  {
    name: "disk_io",
    description: "Disk I/O metrics per host and device",
    tags: ["host", "device", "region"],
    columns: [
      { name: "time", type: "TIMESTAMP" },
      { name: "host", type: "STRING" },
      {
        name: "device",
        type: "STRING",
        description: "Block device name (e.g. sda)",
      },
      { name: "region", type: "STRING" },
      {
        name: "read_bytes",
        type: "BIGINT",
        description: "Bytes read per second",
      },
      {
        name: "write_bytes",
        type: "BIGINT",
        description: "Bytes written per second",
      },
      { name: "iops", type: "FLOAT", description: "IO operations per second" },
      {
        name: "read_time",
        type: "BIGINT",
        description: "Time spent reading (ms)",
      },
      {
        name: "write_time",
        type: "BIGINT",
        description: "Time spent writing (ms)",
      },
    ],
  },
  {
    name: "network_traffic",
    description: "Network interface traffic metrics",
    tags: ["host", "interface", "region"],
    columns: [
      { name: "time", type: "TIMESTAMP" },
      { name: "host", type: "STRING" },
      {
        name: "interface",
        type: "STRING",
        description: "Network interface (e.g. eth0)",
      },
      { name: "region", type: "STRING" },
      {
        name: "bytes_sent",
        type: "BIGINT",
        description: "Bytes sent per second",
      },
      {
        name: "bytes_recv",
        type: "BIGINT",
        description: "Bytes received per second",
      },
      { name: "packets_sent", type: "BIGINT" },
      { name: "packets_recv", type: "BIGINT" },
      { name: "err_in", type: "BIGINT", description: "Inbound errors" },
      { name: "err_out", type: "BIGINT", description: "Outbound errors" },
    ],
  },
  {
    name: "http_requests",
    description: "HTTP request metrics per service and endpoint",
    tags: ["service", "endpoint", "method", "status_code"],
    columns: [
      { name: "time", type: "TIMESTAMP" },
      { name: "service", type: "STRING", description: "Service name" },
      { name: "endpoint", type: "STRING", description: "API endpoint path" },
      {
        name: "method",
        type: "STRING",
        description: "HTTP method (GET, POST, etc.)",
      },
      {
        name: "status_code",
        type: "INT",
        description: "HTTP response status code",
      },
      {
        name: "response_time_ms",
        type: "FLOAT",
        description: "Response time in milliseconds",
      },
      {
        name: "request_count",
        type: "BIGINT",
        description: "Number of requests",
      },
      { name: "error_count", type: "BIGINT", description: "Number of errors" },
    ],
  },
  {
    name: "response_time",
    description: "Latency percentiles per service and endpoint",
    tags: ["service", "endpoint", "region"],
    columns: [
      { name: "time", type: "TIMESTAMP" },
      { name: "service", type: "STRING" },
      { name: "endpoint", type: "STRING" },
      { name: "region", type: "STRING" },
      {
        name: "p50",
        type: "FLOAT",
        description: "50th percentile latency (ms)",
      },
      {
        name: "p90",
        type: "FLOAT",
        description: "90th percentile latency (ms)",
      },
      {
        name: "p99",
        type: "FLOAT",
        description: "99th percentile latency (ms)",
      },
      {
        name: "p999",
        type: "FLOAT",
        description: "99.9th percentile latency (ms)",
      },
    ],
  },
  {
    name: "active_users",
    description: "Active user counts per app and region",
    tags: ["app", "region", "platform"],
    columns: [
      { name: "time", type: "TIMESTAMP" },
      { name: "app", type: "STRING" },
      { name: "region", type: "STRING" },
      { name: "platform", type: "STRING", description: "web, ios, android" },
      { name: "count", type: "BIGINT", description: "Number of active users" },
      { name: "new_users", type: "BIGINT" },
      { name: "returning_users", type: "BIGINT" },
    ],
  },
  {
    name: "temperature_sensors",
    description: "IoT temperature sensor readings",
    tags: ["sensor_id", "location", "building"],
    columns: [
      { name: "time", type: "TIMESTAMP" },
      { name: "sensor_id", type: "STRING" },
      { name: "location", type: "STRING" },
      { name: "building", type: "STRING" },
      { name: "floor", type: "INT" },
      {
        name: "temperature_c",
        type: "FLOAT",
        description: "Temperature in Celsius",
      },
      {
        name: "humidity_pct",
        type: "FLOAT",
        description: "Relative humidity %",
      },
    ],
  },
  {
    name: "database_queries",
    description: "Database query performance metrics",
    tags: ["db_name", "query_type", "host"],
    columns: [
      { name: "time", type: "TIMESTAMP" },
      { name: "db_name", type: "STRING" },
      {
        name: "query_type",
        type: "STRING",
        description: "SELECT, INSERT, UPDATE, DELETE",
      },
      { name: "host", type: "STRING" },
      {
        name: "duration_ms",
        type: "FLOAT",
        description: "Query duration in milliseconds",
      },
      { name: "rows_affected", type: "BIGINT" },
      {
        name: "slow_query",
        type: "BOOLEAN",
        description: "Whether query exceeded threshold",
      },
    ],
  },
  {
    name: "error_logs",
    description: "Application error and log events",
    tags: ["service", "level", "host"],
    columns: [
      { name: "time", type: "TIMESTAMP" },
      { name: "service", type: "STRING" },
      {
        name: "level",
        type: "STRING",
        description: "ERROR, WARN, INFO, DEBUG",
      },
      { name: "host", type: "STRING" },
      { name: "message", type: "STRING" },
      { name: "count", type: "BIGINT" },
      { name: "stack_trace", type: "STRING" },
    ],
  },
];

export function getTableByName(name: string): TableInfo | undefined {
  return MOCK_TABLES.find((t) => t.name.toLowerCase() === name.toLowerCase());
}
