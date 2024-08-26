const jwt = require("jsonwebtoken");

const { TOKEN_KEY } = process.env;

exports.verifyToken = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);

    //check for provided token
    if (!token) {
        return res.status(403).send("An authentication token is required");

    }

    //verify token
    try {
        const decodedToken = await jwt.verify(token, TOKEN_KEY);
        req.currentUser = decodedToken;
    } catch (error) {
        console.log(error);
        return res.status(401).send("Unauthorized Access");
    }
    return next();

}