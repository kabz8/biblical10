import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Star, ChevronRight, BookMarked, Target, Flame } from "lucide-react";
import { useActionCTA } from "@/hooks/use-action-cta";

const studyPlans = [
  { id: 1, title: "7-Day Stewardship Journey", level: "Beginner", duration: "7 days", desc: "A week-long dive into what the Bible says about money, wealth, and generosity. Perfect for new students.", verses: 42, enrolled: 1245 },
  { id: 2, title: "Proverbs Financial Wisdom", level: "Intermediate", duration: "30 days", desc: "Work through all 31 chapters of Proverbs with daily reflections on wisdom, wealth, and work.", verses: 120, enrolled: 892 },
  { id: 3, title: "Paul's Teaching on Contentment", level: "Intermediate", duration: "14 days", desc: "An in-depth study of Philippians 4 and related passages on contentment, abundance, and need.", verses: 67, enrolled: 567 },
  { id: 4, title: "The Year-Long Bible Journey", level: "Advanced", duration: "365 days", desc: "Read through the entire Bible in a year with daily financial lens commentary and guided reflection.", verses: 1189, enrolled: 2341 },
];

const featuredBooks = [
  { title: "God and Money", author: "John Cortines & Gregory Baumer", category: "Finance", rating: 4.9, reviews: 342, desc: "Harvard MBAs wrestle with the question: how much is enough for a follower of Christ?" },
  { title: "The Blessed Life", author: "Robert Morris", category: "Generosity", rating: 4.8, reviews: 567, desc: "A practical guide to unlocking the power of a generous life based on biblical principles." },
  { title: "Managing God's Money", author: "Randy Alcorn", category: "Stewardship", rating: 4.7, reviews: 289, desc: "A comprehensive look at what the Bible says about managing money and possessions for God's glory." },
  { title: "Thou Shall Prosper", author: "Rabbi Daniel Lapin", category: "Wealth", rating: 4.6, reviews: 198, desc: "Ancient Hebraic wisdom on business ethics, wealth creation, and prosperity." },
  { title: "Money, Possessions and Eternity", author: "Randy Alcorn", category: "Eternity", rating: 4.9, reviews: 421, desc: "A thorough exploration of the eternal perspective that transforms how we view earthly wealth." },
  { title: "Total Money Makeover", author: "Dave Ramsey", category: "Practical", rating: 4.8, reviews: 892, desc: "A step-by-step plan for overcoming debt and building wealth from a faith-based perspective." },
];

const commentaries = [
  { title: "Wealth in the Old Testament", author: "Dr. Craig Blomberg", excerpt: "Prosperity theology distorts the Hebrew concept of shalom. True abundance in Scripture always points to whole-life flourishing — not just material gain.", topic: "OT Finance" },
  { title: "The Rich Young Ruler Revisited", author: "Prof. David Garland", excerpt: "Jesus's command was not anti-wealth but anti-idolatry. The challenge was the man's heart, not his bank account.", topic: "NT Finance" },
  { title: "Jubilee Economics in Leviticus", author: "Dr. Sharon Emmerich", excerpt: "The Year of Jubilee established a cyclical reset of economic inequality, pointing forward to God's kingdom values.", topic: "Leviticus 25" },
];

const stats = [
  { value: "1,200+", label: "Study Plans Available", color: "text-primary" },
  { value: "8,450", label: "Active Readers", color: "text-blue-600" },
  { value: "156", label: "Expert Commentaries", color: "text-green-600" },
  { value: "24", label: "Languages Supported", color: "text-amber-600" },
];

export default function ReadingPage() {
  const { joinSession, startActivity, registerTournament, joinCommunity } = useActionCTA();

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-foreground text-background py-16 text-center">
        <div className="container mx-auto px-4">
          <BookOpen className="w-14 h-14 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Reading</h1>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Expand your understanding of biblical financial wisdom through structured study plans, featured books, and expert commentaries
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="border-b bg-muted/30 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(s => (
              <div key={s.label}><div className={`text-2xl font-bold ${s.color}`}>{s.value}</div><div className="text-xs text-muted-foreground">{s.label}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* Scripture Study Plans */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Scripture Study Plans</h2>
          <p className="text-muted-foreground">Structured journeys through God's Word with a financial lens</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {studyPlans.map((plan) => (
            <Card key={plan.id} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-1 bg-primary" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">{plan.level}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                    <Clock className="w-3 h-3" />{plan.duration}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{plan.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{plan.desc}</p>
                <div className="flex gap-4 text-xs text-muted-foreground mb-5">
                  <span><BookOpen className="w-3 h-3 inline mr-1" />{plan.verses} verses</span>
                  <span><Users className="w-3 h-3 inline mr-1" />{plan.enrolled.toLocaleString()} enrolled</span>
                </div>
                <Button className="w-full font-bold rounded-full" onClick={() => startActivity(plan.title)}>
                  <Target className="w-4 h-4 mr-2" />Start Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Featured Books</h2>
            <p className="text-muted-foreground">Curated library of the best biblical finance literature</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
              <Card key={book.title} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <Badge variant="outline" className="text-xs mb-3">{book.category}</Badge>
                  <h3 className="font-bold text-base mb-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">by {book.author}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                    </div>
                    <span className="text-xs font-bold">{book.rating}</span>
                    <span className="text-xs text-muted-foreground">({book.reviews} reviews)</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{book.desc}</p>
                  <Button size="sm" className="w-full rounded-full font-bold" onClick={() => startActivity(book.title)}>
                    <BookMarked className="w-3 h-3 mr-1" />Read Summary
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Commentaries */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Expert Commentaries</h2>
          <p className="text-muted-foreground">Deep dives into biblical financial principles by renowned scholars</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {commentaries.map((c) => (
            <Card key={c.title} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary/10 text-primary border-0 text-xs">{c.topic}</Badge>
                </div>
                <h4 className="font-bold text-lg mb-1">{c.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">by {c.author}</p>
                <p className="text-sm text-muted-foreground italic leading-relaxed border-l-2 border-primary pl-4 mb-4">"{c.excerpt}"</p>
                <button className="text-sm text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all" onClick={() => startActivity(c.title)}>
                  Read Full Commentary <ChevronRight className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Reading Streaks */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Flame className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">Build a Reading Streak</h2>
            <p className="text-muted-foreground mb-8">Consistency is key to transformation. Track your daily reading habit and earn community recognition as you grow in wisdom.</p>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[{ val: "7", label: "Day Streak Starter" }, { val: "30", label: "Day Faithful Reader" }, { val: "365", label: "Day Bible Scholar" }].map(s => (
                <div key={s.label} className="bg-card border border-border/50 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-primary mb-1">{s.val}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <Button size="lg" className="font-bold rounded-full px-10" onClick={() => startActivity("Daily Reading Streak")}>
              <Flame className="w-4 h-4 mr-2" />Start Your Streak Today
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <BookOpen className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-3">Your Word, Your Wealth</h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">The Bible has more to say about money than almost any other subject. Start reading and let God's Word transform your relationship with wealth.</p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-10 rounded-full" onClick={joinCommunity}>Begin Reading Today</Button>
        </div>
      </section>
    </div>
  );
}
