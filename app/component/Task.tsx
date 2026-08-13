// component/Task.tsx
"use client"

function Task({ id, title, description, priority, dueDate, status, onDelete, onEdit }) {

  const statusStyles = {
    TODO: "bg-red-100 text-red-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    DONE: "bg-green-100 text-green-700",
  };

  const priorityLabels = {
    LOW: "🟢 کم",
    MEDIUM: "🟡 متوسط",
    HIGH: "🔴 بالا",
  };

  const priorityColors = {
    LOW: "text-green-500",
    MEDIUM: "text-yellow-500",
    HIGH: "text-red-500",
  };

  const statusLabels = {
    TODO: "📌 انجام نشده",
    IN_PROGRESS: "⏳ در حال انجام",
    DONE: "✅ انجام شده",
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(); // ✅ صدا زدن تابع ویرایش
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100 hover:shadow-lg hover:border-purple-200 transition-all">
      <div className="flex items-start justify-between mb-2">
        <h3 className={`text-gray-800 font-bold text-base ${status === "DONE" ? "line-through text-gray-400" : ""}`}>
          {title}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[status] || "bg-gray-100 text-gray-700"}`}>
          {statusLabels[status] || status}
        </span>
      </div>
      <p className="text-gray-500 text-sm mb-3">{description || "توضیحاتی وارد نشده"}</p>
      <div className="flex items-center justify-between text-xs">
        <span className={`font-medium ${priorityColors[priority] || "text-gray-500"}`}>
          {priorityLabels[priority] || priority}
        </span>
        <span className="text-gray-400">{dueDate || "تاریخ مشخص نشده"}</span>
      </div>
      <div className="flex gap-2 mt-3">
        <button 
          onClick={handleEdit} // ✅ کلیک روی دکمه ویرایش
          className="flex-1 text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-medium"
        >
          ✏️ ویرایش
        </button>
        <button 
          onClick={handleDelete}
          className="flex-1 text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium"
        >
          🗑️ حذف
        </button>
      </div>
    </div>
  );
}

export default Task;