
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Upload, Video, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TeacherProfileEdit = () => {
  const [profileData, setProfileData] = useState({
    name: "Jane Smith",
    title: "Yoga & Meditation Teacher",
    email: "jane.smith@example.com",
    phone: "+1 (555) 123-4567",
    aboutMe: "Certified yoga instructor with 5+ years of experience teaching various styles including Hatha, Vinyasa, and Restorative yoga. I specialize in helping beginners develop proper form and build confidence in their practice.",
    experience: "5+ years",
    hourlyRate: "30",
    qualifications: [
      "Certified Yoga Teacher (200-Hour YTT)",
      "Meditation Practitioner (3+ years)",
      "Specialized in Beginners Training"
    ],
    skills: ["Yoga", "Meditation"],
  });
  
  const [videoUrl, setVideoUrl] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newQualification, setNewQualification] = useState("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated successfully",
    });
  };
  
  const handleAddSkill = () => {
    if (newSkill && !profileData.skills.includes(newSkill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill("");
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };
  
  const handleAddQualification = () => {
    if (newQualification && !profileData.qualifications.includes(newQualification)) {
      setProfileData(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualification]
      }));
      setNewQualification("");
    }
  };
  
  const handleRemoveQualification = (qualification: string) => {
    setProfileData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter(q => q !== qualification)
    }));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">Edit Your Profile</h2>
        <p className="text-muted-foreground">Update your profile information and teaching details.</p>
      </div>
      
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="teaching">Teaching Profile</TabsTrigger>
          <TabsTrigger value="media">Media & Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Update your profile details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" type="button">
                      <Upload className="mr-2 h-4 w-4" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Recommended: Square image, at least 300x300 pixels
                    </p>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g., Yoga Instructor"
                      value={profileData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="aboutMe">About Me</Label>
                  <textarea
                    id="aboutMe"
                    name="aboutMe"
                    className="min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell students about yourself..."
                    value={profileData.aboutMe}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Write a brief introduction about yourself and your teaching philosophy.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">
                    Save Basic Information
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teaching">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Profile</CardTitle>
              <CardDescription>
                Information about your skills, qualifications, and teaching services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      name="experience"
                      placeholder="e.g., 5+ years"
                      value={profileData.experience}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                    <Input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      min="0"
                      value={profileData.hourlyRate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Skills & Subjects You Teach</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {profileData.skills.map((skill) => (
                      <Badge key={skill} className="gap-1">
                        {skill}
                        <button
                          className="ml-1 rounded-full outline-none focus:ring-2"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill or subject"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <Button type="button" onClick={handleAddSkill}>
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Qualifications & Certifications</Label>
                  <div className="space-y-2 mb-2">
                    {profileData.qualifications.map((qualification, index) => (
                      <div key={index} className="flex items-center justify-between border rounded-md p-2">
                        <span>{qualification}</span>
                        <button
                          className="text-muted-foreground hover:text-primary"
                          onClick={() => handleRemoveQualification(qualification)}
                          type="button"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add qualification or certification"
                      value={newQualification}
                      onChange={(e) => setNewQualification(e.target.value)}
                    />
                    <Button type="button" onClick={handleAddQualification}>
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">
                    Save Teaching Information
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Media & Videos</CardTitle>
              <CardDescription>
                Add videos and media to showcase your teaching style
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Introduction Video</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Add a short video introducing yourself and your teaching style
                </p>
                
                {videoUrl ? (
                  <div className="space-y-2">
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <p className="text-center text-muted-foreground">Video preview would be shown here</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm truncate max-w-[250px]">{videoUrl}</span>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => setVideoUrl("")}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-md p-8 text-center space-y-2">
                    <Video className="h-10 w-10 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">No video uploaded</p>
                      <p className="text-xs text-muted-foreground">
                        Upload a short video to introduce yourself to potential students
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setVideoUrl("https://example.com/sample-video.mp4")}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Video
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Teaching Gallery</Label>
                <p className="text-sm text-muted-foreground">
                  Add photos that showcase your teaching environment or past classes
                </p>
                
                <div className="border-2 border-dashed rounded-md p-8 text-center">
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm font-medium">
                    Drag photos here or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload up to 10 photos (max 5MB each)
                  </p>
                  <Button variant="outline" className="mt-4">
                    Select Photos
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  Save Media
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default TeacherProfileEdit;
