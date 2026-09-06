import React from 'react'
import useWindowStore from '../state/windowStore'

export default function Taskbar(){
  const open = useWindowStore(s=>s.openWindowByApp)
  const uiOpen = require('../state/uiStore').default // avoid circular import in runtime
  return (
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-neutral-800/60 backdrop-blur rounded-md px-3 py-1 flex gap-2 items-center">
      <button onClick={()=>require('../state/uiStore').default.getState().toggleLauncher()} className="px-2 py-1 rounded hover:bg-neutral-700">🍌</button>
      <button onClick={()=>open('ai')} className="px-3 py-1 rounded hover:bg-neutral-700">AI</button>
      <button onClick={()=>open('files')} className="px-3 py-1 rounded hover:bg-neutral-700">Files</button>
      <button onClick={()=>open('tools')} className="px-3 py-1 rounded hover:bg-neutral-700">Tools</button>
      <button onClick={()=>open('mcp')} className="px-3 py-1 rounded hover:bg-neutral-700">MCP</button>
      <button onClick={()=>open('settings')} className="px-3 py-1 rounded hover:bg-neutral-700">Settings</button>
    </div>
  )
}
