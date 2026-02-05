"use client";

import React from "react";
import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const menuItems = [
  {
    title: "Workflows",
    href: "/workflows",
    icon: FolderOpenIcon,
  },
  {
    title: "Credentials",
    href: "/credentials",
    icon: KeyIcon,
  },
  {
    title: "Executions",
    href: "/executions",
    icon: HistoryIcon,
  },
  {
    title: "Users",
    href: "/users",
    icon: UsersIcon,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCardIcon,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: StarIcon,
  },
];

type Props = {};

const AppSidebar = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
            <Link href="/" prefetch>
              <Image
                src="/logos/logo.svg"
                alt="MariachonBase"
                width={32}
                height={32}
              />
              <span className="font-semibold text-sm">MariachonBase</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)
                }
                asChild
                className="gap-x-4 h-10 px-4"
              >
                <Link href={item.href} prefetch>
                  <item.icon className="size-5" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Upgrade to Pro"
              onClick={() => {}}
              className="gap-x-4 h-10 px-4"
            >
              <StarIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Upgrade to Pro</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing portal"
              onClick={() => {}}
              className="gap-x-4 h-10 px-4"
            >
              <CreditCardIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Billing portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login");
                    },
                  },
                })
              }
              className="gap-x-4 h-10 px-4"
            >
              <LogOutIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
