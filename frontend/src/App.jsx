function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>
}

function App() {
  return (
    <div>
      <Greeting name="Umar" />
      <Greeting name="World" />
    </div>
  )
}

export default App