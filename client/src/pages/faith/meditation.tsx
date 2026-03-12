import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollText, Play, Clock, Pause, Heart, Brain, Shield, Sunrise, Moon, Wind } from "lucide-react";
import { useActionCTA } from "@/hooks/use-action-cta";

const techniques = [
  { icon: <Brain className="w-7 h-7" />, title: "Lectio Divina", subtitle: "Sacred Reading", desc: "A 4-step method: Read, Meditate, Pray, Contemplate. Slowly absorb a short scripture passage and let God speak personally.", steps: ["Read the passage slowly 3 times", "Meditate on one word or phrase that stands out", "Pray from what stirred your heart", "Sit in silent contemplation before God"], color: "bg-purple-100 text-purple-700" },
  { icon: <Wind className="w-7 h-7" />, title: "Breath Prayer", subtitle: "Ancient Practice", desc: "Link a short scripture to your breathing rhythm. Inhale God's promise, exhale your worry. Simple but profoundly effective.", steps: ["Choose a short scripture phrase", "Inhale slowly while meditating on the first half", "Exhale while meditating on the second half", "Repeat for 5-10 minutes"], color: "bg-blue-100 text-blue-700" },
  { icon: <ScrollText className="w-7 h-7" />, title: "Scripture Mutteration", subtitle: "Hebraic Practice", desc: "The Hebrew word 'meditate' in Joshua 1:8 means 'to mutter'. Speak scripture softly and repeatedly until it becomes part of you.", steps: ["Choose one verse for the day", "Write it out by hand 3 times", "Speak it softly throughout the day", "Journal how it applies to your finances"], color: "bg-green-100 text-green-700" },
  { icon: <Shield className="w-7 h-7" />, title: "Contemplative Silence", subtitle: "Centering Prayer", desc: "In the silence, God speaks most clearly. Set aside distractions and simply present yourself before God without agenda.", steps: ["Find a quiet, comfortable space", "Set a 15-minute timer", "When thoughts come, gently return to a centering word", "End with a short prayer of thanks"], color: "bg-amber-100 text-amber-700" },
];

const dailySessions = [
  { time: "6:00 AM", title: "Morning Stillness", verse: "Lamentations 3:22-23", duration: "10 min", theme: "New Mercies", participants: 892 },
  { time: "12:00 PM", title: "Noon Renewal", verse: "Isaiah 40:31", duration: "5 min", theme: "Strength", participants: 456 },
  { time: "6:00 PM", title: "Evening Peace", verse: "Philippians 4:6-7", duration: "15 min", theme: "Gratitude", participants: 678 },
  { time: "10:00 PM", title: "Night Surrender", verse: "Psalm 4:8", duration: "10 min", theme: "Rest in God", participants: 543 },
];

const weekTheme = {
  title: "The Peace that Passes Understanding",
  scripture: "Philippians 4:6-7",
  verse: '"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."',
  day1: "Day 1: Understanding Anxiety in a Financial World",
  day2: "Day 2: The Command to Pray — Not Worry",
  day3: "Day 3: Thanksgiving as a Financial Discipline",
  day4: "Day 4: Experiencing Supernatural Peace",
  day5: "Day 5: A Guarded Heart and Mind",
  day6: "Day 6: Applying This to Debt and Lack",
  day7: "Day 7: Living from Peace, Not for Peace",
};

const scriptures = [
  { ref: "Joshua 1:8", text: "Keep this Book of the Law always on your lips; meditate on it day and night...", benefit: "Promises prosperity and success as a direct result of meditation" },
  { ref: "Psalm 1:2-3", text: "...whose delight is in the law of the Lord, and who meditates on his law day and night.", benefit: "The meditating person becomes like a fruitful, well-watered tree" },
  { ref: "Psalm 119:97", text: "Oh, how I love your law! I meditate on it all day long.", benefit: "David's secret to supernatural wisdom — meditation, not just reading" },
];

export default function MeditationPage() {
  const [playing, setPlaying] = useState(false);
  const { startActivity, joinSession, joinCommunity } = useActionCTA();

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-foreground text-background py-16 text-center">
        <div className="container mx-auto px-4">
          <ScrollText className="w-14 h-14 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meditation</h1>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Practice the ancient art of biblical meditation — stilling your mind, immersing in God's Word, and receiving divine clarity
          </p>
        </div>
      </section>

      {/* Week Theme */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <Badge className="bg-primary/10 text-primary border-0 mb-4">This Week's Theme</Badge>
          <h2 className="text-3xl font-bold mb-2">{weekTheme.title}</h2>
          <p className="text-muted-foreground">{weekTheme.scripture}</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card className="border-primary/20 shadow-xl bg-gradient-to-br from-card to-primary/5">
            <CardContent className="p-8">
              <p className="text-sm italic text-muted-foreground leading-relaxed mb-6 border-l-2 border-primary pl-4">{weekTheme.verse}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-6">
                {[weekTheme.day1, weekTheme.day2, weekTheme.day3, weekTheme.day4, weekTheme.day5, weekTheme.day6, weekTheme.day7].map((d, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">·</span>
                    <span className="text-xs">{d}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 font-bold rounded-full" onClick={() => startActivity("Week Meditation Series")}>
                  <Play className="w-4 h-4 mr-2" />Start Series
                </Button>
                <Button variant="outline" className="flex-1 rounded-full" onClick={() => joinSession("Week Meditation Group")}>
                  Join Group
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Daily Sessions */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Daily Meditation Sessions</h2>
            <p className="text-muted-foreground">Structured times throughout the day to pause and connect with God</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dailySessions.map((s) => (
              <Card key={s.time} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">{s.time}</div>
                  <h3 className="font-bold mb-1">{s.title}</h3>
                  <p className="text-xs text-primary font-medium mb-1">{s.verse}</p>
                  <Badge variant="outline" className="text-xs mb-2">{s.theme}</Badge>
                  <p className="text-xs text-muted-foreground mb-4">{s.duration} · {s.participants} attending</p>
                  <Button size="sm" className="w-full rounded-full font-bold" onClick={() => joinSession(s.title)}>
                    Join
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Techniques */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Biblical Meditation Techniques</h2>
          <p className="text-muted-foreground">Ancient practices for modern believers — rooted in Scripture</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {techniques.map((tech) => (
            <Card key={tech.title} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-7">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${tech.color}`}>{tech.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{tech.title}</h3>
                    <p className="text-xs text-muted-foreground">{tech.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tech.desc}</p>
                <div className="space-y-1.5 mb-5">
                  {tech.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="font-bold text-primary mt-0.5">{i + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <Button size="sm" className="w-full rounded-full font-bold" onClick={() => startActivity(tech.title)}>
                  Try This Technique
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Scripture Basis */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Why Meditate? The Biblical Case</h2>
            <p className="text-muted-foreground">God directly commands and rewards biblical meditation</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {scriptures.map((s) => (
              <Card key={s.ref} className="border border-border/50 shadow-sm">
                <CardContent className="p-6">
                  <p className="text-primary font-bold text-sm mb-3">{s.ref}</p>
                  <p className="text-sm italic text-foreground mb-3 leading-relaxed border-l-2 border-primary pl-3">"{s.text}"</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <ScrollText className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-3">Still Your Mind, Hear His Voice</h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">In the noise of financial pressure, God's Word brings peace. Start your daily meditation practice today.</p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-10 rounded-full" onClick={joinCommunity}>Start Meditating</Button>
        </div>
      </section>
    </div>
  );
}
