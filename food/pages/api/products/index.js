import dbConnect from "../../../util/mongo"
import Product from '../../../models/product'


export default async function handler(req,res) {
      const {method} = req;
      console.log(method);

dbConnect();

      if(method === 'GET'){
            try{
        const products =await Product.find();
        res.status(200).json(products);
            }catch(err){
                  res.status(500).json(err.message);
            }
      }

      if(method === 'POST'){
       try{
            const product = new Product({...req.body});
          
        console.log(product);
         await product.save();
        res.status(201).json(product);
       }catch(error){
        return res.status(500).json(error.message);
       }
      }
}