'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const fadeIn = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
};
  
const MotionButton = motion(Button);
  
const buttonVariants = {
    initial: { borderRadius: '0.25rem' },
    hover: { scale: 1.05, borderRadius: '1.5rem' },
    tap: { scale: 0.95, borderRadius: '2rem' }
};
  

export default function SettingsPage() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/avatars/01.png',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (type: 'email' | 'push') => {
    setNotifications({ ...notifications, [type]: !notifications[type] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-3xl font-bold mb-6 text-green-800"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          設置
        </motion.h1>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">個人資料</TabsTrigger>
              <TabsTrigger value="account">帳號</TabsTrigger>
              <TabsTrigger value="notifications">通知</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>個人資料</CardTitle>
                  <CardDescription>更新您的個人信息</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <MotionButton
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      更改頭像
                    </MotionButton>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" name="name" value={user.name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">電子郵件</Label>
                    <Input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} />
                  </div>
                </CardContent>
                <CardFooter>
                  <MotionButton
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    保存更改
                  </MotionButton>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>帳號安全</CardTitle>
                  <CardDescription>管理您的密碼和帳號安全設置</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">當前密碼</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">新密碼</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">確認新密碼</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <MotionButton
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    更改密碼
                  </MotionButton>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>通知設置</CardTitle>
                  <CardDescription>自定義您想接收的通知</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">電子郵件通知</Label>
                      <p className="text-sm text-muted-foreground">接收重要更新和公告</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationChange('email')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">推送通知</Label>
                      <p className="text-sm text-muted-foreground">接收即時通知</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={() => handleNotificationChange('push')}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <MotionButton
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    保存通知設置
                  </MotionButton>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}