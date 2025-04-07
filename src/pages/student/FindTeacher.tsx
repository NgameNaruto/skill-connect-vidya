import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const subjects = [
  { id: "math", name: "Mathematics" },
  { id: "science", name: "Science" },
  { id: "english", name: "English" },
  { id: "history", name: "History" },
  { id: "art", name: "Art" },
];

const teachers = [
  {
    id: "1",
    name: "John Smith",
    subject: "math",
    rating: 4.5,
    price: 30,
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Emily Johnson",
    subject: "science",
    rating: 4.8,
    price: 40,
    avatar: "/placeholder.svg",
  },
  {
    id: "3",
    name: "David Brown",
    subject: "english",
    rating: 4.2,
    price: 35,
    avatar: "/placeholder.svg",
  },
];

const FindTeacher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sortOption, setSortOption] = useState("relevance");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const getSortLabel = (value: string) => {
    switch (value) {
      case "relevance":
        return "Most Relevant";
      case "rating":
        return "Highest Rated";
      case "price_low":
        return "Price: Low to High";
      case "price_high":
        return "Price: High to Low";
      default:
        return "Most Relevant";
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const searchMatch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
    const subjectMatch = selectedSubject ? teacher.subject === selectedSubject : true;
    return searchMatch && subjectMatch;
  });

  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    switch (sortOption) {
      case "rating":
        return b.rating - a.rating;
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="container space-y-6"
    >
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">Find Your Perfect Teacher</h2>
        <p className="text-gray-500">
          Explore a wide range of skilled teachers and find the best fit for your learning needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="Search for teachers"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger>
            <SelectValue>{selectedSubject || "Select a Subject"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Available Teachers</h3>
        <Select value={sortOption} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue>{getSortLabel(sortOption)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Most Relevant</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="price_low">Price: Low to High</SelectItem>
            <SelectItem value="price_high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTeachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={teacher.avatar} alt={teacher.name} />
                  <AvatarFallback>{teacher.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{teacher.name}</h4>
                  <p className="text-xs text-gray-500">{subjects.find(s => s.id === teacher.subject)?.name}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs font-medium">{teacher.rating}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium">${teacher.price}/hr</span>
                <Button size="sm">Book Session</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default FindTeacher;
