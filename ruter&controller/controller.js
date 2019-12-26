const Emitter = require('events');
var myEmitter = new Emitter();
const eventsConfig= require('../config').events;
const mongoose= require('mongoose');
const FaceBook  = require('../collection/Facebook');


exports.FacebookController = {
  
  // Send Specific Data or All Data
  get(req, res,next) {
    if (req.params && req.params.id) {
      const NumberFriend = req.params.id;//NumberFriend <- :id
      
      if(!Number.isNaN(NumberFriend)) // if (NumberFriend is Integer(number) then....)
      {
        console.log(` data with ${NumberFriend}:`); 
        myEmitter.on(eventsConfig.Find, async()=>{
          const result= await FaceBook.findOne({NumberFriend}).select("-__v -_id -Address.__v -Address._id");
          if(result) {
            console.log(result);
            return res.send(JSON.result);}
          else res.status(404).send(`The Data about Friend with NumberFriend:${NumberFriend} is not found`);
        });

        myEmitter.emit(eventsConfig.Find);
      }
      else res.status(404).send("The Input in request is not number"); // if :id/NumberFriend is not Integer or is null so send this string 
    }

    else{// print all data
      console.log("All Data of The Friends on fcebook:");
      myEmitter.on(eventsConfig.Find, async()=>{
        const result= await FaceBook.find({}).select("-__v -_id -Address.__v -Address._id");
        if(result) {console.log(result);res.json(result);}
        else res.status(404).send(`The DataBase is empty`);
      });
      myEmitter.emit(eventsConfig.Find);
    }
  },

  // Create And ADD Friend on Facebook Data in mongoDB
  post(req, res, next) {
    console.log('new entity saved!');
    const{ body } = req;
    const NumberFriend  = body.NumberFriend;
    const result= new FaceBook(body);
    myEmitter.on(eventsConfig.save, async()=>{
      resultFind= await FaceBook.findOne({NumberFriend});
      console.log(resultFind);
      if(resultFind)
        return res.status(404).send("This Friend is existing!");
      const isOk= await result.save();
      if(isOk) { 
          res.send("This Data is in DataBase, ADD Friend on facebook is success");
        }
        else res.status(404).send("The new Data was not saved")
       });
       myEmitter.emit(eventsConfig.save);
  },

  put(req,res, next){
    if (req.params && req.params.id) {
      const {body}= req;
      console.log(body);
      const NumberFriend = req.params.id;//NumberFriend <- :id
      if(!Number.isNaN(NumberFriend)) // if (NumberFriend is Integer(number) then....)
      {
        console.log(` data with ${NumberFriend}:`); 
        myEmitter.on(eventsConfig.Update, async()=>{
        const {NameNick, Gender, Birthday,
        Address,NumberPhone, Email}= body;
        const {Street, Number , City, Country }=Address;
        console.log(`${NameNick}| ${Gender}|${Birthday}|${Street}|${Number}|${City}|${Country}|${NumberPhone}|${Email}`);
       
       // update val if is existing
        var result;
        if(NameNick)
          result = await FaceBook.updateOne({NumberFriend},{$set:{"NameNick":NameNick}});
        if(Gender)
          result = await FaceBook.updateOne({NumberFriend},{$set:{"Gender":Gender}});
        if(Birthday)
          result = await FaceBook.updateOne({NumberFriend},{$set:{"Birthday":Birthday}});
        if(Street)
          result = await FaceBook.updateOne({NumberFriend},{$set:{"Address.Street":Street}});
        if(Number)
        result = await FaceBook.updateOne({NumberFriend},{$set:{"Address.Number":Number}});
        if(City)
        result = await FaceBook.updateOne({NumberFriend},{$set:{"Address.City":City}});
        if(Country)
        result = await FaceBook.updateOne({NumberFriend},{$set:{"Address.Country":Country}});
        if(NumberPhone)
          result = await FaceBook.updateOne({NumberFriend},{$set:{"NumberPhone":NumberPhone}});
        if(Email)
          result = await FaceBook.updateOne({NumberFriend},{$set:{"Email":Email}});
        
        
        if(result) 
          res.send("The Data was updated");
        else res.status(404).send("The new Data was not updated");
         });
         myEmitter.emit(eventsConfig.Update);
      }
      else res.status(404).send("The Input in request is not number"); // if :id/NumberFriend is not Integer or is null so send this string
    }
  },
  
  delete(req,res, next){
    if (req.params && req.params.id) {
      const NumberFriend = req.params.id;
      if(!Number.isNaN(NumberFriend)) {
        myEmitter.on(eventsConfig.Delete, async()=>{
          const result= await FaceBook.findOne({NumberFriend});
           if(!result)
             res.status(404).send("This Friend does not exist!");
          const isOk= await result.delete();
          if(isOk) { 
            return res.send("The Data was deleted");
          }
          else res.status(404).send("The new Data was not updated");
        });
          myEmitter.emit(eventsConfig.Delete);
      }  
      else res.status(404).send("The Input in request is not number"); 
    }
    else{
      myEmitter.on(eventsConfig.Delete, async()=>{
        const result= await FaceBook.findOne({});
        if(!result) 
         return res.status(404).send(`The DataBase is empty`);
        const isOk= await FaceBook.remove({});
        if(isOk) { 
          res.send("All Datas were deleted");
        }
        else res.status(404).send("error with Delete");
      });
      myEmitter.emit(eventsConfig.Delete);
    }
  }
};