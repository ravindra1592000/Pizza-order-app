import React from 'react'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import {useSelector} from 'react-redux';
import Link from 'next/link'

 const Navbar = () => {

//  console.log('print the state in Navbar');
//  console.log(useSelector(state =>{
//    console.log(state);
//     return state;
//  })
// );
// if you notice - then you see that function inside the useSelector called automatically. we have not call it manually.

   const quantity = useSelector(state => state.cart.quantity);
  //  console.log('in navbar');
  //  console.log(quantity);
  

  return (
    <div className={styles.container}>
   <div className={styles.item}>
 <div className={styles.callButton}>
       <Image src="/../public/images/phonelogo.png" alt="" width="32" height="32" />
 </div>
 <div className={styles.texts}>
       <div className={styles.text}>ORDER NOW!</div>
      <div className={styles.text}>0123456</div>
 </div>
   </div>
   <div className={styles.item}>
         <ul className={styles.list}>
        <li className={styles.listItem}>Homepage</li>
        <li className={styles.listItem}>Products</li>
        <li className={styles.listItem}>Menu</li>
        <Image src="/../public/images/logo.png" alt=""  height="96px" width="160px"  />
        <li className={styles.listItem}>Events</li>
        <li className={styles.listItem}>Blog</li>
        <li className={styles.listItem}>Contact</li>
         </ul>
   </div>
   <Link href="/cart" passHref>
   <div className={styles.item}>
  <div className={styles.cart}>
   <Image src="/../public/images/cart.png" alt=""  height="30px" width="30px" />
   <div className={styles.counter}>
  {quantity}
</div>  
</div>
   </div>
   </Link>
    </div>
  )
}
export default Navbar;