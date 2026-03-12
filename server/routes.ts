import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";
import { registerAuthRoutes, setupAuth } from "./replit_integrations/auth";
import { isAuthenticated } from "./replit_integrations/auth/replitAuth";

import { insertActivitySubmissionSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth First
  await setupAuth(app);
  
  // Register Auth Routes
  registerAuthRoutes(app);

  app.get("/api/activity-submissions/:type", async (req, res) => {
    const submissions = await storage.getActivitySubmissions(req.params.type);
    res.json(submissions);
  });

  app.post("/api/activity-submissions", isAuthenticated, async (req: any, res) => {
    try {
      const data = insertActivitySubmissionSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const submission = await storage.createActivitySubmission(data);
      res.status(201).json(submission);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Failed to create submission" });
    }
  });

  app.get(api.tracks.list.path, async (req, res) => {
    const tracksList = await storage.getTracks();
    res.json(tracksList);
  });

  app.get(api.courses.list.path, async (req, res) => {
    const coursesList = await storage.getCourses();
    res.json(coursesList);
  });

  app.get(api.courses.get.path, async (req, res) => {
    const course = await storage.getCourseBySlug(req.params.slug);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  });

  app.get(api.enrollments.list.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.id;
    const enrollmentsList = await storage.getEnrollments(userId);
    res.json(enrollmentsList);
  });

  app.post(api.enrollments.create.path, isAuthenticated, async (req: any, res) => {
    try {
      const input = api.enrollments.create.input.parse(req.body);
      const userId = req.user.id;
      const enrollment = await storage.createEnrollment(userId, input.courseId);
      res.status(201).json(enrollment);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.progress.list.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.id;
    const progressList = await storage.getProgress(userId);
    res.json(progressList);
  });

  app.post(api.progress.markComplete.path, isAuthenticated, async (req: any, res) => {
    try {
      const input = api.progress.markComplete.input.parse(req.body);
      const userId = req.user.id;
      const progressRecord = await storage.markLessonComplete(userId, input.lessonId);
      res.status(201).json(progressRecord);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.admin.stats.path, isAuthenticated, async (req: any, res) => {
    // Basic mock stats for now
    res.json({
      totalUsers: 15,
      totalRevenue: 5000,
      activeEnrollments: 23
    });
  });

  // Seed DB — upsert ensures all content is always present (Vercel-safe)
  async function seedDatabase() {
    try {
      const { db } = await import("./db");
      const { tracks: tracksTable, courses: coursesTable } = await import("@shared/schema");

      const seedTracks = [
        { slug: 'foundations', title: 'Foundations of Stewardship', description: 'Learn the biblical principles of managing money and resources with wisdom and faith.', order: 1 },
        { slug: 'investing', title: 'Kingdom Investing', description: 'How to invest your resources for eternal impact, growth, and generosity.', order: 2 },
        { slug: 'debt-freedom', title: 'Debt-Free Living', description: 'Biblical strategies for eliminating debt and building a legacy of financial freedom.', order: 3 },
        { slug: 'generosity', title: 'The Generous Life', description: 'Discover the joy and biblical mandate of radical, joyful giving.', order: 4 },
      ];

      for (const t of seedTracks) {
        await db.insert(tracksTable).values(t).onConflictDoUpdate({ target: tracksTable.slug, set: { title: t.title, description: t.description } });
      }

      const tracksList = await storage.getTracks();
      const trackMap = Object.fromEntries(tracksList.map(t => [t.slug, t.id]));

      const seedCourses = [
        { trackSlug: 'foundations', slug: 'stewardship-101', title: 'Stewardship 101', description: 'A comprehensive introduction to biblical financial management. Learn what the Bible says about money, resources, and your role as a steward.', price: 0, level: 'beginner', duration: '4 hours' },
        { trackSlug: 'foundations', slug: 'budgeting-masterclass', title: 'Budgeting Masterclass', description: 'Take control of your cash flow with practical, Bible-based budgeting tools. Build a spending plan that reflects your values.', price: 9900, level: 'intermediate', duration: '6 hours' },
        { trackSlug: 'investing', slug: 'kingdom-investing', title: 'Kingdom Investing Principles', description: 'Learn how to grow your wealth while keeping an eternal perspective. Biblical wisdom for the stock market, real estate, and business.', price: 14900, level: 'intermediate', duration: '8 hours' },
        { trackSlug: 'investing', slug: 'retirement-gods-way', title: "Retirement God's Way", description: 'Plan for the future with faith and wisdom. How to save, invest, and leave a godly legacy for the next generation.', price: 12900, level: 'advanced', duration: '5 hours' },
        { trackSlug: 'debt-freedom', slug: 'debt-freedom-plan', title: 'The Debt Freedom Plan', description: 'A proven, Scripture-backed system for eliminating all consumer debt and achieving true financial freedom in Christ.', price: 7900, level: 'beginner', duration: '6 hours' },
        { trackSlug: 'generosity', slug: 'radical-generosity', title: 'Radical Generosity', description: "Experience the transforming power of giving. Learn the principles of tithing, offerings, and how generosity unlocks God's blessing.", price: 0, level: 'beginner', duration: '3 hours' },
      ];

      for (const c of seedCourses) {
        const trackId = trackMap[c.trackSlug];
        if (!trackId) continue;
        const { trackSlug, ...rest } = c;
        await db.insert(coursesTable).values({ ...rest, trackId, isPublished: true }).onConflictDoUpdate({ target: coursesTable.slug, set: { title: rest.title, description: rest.description, price: rest.price } });
      }

      console.log("[seed] Database upserted: 4 tracks, 6 courses.");
    } catch (error) {
      console.error("Database seeding failed:", error);
    }
  }

  // Intentionally leaving this un-awaited to let it run in background
  seedDatabase().catch(console.error);

  return httpServer;
}
