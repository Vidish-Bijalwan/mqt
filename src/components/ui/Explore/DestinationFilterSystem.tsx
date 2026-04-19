import React, { useMemo } from "react";
import { DestinationModel, Category, Season, BudgetTier } from "@/types/models";
import { cn } from "@/lib/utils";

interface FilterState {
  search: string;
  category: "All" | Category;
  season: "All" | Season;
  budget: "All" | BudgetTier;
}

interface DestinationFilterSystemProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalResults: number;
}

const CATEGORIES: ("All" | Category)[] = ["All", "Adventure", "Spiritual", "Heritage", "Nature", "Wildlife", "Hill Station", "Beach", "Desert", "Cityscape"];
const SEASONS: ("All" | Season)[] = ["All", "Spring", "Summer", "Monsoon", "Autumn", "Winter"];
const BUDGETS: ("All" | BudgetTier)[] = ["All", "Budget", "Mid-Range", "Luxury", "Premium"];

export const DestinationFilterSystem: React.FC<DestinationFilterSystemProps> = ({
  filters,
  setFilters,
  totalResults,
}) => {
  return (
    <div className="bg-surface border border-border/50 rounded-2xl p-6 mb-8 shadow-sm">
      <div className="flex flex-col gap-6">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search destinations by name or state..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="w-full bg-background border border-border rounded-xl px-5 py-3.5 pl-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-muted/30 px-2 py-1 rounded-md">
              {totalResults} Results
            </span>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Vibe / Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as "All" | Category }))}
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          {/* Season Filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Best Season</label>
            <select
              value={filters.season}
              onChange={(e) => setFilters(prev => ({ ...prev, season: e.target.value as "All" | Season }))}
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
            >
              {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Budget Filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Budget Tier</label>
            <select
              value={filters.budget}
              onChange={(e) => setFilters(prev => ({ ...prev, budget: e.target.value as "All" | BudgetTier }))}
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
            >
              {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
