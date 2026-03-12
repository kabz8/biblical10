import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Trophy, Users, Zap, Star, BookOpen, Brain, Target, Globe, ChevronRight } from "lucide-react";
import { useActionCTA } from "@/hooks/use-action-cta";

const gameCategories = [
  { icon: <BookOpen className="w-8 h-8" />, title: "Stewardship Quest", type: "RPG / Strategy", desc: "An immersive role-playing game where your financial decisions shape a virtual kingdom. Apply biblical principles to build prosperity.", players: 3456, levels: 50, color: "bg-amber-100 text-amber-700" },
  { icon: <Brain className="w-8 h-8" />, title: "Bible Trivia League", type: "Trivia", desc: "Test your knowledge of biblical history, financial wisdom, and scripture memorization against players worldwide.", players: 5678, levels: 100, color: "bg-blue-100 text-blue-700" },
  { icon: <Target className="w-8 h-8" />, title: "Generosity Challenge", type: "Decision Game", desc: "Navigate real-life giving scenarios based on biblical stories. Every decision reveals a new layer of scriptural wisdom.", players: 1234, levels: 30, color: "bg-green-100 text-green-700" },
  { icon: <Globe className="w-8 h-8" />, title: "Prophet's Journey", type: "Adventure", desc: "Walk in the footsteps of biblical figures and manage resources as they did — from Joseph's storehouses to Solomon's wisdom.", players: 2345, levels: 40, color: "bg-purple-100 text-purple-700" },
];

const tournaments = [
  { title: "Christmas Bible Bowl", date: "December 20, 2026", prize: "Course Scholarships + Gift Cards", registered: 124, spots: 200, level: "All Levels" },
  { title: "The Great Stewardship Open", date: "January 15, 2026", prize: "$500 Bible Resource Package", registered: 67, spots: 100, level: "Intermediate" },
  { title: "Youth Financial Olympiad", date: "February 10, 2026", prize: "University Scholarship Fund Contribution", registered: 89, spots: 150, level: "Youth (13-25)" },
];

const leaderboard = [
  { rank: 1, name: "Emmanuel O.", country: "Nigeria", score: "12,450 pts", badge: "🏆" },
  { rank: 2, name: "Maria S.", country: "Brazil", score: "11,230 pts", badge: "🥈" },
  { rank: 3, name: "James K.", country: "Kenya", score: "10,890 pts", badge: "🥉" },
  { rank: 4, name: "Grace L.", country: "USA", score: "10,102 pts", badge: "⭐" },
  { rank: 5, name: "Daniel M.", country: "Ghana", score: "9,870 pts", badge: "⭐" },
];

const dailyChallenges = [
  { title: "Verse of the Day Match", desc: "Match 10 financial verses to their correct references in under 60 seconds.", points: 50, time: "2 min", difficulty: "Easy" },
  { title: "Joseph's Decision", desc: "You are Joseph in Egypt. Pharaoh's dream has come true. How do you manage 7 years of plenty?", points: 150, time: "10 min", difficulty: "Medium" },
  { title: "The Talent Challenge", desc: "Reenact the Parable of the Talents with real investment decisions. Maximize kingdom return.", points: 300, time: "15 min", difficulty: "Hard" },
];

export default function GamesPage() {
  const { startActivity, registerTournament, joinCommunity } = useActionCTA();

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-foreground text-background py-16 text-center">
        <div className="container mx-auto px-4">
          <Gamepad2 className="w-14 h-14 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Faith Games</h1>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Engage with faith-based interactive challenges designed to teach stewardship and biblical wisdom in an enjoyable way
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="border-b bg-muted/30 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[{ v: "12,913", l: "Active Players", c: "text-primary" }, { v: "220+", l: "Available Games", c: "text-amber-600" }, { v: "89", l: "Countries", c: "text-green-600" }, { v: "456K", l: "Games Played", c: "text-blue-600" }].map(s => (
              <div key={s.l}><div className={`text-2xl font-bold ${s.c}`}>{s.v}</div><div className="text-xs text-muted-foreground">{s.l}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Game Library</h2>
          <p className="text-muted-foreground">Faith-based games that entertain, educate, and inspire</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {gameCategories.map((game) => (
            <Card key={game.title} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-7">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${game.color}`}>{game.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-lg">{game.title}</h3>
                      <Badge variant="outline" className="text-xs">{game.type}</Badge>
                    </div>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span><Users className="w-3 h-3 inline mr-1" />{game.players.toLocaleString()}</span>
                      <span><Star className="w-3 h-3 inline mr-1" />{game.levels} levels</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{game.desc}</p>
                <Button className="w-full font-bold rounded-full" onClick={() => startActivity(game.title)}>
                  <Gamepad2 className="w-4 h-4 mr-2" />Play Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Daily Challenges */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Today's Challenges</h2>
            <p className="text-muted-foreground">Quick faith challenges — reset daily at midnight</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {dailyChallenges.map((c) => (
              <Card key={c.title} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`text-xs border-0 ${c.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : c.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{c.difficulty}</Badge>
                    <span className="text-xs text-muted-foreground">{c.time}</span>
                  </div>
                  <h3 className="font-bold mb-2">{c.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{c.desc}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-primary">+{c.points} pts</span>
                  </div>
                  <Button size="sm" className="w-full rounded-full font-bold" onClick={() => startActivity(c.title)}>
                    <Zap className="w-3 h-3 mr-1" />Start Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Global Leaderboard</h2>
          <p className="text-muted-foreground">Top biblical finance game players this month</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card className="border border-border/50 shadow-lg">
            <CardContent className="p-6">
              {leaderboard.map((p) => (
                <div key={p.rank} className="flex items-center gap-4 py-3 border-b last:border-0">
                  <span className="text-2xl w-8">{p.badge}</span>
                  <div className="flex-1">
                    <div className="font-bold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.country}</div>
                  </div>
                  <span className="font-bold text-primary">{p.score}</span>
                </div>
              ))}
              <Button className="w-full mt-4 rounded-full font-bold" variant="outline" onClick={() => startActivity("Full Leaderboard")}>
                View Full Leaderboard <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tournaments */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Upcoming Tournaments</h2>
            <p className="text-muted-foreground">Compete for prizes and recognition in our community events</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tournaments.map((t) => (
              <Card key={t.title} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-1 bg-primary" />
                <CardContent className="p-6">
                  <Badge variant="outline" className="text-xs mb-3">{t.level}</Badge>
                  <h3 className="font-bold text-lg mb-2">{t.title}</h3>
                  <div className="space-y-1.5 text-sm mb-4">
                    <div className="flex justify-between"><span className="text-muted-foreground">Date:</span><span>{t.date}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Prize:</span><span className="text-primary font-medium text-xs">{t.prize}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Spots:</span><span>{t.registered}/{t.spots}</span></div>
                  </div>
                  <Button className="w-full font-bold rounded-full" onClick={() => registerTournament(t.title)}>
                    <Trophy className="w-4 h-4 mr-2" />Register
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <Gamepad2 className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-3">Learn the Bible. Win the Game.</h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">Our faith games make biblical financial education engaging, competitive, and community-driven.</p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-10 rounded-full" onClick={joinCommunity}>Start Playing Today</Button>
        </div>
      </section>
    </div>
  );
}
