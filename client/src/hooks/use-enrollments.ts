import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useEnrollments() {
  return useQuery({
    queryKey: [api.enrollments.list.path],
    queryFn: async () => {
      const res = await fetch(api.enrollments.list.path, { credentials: "include" });
      if (res.status === 401) return []; // Not logged in
      if (!res.ok) throw new Error("Failed to fetch enrollments");
      return res.json(); // Custom type response
    },
  });
}

export function useCreateEnrollment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (courseId: number) => {
      const res = await fetch(api.enrollments.create.path, {
        method: api.enrollments.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Please log in to enroll");
        throw new Error("Failed to enroll");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.enrollments.list.path] });
      toast({
        title: "Enrolled Successfully!",
        description: "You can now access the course materials.",
      });
    },
    onError: (err: Error) => {
      toast({
        title: "Enrollment Failed",
        description: err.message,
        variant: "destructive"
      });
    }
  });
}
