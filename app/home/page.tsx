"use client"
import { useState, useEffect } from "react";
import Task from "../component/Task";
import Modal from "../component/Modal";
import { useRouter } from "next/navigation";


export default function Home() {
const [isOpen , setIsOpen]= useState(false)
const [tasks, setTasks] = useState([]);
const [user, setUser] = useState(null);
 const router = useRouter();


useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem("currentUser");
    router.push("/");
  };

 const handleAdd = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // ✅ تابع افزودن تسک - اینجا
  const handleAddTask = (newTask) => {
    setTasks([...tasks, { id: Date.now(), ...newTask }]);
    setIsOpen(false); // بستن مودال بعد از افزودن
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        
  {isOpen && <Modal isOpen={isOpen} onClose={handleClose} onAddTask={handleAddTask}/>}

        {/* هدر */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              📋 تسک‌های من
            </h1>
            <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full font-semibold">
              ۳ تسک
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white/80 text-gray-700 px-4 py-2 rounded-xl hover:bg-white shadow-sm hover:shadow-md transition-all text-sm font-medium">
              👤 {user?.username}
            </button>
            <button onClick={handleLogout}
            className="text-gray-500 hover:text-red-500 transition-all text-sm font-medium">
              🚪 خروج
            </button>
          </div>
        </div>

        {/* دکمه افزودن تسک */}
        <div className="mb-6">
          <button onClick={handleAdd}
           className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
            hover:from-purple-600 hover:to-pink-600 active:scale-95
            text-white font-bold rounded-xl transition-all duration-200 
            shadow-md hover:shadow-lg text-sm">
            ➕ افزودن تسک جدید
          </button>
        </div>

        {/* فیلترها */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-semibold shadow-md">
            همه
          </button>
          <button className="px-4 py-2 bg-white/80 text-gray-600 hover:bg-white hover:shadow-md rounded-lg text-sm font-semibold transition-all">
            📌 انجام نشده
          </button>
          <button className="px-4 py-2 bg-white/80 text-gray-600 hover:bg-white hover:shadow-md rounded-lg text-sm font-semibold transition-all">
            ⏳ در حال انجام
          </button>
          <button className="px-4 py-2 bg-white/80 text-gray-600 hover:bg-white hover:shadow-md rounded-lg text-sm font-semibold transition-all">
            ✅ انجام شده
          </button>
        </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <Task 
              key={task.id}
              title={task.title}
              status={task.status}
              priority={task.priority}
              description={task.description}
              dueDate={task.dueDate}
            />
          ))}
        </div>

        {/* ✅ پیام خالی - وقتی تسکی نباشه */}
        {tasks.length === 0 && (
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