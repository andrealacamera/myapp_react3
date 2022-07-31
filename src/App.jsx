
import {Routes, Route} from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Protected from './pages/Protected';

function App() {

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/protected' element={<Protected />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>

  )
}

export default App
