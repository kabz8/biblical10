import { db } from "./db";
import {
  tracks, courses, modules, lessons, enrollments, progress, profiles,
  type Track, type Course, type Module, type Lesson, type Enrollment, type Progress, type Profile
} from "@shared/schema";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";

type InsertTrack = typeof tracks.$inferInsert;
type InsertCourse = typeof courses.$inferInsert;

export interface IStorage {
  // Profiles
  getProfile(userId: string): Promise<Profile | undefined>;
  
  // Tracks
  getTracks(): Promise<Track[]>;
  createTrack(track: InsertTrack): Promise<Track>;
  
  // Courses
  getCourses(): Promise<Course[]>;
  getCourseBySlug(slug: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Enrollments
  getEnrollments(userId: string): Promise<Enrollment[]>;
  createEnrollment(userId: string, courseId: number): Promise<Enrollment>;
  
  // Progress
  getProgress(userId: string): Promise<Progress[]>;
  markLessonComplete(userId: string, lessonId: number): Promise<Progress>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(userId: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return profile;
  }

  async getTracks(): Promise<Track[]> {
    return await db.select().from(tracks).orderBy(tracks.order);
  }

  async createTrack(track: InsertTrack): Promise<Track> {
    const [newTrack] = await db.insert(tracks).values(track).returning();
    return newTrack;
  }

  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourseBySlug(slug: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.slug, slug));
    return course;
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db.insert(courses).values(course).returning();
    return newCourse;
  }

  async getEnrollments(userId: string): Promise<Enrollment[]> {
    return await db.select().from(enrollments).where(eq(enrollments.userId, userId));
  }

  async createEnrollment(userId: string, courseId: number): Promise<Enrollment> {
    const [enrollment] = await db.insert(enrollments).values({
      userId,
      courseId,
    }).returning();
    return enrollment;
  }

  async getProgress(userId: string): Promise<Progress[]> {
    return await db.select().from(progress).where(eq(progress.userId, userId));
  }

  async markLessonComplete(userId: string, lessonId: number): Promise<Progress> {
    const [newProgress] = await db.insert(progress).values({
      userId,
      lessonId,
    }).returning();
    return newProgress;
  }
}

export const storage = new DatabaseStorage();
