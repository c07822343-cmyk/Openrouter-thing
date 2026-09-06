import React, { useState, useEffect, useRef } from 'react'
import Window from '../components/Window'
import aiService from '../services/aiService'
import useWindowStore from '../state/windowStore'

export default function AIWindow({window}:{window:any}){
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [generating, setGenerating] = useState(false)
  const addWindow = useWindowStore(s=>s.addWindow)

  async function send(){
    if(!input) return
    const userMsg = {role:'user', content: input}
    setMessages(m=>[...m,userMsg])
    setInput('')
    setGenerating(true)
    try{
      const stream = await aiService.chatStream([{role:'system', content:'You are BananaRouter.'}, ...messages, userMsg])
      // simple stream read
      const reader = stream.getReader()
      let text=''
      while(true){
        const {done, value} = await reader.read()
        if(done) break
        text += new TextDecoder().decode(value)
        setMessages(m=>{
          const copy = [...m]
          copy.push({role:'assistant', content:text})
          return copy
        })
      }
    }catch(e){
      setMessages(m=>[...m,{role:'assistant', content:'Error: '+String(e)}])
    }finally{
      setGenerating(false)
    }
  }

  return (
    <Window window={window}>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto space-y-4">
          {messages.length===0 && (
            <div className="text-neutral-400">What do you want to figure out?</div>
          )}
          {messages.map((m,idx)=> (
            <div key={idx} className={m.role==='user'? 'text-right text-sm':'text-left'}>
              <div className={m.role==='user'? 'inline-block bg-neutral-700 px-3 py-1 rounded':'bg-neutral-800 px-3 py-1 rounded'}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter' && !e.shiftKey){e.preventDefault(); send()}}} className="w-full bg-neutral-900 p-2 rounded h-24" placeholder="Ask BananaRouter..." />
          <div className="flex justify-end mt-2">
            <button onClick={send} className="px-3 py-1 bg-yellow-500 text-black rounded">Send ↑</button>
          </div>
        </div>
      </div>
    </Window>
  )
}
