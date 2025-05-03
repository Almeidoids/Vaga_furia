import Link from "next/link"
import Image from "next/image"
import styles from "@/style/index.module.css"

export default function Home() {
    return(
        <div style = {{padding: 0, margin: 0}} className = {styles.op}>
            <div className = {styles.menu}>
                <Link href = "/chat">Chatbot</Link> 
                <Link href = "/kyf">Know your fans</Link> 
            </div>
        </div>
    )
}