// app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      router.push("/home");
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است");
      setTimeout(() => {
        setError("")     
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900
     flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🔐 ورود
            </h1>
            <p className="text-purple-200/70 text-sm mt-2">
              برای ادامه وارد شوید
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-purple-200/80 text-sm font-medium mb-2">
                نام کاربری
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="نام کاربری خود را وارد کنید..."
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl 
                focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 outline-none 
                text-white/90 placeholder:text-white/30 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-purple-200/80 text-sm font-medium mb-2">
                رمز عبور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور خود را وارد کنید..."
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl 
                focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 outline-none 
                text-white/90 placeholder:text-white/30 transition-all"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-400 text-sm text-center">
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 
              hover:from-purple-600 hover:to-pink-600 active:scale-95
              text-white font-bold rounded-xl transition-all duration-200 
              shadow-md hover:shadow-lg disabled:opacity-40 cursor-pointer"
            >
              {loading ? "⏳ در حال ورود..." : "🚀 ورود"}
            </button>
          </form>

          <p className="text-center text-purple-200/60 text-sm mt-6">
            حساب کاربری ندارید؟{" "}
            <Link href="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              ثبت‌نام
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}