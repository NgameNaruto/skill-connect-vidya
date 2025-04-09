
import { useState } from "react";
import SkillGrid from "../skills/SkillGrid";
import { Skill } from "../skills/SkillCard";
import { mockSkills } from "@/data/mockData";
import { Button } from "@/components/ui/base-components";

const FeaturedSkills = () => {
  const [visibleSkills, setVisibleSkills] = useState<Skill[]>(mockSkills.slice(0, 4));
  const [showingAll, setShowingAll] = useState(false);
  
  const handleShowMore = () => {
    if (showingAll) {
      setVisibleSkills(mockSkills.slice(0, 4));
      setShowingAll(false);
    } else {
      setVisibleSkills(mockSkills);
      setShowingAll(true);
    }
  };
  
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Skills</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover popular skills taught by our community mentors. 
          From creative arts to technical expertise, there's something for everyone.
        </p>
      </div>
      
      <SkillGrid skills={visibleSkills} />
      
      <div className="mt-12 text-center">
        <Button variant="outline" onClick={handleShowMore}>
          {showingAll ? "Show Less" : "Show More"}
        </Button>
      </div>
    </section>
  );
};

export default FeaturedSkills;
