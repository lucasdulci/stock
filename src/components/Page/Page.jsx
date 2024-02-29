import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Header } from "../Layout/Header"
import { StockInput } from "../Layout/StockInput"
import { StockOutPut } from "../Layout/StockOutPut"
import noiseDark from "../../assets/noise-dark.jpg"
import noiseLight from "../../assets/noise-light.jpg"



export const Page = () => {
  const [controlador, setControlador] = useState([])
  const [cambiar, setCambiar] = useState({})

  const navigate = useNavigate() 

  useEffect(() => {
    const obtenerLS = () => {
      const controladorLS = JSON.parse(localStorage.getItem('controlador')) ?? []
      console.log(controladorLS)
      setControlador(controladorLS)
    }
    obtenerLS()
  }, [])

  useEffect(() => {
    localStorage.setItem('controlador', JSON.stringify(controlador))
  }, [controlador])


  const eliminarProducto = (id) => {
    const stockActualizado = controlador.filter(stock => stock.id !== id)

    setControlador(stockActualizado)

  }

  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }

    return "light"
  })

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    document.querySelector('body').classList.toggle('dark')
  }

  const handleExit = () => {
    navigate('/login')
  }

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector('body').classList.add('dark')
    } else {
      document.querySelector('body').classList.remove('dark')
    }
  }, [theme])

  return (


    <div className={`w-full  min-h-screen pt-14 ${theme === "dark" ? "dark" : ""}`} style={{ backgroundImage: `url(${theme === "dark" ? noiseDark : noiseLight})`, backgroundSize: "200px" }}
    >
      <div className='flex justify-between pr-10 pb-12 lg:-mt-10  '>
        <button className="pl-8 hover:scale-110 hover:-translate-y-1"
        onClick={handleExit}>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout-2" width="28" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
            <path d="M15 12h-12l3 -3" />
            <path d="M6 15l-3 -3" />
          </svg>
        </button>
        <button className="hover:scale-110 hover:-translate-y-1"
         onClick={handleChangeTheme}>
          <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_6427_1821)">
              <path d="M11.663 17H16.336M14 3V4M20.364 5.636L19.657 6.343M23 12H22M6 12H5M8.343 6.343L7.636 5.636M10.464 15.536C9.76487 14.8367 9.2888 13.9458 9.09598 12.9759C8.90316 12.006 9.00225 11.0008 9.38073 10.0872C9.75921 9.17366 10.4001 8.39284 11.2223 7.84349C12.0445 7.29414 13.0111 7.00093 14 7.00093C14.9889 7.00093 15.9555 7.29414 16.7777 7.84349C17.5999 8.39284 18.2408 9.17366 18.6193 10.0872C18.9977 11.0008 19.0968 12.006 18.904 12.9759C18.7112 13.9458 18.2351 14.8367 17.536 15.536L16.988 16.083C16.6747 16.3963 16.4262 16.7683 16.2567 17.1777C16.0872 17.5871 15.9999 18.0259 16 18.469V19C16 19.5304 15.7893 20.0391 15.4142 20.4142C15.0391 20.7893 14.5304 21 14 21C13.4696 21 12.9609 20.7893 12.5858 20.4142C12.2107 20.0391 12 19.5304 12 19V18.469C12 17.574 11.644 16.715 11.012 16.083L10.464 15.536Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
              <filter id="filter0_d_6427_1821" x="-2" y="0" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6427_1821" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6427_1821" result="shape" />
              </filter>
            </defs>
          </svg>

        </button>
      </div>
      <div className='-mt-12'>
        <Header />

      </div>
      <div className="mt-8  md:flex container">
        <StockInput
          controlador={controlador}
          setControlador={setControlador}
          handleChangeTheme={handleChangeTheme}
          cambiar={cambiar}
          setCambiar={setCambiar}
        />
        <StockOutPut
          setCambiar={setCambiar}
          controlador={controlador}
          handleChangeTheme={handleChangeTheme}
          eliminarProducto={eliminarProducto} />
      </div>
    </div>
  )
}
