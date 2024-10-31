const { getUser } = require('../service/auth.js');

async function restrictToLoggedInUser(req, res, next) {
    const sessionid = req.cookies?.sessionid;

    if (!sessionid) {
        return res.redirect('/login'); // Removed { error: "" } from redirect
    }

    try {
        const user = await getUser(sessionid);

        if (!user) {
            return res.redirect('/login'); // Redirect if no user is found
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in restrictToLoggedInUser middleware:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function checkAuth(req, res, next) {
    const sessionid = req.cookies?.sessionid;
    try {
        const user = await getUser(sessionid); 
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in restrictToLoggedInUser middleware:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    restrictToLoggedInUser, 
    checkAuth,
};
