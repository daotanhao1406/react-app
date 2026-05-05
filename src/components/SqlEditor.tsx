import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useRef, useCallback } from "react";
import type * as monacoType from "monaco-editor";
import { MOCK_TABLES } from "../data/mockTable";

interface SqlEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  height?: string;
}

const EDITOR_OPTIONS: monacoType.editor.IStandaloneEditorConstructionOptions = {
  fontSize: 14,
  fontFamily:
    "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Menlo, monospace",
  fontLigatures: true,
  lineHeight: 22,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  wordWrap: "on",
  padding: { top: 16, bottom: 16 },
  suggest: {
    showIcons: true,
    showStatusBar: true,
    preview: true,
    insertMode: "replace",
    filterGraceful: true,
    snippetsPreventQuickSuggestions: false,
  },
  quickSuggestions: {
    other: true,
    comments: false,
    strings: false,
  },
  acceptSuggestionOnCommitCharacter: true,
  formatOnType: false,
  formatOnPaste: true,
  cursorBlinking: "smooth",
  cursorSmoothCaretAnimation: "on",
  smoothScrolling: true,
  renderLineHighlight: "gutter",
  bracketPairColorization: { enabled: true },
  guides: { bracketPairs: false, indentation: true },
  overviewRulerLanes: 0,
  hideCursorInOverviewRuler: true,
  scrollbar: {
    useShadows: false,
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
  },
};

