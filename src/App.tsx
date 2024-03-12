import FormInput from "./components/Fragments/FormInput"
import History from "./components/Fragments/History"

function App() {

  return (
    <div className="flex flex-row justify-center p-6 bg-green-100 rounded">
      <History/>
      <FormInput/>
    </div>
  )
}

export default App
