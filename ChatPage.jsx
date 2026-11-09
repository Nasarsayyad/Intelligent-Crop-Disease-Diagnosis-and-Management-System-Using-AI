import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Trash2,
  Sparkles,
  User,
  Languages,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  CornerDownLeft,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';

export default function ChatPage() {
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    loadChatHistory();
  }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    try {
      const res = await api.getChatHistory(user?.id);
      // Filter messages to show conversations in current language, or show initial welcome
      const langMessages = res.messages ? res.messages.filter(m => !m.language || m.language === language) : [];

      if (langMessages.length > 0) {
        setMessages(langMessages);
      } else {
        // Localized Welcome message
        setMessages([
          {
            id: `welcome_${language}`,
            sender: 'bot',
            message: language === 'ta'
              ? 'வணக்கம்! நான் உங்கள் அக்ரிபோட் (AgriBot). பயிர் நோய் கண்டறிதல், பூச்சி கட்டுப்பாடு, உரம் மற்றும் பாசன மேலாண்மை பற்றிய உங்கள் கேள்விகளை என்னிடம் கேட்கலாம்.'
              : 'Hello! I am AgriBot, your AI Agricultural Assistant. Ask me anything about crop diseases, pest management, organic inputs, fertigation, and farming best practices.',
            created_at: new Date().toISOString()
          }
        ]);
      }
      setSuggestedQuestions(language === 'ta' ? res.suggested_questions_ta : res.suggested_questions);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isSending) return;

    setInputText('');
    const userMsg = {
      id: `temp_${Date.now()}`,
      sender: 'user',
      message: text,
      language: language,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsSending(true);

    try {
      const res = await api.sendChatMessage(text, language, user?.id);
      if (res.success) {
        setMessages(prev => [
          ...prev,
          {
            id: `bot_${Date.now()}`,
            sender: 'bot',
            message: res.reply,
            followups: res.suggested_followups,
            tips: res.key_tips,
            created_at: res.timestamp
          }
        ]);
        if (res.suggested_followups) {
          setSuggestedQuestions(res.suggested_followups);
        }
      }
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: `bot_err_${Date.now()}`,
          sender: 'bot',
          message: "Sorry, I encountered an issue connecting to the agronomic knowledge base. Please try again.",
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleClearChat = async () => {
    if (confirm("Clear conversational chat history?")) {
      await api.clearChat(user?.id);
      loadChatHistory();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">

      {/* Header Bar */}
      <div className="agri-card p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-forest-800 to-emerald-600 text-white flex items-center justify-center shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-900">
                {language === 'ta' ? 'அக்ரிபோட் உதவியாளர்' : 'AgriBot Assistant'}
              </h1>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {language === 'ta' ? 'AI வேளாண் நிபுணர்' : 'AI Agronomist'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'ta'
                ? 'பயிர் நோய்கள், வேளாண்மை, பூச்சி கட்டுப்பாடு மற்றும் இயற்கை மேலாண்மைக்கான AI வழிகாட்டி.'
                : 'Trained on plant pathology, agronomy, IPM and organic agricultural best practices.'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-auto">
          {/* Language Toggle */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-lg transition-all ${
                language === 'en' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-3 py-1 rounded-lg transition-all ${
                language === 'ta' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
              }`}
            >
              தமிழ்
            </button>
          </div>

          <button
            onClick={handleClearChat}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Questions Chips */}
      {suggestedQuestions && suggestedQuestions.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'ta' ? 'பரிந்துரைக்கப்பட்ட வினாக்கள்:' : 'Suggested Questions:'}</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.slice(0, 4).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-xs bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200/80 px-3 py-1.5 rounded-full shadow-2xs transition-all text-left truncate max-w-full"
              >
                {q} &rarr;
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Thread Messages Box */}
      <div className="agri-card p-4 sm:p-6 min-h-[460px] max-h-[580px] overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isBot = m.sender === 'bot';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-xs ${
                  isBot ? 'bg-emerald-700' : 'bg-slate-800'
                }`}
              >
                {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                  isBot
                    ? 'bg-slate-50 border border-slate-200/80 text-slate-800'
                    : 'bg-emerald-700 text-white shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{m.message}</div>

                {/* Followups & Tips */}
                {m.tips && m.tips.length > 0 && (
                  <div className="pt-2 border-t border-slate-200/60 mt-2 space-y-1">
                    <p className="font-bold text-emerald-800 text-[11px]">💡 Key Agronomic Takeaway:</p>
                    {m.tips.map((t, idx) => (
                      <p key={idx} className="text-slate-600 text-[11px]">• {t}</p>
                    ))}
                  </div>
                )}

                <span
                  className={`text-[9px] block text-right ${
                    isBot ? 'text-slate-400' : 'text-emerald-200'
                  }`}
                >
                  {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] text-slate-400 ml-1">
                {language === 'ta' ? 'வேளாண் களஞ்சியத்தை ஆராய்கிறது...' : 'Consulting agronomic knowledge base...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            language === 'ta'
              ? 'பயிர் நோய்கள், உரம் அல்லது பூச்சிகள் பற்றி கேளுங்கள்...'
              : 'Ask AgriBot about crop diseases, fertilizers, organic methods, irrigation...'
          }
          className="w-full pl-5 pr-28 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isSending}
          className="absolute right-2 top-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all disabled:opacity-40 flex items-center gap-1.5"
        >
          <span>{language === 'ta' ? 'அனுப்பு' : 'Send'}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
}