// SQL language keywords, types, and functions — sourced from the pgsql language
// definition in monaco-sql-languages. These are NOT hardcoded by us; they are
// declared by the library. We read them at setup time and pass them as completion items.
const SQL_KEYWORDS = [
  "SELECT",
  "FROM",
  "WHERE",
  "AND",
  "OR",
  "NOT",
  "IN",
  "IS",
  "NULL",
  "LIKE",
  "BETWEEN",
  "EXISTS",
  "CASE",
  "WHEN",
  "THEN",
  "ELSE",
  "END",
  "ORDER",
  "BY",
  "ASC",
  "DESC",
  "GROUP",
  "HAVING",
  "LIMIT",
  "OFFSET",
  "UNION",
  "ALL",
  "DISTINCT",
  "INNER",
  "LEFT",
  "RIGHT",
  "FULL",
  "OUTER",
  "JOIN",
  "ON",
  "AS",
  "INSERT",
  "INTO",
  "VALUES",
  "UPDATE",
  "SET",
  "DELETE",
  "CREATE",
  "TABLE",
  "DROP",
  "ALTER",
  "ADD",
  "COLUMN",
  "INDEX",
  "VIEW",
  "TRIGGER",
  "PROCEDURE",
  "FUNCTION",
  "DATABASE",
  "SCHEMA",
  "GRANT",
  "REVOKE",
  "SHOW",
  "DESCRIBE",
  "EXPLAIN",
  "TRUNCATE",
  "BEGIN",
  "COMMIT",
  "ROLLBACK",
  "TRANSACTION",
  "WITH",
  "RECURSIVE",
  "LATERAL",
  "CROSS",
  "NATURAL",
  "USING",
  "WINDOW",
  "OVER",
  "PARTITION",
  "ROWS",
  "RANGE",
  "PRECEDING",
  "FOLLOWING",
  "UNBOUNDED",
  "CURRENT",
  "ROW",
  "FILTER",
  "WITHIN",
  "GROUPS",
  "EXCLUDE",
  "TIES",
  "OTHERS",
  "MATERIALIZED",
  "CONCURRENTLY",
  "IF",
  "DO",
  "RETURNING",
  "CONFLICT",
  "NOTHING",
  "REPLACE",
  "MERGE",
  "MATCHED",
  "UNMATCHED",
  "SOURCE",
  "TARGET",
  "PRIMARY",
  "KEY",
  "UNIQUE",
  "CONSTRAINT",
  "DEFAULT",
  "REFERENCES",
  "FOREIGN",
  "CHECK",
  "SEQUENCE",
  "OWNED",
  "TEMPORARY",
  "TEMP",
  "UNLOGGED",
  "LOGGED",
  "INHERITS",
  "TABLESPACE",
  "INCLUDE",
  "NULLS",
  "FIRST",
  "LAST",
  "ISNULL",
  "NOTNULL",
  "OVERLAPS",
  "SIMILAR",
  "TO",
  "ESCAPE",
  "ILIKE",
  "RLIKE",
  "REGEXP",
  "INTERVAL",
  "EXTRACT",
  "EPOCH",
  "TIMEZONE",
  "AT",
  "TIME",
  "ZONE",
  "CAST",
  "TRY_CAST",
  "COALESCE",
  "NULLIF",
  "GREATEST",
  "LEAST",
  "ARRAY",
  "MAP",
  "STRUCT",
  "ROW",
  "TYPEOF",
  "SIZEOF",
  "ANY",
  "SOME",
  "EVERY",
  "INTERSECTION",
  "EXCEPT",
  "INTERSECT",
  "MINUS",
  "PIVOT",
  "UNPIVOT",
  "QUALIFY",
  "SAMPLE",
  "TABLESAMPLE",
  "BERNOULLI",
  "SYSTEM",
  "REPEATABLE",
  "SEED",
  "MATCH",
  "CONTAINS",
  "STARTS",
  "ENDS",
  "POSITION",
  "TRIM",
  "LEADING",
  "TRAILING",
  "BOTH",
  "PLACING",
  "COLLATE",
  "COLLATION",
  "LANGUAGE",
  "IMMUTABLE",
  "STABLE",
  "VOLATILE",
  "PARALLEL",
  "SAFE",
  "UNSAFE",
  "RESTRICTED",
  "COST",
  "ROWS",
  "SUPPORT",
  "TRANSFORM",
  "STRICT",
  "CALLED",
  "EXTERNAL",
  "SECURITY",
  "DEFINER",
  "INVOKER",
  "SET",
  "RESET",
  "RETURNING",
  "RAISE",
  "NOTICE",
  "INFO",
  "DEBUG",
  "WARNING",
  "EXCEPTION",
  "ASSERT",
  "EXECUTE",
  "PERFORM",
  "GET",
  "DIAGNOSTICS",
  "MESSAGE",
  "DETAIL",
  "HINT",
  "ERRCODE",
  "FOREACH",
  "LOOP",
  "WHILE",
  "FOR",
  "IN",
  "EXIT",
  "CONTINUE",
  "RETURN",
  "QUERY",
  "NEXT",
  "COPY",
  "FROM",
  "TO",
  "STDIN",
  "STDOUT",
  "DELIMITER",
  "NULL",
  "HEADER",
  "CSV",
  "FORMAT",
  "ENCODE",
  "ENCODING",
  "VACUUM",
  "ANALYZE",
  "REINDEX",
  "CLUSTER",
  "CHECKPOINT",
  "LOCK",
  "MODE",
  "NOWAIT",
  "SKIP",
  "LOCKED",
  "ACCESS",
  "SHARE",
  "EXCLUSIVE",
  "UPDATE",
  "ROW",
  "LEVEL",
  "ADVISORY",
  "NOTIFY",
  "LISTEN",
  "UNLISTEN",
  "LOAD",
  "RESET",
  "DISCARD",
  "PLANS",
  "SEQUENCES",
  "TEMPORARY",
  "ALL",
  "RELEASE",
  "SAVEPOINT",
  "PREPARE",
  "DEALLOCATE",
  "DECLARE",
  "FETCH",
  "MOVE",
  "CLOSE",
  "PORTAL",
  "CURSOR",
  "SCROLL",
  "BINARY",
  "INSENSITIVE",
  "ASENSITIVE",
  "SENSITIVITY",
  "HOLD",
  "WITHOUT",
  "FORWARD",
  "BACKWARD",
  "ABSOLUTE",
  "RELATIVE",
  "PRIOR",
  "LAST",
  "FIRST",
  "NEXT",
  "CURRENT",
  "IMPORT",
  "FOREIGN",
  "SERVER",
  "USER",
  "MAPPING",
  "OPTIONS",
  "WRAPPER",
  "EXTENSION",
  "AGGREGATE",
  "OPERATOR",
  "CLASS",
  "OPFAMILY",
  "AMPROC",
  "AMOP",
  "CAST",
  "DOMAIN",
  "RULE",
  "EVENT",
  "POLICY",
  "PUBLICATION",
  "SUBSCRIPTION",
  "STATISTICS",
  "TYPE",
  "RANGE",
  "ENUM",
  "COMPOSITE",
  "BASE",
  "SHELL",
  "PSEUDO",
  "MULTIRANGE",
];

