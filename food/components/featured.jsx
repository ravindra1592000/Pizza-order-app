import {useState} from 'react';
import Image from 'next/image';
import styles from '../styles/Featured.module.css';
import React from 'react'

 const Featured = () => {
       const [index,setIndex] = useState(0);
       const images = [
             "/../public/images/featured.jpg",
             "/../public/images/featured1.jpg",
             "/../public/images/featured2.jpg"
       ]
       const handleArrow = (direction) =>{
          if(direction === "l"){
                setIndex(index !== 0 ? index-1: 2);
          }
          if(direction === "r"){
            setIndex(index !== 2 ? index+1: 0);
      }
       }
       console.log(index);
  return (
    <div className={styles.container}>
          <div className={styles.arrowContainer} style={{left:0}} onClick={() => handleArrow("l")}>
          <Image src="/../public/images/arrowl.jpg" alt="" layout="fill" objectFit='contain' />
          </div>
          <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
          {
                images.map((img,i) => ( 
                  <div className={styles.imgContainer} key={i}>
                <Image src={img} alt=""  layout="fill" objectFit='contain'/>
                </div> ))
               
          }
                 
          </div>
          <div className={styles.arrowContainer} style={{right: 0}} onClick={() => handleArrow("r")}>
          <Image src="/../public/images/arrowr.png" alt="" layout="fill" objectFit='contain' />
          </div>
    </div>
  )
}
export default Featured;

