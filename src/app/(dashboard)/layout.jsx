import DashboardSideBar from "@/components/Dashboard/DashboardSideBar";
import Navbar from "@/components/Navbar/Navbar";

export default function MainDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">

      {/* Navbar */}
      <div className="sticky top-0 z-50 w-full h-16 border-b border-zinc-800/40 bg-[#080808]">
        <Navbar />
      </div>

      {/* Body */}
      <div className="flex flex-1">

        {/* Sidebar — fixed, handles its own positioning */}
        <DashboardSideBar />

        {/* Content — manually offset by sidebar width (256px = w-64) */}
        <main className="flex-1 min-w-0 md:pl-64 w-full">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}