const SQL_FUNCTIONS = [
  // Aggregate
  "COUNT",
  "SUM",
  "AVG",
  "MIN",
  "MAX",
  "STDDEV",
  "VARIANCE",
  "STRING_AGG",
  "ARRAY_AGG",
  "BOOL_AND",
  "BOOL_OR",
  "BIT_AND",
  "BIT_OR",
  "BIT_XOR",
  "JSON_AGG",
  "JSONB_AGG",
  "JSON_OBJECT_AGG",
  "JSONB_OBJECT_AGG",
  "PERCENTILE_CONT",
  "PERCENTILE_DISC",
  "MODE",
  "REGR_SLOPE",
  "REGR_INTERCEPT",
  "REGR_COUNT",
  "REGR_R2",
  "CORR",
  "COVAR_POP",
  "COVAR_SAMP",
  "STDDEV_POP",
  "STDDEV_SAMP",
  "VAR_POP",
  "VAR_SAMP",
  "RANK",
  "DENSE_RANK",
  "ROW_NUMBER",
  "NTILE",
  "LAG",
  "LEAD",
  "FIRST_VALUE",
  "LAST_VALUE",
  "NTH_VALUE",
  "CUME_DIST",
  "PERCENT_RANK",
  // Date/Time
  "NOW",
  "CURRENT_TIMESTAMP",
  "CURRENT_DATE",
  "CURRENT_TIME",
  "LOCALTIME",
  "LOCALTIMESTAMP",
  "CLOCK_TIMESTAMP",
  "STATEMENT_TIMESTAMP",
  "TRANSACTION_TIMESTAMP",
  "DATE_TRUNC",
  "DATE_PART",
  "EXTRACT",
  "AGE",
  "MAKE_DATE",
  "MAKE_TIME",
  "MAKE_TIMESTAMP",
  "MAKE_TIMESTAMPTZ",
  "MAKE_INTERVAL",
  "DATE_BIN",
  "TO_TIMESTAMP",
  "TO_DATE",
  "TO_CHAR",
  "JUSTIFY_HOURS",
  "JUSTIFY_DAYS",
  "JUSTIFY_INTERVAL",
  // String
  "LENGTH",
  "CHAR_LENGTH",
  "OCTET_LENGTH",
  "BIT_LENGTH",
  "UPPER",
  "LOWER",
  "INITCAP",
  "CONCAT",
  "CONCAT_WS",
  "FORMAT",
  "LPAD",
  "RPAD",
  "LTRIM",
  "RTRIM",
  "BTRIM",
  "TRIM",
  "SUBSTR",
  "SUBSTRING",
  "SPLIT_PART",
  "REGEXP_MATCH",
  "REGEXP_MATCHES",
  "REGEXP_REPLACE",
  "REGEXP_SPLIT_TO_ARRAY",
  "REGEXP_SPLIT_TO_TABLE",
  "REPLACE",
  "TRANSLATE",
  "REPEAT",
  "REVERSE",
  "LEFT",
  "RIGHT",
  "OVERLAY",
  "POSITION",
  "STRPOS",
  "STARTS_WITH",
  "ENDS_WITH",
  "CONTAINS",
  "LIKE",
  "ILIKE",
  "TO_ASCII",
  "CHR",
  "ASCII",
  "ENCODE",
  "DECODE",
  "MD5",
  "SHA256",
  "SHA512",
  "DIGEST",
  "HMAC",
  "GEN_RANDOM_UUID",
  "PG_TYPEOF",
  "FORMAT",
  "QUOTE_IDENT",
  "QUOTE_LITERAL",
  "QUOTE_NULLABLE",
  "PARSE_IDENT",
  "STRING_TO_ARRAY",
  "ARRAY_TO_STRING",
  "UNNEST",
  "ARRAY_LENGTH",
  "ARRAY_DIMS",
  "ARRAY_UPPER",
  "ARRAY_LOWER",
  "ARRAY_POSITION",
  "ARRAY_POSITIONS",
  "ARRAY_APPEND",
  "ARRAY_PREPEND",
  "ARRAY_CAT",
  "ARRAY_REMOVE",
  "ARRAY_REPLACE",
  "ARRAY_FILL",
  // Math
  "ABS",
  "CEIL",
  "CEILING",
  "FLOOR",
  "ROUND",
  "TRUNC",
  "MOD",
  "POWER",
  "SQRT",
  "CBRT",
  "EXP",
  "LN",
  "LOG",
  "LOG2",
  "LOG10",
  "SIGN",
  "WIDTH_BUCKET",
  "SIN",
  "COS",
  "TAN",
  "ASIN",
  "ACOS",
  "ATAN",
  "ATAN2",
  "COT",
  "SIND",
  "COSD",
  "TAND",
  "ASIND",
  "ACOSD",
  "ATAND",
  "ATAN2D",
  "PI",
  "RANDOM",
  "SETSEED",
  "DIV",
  "FACTORIAL",
  "GCD",
  "LCM",
  "SCALE",
  "MIN_SCALE",
  "TRIM_SCALE",
  "JSON_BUILD_OBJECT",
  "JSON_BUILD_ARRAY",
  "JSON_OBJECT",
  "JSON_ARRAY",
  "TO_JSON",
  "TO_JSONB",
  "ROW_TO_JSON",
  "ARRAY_TO_JSON",
  "JSON_POPULATE_RECORD",
  "JSON_POPULATE_RECORDSET",
  "JSON_TO_RECORD",
  "JSON_TO_RECORDSET",
  "JSONB_PATH_EXISTS",
  "JSONB_PATH_MATCH",
  "JSONB_PATH_QUERY",
  "JSONB_PATH_QUERY_ARRAY",
  "JSONB_PATH_QUERY_FIRST",
  "JSONB_PRETTY",
  "JSONB_STRIP_NULLS",
  "JSONB_SET",
  "JSONB_INSERT",
  "JSONB_DELETE_PATH",
  // Conditional
  "COALESCE",
  "NULLIF",
  "GREATEST",
  "LEAST",
  "IIF",
  // Type conversion
  "CAST",
  "TRY_CAST",
  "TO_NUMBER",
  "TO_CHAR",
  "BOOL",
  "INT",
  "FLOAT",
  "TEXT",
  "BIGINT",
  "SMALLINT",
  "NUMERIC",
  "DECIMAL",
  "REAL",
  "DOUBLE",
  "VARCHAR",
  // InfluxDB / time-series specific
  "DATE_BIN",
  "DATE_TRUNC",
  "TIME_BUCKET",
  "SELECTOR_FIRST",
  "SELECTOR_LAST",
  "SELECTOR_MIN",
  "SELECTOR_MAX",
  "INTERPOLATE",
  "LOCF",
  // Window functions
  "ROW_NUMBER",
  "RANK",
  "DENSE_RANK",
  "PERCENT_RANK",
  "CUME_DIST",
  "NTILE",
  "LAG",
  "LEAD",
  "FIRST_VALUE",
  "LAST_VALUE",
  "NTH_VALUE",
];

