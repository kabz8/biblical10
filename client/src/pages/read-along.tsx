import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookMarked, Users, Star, Send, Upload, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const currentBooks = [
  { id: 1, title: "God and Money", author: "John Cortines & Gregory Baumer", chapter: "Chapter 8: The Theology of Enough", participants: 892, progress: 65, week: "Week 8 of 12", discussion: "Active" },
  { id: 2, title: "The Blessed Life", author: "Robert Morris", chapter: "Chapter 5: Proving God", participants: 567, progress: 40, week: "Week 5 of 12", discussion: "Active" },
];

const upcomingBooks = [
  { title: "Managing God's Money", author: "Randy Alcorn", starts: "January 15, 2026", spots: 120, enrolled: 43 },
  { title: "Money, Possessions, and Eternity", author: "Randy Alcorn", starts: "February 1, 2026", spots: 80, enrolled: 29 },
  { title: "The Total Money Makeover (Christian Edition)", author: "Dave Ramsey", starts: "March 1, 2026", spots: 200, enrolled: 112 },
];

const discussions = [
  { book: "God and Money", topic: "How do we define 'enough' in a consumer culture?", replies: 34, author: "Sarah M.", time: "2 hours ago" },
  { book: "The Blessed Life", topic: "Has anyone seen tangible results from consistent tithing?", replies: 67, author: "David K.", time: "4 hours ago" },
  { book: "God and Money", topic: "Discussion on chapter 7 — giving as worship", replies: 23, author: "Grace N.", time: "Yesterday" },
];

const submitSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  mediaUrl: z.string().optional(),
});

export default function ReadAlong() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(submitSchema),
    defaultValues: { title: "", content: "", mediaUrl: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/activity-submissions", { ...data, activityType: "read-along" });
    },
    onSuccess: () => {
      toast({ title: "Post Submitted!", description: "Your insight has been added to the community." });
      form.reset();
    },
    onError: () => toast({ title: "Error", description: "Submission failed.", variant: "destructive" }),
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-foreground text-background py-16 text-center">
        <div className="container mx-auto px-4">
          <BookMarked className="w-14 h-14 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Read Along</h1>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Study biblical financial wisdom together with a global community of readers
          </p>
        </div>
      </section>

      {/* Current Reads */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Currently Reading</h2>
          <p className="text-muted-foreground">Join an active book club and read with others</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {currentBooks.map((book) => (
            <Card key={book.id} className="border border-border/50 shadow-lg overflow-hidden">
              <div className="h-2 bg-primary" />
              <CardContent className="p-7">
                <Badge className="mb-3 bg-green-100 text-green-700 border-0">{book.week}</Badge>
                <h3 className="font-bold text-xl mb-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">by {book.author}</p>
                <p className="text-sm font-medium text-primary mb-4">{book.chapter}</p>
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span><span>{book.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${book.progress}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                  <Users className="w-4 h-4" />{book.participants} readers
                  <Badge variant="outline" className="ml-auto text-xs">{book.discussion}</Badge>
                </div>
                <Button className="w-full font-bold rounded-full">Join This Book Club</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Upcoming Books</h2>
            <p className="text-muted-foreground">Register for the next reading cycles</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingBooks.map((book) => (
              <Card key={book.title} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">by {book.author}</p>
                  <div className="space-y-1.5 text-sm mb-5">
                    <div className="flex justify-between"><span className="text-muted-foreground">Starts:</span><span>{book.starts}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Spots:</span><span>{book.enrolled}/{book.spots}</span></div>
                  </div>
                  <Button className="w-full font-bold rounded-full">Register</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Discussion + Form */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Community Discussions</h2>
            <div className="space-y-4">
              {discussions.map((d, i) => (
                <Card key={i} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="outline" className="text-xs shrink-0">{d.book}</Badge>
                      <span className="text-xs text-muted-foreground">{d.time}</span>
                    </div>
                    <h4 className="font-medium mb-3">{d.topic}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>By {d.author}</span>
                      <span>{d.replies} replies</span>
                      <Button size="sm" variant="ghost" className="ml-auto h-7 text-xs rounded-full">Join Discussion</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-primary/20 shadow-xl overflow-hidden">
              <div className="h-2 w-full bg-primary" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Send className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold">Share an Insight</h3>
                </div>
                {!isAuthenticated ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground text-sm mb-4">Login to share your reading insights.</p>
                    <Button asChild className="w-full font-bold"><a href="/auth">Login</a></Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
                      <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem><FormLabel>Topic</FormLabel><FormControl><Input placeholder="What insight are you sharing?" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="content" render={({ field }) => (
                        <FormItem><FormLabel>Your Thoughts</FormLabel><FormControl><Textarea placeholder="Share what you learned..." className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="submit" className="w-full font-bold h-11" disabled={mutation.isPending}>
                        {mutation.isPending ? "Submitting..." : "Post Insight"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">Read, Grow, Transform</h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">Join a community of readers who are letting God's Word reshape their relationship with money.</p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-10 rounded-full">Join a Book Club</Button>
        </div>
      </section>
    </div>
  );
}
