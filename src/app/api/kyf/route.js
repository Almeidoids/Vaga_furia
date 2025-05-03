import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient;

export async function POST(request) {
    if (request.method === "POST"){
        const body = await request.json();
        let {name, age, email, address, cpf} = body;
        
        const newUser = await prisma.usuario.create({
            data: {
                name,
                birthDate: new Date(age),
                email,
                cpf,
                address
            }
        })

        return new Response (
            newUser,
            {status: 200, headers: { "Content-Type" : "application/json" }}
        )
    }
    else {
        return new Response (
            JSON.stringify("O método não é permitido."),
            {status: 405}
        )
    }
}