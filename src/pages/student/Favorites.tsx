
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { StarIcon, ChatBubbleLeftIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

interface FavoriteTeacher {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  skill: string;
  rating: number;
  hourlyRate: number;
  bio: string;
}

// Mock favorite teachers
const mockFavorites: FavoriteTeacher[] = [
  {
    id: "1",
    name: "Maria Johnson",
    avatar: "/placeholder.svg",
    initials: "MJ",
    skill: "Yoga",
    rating: 4.8,
    hourlyRate: 30,
    bio: "Certified yoga instructor with 5+ years of experience teaching various styles."
  },
  {
    id: "2",
    name: "David Lee",
    avatar: "/placeholder.svg",
    initials: "DL",
    skill: "Guitar",
    rating: 4.9,
    hourlyRate: 40,
    bio: "Professional guitarist with 10+ years of experience teaching all skill levels."
  },
  {
    id: "4",
    name: "Michael Chen",
    avatar: "/placeholder.svg",
    initials: "MC",
    skill: "Programming",
    rating: 4.9,
    hourlyRate: 50,
    bio: "Software engineer with expertise in web development and programming fundamentals."
  }
];

const Favorites = () => {
  const [favorites, setFavorites] = React.useState<FavoriteTeacher[]>(mockFavorites);
  
  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(teacher => teacher.id !== id));
    // Create a toast notification
    const notification = document.createElement('div');
    notification.className = "fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 animate-fade-in";
    notification.innerHTML = "Teacher removed from favorites";
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.add('animate-fade-out');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-2">Favorite Teachers</h2>
        <p className="text-gray-500">Your collection of favorite teachers for quick access.</p>
      </motion.div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <HeartIcon className="h-16 w-16 mx-auto text-gray-400" />
          <h3 className="text-xl font-medium mt-4 mb-2">No favorite teachers yet</h3>
          <p className="text-gray-500 mb-6">
            Add teachers to your favorites for quick access to their profiles.
          </p>
          <Link 
            to="/student/find-teacher"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Find Teachers
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((teacher) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-row items-center gap-4 p-6">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
                    {teacher.avatar ? (
                      <img 
                        src={teacher.avatar} 
                        alt={teacher.name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-gray-700">
                        {teacher.initials}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{teacher.name}</h3>
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-sm">{teacher.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{teacher.skill} Teacher</p>
                  </div>
                </div>
                <div className="space-y-3 p-6 pt-0">
                  <p className="text-sm line-clamp-2">{teacher.bio}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold">${teacher.hourlyRate}</span>
                      <span className="text-sm text-gray-500">/hour</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 p-0 hover:bg-gray-100"
                        onClick={() => handleRemoveFavorite(teacher.id)}
                      >
                        <HeartIcon className="h-4 w-4 text-red-500" />
                      </button>
                      <Link 
                        to={`/student/chat/${teacher.id}`}
                        className="inline-flex h-8 items-center gap-1 rounded-md border border-gray-200 px-3 hover:bg-gray-100"
                      >
                        <ChatBubbleLeftIcon className="h-4 w-4" />
                        <span>Chat</span>
                      </Link>
                      <Link 
                        to={`/student/teacher/${teacher.id}`}
                        className="inline-flex h-8 items-center rounded-md bg-blue-600 px-3 text-white hover:bg-blue-700"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(10px); }
          }
          
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
          }
          
          .animate-fade-out {
            animation: fadeOut 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Favorites;
