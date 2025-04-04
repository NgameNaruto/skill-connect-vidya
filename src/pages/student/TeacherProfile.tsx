
import React from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, Calendar, Clock, Heart } from "lucide-react";

// Mock teacher data
const mockTeacher = {
  id: "1",
  name: "Maria Johnson",
  avatar: "/placeholder.svg",
  initials: "MJ",
  skill: "Yoga",
  rating: 4.8,
  hourlyRate: 30,
  bio: "Certified yoga instructor with 5+ years of experience teaching various styles including Hatha, Vinyasa, and Restorative yoga. I specialize in helping beginners develop proper form and build confidence in their practice.",
  experience: "5+ years",
  videoUrl: "https://example.com/maria-demo.mp4", // This would be a real video URL
  availability: ["Weekdays 5-9pm", "Weekends 9am-3pm"],
  reviews: [
    {
      id: "1",
      studentName: "John D.",
      rating: 5,
      comment: "Maria is an excellent yoga instructor! She was patient and helped me improve my form significantly.",
      date: "March 15, 2025"
    },
    {
      id: "2",
      studentName: "Sarah T.",
      rating: 4.5,
      comment: "Great instructor who tailors the sessions to your skill level. Very knowledgeable about proper technique.",
      date: "February 28, 2025"
    }
  ]
};

const TeacherProfile = () => {
  const { id } = useParams<{ id: string }>();
  const teacher = mockTeacher; // In a real app, fetch the teacher based on the ID

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Teacher Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="h-24 w-24 md:h-32 md:w-32">
          <AvatarImage src={teacher.avatar} />
          <AvatarFallback>{teacher.initials}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <h2 className="text-3xl font-bold">{teacher.name}</h2>
            <div className="flex items-center gap-2">
              <Button>
                <Heart className="mr-1 h-4 w-4" />
                Favorite
              </Button>
              <Button asChild variant="outline">
                <Link to={`/student/chat/${teacher.id}`}>
                  <MessageCircle className="mr-1 h-4 w-4" />
                  Message
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline">{teacher.skill} Teacher</Badge>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="ml-1 font-medium">{teacher.rating}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span>{teacher.experience} experience</span>
          </div>
          
          <div className="text-xl font-semibold">${teacher.hourlyRate}/hour</div>
          
          <p className="mt-2 text-muted-foreground">{teacher.bio}</p>
          
          <div className="mt-4 pt-4 border-t">
            <h3 className="font-medium mb-1">Availability</h3>
            <div className="flex flex-wrap gap-2">
              {teacher.availability.map((time, idx) => (
                <Badge key={idx} variant="secondary">{time}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Introduction */}
      <Card>
        <CardHeader>
          <CardTitle>Video Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
            <p className="text-center text-muted-foreground">Teacher introduction video would be embedded here</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Reviews Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Student Reviews</CardTitle>
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="text-lg font-medium">{teacher.rating}</span>
            <span className="text-muted-foreground">({teacher.reviews.length} reviews)</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {teacher.reviews.map(review => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-4 border rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div className="font-medium">{review.studentName}</div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <span>{review.rating}</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-1">{review.date}</div>
              <p className="mt-1">{review.comment}</p>
            </motion.div>
          ))}
        </CardContent>
      </Card>
      
      {/* Book Session Button */}
      <div className="flex justify-center">
        <Button size="lg" asChild className="w-full md:w-auto">
          <Link to={`/student/book-session/${teacher.id}`}>
            <Calendar className="mr-2 h-4 w-4" />
            Book a Session
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default TeacherProfile;
