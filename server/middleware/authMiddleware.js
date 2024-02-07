import jwt from 'jsonwebtoken';

export default (req, res, next) => {

    try {
        const token = req.headers['authorization'].split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {

            if (err) {
                res.status(401).json({
                    message: "Auth failed!",
                    success: false
                });
            } else {
                req.body.userId = decode.id;
                console.log(req.body.userId);
                next();
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", success: false, error });
    }
};