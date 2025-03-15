'use client';

import * as React from 'react';
import { Send, Paperclip, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  sender: 'user' | 'lender';
  text: string;
  timestamp: string;
  senderName: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      sender: 'lender',
      text: "Hi, Chris Glasser. Of course! We offer several loan options depending on your budget and loan term. May I ask which car you're interested in and how long you'd like the loan to be?",
      timestamp: 'Thursday 10:15am',
      senderName: 'John Dukes',
    },
    {
      id: '2',
      sender: 'user',
      text: "I'm interested in a [Make and Model], and I'd like to take out a loan for 3 years. What would the interest rate be, and what other conditions should I be aware of?",
      timestamp: 'Thursday 11:41am',
      senderName: 'You',
    },
    {
      id: '3',
      sender: 'lender',
      text: "For a [Make and Model] with a 3-year term, we can offer an interest rate of [X]%. You'll also need to make a down payment of [Amount]. Your monthly payments would be around [Amount]. Does that work for you?",
      timestamp: 'Thursday 10:15am',
      senderName: 'John Dukes',
    },
    {
      id: '4',
      sender: 'user',
      text: 'Yes, that sounds reasonable. What documents do I need to provide to apply for the loan?',
      timestamp: 'Thursday 11:41am',
      senderName: 'You',
    },
  ]);
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

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text: newMessage,
        timestamp: 'Today',
        senderName: 'You',
      },
    ]);
    setNewMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-lg flex flex-col z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Messages</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0" />
            <div
              className={`flex flex-col ${
                message.sender === 'user' ? 'items-end' : ''
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">
                  {message.senderName}
                </span>
                <span className="text-xs text-gray-500">
                  {message.timestamp}
                </span>
              </div>
              <div
                className={`rounded-lg p-3 max-w-[280px] ${
                  message.sender === 'user'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {message.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSendMessage}
        className="border-t p-4 flex items-center gap-2"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-gray-500"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message"
          className="flex-1"
        />
        <Button
          type="submit"
          size="icon"
          className="bg-red-600 hover:bg-red-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
