import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
@Injectable({ providedIn: 'root' })
export class TeamService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient('https://YOUR_SUPABASE_URL','YOUR_SUPABASE_ANON_KEY');
  }
  async listTeams(userId: string) {
    const { data, error } = await this.supabase.from('teams').select('*').eq('owner', userId);
    if (error) throw error;
    return data;
  }
  async createTeam({ name, owner }: { name: string, owner: string }) {
    const { data, error } = await this.supabase.from('teams').insert([{ name, owner }]).select();
    if (error) throw error;
    return data[0];
  }
}

