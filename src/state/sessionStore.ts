import create from 'zustand'

type SessionState = {
  messages: any[]
  draft: string
  save: (messages:any[], draft:string)=>void
  load: ()=>{messages:any[], draft:string}
}

const STORAGE_KEY = 'bananarouter_session_default'

const useSessionStore = create<SessionState>((set,get)=>({
  messages: [],
  draft: '',
  save: (messages,draft)=>{
    set({messages,draft})
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify({messages,draft}))
    }catch(e){console.warn('Failed to persist session', e)}
  },
  load: ()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return {messages:[], draft:''}
      const parsed = JSON.parse(raw)
      set({messages: parsed.messages||[], draft: parsed.draft||''})
      return {messages: parsed.messages||[], draft: parsed.draft||''}
    }catch(e){console.warn('Failed to load session', e); return {messages:[], draft:''}}
  }
}))

export default useSessionStore
