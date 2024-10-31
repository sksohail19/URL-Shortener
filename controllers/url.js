const shortid = require("shortid");
const URL = require("../models/url.js");



async function handleGenerateShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "URL is required" });

    const shortId = shortid.generate();  // Generate unique short ID

    try {
        await URL.create({
            shortId,
            redirectURL: body.url,
            visitHistory: []  // Corrected property name
        });
        return res.render("home",{
            id: shortId,
        });
       // return res.status(201).json({ message: "Short URL created successfully", id: shortId });
    } catch (err) {
        console.error("Error creating URL:", err);
        return res.status(500).json({ error: "Failed to create short URL" });
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortid;
    const result = await URL.findOne({shortId});
    return res.json({"totalClicks" :result.visitHistory.length, "analytics": result.visitHistory});
}

module.exports = {
   // handleGetURL,
    handleGenerateShortURL,
    handleGetAnalytics
}
