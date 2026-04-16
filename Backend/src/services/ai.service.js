import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import {AIMessage, HumanMessage, SystemMessage} from "langchain" 
import {ChatMistralAI} from "@langchain/mistralai"
import { response } from "express";

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY

})

export async function generateReponse(messages){

   const response = await geminiModel.invoke(messages.map(msg => {
    if (msg.role == "user"){
        return new HumanMessage(msg.content)
    } else if(msg.role == "ai"){
         return new AIMessage(msg.content)
    }
   }));
    return response.text
}


export async function generateChatTittle(message){
  
    const title = await mistralModel.invoke([
        new SystemMessage(`you are a helpful assistant that generates consise and dicriptive title for chat conversation
            
         user will provide you the first message of the chat conversation you will be generate title that capture the essence of the conversation with 2-4 words. the title should be clear , relevant and engaging giving user the quick undertanding of the chat's topic `),
         new HumanMessage(`generate the title for a chat converation based on the following first message:
            "${message}"
            `)
    ])

    return title.text
}


