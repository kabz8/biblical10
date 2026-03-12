import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic2, Play, Music2, Users, Heart, Star, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const liveSessions = [
  { id: 1, title: "Sunday Morning Praise", host: "Worship Team", participants: 234, genre: "Contemporary", status: "Live", time: "Now" },
  { id: 2, title: "Hymns & Classics", host: "Sister Agnes", participants: 89, genre: "Traditional", status: "Starting Soon", time: "In 15 min" },
  { id: 3, title: "Gospel Choir Night", host: "Grace Choir", participants: 312, genre: "Gospel", status: "Live", time: "Now" },
];

const featuredSongs = [
  { id: 1, title: "How Great is Our God", artist: "Chris Tomlin", key: "G", tempo: "84 BPM", category: "Worship", participants: 1245, hasChords: true, hasLyrics: true },
  { id: 2, title: "Amazing Grace", artist: "Traditional", key: "D", tempo: "72 BPM", category: "Hymn", participants: 2341, hasChords: true, hasLyrics: true },
  { id: 3, title: "Oceans (Where Feet May Fail)", artist: "Hillsong United", key: "D", tempo: "69 BPM", category: "Contemporary", participants: 987, hasChords: true, hasLyrics: true },
  { id: 4, title: "Way Maker", artist: "Sinach", key: "E", tempo: "78 BPM", category: "Worship", participants: 1567, hasChords: true, hasLyrics: true },
  { id: 5, title: "Great Are You Lord", artist: "All Sons & Daughters", key: "A", tempo: "65 BPM", category: "Worship", participants: 678, hasChords: true, hasLyrics: true },
  { id: 6, title: "10,000 Reasons (Bless the Lord)", artist: "Matt Redman", key: "G", tempo: "74 BPM", category: "Contemporary", participants: 1890, hasChords: true, hasLyrics: true },
];

const categories = [
  { name: "Worship", count: 45, color: "bg-primary text-white" },
  { name: "Hymns", count: 120, color: "bg-amber-600 text-white" },
  { name: "Gospel", count: 38, color: "bg-purple-600 text-white" },
  { name: "Contemporary", count: 67, color: "bg-blue-600 text-white" },
  { name: "Christmas", count: 29, color: "bg-green-600 text-white" },
  { name: "Kids", count: 22, color: "bg-pink-500 text-white" },
];

const newReleases = [
  { title: "Emmanuel (Praise the Lord)", artist: "BFC Worship Team", date: "This Week", streams: 2345 },
  { title: "Jehovah Provider", artist: "Grace Voices", date: "This Month", streams: 5678 },
  { title: "Faithful God", artist: "Community Choir", date: "This Month", streams: 3456 },
];

const tips = [
  { icon: <Heart className="w-5 h-5 text-primary" />, title: "Sing from the Heart", desc: "Worship is about intimacy with God, not performance. Focus on the meaning of the words you sing." },
  { icon: <Users className="w-5 h-5 text-primary" />, title: "Join Live Sessions", desc: "Singing together amplifies your worship experience and builds community bonds." },
  { icon: <Star className="w-5 h-5 text-primary" />, title: "Learn New Songs", desc: "Regularly adding new songs enriches your personal worship and keeps your faith vibrant." },
  { icon: <Music2 className="w-5 h-5 text-primary" />, title: "Use the Toolkit", desc: "Access chord charts and backing tracks to improve your musical ability and lead others in worship." },
];

export default function SingAlong() {
  const [search, setSearch] = useState("");
  const filtered = featuredSongs.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.artist.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-foreground text-background py-16 text-center">
        <div className="container mx-auto px-4">
          <Mic2 className="w-14 h-14 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sing Along</h1>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Lift your voice in praise and worship with our global community of believers
          </p>
        </div>
      </section>

      {/* Live Sessions */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Live Worship Sessions</h2>
          <p className="text-muted-foreground">Sing together with others right now</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {liveSessions.map((s) => (
            <Card key={s.id} className="border border-border/50 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-1 w-full bg-primary" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={`text-xs text-white ${s.status === "Live" ? "bg-red-500" : "bg-amber-500"}`}>{s.status}</Badge>
                  <span className="text-xs text-muted-foreground">{s.time}</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">Host: {s.host}</p>
                <Badge variant="outline" className="text-xs mb-4">{s.genre}</Badge>
                <div className="flex items-center gap-2 mb-5 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />{s.participants} singing now
                </div>
                <Button className="w-full font-bold rounded-full"><Play className="w-4 h-4 mr-2" />Join Session</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Song Library */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Song Library</h2>
            <p className="text-muted-foreground">Access lyrics, chords, and backing tracks</p>
          </div>
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-10 rounded-full" placeholder="Search songs or artists..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((song) => (
              <Card key={song.id} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold">{song.title}</h3>
                      <p className="text-sm text-muted-foreground">{song.artist}</p>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">{song.category}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground mb-4">
                    <span>Key: <strong>{song.key}</strong></span>
                    <span>Tempo: <strong>{song.tempo}</strong></span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mb-4">
                    <Users className="w-3 h-3 mr-1" />{song.participants.toLocaleString()} singers
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 rounded-full font-bold"><Music2 className="w-3 h-3 mr-1" />Lyrics</Button>
                    <Button size="sm" variant="outline" className="flex-1 rounded-full">Chords</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
          <p className="text-muted-foreground">Find songs that match your worship style</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button key={cat.name} className={`px-6 py-3 rounded-full font-bold text-sm shadow-sm hover:opacity-90 transition-opacity ${cat.color}`}>
              {cat.name} <span className="opacity-75 ml-1">({cat.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">New Releases</h2>
            <p className="text-muted-foreground">Original compositions from our worship community</p>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {newReleases.map((r) => (
              <div key={r.title} className="flex items-center gap-4 p-5 bg-card border border-border/50 rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Music2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{r.title}</h4>
                  <p className="text-sm text-muted-foreground">{r.artist}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-1">{r.date}</div>
                  <div className="text-xs font-medium text-primary">{r.streams.toLocaleString()} plays</div>
                </div>
                <Button size="sm" className="rounded-full ml-2"><Play className="w-3 h-3" /></Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Worship Tips</h2>
          <p className="text-muted-foreground">Enhance your worship experience with these insights</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tips.map((tip) => (
            <div key={tip.title} className="flex gap-4 p-6 border border-border/50 rounded-2xl bg-card">
              <div className="mt-0.5">{tip.icon}</div>
              <div>
                <h4 className="font-bold mb-1">{tip.title}</h4>
                <p className="text-sm text-muted-foreground">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <Mic2 className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-3">Raise Your Voice in Praise</h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">Join thousands of believers lifting their voices together in worship of our great God.</p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-10 rounded-full">Start Singing</Button>
        </div>
      </section>
    </div>
  );
}
