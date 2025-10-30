"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  LayoutDashboard,
  BookOpenCheck,
  TableProperties,
  SquareUser,
  BookMarked,
  School,
  Medal,
} from "lucide-react";

import { NavMain } from "@/components/feature/sidebar/nav-main";
import { NavProjects } from "@/components/feature/sidebar/nav-projects";
import { NavSecondary } from "@/components/feature/sidebar/nav-secondary";
import { NavUser } from "@/components/feature/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getUser } from "@/lib/auth";

const data = {
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  navItems: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name:"Marks",
      url: "/marks",
      icon: Medal,
    },
    {
      name: "Exams",
      url: "/exam",
      icon: BookOpenCheck,
    },
    {
      name: "Students",
      url: "/student",
      icon: SquareUser,
    },
    {
      name: "Subjects",
      url: "/subject",
      icon: BookMarked,
    },
    {
      name: "Class",
      url: "/class",
      icon: TableProperties,
    },

    {
      name: "School",
      url: "/school",
      icon: School,
    },
  ],
};

type User = {
  name: string;
  email: string;
};

interface AppSideBarProps extends React.ComponentProps<typeof Sidebar> {
  user?: User;
}

export function AppSidebar({ user, ...props }: AppSideBarProps) {
  
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.navItems} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user ?? { name: "", email: "" }} />
      </SidebarFooter>
    </Sidebar>
  );
}
