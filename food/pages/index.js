import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'
import Featured  from '../components/featured'
import Pizzalist from '../components/pizzalist'


import styles from '../styles/Home.module.css'

export default function Home({pizzalist}) {
  return (
    <div className={styles.container}>
     
      <Head>
        <title>pizza Restaurant in India</title>
        <meta name="description" content="Generated by Ravindra" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <Featured />
   <Pizzalist pizzalist={pizzalist}/>
    </div>
  )
}


export const getServerSideProps = async () =>{
  const res = await axios.get('http://localhost:3000/api/products');
  return {
    props:{
      pizzalist: res.data,
    }
  }
}