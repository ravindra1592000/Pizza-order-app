import styles from '../styles/Pizzalist.module.css';
import Pizzacard from './Pizzacard';

 const Pizzalist = ({pizzalist}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum ea similique magnam rem facere adipisci nihil ipsa fugit explicabo ratione, voluptatibus reiciendis a eligendi i
      </p>
      <div className={styles.wrapper}>
        {
        pizzalist.map((pizza) => ( 
        <Pizzacard key={pizza._id} pizza={pizza}/>))
        }
   
      </div>
    </div>
  )
}
export default Pizzalist;