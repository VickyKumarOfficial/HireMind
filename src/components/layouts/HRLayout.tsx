import { SidebarProvider } from "@/components/ui/sidebar";
import { HRSidebar } from "@/components/hr/HRSidebar";

interface HRLayoutProps {
  children: React.ReactNode;
}

const HRLayout = ({ children }: HRLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <HRSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default HRLayout;
