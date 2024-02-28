import { Page } from "./components/Page/Page"
import { Login} from "./components/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/layout" element={<Page/>}/>
      <Route path="*" element={<Login />} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
