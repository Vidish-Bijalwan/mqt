import { supabase } from "@/lib/supabase";
import { craftsData } from "@/data/crafts";

export interface AdminCraft {
  id: string;
  craft_id: string;
  name: string;
  state: string;
  city: string;
  description: string;
  image: string;
  color_hex: string;
  created_at?: string;
  updated_at?: string;
}

export type AdminCraftInsert = Omit<AdminCraft, "id" | "created_at" | "updated_at">;

// --- Mock Storage Fallback ---
const MOCK_KEY = "mqt-mock-crafts";

function getMockCrafts(): AdminCraft[] {
  try {
    const cached = localStorage.getItem(MOCK_KEY);
    if (cached) return JSON.parse(cached);
  } catch {}
  
  // Initialize from static data
  const initial = craftsData.map(c => ({
    id: c.id, 
    craft_id: c.id,
    name: c.name,
    state: c.state,
    city: c.city || "",
    description: c.description,
    image: c.image,
    color_hex: c.colorHex || "#F59E0B",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));
  localStorage.setItem(MOCK_KEY, JSON.stringify(initial));
  return initial;
}

function saveMockCrafts(data: AdminCraft[]) {
  localStorage.setItem(MOCK_KEY, JSON.stringify(data));
}

// --- Services ---

export async function listAdminCrafts(options?: { search?: string }) {
  const { data, error } = await (supabase as any).from("crafts").select("*").order("created_at", { ascending: false });
  
  if (error || !data || data.length === 0) {
    let mockData = getMockCrafts();
    if (options?.search) {
      const s = options.search.toLowerCase();
      mockData = mockData.filter(c => c.name.toLowerCase().includes(s) || c.state.toLowerCase().includes(s));
    }
    return { data: mockData.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()) };
  }
  
  let result = data;
  if (options?.search) {
    const s = options.search.toLowerCase();
    result = result.filter(c => c.name.toLowerCase().includes(s) || c.state.toLowerCase().includes(s));
  }
  return { data: result };
}

export async function getAdminCraftById(id: string) {
  const { data, error } = await (supabase as any).from("crafts").select("*").eq("id", id).single();
  if (error) {
    const mock = getMockCrafts().find(c => c.id === id || c.craft_id === id);
    if (mock) return { data: mock };
    throw new Error(error.message);
  }
  return { data };
}

export async function createAdminCraft(payload: AdminCraftInsert) {
  const { data, error } = await (supabase as any).from("crafts").insert([payload]).select().single();
  if (error) {
    const mockData = getMockCrafts();
    const newCraft: AdminCraft = {
      ...payload,
      id: "mock-" + Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    saveMockCrafts([...mockData, newCraft]);
    return { data: newCraft };
  }
  return { data };
}

export async function updateAdminCraft(id: string, payload: Partial<AdminCraftInsert>) {
  const { data, error } = await (supabase as any).from("crafts").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", id).select().single();
  if (error) {
    const mockData = getMockCrafts();
    const index = mockData.findIndex(c => c.id === id || c.craft_id === id);
    if (index >= 0) {
      mockData[index] = { ...mockData[index], ...payload, updated_at: new Date().toISOString() };
      saveMockCrafts(mockData);
      return { data: mockData[index] };
    }
    throw new Error(error.message);
  }
  return { data };
}

export async function deleteAdminCraft(id: string) {
  const { error } = await (supabase as any).from("crafts").delete().eq("id", id);
  if (error) {
    const mockData = getMockCrafts();
    saveMockCrafts(mockData.filter(c => c.id !== id && c.craft_id !== id));
    return { success: true };
  }
  return { success: true };
}
