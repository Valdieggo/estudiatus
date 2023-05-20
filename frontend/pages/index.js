import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
const fechaActual = new Date();

const diferencia = fechaActual

const day = Math.floor(diferencia / (1000 * 60 * 60 * 24));
const hour = Math.floor(diferencia / (1000 * 60 * 60));
const minute = Math.floor(diferencia / (1000 * 60));

export default function Home() {
  return (
    <div className={styles.container}>
    <text>hola mundo</text>
    </div>
  )
}
