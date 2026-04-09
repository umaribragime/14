import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:8000'

function App() {
  const [token, setToken] = useState(localStorage.getItem('access') || '')
  const [output, setOutput] = useState('')

  async function register(email, password) {
    const res = await axios.post(`${API}/users/register/`, { email, password })
    localStorage.setItem('access', res.data.access)
    setToken(res.data.access)
    setOutput('Registered and logged in')
  }

  async function login(email, password) {
    const res = await axios.post(`${API}/users/login/`, { email, password })
    localStorage.setItem('access', res.data.access)
    setToken(res.data.access)
    setOutput('Logged in')
  }

  async function getProducts() {
    const res = await axios.get(`${API}/store/products/`)
    setOutput(JSON.stringify(res.data, null, 2))
  }

  async function getCart() {
    const res = await axios.get(`${API}/cart/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setOutput(JSON.stringify(res.data, null, 2))
  }

  async function checkout() {
    const res = await axios.post(`${API}/orders/checkout/`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setOutput(JSON.stringify(res.data, null, 2))
  }

  return (
    <div style={{ padding: 20, fontFamily: 'monospace' }}>
      <h2>fourteen — API tester</h2>

      <div>
        <input id="email" placeholder="email" />
        <input id="password" placeholder="password" type="password" />
        <button onClick={() => register(
          document.getElementById('email').value,
          document.getElementById('password').value
        )}>Register</button>
        <button onClick={() => login(
          document.getElementById('email').value,
          document.getElementById('password').value
        )}>Login</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={getProducts}>Get Products</button>
        <button onClick={getCart}>Get Cart</button>
        <button onClick={checkout}>Checkout</button>
      </div>

      <p>{token ? 'Logged in' : 'Not logged in'}</p>

      <pre style={{ background: '#f4f4f4', padding: 10 }}>{output}</pre>
    </div>
  )
}

export default App