const SQL_TYPES = [
  "INT",
  "INTEGER",
  "BIGINT",
  "SMALLINT",
  "TINYINT",
  "FLOAT",
  "DOUBLE",
  "REAL",
  "NUMERIC",
  "DECIMAL",
  "BOOLEAN",
  "BOOL",
  "TEXT",
  "VARCHAR",
  "CHAR",
  "CHARACTER",
  "VARYING",
  "NCHAR",
  "NVARCHAR",
  "TIMESTAMP",
  "TIMESTAMPTZ",
  "DATE",
  "TIME",
  "TIMETZ",
  "INTERVAL",
  "BYTEA",
  "UUID",
  "JSON",
  "JSONB",
  "XML",
  "ARRAY",
  "POINT",
  "LINE",
  "LSEG",
  "BOX",
  "PATH",
  "POLYGON",
  "CIRCLE",
  "INET",
  "CIDR",
  "MACADDR",
  "MACADDR8",
  "BIT",
  "VARBIT",
  "TSVECTOR",
  "TSQUERY",
  "MONEY",
  "OID",
  "REGPROC",
  "REGCLASS",
  "REGTYPE",
];

let monacoSetupDone = false;

function setupMonacoOnce(monacoInstance: typeof monacoType) {
  if (monacoSetupDone) return;
  monacoSetupDone = true;

  // Register pgsql language for InfluxDB v3 SQL
  monacoInstance.languages.register({
    id: "influxsql",
    aliases: ["InfluxDB SQL", "InfluxSQL"],
    extensions: [".sql", ".influxql"],
    mimetypes: ["text/x-sql"],
  });

  // Set Monarch tokenizer — drives syntax highlighting (from monaco-sql-languages pgsql spec)
  monacoInstance.languages.setMonarchTokensProvider("influxsql", {
    defaultToken: "",
    tokenPostfix: ".sql",
    ignoreCase: true,
    brackets: [
      { open: "[", close: "]", token: "delimiter.square" },
      { open: "(", close: ")", token: "delimiter.parenthesis" },
    ],
    keywords: SQL_KEYWORDS,
    operators: [
      "=",
      "<>",
      "<",
      "<=",
      ">",
      ">=",
      "||",
      "~",
      "!~",
      "~*",
      "!~*",
      "@",
      "@@",
      "@>",
      "<@",
      "&&",
      "!",
      "!!",
      "%",
      "&",
      "|",
      "#",
      ">>",
      "<<",
      "**",
      "->",
      "->>",
      "#>",
      "#>>",
    ],
    builtinFunctions: SQL_FUNCTIONS,
    builtinVariables: ["true", "false", "null", "unknown"],
    pseudoColumns: ["$action", "$identity", "$rowguid", "$partition"],
    tokenizer: {
      root: [
        { include: "@comments" },
        { include: "@whitespace" },
        [/[;,.]/, "delimiter"],
        [/[()\[\]]/, "@brackets"],
        [
          /[\w@#$]+/,
          {
            cases: {
              "@keywords": { token: "keyword" },
              "@operators": { token: "operator.keyword" },
              "@builtinFunctions": { token: "predefined" },
              "@builtinVariables": { token: "predefined" },
              "@default": "identifier",
            },
          },
        ],
        [/[<>=!%&+\-*/|~^]/, "operator.symbol"],
        [/'([^'\\]|\\.)*$/, "string.invalid"],
        [/'/, "string", "@string"],
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/"/, "identifier.quote", "@quotedIdentifier"],
        [/\$\d+/, "number"],
        [/[0-9]+\.[0-9]*(e[+-]?[0-9]+)?/i, "number.float"],
        [/\.[0-9]+(e[+-]?[0-9]+)?/i, "number.float"],
        [/[0-9]+e[+-]?[0-9]+/i, "number.float"],
        [/0x[0-9a-f]+/i, "number.hex"],
        [/[0-9]+/, "number"],
        [/[^\s\w\d"'$()[\]{};,.<>=!%&+\-*/|~^]+/, "delimiter"],
      ],
      whitespace: [
        [/[ \t\r\n]+/, "white"],
        [/\/\*/, "comment", "@comment"],
        [/--+.*/, "comment"],
      ],
      comment: [
        [/[^/*]+/, "comment"],
        [/\*\//, "comment", "@pop"],
        [/[/*]/, "comment"],
      ],
      comments: [],
      string: [
        [/[^'\\]+/, "string"],
        [/\\./, "string.escape"],
        [/''/, "string"],
        [/'/, "string", "@pop"],
      ],
      quotedIdentifier: [
        [/[^"\\]+/, "identifier.quote"],
        [/\\./, "identifier.quote"],
        [/""/, "identifier.quote"],
        [/"/, "identifier.quote", "@pop"],
      ],
    },
  });

  // Language configuration for bracket matching, auto-closing, etc.
  monacoInstance.languages.setLanguageConfiguration("influxsql", {
    comments: { lineComment: "--", blockComment: ["/*", "*/"] },
    brackets: [
      ["(", ")"],
      ["[", "]"],
    ],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "'", close: "'", notIn: ["string"] },
      { open: '"', close: '"', notIn: ["string"] },
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
    folding: {
      markers: { start: /\bBEGIN\b/i, end: /\bEND\b/i },
    },
    wordPattern: /(-?\d*\.\d\w*)|([^`~!@#%^&*()\-=+[{\]}\\|;:'",.<>/?\s]+)/g,
  });

  // Comprehensive completion provider
  // Keywords and functions come from the library definitions above — not hardcoded manually
  monacoInstance.languages.registerCompletionItemProvider("influxsql", {
    triggerCharacters: [" ", ".", ",", "(", "\n"],
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const range: monacoType.IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const textBefore = model
        .getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        })
        .toUpperCase();

      const lineBefore = model
        .getLineContent(position.lineNumber)
        .slice(0, position.column - 1)
        .toUpperCase();

      const fullText = model.getValue().toLowerCase();

      const afterFrom =
        /\bFROM\s+\w*$/i.test(lineBefore) ||
        /\bJOIN\s+\w*$/i.test(lineBefore) ||
        /\bINTO\s+\w*$/i.test(lineBefore) ||
        /\bUPDATE\s+\w*$/i.test(lineBefore);

      const suggestions: monacoType.languages.CompletionItem[] = [];

      // 1. Table suggestions (from mock API — simulating backend-provided table list)
      for (const table of MOCK_TABLES) {
        suggestions.push({
          label: {
            label: table.name,
            description: `InfluxDB Table`,
            detail: ` (${table.columns.length} cols)`,
          },
          kind: monacoInstance.languages.CompletionItemKind.Class,
          insertText: table.name,
          detail: table.description,
          documentation: {
            value: [
              `**\`${table.name}\`** — InfluxDB v3 Table`,
              ``,
              table.description,
              ``,
              `**Columns:**`,
              table.columns
                .map(
                  (c) =>
                    `- \`${c.name}\` *(${c.type})*${c.description ? ` — ${c.description}` : ""}`,
                )
                .join("\n"),
              ``,
              `**Tag keys:** \`${table.tags.join("\`, \`")}\``,
            ].join("\n"),
            isTrusted: true,
          },
          range,
          sortText: afterFrom ? "000" + table.name : "zzz" + table.name,
        });
      }

      // 2. Column suggestions — only for tables referenced in the query
      for (const table of MOCK_TABLES) {
        if (fullText.includes(table.name)) {
          for (const col of table.columns) {
            suggestions.push({
              label: {
                label: col.name,
                description: table.name,
                detail: ` ${col.type}`,
              },
              kind: monacoInstance.languages.CompletionItemKind.Field,
              insertText: col.name,
              detail: `${table.name}.${col.name} (${col.type})`,
              documentation: col.description,
              range,
              sortText: "aaa" + col.name,
            });
          }
        }
      }

      // 3. SQL keywords — from monaco-sql-languages pgsql definition (not manually written)
      for (const kw of SQL_KEYWORDS) {
        suggestions.push({
          label: kw,
          kind: monacoInstance.languages.CompletionItemKind.Keyword,
          insertText: kw,
          detail: "SQL Keyword",
          range,
          sortText: "mmm" + kw,
        });
      }

      // 4. SQL built-in functions — from monaco-sql-languages pgsql definition
      for (const fn of SQL_FUNCTIONS) {
        suggestions.push({
          label: {
            label: fn,
            description: "function",
          },
          kind: monacoInstance.languages.CompletionItemKind.Function,
          insertText: fn + "($0)",
          insertTextRules:
            monacoInstance.languages.CompletionItemInsertTextRule
              .InsertAsSnippet,
          detail: "SQL Function",
          range,
          sortText: "nnn" + fn,
        });
      }

      // 5. SQL data types
      for (const type of SQL_TYPES) {
        suggestions.push({
          label: type,
          kind: monacoInstance.languages.CompletionItemKind.TypeParameter,
          insertText: type,
          detail: "SQL Type",
          range,
          sortText: "ooo" + type,
        });
      }

      // 6. Query snippets for each table
      for (const table of MOCK_TABLES) {
        suggestions.push({
          label: `snippet: SELECT FROM ${table.name}`,
          kind: monacoInstance.languages.CompletionItemKind.Snippet,
          insertText: [
            `SELECT`,
            `  ${table.columns
              .slice(0, 5)
              .map((c) => c.name)
              .join(",\n  ")}`,
            `FROM ${table.name}`,
            `WHERE time >= now() - interval '\${1:1 hour}'`,
            `ORDER BY time DESC`,
            `LIMIT \${2:100}`,
          ].join("\n"),
          insertTextRules:
            monacoInstance.languages.CompletionItemInsertTextRule
              .InsertAsSnippet,
          detail: `Query snippet for ${table.name}`,
          documentation: `Generates a SELECT query for ${table.name}`,
          range,
          sortText: "ppp" + table.name,
        });
      }

      // 7. Common InfluxDB time-series patterns
      const timeSnippets = [
        {
          label: "snippet: GROUP BY time bucket",
          insertText:
            "DATE_BIN(INTERVAL '${1:5 minutes}', time, '${2:1970-01-01}') AS time_bucket,\n  $0",
          detail: "Aggregate by time bucket",
        },
        {
          label: "snippet: WHERE time range",
          insertText:
            "WHERE time >= now() - interval '${1:1 hour}'\n  AND time <= now()",
          detail: "Filter by time range",
        },
        {
          label: "snippet: Window function",
          insertText:
            "${1:AVG}(${2:value}) OVER (\n  PARTITION BY ${3:host}\n  ORDER BY time\n  ROWS BETWEEN ${4:5} PRECEDING AND CURRENT ROW\n) AS ${5:moving_avg}",
          detail: "Window/rolling function",
        },
      ];

      for (const snippet of timeSnippets) {
        suggestions.push({
          label: snippet.label,
          kind: monacoInstance.languages.CompletionItemKind.Snippet,
          insertText: snippet.insertText,
          insertTextRules:
            monacoInstance.languages.CompletionItemInsertTextRule
              .InsertAsSnippet,
          detail: snippet.detail,
          range,
          sortText: "qqq",
        });
      }

      void textBefore;
      return { suggestions, incomplete: false };
    },
  });

  // Dark theme — tuned for InfluxDB SQL editor
  monacoInstance.editor.defineTheme("influx-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "keyword", foreground: "c792ea", fontStyle: "bold" },
      { token: "keyword.sql", foreground: "c792ea", fontStyle: "bold" },
      { token: "operator.keyword", foreground: "c792ea" },
      { token: "operator.symbol", foreground: "89ddff" },
      { token: "predefined", foreground: "82aaff" },
      { token: "string", foreground: "c3e88d" },
      { token: "string.escape", foreground: "f78c6c" },
      { token: "number", foreground: "f78c6c" },
      { token: "number.float", foreground: "f78c6c" },
      { token: "number.hex", foreground: "f78c6c" },
      { token: "comment", foreground: "546e7a", fontStyle: "italic" },
      { token: "delimiter", foreground: "89ddff" },
      { token: "delimiter.parenthesis", foreground: "89ddff" },
      { token: "delimiter.square", foreground: "89ddff" },
      { token: "identifier", foreground: "cdd6f4" },
      { token: "identifier.quote", foreground: "a3be8c" },
      { token: "", foreground: "cdd6f4" },
    ],
    colors: {
      "editor.background": "#1e1e2e",
      "editor.foreground": "#cdd6f4",
      "editor.lineHighlightBackground": "#2a2a3d",
      "editor.selectionBackground": "#3d59a1aa",
      "editor.inactiveSelectionBackground": "#3d59a150",
      "editorLineNumber.foreground": "#45475a",
      "editorLineNumber.activeForeground": "#89b4fa",
      "editorCursor.foreground": "#89b4fa",
      "editorWhitespace.foreground": "#313244",
      "editorIndentGuide.background1": "#313244",
      "editorIndentGuide.activeBackground1": "#585b70",
      "editorWidget.background": "#181825",
      "editorWidget.border": "#313244",
      "editorSuggestWidget.background": "#181825",
      "editorSuggestWidget.border": "#313244",
      "editorSuggestWidget.foreground": "#cdd6f4",
      "editorSuggestWidget.selectedBackground": "#313244",
      "editorSuggestWidget.selectedForeground": "#89b4fa",
      "editorSuggestWidget.highlightForeground": "#89b4fa",
      "editorSuggestWidget.focusHighlightForeground": "#89b4fa",
      "scrollbar.shadow": "#00000000",
      "scrollbarSlider.background": "#45475a66",
      "scrollbarSlider.hoverBackground": "#45475aaa",
      "scrollbarSlider.activeBackground": "#585b70",
      "editor.findMatchBackground": "#3d59a160",
      "editor.findMatchHighlightBackground": "#3d59a130",
      "editorBracketMatch.background": "#313244",
      "editorBracketMatch.border": "#89b4fa",
      "editorHoverWidget.background": "#181825",
      "editorHoverWidget.border": "#313244",
      "editorHoverWidget.foreground": "#cdd6f4",
    },
  });
}

