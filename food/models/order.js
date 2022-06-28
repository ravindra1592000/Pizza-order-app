import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
 customer:{
       type: String,
       required:true,
       maxlength:60,
 },
 address:{
      type: String,
      required:true,
      maxlength:200,
},
total:{
      type: Number,
      required:true,
},
status:{
      type:Number,
      default: 0,
},
method:{
      type: Number, // when user pay with cash on delivery then its value is zero. if he pay with paypal then its value becomes 1.
      required: true,
}
},

{timestamps:true}   
);

export default mongoose.models.Order || mongoose.model("Order",OrderSchema);
