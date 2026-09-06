import create from 'zustand'

const STORAGE_KEY = 'bananarouter_session_v2'

const useSessionStore = create((set,get)=>({
  messages: [],
  draft: '',
  attachments: [],
  save: (messages,draft,attachments)=>{
    set({messages,draft,attachments})
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify({messages,draft,attachments})) }catch(e){console.warn('Failed to persist session', e)}
  },
  load: ()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return {messages:[], draft:'', attachments:[]}
      const parsed = JSON.parse(raw)
      set({messages: parsed.messages||[], draft: parsed.draft||'', attachments: parsed.attachments||[]})
      return {messages: parsed.messages||[], draft: parsed.draft||'', attachments: parsed.attachments||[]}
    }catch(e){console.warn('Failed to load session', e); return {messages:[], draft:'', attachments:[]}}
  },
  attachFile: (file)=> set(state=>({attachments: [file, ...state.attachments]})),
  removeAttachment: (id)=> set(state=>({attachments: state.attachments.filter((f:any)=>f.id!==id)}))
}))

export default useSessionStore
