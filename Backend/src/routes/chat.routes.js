import { Router } from "express";
import { deleteChat, getChats, getMessages, sendMessage } from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";


const chatRouter = Router();

/**
 * @route /api/chats/message 
 * @description this api for message the ai and get the message by ai in response 
 * @access private 
 */

chatRouter.post("/message",authUser , sendMessage );

chatRouter.get("/",authUser,getChats)

chatRouter.get("/:chatId/messages", authUser, getMessages)

chatRouter.delete("/delete/:chatId", authUser, deleteChat)

export default chatRouter;