
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Rating {
  id: string;
  studentName: string;
  studentAvatar: string;
  studentInitials: string;
  rating: number;
  comment: string;
  date: string;
  skillName: string;
}

// Mock ratings data
const mockRatings: Rating[] = [
  {
    id: "1",
    studentName: "John Doe",
    studentAvatar: "/placeholder.svg",
    studentInitials: "JD",
    rating: 5,
    comment: "Jane is an excellent teacher! She was patient and helped me improve significantly.",
    date: "April 1, 2025",
    skillName: "Yoga"
  },
  {
    id: "2",
    studentName: "Sarah Thompson",
    studentAvatar: "/placeholder.svg",
    studentInitials: "ST",
    rating: 4.5,
    comment: "Great instructor who tailors the sessions to your skill level. Very knowledgeable about proper technique.",
    date: "March 28, 2025",
    skillName: "Yoga"
  },
  {
    id: "3",
    studentName: "Michael Brown",
    studentAvatar: "/placeholder.svg",
    studentInitials: "MB",
    rating: 5,
    comment: "Jane is awesome! I've learned so much in just a few sessions.",
    date: "March 15, 2025",
    skillName: "Meditation"
  },
  {
    id: "4",
    studentName: "Emily Davis",
    studentAvatar: "/placeholder.svg",
    studentInitials: "ED",
    rating: 4,
    comment: "Very professional and knowledgeable. Would recommend to anyone looking to learn meditation.",
    date: "March 10, 2025",
    skillName: "Meditation"
  },
  {
    id: "5",
    studentName: "Robert Johnson",
    studentAvatar: "/placeholder.svg",
    studentInitials: "RJ",
    rating: 5,
    comment: "Jane is an incredible instructor. Her teaching style is clear and easy to follow.",
    date: "February 25, 2025",
    skillName: "Yoga"
  }
];

const TeacherRatings = () => {
  const calculateAverageRating = () => {
    const sum = mockRatings.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / mockRatings.length).toFixed(1);
  };

  const calculateRatingCounts = () => {
    const counts = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    mockRatings.forEach((rating) => {
      const rounded = Math.round(rating.rating) as keyof typeof counts;
      counts[rounded] += 1;
    });

    return counts;
  };

  const averageRating = calculateAverageRating();
  const ratingCounts = calculateRatingCounts();
  const totalRatings = mockRatings.length;

  const getProgressValue = (count: number) => {
    return (count / totalRatings) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">Your Ratings & Reviews</h2>
        <p className="text-muted-foreground">See what your students are saying about your teaching.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Overall Rating</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-6">
            <div className="text-5xl font-bold flex items-center">
              {averageRating}
              <Star className="h-8 w-8 ml-2 fill-primary text-primary" />
            </div>
            <p className="mt-2 text-muted-foreground">
              Based on {totalRatings} reviews
            </p>
            
            <div className="w-full space-y-3 mt-8">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center">
                    <span className="w-3">{rating}</span>
                    <Star className="h-4 w-4 ml-1 fill-primary text-primary" />
                  </div>
                  <Progress value={getProgressValue(ratingCounts[rating])} className="h-2" />
                  <span className="text-sm text-muted-foreground w-8 text-right">
                    {ratingCounts[rating]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Reviews</TabsTrigger>
                <TabsTrigger value="yoga">Yoga</TabsTrigger>
                <TabsTrigger value="meditation">Meditation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6 space-y-6">
                {mockRatings.map((review) => (
                  <motion.div 
                    key={review.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-b pb-6 last:border-b-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={review.studentAvatar} />
                          <AvatarFallback>{review.studentInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.studentName}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <span>{review.date}</span>
                            <span className="mx-2">•</span>
                            <span>{review.skillName}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    
                    <p className="mt-3">{review.comment}</p>
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="yoga" className="mt-6 space-y-6">
                {mockRatings
                  .filter((review) => review.skillName === "Yoga")
                  .map((review) => (
                    <motion.div 
                      key={review.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="border-b pb-6 last:border-b-0 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={review.studentAvatar} />
                            <AvatarFallback>{review.studentInitials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.studentName}</div>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                          <span>{review.rating}</span>
                        </div>
                      </div>
                      
                      <p className="mt-3">{review.comment}</p>
                    </motion.div>
                  ))}
              </TabsContent>
              
              <TabsContent value="meditation" className="mt-6 space-y-6">
                {mockRatings
                  .filter((review) => review.skillName === "Meditation")
                  .map((review) => (
                    <motion.div 
                      key={review.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="border-b pb-6 last:border-b-0 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={review.studentAvatar} />
                            <AvatarFallback>{review.studentInitials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.studentName}</div>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                          <span>{review.rating}</span>
                        </div>
                      </div>
                      
                      <p className="mt-3">{review.comment}</p>
                    </motion.div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default TeacherRatings;
