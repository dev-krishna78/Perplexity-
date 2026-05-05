import {createSlice} from "@reduxjs/toolkit"
const chatSlice = createSlice({
      name:'chat',
      initialState:{
        chats:{},
        currentChatId: null,
        isLoading: false,
        error: null,
      },
      reducers:{
        createNewChat: (state, action) =>{
            const {chatId , title} = action.payload
            state.chats[chatId] = {
                id: chatId,
                title,
                messages: [],
                lastUpdated: new Date().toDateString(),
            }
        },
        addNewMessage: (state, action) => {
      const { chatId, id, content, role, loading } = action.payload;

      // 🔥 Safety: if chat does not exist, create it
      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          id: chatId,
          title: "New Chat",
          messages: [],
          lastUpdated: new Date().toISOString(),
        };
      }

      state.chats[chatId].messages.push({
        id: id || Date.now().toString(),
        content,
        role,
        loading: loading || false,
      });

      state.chats[chatId].lastUpdated = new Date().toISOString();
    },
       
      updateMessage: (state, action) => {
      const { chatId, messageId, content, loading } = action.payload;

      const chat = state.chats[chatId];
      if (!chat) return;

      const msg = chat.messages.find((m) => m.id === messageId);
      if (!msg) return;

      if (content !== undefined) msg.content = content;
      if (loading !== undefined) msg.loading = loading;
    },
      addMessages: (state, action) =>{
              const {chatId, messages} = action.payload;
              if(!state.chats[chatId]) return;
              state.chats[chatId].messages.push(...messages)
        },
        setChats: (state, action) =>{
            state.chats = action.payload
        },
        setCurrentChatId: (state,action)=>{
            state.currentChatId = action.payload
        },
        setLoading: (state, action) =>{
            state.isLoading = action.payload
        },
        setError: (state, action)=>{
            state.error = action.payload
        },
      }
})
export const {setChats,setCurrentChatId,setLoading,setError, createNewChat, addNewMessage, addMessages, updateMessage} = chatSlice.actions
export default chatSlice.reducer

// chats = {
//     "docker and AWS": {
//         messages: [
//             {
//                 role: "user",
//                 content: "What is docker?"
//             },
//             {
//                 role: "ai",
//                 content: "Docker is a platform that allows developers to automate the deployment of applications inside lightweight, portable containers. It provides an efficient way to package and distribute software, ensuring consistency across different environments."
//             }
//         ],
//         id: "docker and AWS",
//         lastUpdated: "2024-06-20T12:34:56Z",
//     }

// }