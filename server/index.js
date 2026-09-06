const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/branding', express.static('public/branding'))

app.post('/api/openrouter', async (req, res) => {
  // Proxy to OpenRouter with cancellation support.
  // Frontend may abort the request (client disconnect) — honor it and abort the upstream fetch.
  const controller = new AbortController()
  const signal = controller.signal

  // If client disconnects, abort upstream
  req.on('close', () => {
    controller.abort()
  })

  try{
    const upstream = await fetch('https://api.openrouter.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify(req.body),
      signal
    })

    // forward status
    res.status(upstream.status)

    // copy a subset of headers that are safe to forward
    const safeHeaders = ['content-type']
    safeHeaders.forEach(h => {
      const v = upstream.headers.get(h)
      if (v) res.setHeader(h, v)
    })

    if(!upstream.body) return res.end()

    // pipe the upstream body to the client response
    const reader = upstream.body.getReader()
    const encoder = new TextEncoder()

    // stream chunks manually so we can handle aborts
    async function pump(){
      try{
        while(true){
          const {done, value} = await reader.read()
          if(done) break
          // write chunk
          res.write(value)
        }
        res.end()
      }catch(e){
        // upstream aborted or error — end response quietly
        try{ res.end() }catch(_){}
      }
    }

    pump()

  }catch(e){
    if (e.name === 'AbortError'){
      // upstream aborted
      try{ res.status(499).end() }catch(_){}
      return
    }
    console.error('Proxy error', e)
    res.status(500).json({error: String(e)})
  }
})

app.listen(PORT, ()=>{
  console.log('Server running on', PORT)
})
