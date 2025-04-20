
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

interface Message {
  id: number;
  sender: "student" | "teacher";
  content: string;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "student",
      content: "Hello! I have a question about the upcoming session.",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      sender: "teacher",
      content: "Hi there! Sure, what would you like to know?",
      timestamp: new Date(Date.now() - 3000000),
    },
    {
      id: 3,
      sender: "student",
      content: "Should I prepare anything in advance for our next lesson?",
      timestamp: new Date(Date.now() - 2400000),
    },
  ]);

  const studentName = "John Doe";
  const studentAvatar = "/placeholder.svg";
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      sender: "teacher",
      content: newMessage.trim(),
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Simulate student response after a delay
    setTimeout(() => {
      const studentResponse: Message = {
        id: messages.length + 2,
        sender: "student",
        content: "Thanks for the information! I'll make sure to prepare accordingly.",
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, studentResponse]);
    }, 2000);
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
      <div className="flex-1 flex flex-col border border-gray-200 rounded-lg shadow-sm bg-white">
        <div className="border-b p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {studentAvatar ? (
                <img src={studentAvatar} alt={studentName} className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm font-medium">JD</span>
              )}
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">{studentName}</h2>
              <div className="text-sm font-normal text-gray-500">
                Student #{studentId}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === "teacher" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] ${message.sender === "teacher" ? "bg-blue-600 text-white" : "bg-gray-100"} rounded-lg p-3`}>
                <div className="flex items-start">
                  {message.sender === "student" && (
                    <div className="h-6 w-6 mr-2 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {studentAvatar ? (
                        <img src={studentAvatar} alt={studentName} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-xs font-medium">JD</span>
                      )}
                    </div>
                  )}
                  <div>
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex w-full gap-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="h-10 w-10 flex items-center justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPage;
