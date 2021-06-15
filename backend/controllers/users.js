const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let jwtUtils = require('../utils/jwt.utils')
const models = require("../models");
const fs = require("fs");

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

exports.signin = (req, res) => {
   //params
 
   let lastName = req.body.lastName;
   let firstName = req.body.firstName;
   let post = req.body.post;
   let email = req.body.email;
   let password = req.body.password;
 
   if(!EMAIL_REGEX.test(email)){
      return res.status(400).json({'error': 'email is not valid'})
   }
   
   if(!PASSWORD_REGEX.test(password)){
      return res.status(400).json({'error': 'password is not valid'})
   }
 
   models.User.findOne({
      attributes: ['email'],
      where: {email: email}
   })
   .then(userFound => {
      if(!userFound){
         bcrypt.hash(password, 10, function(err, bcryptedPassword){
            let newUser = models.User.create({
             lastName: lastName,
             firstName:firstName,
             post:post,
             email: email,
             password: bcryptedPassword,
             isAdmin: 0,
             
 
            })
            .then(newUser =>{
               return res.status(201).json({'userId': newUser.id
               })
            })
            .catch(err => {
               return res.status(500).json({'error': 'cannot add user'});
            });
         });
      }else{
         return res.stats(409).json({'error': 'user already exist'});
      }
   })
   .catch(err => {
      return res.status(500).json({'error': 'unable to verify user'});
   });
 };
 
 exports.login = (req, res) => {
   // Params
 
   let email    = req.body.email;
   let password = req.body.password;
 
   if (email == null ||  password == null) {
     return res.status(400).json({ 'error': 'missing parameters' });
   }
 
   models.User.findOne({where: { email: email }})
   .then(userFound =>{
     if(!userFound){
       return res.status(401).json({error: 'User no found'})
     }
     bcrypt.compare(password, userFound.password)
       .then(valid =>{
         if(!valid){
           return res.status(401).json({ error: 'Password invalid'})
         }
         res.status(200).json({
           'userId': userFound.id,
           'token': jwtUtils.generateTokenForUser(userFound),
         })
       })
       .catch(error => res.status(500).json({ error: 'erreur1' }));
   })
   .catch(error => res.status(500).json({ error: 'erreur2' }));
 };
 
 
 exports.getUser = (req, res)=>{ 

    let headerAuth  = req.headers['authorization']; // permet de vérifier le token !
    let userId      = jwtUtils.getUserId(headerAuth); // récupérer id
 
    models.User.findOne({
       where: {id: userId}
    })
    .then(user =>{
       if(user){
          res.status(200).json(user);
       }
    })
    .catch(err =>{
       return res.status(400).json({err: error})
    })
 
};




exports.updateUser = async (req, res) => {

      // Getting auth header
      let headerAuth  = req.headers['authorization']; // permet de vérifier le token !
      let userId      = jwtUtils.getUserId(headerAuth); // récupérer id

	try {
		const userToFind = await models.User.findOne({
			attributes: ["id", "firstName", "lastName", "post", "picture"],
			where: { id: userId }
		});

		if (!userToFind) {
			throw new Error("Sorry,we can't find your account");
		}


      if(req.file && userToFind.picture !== null){
         const filename = userToFind.picture.split("/imagesProfil")[1];
         console.log('toto')
         console.log(filename)
			fs.unlink(`imagesProfil/${filename}`, error => {
				error ? console.log(error) : console.log("file has been deleted");
			});
         picture = `${req.protocol}://${req.get('host')}/imagesProfil/${req.file.filename}`
         
      } else if(req.file && userToFind.picture === null){
         picture = `${req.protocol}://${req.get('host')}/imagesProfil/${req.file.filename}`
         console.log('tata')
      } else { picture = null
         console.log('titi')
      }

		const userToUpdate = await models.User.update(
			{
				firstName: req.body.firstName,
            lastName: req.body.lastName,
				post: req.body.post,
				picture: picture,
			},
			{
				where: { id: userId }
			}
		);

		if (!userToUpdate) {
			throw new Error("Sorry,something gone wrong,please try again later");
		}
		res.status(200).json({
			message: "Your account has been update",
         message: userToUpdate
		});

		if (!userToUpdate) {
			throw new Error("Sorry,we can't update your account");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deleteUser = async (req, res) => {
   
	try {
      
		const user = await models.User.findOne({
			where: { id: req.params.id }
		});

      if (user.picture !== null) {
			const filename = user.picture.split("/imagesProfil")[1];
			fs.unlink(`imagesProfil/${filename}`, error => {
				error ? console.log(error) : console.log("file has been deleted");
			});
		}

      await user.destroy();

		if (!user) {
			throw new Error("Sorry,your post doesn't exist ");
		}


	} catch (error) {
		res.status(404).json({ error: error.user });
	}
};




 
exports.displayAll = (req, res) =>{
    models.User.findAll({ _id: req.params.id})
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({
      error}));
};