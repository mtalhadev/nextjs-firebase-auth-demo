"use client";

import { useState } from "react";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Icons
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";

// Auth
import { loginWithEmail, registerWithEmail, loginWithGoogle } from "@/lib/auth";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Utils
import { getAuthErrorMessage } from "@/lib/auth-errors";

// Types
import { FirebaseAuthError } from "firebase-admin/auth";

export function AuthForm() {
  const { toast } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { user, error } = isLogin
        ? await loginWithEmail(email, password)
        : await registerWithEmail(email, password);

      if (error) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: getAuthErrorMessage(error),
        });
        return;
      }

      if (user) {
        toast({
          title: isLogin ? "Welcome back!" : "Account created!",
          description: `Signed in as ${user.email}`,
        });
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: getAuthErrorMessage(error as FirebaseAuthError),
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { user, error } = await loginWithGoogle();

      if (error) {
        toast({
          variant: "destructive",
          title: "Google Sign-in Error",
          description: getAuthErrorMessage(error),
        });
        return;
      }

      if (user) {
        toast({
          title: "Welcome!",
          description: `Signed in as ${user.email}`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google Sign-in Error",
        description: getAuthErrorMessage(error as FirebaseAuthError),
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-muted-foreground">
            {isLogin ? "Sign in to your account" : "Sign up for a new account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 h-5 w-5 text-muted-foreground hover:text-foreground transition-transform duration-200 hover:scale-110"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 transition-opacity duration-200" />
                ) : (
                  <Eye className="h-5 w-5 transition-opacity duration-200" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            <LogIn className="mr-2 h-5 w-5" />
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={handleGoogleLogin}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>

        <div className="text-center text-sm">
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </Card>
    </div>
  );
}
