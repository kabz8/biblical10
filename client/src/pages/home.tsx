import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CourseCard } from "@/components/course-card";
import { useCourses } from "@/hooks/use-courses";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Play, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { t } = useTranslation();
  const { data: courses, isLoading } = useCourses();

  return (
    <div className="relative">
      {/* Background Blobs */}
      <div className="blob-shape bg-primary/20 w-96 h-96 top-0 left-[-10%]"></div>
      <div className="blob-shape bg-secondary/20 w-96 h-96 top-40 right-[-10%] animation-delay-2000"></div>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 container mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
            <Star className="w-4 h-4 fill-current" /> Over 10,000+ happy students
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            {t('hero.title').split(' ').map((word, i) => (
              i > 1 ? <span key={i} className="text-gradient"> {word}</span> : <span key={i}> {word}</span>
            ))}
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full text-lg px-8 h-14 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              {t('hero.cta')} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-lg px-8 h-14 hover:bg-muted border-2">
              <Play className="mr-2 w-5 h-5" /> Watch Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Stats/Trust Section */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, label: "Active Students", val: "50k+" },
              { icon: Play, label: "Video Lessons", val: "1,200+" },
              { icon: Star, label: "5-Star Reviews", val: "4.9/5" },
              { icon: ShieldCheck, label: "Money-back Guarantee", val: "30 Days" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h4 className="text-3xl font-bold">{stat.val}</h4>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Most Popular Tracks</h2>
          <p className="text-lg text-muted-foreground">Jumpstart your learning with our highest-rated, step-by-step curriculum.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-full h-80 bg-muted animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses?.slice(0, 6).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
      
      {/* Bottom CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10 bg-card border shadow-2xl rounded-3xl p-12 md:p-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to transform your skills?</h2>
          <p className="text-xl text-muted-foreground mb-10">Join today and get immediate access to all courses, community, and resources.</p>
          <Button size="lg" className="rounded-full text-lg px-10 h-14 bg-foreground text-background hover:bg-foreground/90 shadow-xl transition-all hover:-translate-y-1">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
}
