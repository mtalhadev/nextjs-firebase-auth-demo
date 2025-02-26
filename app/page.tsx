"use client";

import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await logout();
      if (error) throw error;

      toast({
        title: "Logged out successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {user ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Welcome!</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-semibold mb-2">Your Auth Details:</h3>
                <p className="text-sm text-muted-foreground break-all">
                  User ID: {user.uid}
                </p>
              </div>

              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          </div>
        ) : (
          <AuthForm />
        )}
      </div>
    </div>
  );
}
