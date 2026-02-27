import { z } from 'zod';
import { tracks, courses, modules, lessons, enrollments, progress, profiles, insertTrackSchema, insertCourseSchema, insertModuleSchema, insertLessonSchema } from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
  unauthorized: z.object({ message: z.string() }),
};

export const api = {
  tracks: {
    list: {
      method: 'GET' as const,
      path: '/api/tracks' as const,
      responses: {
        200: z.array(z.custom<typeof tracks.$inferSelect>()),
      },
    },
  },
  courses: {
    list: {
      method: 'GET' as const,
      path: '/api/courses' as const,
      responses: {
        200: z.array(z.custom<typeof courses.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/courses/:slug' as const,
      responses: {
        200: z.custom<any>(), // CourseWithRelations
        404: errorSchemas.notFound,
      },
    },
  },
  enrollments: {
    list: {
      method: 'GET' as const,
      path: '/api/enrollments' as const,
      responses: {
        200: z.array(z.custom<any>()), // EnrollmentWithCourse
        401: errorSchemas.unauthorized,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/enrollments' as const,
      input: z.object({ courseId: z.number() }),
      responses: {
        201: z.custom<typeof enrollments.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
  },
  progress: {
    list: {
      method: 'GET' as const,
      path: '/api/progress' as const,
      responses: {
        200: z.array(z.custom<typeof progress.$inferSelect>()),
        401: errorSchemas.unauthorized,
      },
    },
    markComplete: {
      method: 'POST' as const,
      path: '/api/progress' as const,
      input: z.object({ lessonId: z.number() }),
      responses: {
        201: z.custom<typeof progress.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    }
  },
  admin: {
    stats: {
      method: 'GET' as const,
      path: '/api/admin/stats' as const,
      responses: {
        200: z.object({
          totalUsers: z.number(),
          totalRevenue: z.number(),
          activeEnrollments: z.number()
        }),
        401: errorSchemas.unauthorized,
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
