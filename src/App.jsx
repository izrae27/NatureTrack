
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import ObservationDetails from './pages/ObservationDetails.jsx';
import Favorites from './pages/Favorites.jsx';

import './App.css';

function App() {
  return (
    <>
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/observation/:id"
            element={<ObservationDetails />}
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
