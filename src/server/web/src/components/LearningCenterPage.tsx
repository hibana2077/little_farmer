import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Video, FileText, MessageCircle, HelpCircle } from 'lucide-react';

const LearningCenterPage = () => {
  const materials = [
    { id: 1, title: '水耕栽培基礎', type: 'article', icon: <FileText className="w-6 h-6" /> },
    { id: 2, title: '營養液配方指南', type: 'video', icon: <Video className="w-6 h-6" /> },
    { id: 3, title: '常見植物疾病診斷', type: 'ebook', icon: <Book className="w-6 h-6" /> },
  ];

  const interactiveContent = [
    { id: 1, title: '每週測驗：植物生長週期', type: 'quiz' },
    { id: 2, title: 'AI 助手：解答您的種植問題', type: 'ai-chat' },
    { id: 3, title: '即時討論：水培蔬菜種植技巧', type: 'forum' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          學習中心
        </h1>

        <Tabs defaultValue="materials" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="materials">教材資源</TabsTrigger>
            <TabsTrigger value="interactive">課堂互動專區</TabsTrigger>
          </TabsList>
          <TabsContent value="materials">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {materials.map((material) => (
                <Card key={material.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {material.icon}
                      <span className="ml-2">{material.title}</span>
                    </CardTitle>
                    <CardDescription>{material.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">查看內容</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="interactive">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {interactiveContent.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {item.type === 'quiz' && <HelpCircle className="w-6 h-6 mr-2" />}
                      {item.type === 'ai-chat' && <MessageCircle className="w-6 h-6 mr-2" />}
                      {item.type === 'forum' && <MessageCircle className="w-6 h-6 mr-2" />}
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">參與互動</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LearningCenterPage;