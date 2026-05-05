import { initialisedSocketConnection } from "../services/chat.socket";
import {getChats, getMessages, sendMessage} from  "../services/chat.api";
import {useDispatch} from "react-redux"
import { addNewMessage, createNewChat, setChats, setCurrentChatId, setLoading, addMessages,updateMessage } from "../chat.slice";


export const useChat = ()=>{
       
    const dispatch = useDispatch()

async function handleSendMessage({ message, chatId }) {
  // Always ensure we have a chatId (temporary until backend confirms)
  const provisionalChatId = chatId || "temp-chat";
  const tempAiId = `ai-${Date.now()}`;

  try {
    // 1️⃣ Show user message immediately
    dispatch(addNewMessage({
      chatId: provisionalChatId,
      role: "user",
      content: message,
    }));

    // 2️⃣ Show AI loader immediately
    dispatch(addNewMessage({
      chatId: provisionalChatId,
      id: tempAiId,
      role: "assistant",
      content: "",
      loading: true,
    }));

    // 3️⃣ Call backend
    const { chat, aiMessage } = await sendMessage({ message, chatId });

    // 4️⃣ If new chat, register it
    const realChatId = chatId || chat._id;
    if (!chatId) {
      dispatch(createNewChat({
        chatId: chat._id,
        title: chat.title,
      }));
      dispatch(setCurrentChatId(chat._id));
    }

    // 5️⃣ Replace loader with AI response
    dispatch(updateMessage({
      chatId: realChatId,
      messageId: tempAiId,
      content: aiMessage.content,
      loading: false,
    }));

  } catch (error) {
    // 6️⃣ Graceful error handling
    dispatch(updateMessage({
      chatId: provisionalChatId,
      messageId: tempAiId,
      content: "❌ Sorry, something went wrong. Please try again.",
      loading: false,
    }));
    console.error("Message send failed:", error);
  }
}

    async function handleGetChats(){
        dispatch(setLoading(true))
        const data = await getChats()
        const {chats} = data 
        dispatch(setChats(chats.reduce((acc,chat)=>{
            acc[ chat._id ] = {
                id: chat._id,
                title: chat.title,
                messages:[],
                lastUpdated: chat.updatedAt,
            }
            return acc
        },{})))
        dispatch(setLoading(false))
    }

    async function handleOpenChat(chatId,chats){


        console.log(chats [chatId]?.messages.length)

        if(chats[chatId]?.messages.length === 0){
           const data = await getMessages(chatId)
         const {messages} = data 

         const formattedMessages = messages.map(msg => ({
            content: msg.content,
            role: msg.role,
         }))

         dispatch(addMessages({
            chatId,
            messages: formattedMessages,
         }))
        }

         dispatch(setCurrentChatId(chatId))
    }


    return {

            initialisedSocketConnection,
            handleSendMessage,
            handleGetChats,
            handleOpenChat
        }
    }