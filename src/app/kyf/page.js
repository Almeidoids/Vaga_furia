"use client"

import Form from "next/form";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function Kyf() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [cpf, setcpf] = useState("");

    return (
        <Form action = {() => storage(name, age, email, address, cpf)} style = {{display: "flex", flexDirection: "column"}}>
            <label htmlFor = "name" >Nome:</label>
            <input required type = "text" name = "name" onChange = {(e) => setName(e.currentTarget.value)} />
            <label htmlFor = "age" >Ano de nascimento:</label>
            <input required type = "date" name = "age" onChange = {(e) => setAge(e.currentTarget.value)} />
            <label htmlFor = "email">Email:</label>
            <input type = "email" name = "email" onChange = {(e) => setEmail(e.currentTarget.value)} />
            <label htmlFor = "address">Endereço:</label>
            <input required type = "text" name = "address" onChange = {(e) => setAddress(e.currentTarget.value)} />
            <label htmlFor = "CPF">CPF:</label>
            <input required type = "number" name = "CPF" onChange = {(e) => setcpf(e.currentTarget.value)} />
            <button type = "reset" >Limpar</button>
            <button type = "submit">Enviar</button>
        </Form>
    )
}

async function storage(name, age, email, address, cpf) {
    const post = await fetch("/api/kyf", {
        method: "POST",
        headers: { "Content-type" : "application/json"},
        body: JSON.stringify({name: name, age: age, email: email, address: address, cpf: cpf}),
    });

    redirect(`/kyf/${Number(cpf)}`);
}