import styles from '../styles/OrderDetail.module.css';
import {useState,useEffect} from 'react';

 const OrderDetailed = () => {
const [customer,setCustomer] = useState("");
const [address,setAddress] = useState("");

const handleClick = ({total,createOrder}) => {
createOrder({customer,address,total,method:0});
}


  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>You will pay $12 after delivery</h1>
          <div className={styles.item}>
            <label className={styles.label}>Name SurName</label>
            <input placeholer="John Doe" type="text" className={styles.input} onChange={(e) => setCustomer(e.target.value)}/>
          </div>

          <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
          </div>  
    </div>
  )
}

export default OrderDetailed;