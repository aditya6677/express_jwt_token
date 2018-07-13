const mongo=require('mongoose');

const user=mongo.Schema({
    __id:mongo.Schema.Types.ObjectId,
    email:{
        type:String,
        require:true
    },
    pass:{
        type:String,
        require:true
    }
});

module.exports=mongo.model('User',user);