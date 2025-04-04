
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export type Skill = {
  id: string;
  title: string;
  category: string;
  image: string;
  mentorName: string;
  mentorImage: string;
  rating: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

interface SkillCardProps {
  skill: Skill;
}

const SkillCard = ({ skill }: SkillCardProps) => {
  const difficultyColor = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Advanced: "bg-purple-100 text-purple-800",
  };

  return (
    <Link to={`/skills/${skill.id}`}>
      <Card className="skill-card overflow-hidden h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={skill.image} 
            alt={skill.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
          <Badge className="absolute top-3 right-3">
            {skill.category}
          </Badge>
        </div>
        
        <CardHeader className="pb-2">
          <h3 className="font-semibold text-lg">{skill.title}</h3>
        </CardHeader>
        
        <CardContent className="pb-2 flex-grow">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor[skill.difficulty]}`}>
              {skill.difficulty}
            </span>
            <div className="flex items-center">
              <span className="text-amber-500">★</span>
              <span className="text-sm ml-1">{skill.rating}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-2 border-t">
          <div className="flex items-center gap-2">
            <img 
              src={skill.mentorImage} 
              alt={skill.mentorName} 
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-muted-foreground">
              with {skill.mentorName}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SkillCard;
