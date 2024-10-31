const User = require('../models/users.js');
const URL = require('../models/url.js');
const bcrypt = require('bcrypt');
const { v4: uuid } = require("uuid");
const { setUser } = require("../service/auth.js");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, Email, and Password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    await User.create({ name, email, password: hashedPassword }); // Save hashed password
    return res.render("login", {error: ""}); // Redirect to login page after signup
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("login", { error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    const sessionid = uuid(); // Use uuid correctly as imported
    setUser(sessionid, email); // Store session information
    res.cookie("sessionid", sessionid, { httpOnly: true });
    if (user && await bcrypt.compare(password, user.password)) {
        const allurls = await URL.find({});
       
        return res.render("home", { urls: allurls });
    } else {
        return res.render("login", { error: "Invalid email or password" });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin
};
