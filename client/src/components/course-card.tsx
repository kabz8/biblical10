import { Link } from "wouter";
import { PlayCircle, Clock, BookOpen } from "lucide-react";
import { Course } from "@shared/schema";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

export function CourseCard({ course }: { course: Course }) {
  const { t } = useTranslation();
  
  return (
    <Link href={`/courses/${course.slug}`}>
      <div className="group relative flex flex-col bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="aspect-video w-full overflow-hidden bg-muted relative">
          <img 
            src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"} 
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-primary transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <PlayCircle className="w-6 h-6" />
            </div>
          </div>
          <div className="absolute top-3 left-3 flex gap-2">
            {course.price === 0 && (
              <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none font-semibold">
                {t('course.free')}
              </Badge>
            )}
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm border-none font-medium capitalize">
              {course.level}
            </Badge>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-xl font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
            {course.description}
          </p>
          
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mt-auto pt-4 border-t">
            {course.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {course.duration}
              </div>
            )}
            <div className="flex items-center gap-1.5 ml-auto text-primary">
              <BookOpen className="w-4 h-4" />
              <span>{t('course.start')} &rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
