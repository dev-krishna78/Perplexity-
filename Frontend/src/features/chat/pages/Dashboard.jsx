import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { Send, File, Trash2, Sparkles, Lightbulb, FileText, Zap } from 'lucide-react'
import { useChat } from '../hooks/useChat'


const Dashboard = () => {
  const chat = useChat()
  const [ chatInput, setChatInput ] = useState('')
  
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  useEffect(() => {
    chat.initialisedSocketConnection()
    chat.handleGetChats()
    


  }, [])

  const handleSubmitMessage = (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) {
      return
    }
    console.log(setChatInput(event.target.value));

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId,chats)
  }

  console.log(chats[currentChatId])

  return (
    <main className='min-h-screen w-full bg-black p-3 text-white md:p-5'>
      <section className='mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-2xl md:h-[calc(100vh-2.5rem)] md:gap-6 overflow-hidden'>
        
        {/* Sidebar - Professional Dark */}
        <aside className='hidden h-full w-72 shrink-0 overflow-y-auto scrollbar-hide rounded-2xl md:flex md:flex-col bg-zinc-950 border border-white/10 p-6'>
          {/* Logo/Title */}
          <div className='mb-8'>
            <h1 className='text-2xl font-bold tracking-tight text-white'>
              AI Assistant
            </h1>
            <div className='h-0.5 w-8 mt-2 bg-gray-400'></div>
          </div>

          {/* Chat List */}
          <div className='space-y-2 flex-1 overflow-y-auto scrollbar-hide'>
            {Object.values(chats).map((chat, index) => (
              <button
                onClick={() => { openChat(chat.id) }}
                key={index}
                type='button'
                className='w-full text-left rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200
                  bg-white/5 hover:bg-white/10
                  border border-white/10 hover:border-white/20
                  text-gray-200 hover:text-white'
              >
                <span className='block truncate'>{chat.title}</span>
              </button>
            ))}
          </div>

          {/* Delete Button */}
          <button className='w-full mt-4 rounded-lg p-3 font-medium transition-all duration-200
            bg-white/5 hover:bg-red-500/10
            border border-white/10 hover:border-red-500/20
            text-gray-200 hover:text-red-300
            flex items-center justify-center gap-2'>
            <Trash2 size={18} />
            <span>Delete Chat</span>
          </button>
        </aside>

        {/* Main Chat Section */}
        <section className='mx-auto flex h-full min-w-0 flex-1 flex-col rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden'>
          
          {/* Messages Container - Scrollable */}
          <div className='messages flex-1 space-y-4 overflow-y-auto scrollbar-hide px-6 py-6'>
            {!currentChatId ? (
              // No Chat Selected - Clean UI
              <div className='flex items-center justify-center h-full'>
                <div className='text-center space-y-6 max-w-3xl mx-auto'>
                  {/* Clean Card Container */}
                  <div className='space-y-4'>
                    {/* Icon */}
                    <div className='flex justify-center'>
                      <div className='text-4xl md:text-5xl'>
                        <Sparkles size={56} className='text-gray-400' />
                      </div>
                    </div>

                    {/* Heading */}
                    <div className='mb-3'>
                      <h2 className='text-2xl md:text-3xl font-bold text-white leading-tight'>
                        How can I help
                        <br />
                        you today?
                      </h2>
                    </div>

                    {/* Subtitle */}
                    <p className='text-sm md:text-base text-gray-400 leading-relaxed font-light'>
                      Ask me anything about coding, AI, Web3, or your projects
                    </p>

                    {/* Quick Suggestions */}
                    <div className='space-y-3 pt-4'>
                      <p className='text-xs text-gray-500 uppercase tracking-widest font-semibold'>
                        Quick Suggestions
                      </p>
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                        <button className='px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-xs font-medium transition-all duration-200 hover:bg-white/10'>
                          <span>💡 Generate Quiz</span>
                        </button>
                        <button className='px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-xs font-medium transition-all duration-200 hover:bg-white/10'>
                          <span>📄 Summarize PDF</span>
                        </button>
                        <button className='px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-xs font-medium transition-all duration-200 hover:bg-white/10'>
                          <span>🐛 Debug Code</span>
                        </button>
                      </div>
                    </div>

                    {/* Hint Text */}
                    <p className='text-xs text-gray-600 italic font-light pt-2'>
                      Select a chat from sidebar or start new chat
                    </p>
                  </div>
                </div>
              </div>
            ) : chats[currentChatId]?.messages.length === 0 ? (
              // Empty Chat Placeholder
              <div className='flex items-center justify-center h-full'>
                <div className='text-center space-y-6 max-w-2xl mx-auto'>
                  {/* Clean Card Container */}
                  <div className='space-y-4'>
                    {/* Icon */}
                    <div className='flex justify-center'>
                      <div className='text-5xl md:text-6xl'>
                        <Sparkles size={80} className='text-gray-400' />
                      </div>
                    </div>

                    {/* Heading */}
                    <div className='mb-4'>
                      <h2 className='text-3xl md:text-4xl font-bold text-white leading-tight'>
                        How can I help
                        <br />
                        you today?
                      </h2>
                    </div>

                    {/* Subtitle */}
                    <p className='text-base md:text-lg text-gray-400 leading-relaxed font-light'>
                      Ask me anything about coding, AI, Web3, or your projects
                    </p>

                    {/* Quick Suggestions */}
                    <div className='space-y-4 pt-6'>
                      <p className='text-xs text-gray-500 uppercase tracking-widest font-semibold'>
                        Quick Suggestions
                      </p>
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                        <button className='px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 hover:bg-white/10'>
                          <span>💡 Explain LangChain</span>
                        </button>
                        <button className='px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 hover:bg-white/10'>
                          <span>📄 Summarize PDF</span>
                        </button>
                        <button className='px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 hover:bg-white/10'>
                          <span>🐛 Help Debug</span>
                        </button>
                      </div>
                    </div>

                    {/* Hint Text */}
                    <p className='text-sm text-gray-600 italic font-light pt-4'>
                      Start typing below or click a suggestion to get started
                    </p>
                  </div>
                </div>
              </div>
            ) : (

              // Messages Display
              chats[currentChatId]?.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] w-fit rounded-xl px-4 py-3 text-sm md:text-base transition-all duration-200
                      ${message.role === 'user'
                        ? 'rounded-br-none bg-white/10 text-white border border-white/20'
                        : 'rounded-bl-none bg-white/5 text-gray-200 border border-white/10'
                      }`}
                  >
                    {message.role === 'user' ? (
                      <p className='font-medium'>{message.content}</p>
                    ) : (
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className='mb-2 last:mb-0 leading-relaxed text-gray-200'>{children}</p>,
                          ul: ({ children }) => <ul className='mb-2 list-disc pl-5 space-y-1 text-gray-200'>{children}</ul>,
                          ol: ({ children }) => <ol className='mb-2 list-decimal pl-5 space-y-1 text-gray-200'>{children}</ol>,
                          li: ({ children }) => <li className='text-gray-200'>{children}</li>,
                          code: ({ children }) => <code className='rounded bg-black/60 px-2 py-1 text-gray-300 font-mono text-xs border border-white/10'>{children}</code>,
                          pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-lg bg-black/40 p-3 border border-white/10 text-gray-300'>{children}</pre>,
                          a: ({ children, href }) => <a href={href} className='text-gray-300 hover:text-white underline transition-colors'>{children}</a>,
                          blockquote: ({ children }) => <blockquote className='mb-2 border-l-4 border-white/20 pl-3 py-2 text-gray-400 italic'>{children}</blockquote>,
                          h1: ({ children }) => <h1 className='mb-2 text-base font-bold text-white'>{children}</h1>,
                          h2: ({ children }) => <h2 className='mb-2 text-sm font-bold text-white'>{children}</h2>,
                          h3: ({ children }) => <h3 className='mb-2 text-sm font-bold text-white'>{children}</h3>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Footer - Separated Section */}
          <footer className='shrink-0 bg-zinc-950 border-t border-white/10 px-4 py-4 md:px-6 md:py-5'>
            <div className='flex flex-col gap-2 md:gap-3'>

              {/* Message Input Form */}
              <form onSubmit={handleSubmitMessage} className='flex items-center gap-2 md:gap-3'>
                <input
                  type='text'
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder='Type your message...'
                  className='flex-1 rounded-lg px-4 py-2 text-sm md:text-base text-white placeholder:text-gray-600 outline-none
                    bg-white/5
                    border border-white/10 hover:border-white/20 focus:border-white/30
                    transition-all duration-200'
                />
                <button
                  type='submit'
                  disabled={!chatInput.trim()}
                  className='p-2 rounded-lg transition-all duration-200
                    bg-white/10 hover:bg-white/20
                    border border-white/10 hover:border-white/20
                    text-gray-300 hover:text-white
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 disabled:hover:border-white/10'
                  title='Send message'
                >
                  <Send size={20} />
                </button>
              </form>

              {/* PDF Upload UI Layer */}
              <div className='flex items-center gap-2'>
                {/* Hidden File Input */}
                <input
                  type='file'
                  id='pdf-upload'
                  accept='application/pdf'
                  className='hidden'
                />
                
                {/* Upload PDF Button - Icon Style */}
                <label
                  htmlFor='pdf-upload'
                  className='cursor-pointer p-2 rounded-lg transition-all duration-200
                    bg-white/10 hover:bg-white/20
                    border border-white/10 hover:border-white/20
                    text-gray-300 hover:text-white
                    inline-flex items-center gap-1.5 title="Upload PDF"'
                  title='Upload PDF'
                >
                  <File size={20} />
                </label>
              </div>
            </div>
          </footer>
        </section>
      </section>

      {/* Hidden scrollbar styling via tailwind global utility */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  )
}

export default Dashboard