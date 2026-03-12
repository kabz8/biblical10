import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Play, Clock, Users, Leaf, Heart, Zap, Star, Shield, Wind } from "lucide-react";
import { useActionCTA } from "@/hooks/use-action-cta";

const meditationCategories = [
  { icon: <Leaf className="w-8 h-8" />, title: "Peace & Calm", desc: "Find tranquility in God's presence during stressful times", sessions: 24, duration: "5-20 minutes", participants: 456, color: "bg-rose-100 text-rose-600" },
  { icon: <Heart className="w-8 h-8" />, title: "Gratitude & Thanksgiving", desc: "Cultivate a heart of gratitude for God's blessings", sessions: 18, duration: "8-15 minutes", participants: 329, color: "bg-pink-100 text-pink-600" },
  { icon: <Zap className="w-8 h-8" />, title: "Healing & Restoration", desc: "Meditations for physical, emotional, and spiritual healing", sessions: 21, duration: "10-25 minutes", participants: 278, color: "bg-amber-100 text-amber-600" },
  { icon: <Star className="w-8 h-8" />, title: "Trust & Faith", desc: "Strengthen your faith and trust in God's plan", sessions: 19, duration: "6-18 minutes", participants: 234, color: "bg-yellow-100 text-yellow-600" },
  { icon: <Shield className="w-8 h-8" />, title: "Forgiveness & Grace", desc: "Experience God's forgiveness and extend it to others", sessions: 16, duration: "12-20 minutes", participants: 189, color: "bg-green-100 text-green-600" },
  { icon: <Wind className="w-8 h-8" />, title: "Love & Compassion", desc: "Meditate on God's love and grow in compassion", sessions: 22, duration: "5-15 minutes", participants: 345, color: "bg-blue-100 text-blue-600" },
];

const upcomingSessions = [
  { time: "6:00 AM", title: "Morning Stillness", host: "Sister Grace", duration: "20 min", joined: 156 },
  { time: "12:00 PM", title: "Midday Peace Break", host: "Pastor Tim", duration: "15 min", joined: 89 },
  { time: "8:00 PM", title: "Evening Reflection", host: "Elder Ruth", duration: "30 min", joined: 234 },
];

export default function MeditateAlong() {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const { joinSession, startActivity, explore, joinCommunity } = useActionCTA();

  const togglePlay = () => {
    setPlaying(!playing);
    if (!playing) {
      setProgress(p => Math.min(p + 15, 100));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-foreground text-background py-16 text-center">
        <div className="container mx-auto px-4">
          <Sparkles className="w-14 h-14 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meditate Along</h1>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Join our community in quiet reflection and find peace in God's presence through guided meditation
          </p>
        </div>
      </section>

      {/* Today's Meditation */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Today's Guided Meditation</h2>
          <p className="text-muted-foreground">Join 892 others in today's meditation on God's peace</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Card className="border border-green-200 bg-green-50/30 dark:bg-green-900/10 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-1">Finding Peace in God's Presence</h3>
                <p className="text-green-600 font-medium text-sm">15-minute guided meditation · Based on Psalm 46:10</p>
              </div>

              {/* Player */}
              <div className="bg-background rounded-2xl p-6 mb-6 border">
                <div className="flex justify-center mb-4">
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                  >
                    <Play className="w-7 h-7 ml-1" />
                  </button>
                </div>
                <p className="text-center italic text-muted-foreground mb-1 text-sm">"Be still, and know that I am God; I will be exalted among the nations."</p>
                <p className="text-center text-xs font-medium text-muted-foreground mb-5">Psalm 46:10</p>
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Meditation Focus:</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">In our noisy world, God invites us to be still and remember His sovereignty. This meditation will guide you through breathing exercises, scripture reflection, and quiet prayer to help you find His peace.</p>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground">0:00</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden cursor-pointer" onClick={() => setProgress(p => Math.min(p + 10, 100))}>
                    <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">15:00</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-sm mb-3">What You'll Experience:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>· Guided breathing exercises (3 minutes)</li>
                    <li>· Scripture meditation on Psalm 46:10 (5 minutes)</li>
                    <li>· Silent prayer and reflection (5 minutes)</li>
                    <li>· Closing prayer and affirmation (2 minutes)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-3">Community Feedback:</p>
                  <div className="space-y-3">
                    <div className="bg-muted/50 rounded-xl p-3 text-xs text-muted-foreground">"This meditation brought such peace to my anxious heart."<br /><span className="font-medium text-foreground">- Maria S.</span></div>
                    <div className="bg-muted/50 rounded-xl p-3 text-xs text-muted-foreground">"I felt God's presence so strongly during the silent prayer time."<br /><span className="font-medium text-foreground">- David L.</span></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 font-bold rounded-full" onClick={() => startActivity("Guided Meditation")}>
                  <Play className="w-4 h-4 mr-2" />Start Meditation
                </Button>
                <Button variant="outline" className="flex-1 rounded-full" onClick={() => startActivity("Scheduled Meditation")}>
                  <Clock className="w-4 h-4 mr-2" />Schedule for Later
                </Button>
                <Button variant="outline" className="flex-1 rounded-full" onClick={() => joinSession("Group Meditation")}>
                  <Users className="w-4 h-4 mr-2" />Join Group Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Meditation Categories */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Meditation Categories</h2>
            <p className="text-muted-foreground">Choose meditations based on your spiritual needs and current life situation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meditationCategories.map((cat) => (
              <Card key={cat.title} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${cat.color}`}>{cat.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{cat.desc}</p>
                  <div className="space-y-1 text-sm mb-5">
                    <div className="flex justify-between"><span className="text-muted-foreground">Sessions:</span><span>{cat.sessions} sessions</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Duration:</span><span>{cat.duration}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Participants:</span><span>{cat.participants} people</span></div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 font-bold rounded-full" onClick={() => explore(cat.title)}>
                    Explore Meditations
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Today's Live Sessions</h2>
          <p className="text-muted-foreground">Join others in real-time guided meditation</p>
        </div>
        <div className="max-w-2xl mx-auto space-y-4">
          {upcomingSessions.map((s) => (
            <div key={s.time} className="flex items-center gap-4 p-5 border border-border/50 rounded-2xl bg-card hover:shadow-md transition-shadow">
              <div className="text-center min-w-[60px]">
                <div className="text-lg font-bold text-primary">{s.time}</div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold">{s.title}</h4>
                <p className="text-sm text-muted-foreground">Host: {s.host} · {s.duration}</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1"><Users className="w-3 h-3 inline mr-1" />{s.joined} joined</div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 rounded-full font-bold" onClick={() => joinSession(s.title)}>Join</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <Sparkles className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-3">Begin Your Journey to Inner Peace</h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">Start meditating with our community and experience the transforming peace of God.</p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-10 rounded-full" onClick={joinCommunity}>
            Start Meditating
          </Button>
        </div>
      </section>
    </div>
  );
}
