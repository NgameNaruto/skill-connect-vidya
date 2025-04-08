import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BadgeCheck, Filter, Search, Star, MapPin } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Subject options
const subjects = [
  { id: "math", name: "Mathematics" },
  { id: "science", name: "Science" },
  { id: "english", name: "English" },
  { id: "history", name: "History" },
  { id: "art", name: "Art" },
  { id: "physics", name: "Physics" },
  { id: "chemistry", name: "Chemistry" },
  { id: "biology", name: "Biology" },
  { id: "computer_science", name: "Computer Science" },
];

// Updated price range options with clearer labels
const priceRanges = [
  { id: "any", name: "Any Price" },
  { id: "0-20", name: "Under $20" },
  { id: "20-40", name: "$20 - $40" },
  { id: "40-60", name: "$40 - $60" },
  { id: "60+", name: "$60 & Above" },
];

// Teacher data
const teachers = [
  {
    id: "1",
    name: "John Smith",
    subject: "math",
    rating: 4.5,
    price: 30,
    avatar: "/placeholder.svg",
    verification: "verified",
    experience: "5+ years",
    available: true,
    location: "New York, NY",
  },
  {
    id: "2",
    name: "Emily Johnson",
    subject: "science",
    rating: 4.8,
    price: 40,
    avatar: "/placeholder.svg",
    verification: "verified",
    experience: "7+ years",
    available: true,
    location: "Los Angeles, CA",
  },
  {
    id: "3",
    name: "David Brown",
    subject: "english",
    rating: 4.2,
    price: 35,
    avatar: "/placeholder.svg",
    verification: "verified",
    experience: "3+ years",
    available: true,
    location: "Chicago, IL",
  },
  {
    id: "4",
    name: "Sarah Williams",
    subject: "history",
    rating: 4.6,
    price: 45,
    avatar: "/placeholder.svg",
    verification: "verified",
    experience: "8+ years",
    available: false,
    location: "Houston, TX",
  },
  {
    id: "5",
    name: "Michael Davis",
    subject: "art",
    rating: 4.3,
    price: 25,
    avatar: "/placeholder.svg",
    verification: "pending",
    experience: "2+ years",
    available: true,
    location: "Phoenix, AZ",
  },
  {
    id: "6",
    name: "Jessica Miller",
    subject: "physics",
    rating: 4.9,
    price: 50,
    avatar: "/placeholder.svg",
    verification: "verified",
    experience: "10+ years",
    available: true,
    location: "Philadelphia, PA",
  },
];

const FindTeacher = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [priceRange, setPriceRange] = useState("any");
  const [sortOption, setSortOption] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);

  // Event handlers
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
  };

  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedSubject("");
    setPriceRange("any");
    setAvailableOnly(false);
    setSortOption("relevance");

    toast({
      title: "Filters reset",
      description: "All search filters have been cleared.",
    });
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

  // Filter and sort teachers based on state changes
  useEffect(() => {
    let results = teachers.filter((teacher) => {
      const searchMatch = teacher.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const subjectMatch = selectedSubject
        ? teacher.subject === selectedSubject
        : true;
      const availabilityMatch = availableOnly ? teacher.available : true;

      // Corrected price range filtering logic
      let priceMatch = true;
      if (priceRange !== "any") {
        if (priceRange === "0-20") priceMatch = teacher.price < 20;
        else if (priceRange === "20-40")
          priceMatch = teacher.price >= 20 && teacher.price <= 40;
        else if (priceRange === "40-60")
          priceMatch = teacher.price > 40 && teacher.price <= 60;
        else if (priceRange === "60+") priceMatch = teacher.price > 60;
      }

      return searchMatch && subjectMatch && availabilityMatch && priceMatch;
    });

    // Sorting logic
    results = [...results].sort((a, b) => {
      switch (sortOption) {
        case "rating":
          return b.rating - a.rating;
        case "price_low":
          return a.price - b.price;
        case "price_high":
          return b.price - a.price;
        case "relevance":
          // For now, maintain original order; could implement scoring later
          return 0;
        default:
          return 0;
      }
    });

    setFilteredTeachers(results);
  }, [searchTerm, selectedSubject, priceRange, availableOnly, sortOption]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="container py-6 space-y-6"
    >
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">Find Your Perfect Teacher</h2>
        <p className="text-gray-500">
          Explore our talented teachers and find the right fit for your learning
          goals
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
              aria-hidden="true"
            />
            <Input
              type="text"
              placeholder="Search teachers by name..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
              aria-label="Search teachers by name"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={selectedSubject} onValueChange={handleSubjectChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue>
                  {selectedSubject
                    ? subjects.find((s) => s.id === selectedSubject)?.name
                    : "Subject"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto"
              aria-label={showFilters ? "Hide filters" : "Show filters"}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t pt-4 mt-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Price Range
                </label>
                <Select
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                >
                  <SelectTrigger>
                    <SelectValue>
                      {priceRanges.find((p) => p.id === priceRange)?.name ||
                        "Any Price"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.id} value={range.id}>
                        {range.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={availableOnly}
                    onCheckedChange={(checked) =>
                      setAvailableOnly(checked === true)
                    }
                    id="available-only"
                  />
                  <span className="text-sm font-medium">
                    Available teachers only
                  </span>
                </label>
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <Button
                  variant="outline"
                  onClick={handleResetFilters}
                  aria-label="Reset all filters"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {filteredTeachers.length}{" "}
          {filteredTeachers.length === 1 ? "Teacher" : "Teachers"} Found
        </h3>
        <Select value={sortOption} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
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

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card
            key={teacher.id}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <CardContent className="p-5">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16 border-2 border-white shadow">
                  <AvatarImage src={teacher.avatar} alt={teacher.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {teacher.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center">
                    <h4 className="font-semibold">{teacher.name}</h4>
                    {teacher.verification === "verified" && (
                      <BadgeCheck
                        className="h-4 w-4 text-blue-500 ml-1"
                        aria-label="Verified teacher"
                      />
                    )}
                  </div>

                  <p className="text-sm text-gray-500">
                    {subjects.find((s) => s.id === teacher.subject)?.name}
                  </p>

                  <div className="flex items-center">
                    <div className="flex items-center">
                      <Star
                        className="h-4 w-4 text-yellow-500 fill-yellow-500"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium ml-1">
                        {teacher.rating}
                      </span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {teacher.experience}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" aria-hidden="true" />
                    {teacher.location}
                  </div>

                  <div className="flex items-center mt-2">
                    {teacher.available ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 text-xs"
                      >
                        Available
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-gray-50 text-gray-500 border-gray-200 text-xs"
                      >
                        Unavailable
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <span className="text-lg font-bold">${teacher.price}/hr</span>
                <Button asChild size="sm">
                  <a
                    href={`/student/teacher/${teacher.id}`}
                    aria-label={`View ${teacher.name}'s profile`}
                  >
                    View Profile
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTeachers.length === 0 && (
        <div className="py-12 text-center">
          <h4 className="text-lg font-medium mb-2">No teachers found</h4>
          <p className="text-gray-500">Try adjusting your search criteria</p>
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="mt-4"
            aria-label="Reset filters when no results are found"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default FindTeacher;
