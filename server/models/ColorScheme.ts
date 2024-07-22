// server/models/ColorScheme.ts
import mongoose from 'mongoose';

const colorSchemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  backgroundColor: { type: String, required: true },
  textColor: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contrastRatio: { type: Number, required: true },
});

export const ColorScheme = mongoose.model('ColorScheme', colorSchemeSchema);
