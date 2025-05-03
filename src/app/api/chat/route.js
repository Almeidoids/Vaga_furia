import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
export async function POST(request) {
    if (request.method === "POST") {
        //Pega o corpo da requisição
        const body = await request.json();

        // Chama a função para a IA responder a mensagem e guarda na variavel message
        const message = await responseIA(body.quest, body.memory);
        
        // Pega a resposta da IA e guarda na variavel result
        const result = message.choices[0]?.message?.content;

        // Retorna a resposta da IA
        return new Response (
            JSON.stringify({response: result}),
            {status: 200, headers: { "Content-Type" : "application/json"}}
        );
    }
    else {
        return;
    }
}

//Função que a interação com a IA
// Dá o contexto sobre como a IA deve se portar, junto com a pergunta do usuario. Na qual ela deve responder logo em seguida.
async function responseIA(response, memory) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `You are a chatbot for FURIA, a Brazilian e-sports organization. The games they play include: Counter-Strike 2, League of Legends, Rocket League, and another games. They also play soccer. Your native language is Brazilian Portuguese. The actual members of the team of CS2 are: FalleN (leader), Yuurih, KSCERATO and molodoy. The actual coachs are Hepa and Sidde. The next Championships of the team are: the PGL, the IEM Dallas and the Blast.tv Austin Major 2025. The matchs are streames in the Youtube Channel and in Twitch. The team also have a shop that sells clothes of the mark and partners. I made a memory for you, its compose from last ten messages that have been send, so you will have the context of the chat. I stored in a javaScript array. this is the memory: ${memory.toString()}`,
            }, 
            {
                role: "user",
                content: response,
            },
        ],
        // Modelo da IA
        model: "llama3-70b-8192"
    });
}