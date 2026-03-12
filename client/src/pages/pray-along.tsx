import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Headphones, Play, Users, Heart, Send, Clock } from "lucide-react";
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

const prayerTracks = [
  { id: 1, title: "The Provision Journey", desc: "A 20-minute immersive prayer experience focused on Jehovah Jireh, our Provider.", duration: "20 min", listeners: 3456, theme: "Provision", verse: "Philippians 4:19" },
  { id: 2, title: "Night Watch Prayer", desc: "A calming prayer journey for peaceful sleep and surrender before God.", duration: "15 min", listeners: 2134, theme: "Peace", verse: "Psalm 4:8" },
  { id: 3, title: "Morning Breakthrough", desc: "Start your day with powerful declarations over your life and family.", duration: "10 min", listeners: 5678, theme: "Breakthrough", verse: "Lamentations 3:22-23" },
  { id: 4, title: "Healing & Restoration", desc: "A gentle prayer journey for those who are hurting or in need of physical healing.", duration: "25 min", listeners: 1890, theme: "Healing", verse: "Jeremiah 30:17" },
  { id: 5, title: "Faith Over Fear", desc: "Overcome anxiety and fear through scriptural declarations and praise.", duration: "18 min", listeners: 4231, theme: "Faith", verse: "Isaiah 41:10" },
  { id: 6, title: "Gratitude & Worship", desc: "Enter God's presence with thanksgiving and leave transformed.", duration: "12 min", listeners: 2987, theme: "Gratitude", verse: "Psalm 100:4" },
];

const liveSessions = [
  { time: "7:00 AM", title: "Morning Glory Prayer", host: "Pastor James", participants: 456, status: "Live" },
  { time: "12:00 PM", title: "Noon Intercession", host: "Sister Grace", participants: 234, status: "Live" },
  { time: "9:00 PM", title: "Night Watch", host: "Elder Moses", participants: 678, status: "Tonight" },
];

const prayerWall = [
  { request: "Wisdom for a major business decision this month", anonymous: false, name: "Elizabeth K.", prayed: 34 },
  { request: "Financial breakthrough for my family who are struggling with rent", anonymous: true, name: "Anonymous", prayed: 78 },
  { request: "Healing for my mother who was diagnosed last week", anonymous: false, name: "Thomas A.", prayed: 156 },
  { request: "Restoration of my marriage and family unity", anonymous: true, name: "Anonymous", prayed: 89 },
];

const submitSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  mediaUrl: z.string().optional(),
});

export default function PrayAlong() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [prayedIds, setPrayedIds] = useState<number[]>([]);
  const { joinSession, startActivity, joinCommunity } = useActionCTA();

  const form = useForm({
    resolver: zodResolver(submitSchema),
    defaultValues: { title: "", content: "", mediaUrl: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/activity-submissions", { ...data, activityType: "pray-along" });
    },
    onSuccess: () => {
      toast({ title: "Prayer Request Submitted!", description: "Our community will be praying for you." });
      form.reset();
    },
    onError: () => toast({ title: "Error", description: "Submission failed. Please try again.", variant: "destructive" }),
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-foreground text-background py-16 text-center">
        <div className="container mx-auto px-4">
          <Headphones className="w-14 h-14 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pray Along</h1>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Join our global prayer community and experience the power of united intercession
          </p>
        </div>
      </section>

      {/* Live Sessions */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Live Prayer Sessions</h2>
          <p className="text-muted-foreground">Join others praying together right now</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {liveSessions.map((s) => (
            <Card key={s.time} className="border border-border/50 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Badge className={`mb-4 text-xs text-white ${s.status === "Live" ? "bg-red-500" : "bg-secondary"}`}>{s.status}</Badge>
                <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">Led by {s.host}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
                  <Users className="w-4 h-4" />{s.participants} praying
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-5">
                  <Clock className="w-3.5 h-3.5" />{s.time}
                </div>
                <Button className="w-full font-bold rounded-full" onClick={() => joinSession(s.title)}>
                  <Play className="w-4 h-4 mr-2" />Join Prayer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Prayer Tracks */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Prayer Tracks</h2>
            <p className="text-muted-foreground">Guided audio prayer journeys for any moment</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prayerTracks.map((track) => (
              <Card key={track.id} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">{track.theme}</Badge>
                    <span className="ml-auto text-xs text-muted-foreground">{track.duration}</span>
                  </div>
                  <h3 className="font-bold text-base mb-2">{track.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{track.desc}</p>
                  <p className="text-xs text-primary font-medium mb-4 italic">{track.verse}</p>
                  <div className="flex items-center text-xs text-muted-foreground mb-4">
                    <Headphones className="w-3 h-3 mr-1" />{track.listeners.toLocaleString()} listeners
                  </div>
                  <Button className="w-full font-bold rounded-full" onClick={() => startActivity(track.title)}>
                    <Play className="w-4 h-4 mr-2" />Listen & Pray
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Wall + Form */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Community Prayer Wall</h2>
            <div className="space-y-4">
              {prayerWall.map((p, i) => (
                <Card key={i} className="border border-border/50 shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-sm">
                        {p.anonymous ? "?" : p.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{p.name}</div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{p.request}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => setPrayedIds(ids => ids.includes(i) ? ids.filter(id => id !== i) : [...ids, i])}
                        className={`flex items-center gap-1.5 text-sm transition-colors ${prayedIds.includes(i) ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                      >
                        <Heart className="w-4 h-4" />Praying ({p.prayed + (prayedIds.includes(i) ? 1 : 0)})
                      </button>
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
                  <h3 className="text-lg font-bold">Submit a Prayer Request</h3>
                </div>
                {!isAuthenticated ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground text-sm mb-4">Please log in to submit a prayer request.</p>
                    <Button className="w-full font-bold" onClick={() => joinCommunity()}>Login</Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
                      <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem><FormLabel>Request Title</FormLabel><FormControl><Input placeholder="e.g. Prayer for provision" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="content" render={({ field }) => (
                        <FormItem><FormLabel>Details</FormLabel><FormControl><Textarea placeholder="Share your prayer need..." className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="submit" className="w-full font-bold h-11" disabled={mutation.isPending}>
                        {mutation.isPending ? "Submitting..." : "Post Prayer Request"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <Headphones className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-3">The Prayer of the Righteous is Powerful</h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">Join our prayer community and see God move in your life and the lives of others.</p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-10 rounded-full" onClick={joinCommunity}>
            Join Prayer Community
          </Button>
        </div>
      </section>
    </div>
  );
}
