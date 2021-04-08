
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

module.exports = function(req, res, next) {
    var token = req.headers['x-access-token'];

    console.log("t", token);
    if(!token) {
        console.log("No token found");
        return res.status(400).json({auth:false,token:'No Token Found'})
    }

    jwt.verify(token,secret, (err,data) => {
        if(err) {
            console.log("Invalid token");
            return res.status(500).json({auth:false,token:'Invalid Token', erroris:err});
        }
        console.log("Data id is", data.id ) ;
        req.data = data;
        next();        
        
    })

}