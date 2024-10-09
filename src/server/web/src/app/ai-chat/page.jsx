'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Bot, User } from 'lucide-react'

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you with your hydroponic farming today?' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      // Here you would typically send the message to your AI backend
      // For now, we'll just simulate a response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `I received your message: "${input}". How else can I help you?`
        }])
      }, 1000)
      setInput('')
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-b from-green-100 to-blue-100">
      <Card className="w-full max-w-3xl m-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">AI Hydroponic Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className={`flex items-start ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src={message.role === 'assistant' ? "/ai-avatar.png" : "/user-avatar.png"} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {message.role === 'assistant' ? (
                          <Bot className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <motion.div 
                      className={`mx-2 p-3 rounded-lg ${
                        message.role === 'assistant' 
                          ? 'bg-green-200 text-green-900' 
                          : 'bg-blue-200 text-blue-900'
                      }`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      {message.content}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center space-x-2">
            <Input 
              type="text" 
              placeholder="Type your message here..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}