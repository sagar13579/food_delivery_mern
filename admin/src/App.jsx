import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
// import { Route, Routes } from 'react-router-dom'
// import Add from './pages/Add/Add'
// import List from './pages/List/List'
// import Orders from './pages/Orders/Orders'
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Analytics from './pages/Analytics/Analytics'
// import ProtectedAdminRoute from './components/ProtectedAdminRoute'
// import Unauthorized from './components/Unauthorized'

const App = () => {
  return (
    <div className='app'>
      {/* <ToastContainer/> */}
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        {/* <Routes>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<ProtectedAdminRoute/>}>
          <Route path="/add" element={<Add/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/analytics" element={<Analytics/>}/>
          </Route>
        </Routes> */}
      </div>
    </div>
  )
}

export default App
