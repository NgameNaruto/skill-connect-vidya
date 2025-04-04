
import SkillCard, { Skill } from "./SkillCard";

interface SkillGridProps {
  skills: Skill[];
}

const SkillGrid = ({ skills }: SkillGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
};

export default SkillGrid;
