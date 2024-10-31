const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser"); // Require cookie-parser directly
const { restrictToLoggedInUser, checkAuth } = require("./middlewares/auth.js");

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

const URL = require("./models/url.js");
const { connectToMongoDB } = require("./contect.js"); 
const bodyParser = require('body-parser');
const port = 8000;
const urlRoute = require("./routes/url.js");
const staticRoutes = require("./routes/staticroutes.js");
const userRoutes = require("./routes/users.js");

connectToMongoDB("mongodb://localhost:27017/urlshortner")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Correct usage of cookie-parser middleware

app.use("/url", restrictToLoggedInUser, urlRoute);
app.use("/", checkAuth, staticRoutes);
app.use("/users", userRoutes);

app.get("/:shortid", async (req, res) => {
    try {
        const shortId = req.params.shortid;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true }
        );

        if (!entry) return res.status(404).json({ error: "URL not found" });

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error handling redirect:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => console.log("Server started on port", port));
