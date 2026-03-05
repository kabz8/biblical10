import { useTranslation } from "react-i18next";
import { 
  Music, BookOpen, ScrollText, Gamepad2, 
  MessageSquare, HeartHandshake, Mic2, 
  BookMarked, Headphones, PlayCircle,
  TrendingUp, Users, Sparkles, ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pageContent: Record<string, any> = {
  Worship: {
    icon: <Music className="w-12 h-12 text-primary" />,
    description: "Enter into a deeper relationship with God through spiritual songs, hymns, and teachings on biblical worship.",
    sections: [
      { title: "Live Worship Sessions", content: "Join our weekly live streams where we lift our voices in unity. Experience the presence of God through music and prayer." },
      { title: "Biblical Foundations", content: "Explore what the Bible says about worship 'in spirit and in truth'. Study the Psalms and the lives of great worshippers." }
    ]
  },
  Reading: {
    icon: <BookOpen className="w-12 h-12 text-primary" />,
    description: "Expand your mind and spirit with our curated library of biblical financial literature and study guides.",
    sections: [
      { title: "Scripture Study Plans", content: "Structured plans to help you navigate God's Word daily. From 7-day devotionals to year-long journeys through the Bible." },
      { title: "Expert Commentaries", content: "Deep dives into the historical and spiritual context of biblical financial principles by renowned scholars." }
    ]
  },
  Meditation: {
    icon: <ScrollText className="w-12 h-12 text-primary" />,
    description: "Practice the art of biblical meditation to find peace, clarity, and divine direction for your life.",
    sections: [
      { title: "Guided Stillness", content: "Quiet your heart and focus on a single promise from God. Our guided sessions help you filter out the noise of the world." },
      { title: "Word Immersion", content: "Techniques for 'muttering' the Word day and night, allowing it to take root in your subconscious mind." }
    ]
  },
  Games: {
    icon: <Gamepad2 className="w-12 h-12 text-primary" />,
    description: "Engage with faith-based interactive challenges designed to teach stewardship in an enjoyable way.",
    sections: [
      { title: "Stewardship Quest", content: "An interactive RPG where your financial decisions impact the growth of your virtual kingdom." },
      { title: "Trivia Nights", content: "Test your knowledge of biblical history and financial wisdom against players from around the world." }
    ]
  },
  Testimonies: {
    icon: <MessageSquare className="w-12 h-12 text-primary" />,
    description: "Read and share powerful stories of God's provision and the transformative power of biblical living.",
    sections: [
      { title: "Victory Stories", content: "Real-life accounts of debt cancellation, business breakthroughs, and the joy of radical generosity." },
      { title: "Community Wall", content: "A space for you to post short updates on how God is working in your life today." }
    ]
  },
  Prayers: {
    icon: <HeartHandshake className="w-12 h-12 text-primary" />,
    description: "Submit your requests and stand in the gap for others in our global house of prayer.",
    sections: [
      { title: "Intercessory Groups", content: "Join specialized groups praying for business owners, families in debt, and global missions." },
      { title: "Prayer Request Form", content: "Private or public submission of your needs to our dedicated prayer team." }
    ]
  },
  "Testimony Along": {
    icon: <Users className="w-12 h-12 text-primary" />,
    description: "Interactive sessions where we share our journeys in real-time, building each other's faith.",
    sections: [
      { title: "Storytelling Circles", content: "Small groups dedicated to refining and sharing our personal encounters with God's grace." },
      { title: "Live Q&A", content: "Engage with those who have walked the path before you and learn from their experiences." }
    ]
  },
  "Pray Along": {
    icon: <Headphones className="w-12 h-12 text-primary" />,
    description: "Audio-visual prayer journeys that guide you through specific themes of provision and peace.",
    sections: [
      { title: "The Provision Journey", content: "A 20-minute immersive prayer experience focused on Jehovah Jireh, our Provider." },
      { title: "Night Watches", content: "Calming prayer tracks designed for reflection before sleep." }
    ]
  },
  "Sing Along": {
    icon: <Mic2 className="w-12 h-12 text-primary" />,
    description: "Interactive worship sets with lyrics and background tracks for your personal altar.",
    sections: [
      { title: "Worship Toolkit", content: "Access lyrics, chords, and backing tracks for the most impactful songs in our community." },
      { title: "New Releases", content: "Stay updated with original compositions from our talented worship leaders." }
    ]
  },
  "Read Along": {
    icon: <BookMarked className="w-12 h-12 text-primary" />,
    description: "Join our global reading community as we study selected texts in perfect synchronization.",
    sections: [
      { title: "Current Book Club", content: "We are currently reading 'God and Money' together. Join the daily discussion threads." },
      { title: "Reading Buddies", content: "Get paired with a partner to keep each other accountable in your daily reading." }
    ]
  },
  "Meditate Along": {
    icon: <Sparkles className="w-12 h-12 text-primary" />,
    description: "Live, moderated meditation sessions to keep your mind stayed on Christ.",
    sections: [
      { title: "Morning Stillness", content: "A 10-minute live session every morning at 6:00 AM to set the tone for your day." },
      { title: "Theme of the Week", content: "Focusing this week on: 'The Peace that Passes Understanding'." }
    ]
  },
  "Game Along": {
    icon: <PlayCircle className="w-12 h-12 text-primary" />,
    description: "Join live multiplayer sessions where faith and fun collide in competitive challenges.",
    sections: [
      { title: "Tournament Hall", content: "Sign up for the next Biblical Knowledge Open. Prizes include course scholarships." },
      { title: "Quick Match", content: "Jump into a 5-minute fast-paced trivia round with other active members." }
    ]
  },
  Donate: {
    icon: <TrendingUp className="w-12 h-12 text-primary" />,
    description: "Invest in the kingdom by supporting the expansion of biblical financial education worldwide.",
    sections: [
      { title: "Impact Report", content: "See how your contributions have helped translate courses into 5 languages and reach 10,000+ students." },
      { title: "Partnership Levels", content: "From monthly seed-sowers to legacy builders, find the level that fits your heart's desire." }
    ]
  }
};

export default function GenericPage({ title }: { title: string }) {
  const { t } = useTranslation();
  const content = pageContent[title] || {
    icon: <Sparkles className="w-12 h-12 text-primary" />,
    description: "Explore the wealth of spiritual and practical resources available in our community.",
    sections: [
      { title: "Resources", content: "Discover a variety of tools designed to help you grow." },
      { title: "Community", content: "Connect with like-minded believers on the same journey." }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30 py-20 border-b">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4 flex flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center justify-center bg-background p-5 rounded-3xl shadow-xl border border-primary/10 transition-transform hover:scale-105">
            {content.icon}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-foreground">{t(title)}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {t(content.description)}
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-10">
          {content.sections.map((section: any, index: number) => (
            <Card key={index} className="group border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card overflow-hidden">
              <div className="h-1 w-full bg-primary/20 group-hover:bg-primary transition-colors" />
              <CardHeader className="pt-8 px-8">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    {index + 1}
                  </span>
                  {t(section.title)}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t(section.content)}
                </p>
                <Button variant="link" className="mt-6 p-0 text-primary font-bold group-hover:translate-x-1 transition-transform">
                  Read more <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="mt-20 relative overflow-hidden bg-primary rounded-[2.5rem] p-12 md:p-16 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Take the Next Step in Your Faith Journey</h2>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Join thousands of believers who are transforming their lives through biblical wisdom and community support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-2xl font-bold px-10 h-14 text-lg">
                Join Now
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-2xl font-bold px-10 h-14 text-lg">
                View All Courses
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
