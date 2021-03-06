const mongoose = require('mongoose');

const AdressSchema= new mongoose.Schema(
    {
        Street: {type:String, required:true},
        Number: {type:Number, required:true},
        City: {type:String, required:true},
        Country: {type:String, required:true},
    }
);
const FSchema = new mongoose.Schema (
        {
            NumberFriend:{ type: Number, required:true},
            NameNick: {type:String, required:true},
            Gender: {type:String, required:true},
            Birthday: {type:String, required:true},
            Address: AdressSchema,
            NumberPhone: {type:String, required:true},
            Email: {type: String, required:true},
        }, 
        {
            collection: 'FriendsInFacebook'
        }
);

FSchema.set('toObject', {
    transform: function (doc, ret) {
      delete ret._id
      delete ret.__v
      delete ret.Address._id
      delete ret.Address.__v
    }
  })
  

const Facebook = mongoose.model('Facebook', FSchema);

module.exports = Facebook;