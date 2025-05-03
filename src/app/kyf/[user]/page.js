"use client"

import { useEffect, useState } from "react"

export default function User({params}) {
    const [id, setid] = useState(null)
    const [users, setUsers] = useState(null);
    const [link, setLink] = useState("");
    const [insta, setInsta] = useState(null);

    useEffect(() => {
        async function search() {
            const { user } = await params;
            setid(user);
        
            if(user) {
                let action = await fetch(`/api/kyf/${user}`, {
                    method: "GET",
                    headers: { "Content-Type" : "application/json" }
                })
                const response = await action.json();
                console.log(response)

                setUsers(response.user);
            }
        }
        search();
    }, []);
    
    return (
        <div>
            <p>Nome: {users ? users.name : null}</p>
            <p>CPF: {users ? users.cpf : null}</p>
            <p>E-mail: {users ? users.email : null}</p>
            <p>Data de Nascimento: {users ? users.birthDate : null}</p>
            <p>Endereço: {users ? users.address : null}</p>
            <textarea placeholder = "Adicione o Link do seu Instagram:" onChange = {(e) => setLink(e.currentTarget.value)} />
            <textarea placeholder = "Adicione coisas nas quais você se interessa, desde atividades, eventos" />
            <button onClick = {() => catchInformations(link, id, setInsta)}>Pegar informações do instagram</button>
            {insta !== null &&
                <>
                    <p>Nome: {insta.name}</p>
                    <p>Username: {insta.username}</p>
                    <p>Bio: {insta.bio}</p>
                </>
            }
        </div>
    )
}

async function catchInformations(link, id, setInsta) {
    console.log(id);
    const instagram = await fetch(`/api/kyf/${id}`, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(link),
    })

    const data = await instagram.json();
    console.log(data);
    setInsta(data);
}