export interface User {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  specialization: string[];
  portfolio: Portfolio[];
  socialLinks: SocialLink[];
}

export interface Portfolio {
  title: string;
  description: string;
  link: string;
  image?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string[];
  budget?: number;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  source: string;
  notes?: string;
}

export interface Campaign {
  _id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate?: string;
  targetAudience: {
    industries?: string[];
    projectTypes?: string[];
    budgetRange?: {
      min: number;
      max: number;
    };
    location?: string[];
  };
  content: CampaignContent[];
  metrics: CampaignMetrics;
}

export interface CampaignContent {
  type: 'post' | 'image' | 'video';
  title: string;
  description?: string;
  mediaUrl?: string;
  aiGenerated: boolean;
  scheduledDate?: string;
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
}

export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  leads: number;
  conversions: number;
}

export interface LandingPage {
  _id: string;
  name: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  template: string;
  content: {
    hero: {
      title: string;
      subtitle?: string;
      image?: string;
      ctaText?: string;
      ctaLink?: string;
    };
    sections: LandingPageSection[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  analytics: LandingPageAnalytics;
}

export interface LandingPageSection {
  type: 'text' | 'image' | 'gallery' | 'testimonial' | 'contact' | 'portfolio';
  title?: string;
  content: any;
  style?: Record<string, any>;
}

export interface LandingPageAnalytics {
  views: number;
  uniqueVisitors: number;
  averageTimeOnPage: number;
  bounceRate: number;
  conversionRate: number;
} 