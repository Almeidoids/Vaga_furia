import * as cheerio from "cheerio"
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function GET(request, {params}) {
    if (request.method === "GET") {
        const { user } = await params;
        console.log(user);
        const users = await prisma.usuario.findUnique({ where: {cpf: user} });

        if (!users) {
            return new Response(JSON.stringify({error: "Usuario não encontrado"}), {status: 404});
        }
        else {
            return new Response(
                JSON.stringify({user: users}),
                {status: 200, headers: { "Content-Type" : "application/json" }}
            )
        }
    }
    else {
        return new Response (
            JSON.stringify("O método não é permitido."),
            {status: 405}
        )
    }
}

export async function POST(request, {params}) {
    try {
        const link = await request.json();
        const res = await fetch(link, {
            headers: {"User-Agent" : "Mozilla/5.0"}
        });

        const html = await res.text();
        const $ = cheerio.load(html);

        const name = $(`meta[property = "og:title"]`).attr("content");
        const username = $(`meta[property = "og:username"]`).attr("content");
        const description = $(`meta[property = "og:description"]`).attr("content");

        const profileInfo = {
            name: name,
            username: username,
            bio: description,
            // image: image,
        }

        console.log(profileInfo);

        return new Response(JSON.stringify(profileInfo));
    }
    catch (err) {
        return new Response(
            JSON.stringify({ error: "Erro ao buscar dados do instagram" }),
            {status: 500}
        )
    }
}