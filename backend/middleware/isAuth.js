import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        return next(error);
    }

    const token = authHeader.split(" ")[1];

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        if (!tokenDecoded.id) {
            const error = new Error("invalid or expired token");
            error.statusCode = 401;
            throw error;
        }

        req.userId = tokenDecoded.id;
        next();
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

export default isAuth;
