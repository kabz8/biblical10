import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users, sessions } from "./models/auth";
export { users, sessions };

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  role: text("role").default("student"), // student, admin, instructor
  locale: text("locale").default("en"),
  theme: text("theme").default("system"),
});

export const tracks = pgTable("tracks", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  order: integer("order").notNull().default(0),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  trackId: integer("track_id").references(() => tracks.id),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull().default(0), // in cents, 0 = free
  level: text("level").default("beginner"),
  duration: text("duration"),
  imageUrl: text("image_url"),
  isPublished: boolean("is_published").default(false),
});

export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull().default(0),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").notNull().references(() => modules.id),
  title: text("title").notNull(),
  videoUrl: text("video_url"),
  content: text("content"), // Rich text or MDX
  duration: integer("duration").default(0), // in seconds
  order: integer("order").notNull().default(0),
  isFreePreview: boolean("is_free_preview").default(false),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  courseId: integer("course_id").notNull().references(() => courses.id),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  status: text("status").default("active"), // active, completed, cancelled
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  lessonId: integer("lesson_id").notNull().references(() => lessons.id),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const activitySubmissions = pgTable("activity_submissions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  activityType: text("activity_type").notNull(), // e.g., 'testimony-along', 'pray-along', etc.
  title: text("title").notNull(),
  content: text("content").notNull(),
  mediaUrl: text("media_url"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertActivitySubmissionSchema = createInsertSchema(activitySubmissions).omit({ id: true, submittedAt: true });
export type ActivitySubmission = typeof activitySubmissions.$inferSelect;
export type InsertActivitySubmission = z.infer<typeof insertActivitySubmissionSchema>;

export const coursesRelations = relations(courses, ({ one, many }) => ({
  track: one(tracks, {
    fields: [courses.trackId],
    references: [tracks.id],
  }),
  modules: many(modules),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, {
    fields: [modules.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one }) => ({
  module: one(modules, {
    fields: [lessons.moduleId],
    references: [modules.id],
  }),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}));

// Zod schemas
export const insertTrackSchema = createInsertSchema(tracks).omit({ id: true });
export const insertCourseSchema = createInsertSchema(courses).omit({ id: true });
export const insertModuleSchema = createInsertSchema(modules).omit({ id: true });
export const insertLessonSchema = createInsertSchema(lessons).omit({ id: true });

// Types
export type Track = typeof tracks.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type Module = typeof modules.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Enrollment = typeof enrollments.$inferSelect;
export type Progress = typeof progress.$inferSelect;
export type Profile = typeof profiles.$inferSelect;

export type LessonWithModule = Lesson & { module: Module };
export type ModuleWithLessons = Module & { lessons: Lesson[] };
export type CourseWithRelations = Course & { modules: ModuleWithLessons[] };
export type EnrollmentWithCourse = Enrollment & { course: Course };
