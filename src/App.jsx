import { BrowserRouter } from 'react-router-dom';
import Layout from '@/layout';
import Router from '@/routes';
import './assets/styles/styles.scss';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
