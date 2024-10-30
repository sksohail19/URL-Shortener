const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

const URL = require("./models/url.js");  // Corrected variable name
const { connectToMongoDB } = require("./contect.js");  // Corrected file name
const port = 8000;
const urlRoute = require("./routes/url.js");
const staticRoutes = require("./routes/staticroutes.js");

connectToMongoDB("mongodb://localhost:27017/urlshortner")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(express.urlencoded({extended:false}));  // Middleware to parse JSON request bodies
app.use("/url", urlRoute);
app.use("/", staticRoutes);

app.get("/:shortid", async (req, res) => {
    try {
        const shortId = req.params.shortid;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    }
                }
            },
            { new: true }  // Ensures we get the updated document
        );

        if (!entry) return res.status(404).json({ error: "URL not found" });

        res.redirect(entry.redirectURL);  // Check that 'redirectURL' matches the schema
    } catch (error) {
        console.error("Error handling redirect:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => console.log("Server started on port", port));
