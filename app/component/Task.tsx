"use client"

function Task({title,description,priority,dueDate,status}) {
  return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100 hover:shadow-lg hover:border-purple-200 transition-all">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-gray-800 font-bold text-base">{title}</h3>
              <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                {priority}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-3">{description}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-yellow-600 font-medium">{status}</span>
              <span className="text-gray-400">{dueDate}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-medium">
                ✏️ ویرایش
              </button>
              <button className="flex-1 text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium">
                🗑️ حذف
              </button>
            </div>
          </div>
  )
}

export default Task