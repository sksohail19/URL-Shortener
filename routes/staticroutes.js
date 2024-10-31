const express = require("express");
const router = express.Router();

const URL = require("../models/url.js");

router.get("/", async(req, res) =>{
    if(!req.user) return res.redirect("/login", {error: ""});
    const allurls = await URL.find({createdBy: req.user._id});
    return res.render("home", {
        urls: allurls,
    });
});

router.get("/signup", async(req, res) =>{
    return res.render("signup");
});

router.get("/login", async(req, res) =>{
    return res.render("login");
});

module.exports = router;