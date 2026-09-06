import React, { useState } from 'react'
import Window from '../components/Window'
import useSessionStore from '../state/sessionStore'

export default function FilesWindow({window}:{window:any}){
  const [files, setFiles] = useState<any[]>([])
  const attach = useSessionStore(s=>s.attachFile)

  function onDrop(e:React.DragEvent){
    e.preventDefault()
    const dt = e.dataTransfer
    if(!dt) return
    const newFiles = Array.from(dt.files)
    // convert to lightweight metadata and store in memory + session attachments
    newFiles.forEach(f=>{
      const fileObj = {id: Date.now()+Math.random(), name: f.name, size: f.size, type: f.type}
      setFiles(prev=>[fileObj,...prev])
      attach(fileObj)
    })
  }

  return (
    <Window window={window}>
      <div onDragOver={e=>e.preventDefault()} onDrop={onDrop}>
        <div className="text-sm text-neutral-400">Home / Documents / Projects</div>
        <div className="mt-4 text-neutral-300">Drop files here to add to your workspace.</div>
        <div className="mt-4">
          {files.map(f=> (
            <div key={f.id} className="flex items-center justify-between p-2 border-b border-neutral-700">
              <div>{f.name}</div>
              <div className="flex gap-2">
                <button onClick={()=>attach(f)} className="text-sm px-2 py-1 rounded bg-neutral-700">Ask BananaRouter</button>
                <button className="text-sm px-2 py-1 rounded bg-neutral-700">Open</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  )
}
