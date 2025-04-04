
import { BookOpen, Calendar, MessageCircle, UserCheck } from "lucide-react";

const steps = [
  {
    icon: <BookOpen className="h-8 w-8 text-skill" />,
    title: "Browse Skills",
    description: "Explore our diverse range of skills taught by experienced mentors",
  },
  {
    icon: <UserCheck className="h-8 w-8 text-skill" />,
    title: "Choose a Mentor",
    description: "Select a mentor whose experience and teaching style match your needs",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-skill" />,
    title: "Connect",
    description: "Reach out to your chosen mentor to discuss your learning goals",
  },
  {
    icon: <Calendar className="h-8 w-8 text-skill" />,
    title: "Learn & Grow",
    description: "Schedule sessions, track your progress, and master new skills",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How VidyaPaalam Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our simple process connects learners with the right mentors in just a few steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <div className="mb-4 p-3 bg-skill/10 rounded-full">
                {step.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-muted-foreground"
                  >
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
