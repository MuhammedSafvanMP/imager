import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Search from "./components/search/Search"
import AppRoute from "./routes/AppRoute"

function App() {
  return (
   <>
    <Navbar />   
    <AppRoute />
    <Footer />
   </>
  )
}

export default App
