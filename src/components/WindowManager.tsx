import React, { useEffect } from 'react'
import useWindowStore from '../state/windowStore'
import Taskbar from './Taskbar'
import AIWindow from '../windows/AIWindow'
import FilesWindow from '../windows/FilesWindow'

export default function WindowManager(){
  const windows = useWindowStore(s=>s.windows)
  const addWindow = useWindowStore(s=>s.addWindow)

  useEffect(()=>{
    // on first mount open AI window if not present
    if(!windows.find(w=>w.applicationId==='ai')){
      addWindow({applicationId:'ai', title:'BananaRouter AI', width:720, height:480, x:80, y:60})
    }
  }, [])

  return (
    <div className="h-full w-full relative overflow-hidden">
      {windows.map(w=>{
        if(w.applicationId==='ai') return <AIWindow key={w.windowId} window={w} />
        if(w.applicationId==='files') return <FilesWindow key={w.windowId} window={w} />
        return null
      })}
      <Taskbar />
    </div>
  )
}
