import type { FaqItem } from "@/lib/seo";

export interface DestinationGuideContent {
  recommendedDays: string;
  bestTimeSummary: string;
  semanticEntities: string[];
  faqs: FaqItem[];
}

const PILLAR_GUIDES: Record<string, Omit<DestinationGuideContent, "faqs"> & { faqs: FaqItem[] }> = {
  kashmir: {
    recommendedDays: "5–7 days for Srinagar, Gulmarg & Pahalgam; add 3–4 days for Great Lakes treks.",
    bestTimeSummary: "March–June (tulip bloom), Oct–Nov (autumn), Dec–Feb (Gulmarg snow).",
    semanticEntities: [
      "Dal Lake",
      "Shikara",
      "Gulmarg",
      "Pahalgam",
      "Sonamarg",
      "Srinagar",
      "Betaab Valley",
      "Wazwan",
    ],
    faqs: [
      {
        question: "Is Kashmir safe to visit in 2026?",
        answer:
          "Yes — Srinagar, Gulmarg, and Pahalgam remain well-connected tourist zones with strong on-ground support. MQT includes safety briefings and verified local partners on every Kashmir package.",
      },
      {
        question: "What is the best time to visit Kashmir?",
        answer:
          "March to June offers pleasant weather and the tulip bloom. October to November brings golden autumn colours. December to February is peak snow season in Gulmarg.",
      },
      {
        question: "How many days are enough for Kashmir?",
        answer:
          "Five to seven days comfortably covers Srinagar, Gulmarg, and Pahalgam. Add three to four extra days for the Kashmir Great Lakes trek.",
      },
    ],
  },
  kerala: {
    recommendedDays: "5–7 days for backwaters + Munnar; 8–10 days with Ayurveda wellness.",
    bestTimeSummary: "October–March ideal; monsoon (Jun–Sep) for lush greenery & Ayurveda.",
    semanticEntities: [
      "Alleppey",
      "Munnar",
      "Houseboat",
      "Ayurveda",
      "Backwaters",
      "Kochi",
      "Thekkady",
      "Kovalam",
    ],
    faqs: [
      {
        question: "How many days are enough for a Kerala trip?",
        answer:
          "Five to seven days covers Kochi, Munnar, and Alleppey houseboats. Add two to three days for Ayurveda retreats or Kovalam beaches.",
      },
      {
        question: "What is included in a Kerala backwaters package?",
        answer:
          "Typical MQT Kerala packages include houseboat stays, AC transport, curated sightseeing, and breakfast. Premium options add private chef meals and boutique resorts.",
      },
      {
        question: "What is the best time to visit Kerala?",
        answer:
          "October to March offers dry, pleasant weather. Monsoon months suit Ayurveda and lush landscape photography with fewer crowds.",
      },
    ],
  },
  rajasthan: {
    recommendedDays: "7–9 days for Jaipur, Udaipur & Jodhpur; 10–12 with Jaisalmer desert.",
    bestTimeSummary: "October–March (pleasant); avoid peak summer heat May–June.",
    semanticEntities: [
      "Jaipur Pink City",
      "Udaipur",
      "Jodhpur Blue City",
      "Jaisalmer",
      "Ranthambore",
      "Camel safari",
      "Heritage hotels",
    ],
    faqs: [
      {
        question: "What is included in a Rajasthan heritage tour package?",
        answer:
          "MQT Rajasthan circuits include heritage hotels, private transfers, fort and palace entries, and optional camel safaris. Guides share Marwari culture and local cuisine highlights.",
      },
      {
        question: "How many days for a Rajasthan heritage tour?",
        answer:
          "Seven nights and eight days covers Jaipur, Jodhpur, and Udaipur. Add two to three days for Jaisalmer desert camps or Ranthambore tiger safaris.",
      },
      {
        question: "Is Rajasthan good to visit in monsoon?",
        answer:
          "Monsoon brings fewer crowds and greener landscapes in Udaipur and Mount Abu, but some desert activities pause. Winter (Oct–Mar) is best for first-time visitors.",
      },
    ],
  },
  ladakh: {
    recommendedDays: "7–8 days for Leh, Nubra & Pangong; 10+ for Tso Moriri or festivals.",
    bestTimeSummary: "June–September (roads open); winter for Chadar & snow experiences.",
    semanticEntities: [
      "Pangong Tso",
      "Nubra Valley",
      "Leh",
      "Khardung La",
      "Monasteries",
      "Thiksey",
      "Hemis Festival",
    ],
    faqs: [
      {
        question: "What are the must-visit places in Ladakh?",
        answer:
          "Leh town, Pangong Lake, Nubra Valley sand dunes, and monasteries like Thiksey and Hemis top most itineraries. MQT adjusts routes for altitude acclimatisation.",
      },
      {
        question: "How many days are enough for Ladakh?",
        answer:
          "Seven to eight days covers Leh, Nubra, and Pangong with buffer for acclimatisation. Bike expeditions or festival trips need ten or more days.",
      },
      {
        question: "What should I pack for a Himalayan trek in Ladakh?",
        answer:
          "Layered clothing, UV sunglasses, lip balm, sturdy boots, and altitude meds after consulting your doctor. MQT shares a detailed pre-trip packing checklist.",
      },
    ],
  },
  goa: {
    recommendedDays: "4–5 days for beaches; 6–7 with South Goa heritage & spice farms.",
    bestTimeSummary: "November–February peak; monsoon for green landscapes & deals.",
    semanticEntities: [
      "North Goa beaches",
      "South Goa",
      "Portuguese heritage",
      "Watersports",
      "Spice plantation",
    ],
    faqs: [
      {
        question: "What is the best time for a Goa family trip?",
        answer:
          "November to February offers sunny weather and calm seas—ideal for families. Shoulder months (October, March) bring fewer crowds and better hotel rates.",
      },
      {
        question: "Which is better for honeymoon — Andaman or Goa?",
        answer:
          "Goa suits nightlife, Portuguese charm, and easy access. Andaman offers secluded beaches and diving—better for privacy. MQT can compare both based on your budget.",
      },
    ],
  },
};

