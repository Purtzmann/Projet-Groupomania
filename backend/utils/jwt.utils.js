const jwt = require('jsonwebtoken')

const TOKEN_SECRET='0fds54545sdfsdfdf415678gty424hgfd4548tyh45f49d87gfdg46'

module.exports = {


   generateTokenForUser: function(userData) {
     return jwt.sign({
       userId: userData.id,
       isAdmin: userData.isAdmin
     },
     TOKEN_SECRET,
     {
       expiresIn: '1h'
     })
   },


   parseAuthorization: function(authorization) {
     return (authorization != null) ? authorization.replace('Bearer ', '') : null;
   },

   
   getUserId: function(authorization) {
     let userId = -1;
     let token = module.exports.parseAuthorization(authorization);
     if(token != null) {
       try {
         let jwtToken = jwt.verify(token, TOKEN_SECRET);
         if(jwtToken != null)
           userId = jwtToken.userId;
       } catch(err) { }
     }
     return userId;
   }
 }