import React, { useState, useEffect } from "react";
import { 
  ClipboardCheck, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  ShieldCheck, 
  Clock, 
  Check, 
  TrendingUp,
  Database,
  Info
} from "lucide-react";

interface Todo {
  id: number;
  name: string;
  is_complete: boolean;
  completed?: boolean;
  created_at?: string;
}

interface DBStatus {
  configured: boolean;
  status: "connected" | "disconnected" | "unconfigured";
  error?: string;
  details?: {
    host: string;
    port: number;
    database: string;
    user: string;
  };
}

export default function TaskPlanner() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Connection and status states for Hostinger MySQL
  const [dbStatus, setDbStatus] = useState<DBStatus>({
    configured: false,
    status: "unconfigured"
  });
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "error">("connecting");

  // Fetch DB health and connection status
  const checkDbStatus = async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/db-status");
      if (!res.ok) throw new Error("HTTP error checking db status");
      const data: DBStatus = await res.json();
      setDbStatus(data);
      
      if (data.status === "connected") {
        setConnectionStatus("connected");
        return true;
      } else {
        setConnectionStatus("error");
        return false;
      }
    } catch (err) {
      console.error("Failed to check DB status:", err);
      setConnectionStatus("error");
      return false;
    }
  };

  // Fetch todos from Express backend backed by MySQL
  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await checkDbStatus();

      const res = await fetch("/api/todos");
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to fetch tasks from backend.");
      }

      const data = await res.json();
      setTodos(data || []);
    } catch (err: any) {
      console.error("MySQL fetch error:", err);
      setError(err.message || "Failed to fetch tasks from Hostinger MySQL database.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add a new todo to MySQL via Express API
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoName.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTodoName.trim() })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to save task to MySQL.");
      }

      setNewTodoName("");
      // Refresh list to maintain true synchronization
      await fetchTodos();
    } catch (err: any) {
      console.error("MySQL insert error:", err);
      setError(err.message || "Failed to add task to MySQL.");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle todo completion
  const handleToggleComplete = async (todo: Todo) => {
    setIsLoading(true);
    setError(null);
    const nextStatus = !todo.is_complete;

    try {
      // Optimistic update
      setTodos(prev => 
        prev.map(t => t.id === todo.id ? { ...t, is_complete: nextStatus } : t)
      );

      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_complete: nextStatus })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to update status on MySQL.");
      }
    } catch (err: any) {
      console.error("MySQL update error:", err);
      setError(err.message || "Failed to update task status.");
      // Rollback on failure
      await fetchTodos();
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to delete task from MySQL.");
      }

      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      console.error("MySQL delete error:", err);
      setError(err.message || "Failed to delete task.");
      await fetchTodos();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      
      {/* Page Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-care-green/10 border border-care-green/20 px-3.5 py-1.5 rounded-full">
          <Database className="w-3.5 h-3.5 text-care-green" />
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-care-green">
            Hostinger MySQL Connection
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gov-blue tracking-tight">
          Daily Living Planner
        </h1>
        <p className="text-text-secondary text-xs sm:text-sm max-w-xl mx-auto">
          Co-produced resident daily schedules and care plan logs synced securely with our central Hostinger MySQL relational database.
        </p>
      </div>

      {/* Connection & Status Panel */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              {connectionStatus === "connected" && (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </>
              )}
              {connectionStatus === "connecting" && (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </>
              )}
              {connectionStatus === "error" && (
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              )}
            </span>
            <span className="text-xs font-bold text-gov-blue">
              {connectionStatus === "connected" && "Hostinger MySQL Server Connection Established"}
              {connectionStatus === "connecting" && "Testing Database Pool Connection..."}
              {connectionStatus === "error" && "MySQL Database Sync Error"}
            </span>
          </div>
          
          <p className="text-[10px] text-text-secondary font-mono tracking-tight select-all">
            Database Status:{" "}
            <span className={`font-semibold ${dbStatus.status === "connected" ? "text-emerald-600" : "text-rose-600"}`}>
              {dbStatus.status === "connected" ? "ACTIVE POOL" : dbStatus.status === "unconfigured" ? "UNCONFIGURED" : "DISCONNECTED"}
            </span>
            {dbStatus.status !== "connected" && " — Please declare DB_HOST, DB_NAME, DB_USER, DB_PASSWORD in the Settings/Secrets panel."}
          </p>
        </div>

        <button
          onClick={fetchTodos}
          disabled={isLoading}
          className="flex items-center space-x-1.5 px-3 py-1.5 border border-slate-200 hover:border-gov-blue/20 text-text-secondary hover:text-gov-blue rounded-xl text-xs font-bold transition bg-slate-50 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Verify & Reconnect</span>
        </button>
      </div>

      {/* Database Warning Block if disconnected */}
      {dbStatus.status !== "connected" && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4.5 space-y-3 text-amber-900 text-xs leading-relaxed animate-fadeIn">
          <div className="flex gap-3">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-extrabold text-amber-950">MySQL Credentials Required</p>
              <p className="text-[11px] text-amber-900/95">
                The application requires a valid Hostinger MySQL database. Please set up your credential variables (<code className="font-mono bg-amber-100/50 px-1 py-0.5 rounded">DB_HOST</code>, <code className="font-mono bg-amber-100/50 px-1 py-0.5 rounded">DB_NAME</code>, <code className="font-mono bg-amber-100/50 px-1 py-0.5 rounded">DB_USER</code>, <code className="font-mono bg-amber-100/50 px-1 py-0.5 rounded">DB_PASSWORD</code>) inside the Secrets manager to query the database.
              </p>
            </div>
          </div>
          
          {dbStatus.details && (
            <div className="bg-amber-100/30 rounded-xl p-3 border border-amber-200/50 font-mono text-[11px] space-y-1 text-amber-950">
              <p className="font-bold border-b border-amber-200/40 pb-1 mb-1 text-amber-900 text-xs">Loaded Environment Variables / Diagnostic Details:</p>
              <div><span className="text-amber-800 font-semibold">DB_HOST:</span> <span className="underline decoration-dotted">{dbStatus.details.host || "(Empty)"}</span></div>
              <div><span className="text-amber-800 font-semibold">DB_PORT:</span> <span className="underline decoration-dotted">{dbStatus.details.port || "3306"}</span></div>
              <div><span className="text-amber-800 font-semibold">DB_NAME:</span> <span className="underline decoration-dotted">{dbStatus.details.database || "(Empty)"}</span></div>
              <div><span className="text-amber-800 font-semibold">DB_USER:</span> <span className="underline decoration-dotted">{dbStatus.details.user || "(Empty)"}</span></div>
              {dbStatus.error && (
                <div className="mt-2 text-rose-800 border-t border-amber-200/40 pt-1.5 font-sans leading-normal">
                  <span className="font-bold">Last Connection Error:</span> {dbStatus.error}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main Form & Task List Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
        
        {/* Card Header */}
        <div className="bg-slate-50/50 px-6 py-4.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 bg-care-green/10 text-care-green rounded-xl">
              <ClipboardCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm text-gov-blue">Client Daily Living Schedules</h3>
              <p className="text-[10px] text-text-secondary">Track personal outcomes, goals & medication reminders.</p>
            </div>
          </div>
          
          <span className="px-2.5 py-1 bg-gov-blue/5 text-gov-blue text-[10px] font-bold rounded-lg font-mono">
            {todos.length} Active {todos.length === 1 ? "Task" : "Tasks"}
          </span>
        </div>

        {/* Create Form */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/10">
          <form onSubmit={handleAddTodo} className="flex gap-2.5">
            <input
              type="text"
              value={newTodoName}
              onChange={(e) => setNewTodoName(e.target.value)}
              placeholder="Enter new care task (e.g., Morning walk, speech therapy, PBS routine check)..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-care-green focus:ring-1 focus:ring-care-green placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isLoading || !newTodoName.trim()}
              className="px-5 py-3 bg-care-green hover:bg-care-green/95 text-white font-bold text-xs rounded-xl shadow-md shadow-care-green/10 flex items-center space-x-1.5 transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Task</span>
            </button>
          </form>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-rose-50 border-b border-rose-100 text-rose-800 text-xs flex items-start space-x-2">
            <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Database Error</p>
              <p className="text-[11px] leading-relaxed opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Todo List Rows */}
        <div className="divide-y divide-slate-100">
          {isLoading && todos.length === 0 ? (
            <div className="p-12 text-center text-text-secondary text-xs flex flex-col items-center space-y-2">
              <RefreshCw className="w-6 h-6 animate-spin text-care-green" />
              <span>Fetching secure tables from Hostinger MySQL...</span>
            </div>
          ) : todos.length === 0 ? (
            <div className="p-16 text-center space-y-3">
              <div className="inline-flex p-3 bg-slate-50 text-slate-400 rounded-full">
                <ClipboardCheck className="w-8 h-8" />
              </div>
              <p className="text-text-secondary text-xs font-semibold">No active daily tasks found.</p>
              <p className="text-[10px] text-slate-400 max-w-sm mx-auto">
                Add care planning milestones, weekly goals, or standard routines using the builder input above to sync them with MySQL.
              </p>
            </div>
          ) : (
            todos.map((todo) => {
              const isCompleted = todo.is_complete;
              return (
                <div 
                  key={todo.id} 
                  className={`p-4.5 flex items-center justify-between gap-4 transition-colors ${
                    isCompleted ? "bg-slate-50/50" : "bg-white hover:bg-slate-50/20"
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <button
                      onClick={() => handleToggleComplete(todo)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                        isCompleted 
                          ? "bg-care-green border-care-green text-white shadow-sm" 
                          : "border-slate-300 hover:border-care-green text-transparent"
                      }`}
                      title={isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div className="min-w-0">
                      <p className={`text-xs font-semibold leading-relaxed transition-all break-words ${
                        isCompleted ? "text-slate-400 line-through" : "text-gov-blue"
                      }`}>
                        {todo.name}
                      </p>
                      {todo.created_at && (
                        <div className="flex items-center space-x-1 mt-0.5 text-[9px] text-slate-400 font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(todo.created_at).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    title="Delete Task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Instructional / Educational footer info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-700">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-2">
          <div className="flex items-center space-x-2 text-gov-blue">
            <ShieldCheck className="w-4 h-4 text-care-green" />
            <h4 className="font-extrabold text-xs">CQC compliant digital logging</h4>
          </div>
          <p className="text-[11px] leading-relaxed text-text-secondary">
            Our daily task tracker integrates with our central auditing pipelines, demonstrating live co-production where support plans are responsive to client choices and clinical updates.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-2">
          <div className="flex items-center space-x-2 text-gov-blue">
            <TrendingUp className="w-4 h-4 text-[#7D3196]" />
            <h4 className="font-extrabold text-xs">MySQL Pooling & Prepared Statements</h4>
          </div>
          <p className="text-[11px] leading-relaxed text-text-secondary">
            Hostinger MySQL handles our core data persistence layer, providing secure pooling, transactions, and robust prepared statement parameterization to guard against SQL Injection.
          </p>
        </div>
      </div>

    </div>
  );
}