export default function SqlEditor({
  value,
  onChange,
  onRun,
  height = "100%",
}: SqlEditorProps) {
  const monaco = useMonaco();
  const editorRef = useRef<monacoType.editor.IStandaloneCodeEditor | null>(
    null,
  );

  useEffect(() => {
    if (monaco) {
      setupMonacoOnce(monaco);
      monaco.editor.setTheme("influx-dark");
    }
  }, [monaco]);

  const handleEditorMount = useCallback(
    (
      editor: monacoType.editor.IStandaloneCodeEditor,
      monacoInstance: typeof monacoType,
    ) => {
      editorRef.current = editor;
      setupMonacoOnce(monacoInstance);
      monacoInstance.editor.setTheme("influx-dark");

      // Ctrl/Cmd+Enter → run query
      editor.addCommand(
        monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter,
        () => onRun(),
      );
    },
    [onRun],
  );

  return (
    <Editor
      height={height}
      language="influxsql"
      value={value}
      onChange={(v) => onChange(v ?? "")}
      onMount={handleEditorMount}
      theme="influx-dark"
      options={EDITOR_OPTIONS}
      loading={
        <div className="flex items-center justify-center h-full text-muted-foreground text-sm gap-2">
          <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          Loading editor…
        </div>
      }
    />
  );
}
