
const jwt = require('jsonwebtoken');

module.exports = getMiddleware = (req,res,next)=>{
    const token = req.headers['authorization'].split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decode)=>{
        if(err){
            return res.status(401).send({
                success:false,
                msg:'error while getting token'
            })
        }
        else{
            //   req.body.userId = decode.id
            next()
        }
    })
}