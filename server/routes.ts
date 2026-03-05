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

  // Seed DB Function
  async function seedDatabase() {
    try {
      const existingTracks = await storage.getTracks();
      if (existingTracks.length === 0) {
        await storage.createTrack({
          slug: 'foundations',
          title: 'Foundations of Stewardship',
          description: 'Learn the biblical principles of managing money and resources.',
          order: 1
        });
        await storage.createTrack({
          slug: 'investing',
          title: 'Kingdom Investing',
          description: 'How to invest your resources for eternal impact and growth.',
          order: 2
        });

        const tracksList = await storage.getTracks();
        const firstTrack = tracksList[0];
        
        if (firstTrack) {
          await storage.createCourse({
            trackId: firstTrack.id,
            slug: 'stewardship-101',
            title: 'Stewardship 101',
            description: 'A comprehensive introduction to biblical financial management.',
            price: 0,
            level: 'beginner',
            duration: '4 hours',
            isPublished: true
          });
          await storage.createCourse({
            trackId: firstTrack.id,
            slug: 'budgeting-masterclass',
            title: 'Budgeting Masterclass',
            description: 'Take control of your cash flow with practical budgeting tools.',
            price: 9900, // $99
            level: 'intermediate',
            duration: '6 hours',
            isPublished: true
          });
        }
      }
    } catch (error) {
      console.error("Database seeding failed:", error);
    }
  }

  // Intentionally leaving this un-awaited to let it run in background
  seedDatabase().catch(console.error);

  return httpServer;
}
