import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaign extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate?: Date;
  targetAudience: {
    industries?: string[];
    projectTypes?: string[];
    budgetRange?: {
      min: number;
      max: number;
    };
    location?: string[];
  };
  content: {
    type: 'post' | 'image' | 'video';
    title: string;
    description?: string;
    mediaUrl?: string;
    aiGenerated: boolean;
    scheduledDate?: Date;
    platforms: string[];
    status: 'draft' | 'scheduled' | 'published' | 'failed';
  }[];
  metrics: {
    impressions: number;
    clicks: number;
    leads: number;
    conversions: number;
  };
  landingPages: mongoose.Types.ObjectId[];
  leads: mongoose.Types.ObjectId[];
}

const campaignSchema = new Schema<ICampaign>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'paused', 'completed'],
      default: 'draft',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    targetAudience: {
      industries: [String],
      projectTypes: [String],
      budgetRange: {
        min: {
          type: Number,
          min: 0,
        },
        max: {
          type: Number,
          min: 0,
        },
      },
      location: [String],
    },
    content: [{
      type: {
        type: String,
        enum: ['post', 'image', 'video'],
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: String,
      mediaUrl: String,
      aiGenerated: {
        type: Boolean,
        default: false,
      },
      scheduledDate: Date,
      platforms: {
        type: [String],
        required: true,
      },
      status: {
        type: String,
        enum: ['draft', 'scheduled', 'published', 'failed'],
        default: 'draft',
      },
    }],
    metrics: {
      impressions: {
        type: Number,
        default: 0,
      },
      clicks: {
        type: Number,
        default: 0,
      },
      leads: {
        type: Number,
        default: 0,
      },
      conversions: {
        type: Number,
        default: 0,
      },
    },
    landingPages: [{
      type: Schema.Types.ObjectId,
      ref: 'LandingPage',
    }],
    leads: [{
      type: Schema.Types.ObjectId,
      ref: 'Lead',
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
campaignSchema.index({ owner: 1, status: 1 });
campaignSchema.index({ startDate: 1, endDate: 1 });

export const Campaign = mongoose.model<ICampaign>('Campaign', campaignSchema); 