import React, { useState, useEffect, useRef } from 'react'
import Window from '../components/Window'
import aiService from '../services/aiService'
import useWindowStore from '../state/windowStore'
import useSessionStore from '../state/sessionStore'

export default function AIWindow({window}:{window:any}){
  const saved = useSessionStore(s=>s.load)()
  const [messages, setMessages] = useState<any[]>(saved.messages || [])
  const [input, setInput] = useState(saved.draft || '')
  const [generating, setGenerating] = useState(false)
  const currentCancelRef = useRef<(()=>void)|null>(null)
  const attachments = useSessionStore(s=>s.attachments)
  const attach = useSessionStore(s=>s.attachFile)
  const removeAttachment = useSessionStore(s=>s.removeAttachment)

  useEffect(()=>{
    // autosave on changes
    const timeout = setTimeout(()=>{
      useSessionStore.getState().save(messages, input, attachments)
    }, 400)
    return ()=>clearTimeout(timeout)
  }, [messages, input, attachments])

  async function send(){
    if(!input) return
    const userMsg = {role:'user', content: input}
    setMessages(m=>[...m,userMsg])
    setInput('')
    setGenerating(true)

    try{
      // include minimal metadata about attachments in the system prompt
      const contextNote = attachments.length? `Attached files: ${attachments.map(a=>a.name).join(', ')}` : ''
      const stream = await aiService.chatStream([{role:'system', content:`You are BananaRouter. ${contextNote}`}, ...messages, userMsg])
      currentCancelRef.current = stream.cancel
      const reader = stream.getReader()
      let assistantText = ''
      // create a placeholder assistant message
      setMessages(m=>[...m, {role:'assistant', content: ''}])
      while(true){
        const {done, value} = await reader.read()
        if(done) break
        const chunk = new TextDecoder().decode(value)
        assistantText += chunk
        setMessages(prev=>{
          const copy = [...prev]
          for(let i=copy.length-1;i>=0;i--){ if(copy[i].role==='assistant'){ copy[i] = {role:'assistant', content: assistantText}; break }}
          return copy
        })
      }
    }catch(e:any){
      setMessages(m=>[...m,{role:'assistant', content: 'Error: '+String(e)}])
    }finally{
      setGenerating(false)
      currentCancelRef.current = null
    }
  }

  function stop(){
    if(currentCancelRef.current){
      currentCancelRef.current()
      currentCancelRef.current = null
      setGenerating(false)
    }
  }

  function onDrop(e:React.DragEvent){
    e.preventDefault()
    const dt = e.dataTransfer
    if(!dt) return
    const newFiles = Array.from(dt.files)
    newFiles.forEach(f=>{
      const fileObj = {id: Date.now()+Math.random(), name: f.name, size: f.size, type: f.type}
      attach(fileObj)
    })
  }

  return (
    <Window window={window}>
      <div className="flex flex-col h-full" onDragOver={e=>e.preventDefault()} onDrop={onDrop}>
        <div className="flex-1 overflow-auto space-y-4 pr-4">
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
          <div className="flex gap-2 mb-2">
            {attachments.map((a:any)=> (
              <div key={a.id} className="bg-neutral-700 px-2 py-1 rounded flex items-center gap-2">
                <div className="text-sm">📄 {a.name}</div>
                <button onClick={()=>removeAttachment(a.id)} className="text-xs text-neutral-200">✕</button>
              </div>
            ))}
          </div>
          <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter' && !e.shiftKey){e.preventDefault(); send()}}} className="w-full bg-neutral-900 p-2 rounded h-24" placeholder="Ask BananaRouter..." />
          <div className="flex justify-between mt-2">
            <div className="flex gap-2">
              <button onClick={()=>{/* attach stub */}} className="px-3 py-1 bg-neutral-700 rounded">+ Attach</button>
              <button onClick={()=>{/* tools stub */}} className="px-3 py-1 bg-neutral-700 rounded">Tools</button>
            </div>
            <div className="flex gap-2">
              {generating ? (
                <button onClick={stop} className="px-3 py-1 bg-red-600 rounded">Stop</button>
              ) : (
                <button onClick={send} className="px-3 py-1 bg-yellow-500 text-black rounded">Send ↑</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Window>
  )
}
