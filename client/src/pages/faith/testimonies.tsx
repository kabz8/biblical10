import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart, Star, ThumbsUp, ChevronRight, Award, BookOpen, Users } from "lucide-react";
import { useActionCTA } from "@/hooks/use-action-cta";

const featuredTestimonies = [
  { id: 1, name: "Abigail Mensah", country: "Ghana 🇬🇭", avatar: "A", category: "Debt Freedom", title: "God Cancelled $52,000 of Debt!", story: "For 11 years, I carried the weight of student loans and business debt that felt impossible to pay off. I joined BFC and began applying the tithing and budgeting principles consistently. Within 18 months, through a series of miraculous events — including a surprise legal settlement and business contract — all $52,000 was cleared. I cried for a week. God is real and His financial principles work!", impact: "52K cleared", months: "18 months", likes: 456, featured: true },
  { id: 2, name: "Marcus Johnson", country: "USA 🇺🇸", avatar: "M", category: "Business Breakthrough", title: "From $0 to $1M Revenue in 2 Years", story: "I started a landscaping business with zero capital and a prayer. After studying the Kingdom Investing course and joining the pray-along community, my business grew beyond anything I imagined. The biblical principle of sowing into others first opened doors I never expected. We crossed $1 million in annual revenue last year. All glory to God.", impact: "$1M revenue", months: "24 months", likes: 678, featured: true },
  { id: 3, name: "Priya Sharma", country: "India 🇮🇳", avatar: "P", category: "Family Restoration", title: "Our Marriage Survived Financial Crisis", story: "Money stress had pushed my husband and I to the brink of divorce. A friend shared BFC's testimonies page with me, and we started going through the Foundations course together. The financial wisdom changed our conversations, our trust, and our future. Today we are debt-free and building generational wealth. Our family was literally saved by this community.", impact: "Marriage restored", months: "12 months", likes: 389, featured: false },
];

const victoryCategories = [
  { name: "Debt Freedom", count: 1245, icon: "💪", color: "bg-green-100 text-green-700" },
  { name: "Business Growth", count: 892, icon: "📈", color: "bg-blue-100 text-blue-700" },
  { name: "Job Miracle", count: 567, icon: "🎯", color: "bg-purple-100 text-purple-700" },
  { name: "Family Restored", count: 423, icon: "❤️", color: "bg-pink-100 text-pink-700" },
  { name: "Home Purchased", count: 334, icon: "🏡", color: "bg-amber-100 text-amber-700" },
  { name: "Investment Win", count: 289, icon: "💰", color: "bg-emerald-100 text-emerald-700" },
];

const recentWall = [
  { name: "E.O.", date: "2 hours ago", text: "Received my first raise in 5 years today — right after completing the Budgeting Masterclass. Coincidence? I think not. Praise God!", category: "Career" },
  { name: "Anonymous", date: "5 hours ago", text: "Bank finally approved our mortgage after 3 rejections. We've been praying and applying biblical financial principles for 8 months. Today we are homeowners!", category: "Home" },
  { name: "T.M.", date: "Yesterday", text: "Paid off my last credit card! It took 14 months of strict budgeting and consistent tithing. The Word of God is TRUE.", category: "Debt Free" },
  { name: "K.A.", date: "2 days ago", text: "My small bakery just got featured in a national magazine. From a tiny home business to national exposure. God rewards faithfulness.", category: "Business" },
];

const stats = [
  { value: "5,231", label: "Testimonies Posted", color: "text-primary" },
  { value: "124K", label: "Lives Encouraged", color: "text-green-600" },
  { value: "78", label: "Countries Represented", color: "text-blue-600" },
  { value: "$2.4M", label: "Combined Debt Cleared", color: "text-amber-600" },
];

export default function TestimoniesPage() {
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const { joinCommunity, startActivity } = useActionCTA();

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-foreground text-background py-16 text-center">
        <div className="container mx-auto px-4">
          <MessageSquare className="w-14 h-14 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Testimonies</h1>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Read and share powerful stories of God's provision, financial miracles, and the transformative power of biblical living
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

      {/* Featured Testimonies */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Featured Testimonies</h2>
          <p className="text-muted-foreground">Remarkable stories of God's faithfulness in the financial lives of our community</p>
        </div>
        <div className="space-y-8 max-w-4xl mx-auto">
          {featuredTestimonies.map((t) => (
            <Card key={t.id} className={`border shadow-lg ${t.featured ? "border-primary/30" : "border-border/50"}`}>
              <CardContent className="p-8">
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shrink-0">{t.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-lg">{t.name}</span>
                      <span className="text-sm text-muted-foreground">{t.country}</span>
                      {t.featured && <Badge className="bg-primary/10 text-primary border-0 text-xs"><Award className="w-3 h-3 mr-1" />Featured</Badge>}
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0 text-xs">{t.category}</Badge>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-2xl font-bold text-primary">{t.impact}</div>
                    <div className="text-xs text-muted-foreground">in {t.months}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{t.story}</p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setLikedIds(ids => ids.includes(t.id) ? ids.filter(i => i !== t.id) : [...ids, t.id])}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${likedIds.includes(t.id) ? "text-red-500" : "text-muted-foreground hover:text-red-500"}`}
                  >
                    <Heart className="w-4 h-4" />{t.likes + (likedIds.includes(t.id) ? 1 : 0)} encouraged
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5" onClick={() => startActivity(`Share ${t.name}'s testimony`)}>
                    <MessageSquare className="w-4 h-4" />Share Story
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Victory Categories */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Browse by Victory Category</h2>
            <p className="text-muted-foreground">Find testimonies that speak to your specific situation</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {victoryCategories.map((cat) => (
              <button
                key={cat.name}
                className={`p-4 rounded-2xl text-center hover:opacity-90 transition-opacity border border-transparent ${cat.color}`}
                onClick={() => startActivity(`${cat.name} Testimonies`)}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-bold text-sm">{cat.name}</div>
                <div className="text-xs opacity-75">{cat.count} stories</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Testimony Wall */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Community Victory Wall</h2>
          <p className="text-muted-foreground">Quick praise reports from our community — updated in real time</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {recentWall.map((p, i) => (
            <Card key={i} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shrink-0">{p.name[0]}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{p.name}</span>
                      <Badge variant="outline" className="text-xs">{p.category}</Badge>
                      <span className="text-xs text-muted-foreground ml-auto">{p.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" className="rounded-full px-8 font-bold" onClick={() => startActivity("All Testimonies")}>
            View All Testimonies <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">Your Victory Story is Next</h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">God is writing an incredible chapter in your life. Join our community, apply His principles, and watch your testimony come to life.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-10 rounded-full" onClick={joinCommunity}>Join the Community</Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-10 rounded-full" onClick={() => startActivity("Share Testimony")}>Share Your Testimony</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
