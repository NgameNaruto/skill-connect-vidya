
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    content: "VidyaPaalam helped me connect with an amazing web development mentor. I went from coding novice to building my own projects in just three months!",
    author: "Anita S.",
    role: "Learner",
    avatar: "AS"
  },
  {
    id: 2,
    content: "Being a mentor on VidyaPaalam has been incredibly rewarding. I've shared my photography skills with students worldwide and even improved my own expertise.",
    author: "Rahul K.",
    role: "Mentor",
    avatar: "RK"
  },
  {
    id: 3,
    content: "The platform made it easy to find students interested in traditional cooking. I now have regular sessions teaching authentic recipes from my culture.",
    author: "Priya M.",
    role: "Mentor",
    avatar: "PM"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hear from mentors and learners who have experienced the power of skill-sharing on VidyaPaalam
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-skill text-white">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="italic text-muted-foreground">"{testimonial.content}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
