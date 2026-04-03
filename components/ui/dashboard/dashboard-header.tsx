"use client";

interface DashboardHeaderProps {
 userName?: string;}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className="w-full flex bg-blue-50 justify-center pt-10 px-4">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-2xl font-bold text-gray-800 tracking-wide">
          <span className="text-black">TaskFlow</span>
        </div>

        {/* Center - Title */}
        <div className=" md:block text-2xl  text-black font-bold">My Tasks</div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
           {userName ?? "Alisha"}
          </div>
        </div>
      </div>
    </header>
  );
}
