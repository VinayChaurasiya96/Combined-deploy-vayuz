// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "USERSAPI";

// /**
//  * @desc 
//  * @param {*} req 
//  * @param {*} res 
//  * @param {*} next 
//  */

// const userSignupMiddleware =  (req,res,next)=>{
//     let token = req.headers[postman-token]
   
//    try{
//         if(token){

//             token = token.split(" ")[1];
//             let user= jwt.verify(token,SECRET_KEY )
//             req.userId = user.id;
//             res.status(201).json("User authorized")
//         }
//         else{
//             res.status(401).json({message:"Unathorized user"});
            
//         }

//         next();
//    }
//    catch(err){
//         console.log(err);
//         res.status(401).json({message:"Unathorized user"});
//    }
    
  
// }
// module.exports = userSignupMiddleware;