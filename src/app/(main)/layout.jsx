import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

export default function MainPagesLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* The fixed Navbar floats seamlessly on top of the content */}
      <Navbar />
      
      {/* Removed pt-17 so your Hero Section's purple glow reaches the very top */}
      <main className="flex-1  ">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}