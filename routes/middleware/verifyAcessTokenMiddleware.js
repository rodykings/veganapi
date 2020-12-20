const Users = require('../../models/user');
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) =>{
    try {
        if(!req.headers['auth']){
            return res.status(400).json({msg:"Acess token not informed!"})
        }
        
        const token = req.headers['auth'].split(' ')
        if(token[0]!=='Bearer')
        {
            return res.status(400).json({msg:"Acess token invalid format!"});
        }

        const user = await jwt.verify(token[1], 'TOP_SECRET')
        req.body.user = await Users.findOne({username:user.username})

        next()
    } catch (error) {
        return res.status(400).json({msg:"Acess token invalid!"});
    }
}