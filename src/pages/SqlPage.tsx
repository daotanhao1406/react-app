import { useState, useRef, useCallback } from "react";
import SqlEditor from "../components/SqlEditor";
const DEFAULT_QUERY = `-- InfluxDB v3 SQL Editor
-- Press Ctrl+Enter to run  |  Ctrl+Space for suggestions

SELECT
  time,
  host,
  usage_user,
  usage_system,
  usage_idle
FROM cpu_usage
WHERE time >= now() - interval '1 hour'
ORDER BY time DESC
LIMIT 50`;
export default function SqlPage() {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const editorInsertRef = useRef<((text: string) => void) | null>(null);

  const runQuery = useCallback(async () => {
    if (!query.trim() || isLoading) return;
    setIsLoading(true);
    setResult(null);
    try {
      const res = await executeQuery(query);
      setResult(res);
    } finally {
      setIsLoading(false);
    }
  }, [query, isLoading]);

  const handleInsertTable = useCallback((tableName: string) => {
    setQuery((q) => {
      const lower = q.toLowerCase();
      if (lower.includes("from ")) {
        return q.replace(/\bfrom\s+\w*/i, `FROM ${tableName}`);
      }
      return q + `\nFROM ${tableName}`;
    });
  }, []);

  const handleInsertColumn = useCallback(
    (tableName: string, colName: string) => {
      setQuery((q) => q + colName);
      void tableName;
    },
    [],
  );

  const handleExampleSelect = useCallback((sql: string) => {
    setQuery(sql);
    setShowExamples(false);
  }, []);

  const handleReset = useCallback(() => {
    setQuery(DEFAULT_QUERY);
    setResult(null);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-card flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/15 border border-primary/30"></div>
          <div>
            <h1 className="text-sm font-semibold text-foreground leading-none">
              InfluxDB SQL Editor
            </h1>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              v3 · Arrow Flight SQL
            </p>
          </div>
        </div>

        <div className="h-4 w-px bg-border mx-1" />

        {/* Example queries dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowExamples((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground border border-border hover:border-border/80 rounded-md transition-colors bg-background/50"
          >
            Examples
          </button>
          {showExamples && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowExamples(false)}
              />
              <div className="absolute left-0 top-full mt-1 z-20 bg-card border border-border rounded-md shadow-lg py-1 min-w-44"></div>
            </>
          )}
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground border border-border hover:border-border/80 rounded-md transition-colors bg-background/50"
        >
          Reset
        </button>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground">
            <kbd className="font-mono">Ctrl+Enter</kbd> to run
          </span>

          <button
            onClick={runQuery}
            disabled={isLoading || !query.trim()}
            className="flex items-center gap-2 px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-semibold hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            {isLoading ? (
              <>
                <div className="w-3 h-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Running…
              </>
            ) : (
              <>Run Query</>
            )}
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Table Explorer sidebar */}
        <div className="w-56 flex-shrink-0 border-r border-border overflow-hidden"></div>

        {/* Editor + Results */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* SQL Editor - takes 50% of remaining height */}
          <div
            className="flex-shrink-0 border-b border-border overflow-hidden"
            style={{ height: "50%" }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border bg-card/50 flex-shrink-0">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Query
              </span>
              <div className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground/50">
                <span>pgsql</span>
                <span>·</span>
                <span>monaco-sql-languages</span>
              </div>
            </div>
            <div style={{ height: "calc(100% - 30px)" }}>
              <SqlEditor
                value={query}
                onChange={setQuery}
                onRun={runQuery}
                height="100%"
              />
            </div>
          </div>

          {/* Results Panel - takes remaining 50% */}
          <div className="flex-1 overflow-hidden bg-background"></div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-4 px-4 py-1 border-t border-border bg-card/50 flex-shrink-0">
        <span className="text-[10px] text-muted-foreground">
          InfluxDB v3 SQL · Powered by monaco-editor + monaco-sql-languages
        </span>
      </div>
    </div>
  );
}
