// component/BtnFilter.tsx
"use client";

export default function BtnFilter({ text, filter, setFilter, value }) {
  const isActive = filter === value;

  return (
    <button 
      onClick={() => setFilter(value)}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
        isActive 
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md" 
          : "bg-white/80 text-gray-600 hover:bg-white hover:shadow-md"
      }`}
    >
      {text}
    </button>
  );
}