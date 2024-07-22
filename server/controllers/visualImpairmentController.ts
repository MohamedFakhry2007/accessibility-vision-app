// server/controllers/visualImpairmentController.ts
import { Request, Response } from 'express';
import { VisualImpairment } from '../models/VisualImpairment';

export const getVisualImpairments = async (req: Request, res: Response) => {
  try {
    const impairments = await VisualImpairment.find();
    res.send(impairments);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addVisualImpairment = async (req: Request, res: Response) => {
  try {
    const impairment = new VisualImpairment(req.body);
    await impairment.save();
    res.status(201).send(impairment);
  } catch (error) {
    res.status(400).send(error);
  }
};
