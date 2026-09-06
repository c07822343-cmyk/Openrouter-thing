import React from 'react'
import Window from '../components/Window'
import useToolStore from '../state/toolStore'

export default function ToolsWindow({window}:{window:any}){
  const tools = useToolStore(s=>s.tools)
  const toggle = useToolStore(s=>s.toggle)

  return (
    <Window window={window}>
      <div>
        <div className="text-sm text-neutral-400">Tools</div>
        <div className="mt-3 space-y-2">
          {tools.map(t=> (
            <div key={t.id} className="flex items-center justify-between p-2 border border-neutral-700 rounded">
              <div>
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-neutral-400">{t.description}</div>
              </div>
              <div>
                <button onClick={()=>{toggle(t.id)}} className={`px-2 py-1 rounded ${t.enabled? 'bg-green-600':'bg-neutral-700'}`}>{t.enabled? 'Enabled':'Disabled'}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  )
}
