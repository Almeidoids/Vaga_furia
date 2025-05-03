# Projeto para Assistente de Engenharia de Software na Furia

Este repositório contém um projeto desenvolvido como parte de um processo seletivo para a vaga de Assistente de Engenharia de Software na FURIA.

## Tecnologias utilizadas

- NEXT.js
- GROQ
- PRISMA (Known Your Fans)
- BOOTSTRAP

### Descrição do projeto

Ao acessar o site, o usuário encontrará uma página inicial contendo dois links: um para o **Chatbot** e outro para a seção **Know Your Fans**./

> [!WARNING]
> A funcionalidade Know Your Fans não foi finalizada até a data de entrega do projeto e, portanto, não está documentada neste README./

## chatbot

O Chatbot permite a interação com a IA de duas formas:/

1. Mensagens Prontas:
    - Localizado ao lado do campo de texto, na lateral inferior da página, há um botão com ícone de prancheta.
    - Ao clicar, um dropdown é exibido com diversos tópicos.
    - Ao selecionar uma opção, uma mensagem é enviada automaticamente e a resposta da IA aparece na interface.

2. Entrada Personalizada via IA:
    - O usuário pode digitar livremente no campo de texto e clicar no botão de envio.
    - Após alguns segundos, a IA responderá com base na entrada fornecida.
    - O modelo utilizado é o LLaMA 3, executado via API da Groq. A IA foi configurada para agir como uma assistente institucional da FURIA, fornecendo informações sobre a organização.

### Configuração da API

Para executar o projeto localmente com a IA:/

- Crie uma conta em: [GROq](https://console.groq.com/keys) e gere uma chave de API;
- Crie um arquivo ```.env``` na raiz do projeto e adicione a variável:/
```
GROQ_API_KEY=sua_chave_aqui
```
