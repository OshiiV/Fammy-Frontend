const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const tokens = req.headers['authorization'].split(" ")[1];
        jwt.verify(tokens, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Auth faileds",
                    success: false
                });
            } else {
                req.body.employeeId = decoded.empid; // Assuming the employee ID is stored in the token as 'empid'
                next();
            }
        });
    } catch (error) {
        return res.status(401).send({
            message: "Auth failed",
            success: false
        });
    }
};
