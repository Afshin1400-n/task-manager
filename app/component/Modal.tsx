
"use client"
import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  description: string;
  dueDate: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, "id">) => void;
  onEditTask: (task: Task) => void;
  editingTask: Task | null;
}

export default function Modal({ isOpen, onClose, onAddTask, onEditTask, editingTask }: ModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("IN_PROGRESS");
  const [dueDate, setDueDate] = useState("");
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority || "MEDIUM");
      setStatus(editingTask.status || "IN_PROGRESS");
      setDueDate(editingTask.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setStatus("IN_PROGRESS");
      setDueDate("");
    }
    setDateError("");
  }, [editingTask, isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDateError("");

    const taskData = {
      title,
      description,
      priority,
      status,
      dueDate,
    };

    if (editingTask) {
      onEditTask({ ...taskData, id: editingTask.id });
    } else {
      onAddTask(taskData);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full border border-slate-200/50 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-700">
            {editingTask ? "✏️ Edit Task" : "➕ New Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-all text-xl hover:rotate-90 duration-200 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1.5">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
              focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
              text-slate-700 placeholder:text-slate-400 transition-all text-sm"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Enter task description..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
              focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
              text-slate-700 placeholder:text-slate-400 transition-all text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                text-slate-700 transition-all text-sm"
              >
                <option value="LOW">🟢 Low</option>
                <option value="MEDIUM">🟡 Medium</option>
                <option value="HIGH">🔴 High</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                text-slate-700 transition-all text-sm"
              >
                <option value="TODO">📌 To Do</option>
                <option value="IN_PROGRESS">⏳ In Progress</option>
                <option value="DONE">✅ Done</option>
              </select>
            </div>
          </div>

          {/* Due date */}
          <div>
            <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1.5">
              📅 Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
              focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
              text-slate-700 transition-all text-sm"
            />
            {dateError && (
              <p className="text-xs text-rose-600 mt-1.5">❌ {dateError}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-xl transition-all font-medium text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 
              hover:from-emerald-600 hover:to-teal-600 active:scale-[0.98]
              text-white font-medium rounded-xl transition-all duration-200 
              shadow-md shadow-emerald-500/20 text-sm cursor-pointer"
            >
              {editingTask ? "💾 Save" : "✅ Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}