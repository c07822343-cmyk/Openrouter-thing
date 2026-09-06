import React from 'react'
import Window from '../components/Window'

export default function MCPWindow({window}:{window:any}){
  return (
    <Window window={window}>
      <div>
        <div className="text-sm text-neutral-400">MCP Servers</div>
        <div className="mt-4 text-neutral-300">No MCP servers configured. Use the Settings to add a server.</div>
      </div>
    </Window>
  )
}
