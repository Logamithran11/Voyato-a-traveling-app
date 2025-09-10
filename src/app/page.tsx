import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { AppleIcon, FacebookIcon, GoogleIcon } from "@/components/icons";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const bgImage = PlaceHolderImages.find((img) => img.id === "login-bg");

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4">
        <div className="mx-auto grid w-full max-w-sm gap-8">
          <div className="grid gap-2 text-center">
            <Logo className="justify-center" />
            <p className="text-balance text-muted-foreground mt-2">
              Your Journey Begins Here ✈
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" asChild>
              <Link href="/dashboard">Login</Link>
            </Button>
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
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline">
                <GoogleIcon className="h-5 w-5" />
              </Button>
              <Button variant="outline">
                <FacebookIcon className="h-5 w-5" />
              </Button>
              <Button variant="outline">
                <AppleIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {bgImage && (
            <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            data-ai-hint={bgImage.imageHint}
            fill
            className="object-cover brightness-50"
          />
        )}
      </div>
    </div>
  );
}
