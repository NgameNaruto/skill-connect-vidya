
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/base-components";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-secondary py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="gradient-text">Connect</span>, <span className="gradient-text">Learn</span> &{" "}
            <span className="gradient-text">Grow</span> Together
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            VidyaPaalam bridges the gap between skilled mentors and eager learners.
            Share your expertise or master a new skill in our collaborative community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/skills">
              <Button size="lg" className="shadow-lg">
                Explore Skills
              </Button>
            </Link>
            <Link to="/become-mentor">
              <Button variant="outline" size="lg">
                Become a Mentor
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="md:w-1/2 relative">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000"
              alt="People sharing knowledge"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          
          <div className="absolute -bottom-5 -right-5 bg-white rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="bg-green-500 h-3 w-3 rounded-full animate-pulse"></div>
              <span className="font-medium">1,240+ active mentors</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden md:block absolute -bottom-16 -left-16 w-64 h-64 bg-skill/10 rounded-full blur-3xl"></div>
      <div className="hidden md:block absolute top-16 -right-16 w-64 h-64 bg-skill/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default HeroSection;
