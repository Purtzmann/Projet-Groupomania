let models = require('../models');
let jwtUtils = require('../utils/jwt.utils')
const fs = require("fs");



exports.create = (req, res) => {
   // Getting auth header
   let headerAuth  = req.headers['authorization']; // permet de vérifier le token !
   let userId      = jwtUtils.getUserId(headerAuth); // récupérer id

   //params
   let content = req.body.content;
   let attachment = ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null );


   if (content == null){
      return res.status(400).json({'error':'missing paramaters'})
   }
   if (content.length <= 4){
         return res.status(400).json({'error':'invalid parameters'})
   }
   models.User.findOne({
      where: { id: userId }
   })
   .then( userFound =>{
      if(userFound){
      models.Message.create({
         content: content,
         attachment: attachment,
         likes  : 0,
         UserId : userFound.id
      }).then(newUser =>{
         return res.status(201).json('Message créé')
      })

      }else{res.status(404).json({ 'error': 'user not found' });}
      }).catch(err =>{
         return res.status(500).json({ 'error': 'unable to verify user' });
   })

};


exports.deletePost = async (req, res) => {
	try {
		const message = await models.Message.findOne({
			where: { id: req.params.id }
		});

		if (message.attachment !== null) {
			const filename = message.attachment.split("/images")[1];
			fs.unlink(`images/${filename}`, error => {
				error ? console.log(error) : console.log("fichier supprimé");
			});
		}

		if (!message) {
			throw new Error("Aucun post existant");
		}

		// post
		const destroyedMessage = await models.Message.destroy({
			where: { id: req.params.id }
		});

		if (!destroyedMessage) {
			throw new Error("Une erreur est survenue");
		} else {
			res.status(200).json({ message: "Le post a été supprimé " });
		}

	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

exports.displayAll = (req, res) =>{
   
   const sizeAsNumber = Number.parseInt(req.query.size)//Param de l'url

   let size = 4;
   if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 ){
      size = sizeAsNumber;
   }

   models.Message.findAll({
     include: [{
       model: models.User,
       attributes: [ 'lastName', 'firstName', "picture" ],
      }],
      order: [['createdAt', 'DESC']],
      limit: size,
   }).then(function(messages) {
     if (messages) {
       res.status(200).json(messages);
     } else {
       res.status(404).json({ "error": "no messages found" });
     }
   }).catch(function(err) {
     console.log(err);
     res.status(500).json({ "error": "invalid fields" });
   });
 }

