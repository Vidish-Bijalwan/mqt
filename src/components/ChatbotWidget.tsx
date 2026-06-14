import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Bot } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/contact";
import { useNavigate } from "react-router-dom";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm the MQT Assistant. How can I help you plan your trip today?", sender: "bot" }
  ]);
  const [showOptions, setShowOptions] = useState(true);
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const options = [
    { label: "Explore Packages", action: "packages" },
    { label: "Top Destinations", action: "destinations" },
    { label: "Custom Trip Plan", action: "custom" },
    { label: "Read Travel Blogs", action: "blogs" },
    { label: "Contact Details", action: "contact_info" },
    { label: "Talk to a Human", action: "human" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleOptionClick = (option: typeof options[0]) => {
    setMessages(prev => [...prev, { id: Date.now(), text: option.label, sender: "user" }]);
    setShowOptions(false);
    
    setTimeout(() => {
      let responseText = "";
      if (option.action === "packages") {
        responseText = "Great! We have over 50+ handpicked packages across India. I'll take you there now.";
        setMessages(prev => [...prev, { id: Date.now(), text: responseText, sender: "bot" }]);
        setTimeout(() => {
          navigate('/packages');
          setIsOpen(false);
          setTimeout(() => {
            setShowOptions(true);
            setMessages([{ id: 1, text: "Hi! I'm the MQT Assistant. How can I help you plan your trip today?", sender: "bot" }]);
          }, 500);
        }, 2000);
      } else if (option.action === "destinations") {
        responseText = "India has incredible places to explore. Let's look at some of the best destinations!";
        setMessages(prev => [...prev, { id: Date.now(), text: responseText, sender: "bot" }]);
        setTimeout(() => {
          navigate('/destinations');
          setIsOpen(false);
          setTimeout(() => {
            setShowOptions(true);
            setMessages([{ id: 1, text: "Hi! I'm the MQT Assistant. How can I help you plan your trip today?", sender: "bot" }]);
          }, 500);
        }, 2000);
      } else if (option.action === "blogs") {
        responseText = "Check out our travel journals and guides written by our experts. Taking you to the blog...";
        setMessages(prev => [...prev, { id: Date.now(), text: responseText, sender: "bot" }]);
        setTimeout(() => {
          navigate('/blog');
          setIsOpen(false);
          setTimeout(() => {
            setShowOptions(true);
            setMessages([{ id: 1, text: "Hi! I'm the MQT Assistant. How can I help you plan your trip today?", sender: "bot" }]);
          }, 500);
        }, 2000);
      } else if (option.action === "contact_info") {
        responseText = "You can reach us at +91 81711 58569 or email us at hello@myquicktrippers.com. You can also chat directly on WhatsApp using the button below!";
        setMessages(prev => [...prev, { id: Date.now(), text: responseText, sender: "bot" }]);
        setTimeout(() => setShowOptions(true), 1500);
      } else if (option.action === "custom" || option.action === "human") {
        responseText = "I'm connecting you to one of our destination experts on WhatsApp. They will help you out!";
        setMessages(prev => [...prev, { id: Date.now(), text: responseText, sender: "bot" }]);
        setTimeout(() => {
          window.open(getGeneralWhatsAppUrl(), '_blank');
          setIsOpen(false);
          setTimeout(() => {
            setShowOptions(true);
            setMessages([{ id: 1, text: "Hi! I'm the MQT Assistant. How can I help you plan your trip today?", sender: "bot" }]);
          }, 500);
        }, 2000);
      }
    }, 800);
  };

  return (
    <>
      <div className="fixed bottom-[90px] md:bottom-6 right-4 md:right-6 z-50">
        {isOpen ? (
          <div className="bg-white w-[300px] sm:w-[360px] h-[480px] max-h-[75vh] rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
            {/* Header */}
            <div className="bg-slate-900 text-white p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">MQT Assistant</h3>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white p-1 rounded-md transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-[12px] sm:text-[13px] leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-emerald-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {showOptions && (
                <div className="flex flex-col gap-2 mt-2">
                  {options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(opt)}
                      className="bg-white border border-emerald-600 text-emerald-700 text-[12px] sm:text-[13px] py-1.5 sm:py-2 px-3 sm:px-4 rounded-full hover:bg-emerald-50 transition-colors self-start shadow-sm font-semibold text-left"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100">
              <button 
                onClick={() => window.open(getGeneralWhatsAppUrl(), '_blank')}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 sm:py-3 rounded-xl text-[12px] sm:text-[13px] font-bold tracking-wide hover:bg-slate-800 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 md:w-14 md:h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 z-50 group border-2 border-white"
            aria-label="Open Chatbot"
          >
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:hidden" />
            <Bot className="w-5 h-5 md:w-6 md:h-6 hidden group-hover:block" />
            
            {/* Notification Dot */}
            <span className="absolute top-0 right-0 w-3 h-3 md:w-3.5 md:h-3.5 bg-red-500 border-2 border-white rounded-full animate-pulse" />
          </button>
        )}
      </div>
    </>
  );
};

export default ChatbotWidget;
