// server/models/VisualImpairment.ts
import mongoose from 'mongoose';

const visualImpairmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  cssFilters: { type: String, required: true },
});

export const VisualImpairment = mongoose.model('VisualImpairment', visualImpairmentSchema);
