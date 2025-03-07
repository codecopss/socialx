const express = require("express");
const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rssUrl = "https://techcrunch.com/feed/"; // Replace with any RSS feed URL
    const response = await axios.get(rssUrl);

    const parser = new XMLParser();
    const jsonData = parser.parse(response.data);

    const items = jsonData.rss.channel.item.map((item) => ({
      title: item.title,
      link: item.link,
      description: item.description,
    }));

    res.json(items);
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    res.status(500).json({ error: "Failed to fetch RSS feed" });
  }
});

module.exports = router;
