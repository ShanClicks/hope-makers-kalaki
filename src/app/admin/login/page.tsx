import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-xl font-bold text-foreground">Admin Sign In</h1>
        <p className="mt-1 text-sm text-muted-foreground">Hope Makers Kalaki admin panel.</p>
        <div className="mt-6">
          <LoginForm from={from ?? "/admin"} />
        </div>
      </div>
    </div>
  );
}
