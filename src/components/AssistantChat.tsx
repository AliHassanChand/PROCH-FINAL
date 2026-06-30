import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MessageSquare, ShieldAlert, Bot, RefreshCw, X, HelpCircle, User } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  time: string;
}

export default function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "assistant",
      text: "Hello! I am the PRO Care Homes CQC-Compliance & Care Referral Consultant. I can help Local Authorities, Case Managers, and Families understand our Positive Behaviour Support frameworks, Nourish digital care plans, admission standards, and properties. How can I assist you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage.text,
          history: messages.map(m => ({ role: m.sender === "user" ? "user" : "model", parts: m.text }))
        })
      });
      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "assistant",
          text: data.reply || "Thank you. Our strategists will assess this request directly. Please contact Salman Muhammad in our management office.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "assistant",
          text: "I apologize. Our secure server is verifying integration parameters. Please click our Make a Referral option above or write to our support workers directly.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "What is your PBS Model?",
    "Tell me about 6 Flags House layouts.",
    "Are you CQC registered?",
    "How does your Nourish system improve safety?"
  ];

  return (
    <>
      {/* Floating Toggle Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-sky-600 text-white rounded-full shadow-xl hover:bg-sky-700 active:scale-95 hover:shadow-sky-300/40 transition-all cursor-pointer flex items-center space-x-2 border border-sky-400 group"
        id="open-assistant-chat-btn"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-xs font-bold leading-none hidden sm:inline-block">
          CQC & Support Advisor
        </span>
      </button>

      {/* Main Drawer Panel */}
      {isOpen && (
        <div
          id="assistant-chat-drawer"
          className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[420px] h-[550px] bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 flex flex-col justify-between overflow-hidden animate-slideUp text-slate-800"
        >
          {/* Header */}
          <div className="bg-sky-600 text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-2.5">
              <span className="p-2 bg-white/10 rounded-xl border border-white/20 text-white">
                <Bot className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-bold text-xs sm:text-sm">PRO Governance Advisor</h4>
                <p className="text-[9px] uppercase tracking-wider text-emerald-300 font-mono font-bold">
                  Gemini-Engineered compliance
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white transition"
              id="close-assistant-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Policy disclaimer tag */}
          <div className="bg-slate-50 p-2.5 px-4 border-b border-slate-100 flex items-center space-x-2 text-[10px] text-slate-500">
            <ShieldAlert className="w-4 h-4 text-sky-700 flex-shrink-0" />
            <span>Strictly configured around UK Care Quality Commission standards.</span>
          </div>

          {/* Message log area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-sky-600 text-white rounded-br-none"
                      : "bg-white text-slate-850 border border-slate-150 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span className="text-[8px] opacity-70 block text-right mt-1.5 font-mono">
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start items-center space-x-2 text-slate-400 text-[11px] bg-white p-3 border border-slate-100 rounded-2xl w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Auditing care parameters...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Prompts Hub */}
          {messages.length < 3 && (
            <div className="p-3 bg-white border-t border-slate-100 space-y-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono block pl-1">
                Common Referrer Queries:
              </span>
              <div className="flex flex-wrap gap-1">
                {samplePrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setInputValue(p);
                    }}
                    className="bg-slate-100 hover:bg-sky-50 text-[10px] text-slate-700 hover:text-sky-700 px-2.5 py-1 rounded-lg border border-slate-200/50 transition cursor-pointer text-left"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input control block */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-50 border-t border-slate-150 flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about PBS audits, CQC safety..."
              className="flex-1 bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-805"
            />
            <button
              type="submit"
              className="p-2.5 bg-sky-600 text-white rounded-xl hover:bg-sky-700 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
