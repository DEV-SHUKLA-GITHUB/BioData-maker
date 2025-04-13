// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Template1 from './pages/TemplatePage';
import BiodataForm from './pages/BiodataMaker';
import Homepage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Biodata Maker</Link>
          </li>
          <li>
            <Link to="/template1">Template 1</Link>
          </li>
        </ul>
      </nav> */}

      <Routes>

        <Route path="/" element={<Homepage />} /> 
        <Route path="/biodata" element={<BiodataForm />} /> 
        <Route path="/template" element={<Template1 />} />
      </Routes>
    </Router>
  );
}

export default App;
