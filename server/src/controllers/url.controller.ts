import { Request, Response } from "express";
import generateShortCode from "../utils/generateShortCode";
import Url from "../models/url.model";
import { createUrlSchema } from "../utils/validation";


export const createShortUrl = async (req: Request, res: Response) => {

  const result = createUrlSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.issues[0]?.message || "Invalid URL"
    })
  }

  const { originalUrl } = result.data

  const shortCode = generateShortCode()

  const url = await Url.create({ originalUrl, shortCode, user: req.user!._id })

  res.status(201).json({
    success: true,
    data: url
  })
}

export const redirectToOriginalUrl = async (req: Request, res: Response) => {

  const { shortCode } = req.params

  const url = await Url.findOneAndUpdate({ shortCode }, { $inc: { clicks: 1 } }, { returnDocument: 'after' })

  if (!url) {
    return res.status(404).json({
      success: false,
      message: "Short URL not found"
    })
  }

  res.redirect(url.originalUrl);
}

export const getUrls = async (req: Request, res: Response) => {

  const urls = await Url.find({ user: req.user!._id, }).sort({ createdAt: -1 }).lean()

  res.json({
    success: true,
    data: urls,
  })
}

export const deleteUrl = async (req: Request, res: Response) => {

  const { id } = req.params

  const url = await Url.findByIdAndDelete({
    _id: id,
    user: req.user!._id,
  })

  if (!url) {
    return res.status(404).json({
      success: false,
      message: "URL not found",
    });
  }

  res.json({
    success: true,
    message: "URL deleted successfully",
  });
}

