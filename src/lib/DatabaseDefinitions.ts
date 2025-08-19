export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact_requests: {
        Row: {
          company_name: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          message_body: string | null
          phone: string | null
          updated_at: Date | null
        }
        Insert: {
          company_name?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          message_body?: string | null
          phone?: string | null
          updated_at?: Date | null
        }
        Update: {
          company_name?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          message_body?: string | null
          phone?: string | null
          updated_at?: Date | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          company_name: string | null
          website: string | null
          unsubscribed: boolean
          planId: string | null
          bio: string | null
          github_url: string | null
          linkedin_url: string | null
          twitter_url: string | null
          username: string | null
          portfolio_theme: string | null
          medium_url: string | null
          gumroad_url: string | null
          substack_url: string | null
          amazon_gear_list_url: string | null
          whatsapp_number: string | null
          youtube_url: string | null
          availability: string | null
          location: string | null
          is_featured: boolean
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: Date | null
          company_name?: string | null
          website?: string | null
          unsubscribed: boolean
          planId?: string | null
          bio?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          username?: string | null
          portfolio_theme?: string | null
          medium_url?: string | null
          gumroad_url?: string | null
          substack_url?: string | null
          amazon_gear_list_url?: string | null
          whatsapp_number?: string | null
          youtube_url?: string | null
          availability?: string | null
          location?: string | null
          is_featured?: boolean
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          company_name?: string | null
          website?: string | null
          unsubscribed: boolean
          planId?: string | null
          bio?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          username?: string | null
          portfolio_theme?: string | null
          medium_url?: string | null
          gumroad_url?: string | null
          substack_url?: string | null
          amazon_gear_list_url?: string | null
          whatsapp_number?: string | null
          youtube_url?: string | null
          availability?: string | null
          location?: string | null
          is_featured?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_customers: {
        Row: {
          stripe_customer_id: string
          updated_at: Date | null
          user_id: string
        }
        Insert: {
          stripe_customer_id: string
          updated_at?: Date | null
          user_id: string
        }
        Update: {
          stripe_customer_id?: string
          updated_at?: Date | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stripe_customers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          id: string
          user_id: string
          title: string
          url: string | null
          description: string | null
          screenshot_url: string | null
          status: "LIVE" | "IN PROGRESS" | "DEMO"
          created_at: Date
          updated_at: Date
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          url?: string | null
          description?: string | null
          screenshot_url?: string | null
          status?: "LIVE" | "IN PROGRESS" | "DEMO"
          created_at?: Date
          updated_at?: Date
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          url?: string | null
          description?: string | null
          screenshot_url?: string | null
          status?: "LIVE" | "IN PROGRESS" | "DEMO"
          created_at?: Date
          updated_at?: Date
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      technologies: {
        Row: {
          id: string
          name: string
          created_at: Date
          updated_at: Date
        }
        Insert: {
          id?: string
          name: string
          created_at?: Date
          updated_at?: Date
        }
        Update: {
          id?: string
          name?: string
          created_at?: Date
          updated_at?: Date
        }
        Relationships: []
      }
      project_technologies: {
        Row: {
          project_id: string
          technology_id: string
          collaborator_name: string | null
          collaborator_user_id: string | null
        }
        Insert: {
          project_id: string
          technology_id: string
          collaborator_name?: string | null
          collaborator_user_id?: string | null
        }
        Update: {
          project_id?: string
          technology_id?: string
          collaborator_name?: string | null
          collaborator_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_technologies_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_technologies_technology_id_fkey"
            columns: ["technology_id"]
            referencedRelation: "technologies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_technologies_collaborator_user_id_fkey"
            columns: ["collaborator_user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: string
          name: string
          created_at: Date
        }
        Insert: {
          id?: string
          name: string
          created_at?: Date
        }
        Update: {
          id?: string
          name?: string
          created_at?: Date
        }
        Relationships: []
      }
      profile_tags: {
        Row: {
          profile_id: string
          tag_id: string
        }
        Insert: {
          profile_id: string
          tag_id: string
        }
        Update: {
          profile_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_tags_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          id: string
          user_id: string
          client_name: string
          client_title: string | null
          client_company: string | null
          testimonial_text: string
          is_published: boolean
          created_at: Date
        }
        Insert: {
          id?: string
          user_id: string
          client_name: string
          client_title?: string | null
          client_company?: string | null
          testimonial_text: string
          is_published?: boolean
          created_at?: Date
        }
        Update: {
          id?: string
          user_id?: string
          client_name?: string
          client_title?: string | null
          client_company?: string | null
          testimonial_text?: string
          is_published?: boolean
          created_at?: Date
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_portals: {
        Row: {
          id: string
          user_id: string
          client_name: string
          client_email: string | null
          project_description: string | null
          access_token: string
          is_active: boolean
          created_at: Date
        }
        Insert: {
          id?: string
          user_id: string
          client_name: string
          client_email?: string | null
          project_description?: string | null
          access_token: string
          is_active?: boolean
          created_at?: Date
        }
        Update: {
          id?: string
          user_id?: string
          client_name?: string
          client_email?: string | null
          project_description?: string | null
          access_token?: string
          is_active?: boolean
          created_at?: Date
        }
        Relationships: [
          {
            foreignKeyName: "client_portals_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          id: string
          user_id: string
          visitor_name: string | null
          visitor_email: string
          message: string
          visitor_ip: string | null
          user_agent: string | null
          created_at: Date
        }
        Insert: {
          id?: string
          user_id: string
          visitor_name?: string | null
          visitor_email: string
          message: string
          visitor_ip?: string | null
          user_agent?: string | null
          created_at?: Date
        }
        Update: {
          id?: string
          user_id?: string
          visitor_name?: string | null
          visitor_email?: string
          message?: string
          visitor_ip?: string | null
          user_agent?: string | null
          created_at?: Date
        }
        Relationships: [
          {
            foreignKeyName: "contact_submissions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hackathons: {
        Row: {
          id: string
          name: string
          organizer: string | null
          website: string | null
          start_date: string | null
          end_date: string | null
          created_at: Date
        }
        Insert: {
          id?: string
          name: string
          organizer?: string | null
          website?: string | null
          start_date?: string | null
          end_date?: string | null
          created_at?: Date
        }
        Update: {
          id?: string
          name?: string
          organizer?: string | null
          website?: string | null
          start_date?: string | null
          end_date?: string | null
          created_at?: Date
        }
        Relationships: []
      }
      hackathon_certificates: {
        Row: {
          id: string
          user_id: string
          hackathon_id: string
          project_name: string | null
          project_description: string | null
          certificate_url: string | null
          award: string | null
          created_at: Date
        }
        Insert: {
          id?: string
          user_id: string
          hackathon_id: string
          project_name?: string | null
          project_description?: string | null
          certificate_url?: string | null
          award?: string | null
          created_at?: Date
        }
        Update: {
          id?: string
          user_id?: string
          hackathon_id?: string
          project_name?: string | null
          project_description?: string | null
          certificate_url?: string | null
          award?: string | null
          created_at?: Date
        }
        Relationships: [
          {
            foreignKeyName: "hackathon_certificates_hackathon_id_fkey"
            columns: ["hackathon_id"]
            referencedRelation: "hackathons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hackathon_certificates_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          category: string
          points: number
          requirement_type: string
          requirement_value: number | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon: string
          category: string
          points?: number
          requirement_type: string
          requirement_value?: number | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          category?: string
          points?: number
          requirement_type?: string
          requirement_value?: number | null
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
          progress: number
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
          progress?: number
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          earned_at?: string
          progress?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_scores: {
        Row: {
          id: string
          user_id: string
          total_score: number
          completion_percentage: number
          projects_score: number
          profile_score: number
          social_score: number
          engagement_score: number
          achievement_points: number
          last_calculated: string
        }
        Insert: {
          id?: string
          user_id: string
          total_score?: number
          completion_percentage?: number
          projects_score?: number
          profile_score?: number
          social_score?: number
          engagement_score?: number
          achievement_points?: number
          last_calculated?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_score?: number
          completion_percentage?: number
          projects_score?: number
          profile_score?: number
          social_score?: number
          engagement_score?: number
          achievement_points?: number
          last_calculated?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_scores_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_streaks: {
        Row: {
          id: string
          user_id: string
          streak_type: string
          current_streak: number
          longest_streak: number
          last_activity_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          streak_type: string
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          streak_type?: string
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_streaks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboard_entries: {
        Row: {
          id: string
          user_id: string
          period_type: string
          period_start: string
          period_end: string
          rank_position: number
          score: number
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          period_type: string
          period_start: string
          period_end: string
          rank_position: number
          score: number
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          period_type?: string
          period_start?: string
          period_end?: string
          rank_position?: number
          score?: number
          category?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_entries_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
