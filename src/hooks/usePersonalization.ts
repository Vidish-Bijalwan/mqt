import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PersonalizationData {
  lastDestination: string | null;
  lastState: string | null;
  suggestedStyle: string | null;
  interactionCount: number;
  sessionDepth: number; // pages visited in this session
  hasPartialPlannerData: boolean;
  partialStep: number;
}

const SESSION_KEY = 'MQT_SESSION';
const LAST_DEST_KEY = 'MQT_LAST_DEST';

function getSession(): Partial<PersonalizationData> {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveSession(data: Partial<PersonalizationData>) {
  try {
    const existing = getSession();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...existing, ...data }));
  } catch {}
}

export function usePersonalization(): PersonalizationData {
  const location = useLocation();
  const [data, setData] = useState<PersonalizationData>(() => {
    const session = getSession();
    const lastDest = localStorage.getItem(LAST_DEST_KEY);
    const plannerRaw = localStorage.getItem('MQT_PLANNER_DATA');
    let partialStep = 0;
    let hasPartialPlannerData = false;

    if (plannerRaw) {
      try {
        const parsed = JSON.parse(plannerRaw);
        // Determine step from data completeness
        if (parsed.intent_type) partialStep = 1;
        if (parsed.trip_style?.length) partialStep = 2;
        if (parsed.destination_interest || parsed.state_interest) partialStep = 3;
        if (parsed.travel_month) partialStep = 4;
        if (parsed.group_size?.adults > 1 || parsed.group_size?.children > 0) partialStep = 5;
        hasPartialPlannerData = partialStep > 0;
      } catch {}
    }

    return {
      lastDestination: lastDest ? JSON.parse(lastDest)?.name || null : null,
      lastState: lastDest ? JSON.parse(lastDest)?.state || null : null,
      suggestedStyle: session.suggestedStyle || null,
      interactionCount: session.interactionCount || 0,
      sessionDepth: session.sessionDepth || 0,
      hasPartialPlannerData,
      partialStep,
    };
  });

  // Track page depth per session
  useEffect(() => {
    const session = getSession();
    const newDepth = (session.sessionDepth || 0) + 1;
    saveSession({ sessionDepth: newDepth });
    setData(prev => ({ ...prev, sessionDepth: newDepth }));

    // Extract destination from URL and persist
    const destMatch = location.pathname.match(/\/destinations\/[^/]+\/([^/]+)/);
    const stateMatch = location.pathname.match(/\/destinations\/([^/]+)/);
    const pkgMatch = location.pathname.match(/\/packages\/[^/]+\/([^/]+)/);

    if (destMatch || pkgMatch) {
      const slug = destMatch?.[1] || pkgMatch?.[1] || '';
      const stateSlug = stateMatch?.[1] || '';
      // Format slug to human name
      const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      const state = stateSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      localStorage.setItem(LAST_DEST_KEY, JSON.stringify({ name, state, slug, visitedAt: Date.now() }));
      setData(prev => ({ ...prev, lastDestination: name, lastState: state }));
    }
  }, [location.pathname]);

  // Track interaction count
  useEffect(() => {
    const incrementInteraction = () => {
      const session = getSession();
      const newCount = (session.interactionCount || 0) + 1;
      saveSession({ interactionCount: newCount });
      setData(prev => ({ ...prev, interactionCount: newCount }));
    };

    // Count meaningful interactions: link clicks, button clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest('a, button');
      // Exclude close/dismiss buttons
      const isDismiss = target.closest('[data-dismiss]');
      if (isLink && !isDismiss) {
        incrementInteraction();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return data;
}

/** Helper: get personalized teaser headline */
export function getPersonalizedHeadline(personalization: PersonalizationData): { title: string; subtitle: string } {
  const { lastDestination, hasPartialPlannerData, partialStep, interactionCount } = personalization;

  if (hasPartialPlannerData && partialStep >= 2) {
    return {
      title: 'Continue Planning',
      subtitle: `Pick up where you left off — your trip is ${Math.round((partialStep / 8) * 100)}% planned!`,
    };
  }

  if (lastDestination) {
    return {
      title: `Planning a ${lastDestination} trip?`,
      subtitle: 'Get a free personalized itinerary in under 60 seconds.',
    };
  }

  if (interactionCount >= 3) {
    return {
      title: 'Ready to plan your trip?',
      subtitle: "You've been exploring — let's build your perfect itinerary.",
    };
  }

  return {
    title: 'Need help planning?',
    subtitle: 'Get personalized trip recommendations in under 60 seconds.',
  };
}
