import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

export function useActionCTA() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const requireAuth = (callback: () => void, message = "Please log in to continue.") => {
    if (!isAuthenticated) {
      toast({
        title: "Guest mode",
        description: message,
      });
      // For now, still allow the action in guest mode
      callback();
      return;
    }
    callback();
  };

  const joinSession = (sessionTitle: string) => {
    requireAuth(
      () => {
        toast({
          title: isAuthenticated ? "Joining Session!" : "Joining as guest",
          description: `You've joined "${sessionTitle}"${isAuthenticated ? "." : " as a guest."}`,
        });
      },
      "You're joining this worship/game session as a guest."
    );
  };

  const registerTournament = (tournamentTitle: string) => {
    requireAuth(
      () => {
        toast({
          title: isAuthenticated ? "Registered!" : "Registered as guest",
          description: `You're registered for "${tournamentTitle}".`,
        });
      },
      "You're registering for this tournament as a guest."
    );
  };

  const startActivity = (activityTitle: string) => {
    requireAuth(
      () => {
        toast({
          title: "Activity Started!",
          description: `"${activityTitle}" has begun. Enjoy!`,
        });
      },
      "You're starting this activity in guest mode."
    );
  };

  const explore = (label: string) => {
    toast({
      title: "Exploring " + label,
      description: `Browsing available ${label.toLowerCase()} sessions and resources.`,
    });
  };

  const goTo = (path: string) => {
    navigate(path);
  };

  const joinCommunity = () => {
    if (!isAuthenticated) {
      navigate("/auth");
    } else {
      navigate("/dashboard");
    }
  };

  return { joinSession, registerTournament, startActivity, explore, goTo, requireAuth, joinCommunity };
}
