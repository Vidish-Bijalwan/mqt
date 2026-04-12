import { useEffect, useState } from 'react';

type TriggerSource = 'welcome_delay' | 'deep_intent' | 'exit_intent' | 'manual' | null;

export function useSmartTrigger(
  isModalOpen: boolean,
  hasCompleted: boolean,
  delaySeconds: number = 20
) {
  const [triggerSource, setTriggerSource] = useState<TriggerSource>(null);
  const [teaserVisible, setTeaserVisible] = useState(false);

  useEffect(() => {
    // If planner is open or completed, skip all auto triggers
    if (isModalOpen || hasCompleted) {
      setTeaserVisible(false);
      return;
    }

    const checkCooldown = () => {
      const cooldown = localStorage.getItem('MQT_PLANNER_COOLDOWN');
      if (cooldown) {
        const cooldownUntil = parseInt(cooldown, 10);
        if (Date.now() < cooldownUntil) return true;
      }
      return false;
    };

    if (checkCooldown()) return;

    let delayTimer: NodeJS.Timeout;
    
    // 1. Welcome Delay
    delayTimer = setTimeout(() => {
      if (!checkCooldown() && !isModalOpen && !hasCompleted) {
        setTriggerSource('welcome_delay');
        setTeaserVisible(true);
      }
    }, delaySeconds * 1000);

    // 2. Deep Intent (Scroll Depth)
    const handleScroll = () => {
      if (triggerSource) return; // Already triggered
      const scrollDepth = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollDepth > 70 && !checkCooldown()) {
        setTriggerSource('deep_intent');
        setTeaserVisible(true);
      }
    };

    // 3. Exit Intent (Mouse leaves top of screen)
    const handleMouseLeave = (e: MouseEvent) => {
      if (triggerSource) return; // Already triggered
      if (e.clientY < 0 && !checkCooldown()) {
        setTriggerSource('exit_intent');
        setTeaserVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(delayTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isModalOpen, hasCompleted, delaySeconds, triggerSource]);

  const dismissTeaser = () => {
    setTeaserVisible(false);
    // Cooldown for 24 hours
    localStorage.setItem('MQT_PLANNER_COOLDOWN', (Date.now() + 24 * 60 * 60 * 1000).toString());
  };

  return { teaserVisible, triggerSource, dismissTeaser, setTeaserVisible };
}
