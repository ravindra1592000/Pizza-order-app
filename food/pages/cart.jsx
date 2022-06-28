import {useState} from 'react';
import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import {useDispatch,useSelector} from 'react-redux';
import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from 'axios';
import {useRouter} from 'next/router';
import {reset} from '../components/redux/cartSlice';
import OrderDetails from '../components/OrderDetailed.jsx';
// import Link from "next/link";
// This values are the props in the UI

// console.log(order);
 const Cart = () => {
const cart = useSelector(state => state.cart);
const [open,setOpen] = useState(false);
const [cash,setCash] = useState(false);
const amount = cart.total;
const currency = "USD";
const style = {"layout":"vertical"};
const dispatch = useDispatch();
const router = useRouter();

// console.log(cart);


const createOrder = async (data) => {
    try{
        console.log('print in createOrder function');
        console.log(data);
     const res = axios.post("http://localhost:3000/api/orders",data);
    
     if((await res).status === 201){
         // here we have struck in the problem .
         // when we only write res.status not ((await res).status) then 
         // this if condition will not run . because it is asynchronus 
         // action.
         console.log('inside res.status');
      router.push("/order/" + (await res).data._id);
     }
     dispatch(reset());
    
    }catch(err){
        console.log(err);
    }
}





      const ButtonWrapper = ({ currency, showSpinner }) => {
            // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
            // This is the main reason to wrap the PayPalButtons in a new component
            const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
        
            useEffect(() => {
                dispatch({
                    type: "resetOptions",
                    value: {
                        ...options,
                        currency: currency,
                    },
                });
            }, [currency, showSpinner]);
        
        
            return (<>
                    { (showSpinner && isPending) && <div className="spinner" /> }
                    <PayPalButtons
                        style={style}
                        disabled={false}
                        forceReRender={[amount, currency, style]}
                        fundingSource={undefined}
                        createOrder={(data, actions) => {
                            return actions.order
                                .create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                currency_code: currency,
                                                value: amount,
                                            },
                                        },
                                    ],
                                })
                                .then((orderId) => {
                                    // Your code here after create the order
                                    return orderId;
                                });
                        }}
                // Your code here after capture the order
                        onApprove={function (data, actions) {
                            return actions.order.capture().then(function (details) {
                    const shipping = details.purchase_units[0].shipping;
                    console.log('shipping');
                    console.log(shipping);
                  createOrder({
                      customer:shipping.name.full_name,
                      address: shipping.address.address_line_1,
                      total:cart.total,
                      method:1,

                })
                            });
                        }}
                    />
                </>
            );
        }

  return (
    <div className={styles.container}>
    <div className={styles.left}>
      <table className={styles.table}>
          <tbody>
      <tr className={styles.trTitle}>
      <th>Product</th>
      <th>Name</th>
      <th>Extras</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Total</th>
      </tr>
      </tbody>
      <tbody>
      {cart.products.map((product) => (
            <tr className={styles.tr} key={product._id}>
      <td>
            <div className={styles.imgContainer}>
                  <Image src={product.img} layout="fill" objectFit='cover' alt="" />
            </div>
      </td>
      <td>
            <span className={styles.name}>{product.title}</span>
      </td>
      <td>
         <span className={styles.extras}>
               {product.extras.map((extra1) => extra1.text+" ")}</span>   
      </td>
      <td>
            <span className={styles.price}>${product.price}</span>
      </td>
      <td>
         <span className={styles.quantity}>
              {product.quantity}</span>   
      </td>
      <td>
            <span className={styles.total}>${product.quantity*product.price}</span>
      </td>
      </tr>
      ) )}
      
   
      </tbody>
    
      </table>
    </div>

    <div className={styles.right}>
    <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>SubTotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
         
          {open ? (
          <div className={styles.paymentMethods}>
                <button className={styles.payButton} onClick={() => setCash(true)}>
                      CASH ON DELEVERY
                </button>
                <PayPalScriptProvider
                options={{
                    "client-id": "AfhYEatpQ_agu8adHo9-e4vwD37nsSUTmjaLBs3LdJGjzS46y6LT7bxno8BMlMnUkRBRBOYNIHVN2MbW",
                    components: "buttons",
                    currency: "USD",
                    "disable-funding":"credit,card",
                }}
            >
				<ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                />
			</PayPalScriptProvider>
          </div>
          ) :
                   ( <button  onClick = {() => setOpen(true)} className={styles.button}>
                CHECKOUT NOW!
          </button>)}
          
    </div>
    </div>
    {cash && (
       <OrderDetails total={cart.total} createOrder={createOrder}/> 
    )}
    </div>
  )
}

export default Cart;