import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useCourses() {
  return useQuery({
    queryKey: [api.courses.list.path],
    queryFn: async () => {
      const res = await fetch(api.courses.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      return api.courses.list.responses[200].parse(data);
    },
  });
}

export function useCourse(slug: string) {
  return useQuery({
    queryKey: [api.courses.get.path, slug],
    queryFn: async () => {
      if (!slug) return null;
      const url = buildUrl(api.courses.get.path, { slug });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch course");
      const data = await res.json();
      // Bypassing strict Zod parse here as it's a complex relational object
      // which we typed as z.custom<any>() in schema
      return data; 
    },
    enabled: !!slug,
  });
}
