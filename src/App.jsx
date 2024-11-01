import { useContext } from 'react'
import './App.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import CustomRoutes from './routes'
import LoginRoutes from './routes/LoginRoutes'
import { Context } from './context/Conext'

function App() {
  const { token } = useContext(Context)

  if (token) {
    return <LoginRoutes />
  } else {
    return (
      <div>
        <Header />
        <div className='flex '>
          <Navbar />
          <div className='w-[78%] h-[89vh]'>
            <CustomRoutes />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
