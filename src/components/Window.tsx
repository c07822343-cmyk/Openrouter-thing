import React, { useRef } from 'react'
import useWindowStore from '../state/windowStore'

export default function Window({window, children}:{window:any, children?:React.ReactNode}){
  const update = useWindowStore(s=>s.updateWindow)
  const focus = useWindowStore(s=>s.focusWindow)
  const remove = useWindowStore(s=>s.removeWindow)
  const minimize = useWindowStore(s=>s.minimizeWindow)
  const maximize = useWindowStore(s=>s.maximizeWindow)
  const ref = useRef<HTMLDivElement|null>(null)
  const dragging = useRef(false)
  const offset = useRef({x:0,y:0})

  function onMouseDown(e:React.MouseEvent){
    e.stopPropagation();
    focus(window.windowId)
    dragging.current=true
    const rect = ref.current!.getBoundingClientRect()
    offset.current = {x: e.clientX-rect.left, y: e.clientY-rect.top}
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }
  function onMouseMove(e:MouseEvent){
    if(!dragging.current) return
    update(window.windowId, {x: e.clientX-offset.current.x, y: e.clientY-offset.current.y})
  }
  function onMouseUp(){
    dragging.current=false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  if(window.minimized) return null

  const style:any = {left:window.x, top:window.y, width: window.maximized? '100%': window.width, height: window.maximized? '100%': window.height, zIndex: window.zIndex}

  return (
    <div ref={ref} className="absolute bg-neutral-800 border border-neutral-700 rounded-sm shadow-lg" style={style}>
      <div className="flex items-center gap-2 px-2 py-1 bg-neutral-900 cursor-move" onMouseDown={onMouseDown}>
        <img src="/branding/banana-router-icon.png" alt="icon" className="h-4 w-4" />
        <div className="text-sm">{window.title}</div>
        <div className="ml-auto flex gap-1">
          <button onClick={()=>minimize(window.windowId)} className="w-6 h-6 text-xs">_</button>
          <button onClick={()=>maximize(window.windowId)} className="w-6 h-6 text-xs">□</button>
          <button onClick={()=>remove(window.windowId)} className="w-6 h-6 text-xs">×</button>
        </div>
      </div>
      <div className="p-3 h-[calc(100%-34px)] overflow-auto">
        {children}
      </div>
    </div>
  )
}
