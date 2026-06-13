import type { DestinationData } from "@/types/models";
import {
  destinationContentOverrides,
  type DestinationAttraction,
  type DestinationContentOverride,
} from "@/data/destinationContentOverrides";
import { itineraries } from "@/data/itineraries";

export interface EnrichedDestinationContent {
  shortDescription: string;
  overviewParagraphs: string[];
  attractions: DestinationAttraction[];
  highlights: string[];
  travelTips: string[];
  howToReach: { byAir: string; byTrain: string; byRoad: string };
  seoTitle: string;
  seoDescription: string;
  relatedItineraries: typeof itineraries;
}

const TYPE_ATTRACTIONS: Record<string, DestinationAttraction[]> = {
  hill_station: [
    { name: "Viewpoints & ropeways", description: "Ridge walks and cable cars for Himalayan or Western Ghats panoramas.", duration: "Half day" },
    { name: "Colonial heritage quarter", description: "Churches, libraries, and bakeries from British-era hill towns.", duration: "2–3 hours" },
    { name: "Waterfalls & picnic spots", description: "Day trips to nearby falls — start early on weekends.", duration: "Half day" },
  ],
  beach: [
    { name: "Sunset beaches", description: "Shack dining and safe swimming zones (seasonal flags).", duration: "Half day" },
    { name: "Water sports", description: "Jet ski, parasailing where licensed operators operate.", duration: "2–3 hours" },
    { name: "Coastal forts & churches", description: "Portuguese or colonial landmarks near the shore.", duration: "Half day" },
  ],
  heritage: [
    { name: "UNESCO or ASI monuments", description: "Forts, stepwells, and temple complexes with guided context.", duration: "3–4 hours" },
    { name: "Old city bazaars", description: "Handicraft lanes — verify authenticity certificates for gems and textiles.", duration: "2 hours" },
    { name: "Museum & gallery circuit", description: "Regional history museums best visited before noon.", duration: "2 hours" },
  ],
  pilgrimage: [
    { name: "Main shrine darshan", description: "Peak hours early morning; check dress code and mobile rules.", duration: "2–3 hours" },
    { name: "Sacred river ghats", description: "Boat rides or aarti ceremonies at dusk.", duration: "1–2 hours" },
    { name: "Nearby temple circuit", description: "Combine satellite shrines with licensed local guides.", duration: "Full day" },
  ],
  wildlife: [
    { name: "Jeep safari zones", description: "Book forest department slots in advance for Corbett, Ranthambore, etc.", duration: "3 hours" },
    { name: "Birding trails", description: "Carry binoculars; dawn slots most productive.", duration: "2–3 hours" },
    { name: "Interpretation centres", description: "Visitor centres explain conservation before entering core zones.", duration: "1 hour" },
  ],
  adventure: [
    { name: "Trek or pass day hikes", description: "Registered guides mandatory in snow or border areas.", duration: "Full day" },
    { name: "River or valley activities", description: "Rafting, zipline, or camping per season and operator licence.", duration: "Half day" },
    { name: "High-altitude acclimatisation", description: "Rest day in base town before crossing passes above 3,000 m.", duration: "1 day" },
  ],
};

function templateForType(
  name: string,
  stateName: string,
  type: string,
  bestTime: string
): DestinationContentOverride {
  const attractions = TYPE_ATTRACTIONS[type] || TYPE_ATTRACTIONS.hill_station;
  return {
    shortDescription: `${name} in ${stateName} — curated sightseeing, local culture, and custom tour packages with My Quick Trippers.`,
    overviewParagraphs: [
      `${name} is a leading ${type.replace(/_/g, " ")} destination in ${stateName}. Travellers visit for scenery, regional cuisine, and experiences that fit long weekends or multi-state circuits.`,
      `The best window for most visitors is ${bestTime}. MQT builds itineraries with verified hotels, transport, and guides — avoiding generic filler and focusing on what you can actually book.`,
      `Explore packages below or request a tailor-made plan including nearby towns and festival dates.`,
    ],
    attractions: attractions.map((a) => ({
      ...a,
      name: a.name.replace("Viewpoints", `${name} viewpoints`),
    })),
    highlights: [
      `Signature ${name} sightseeing loop`,
      `Regional food and market stops`,
      `Flexible add-ons with MQT planners`,
      `Photography-friendly viewpoints`,
    ],
    travelTips: [
      `Confirm road conditions in monsoon for ${stateName} hill sectors`,
      "Book peak-season hotels 3–4 weeks ahead",
      "Carry valid ID for check-ins and forest permits where applicable",
    ],
    howToReach: {
      byAir: `Nearest airport serving ${name} — shared taxis or MQT transfers available on request.`,
      byTrain: `Major railhead in ${stateName} with taxi connections to ${name}.`,
      byRoad: `Well-connected by state highways; overnight buses from metro cities common.`,
    },
  };
}

function findRelatedItineraries(destinationName: string, stateName: string) {
  const needle = destinationName.toLowerCase();
  const stateToken = stateName.split(" ")[0].toLowerCase();
  return itineraries
    .filter(
      (it) =>
        it.placesCovered.some((p) => p.toLowerCase().includes(needle) || needle.includes(p.toLowerCase())) ||
        it.region.toLowerCase().includes(stateToken) ||
        it.packageName.toLowerCase().includes(needle) ||
        it.shortDescription.toLowerCase().includes(needle)
    )
    .slice(0, 6);
}

export function getEnrichedDestinationContent(
  destination: DestinationData,
  stateName: string
): EnrichedDestinationContent {
  const override = destinationContentOverrides[destination.slug];
  const base =
    override ||
    templateForType(destination.name, stateName, destination.type || "hill_station", destination.bestTimeToVisit);

  const activities = (destination.popularActivities || []).map((a) => ({
    name: a.name,
    description: `${a.name} — typical duration ${a.duration || "flexible"} in ${destination.name}.`,
    duration: a.duration,
  }));

  const attractions =
    base.attractions.length > 0
      ? [...base.attractions, ...activities.filter((a) => !base.attractions.some((b) => b.name === a.name))].slice(0, 8)
      : activities;

  const highlights = [
    ...new Set([
      ...base.highlights,
      ...(destination.travelTips || []).slice(0, 2),
    ]),
  ].slice(0, 8);

  const reach = base.howToReach || {
    byAir: destination.howToReach?.byAir || "See regional airport connections",
    byTrain: destination.howToReach?.byTrain || "See nearest railway station",
    byRoad: destination.howToReach?.byRoad || "Road access via state highways",
  };

  const seoTitle =
    base.seoTitle ||
    destination.seo?.title ||
    `${destination.name} Travel Guide 2026 | ${stateName} Tours | My Quick Trippers`;

  const seoDescription =
    base.seoDescription ||
    destination.seo?.description ||
    `Visit ${destination.name}, ${stateName}: ${base.shortDescription.slice(0, 120)} Book custom packages with MQT.`;

  return {
    shortDescription: base.shortDescription,
    overviewParagraphs: base.overviewParagraphs,
    attractions,
    highlights,
    travelTips: [...new Set([...base.travelTips, ...(destination.travelTips || [])])].slice(0, 8),
    howToReach: reach,
    seoTitle,
    seoDescription,
    relatedItineraries: findRelatedItineraries(destination.name, stateName),
  };
}
