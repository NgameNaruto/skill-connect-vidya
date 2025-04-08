
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MessageCircle, Video, Star, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Session {
  id: string;
  studentName: string;
  studentAvatar: string;
  studentInitials: string;
  skill: string;
  date: string;
  time: string;
  isPast: boolean;
}

const mockSessions: Session[] = [
  {
    id: "1",
    studentName: "Alex Johnson",
    studentAvatar: "/placeholder.svg",
    studentInitials: "AJ",
    skill: "Yoga",
    date: "April 10, 2025",
    time: "10:00 AM - 11:00 AM",
    isPast: false
  },
  {
    id: "2",
    studentName: "Emma White",
    studentAvatar: "/placeholder.svg",
    studentInitials: "EW",
    skill: "Yoga",
    date: "April 12, 2025",
    time: "3:30 PM - 4:30 PM",
    isPast: false
  },
  {
    id: "3",
    studentName: "Ryan Turner",
    studentAvatar: "/placeholder.svg",
    studentInitials: "RT",
    skill: "Yoga",
    date: "March 30, 2025",
    time: "2:00 PM - 3:30 PM",
    isPast: true
  },
  {
    id: "4",
    studentName: "Sophie Miller",
    studentAvatar: "/placeholder.svg",
    studentInitials: "SM",
    skill: "Yoga",
    date: "March 25, 2025",
    time: "5:00 PM - 6:00 PM",
    isPast: true
  }
];

const TeacherOverview = () => {
  const upcomingSessions = mockSessions.filter(session => !session.isPast);
  const pastSessions = mockSessions.filter(session => session.isPast);

  const stats = [
    { 
      title: "Total Sessions", 
      value: "32", 
      description: "All time",
      icon: <Users className="h-5 w-5 text-muted-foreground" />
    },
    { 
      title: "Rating", 
      value: "4.8", 
      description: "Out of 5 stars",
      icon: <Star className="h-5 w-5 text-primary" />
    },
    { 
      title: "Upcoming", 
      value: upcomingSessions.length.toString(), 
      description: "Sessions scheduled",
      icon: <Clock className="h-5 w-5 text-muted-foreground" />
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2">Welcome back, Jane!</h2>
        <p className="text-muted-foreground">Here's an overview of your teaching stats and sessions.</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {upcomingSessions.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium mb-2">No upcoming sessions</h3>
              <p className="text-muted-foreground mb-4">Update your availability to get more bookings.</p>
              <Link 
                to="/teacher/availability"
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
                  "bg-primary text-white hover:bg-primary/90",
                  "h-10 py-2 px-4"
                )}
              >
                Set Availability
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {upcomingSessions.map(session => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="card-hover">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={session.studentAvatar} />
                          <AvatarFallback>{session.studentInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-md">{session.studentName}</CardTitle>
                          <CardDescription className="text-xs">{session.skill} Session</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <button 
                            className={cn(
                              "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
                              "bg-primary text-white hover:bg-primary/90",
                              "h-9 px-3 flex-1"
                            )}
                          >
                            <Video className="h-4 w-4 mr-1" /> Start
                          </button>
                          <button 
                            className={cn(
                              "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
                              "border border-input hover:bg-accent hover:text-accent-foreground",
                              "h-9 px-3 flex-1"
                            )}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" /> Chat
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastSessions.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No past sessions</h3>
              <p className="text-muted-foreground">Your completed sessions will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {pastSessions.map(session => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="card-hover">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={session.studentAvatar} />
                          <AvatarFallback>{session.studentInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-md">{session.studentName}</CardTitle>
                          <CardDescription className="text-xs">{session.skill} Session</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{session.time}</span>
                        </div>
                        <button 
                          className={cn(
                            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
                            "border border-input hover:bg-accent hover:text-accent-foreground",
                            "h-9 px-3 w-full"
                          )}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" /> Message Student
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherOverview;
