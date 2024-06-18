import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { ColorModeScript } from '@chakra-ui/react'
import { ChakraProvider , theme} from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
  </React.StrictMode>,
)
