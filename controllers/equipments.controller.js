// importing the equipments model

const Equipment = require("../models/equipments.model");


//* Function for getting all the equipments from the database

const equipments_get_all = (req, res) => {
   Equipment.find()
   .select('name price _id equipmentImage availability')
   .exec()
   .then(docs => {
      const response = {
         count: docs.length,
         equipments: docs.map(doc => {
            return {
               name: doc.name,
               price: doc.price,
               _id: doc._id,
               productImage: doc.productImage,
               availability: doc.availability,
               request: {
                  type: "GET",
                  url: `http://localhost:3000/products/${doc._id}`
               }
            }
         })
      }
      res.status(200).json(response);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
   })
}

//* function for posting an equipment for rent

const equipment_post = (req, res) => {
   const equipment = new Equipment({
      name: req.body.name,
      price: req.body.price,
      equipmentImage: req.body.equipmentImage
   })
   equipment.save().then(result => res.status(201).json({
      message: "Equipment successfully applied for rent",
      createdEquipment: {
         name: result.name,
         price: result.price,
         _id: result._id,
         request: {
            type: "GET",
            url: `http://localhost:8000/equipments/${result._id}`
         }
      }
   })).catch(err => console.log(err));
}

//* Viewing a particular equipment

const equipment_view = (req, res) => {
   const id = req.params.equipmentId;
   Equipment.findById(id)
   .select("name price _id equipmentImage availability")
   .exec()
   .then(doc => {
      console.log("From database: ", doc);
      if (doc) {
         res.status(200).json({
            equipment: doc,
            request: {
               type: "GET",
               url: `http://localhost:8000/equipments/${doc._id}`
            }
         })
      } else {
         res.status(404).json({ message: "No valid entry found for the given id"});
      }
   })
   .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
   })
}


module.exports = {
   equipments_get_all,
   equipment_post,
   equipment_view
}

