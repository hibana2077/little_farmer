"use client";

import React, { useState, useEffect } from 'react';
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Brain, Sprout, BookOpen, Users, LogOut, LogIn, Menu, Cog, UserRoundPen } from 'lucide-react';

const Navbar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const isActive = (pathname) => router.pathname === pathname;

  const handleLogout = () => {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
    console.log('Logout clicked');
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', icon: <Home className="h-4 w-4" />, text: 'Dashboard' },
    { href: '/ai-assistant', icon: <Brain className="h-4 w-4" />, text: 'AI Assistant' },
    { href: '/my-farm', icon: <Sprout className="h-4 w-4" />, text: 'My Farm' },
    { href: '/learning-center', icon: <BookOpen className="h-4 w-4" />, text: 'Learning Center' },
    { href: '/community', icon: <Users className="h-4 w-4" />, text: 'Community' },
  ];

  const navItems_fold = [
    { href: '/dashboard', icon: <Home className="h-4 w-4" />, text: 'Dashboard' },
    { href: '/ai-assistant', icon: <Brain className="h-4 w-4" />, text: 'AI Assistant' },
    { href: '/my-farm', icon: <Sprout className="h-4 w-4" />, text: 'My Farm' },
    { href: '/learning-center', icon: <BookOpen className="h-4 w-4" />, text: 'Learning Center' },
    { href: '/community', icon: <Users className="h-4 w-4" />, text: 'Community' },
    { href: '/profile', icon: <UserRoundPen className="h-4 w-4" />, text: 'Profile' },
    { href: '/settings', icon: <Cog className="h-4 w-4" />, text: 'Settings' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                <Link href="/">
                  HydroEdu
                </Link>
              </span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item) => (
                <NavItem key={item.href} {...item} isActive={isActive(item.href)} />
              ))}
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
            {isAuthenticated ? (
              <UserMenu handleLogout={handleLogout} />
            ) : (
              <LoginButton onClick={() => router.push('/login')} />
            )}
          </div>
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="p-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-4">
                  {navItems_fold.map((item) => (
                    <MobileNavItem key={item.href} {...item} isActive={isActive(item.href)} />
                  ))}
                  {isAuthenticated ? (
                    <Button onClick={handleLogout} variant="outline" className="flex items-center justify-start">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                  ) : (
                    <LoginButton onClick={() => router.push('/login')} />
                  )}
                </nav>
              </SheetContent>
            </Sheet>
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

const MobileNavItem = ({ href, icon, text, isActive }) => (
  <Link href={href} className={cn(
    "flex items-center p-2 text-base font-medium rounded-lg",
    isActive
      ? "bg-green-100 text-green-700"
      : "text-gray-700 hover:bg-gray-100"
  )}>
    {icon}
    <span className="ml-3">{text}</span>
  </Link>
);

const UserMenu = ({ handleLogout }) => (
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
      <DropdownMenuLabel>
        My Account
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const LoginButton = ({ onClick }) => (
  <Button onClick={onClick} variant="outline" className="flex items-center">
    <LogIn className="mr-2 h-4 w-4" />
    <span>Log In</span>
  </Button>
);

export default Navbar;