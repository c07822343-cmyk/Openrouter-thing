import React, { useEffect } from 'react'
import useWindowStore from '../state/windowStore'
import Taskbar from './Taskbar'
import AIWindow from '../windows/AIWindow'
import FilesWindow from '../windows/FilesWindow'
import ToolsWindow from '../windows/ToolsWindow'
import MCPWindow from '../windows/MCPWindow'
import Launcher from './Launcher'

export default function WindowManager(){
  const windows = useWindowStore(s=>s.windows)
  const addWindow = useWindowStore(s=>s.addWindow)
  const load = useWindowStore(s=>s.load)
  const persist = useWindowStore(s=>s.persist)

  useEffect(()=>{
    load()
    // ensure AI exists
    if(!windows.find(w=>w.applicationId==='ai')){
      addWindow({applicationId:'ai', title:'BananaRouter AI', width:720, height:480, x:80, y:60})
    }
    // persist on unload
    window.addEventListener('beforeunload', persist)
    return ()=> window.removeEventListener('beforeunload', persist)
  }, [])

  useEffect(()=>{
    // persist windows on change
    const t = setTimeout(()=>persist(), 300)
    return ()=>clearTimeout(t)
  }, [windows])

  return (
    <div className="h-full w-full relative overflow-hidden">
      {windows.map(w=>{
        if(w.applicationId==='ai') return <AIWindow key={w.windowId} window={w} />
        if(w.applicationId==='files') return <FilesWindow key={w.windowId} window={w} />
        if(w.applicationId==='tools') return <ToolsWindow key={w.windowId} window={w} />
        if(w.applicationId==='mcp') return <MCPWindow key={w.windowId} window={w} />
        return null
      })}
      <Taskbar />
      <Launcher />
    </div>
  )
}
