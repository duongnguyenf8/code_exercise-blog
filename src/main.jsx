import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Routes } from 'react-router-dom';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Routes>
      <App />
    </Routes>
  </StrictMode>
);
