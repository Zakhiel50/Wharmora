import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.apiKey);
  }
  
async signIn(email: string, password: string): Promise<{ data: any, error: any }> {
  const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });

  if (data?.user) {
    sessionStorage.setItem('user', JSON.stringify(data.user));
  }

  return { data, error }; // toujours retourner le même format
}


  async signUp(email: string, password: string) {
    console.log('Tentative d’inscription...', email);
  
    const { data, error } = await this.supabase.auth.signUp({ email, password });

    if (error) {
      return console.log('error : ', error.message);
    }
  
    if (data && data.user !== null) {
      const { error: insertError } = await this.supabase
        .from('users')
        .insert([{ id: data.user.id, email: data.user.email }],); 
      alert('Votre inscription à  bien été pris en compte.')
      if (insertError) {
        console.error('Erreur insertion user:', insertError.message);
      }
    }
  
    console.log('Inscription réussie:', data);
    return data;
  }
  
  async getUserProfile() {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', (await this.supabase.auth.getUser()).data.user?.id);
    
    if (error) throw error;
    return data;
  }
  

  async isConnected() {
    const { data, error } = await this.supabase
      .from('users')
      .select('*, auth.users(email)')
      .eq('id', (await this.supabase.auth.getUser()).data.user?.id);
  
    if (error) throw error;

    if(data) {
      return true
    }
    return false;
  }
  
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  async getUser() {
    const { data } = await this.supabase.auth.getUser();
    return data.user;
  }
}

