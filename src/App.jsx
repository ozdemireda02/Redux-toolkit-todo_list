import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CrudPage from './pages/CrudPage';
import Header from './components/Header';

function App() {
  return (
    <>

    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<CrudPage />} />
        </Routes>  
    </BrowserRouter>
      
    </>
  )
}

export default App
