"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Layers,
  Newspaper,
  Users,
  Image as ImageIcon,
  HelpCircle,
  Quote,
  Heart,
  BarChart3,
  Wallet,
  Mail,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/admin/login/actions";

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/projects", label: "Projects", icon: FolderKanban },
      { href: "/admin/programs", label: "Programs", icon: Layers },
      { href: "/admin/news", label: "News & Events", icon: Newspaper },
      { href: "/admin/team", label: "Team", icon: Users },
      { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
      { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
      { href: "/admin/core-values", label: "Core Values", icon: Heart },
      { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
      { href: "/admin/impact-stats", label: "Impact Stats", icon: BarChart3 },
    ],
  },
  {
    label: "Activity",
    items: [
      { href: "/admin/donations", label: "Donations", icon: Wallet },
      { href: "/admin/contact-submissions", label: "Contact Submissions", icon: Mail },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-background lg:block">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/admin" className="font-heading text-lg font-bold text-primary">
          HMK Admin
        </Link>
      </div>
      <nav className="flex flex-col gap-6 p-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="flex flex-col gap-1">
            <span className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {section.label}
            </span>
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-foreground/80 hover:bg-secondary/60 hover:text-primary"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="flex flex-col gap-2 border-t border-border p-4">
        <Link href="/" className="text-xs text-muted-foreground hover:text-primary">
          ← Back to site
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-destructive"
          >
            <LogOut className="size-3.5" />
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
