// component/Task.tsx
"use client"

function Task({ id, title, description, priority, dueDate, status, onDelete, onEdit }) {

  const statusStyles = {
    TODO: "bg-rose-50 text-rose-600 border-rose-200/50",
    IN_PROGRESS: "bg-amber-50 text-amber-600 border-amber-200/50",
    DONE: "bg-emerald-50 text-emerald-600 border-emerald-200/50",
  };

  const statusLabels = {
    TODO: "📌 انجام نشده",
    IN_PROGRESS: "⏳ در حال انجام",
    DONE: "✅ انجام شده",
  };

  const priorityColors = {
    LOW: "text-emerald-600 bg-emerald-50",
    MEDIUM: "text-amber-600 bg-amber-50",
    HIGH: "text-rose-600 bg-rose-50",
  };

  const priorityLabels = {
    LOW: "🟢 کم",
    MEDIUM: "🟡 متوسط",
    HIGH: "🔴 زیاد",
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/50 hover:border-emerald-200/50 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300">
      
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className={`text-base font-semibold text-slate-700 leading-tight ${status === "DONE" ? "line-through text-slate-400" : ""}`}>
          {title}
        </h3>
        <span className={`text-xs px-3 py-1 rounded-full font-medium border ${statusStyles[status] || "bg-slate-50 text-slate-500 border-slate-200/50"}`}>
          {statusLabels[status] || status}
        </span>
      </div>
      
      <p className="text-sm text-slate-400 leading-relaxed mb-3 line-clamp-2">
        {description || "توضیحاتی وارد نشده"}
      </p>
      
      <div className="flex items-center justify-between text-sm">
        <span className={`px-3 py-0.5 rounded-full font-medium ${priorityColors[priority] || "bg-slate-50 text-slate-500"}`}>
          {priorityLabels[priority] || priority}
        </span>
        <span className="text-slate-400 text-xs">
          {dueDate || "بدون تاریخ"}
        </span>
      </div>
      
      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
        <button 
          onClick={handleEdit}
          className="flex-1 text-sm px-3 py-2 bg-slate-50 text-slate-500 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 font-medium"
        >
          ✏️ ویرایش
        </button>
        <button 
          onClick={handleDelete}
          className="flex-1 text-sm px-3 py-2 bg-slate-50 text-slate-500 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 font-medium"
        >
          🗑️ حذف
        </button>
      </div>
    </div>
  );
}

export default Task;