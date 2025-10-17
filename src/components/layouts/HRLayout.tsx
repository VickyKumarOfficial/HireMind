import { SidebarProvider } from "@/components/ui/sidebar";
import { HRSidebar } from "@/components/hr/HRSidebar";
import Footer from "@/components/Footer";

interface HRLayoutProps {
  children: React.ReactNode;
}

const HRLayout = ({ children }: HRLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <HRSidebar />
        <div className="flex-1 flex flex-col overflow-auto">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default HRLayout;
