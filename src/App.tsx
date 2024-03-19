import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from './dashboard/DashboardPage';
import PhantomDetailsPage from './phantom-details/PhantomDetailsPage';

function App() {

  return (
    <Routes>
      <Route path='*' element={<Navigate to='/phantoms' />} />
      <Route path="/phantoms" element={<DashboardPage />} />
      <Route path="phantoms/:phantomId" element={<PhantomDetailsPage />} />
    </Routes>
  )
}

export default App