function matchPillarKey(name: string, stateName: string): string | null {
  const hay = `${name} ${stateName}`.toLowerCase();
  if (hay.includes("kashmir") || hay.includes("jammu")) return "kashmir";
  if (hay.includes("kerala")) return "kerala";
  if (hay.includes("rajasthan")) return "rajasthan";
  if (hay.includes("ladakh") || hay.includes("leh")) return "ladakh";
  if (hay.includes("goa")) return "goa";
  return null;
}

export function getDestinationGuideContent(
  destinationName: string,
  stateName: string,
  bestTimeToVisit?: string
): DestinationGuideContent {
  const pillarKey = matchPillarKey(destinationName, stateName);
  const pillar = pillarKey ? PILLAR_GUIDES[pillarKey] : null;

  const bestTimeSummary =
    bestTimeToVisit ||
    pillar?.bestTimeSummary ||
    "October to March is pleasant across most of India; hill stations differ by altitude.";

  const recommendedDays =
    pillar?.recommendedDays ||
    "3–5 days for a focused visit; 7+ days to combine multiple highlights in the region.";

  const genericFaqs: FaqItem[] = [
    {
      question: `What is the best time to visit ${destinationName}?`,
      answer: `${bestTimeSummary} MQT tailors dates to your preferred weather, festivals, and crowd levels.`,
    },
    {
      question: `How many days are enough for ${destinationName}?`,
      answer: recommendedDays,
    },
    {
      question: `How do I book a tour to ${destinationName}?`,
      answer: `Browse MQT packages for ${stateName} or request a custom itinerary. Our Meerut team shares a free quote within hours with verified hotels and transfers.`,
    },
    {
      question: `What should I see in ${destinationName}, ${stateName}?`,
      answer: `Top sights, local culture, and seasonal activities vary by month. MQT maps your route with licensed guides and handpicked stays for a seamless ${stateName} experience.`,
    },
  ];

  return {
    recommendedDays,
    bestTimeSummary,
    semanticEntities:
      pillar?.semanticEntities ||
      [destinationName, stateName, "India tourism", "custom tour packages"],
    faqs: pillar ? [...pillar.faqs, ...genericFaqs.slice(2)] : genericFaqs,
  };
}

export function getStateGuideContent(
  stateName: string,
  bestTimePrimary?: string
): DestinationGuideContent {
  return getDestinationGuideContent(stateName, stateName, bestTimePrimary);
}
