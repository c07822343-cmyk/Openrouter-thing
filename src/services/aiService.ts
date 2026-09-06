const API_BASE = '/api/openrouter'

const aiService = {
  async chatStream(messages:any[]){
    const controller = new AbortController()
    const res = await fetch(API_BASE, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({model: 'openrouter/free', messages}), signal: controller.signal})
    if(!res.body) throw new Error('No response body')
    // return the reader-compatible stream
    const reader = res.body.getReader()
    return {
      getReader: ()=>reader,
      cancel: ()=>controller.abort()
    }
  }
}

export default aiService
