const jwt = require('jsonwebtoken');

module.exports.requireAuth = async (req, res, next ) => {
    const {token } = req.headers;

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded)=>{
            if(error){
                return res.status(401).send({msg: 'invalid token'});
            }
                req.user = decoded;
                return next();
        });
    } catch (err) {
        return res.status(401).send({error: err});
    }
}