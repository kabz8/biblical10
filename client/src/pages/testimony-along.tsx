import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, MessageSquare, Send } from "lucide-react";
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
import { useActionCTA } from "@/hooks/use-action-cta";

const testimonies = [
  { id: 1, name: "Grace Okwuosa", avatar: "G", category: "Financial Breakthrough", date: "2 days ago", likes: 87, comments: 23, content: "After applying the biblical stewardship principles from this community, our family paid off $28,000 in debt in just 14 months! God is faithful and His Word truly works when we trust Him with our finances.", verified: true },
  { id: 2, name: "David Kamau", avatar: "D", category: "Business Blessing", date: "5 days ago", likes: 142, comments: 31, content: "I was about to close my business after 3 years of struggle. I joined the prayer along and started applying tithing consistently. Within 2 months, I got my biggest contract ever — worth more than the previous 3 years combined.", verified: true },
  { id: 3, name: "Marie Dubois", avatar: "M", category: "Faith Testimony", date: "1 week ago", likes: 56, comments: 14, content: "The Read Along sessions changed how I read Scripture. I now see the financial promises of God everywhere in the Bible. My mindset around money has completely transformed.", verified: false },
  { id: 4, name: "Samuel Osei", avatar: "S", category: "Career Miracle", date: "2 weeks ago", likes: 203, comments: 45, content: "I prayed and studied the stewardship course for 3 months while unemployed. God opened a door I never expected — a remote role paying 3x my previous salary with a Christian-led company.", verified: true },
];

const categoryColors: Record<string, string> = {
  "Financial Breakthrough": "bg-green-100 text-green-700",
  "Business Blessing": "bg-blue-100 text-blue-700",
  "Faith Testimony": "bg-purple-100 text-purple-700",
  "Career Miracle": "bg-amber-100 text-amber-700",
};

const submitSchema = z.object({
  title: z.string().min(3, "Please provide a title"),
  content: z.string().min(20, "Please share more detail (at least 20 characters)"),
  mediaUrl: z.string().optional(),
});

export default function TestimonyAlong() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { joinCommunity } = useActionCTA();
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const form = useForm({
    resolver: zodResolver(submitSchema),
    defaultValues: { title: "", content: "", mediaUrl: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/activity-submissions", { ...data, activityType: "testimony-along" });
    },
    onSuccess: () => {
      toast({ title: "Testimony Submitted!", description: "Your testimony will be reviewed and published shortly. Amen!" });
      form.reset();
    },
    onError: () => toast({ title: "Error", description: "Submission failed. Please try again.", variant: "destructive" }),
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-foreground text-background py-16 text-center">
        <div className="container mx-auto px-4">
          <Users className="w-14 h-14 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Testimony Along</h1>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Share your story and be encouraged by God's faithfulness in the lives of others
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="border-b bg-muted/30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-8 md:gap-16 text-center">
            {[{ val: "2,341", label: "Testimonies Shared" }, { val: "15,678", label: "Lives Inspired" }, { val: "47", label: "Countries" }].map(s => (
              <div key={s.label}><div className="text-2xl font-bold text-primary">{s.val}</div><div className="text-xs text-muted-foreground">{s.label}</div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Testimonies Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Recent Testimonies</h2>
            {testimonies.map((t) => (
              <Card key={t.id} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0">{t.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold">{t.name}</span>
                        {t.verified && <Badge className="text-[10px] bg-green-100 text-green-700 border-0">Verified</Badge>}
                        <span className="text-xs text-muted-foreground ml-auto">{t.date}</span>
                      </div>
                      <Badge className={`text-xs border-0 mt-1 ${categoryColors[t.category] || "bg-muted text-muted-foreground"}`}>{t.category}</Badge>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-5">{t.content}</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setLikedIds(ids => ids.includes(t.id) ? ids.filter(i => i !== t.id) : [...ids, t.id])}
                      className={`flex items-center gap-1.5 text-sm transition-colors ${likedIds.includes(t.id) ? "text-red-500" : "text-muted-foreground hover:text-red-500"}`}
                    >
                      <Heart className="w-4 h-4" />{t.likes + (likedIds.includes(t.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <MessageSquare className="w-4 h-4" />{t.comments}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submission Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-primary/20 shadow-xl overflow-hidden">
              <div className="h-2 w-full bg-primary" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Send className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold">Share Your Testimony</h3>
                </div>
                {!isAuthenticated ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground text-sm mb-4">Please log in to share your testimony with the community.</p>
                    <Button className="w-full font-bold" onClick={() => joinCommunity()}>Login to Share</Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
                      <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="e.g. God cleared my debt!" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="content" render={({ field }) => (
                        <FormItem><FormLabel>Your Testimony</FormLabel><FormControl><Textarea placeholder="Share what God has done in your life..." className="min-h-[140px]" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="mediaUrl" render={({ field }) => (
                        <FormItem><FormLabel>Media Link (Optional)</FormLabel><FormControl><Input placeholder="YouTube, audio or image URL..." {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="submit" className="w-full font-bold h-11" disabled={mutation.isPending}>
                        {mutation.isPending ? "Submitting..." : "Submit Testimony"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">Your Story Matters</h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">Every testimony of God's faithfulness encourages someone else to keep trusting Him. Share yours today.</p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-10 rounded-full" onClick={joinCommunity}>
            Share Your Story
          </Button>
        </div>
      </section>
    </div>
  );
}
