import React from 'react'
import useUIStore from '../state/uiStore'
import useWindowStore from '../state/windowStore'

export default function Launcher(){
  const open = useUIStore(s=>s.openLauncher)
  const close = useUIStore(s=>s.closeLauncher)
  const show = useUIStore(s=>s.showLauncher)
  const openApp = useWindowStore(s=>s.openWindowByApp)

  if(!show) return null

  return (
    <div className="absolute inset-0 flex items-start justify-center pt-20">
      <div className="bg-neutral-900 border border-neutral-700 rounded-md p-4 w-[420px] shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg">Launch</div>
          <button onClick={close} aria-label="Close launcher" className="text-sm">Esc</button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <button onClick={()=>{openApp('ai'); close()}} className="text-left px-3 py-2 rounded hover:bg-neutral-800">AI</button>
          <button onClick={()=>{openApp('files'); close()}} className="text-left px-3 py-2 rounded hover:bg-neutral-800">Files</button>
          <button onClick={()=>{openApp('tools'); close()}} className="text-left px-3 py-2 rounded hover:bg-neutral-800">Tools</button>
          <button onClick={()=>{openApp('mcp'); close()}} className="text-left px-3 py-2 rounded hover:bg-neutral-800">MCP</button>
          <button onClick={()=>{openApp('settings'); close()}} className="text-left px-3 py-2 rounded hover:bg-neutral-800">Settings</button>
          <button onClick={()=>{openApp('terminal'); close()}} className="text-left px-3 py-2 rounded hover:bg-neutral-800">Developer</button>
        </div>
      </div>
    </div>
  )
}
