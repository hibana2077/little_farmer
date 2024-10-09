import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, ThumbsUp, Share2, Search, PlusCircle, Rss } from 'lucide-react';

const CommunityPage = () => {
  const discussionTopics = [
    { id: 1, title: '蔬菜種植技巧分享', author: '小明', avatar: '/avatars/xiaoming.jpg', role: 'Student', replies: 23, likes: 45 },
    { id: 2, title: '水培系統pH值調節', author: '王老師', avatar: '/avatars/teacher-wang.jpg', role: 'Teacher', replies: 56, likes: 78 },
    { id: 3, title: '提高產量的營養液配方', author: '張博士', avatar: '/avatars/dr-zhang.jpg', role: 'Expert', replies: 89, likes: 120 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          社群討論區
        </h1>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center gap-4">
              <div className="relative flex-grow">
                <Input type="text" placeholder="搜尋討論主題..." className="pl-10 pr-4 py-2 w-full" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap">
                <PlusCircle className="mr-2 h-4 w-4" /> 發起新討論
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">所有討論</TabsTrigger>
            <TabsTrigger value="students">學生專區</TabsTrigger>
            <TabsTrigger value="teachers">教師交流</TabsTrigger>
            <TabsTrigger value="experts">專家解答</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 gap-6">
          {discussionTopics.map((topic) => (
            <Card key={topic.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center">
                  <Avatar className="mr-2">
                    <AvatarImage src={topic.avatar} alt={topic.author} />
                    <AvatarFallback>{topic.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-semibold">{topic.title}</CardTitle>
                    <CardDescription>{topic.author} · {topic.role}</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Rss className="mr-2 h-4 w-4" /> 關注
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">點擊查看完整討論內容和參與互動...</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" /> {topic.replies} 回覆
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="mr-2 h-4 w-4" /> {topic.likes} 讚
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-2 h-4 w-4" /> 分享
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline">載入更多</Button>
        </div>
      </main>
    </div>
  );
};

export default CommunityPage;