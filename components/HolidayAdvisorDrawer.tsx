'use client';

import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ArrowRight } from 'lucide-react';
import { HolidayId } from '@/data/types';
import { HOLIDAYS } from '@/data/holidays';

interface HolidayAdvisorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedHoliday: HolidayId | 'all';
  onSelectHoliday: (holiday: HolidayId) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

let msgCounter = 0;
function createMessageId(prefix: string): string {
  msgCounter += 1;
  return `${prefix}-${msgCounter}`;
}

export function HolidayAdvisorDrawer({
  isOpen,
  onClose,
  selectedHoliday,
  onSelectHoliday,
}: HolidayAdvisorDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I'm Rufus, your Amazon Holiday Shopping Advisor. Ask me anything about gift ideas, holiday party essentials, decorations, or culinary tools across all 11 major holidays!",
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const currentHolidayName =
    selectedHoliday === 'all'
      ? 'All Holidays'
      : HOLIDAYS.find((h) => h.id === selectedHoliday)?.shortName;

  const quickPrompts = [
    'What do I need for Thanksgiving dinner?',
    'Top gifts for Veterans Day?',
    'Best artificial Christmas tree?',
    'Juneteenth celebration party essentials?',
    '4th of July backyard cookout gear?',
  ];

  const handleSend = async (questionText?: string) => {
    const q = (questionText || input).trim();
    if (!q || isLoading) return;

    const userMsg: ChatMessage = {
      id: createMessageId('usr'),
      sender: 'user',
      text: q,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          holidayId: selectedHoliday === 'all' ? undefined : selectedHoliday,
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: createMessageId('bot'),
        sender: 'assistant',
        text: data.answer || "Here are great holiday recommendations from our top-rated collections.",
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId('bot-err'),
          sender: 'assistant',
          text: 'Our holiday best sellers include pre-lit Dunhill fir trees, heavy duty stainless steel roasting pans, flickering ceramic jack-o-lanterns, and embroidered American flags. Check out our deals above!',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#131921] to-[#232f3e] text-white flex items-center justify-between border-b border-amber-500/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  <span>Rufus · Holiday AI Advisor</span>
                </h3>
                <p className="text-[10px] text-amber-300">
                  Powered by Amazon Intelligence · {currentHolidayName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-slate-800 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-amber-700" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#ffd814] text-slate-900 font-medium shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Rufus is curating holiday recommendations...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-white border-t border-slate-200 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-amber-100 text-slate-700 text-[11px] rounded-full whitespace-nowrap border border-slate-200 transition"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for holiday gifts, decor tips, recipes..."
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] disabled:opacity-50 text-slate-900 flex items-center justify-center shrink-0 shadow-xs border border-[#fcd200] transition"
              >
                <Send className="w-4 h-4 text-slate-800" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
