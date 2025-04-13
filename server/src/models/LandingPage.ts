import mongoose, { Document, Schema } from 'mongoose';

export interface ILandingPage extends Document {
  name: string;
  slug: string;
  owner: mongoose.Types.ObjectId;
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
    sections: {
      type: 'text' | 'image' | 'gallery' | 'testimonial' | 'contact' | 'portfolio';
      title?: string;
      content: any;
      style?: Record<string, any>;
    }[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  analytics: {
    views: number;
    uniqueVisitors: number;
    averageTimeOnPage: number;
    bounceRate: number;
    conversionRate: number;
  };
  leads: mongoose.Types.ObjectId[];
  campaigns: mongoose.Types.ObjectId[];
}

const landingPageSchema = new Schema<ILandingPage>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      required: true,
    },
    template: {
      type: String,
      required: true,
    },
    content: {
      hero: {
        title: {
          type: String,
          required: true,
        },
        subtitle: String,
        image: String,
        ctaText: String,
        ctaLink: String,
      },
      sections: [{
        type: {
          type: String,
          enum: ['text', 'image', 'gallery', 'testimonial', 'contact', 'portfolio'],
          required: true,
        },
        title: String,
        content: Schema.Types.Mixed,
        style: Schema.Types.Mixed,
      }],
    },
    seo: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      keywords: [String],
      ogImage: String,
    },
    analytics: {
      views: {
        type: Number,
        default: 0,
      },
      uniqueVisitors: {
        type: Number,
        default: 0,
      },
      averageTimeOnPage: {
        type: Number,
        default: 0,
      },
      bounceRate: {
        type: Number,
        default: 0,
      },
      conversionRate: {
        type: Number,
        default: 0,
      },
    },
    leads: [{
      type: Schema.Types.ObjectId,
      ref: 'Lead',
    }],
    campaigns: [{
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
landingPageSchema.index({ owner: 1, status: 1 });
landingPageSchema.index({ slug: 1 }, { unique: true });

export const LandingPage = mongoose.model<ILandingPage>('LandingPage', landingPageSchema); 