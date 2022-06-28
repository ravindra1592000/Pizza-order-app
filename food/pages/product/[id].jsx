import { useState } from 'react';
import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import axios from 'axios'
import { useDispatch } from 'react-redux'; // for dispatching a action we use {useDispatch} and they are only called inside the function component.


// import  addProduct  from '../../components/redux/cartSlice.js';
// if you print above addProduct then this is totally different from the below addProduct . for verification you can print addProduct and check what is difference between below addProduct and above addProduct.
import {addProduct} from '../../components/redux/cartSlice.js';
console.log('print addproduct inside id.jsx');
console.log(addProduct);


const imag = require('../../public/images/pizza.jpg') // this is method by which we import image in next.js.
// or we can simply write the path '/images/file_name.jpg';
const imag1 = require('../../public/images/size.jpg')
const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  console.log(quantity);

  const changePrice = (number) => {
    setPrice(price + number);
  }

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  }


  const handlechange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  }

  const handleClick = () => {
    // I just do it for debugging purposes.
    // console.log(dispatch(addProduct({ ...pizza,quantity,price,extras })));
    dispatch(addProduct({ ...pizza,quantity,price,extras }))
  }



  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image alt="" src={pizza.img} layout="fill" objectFit='contain' />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}> {pizza.name}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src={imag1} layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src={imag1} layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src={imag1} layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) =>
          (<div className={styles.option} key={option._id}>

            <input type="checkbox" id={option.text} name={option.text} className={styles.checkbox} onChange={(e) => handlechange(e, option)} />
            <label htmlFor='double'>{option.text}</label>
          </div>)
          )
          }

        </div>
        <div className={styles.add}>
          <input onChange={(e) => setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity} />
          <button className={styles.button} onClick={handleClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}


//getServerSideProps only runs on server-side and never runs on the browser. If a page uses getServerSideProps, then:
// When you request this page directly, getServerSideProps runs at request time, and this page will be pre-rendered with the returned props
// When you request this page on client-side page transitions through next/link or next/router, Next.js sends an API request to the server, which runs getServerSideProps

// where context parameter is passed to getServerSideProps.
// The context parameter is an object containing the following keys:

// params: If this page uses a dynamic route, params contains the route parameters. If the page name is [id].js , then params will look like { id: ... }.
// req: The HTTP IncomingMessage object.
// res: The HTTP response object.
// query: An object representing the query string.
export const getServerSideProps = async ({ params, req, query }) => {
  console.log('in getserversideprops');
  console.log(query);
  console.log(req.url);

  console.log(params);
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: {
      pizza: res.data,
    }
  }
}


export default Product;