// component/Modal.tsx
"use client"
import { useState, useEffect } from "react";

export default function Modal({ isOpen, onClose, onAddTask, onEditTask, editingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("IN_PROGRESS");
  const [dueDate, setDueDate] = useState("");

  // ✅ پر کردن فرم با داده‌های تسک برای ویرایش
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority || "MEDIUM");
      setStatus(editingTask.status || "IN_PROGRESS");
      setDueDate(editingTask.dueDate || "");
    } else {
      // ریست فرم وقتی مودال بسته میشه
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setStatus("IN_PROGRESS");
      setDueDate("");
    }
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const taskData = {
      title,
      description,
      priority,
      status,
      dueDate,
    };

    if (editingTask) {
      // ✅ حالت ویرایش
      onEditTask({ ...taskData, id: editingTask.id });
    } else {
      // ✅ حالت افزودن
      onAddTask(taskData);
    }

    // بستن مودال
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-purple-100">
        
        {/* هدر */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {editingTask ? "✏️ ویرایش تسک" : "➕ تسک جدید"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-all text-2xl">
            ✕
          </button>
        </div>

        {/* فرم */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              📌 عنوان تسک
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان تسک را وارد کنید..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
              focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none 
              text-gray-700 placeholder:text-gray-400 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              📝 توضیحات
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              placeholder="توضیحات تسک را وارد کنید..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
              focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none 
              text-gray-700 placeholder:text-gray-400 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              🎯 اولویت
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
              focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none 
              text-gray-700 transition-all"
            >
              <option value="LOW">🟢 کم</option>
              <option value="MEDIUM">🟡 متوسط</option>
              <option value="HIGH">🔴 بالا</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              📊 وضعیت
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
              focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none 
              text-gray-700 transition-all"
            >
              <option value="TODO">📌 انجام نشده</option>
              <option value="IN_PROGRESS">⏳ در حال انجام</option>
              <option value="DONE">✅ انجام شده</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              📅 تاریخ سررسید
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
              focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none 
              text-gray-700 transition-all"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl transition-all font-medium"
            >
              لغو
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
              hover:from-purple-600 hover:to-pink-600 active:scale-95
              text-white font-bold rounded-xl transition-all duration-200 
              shadow-md hover:shadow-lg"
            >
              {editingTask ? "💾 ذخیره تغییرات" : "✅ افزودن تسک"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}