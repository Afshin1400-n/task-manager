// app/register/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!username.trim() || !password.trim()) {
      setError("همه فیلدها را پر کنید");
      setLoading(false);
      return;
    }

    if (password.length < 4) {
      setError("رمز عبور باید حداقل ۴ کاراکتر باشد");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن مطابقت ندارند");
      setLoading(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find(u => u.username === username)) {
      setError("این نام کاربری قبلاً ثبت شده است");
      setLoading(false);
      return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              📝 ثبت‌نام
            </h1>
            <p className="text-purple-200/70 text-sm mt-2 cursor-pointer">
              حساب کاربری جدید بسازید
            </p>
          </div>

          {success ? (
            <div className="mb-4 p-4 bg-gradient-to-r from-green-400/20 to-emerald-400/20 border border-green-400/30 rounded-xl text-green-400 text-center backdrop-blur-sm">
              <div className="font-bold">✅ ثبت‌نام با موفقیت انجام شد!</div>
              <div className="text-sm text-green-400/70 mt-1">در حال انتقال به صفحه ورود...</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-purple-200/80 text-sm font-medium mb-2">
                  نام کاربری
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="نام کاربری خود را انتخاب کنید..."
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
                  minLength={4}
                />
              </div>

              <div>
                <label className="block text-purple-200/80 text-sm font-medium mb-2">
                  تکرار رمز عبور
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="رمز عبور را دوباره وارد کنید..."
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
                className="w-full cursor-pointer py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                hover:from-purple-600 hover:to-pink-600 active:scale-95
                text-white font-bold rounded-xl transition-all duration-200 
                shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed "
              >
                {loading ? "⏳ در حال ثبت‌نام..." : "🚀 ثبت‌نام"}
              </button>
            </form>
          )}

          <p className="text-center text-purple-200/60 text-sm mt-6">
            قبلاً ثبت‌نام کردید؟{" "}
            <Link href="/" className="text-purple-400 hover:text-purple-300 font-medium transition-colors
            ">
              ورود
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}