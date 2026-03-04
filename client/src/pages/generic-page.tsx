import { useTranslation } from "react-i18next";
import { 
  Music, BookOpen, ScrollText, Gamepad2, 
  MessageSquare, HeartHandshake, Mic2, 
  BookMarked, Headphones, PlayCircle,
  TrendingUp, Users, Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pageContent: Record<string, any> = {
  Worship: {
    icon: <Music className="w-12 h-12 text-primary" />,
    description: "Connect with the Creator through curated worship experiences and biblical teachings on true adoration.",
    sections: [
      { title: "Today's Worship Theme", content: "The Sovereignty of God in Provision" },
      { title: "Scripture Focus", content: "Psalm 95:1-6 - 'O come, let us sing unto the Lord...'" }
    ]
  },
  Reading: {
    icon: <BookOpen className="w-12 h-12 text-primary" />,
    description: "Deepen your understanding of stewardship through our curated reading plans and biblical commentaries.",
    sections: [
      { title: "Current Plan", content: "30 Days of Biblical Wealth Management" },
      { title: "Recommended Book", content: "The Blessed Life by Robert Morris" }
    ]
  },
  Meditation: {
    icon: <ScrollText className="w-12 h-12 text-primary" />,
    description: "Quiet your mind and focus on God's promises regarding your resources and future.",
    sections: [
      { title: "Guided Reflection", content: "Trusting God in Times of Scarcity" },
      { title: "Memory Verse", content: "Philippians 4:19" }
    ]
  },
  Games: {
    icon: <Gamepad2 className="w-12 h-12 text-primary" />,
    description: "Learn financial principles through interactive biblical challenges and fun community games.",
    sections: [
      { title: "Weekly Challenge", content: "The Parable of the Talents Simulation" },
      { title: "Leaderboard", content: "Join 500+ others in this week's trivia!" }
    ]
  },
  Testimonies: {
    icon: <MessageSquare className="w-12 h-12 text-primary" />,
    description: "Be inspired by real stories of how biblical financial principles changed lives and legacies.",
    sections: [
      { title: "Featured Story", content: "From Debt to Generosity: The Miller Family Journey" },
      { title: "Submit Yours", content: "Share how God has moved in your finances." }
    ]
  },
  Prayers: {
    icon: <HeartHandshake className="w-12 h-12 text-primary" />,
    description: "Join our community in prayer for financial breakthrough, wisdom, and heart transformation.",
    sections: [
      { title: "Prayer Wall", content: "24 active requests for wisdom in business decisions." },
      { title: "Daily Prayer", content: "A Prayer for Contentment and Stewardship." }
    ]
  },
  "Testimony Along": {
    icon: <Users className="w-12 h-12 text-primary" />,
    description: "Follow along with live testimony sessions and interactive storytelling workshops.",
    sections: [
      { title: "Next Live Session", content: "Tuesday at 7:00 PM EST" },
      { title: "Interactive Guide", content: "How to tell your God-story effectively." }
    ]
  },
  "Pray Along": {
    icon: <Headphones className="w-12 h-12 text-primary" />,
    description: "Audio-guided prayer sessions focused on specific financial and spiritual needs.",
    sections: [
      { title: "Listen Now", content: "15-Minute Morning Prayer for Career Guidance" },
      { title: "Prayer Tracks", content: "Peace, Provision, Purpose, and Protection." }
    ]
  },
  "Sing Along": {
    icon: <Mic2 className="w-12 h-12 text-primary" />,
    description: "Interactive worship sessions with lyrics and chords for personal or small group use.",
    sections: [
      { title: "New Release", content: "Jehovah Jireh (Acoustic Version)" },
      { title: "Practice Room", content: "Tutorials for common worship songs." }
    ]
  },
  "Read Along": {
    icon: <BookMarked className="w-12 h-12 text-primary" />,
    description: "Synchronized reading groups where we study the Word together in real-time.",
    sections: [
      { title: "Community Read", content: "The Book of Proverbs: Wisdom for Wealth" },
      { title: "Discussion Group", content: "Chapter 3: Trusting with all your heart." }
    ]
  },
  "Meditate Along": {
    icon: <Sparkles className="w-12 h-12 text-primary" />,
    description: "Group meditation sessions led by spiritual mentors focusing on biblical peace.",
    sections: [
      { title: "Quiet Time", content: "Live silence and reflection session starting in 10 mins." },
      { title: "Themes", content: "Anxiety-free living through Christ." }
    ]
  },
  "Game Along": {
    icon: <PlayCircle className="w-12 h-12 text-primary" />,
    description: "Multiplayer learning experiences where you apply course concepts in real-world scenarios.",
    sections: [
      { title: "Tournament", content: "The Stewardship Cup - Spring 2026" },
      { title: "Quick Play", content: "10-question quiz on Biblical Tithing." }
    ]
  },
  Donate: {
    icon: <TrendingUp className="w-12 h-12 text-primary" />,
    description: "Support our mission to bring biblical financial literacy to the world.",
    sections: [
      { title: "Where it Goes", content: "Funding scholarships and translations for global students." },
      { title: "Ways to Give", content: "One-time gift, monthly partnership, or legacy giving." }
    ]
  }
};

export default function GenericPage({ title }: { title: string }) {
  const { t } = useTranslation();
  const content = pageContent[title] || {
    icon: <Sparkles className="w-12 h-12 text-primary" />,
    description: "Discover more about our biblical resources and community activities.",
    sections: []
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-muted/30 py-16 border-b">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="mb-6 bg-background p-4 rounded-2xl shadow-sm border">
            {content.icon}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{t(title)}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {t(content.description)}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {content.sections.map((section: any, index: number) => (
            <Card key={index} className="border-none shadow-md bg-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{t(section.title)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t(section.content)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-primary/5 rounded-3xl p-12 border border-primary/10">
          <h2 className="text-2xl font-bold mb-4">Ready to dive deeper?</h2>
          <p className="text-muted-foreground mb-8">Join our community of believers growing in financial wisdom.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="rounded-full font-bold px-8">Get Started</Button>
            <Button size="lg" variant="outline" className="rounded-full font-bold px-8">Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
