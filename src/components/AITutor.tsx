import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, Loader2 } from 'lucide-react';
import { ChatMessage, EducationalStage } from '../types';
import { getTutorResponse } from '../services/geminiService';

interface AITutorProps {
  grade: number;
  stage: EducationalStage;
}

export const AITutor: React.FC<AITutorProps> = ({ grade, stage }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: `أهلاً بك! أنا معلمك الذكي. يمكنني مساعدتك في دراستك للمرحلة ${stage === 'Secondary' ? 'الثانوية' : stage} (الصف ${grade}). ما الذي يصعب عليك فهمه اليوم؟`,
      timestamp: new Date(),
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const context = `Grade ${grade}, ${stage}`;
    const responseText = await getTutorResponse(input, context);

    const botMessage: ChatMessage = {
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-t-2xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-mint-600 to-mint-500 p-4 flex items-center gap-3 text-white shadow-md">
        <div className="p-2 bg-white/20 rounded-full">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold font-cairo text-lg">المعلم الذكي</h2>
          <p className="text-xs text-mint-50 opacity-90">موجود دائماً لمساعدتك في التعلم</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 min-h-[300px]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-indigo-100' : 'bg-mint-100'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-indigo-600" /> : <Bot className="w-5 h-5 text-mint-600" />}
              </div>
              <div
                className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm font-medium ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
             <div className="flex max-w-[85%] gap-2">
               <div className="w-8 h-8 rounded-full bg-mint-100 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-mint-600" />
               </div>
               <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 flex items-center gap-2 text-gray-400 text-sm">
                 <Loader2 className="w-4 h-4 animate-spin" /> يفكر...
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اسأل سؤالاً عن دروسك..."
            className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-mint-500 focus:bg-white transition-all text-gray-800 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute left-2 p-2 bg-mint-600 text-white rounded-full hover:bg-mint-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rotate-180"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};