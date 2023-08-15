import { NextApiRequest, NextApiResponse } from "next";

interface VideoInfo {
  title: string;
  description: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const apiKey = process.env.GOOGLE_API_KEY;
    // Extract video ID from the URL
    const videoId = (id as string).split("v=")[1];

    // Make API request to get video information
    const baseURL = "https://www.googleapis.com/youtube/v3/videos";
    const params = {
      part: "snippet",
      id: videoId,
      key: apiKey,
    };

    const queryString = new URLSearchParams(params).toString();
    const url = `${baseURL}?${queryString}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const videoInfo = data.items[0].snippet;
      const title = videoInfo.title;
      const description = videoInfo.description;
      return res.status(200).json({ title, description, id: videoId })
    } else {
      return res.status(401).json({ message: "Error fetching video information" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Error fetching video information" });
  }
}
