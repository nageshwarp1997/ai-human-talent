import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

function App() {
  const [count, setCount] = useState(0)
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
