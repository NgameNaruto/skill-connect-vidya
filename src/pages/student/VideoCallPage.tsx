
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Video, VideoOff, Mic, MicOff, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const VideoCallPage: React.FC = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  
  // Simulated teacher data
  const teacherName = "Jane Smith";
  const teacherAvatar = "/placeholder.svg";
  
  useEffect(() => {
    // Simulate connection delay
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleCamera = () => setIsCameraOn(!isCameraOn);
  const toggleMic = () => setIsMicOn(!isMicOn);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-200px)] flex flex-col gap-4"
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={teacherAvatar} />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{teacherName}</h3>
              <p className="text-sm text-muted-foreground">Teacher</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to={`/student/chat/${teacherId}`}>
                <MessageCircle className="h-4 w-4 mr-1" /> Chat
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Teacher video */}
        <div className="relative bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
          {isConnected ? (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={teacherAvatar} />
                <AvatarFallback className="text-4xl">JS</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="text-white">Connecting to teacher...</div>
          )}
          <div className="absolute bottom-4 left-4 bg-black/50 py-1 px-3 rounded-full text-white text-sm">
            {teacherName}
          </div>
        </div>
        
        {/* Student video (self view) */}
        <div className="relative bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
          {isCameraOn ? (
            <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
              <div className="text-white text-lg">Your camera</div>
            </div>
          ) : (
            <div className="text-white">Camera is off</div>
          )}
          <div className="absolute bottom-4 left-4 bg-black/50 py-1 px-3 rounded-full text-white text-sm">
            You
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex justify-center gap-4">
          <Button 
            variant={isCameraOn ? "outline" : "destructive"} 
            size="icon" 
            onClick={toggleCamera}
          >
            {isCameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>
          <Button 
            variant={isMicOn ? "outline" : "destructive"} 
            size="icon" 
            onClick={toggleMic}
          >
            {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>
          <Button 
            variant="destructive" 
            size="icon"
            onClick={() => window.history.back()}
          >
            <Phone className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCallPage;
