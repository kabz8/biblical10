import { useRoute } from "wouter";
import { useCourse } from "@/hooks/use-courses";
import { useCreateEnrollment, useEnrollments } from "@/hooks/use-enrollments";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, PlayCircle, Lock, Unlock, Zap, Trophy, Shield } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CourseLanding() {
  const [, params] = useRoute("/courses/:slug");
  const slug = params?.slug || "";
  
  const { data: course, isLoading } = useCourse(slug);
  const { user, isAuthenticated } = useAuth();
  const { data: enrollments } = useEnrollments();
  const enrollMutation = useCreateEnrollment();
  const { scrollY } = useScroll();
  
  // Show sticky bar after scrolling down 500px
  const stickyOpacity = useTransform(scrollY, [400, 500], [0, 1]);
  const stickyY = useTransform(scrollY, [400, 500], [-100, 0]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading course magic...</div>;
  }

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center">Course not found.</div>;
  }

  const isEnrolled = enrollments?.some((e: any) => e.courseId === course.id);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      window.location.href = "/api/login";
      return;
    }
    enrollMutation.mutate(course.id);
  };

  return (
    <div className="relative bg-background">
      {/* Sticky Enroll Bar */}
      <motion.div 
        style={{ opacity: stickyOpacity, y: stickyY }}
        className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b z-50 py-3 px-4 shadow-sm hidden md:block"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-muted overflow-hidden">
              {/* landing page course thumbnail */}
              <img src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&q=80"} className="w-full h-full object-cover" alt="thumb" />
            </div>
            <h3 className="font-bold">{course.title}</h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-xl">{course.price === 0 ? "Free" : `$${(course.price/100).toFixed(2)}`}</span>
            <Button onClick={handleEnroll} disabled={isEnrolled || enrollMutation.isPending} className="rounded-full shadow-lg hover:shadow-xl transition-all">
              {isEnrolled ? "Already Enrolled" : (enrollMutation.isPending ? "Enrolling..." : "Enroll Now")}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Miss Excel Style Hero */}
      <section className="pt-12 pb-24 px-4 overflow-hidden relative">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-bold text-sm tracking-widest uppercase">
              Brand New Course
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
              {course.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {course.description}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-primary w-6 h-6" />
                <span className="text-lg font-medium">Lifetime Access</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-primary w-6 h-6" />
                <span className="text-lg font-medium">Step-by-step Video Modules</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-primary w-6 h-6" />
                <span className="text-lg font-medium">Private Community Access</span>
              </div>
            </div>

            <div className="pt-6">
              <Button 
                onClick={handleEnroll} 
                disabled={isEnrolled || enrollMutation.isPending}
                className="w-full sm:w-auto h-16 px-10 text-xl rounded-full bg-gradient-brand shadow-[0_10px_40px_-10px_rgba(226,54,112,0.6)] hover:shadow-[0_10px_50px_-10px_rgba(226,54,112,0.8)] hover:-translate-y-1 transition-all"
              >
                {isEnrolled ? "Access Course" : `Enroll Now for ${course.price === 0 ? "Free" : `$${(course.price/100).toFixed(2)}`}`}
              </Button>
              <p className="text-sm text-center sm:text-left text-muted-foreground mt-4 flex items-center justify-center sm:justify-start gap-2">
                <Shield className="w-4 h-4" /> 30-Day Money-Back Guarantee
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[2.5rem] transform rotate-3 scale-105 opacity-20"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-background shadow-2xl bg-card">
              {/* landing page main course image */}
              <img 
                src={course.imageUrl || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=80"} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer hover:bg-black/30 transition-all">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-primary shadow-2xl group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-10 h-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For You If... Section */}
      <section className="py-24 bg-muted/50 border-y">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">This is <span className="text-primary italic">exactly</span> for you if...</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "You're tired of watching disjointed YouTube tutorials.",
              "You want a proven, step-by-step system.",
              "You are ready to level up your career.",
              "You value your time and want the fast track."
            ].map((text, i) => (
              <div key={i} className="flex gap-4 bg-card p-6 rounded-2xl shadow-sm border">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                  <Zap className="w-5 h-5" />
                </div>
                <p className="text-lg font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Accordion */}
      <section className="py-24 px-4 container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Inside the Curriculum</h2>
          <p className="text-xl text-muted-foreground">Everything you need, nothing you don't.</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {course.modules?.map((module: any, i: number) => (
            <AccordionItem key={module.id} value={`module-${module.id}`} className="bg-card border rounded-2xl px-2 overflow-hidden shadow-sm">
              <AccordionTrigger className="hover:no-underline px-4 py-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="hidden sm:flex w-12 h-12 rounded-full bg-muted items-center justify-center font-bold text-muted-foreground">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{module.title}</h3>
                    <p className="text-sm text-muted-foreground font-normal mt-1">{module.lessons?.length || 0} Lessons</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-6 pt-2">
                <div className="space-y-3 pl-0 sm:pl-16">
                  {module.lessons?.map((lesson: any) => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 hover:bg-muted rounded-xl transition-colors">
                      <div className="flex items-center gap-3">
                        {lesson.isFreePreview ? (
                          <PlayCircle className="w-5 h-5 text-secondary" />
                        ) : (
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        )}
                        <span className="font-medium">{lesson.title}</span>
                      </div>
                      {lesson.isFreePreview && (
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none">Preview</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
          {(!course.modules || course.modules.length === 0) && (
             <div className="text-center p-8 bg-card rounded-2xl border text-muted-foreground">
               Modules are being updated. Check back soon!
             </div>
          )}
        </Accordion>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Trophy className="w-16 h-16 mx-auto mb-8 text-primary" />
          <h2 className="text-5xl font-bold mb-8">It's time to bet on yourself.</h2>
          <p className="text-xl text-muted mb-12">
            Join {course.title} today and get instant access to all materials. The price goes up soon.
          </p>
          <Button 
            onClick={handleEnroll} 
            disabled={isEnrolled || enrollMutation.isPending}
            size="lg" 
            className="h-16 px-12 text-xl rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all shadow-2xl shadow-primary/50"
          >
            {isEnrolled ? "Go to Dashboard" : "I'm Ready - Enroll Now"}
          </Button>
        </div>
      </section>
    </div>
  );
}
