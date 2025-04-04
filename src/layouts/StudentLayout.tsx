
import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  SidebarProvider, 
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, User, Home, Search, Heart, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

const StudentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName] = useState("John Doe");
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
    });
    navigate("/");
  };
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="flex flex-col items-center pb-4">
            <Link to="/" className="flex items-center gap-2 px-4 py-2">
              <span className="text-xl font-bold gradient-text">VidyaPaalam</span>
            </Link>
            
            <div className="flex items-center mt-4 gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground">Student</span>
              </div>
            </div>
          </SidebarHeader>
        
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/student/overview"}
                >
                  <Link to="/student/overview">
                    <Home className="h-4 w-4" />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/student/find-teacher"}
                >
                  <Link to="/student/find-teacher">
                    <Search className="h-4 w-4" />
                    <span>Find Teachers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/student/favorites"}
                >
                  <Link to="/student/favorites">
                    <Heart className="h-4 w-4" />
                    <span>Favorites</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/student/settings"}
                >
                  <Link to="/student/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="p-4">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 overflow-auto">
          <header className="border-b bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60 z-10 sticky top-0">
            <div className="flex h-14 items-center px-4">
              <SidebarTrigger />
              <nav className="flex items-center gap-4 pl-4 text-sm font-medium">
                <h1 className="text-xl font-semibold">
                  {location.pathname.includes("/overview") && "Dashboard Overview"}
                  {location.pathname.includes("/find-teacher") && "Find Teachers"}
                  {location.pathname.includes("/favorites") && "Favorite Teachers"}
                  {location.pathname.includes("/settings") && "Account Settings"}
                </h1>
              </nav>
              <div className="ml-auto flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
          
          <main className="p-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="container max-w-7xl"
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default StudentLayout;
