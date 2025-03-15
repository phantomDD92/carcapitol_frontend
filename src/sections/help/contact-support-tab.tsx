'use client';

import * as React from 'react';
import { Search, Send, Archive } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isAssistant: boolean;
}

const initialMessages: Message[] = [
  {
    id: '1',
    content:
      "I've been the testing and everything looks good. I'm comfortable moving forward. What's the next step?",
    timestamp: '12:45',
    isAssistant: true,
  },
  {
    id: '2',
    content:
      "I've been the testing and everything looks good. I'm comfortable moving forward. What's the next step?",
    timestamp: '12:46',
    isAssistant: true,
  },
  {
    id: '3',
    content:
      "I've been the testing and everything looks good. I'm comfortable moving forward. What's the next step?",
    timestamp: '12:47',
    isAssistant: true,
  },
];

export function ContactSupportTab() {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isAssistant: false,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="mx-auto max-w-4xl py-6">
      <div className="rounded-lg border bg-white">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-medium">Support Chats</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input placeholder="Search" className="pl-9" />
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              Start new chat
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="p-4">
          <TabsList className="w-full justify-start rounded-none border-b pb-0">
            <TabsTrigger
              value="active"
              className="rounded-none border-b-2 border-transparent px-0 pb-4 pt-2 data-[state=active]:border-red-600"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="archived"
              className="rounded-none border-b-2 border-transparent px-4 pb-4 pt-2 data-[state=active]:border-red-600"
            >
              Archived
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="active"
            className="mt-4 focus-visible:outline-none"
          >
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.isAssistant ? '' : 'flex-row-reverse'
                    }`}
                  >
                    {message.isAssistant && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>AC</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        message.isAssistant
                          ? 'bg-gray-100'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="mt-1 block text-xs opacity-70">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </TabsContent>

          <TabsContent
            value="archived"
            className="mt-4 focus-visible:outline-none"
          >
            <div className="flex flex-col items-center justify-center py-12">
              <Archive className="h-12 w-12 text-gray-400" />
              <p className="mt-4 text-sm text-gray-500">No archived chats</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
