import dbConnect from '../../../util/mongo';
import Order from '../../../models/order.js';

const handler = async(req,res) => {
      const {method} = req;
   
      await dbConnect();

      if(method == "GET"){
            try{
                  const orders = await Order.find();
                  res.status(200).json(orders);
                }catch(err){
                 res.status(500).json(err);
                }
      }
      if(method == "POST"){
   try{
         
      //    console.log('print in the index of order of api');
      //    console.log(req.body);
     const order = await Order.create(req.body);
//      console.log(order);
     res.status(201).json(order);
   }catch(err){
    res.status(500).json(err);
   }
      }
}
export default handler;