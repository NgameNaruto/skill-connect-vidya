import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MessageCircle, Video } from "lucide-react";

interface Session {
  id: string;
  teacherName: string;
  teacherAvatar: string;
  teacherInitials: string;
  skill: string;
  date: string;
  time: string;
  isPast: boolean;
}

const mockSessions: Session[] = [
  {
    id: "1",
    teacherName: "Maria Johnson",
    teacherAvatar: "/placeholder.svg",
    teacherInitials: "MJ",
    skill: "Yoga",
    date: "April 10, 2025",
    time: "10:00 AM - 11:00 AM",
    isPast: false
  },
  {
    id: "2",
    teacherName: "David Lee",
    teacherAvatar: "/placeholder.svg",
    teacherInitials: "DL",
    skill: "Guitar",
    date: "April 12, 2025",
    time: "3:30 PM - 4:30 PM",
    isPast: false
  },
  {
    id: "3",
    teacherName: "Sarah Williams",
    teacherAvatar: "/placeholder.svg",
    teacherInitials: "SW",
    skill: "Painting",
    date: "March 30, 2025",
    time: "2:00 PM - 3:30 PM",
    isPast: true
  },
  {
    id: "4",
    teacherName: "Michael Chen",
    teacherAvatar: "/placeholder.svg",
    teacherInitials: "MC",
    skill: "Programming",
    date: "March 25, 2025",
    time: "5:00 PM - 6:00 PM",
    isPast: true
  }
];

const StudentOverview = () => {
  const upcomingSessions = mockSessions.filter(session => !session.isPast);
  const pastSessions = mockSessions.filter(session => session.isPast);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2">Welcome back, John!</h2>
        <p className="text-muted-foreground">Here's an overview of your upcoming learning sessions.</p>
      </motion.div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {upcomingSessions.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium mb-2">No upcoming sessions</h3>
              <p className="text-muted-foreground mb-4">Book a session with one of our skilled teachers to get started.</p>
              <Button asChild>
                <Link to="/student/find-teacher">Find Teachers</Link>
              </Button>
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
                          <AvatarImage src={session.teacherAvatar} />
                          <AvatarFallback>{session.teacherInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-md">{session.teacherName}</CardTitle>
                          <CardDescription className="text-xs">{session.skill} Teacher</CardDescription>
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
                          <Button size="sm" className="flex-1" asChild>
                            <Link to={`/student/video-call/${session.id}`}>
                              <Video className="h-4 w-4 mr-1" /> Join
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild className="flex-1">
                            <Link to={`/student/chat/${session.id}`}>
                              <MessageCircle className="h-4 w-4 mr-1" /> Chat
                            </Link>
                          </Button>
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
                          <AvatarImage src={session.teacherAvatar} />
                          <AvatarFallback>{session.teacherInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-md">{session.teacherName}</CardTitle>
                          <CardDescription className="text-xs">{session.skill} Teacher</CardDescription>
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
                        <Button size="sm" variant="outline" asChild className="w-full">
                          <Link to={`/student/chat/${session.id}`}>
                            <MessageCircle className="h-4 w-4 mr-1" /> Chat with Teacher
                          </Link>
                        </Button>
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

export default StudentOverview;

function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
