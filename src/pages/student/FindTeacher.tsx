
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Star } from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  skill: string;
  rating: number;
  hourlyRate: number;
  bio: string;
}

const mockTeachers: Teacher[] = [
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
    id: "3",
    name: "Sarah Williams",
    avatar: "/placeholder.svg",
    initials: "SW",
    skill: "Painting",
    rating: 4.7,
    hourlyRate: 35,
    bio: "Fine arts graduate with a passion for teaching watercolor and oil painting."
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

const FindTeacher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  
  // Filtered teachers based on search term and filters
  const filteredTeachers = mockTeachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          teacher.skill.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === "all" || teacher.skill === selectedSkill;
    const matchesPrice = teacher.hourlyRate >= priceRange[0] && teacher.hourlyRate <= priceRange[1];
    const matchesRating = ratingFilter === null || teacher.rating >= ratingFilter;
    
    return matchesSearch && matchesSkill && matchesPrice && matchesRating;
  });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-2">Find Teachers</h2>
        <p className="text-muted-foreground">Discover skilled mentors who can help you learn.</p>
      </motion.div>
      
      {/* Search and filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Skill</label>
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Select skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="Yoga">Yoga</SelectItem>
                <SelectItem value="Guitar">Guitar</SelectItem>
                <SelectItem value="Painting">Painting</SelectItem>
                <SelectItem value="Programming">Programming</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Price Range ($/hr)</label>
            <div className="px-2 pt-6">
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={5}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Rating</label>
            <Select 
              value={ratingFilter?.toString() || "any"} 
              onValueChange={(val) => setRatingFilter(val === "any" ? null : Number(val))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Minimum rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Rating</SelectItem>
                <SelectItem value="4.5">4.5+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="3.5">3.5+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Teacher cards */}
      {filteredTeachers.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium">No teachers found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={teacher.avatar} />
                    <AvatarFallback>{teacher.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-sm">{teacher.rating}</span>
                    </div>
                    <CardDescription className="text-xs">{teacher.skill} Teacher</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm line-clamp-2">{teacher.bio}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold">${teacher.hourlyRate}</span>
                      <span className="text-sm text-muted-foreground">/hour</span>
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/student/teacher/${teacher.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindTeacher;
