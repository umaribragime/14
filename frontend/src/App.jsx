import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="button">Submit</button>
    </div>
  )
}

export default App