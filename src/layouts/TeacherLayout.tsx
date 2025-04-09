
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
import { LogOut, Home, Star, Calendar, User, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

const TeacherLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName] = useState("Jane Smith");
  
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
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground">Teacher</span>
              </div>
            </div>
          </SidebarHeader>
        
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/teacher/overview"}
                >
                  <Link to="/teacher/overview">
                    <Home className="h-4 w-4" />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/teacher/ratings"}
                >
                  <Link to="/teacher/ratings">
                    <Star className="h-4 w-4" />
                    <span>Ratings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/teacher/availability"}
                >
                  <Link to="/teacher/availability">
                    <Calendar className="h-4 w-4" />
                    <span>Availability</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/teacher/profile"}
                >
                  <Link to="/teacher/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/teacher/settings"}
                >
                  <Link to="/teacher/settings">
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
                  {location.pathname.includes("/overview") && "Teacher Dashboard"}
                  {location.pathname.includes("/ratings") && "Your Ratings"}
                  {location.pathname.includes("/availability") && "Manage Availability"}
                  {location.pathname.includes("/profile") && "Edit Profile"}
                  {location.pathname.includes("/settings") && "Account Settings"}
                </h1>
              </nav>
              <div className="ml-auto flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JS</AvatarFallback>
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

export default TeacherLayout;
