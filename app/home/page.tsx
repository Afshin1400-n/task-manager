// app/home/page.tsx
"use client"
import { useState, useEffect, useMemo } from "react";
import Task from "../component/Task";
import Modal from "../component/Modal";
import { useRouter } from "next/navigation";
import BtnFilter from "../component/BtnFilter";
import BtnProg from "../component/BtnProg";

interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  description: string;
  dueDate: string;
}

interface User {
  username: string;
  password: string;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const router = useRouter();
  const [filter, setFilter] = useState("ALL");
  const [filterProg, setFilterProg] = useState("ALL");

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    const savedTasks = localStorage.getItem(`tasks_${user.username}`);
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        if (Array.isArray(parsedTasks) && parsedTasks.length > 0) {
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!user || tasks.length === 0) return;
    localStorage.setItem(`tasks_${user.username}`, JSON.stringify(tasks));
  }, [tasks, user]);

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("currentUser");
      router.push("/");
    }
  };

  const handleAdd = () => {
    setEditingTask(null);
    setIsOpen(true);
  };

  const handleDeleteAll = () => {
    if (tasks.length === 0) return;
    if (confirm("Are you sure you want to delete all tasks?")) {
      setTasks([]);
      if (user) {
        localStorage.removeItem(`tasks_${user.username}`);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    const taskWithId = { id: Date.now(), ...newTask };
    setTasks([...tasks, taskWithId]);
    setIsOpen(false);
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    ));
    setIsOpen(false);
    setEditingTask(null);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsOpen(true);
  };

  const filteredTasks = useMemo(() => {
    let result = tasks;
    if (filter !== "ALL") {
      result = result.filter((task) => task.status === filter);
    }
    if (filterProg !== "ALL") {
      result = result.filter((task) => task.priority === filterProg);
    }
    return result;
  }, [tasks, filter, filterProg]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/80 via-teal-50/80 to-cyan-50/80 p-6">
      <div className="max-w-7xl mx-auto">

        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          editingTask={editingTask}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-3xl">📋</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-700 tracking-tight">
                My Tasks
              </h1>
              <p className="text-base text-slate-700 font-medium">
                {filteredTasks.length} active tasks
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50">
              <span className="text-sm font-medium text-slate-600">👤 {user?.username || "User"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 text-sm font-medium text-slate-500 bg-white/70
               hover:text-red-500 hover:bg-red-200 rounded-xl 
               transition-all duration-200 cursor-pointer"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={handleAdd}
            className="px-7 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 
            hover:from-emerald-600 hover:to-teal-600 active:scale-[0.98]
            text-white font-medium rounded-xl transition-all duration-200 
            shadow-md shadow-emerald-500/25 hover:shadow-lg text-base flex items-center gap-2 cursor-pointer"
          >
            <span className="text-lg">➕</span> Add New Task
          </button>
          {tasks.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="px-7 py-3 bg-white/80 text-slate-500 hover:text-red-500 hover:bg-red-50 
              font-medium rounded-xl transition-all duration-200 
              shadow-sm border border-slate-200/50 text-base flex items-center gap-2 cursor-pointer"
            >
              <span className="text-lg">🗑️</span> Delete All
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 mb-8 border border-slate-200/50 shadow-sm">
          <div className="flex flex-wrap items-center gap-10">
            <span className="text-lg font-semibold text-slate-500 uppercase tracking-wider mr-1">Status</span>
            <div className="flex flex-wrap gap-2">
              <BtnFilter text="All" filter={filter} setFilter={setFilter} value="ALL" />
              <BtnFilter text="📌 To Do" filter={filter} setFilter={setFilter} value="TODO" />
              <BtnFilter text="⏳ In Progress" filter={filter} setFilter={setFilter} value="IN_PROGRESS" />
              <BtnFilter text="✅ Done" filter={filter} setFilter={setFilter} value="DONE" />
            </div>

            <div className="w-px h-8 bg-slate-200/70 hidden sm:block"></div>

            <span className="text-lg font-semibold text-slate-500 uppercase tracking-wider mr-1">Priority</span>
            <div className="flex flex-wrap gap-2">
              <BtnProg text="All" filterProg={filterProg} setFilterProg={setFilterProg} value="ALL" />
              <BtnProg text="🟢 Low" filterProg={filterProg} setFilterProg={setFilterProg} value="LOW" />
              <BtnProg text="🟡 Medium" filterProg={filterProg} setFilterProg={setFilterProg} value="MEDIUM" />
              <BtnProg text="🔴 High" filterProg={filterProg} setFilterProg={setFilterProg} value="HIGH" />
            </div>
          </div>
        </div>

        {/* Task list */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                status={task.status}
                priority={task.priority}
                description={task.description}
                dueDate={task.dueDate}
                onDelete={handleDeleteTask}
                onEdit={() => handleEdit(task)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-7xl mb-4 opacity-30">📭</div>
            <h3 className="text-xl font-medium text-slate-500">No tasks found</h3>
            <p className="text-base text-slate-400 mt-1">
              {tasks.length === 0 ? "Add your first task to get started" : "Try changing the filters"}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}