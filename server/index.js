const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/branding', express.static('public/branding'))

app.post('/api/openrouter', async (req, res) => {
  try{
    const upstream = await fetch('https://api.openrouter.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify(req.body)
    })
    res.status(upstream.status)
    upstream.headers.forEach((v,k)=>res.setHeader(k,v))
    if(!upstream.body) return res.end()
    upstream.body.pipe(res)
  }catch(e){
    res.status(500).json({error: String(e)})
  }
})

app.listen(PORT, ()=>{
  console.log('Server running on', PORT)
})
