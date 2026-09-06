### What changed

- Added session persistence (src/state/sessionStore.ts) which saves messages and draft to localStorage.
- AI window (src/windows/AIWindow.tsx) updated: autosave draft/messages, streaming append, and Stop button to cancel active generation.

### How streaming cancellation works
- The frontend requests a stream from /api/openrouter and receives a ReadableStream reader plus a cancel function that aborts the fetch (implemented in aiService).
- The Stop button calls the cancel function; the streaming loop exits and the UI marks generation stopped.

