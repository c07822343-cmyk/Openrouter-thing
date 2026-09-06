import React from 'react'
import Window from '../components/Window'

export default function FilesWindow({window}:{window:any}){
  return (
    <Window window={window}>
      <div>
        <div className="text-sm text-neutral-400">Home / Documents / Projects</div>
        <div className="mt-4 text-neutral-300">No files yet. Drag files here or use the desktop menu.</div>
      </div>
    </Window>
  )
}
