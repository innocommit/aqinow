"use client";

import React, { useMemo, useRef } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react';
import { getPatternByRouter, getRegexByPattern, getRouter } from '@/utils/router.util';
import { ChartLine, LockIcon, LogOutIcon, MoreVerticalIcon, UserIcon } from 'lucide-react';
import Logo from '@/components/custom/logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Role } from '@/lib/api';

export interface IItem {
  url: string;
  label: string;
  icon: React.ReactNode;
  pattern: Array<RegExp>;
}

function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const ref = useRef(null);

  const { data: session } = useSession();

  const items = useMemo<Array<IItem>>(
    () => [
      {
        url: getRouter("dashboard"),
        label: "Trang chủ",
        icon: React.cloneElement(<ChartLine />, {}),
        pattern: [getRegexByPattern(getPatternByRouter("dashboard"))],
      },
      {
        url: getRouter("user"),
        label: "Người dùng",
        icon: React.cloneElement(<UserIcon />, {}),
        pattern: [getRegexByPattern(getPatternByRouter("user"))],
      }
    ],
    []
  );

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-2 mt-2">
          <Logo />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items
                .filter((item) => (session?.role === Role.ADMIN ? true : item.url !== getRouter("user")))
                .map((item) => (
                  <SidebarMenuItem key={item.label} className="py-1">
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        {item.icon}
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <AvatarImage src="https://ui.shadcn.com/avatars/shadcn.jpg" alt={session?.user.name} />
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{session?.user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {session?.user.email}
                    </span>
                  </div>
                  <MoreVerticalIcon className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="https://ui.shadcn.com/avatars/shadcn.jpg" alt={session?.user.name} />
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{session?.user.name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {session?.user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <LockIcon />
                  Đổi mật khẩu
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    signOut({ redirect: false }).then(() => {
                      router.push(getRouter("login"));
                    });
                  }}
                >
                  <LogOutIcon />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar