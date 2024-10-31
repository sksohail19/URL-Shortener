const shortid = require("shortid");
const URL = require("../models/url.js");

async function handleGenerateShortURL(req, res) {
    const body = req.body;
    console.log(body);
    if (!body.url) return res.status(400).json({ error: "URL is required" });

    const shortId = shortid.generate();
    try {
        await URL.create({
            shortId,
            redirectURL: body.url,
            visitHistory: [],
            createdBy: req.user._id,
        });
        
        const allurls = await URL.find({}); // Fetch all URLs again after adding the new one
        return res.render("home", {
            id: shortId,
            urls: allurls  // Pass all URLs to the template
        });
    } catch (err) {
        console.error("Error creating URL:", err);
        return res.status(500).json({ error: "Failed to create short URL" });
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortid;
    const result = await URL.findOne({ shortId });
    return res.json({ "totalClicks": result.visitHistory.length, "analytics": result.visitHistory });
}

module.exports = {
    handleGenerateShortURL,
    handleGetAnalytics
};
