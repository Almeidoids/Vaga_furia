"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

//Estilos
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import styles from "@/style/chat.module.css"

//Const
import {preAnswers, prequests} from "@/constants/prequests";

//Componente principal
export default function Chat() {
    const [update, setUpdate] = useState(false);
    const [chat, setChat] = useState([]); // estado em que as mensagens serão guardadas
    const [textUser, setTextUser] = useState("");
    const refText = useRef(null);
    const refButtonSend = useRef(null);

    return (
        <div>
            <div className = {styles.alignment}>
                <ul className = {styles.chat}>
                    {chat}
                </ul>
            </div>
            <div className = {styles.atb}>
                <div style = {{display: "flex", width: "84%",}}>
                    <textarea className = {styles.text} onChange={(e) => setTextUser(e.currentTarget.value)} ref = {refText} />
                    {/* Botão para enviar a mensagem personalizada, ao clicar nele, a função textIA será executada */}
                    <button 
                        className = {styles.buttonSend} 
                        ref = {refButtonSend}
                        onClick = {async () => {
                            setChat(item => [...item, <li key = {item.length} className = {styles.list} style = {{textAlign: "end"}}>{textUser}</li>])
                            
                            // Deixa o campo de texto desabilitado enquanto a IA pensa em uma resposta.
                            refText.current.value = "";
                            refText.current.disabled = true;
                            refButtonSend.current.disabled = true;

                            //Executa a função textIA e logo depois habilita o campo de texto novamente
                            await textIA(textUser, setChat, chat).then(() => {
                                refText.current.disabled = false;
                                refButtonSend.current.disabled = false;
                            })
                        }}
                ><i className = "bi bi-send-fill" /></button>
                </div>
                <button 
                    className = {`btn btn-secondary dropdown-toggle ${styles.buttonpq}`}
                    type="button" 
                    data-bs-toggle="dropdown" 
                    data-bs-auto-close = "false" 
                    aria-expanded = "false"
                    data-popper-placement = "top-end"
                    onClick = {() => {
                        setUpdate(!update);
                    }}
                
                >
                    <Image
                        src = "/images/icons/clipboard.png"
                        alt = "icone de prancheta"
                        height = {30}
                        width = {30}
                    />
                </button>
                <Dropdown update = {update} setUpdate = {setUpdate} setChat = {setChat} />
            </div>
        </div>
    )
}

// Componenrw de Dropdown das mensagens prontas
function Dropdown({update, setChat, setUpdate}) {

    const [item, setItem] = useState(""); 
    // O useEffect faz com que sempre que o usuario abra o dropdown ele volte para os tópicos do dropdown.
    useEffect(() => setItem(""), [update]);
    
    // Pega os dados do tópico Tap do objeto prequests, isso é repetido nas próximas duas variaveis, que pegam os tópicos "games" e "sap".
    const tap = prequests.tap.map(item => {
        return (
            <button className = {`dropdown-item ${styles.itemDropdown}`} key = {item.key} onClick = {() => (premessages(setChat, item, preAnswers.tap[item.key].answer, setUpdate))}><li>{item.quest}</li></button>
        )
    })

    const games = prequests.games.map(item => {
        return (
            <button className = {`dropdown-item ${styles.itemDropdown}`} key = {item.key} onClick = {() => premessages(setChat, item, preAnswers.games[item.key].answer, setUpdate)}><li>{item.quest}</li></button>
        )
    })

    const sap = prequests.sap.map(item => {
        return (
            <button className = {`dropdown-item ${styles.itemDropdown}`} key = {item.key} onClick = {() => premessages(setChat, item, preAnswers.sap[item.key].answer, setUpdate)}><li>{item.quest}</li></button>
        )
    })

    return (
        <ul className = {`dropdown-menu ${styles.dropdown} ${update ? "show" : ""}`}>
            <div style = {{display: item === "" ? "block" : "none"}}>
                <button className = {`dropdown-item ${styles.itemDropdown}`}><li onClick = {() => setItem("E")}>Time e Jogadores</li></button>
                <button className = {`dropdown-item ${styles.itemDropdown}`}><li onClick = {() => setItem("S")}>Jogos e Competições</li></button>
                <button className = {`dropdown-item ${styles.itemDropdown}`}><li onClick = {() => setItem("P")}>Loja e Produtos</li></button>
            </div>
            <div style = {{display: item === "E" ? "block" : "none"}}>
                {tap}
            </div>
            <div style = {{display: item === "S" ? "block" : "none"}}>
                {games}
            </div>
            <div style = {{display: item === "P" ? "block" : "none"}}>
                {sap}
            </div>
        </ul>
    )
}

// Função para as mensagem prontas serem enviadas
function premessages(setChat, item, answer, setUpdate) {
    let safeguard;
    // Função que manda a mensagem do usuario.
    function user() {
        setChat(itemChat => {
            let num = itemChat.length;
            safeguard = [...itemChat, <li key = {num} className = {styles.list} style = {{textAlign: "end"}}>{item.quest}</li>]
            return safeguard
        });
        setUpdate(false);
    }

    // Função que manda a resposta do chatbot
    function machine() {
        setChat(itemChat => {
            itemChat = safeguard;
            let num = itemChat.length;
            return [...itemChat, <li key = {num} className = {styles.list}>{answer}</li>]
        });
    }
    user(); 
    setTimeout((machine), 800); // Timeout para simular uma interação mais humana
}

// Função para o texto personalizado da IA.
async function textIA(text, setChat, chat) {
    let num = 0;
    let memory = []
    chat.length >= 11 ? num = chat.length - 12 : num;

    // Código para gerar uma pequena memória de 10 mensagens para a IA.
    for (num; num < chat.length - 1; num++) {
        memory.push(chat[num].props.children);
    }

    // Chama a API da IA para receber a mensagem e mandar a resposta, o body do fetch é a requisição que será mandada. 
    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-type" : "application/json"},
        body: JSON.stringify({quest: text, memory: memory})
    });
    const answer = await response.json();
    setChat(item => [...item, <li key = {item.length} className = {styles.list}>{answer.response}</li>]) // Coloca a resposta dentro do componente das mensagens
    memory = []; // Limpa a memória.
}