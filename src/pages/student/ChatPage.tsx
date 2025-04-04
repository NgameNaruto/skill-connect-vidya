
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  id: number;
  sender: "student" | "teacher";
  content: string;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "teacher",
      content: "Hello! How can I help you with the upcoming session?",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      sender: "student",
      content: "Hi! I wanted to ask about the materials needed for the session.",
      timestamp: new Date(Date.now() - 3000000),
    },
    {
      id: 3,
      sender: "teacher",
      content: "Sure! For tomorrow's session, please have a notebook and pencil ready. Also, if you could review the basic concepts we discussed last time, that would be great!",
      timestamp: new Date(Date.now() - 2400000),
    },
  ]);

  const teacherName = "Jane Smith";
  const teacherAvatar = "/placeholder.svg";
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      sender: "student",
      content: newMessage.trim(),
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Simulate teacher response after a delay
    setTimeout(() => {
      const teacherResponse: Message = {
        id: messages.length + 2,
        sender: "teacher",
        content: "Thanks for your message. I'll get back to you soon!",
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, teacherResponse]);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-[calc(100vh-200px)]"
    >
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={teacherAvatar} />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <CardTitle className="ml-4">
              {teacherName}
              <div className="text-sm font-normal text-muted-foreground">
                Teacher #{teacherId}
              </div>
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === "student" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] ${message.sender === "student" ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}>
                <div className="flex items-start">
                  {message.sender === "teacher" && (
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={teacherAvatar} />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
        
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex w-full gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ChatPage;
