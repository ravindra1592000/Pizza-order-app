import dbConnect from "../../../util/mongo"
import Product from '../../../models/product'


export default async function handler(req,res) {
      const {method,query:{id}} = req;

      console.log('in handler function of product/id.jsx');
     console.log(req.url);
     // when we print (req.url) then we find no ? mark in url but it say it is query.
      console.log(req.query);
      console.log(req.params);
      console.log(method);
     

dbConnect(); // after calling of this function you can connect with mongodb atlas.

      if(method === 'GET'){
            try{
        const product =await Product.findById(id);
        res.status(200).json(product);
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
      if(method === 'PUT'){
            try{
                 const product = new Product({...req.body});
               
             console.log(product);
              await product.save();
             res.status(201).json(product);
            }catch(error){
             return res.status(500).json(error.message);
            }
           }

           if(method === 'DELETE'){
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