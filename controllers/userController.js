var QuestionnaireModel = require('../models/questionnaireModel');
var ItemModel = require('../models/itemModel');
var UserModel = require('../models/userModel');
var moment = require('moment');
moment().format();

module.exports = {
	makeKit: function(req,res){
		QuestionnaireModel.findOne({}).exec( function(err,doc){
			if (doc===null){
				res.render('showprofile',{
					profile: req.user,
					kits: req.user.kits.sort(function(a,b){
						return b.timeCreated-a.timeCreated;
					})
				});
			}
			else {
				var query = {"userid": req.user.userid};
				var newKitName = doc.kitName;
				var pets = doc.pets;
				var earthquake = doc.earthquakeZone;
				var flood = doc.floodZone;
				var tornado = doc.tornadoZone;
				var hurricane = doc.hurricaneZone;
				var limited = doc.limitedStorage;
				var backcountry = doc.backCountry;
				var groupSize = doc.groupSize;
				var location = doc.location;
				var qtyMod = function(){
					if (location == "home"){
						return ((groupSize + (pets/2))*3);
					}
					else
						return groupSize + (pets/2);
				};

				UserModel.findOne(query, function(err,user){
					ItemModel.find({}, function(err, items){
						var allItems = {kitName:newKitName,groupSize:groupSize,pets:pets,location:location,timeCreated: new Date(),kitItems:[]};
						//Pushes all general items, adjusts for group size and pets(category 0)
						for (var i = 0; i < items.length; i++) {
							if (items[i].category.indexOf(0) > -1){
								allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity*qtyMod(),unitOfMeasure:items[i].unitOfMeasure,unitOfMeasurePlural:items[i].unitOfMeasurePlural,category:items[i].category,expiration:items[i].expiration,url:items[i].url});
							}
						}
						//Pushes all general items, adjusts for group size only(category 9)
						for (var i = 0; i < items.length; i++) {
							if (items[i].category.indexOf(9) > -1){
								allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity*groupSize,unitOfMeasure:items[i].unitOfMeasure,unitOfMeasurePlural:items[i].unitOfMeasurePlural,category:items[i].category,expiration:items[i].expiration,url:items[i].url});
							}
						}
						//Pushes all general items w/ fixed qty (category 7)
						for (var i = 0; i < items.length; i++) {
							if (items[i].category.indexOf(7) > -1){
								allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,unitOfMeasurePlural:items[i].unitOfMeasurePlural,category:items[i].category,expiration:items[i].expiration,url:items[i].url});
							}
						}
						//Pushes all pet items (category 6)
						if(pets > 0){
							for (var i = 0; i < items.length; i++) {
								if (items[i].category.indexOf(6) > -1){
									allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity*pets,unitOfMeasure:items[i].unitOfMeasure,unitOfMeasurePlural:items[i].unitOfMeasurePlural,category:items[i].category,expiration:items[i].expiration,url:items[i].url});
								}
							}
						}
						//Pushes all earthquake items (category 1)
						if(earthquake===true){
							for (var i = 0; i < items.length; i++) {
								if (items[i].category.indexOf(1) > -1){
									allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,unitOfMeasurePlural:items[i].unitOfMeasurePlural,category:items[i].category,expiration:items[i].expiration,url:items[i].url});
								}
							}
						}
						//Pushes all flood items (category 2)
						if(flood===true){
							for (var i = 0; i < items.length; i++) {
								if (items[i].category.indexOf(2) > -1){
									allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,unitOfMeasurePlural:items[i].unitOfMeasurePlural,category:items[i].category,expiration:items[i].expiration,url:items[i].url});
								}
							}
						}
						//Pushes all tornado items (category 3)
						if(tornado===true){
							for (var i = 0; i < items.length; i++) {
								if (items[i].category.indexOf(3) > -1){
									allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,unitOfMeasurePlural:items[i].unitOfMeasurePlural,category:items[i].category,expiration:items[i].expiration,url:items[i].url});
								}
							}
						}
						//Pushes all limited items (category 4)
						if(limited===true){
							for (var i = 0; i < items.length; i++) {
								if (items[i].category.indexOf(4) > -1){
									allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,unitOfMeasurePlural:items[i].unitOfMeasurePlural,category:items[i].category,expiration:items[i].expiration,url:items[i].url});
								}
							}
						}
						//Pushes all backcountry items (category 5)
						if(backcountry===true){
							for (var i = 0; i < items.length; i++) {
								if (items[i].category.indexOf(5) > -1){
									allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,unitOfMeasurePlural:items[i].unitOfMeasurePlural,category:items[i].category,expiration:items[i].expiration,url:items[i].url});
								}
							}
						}
						//Pushes all vehicle items (category 8)
						if(location==="vehicle"){
							for (var i = 0; i < items.length; i++) {
								if (items[i].category.indexOf(8) > -1){
									allItems.kitItems.push({itemName:items[i].itemName, description:items[i].description, quantity:items[i].quantity,unitOfMeasure:items[i].unitOfMeasure,unitOfMeasurePlural:items[i].unitOfMeasurePlural,category:items[i].category,expiration:items[i].expiration,url:items[i].url});
								}
							}
						}
						
						//Removes duplicate kit items
						var itemsArr = allItems.kitItems;
						for (var i = 0; i < itemsArr.length; i++) {
							for (var j = i+1; j < itemsArr.length; j++) {
								if(itemsArr[j].itemName == itemsArr[i].itemName) {
									itemsArr.splice(j,1);
									--j;
								}
							}
						}
						user.kits.push(allItems);
						QuestionnaireModel.remove().exec();
						user.save(function(err, newUser){
							res.render('showprofile', {
								profile: req.user,
								kits: newUser.kits.sort(function(a,b){
									return b.timeCreated-a.timeCreated;
								})
							});
						});
					});
				});
			}
		});
	},
	deleteKit: function(req,res){
		var user = req.query.profileID;
		var kitToDel = req.query.kitID;
		UserModel.findById(user, function(err,user){
			for (var i = 0; i < user.kits.length; i++) {
				if (user.kits[i]._id == kitToDel) {
					user.kits.splice(i,1);
				}
			}
			user.save(function(err, newUser){
						res.send(newUser);
			});
		});
	},
	update: function(req,res){
		var user = req.query.profileID;
		var kit = req.query.kitID;
		var item = req.query.itemID;
		UserModel.findById(user, function(err,user){
			for (var i = 0; i < user.kits.length; i++) {
				if (user.kits[i]._id == kit) {
					var curKit = user.kits[i];
						for (var j = 0; j < curKit.kitItems.length; j++) {
							if (curKit.kitItems[j]._id == item) {
								var date = new Date();
								var dayStr= date.toDateString();
								var curDate = moment(dayStr).format("MM/DD/YYYY");
								curKit.kitItems[j].addedDate= curDate;
								curKit.kitItems[j].expDate = moment(curDate).add('months', curKit.kitItems[j].expiration).format("MM/DD/YYYY");
							}
						}
				}
			}
			user.save(function(err, newUser){
				for (var i = 0; i < newUser.kits.length; i++) {
					if (newUser.kits[i]._id == kit) {
						var newCurKit = newUser.kits[i];
							for (var j = 0; j < newCurKit.kitItems.length; j++) {
								if (newCurKit.kitItems[j]._id == item) {
									res.send({addedDate:newCurKit.kitItems[j].addedDate, expDate:newCurKit.kitItems[j].expDate});
								}
							}
					}
				}
			});
		});
	}

};