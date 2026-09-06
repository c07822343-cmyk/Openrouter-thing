import React, { useEffect } from 'react'
import WindowManager from './components/WindowManager'
import useUIStore from './state/uiStore'

export default function App(){
  const openLauncher = useUIStore(s=>s.openLauncher)
  useEffect(()=>{
    function onKey(e:KeyboardEvent){
      if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==='k'){
        e.preventDefault(); openLauncher()
      }
      if((e.ctrlKey || e.metaKey) && e.code==='Space'){
        e.preventDefault(); openLauncher()
      }
    }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="h-screen w-screen bg-neutral-900 text-neutral-100">
      <WindowManager />
    </div>
  )
}
