import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Volume2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AudioGuideProps {
  title: string;
  content: string;
}

export function AudioGuide({ title, content }: AudioGuideProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [language, setLanguage] = useState<'en-IN' | 'hi-IN'>('en-IN');
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      synthRef.current.cancel();
    };
  }, []);

  const getVoice = (lang: string) => {
    const voices = synthRef.current.getVoices();
    
    // Filter voices matching the requested language
    const langVoices = voices.filter(v => v.lang === lang || v.lang.startsWith(lang.split('-')[0]));
    
    // Attempt to select the most natural-sounding voice available
    // Google, Microsoft, and "Natural" variants usually have better synthesis engines
    const premiumVoice = langVoices.find(
      v => /Google|Natural|Premium|Microsoft/i.test(v.name)
    );
    
    return premiumVoice || langVoices[0] || voices[0];
  };

  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);

  const handlePlay = async () => {
    if (isPaused) {
      synthRef.current.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    synthRef.current.cancel();
    
    let textToRead = `Audio Guide for ${title}. ${content}`;
    
    // Translate text dynamically for Hindi
    if (language === 'hi-IN') {
       setIsLoadingTranslation(true);
       try {
         const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(textToRead)}`);
         if (!res.ok) throw new Error("Translation failed");
         const data = await res.json();
         textToRead = data[0].map((item: any) => item[0]).join("");
       } catch (err) {
         toast.error("Failed to fetch Hindi translation. Playing with English fallback.");
       } finally {
         setIsLoadingTranslation(false);
       }
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    const voice = getVoice(language);
    if (voice) utterance.voice = voice;
    
    // Adjust rate and pitch to make it sound more conversational and less robotic
    utterance.rate = 0.95; // Slightly slower than 1.0 for better articulation
    utterance.pitch = 1.0; // Keep natural pitch
    utterance.lang = language;
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    synthRef.current.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en-IN' ? 'hi-IN' : 'en-IN';
    setLanguage(newLang);
    if (isPlaying || isPaused) {
      synthRef.current.cancel();
      setTimeout(() => {
        handlePlay(); // replay in new language
      }, 100);
    }
  };

  return (
    <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 mb-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-full text-primary">
          <Volume2 size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Tour Audio Guide</h3>
          <p className="text-xs text-gray-500">Listen to the itinerary overview in 1 minute</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs font-semibold gap-2 border-primary/20 text-primary hover:bg-primary/10"
          onClick={toggleLanguage}
        >
          <Globe size={14} />
          {language === 'en-IN' ? 'Hindi Available' : 'English Available'}
        </Button>

        {!isPlaying ? (
          <Button 
            variant="default" 
            size="sm" 
            onClick={handlePlay} 
            className="px-6 shadow-md hover:shadow-lg transition-shadow"
            disabled={isLoadingTranslation}
          >
            {isLoadingTranslation ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-white/50 border-t-white rounded-full animate-spin" /> Translating...
              </span>
            ) : (
              <><Play size={14} className="mr-2" fill="currentColor" /> Play</>
            )}
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={handlePause} className="px-6">
            <Pause size={14} className="mr-2" fill="currentColor" /> Pause
          </Button>
        )}
        
        {(isPlaying || isPaused) && (
          <Button variant="destructive" size="sm" onClick={handleStop} className="px-3">
            <Square size={14} fill="currentColor" />
          </Button>
        )}
      </div>
    </div>
  );
}
