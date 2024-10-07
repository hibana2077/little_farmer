"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Brain, Sprout, BookOpen, Users, LogOut } from 'lucide-react';

const Navbar = () => {
  const router = useRouter();

  const isActive = (pathname) => router.pathname === pathname;

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout clicked');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">HydroEdu</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavItem href="/dashboard" icon={<Home className="h-4 w-4" />} text="Dashboard" isActive={isActive('/dashboard')} />
              <NavItem href="/ai-assistant" icon={<Brain className="h-4 w-4" />} text="AI Assistant" isActive={isActive('/ai-assistant')} />
              <NavItem href="/my-farm" icon={<Sprout className="h-4 w-4" />} text="My Farm" isActive={isActive('/my-farm')} />
              <NavItem href="/learning-center" icon={<BookOpen className="h-4 w-4" />} text="Learning Center" isActive={isActive('/learning-center')} />
              <NavItem href="/community" icon={<Users className="h-4 w-4" />} text="Community" isActive={isActive('/community')} />
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@username" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon, text, isActive }) => (
  <Link href={href} className={cn(
    "inline-flex items-center px-1 pt-1 text-sm font-medium",
    isActive
      ? "border-b-2 border-green-500 text-gray-900"
      : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
  )}>
    <Button variant="ghost" className="flex items-center justify-center">
      {icon}
      <span className="ml-2">{text}</span>
    </Button>
  </Link>
);

export default Navbar;