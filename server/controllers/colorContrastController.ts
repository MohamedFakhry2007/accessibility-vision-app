// server/controllers/colorContrastController.ts
import { Request, Response } from 'express';
import { ColorScheme } from '../models/ColorScheme';
import { calculateContrastRatio } from '../utils/colorUtils';

export const saveColorScheme = async (req: Request, res: Response) => {
  try {
    const { name, backgroundColor, textColor } = req.body;
    const contrastRatio = calculateContrastRatio(backgroundColor, textColor);
    const colorScheme = new ColorScheme({
      name,
      backgroundColor,
      textColor,
      user: req.user._id,
      contrastRatio,
    });
    await colorScheme.save();
    res.status(201).send(colorScheme);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getUserColorSchemes = async (req: Request, res: Response) => {
  try {
    const colorSchemes = await ColorScheme.find({ user: req.user._id });
    res.send(colorSchemes);
  } catch (error) {
    res.status(500).send(error);
  }
};
