
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/base-components";

interface SkillCategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const SkillCategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: SkillCategoryFilterProps) => {
  return (
    <div className="w-full mb-6">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => onSelectCategory("all")}
            className="rounded-full"
          >
            All Categories
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => onSelectCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default SkillCategoryFilter;
