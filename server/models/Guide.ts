// server/models/Guide.ts
import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  ratings: [{ user: mongoose.Schema.Types.ObjectId, score: Number }],
  avgRating: { type: Number, default: 0 },
});

guideSchema.index({ title: 'text', content: 'text' });

export const Guide = mongoose.model('Guide', guideSchema);
