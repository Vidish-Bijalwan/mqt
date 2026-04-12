import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

type TriggerSource = 'welcome_delay' | 'deep_intent' | 'exit_intent' | 'interaction' | 'page_transition' | 'package_page' | null;

interface SmartTriggerConfig {
  scrollDepthThreshold?: number;    // default: 40%
  timeThreshold?: number;           // default: 30s
  interactionThreshold?: number;    // default: 2
  packagePageDelay?: number;        // default: 10s (faster on package pages)
  cooldownHours?: number;           // default: 2 (down from 24)
}

export function useSmartTrigger(
  isModalOpen: boolean,
  hasCompleted: boolean,
  config: SmartTriggerConfig = {}
) {
  const {
    scrollDepthThreshold = 40,
    timeThreshold = 30,
    interactionThreshold = 2,
    packagePageDelay = 10,
    cooldownHours = 2,
  } = config;

  const location = useLocation();
  const [triggerSource, setTriggerSource] = useState<TriggerSource>(null);
  const [teaserVisible, setTeaserVisible] = useState(false);
  const triggeredRef = useRef(false);          // prevent double-fire
  const interactionCountRef = useRef(0);
  const pageCountRef = useRef(0);

  const checkCooldown = () => {
    // SESSION: if dismissed in this session, don't re-show
    if (sessionStorage.getItem('MQT_TEASER_DISMISSED') === 'true') return true;
    // COOLDOWN: cross-session cooldown (shorter = 2 hours)
    const cooldown = localStorage.getItem('MQT_PLANNER_COOLDOWN');
    if (cooldown && Date.now() < parseInt(cooldown, 10)) return true;
    return false;
  };

  const fireTrigger = (source: TriggerSource) => {
    if (triggeredRef.current || isModalOpen || hasCompleted || checkCooldown()) return;
    triggeredRef.current = true;
    setTriggerSource(source);
    setTeaserVisible(true);
  };

  // Track page transitions
  useEffect(() => {
    pageCountRef.current += 1;
    triggeredRef.current = false; // reset per page
    
    const isPackagePage = location.pathname.includes('/packages/') && location.pathname.split('/').length > 3;
    const isDestinationPage = location.pathname.includes('/destinations/') && location.pathname.split('/').length > 3;

    if (!isModalOpen && !hasCompleted && !checkCooldown()) {
      if ((isPackagePage || isDestinationPage) && pageCountRef.current > 0) {
        // Fire faster on high-intent pages
        const t = setTimeout(() => fireTrigger('package_page'), packagePageDelay * 1000);
        return () => clearTimeout(t);
      }
      if (pageCountRef.current >= 2) {
        // Visited 2+ pages → page_transition trigger
        const t = setTimeout(() => fireTrigger('page_transition'), 5000);
        return () => clearTimeout(t);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isModalOpen || hasCompleted) {
      setTeaserVisible(false);
      return;
    }
    if (checkCooldown()) return;

    // 1. TIME THRESHOLD
    const timeTimer = setTimeout(() => {
      fireTrigger('welcome_delay');
    }, timeThreshold * 1000);

    // 2. SCROLL DEPTH
    const handleScroll = () => {
      if (triggeredRef.current) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const depth = (scrolled / total) * 100;
      if (depth >= scrollDepthThreshold) {
        fireTrigger('deep_intent');
      }
    };

    // 3. EXIT INTENT
    const handleMouseLeave = (e: MouseEvent) => {
      if (triggeredRef.current) return;
      if (e.clientY < 5) {
        fireTrigger('exit_intent');
      }
    };

    // 4. INTERACTION COUNT
    const handleClick = () => {
      interactionCountRef.current += 1;
      if (interactionCountRef.current >= interactionThreshold && !triggeredRef.current) {
        fireTrigger('interaction');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('click', handleClick);

    return () => {
      clearTimeout(timeTimer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
    };
  }, [isModalOpen, hasCompleted, location.pathname]);

  const dismissTeaser = () => {
    setTeaserVisible(false);
    triggeredRef.current = false;
    // Session dismiss (won't show again THIS session)
    sessionStorage.setItem('MQT_TEASER_DISMISSED', 'true');
    // Cross-session cooldown
    localStorage.setItem(
      'MQT_PLANNER_COOLDOWN',
      (Date.now() + cooldownHours * 60 * 60 * 1000).toString()
    );
  };

  return { teaserVisible, triggerSource, dismissTeaser, setTeaserVisible };
}
