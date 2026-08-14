// component/Modal.tsx
"use client"
import { useState, useEffect } from "react";

export default function Modal({ isOpen, onClose, onAddTask, onEditTask, editingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("IN_PROGRESS");
  const [dueDate, setDueDate] = useState("");

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
  }, [editingTask, isOpen]);

  // بستن با دکمه ESC
  useEffect(() => {
    const handleEsc = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { title, description, priority, status, dueDate };
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
        className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full border border-slate-200/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* هدر */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-700">
            {editingTask ? "✏️ ویرایش تسک" : "➕ تسک جدید"}
          </h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 transition-all text-xl hover:rotate-90 duration-200"
          >
            ✕
          </button>
        </div>

        {/* فرم */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1.5">
              عنوان تسک
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان تسک را وارد کنید..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
              focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
              text-slate-700 placeholder:text-slate-400 transition-all text-sm"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1.5">
              توضیحات
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              placeholder="توضیحات تسک را وارد کنید..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
              focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
              text-slate-700 placeholder:text-slate-400 transition-all text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1.5">
                اولویت
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                text-slate-700 transition-all text-sm"
              >
                <option value="LOW">🟢 کم</option>
                <option value="MEDIUM">🟡 متوسط</option>
                <option value="HIGH">🔴 زیاد</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1.5">
                وضعیت
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
                text-slate-700 transition-all text-sm"
              >
                <option value="TODO">📌 انجام نشده</option>
                <option value="IN_PROGRESS">⏳ در حال انجام</option>
                <option value="DONE">✅ انجام شده</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1.5">
              تاریخ سررسید
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
              focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none 
              text-slate-700 transition-all text-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-xl transition-all font-medium text-sm"
            >
              لغو
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 
              hover:from-emerald-600 hover:to-teal-600 active:scale-[0.98]
              text-white font-medium rounded-xl transition-all duration-200 
              shadow-md shadow-emerald-500/20 text-sm"
            >
              {editingTask ? "💾 ذخیره" : "✅ افزودن"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}