// server/controllers/guideController.ts
import { Request, Response } from 'express';
import { Guide } from '../models/Guide';

export const createGuide = async (req: Request, res: Response) => {
  try {
    const guide = new Guide({
      ...req.body,
      author: req.user._id
    });
    await guide.save();
    res.status(201).send(guide);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getGuides = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category) {
      query = { ...query, category };
    }
    if (search) {
      query = { ...query, $text: { $search: search as string } };
    }
    const guides = await Guide.find(query).populate('author', 'username');
    res.send(guides);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getGuideById = async (req: Request, res: Response) => {
  try {
    const guide = await Guide.findById(req.params.id).populate('author', 'username');
    if (!guide) {
      return res.status(404).send();
    }
    res.send(guide);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const rateGuide = async (req: Request, res: Response) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).send();
    }
    const rating = { user: req.user._id, score: req.body.score };
    const ratingIndex = guide.ratings.findIndex(r => r.user.toString() === req.user._id.toString());
    if (ratingIndex > -1) {
      guide.ratings[ratingIndex] = rating;
    } else {
      guide.ratings.push(rating);
    }
    guide.avgRating = guide.ratings.reduce((acc, curr) => acc + curr.score, 0) / guide.ratings.length;
    await guide.save();
    res.send(guide);
  } catch (error) {
    res.status(400).send(error);
  }
};
