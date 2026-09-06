import create from 'zustand'

const STORAGE_KEY = 'bananarouter_ui_v1'

const useUIStore = create((set,get)=>({
  showLauncher: false,
  toggleLauncher: ()=> set(state=>({showLauncher: !state.showLauncher})),
  openLauncher: ()=> set({showLauncher:true}),
  closeLauncher: ()=> set({showLauncher:false})
}))

export default useUIStore
