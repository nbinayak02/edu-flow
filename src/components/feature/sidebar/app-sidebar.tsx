"use client";

import * as React from "react";
import {
  LifeBuoy,
  Send,
  LayoutDashboard,
  BookOpenCheck,
  TableProperties,
  SquareUser,
  BookMarked,
  School,
  Medal,
  FileBadge2,
} from "lucide-react";

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
import Image from "next/image";

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
      name: "Gradesheet",
      url: "/gradesheet",
      icon: FileBadge2,
    },
    {
      name: "Marks",
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
                  <Image src={"/icon1.png"} alt="logo" width={100} height={100}/>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">EduFlow</span>
                  <span className="truncate text-xs">Beta</span>
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
