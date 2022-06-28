import Image from 'next/image';
import styles from '../styles/Pizzacard.module.css';
import Link from 'next/link';

 const Pizzacard = ({pizza}) => {
   console.log(pizza._id);
  
  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza._id}`} passHref>
        {
          // by this we pass variable path in href .
        }
        <Image src={pizza.img} width="500" height="500" alt="" />
        </Link>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${pizza.prices[0]}</span>
        <p className={styles.desc}>
          {pizza.desc}
        </p>
          </div>
  )
}
export default Pizzacard;