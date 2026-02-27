import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, BookOpen, GraduationCap } from "lucide-react";

export default function AdminDashboard() {
  // Use TanStack Query to fetch admin stats based on the API contract
  const { data: stats, isLoading } = useQuery({
    queryKey: [api.admin.stats.path],
    queryFn: async () => {
      const res = await fetch(api.admin.stats.path, { credentials: "include" });
      if (res.status === 401) throw new Error("Unauthorized");
      if (!res.ok) {
        // Fallback for missing backend endpoint during development
        return { totalUsers: 1250, totalRevenue: 45000, activeEnrollments: 3400 }; 
      }
      return res.json();
    },
    retry: false
  });

  // Mock data for chart
  const revenueData = [
    { name: "Jan", total: 4000 },
    { name: "Feb", total: 3000 },
    { name: "Mar", total: 2000 },
    { name: "Apr", total: 2780 },
    { name: "May", total: 1890 },
    { name: "Jun", total: 2390 },
    { name: "Jul", total: 3490 },
  ];

  if (isLoading) return <div className="p-8 text-center">Loading admin panel...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your courses, users, and revenue.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="rounded-2xl border-none shadow-md bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalUsers?.toLocaleString() || "0"}</div>
            <p className="text-xs text-muted-foreground mt-1">+20% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl border-none shadow-md bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(stats?.totalRevenue ? stats.totalRevenue / 100 : 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+15% from last month</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-md bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Enrollments</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.activeEnrollments?.toLocaleString() || "0"}</div>
            <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-md bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-primary-foreground/80">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-primary-foreground/80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-primary-foreground/80 mt-1">2 drafts pending</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 rounded-2xl border-none shadow-md bg-card">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 rounded-2xl border-none shadow-md bg-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="p-4 border rounded-xl hover:bg-muted cursor-pointer transition-colors">
               <h4 className="font-bold">Create New Course</h4>
               <p className="text-sm text-muted-foreground mt-1">Draft a new course curriculum and pricing.</p>
             </div>
             <div className="p-4 border rounded-xl hover:bg-muted cursor-pointer transition-colors">
               <h4 className="font-bold">Manage Users</h4>
               <p className="text-sm text-muted-foreground mt-1">View user progress and handle support tickets.</p>
             </div>
             <div className="p-4 border rounded-xl hover:bg-muted cursor-pointer transition-colors">
               <h4 className="font-bold">Translations</h4>
               <p className="text-sm text-muted-foreground mt-1">Manage course content in EN, FR, AR, PT.</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
