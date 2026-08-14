// app/page.tsx
"use client"
import { useState, useEffect, useMemo } from "react";
import Task from "../component/Task";
import Modal from "../component/Modal";
import { useRouter } from "next/navigation";
import BtnFilter from "../component/BtnFilter";
import BtnProg from "../component/BtnProg";


export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [editingTask, setEditingTask] = useState(null); // ✅ تسک در حال ویرایش
  const router = useRouter();
  const [filter, setFilter] = useState("ALL");
  const [filterProg, setFilterProg] = useState("ALL");

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
  };

  const handleAdd = () => {
    setEditingTask(null); // ✅ ریست ویرایش
    setIsOpen(true);
  };

const handleDeleteAll =()=>{
  setTasks([])
}

  const handleClose = () => {
    setIsOpen(false);
    setEditingTask(null); // ✅ ریست ویرایش
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleAddTask = (newTask) => {

    
    setTasks([...tasks, { id: Date.now(), ...newTask }]);
    setIsOpen(false);
  };

  // ✅ تابع ویرایش تسک
  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map((task) => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setIsOpen(false);
    setEditingTask(null);
  };

  // ✅ باز کردن مودال برای ویرایش
  const handleEdit = (task) => {
    setEditingTask(task);
    setIsOpen(true);
  };

 // ✅ فیلتر کردن تسک‌ها
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // فیلتر بر اساس وضعیت (status)
    if (filter !== "ALL") {
      result = result.filter((task) => task.status === filter);
    }

    // فیلتر بر اساس اولویت (priority)
    if (filterProg !== "ALL") {
      result = result.filter((task) => task.priority === filterProg);
    }

    return result;
  }, [tasks, filter, filterProg]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* ✅ مودال با پشتیبانی از ویرایش */}
        <Modal 
          isOpen={isOpen} 
          onClose={handleClose} 
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          editingTask={editingTask}
        />

        {/* هدر */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              📋 تسک‌های من
            </h1>
            <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full font-semibold">
              {filteredTasks.length} تعداد تسک 
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white/80 text-gray-700 px-4 py-2 rounded-xl hover:bg-white shadow-sm hover:shadow-md transition-all text-sm font-medium">
              👤 {user?.username}
            </button>
            <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-all text-sm font-medium">
              🚪 خروج
            </button>
          </div>
        </div>

        {/* دکمه افزودن و حذف تسک */}
        <div className="mb-6 ">
          <button onClick={handleAdd} className="px-6 py-3 mx-3 bg-gradient-to-r from-purple-500 to-pink-500 
            hover:from-purple-600 hover:to-pink-600 active:scale-95
            text-white font-bold rounded-xl transition-all duration-200 
            shadow-md hover:shadow-lg text-sm">
            ➕ افزودن تسک جدید
          </button>
          <button onClick={handleDeleteAll} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
            hover:from-purple-600 hover:to-pink-600 active:scale-95
            text-white font-bold rounded-xl transition-all duration-200 
            shadow-md hover:shadow-lg text-sm">
           حذف تمام تسک ها
          </button>
        </div>
 
        {/* فیلترها */}
<div className="flex flex-wrap gap-2 mb-6">
  <BtnFilter text="همه" filter={filter} setFilter={setFilter} value="ALL" />
  <BtnFilter text="📌 انجام نشده" filter={filter} setFilter={setFilter} value="TODO" />
  <BtnFilter text="⏳ در حال انجام" filter={filter} setFilter={setFilter} value="IN_PROGRESS" />
  <BtnFilter text="✅ انجام شده" filter={filter} setFilter={setFilter} value="DONE" />

  <BtnProg text="همه" filterProg={filterProg} setFilterProg={setFilterProg} value="ALL" />
  <BtnProg text="کم" filterProg={filterProg} setFilterProg={setFilterProg} value="LOW" />
  <BtnProg text="متوسط" filterProg={filterProg} setFilterProg={setFilterProg} value="MEDIUM" />
  <BtnProg text="زیاد" filterProg={filterProg} setFilterProg={setFilterProg} value="HIGH" />
</div>



        {/* لیست تسک‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              onEdit={() => handleEdit(task)} // ✅ پاس دادن تابع ویرایش
            />
          ))}
        </div>

        {/* پیام خالی */}
        {filteredTasks.length === 0 && (
          <div className="text-center text-gray-400 py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-lg font-medium">هنوز تسکی اضافه نکردی!</p>
            <p className="text-sm">اولین تسک خود را اضافه کن</p>
          </div>
        )}

      </div>
    </div>
  );
}