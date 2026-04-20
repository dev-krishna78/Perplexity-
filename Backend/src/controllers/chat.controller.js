import { response } from "express";
import { generateResponse, generateChatTittle } from "../services/ai.service.js"
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"
import { ChatMistralAI } from "@langchain/mistralai";

export async function sendMessage(req, res){
    try {
        const { message , chat: chatId} = req.body 

        // Validate message
        if (!message || message.trim() === '') {
            return res.status(400).json({
                message: "Message content cannot be empty"
            })
        }

       let title = null, chat = null;

       if(!chatId){

           title = await generateChatTittle(message);
           chat = await chatModel.create({
               user: req.user.id,
               title
           })
            
        }

   

    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        content:message,
        role:"user"
    })

const messages = await messageModel.find({chat: chatId || chat._id})

const result = await generateResponse(messages);

    
      if (!result || result.trim() === '') {
        return res.status(500).json({
            message: "Failed to generate AI response"
        })
      }

      const aiMessage = await messageModel.create({
       chat : chatId || chat._id,
       content: result,
       role: "ai"
      })


    res.status(201).json({
        title,
        chat,
        aiMessage
    })
    } catch (error) {
        console.error("Error in sendMessage:", error)
        res.status(500).json({
            message: error.message || "Internal server error"
        })
    }

}

export async function getChats(req,res){
    const user = req.user

    const chats = await chatModel.find({user: user.id })

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats
    })
}

export async function getMessages(req, res){
      const {chatId} = req.params;

      const chat = await chatModel.findOne({
          _id: chatId ,
          user: req.user.id
      })

      if(!chat){
        return res.status(404).json({
            message: "chat not found"
        })
      }

      const messages = await messageModel.find({
        chat: chatId
      })

      res.status(200).json({
        message: "Message retrived succesfully",
        messages
      })
}

export async function deleteChat(req,res){

    const {chatId} = req.params;

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat: chatId 
    })

    if(!chat){
        return res.status(404).json({
            message: "chat not found "
        })
    }

    res.status(200).json({
        message: "Chat delete successfully"
    })
}