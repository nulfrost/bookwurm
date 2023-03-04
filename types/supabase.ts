export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clubs: {
        Row: {
          club_description: string | null
          club_name: string
          created_at: string | null
          id: string
        }
        Insert: {
          club_description?: string | null
          club_name: string
          created_at?: string | null
          id?: string
        }
        Update: {
          club_description?: string | null
          club_name?: string
          created_at?: string | null
          id?: string
        }
      }
      clubs_tags: {
        Row: {
          club_id: string | null
          id: number
          tag_id: number | null
        }
        Insert: {
          club_id?: string | null
          id?: number
          tag_id?: number | null
        }
        Update: {
          club_id?: string | null
          id?: number
          tag_id?: number | null
        }
      }
      tags: {
        Row: {
          id: number
          tag_name: string | null
        }
        Insert: {
          id?: number
          tag_name?: string | null
        }
        Update: {
          id?: number
          tag_name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
