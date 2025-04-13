import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string[];
  budget?: number;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  source: string;
  notes?: string;
  owner: mongoose.Types.ObjectId;
  landingPage?: mongoose.Types.ObjectId;
  campaign?: mongoose.Types.ObjectId;
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    projectType: [{
      type: String,
      required: true,
    }],
    budget: {
      type: Number,
      min: 0,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'],
      default: 'new',
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    landingPage: {
      type: Schema.Types.ObjectId,
      ref: 'LandingPage',
    },
    campaign: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
leadSchema.index({ owner: 1, status: 1 });
leadSchema.index({ email: 1 }, { unique: true });

export const Lead = mongoose.model<ILead>('Lead', leadSchema); 