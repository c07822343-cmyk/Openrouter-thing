import create from 'zustand'
import { nanoid } from 'nanoid'

type Win = {
  windowId: string
  applicationId: string
  title: string
  x:number
  y:number
  width:number
  height:number
  zIndex:number
}

const useWindowStore = create((set,get)=>({
  windows: [] as Win[],
  topZ: 1,
  addWindow: (w:Partial<Win>)=> set(state=>({windows:[...state.windows, {...{windowId: nanoid(), applicationId:'app', title:'Window', x:40,y:40,width:600,height:360,zIndex: state.topZ+1}, ...w}], topZ: state.topZ+1})),
  updateWindow: (id:string, patch:Partial<Win>)=> set(state=>({windows: state.windows.map(w=> w.windowId===id? {...w, ...patch}:w)})),
  focusWindow: (id:string)=> set(state=>({windows: state.windows.map(w=> w.windowId===id? {...w, zIndex: state.topZ+1}:w), topZ: state.topZ+1})),
  openWindowByApp: (appId:string)=>{
    const existing = get().windows.find(w=>w.applicationId===appId)
    if(existing) return get().focusWindow(existing.windowId)
    get().addWindow({applicationId: appId, title: appId==='ai'? 'BananaRouter AI' : appId, x:100,y:80,width:720,height:480})
  }
}))

export default useWindowStore
