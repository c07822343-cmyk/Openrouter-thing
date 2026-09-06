import React from 'react'
import useWindowStore from '../state/windowStore'

export default function Taskbar(){
  const open = useWindowStore(s=>s.openWindowByApp)
  return (
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-neutral-800/60 backdrop-blur rounded-md px-3 py-1 flex gap-2 items-center">
      <button onClick={()=>open('ai')} className="px-3 py-1 rounded hover:bg-neutral-700">AI</button>
      <button onClick={()=>open('files')} className="px-3 py-1 rounded hover:bg-neutral-700">Files</button>
      <button className="px-3 py-1 rounded hover:bg-neutral-700">Tools</button>
      <button className="px-3 py-1 rounded hover:bg-neutral-700">MCP</button>
      <button className="px-3 py-1 rounded hover:bg-neutral-700">Settings</button>
    </div>
  )
}
