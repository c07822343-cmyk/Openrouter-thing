import create from 'zustand'
import { nanoid } from 'nanoid'

const STORAGE_KEY = 'bananarouter_windows_v1'

const useWindowStore = create((set,get)=>({
  windows: [],
  topZ: 1,
  addWindow: (w)=> set(state=>({windows:[...state.windows, {...{windowId: nanoid(), applicationId:'app', title:'Window', x:40,y:40,width:600,height:360,zIndex: state.topZ+1, minimized:false, maximized:false}, ...w}], topZ: state.topZ+1}), false, 'addWindow'),
  updateWindow: (id, patch)=> set(state=>({windows: state.windows.map(w=> w.windowId===id? {...w, ...patch}:w)})),
  focusWindow: (id)=> set(state=>{
    const top = state.topZ+1
    return {windows: state.windows.map(w=> w.windowId===id? {...w, zIndex: top}: w), topZ: top}
  }),
  openWindowByApp: (appId)=>{
    const existing = get().windows.find(w=>w.applicationId===appId)
    if(existing){ get().focusWindow(existing.windowId); return }
    get().addWindow({applicationId: appId, title: appId==='ai'? 'BananaRouter AI' : appId, x:100,y:80,width:720,height:480})
  },
  removeWindow: (id)=> set(state=>({windows: state.windows.filter(w=> w.windowId!==id)})),
  minimizeWindow: (id)=> set(state=>({windows: state.windows.map(w=> w.windowId===id? {...w, minimized:true}:w)})),
  restoreWindow: (id)=> set(state=>({windows: state.windows.map(w=> w.windowId===id? {...w, minimized:false, maximized:false}:w)})),
  maximizeWindow: (id)=> set(state=>({windows: state.windows.map(w=> w.windowId===id? {...w, maximized:!w.maximized}:w)})),
  persist: ()=>{
    try{
      const toSave = get().windows.map(({windowId, applicationId, title,x,y,width,height,zIndex,minimized,maximized})=>({windowId, applicationId, title,x,y,width,height,zIndex,minimized,maximized}))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    }catch(e){console.warn('persist windows failed', e)}
  },
  load: ()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return
      const parsed = JSON.parse(raw)
      set({windows: parsed})
    }catch(e){console.warn('load windows failed', e)}
  }
}))

export default useWindowStore
