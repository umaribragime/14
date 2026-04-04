import { useState } from 'react'
import axios from 'axios'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit() {
    console.log('Sending:', { email, password })
    try {
      const response = await axios.post('http://localhost:8000/api/users/register/', {
      email, 
      password,
    })
    console.log('Success:', response.data)
  } catch (error) {
      console.error('Error:', error)
    }
  }

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
      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App