import { useState } from "react";
import { useRoute } from "wouter";
import { useCourse } from "@/hooks/use-courses";
import { useProgress, useMarkComplete } from "@/hooks/use-progress";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, PlayCircle, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoursePlayer() {
  const [, params] = useRoute("/learn/:slug");
  const slug = params?.slug || "";
  
  const { data: course, isLoading } = useCourse(slug);
  const { data: progressList } = useProgress();
  const markComplete = useMarkComplete();
  
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (isLoading) return <div className="p-12 text-center">Loading player...</div>;
  if (!course) return <div className="p-12 text-center">Course not found.</div>;

  // Flatten lessons to easily find next/prev
  const allLessons = course.modules?.flatMap((m: any) => m.lessons) || [];
  
  // Initialize active lesson
  if (!activeLessonId && allLessons.length > 0) {
    setActiveLessonId(allLessons[0].id);
  }

  const activeLesson = allLessons.find((l: any) => l.id === activeLessonId);
  const activeLessonIndex = allLessons.findIndex((l: any) => l.id === activeLessonId);
  
  const handleMarkComplete = () => {
    if (activeLessonId) {
      markComplete.mutate(activeLessonId);
      // Auto advance
      if (activeLessonIndex < allLessons.length - 1) {
        setActiveLessonId(allLessons[activeLessonIndex + 1].id);
      }
    }
  };

  const completedSet = new Set(progressList?.map((p: any) => p.lessonId));

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
      {/* Sidebar Curriculum */}
      <div className={cn(
        "flex-shrink-0 border-r bg-muted/20 flex flex-col transition-all duration-300",
        sidebarOpen ? "w-80" : "w-0 overflow-hidden border-none"
      )}>
        <div className="p-4 border-b bg-card">
          <h2 className="font-bold line-clamp-1">{course.title}</h2>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <span className="font-medium text-primary">{completedSet.size}</span> / {allLessons.length} completed
          </div>
        </div>
        <ScrollArea className="flex-1">
          <Accordion type="multiple" defaultValue={course.modules?.map((m: any) => `m-${m.id}`)} className="w-full">
            {course.modules?.map((module: any, i: number) => (
              <AccordionItem key={module.id} value={`m-${module.id}`} className="border-b-0">
                <AccordionTrigger className="px-4 py-3 bg-muted/40 hover:bg-muted/60 text-sm font-bold">
                  Section {i + 1}: {module.title}
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-0">
                  <div className="flex flex-col">
                    {module.lessons?.map((lesson: any) => {
                      const isCompleted = completedSet.has(lesson.id);
                      const isActive = activeLessonId === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLessonId(lesson.id)}
                          className={cn(
                            "text-left px-4 py-3 text-sm flex items-start gap-3 transition-colors border-l-2",
                            isActive ? "bg-primary/5 border-primary text-primary font-medium" : "border-transparent hover:bg-muted",
                            isCompleted && !isActive ? "text-muted-foreground" : ""
                          )}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <PlayCircle className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground/50")} />
                            )}
                          </div>
                          <span className="line-clamp-2">{lesson.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </div>

      {/* Main Player Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="h-14 border-b flex items-center px-4 justify-between bg-card shrink-0">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={activeLessonIndex <= 0}
              onClick={() => setActiveLessonId(allLessons[activeLessonIndex - 1]?.id)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Prev
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              disabled={activeLessonIndex >= allLessons.length - 1}
              onClick={() => setActiveLessonId(allLessons[activeLessonIndex + 1]?.id)}
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {activeLesson ? (
          <div className="max-w-5xl mx-auto w-full p-4 md:p-8 flex-1">
            <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden mb-8 shadow-2xl flex items-center justify-center">
              {/* Fake Video Player since we don't have real videos */}
              {activeLesson.videoUrl ? (
                <iframe 
                  src={activeLesson.videoUrl} 
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="text-white/50 flex flex-col items-center">
                  <PlayCircle className="w-16 h-16 mb-4 opacity-50" />
                  <p>Video Placeholder for: {activeLesson.title}</p>
                </div>
              )}
            </div>
            
            <div className="flex items-start justify-between gap-6 flex-wrap mb-8 pb-8 border-b">
              <div>
                <h1 className="text-3xl font-bold mb-2">{activeLesson.title}</h1>
                <p className="text-muted-foreground">Module: {course.modules.find((m:any) => m.id === activeLesson.moduleId)?.title}</p>
              </div>
              <Button 
                size="lg" 
                onClick={handleMarkComplete}
                disabled={completedSet.has(activeLesson.id) || markComplete.isPending}
                className={cn(
                  "rounded-full transition-all shrink-0",
                  completedSet.has(activeLesson.id) ? "bg-emerald-500 text-white opacity-100" : ""
                )}
              >
                {completedSet.has(activeLesson.id) ? (
                  <><CheckCircle2 className="w-5 h-5 mr-2" /> Completed</>
                ) : (
                  "Mark as Complete"
                )}
              </Button>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {activeLesson.content ? (
                <div dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
              ) : (
                <p className="text-muted-foreground italic">No additional reading material for this lesson.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a lesson to start learning.
          </div>
        )}
      </div>
    </div>
  );
}
