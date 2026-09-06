import create from 'zustand'

const STORAGE_KEY = 'bananarouter_tools_v1'

const useToolStore = create((set,get)=>({
  tools: [
    {id:'file.search', name:'File Search', description:'Search workspace files', enabled:true, source:'built-in'},
    {id:'file.read', name:'File Read', description:'Read file contents', enabled:true, source:'built-in'},
    {id:'calculator', name:'Calculator', description:'Evaluate math expressions', enabled:false, source:'built-in'}
  ],
  toggle: (id)=> set(state=>({tools: state.tools.map(t=> t.id===id? {...t, enabled: !t.enabled}: t)})),
  save: ()=>{
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(get().tools)) }catch(e){console.warn('save tools', e)}
  },
  load: ()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return
      set({tools: JSON.parse(raw)})
    }catch(e){console.warn('load tools', e)}
  }
}))

export default useToolStore
