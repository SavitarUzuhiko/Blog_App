import { Route, Routes } from 'react-router-dom';
import { Auth, HomePage } from './pages';
import { Navbar } from './components';
import { ThemeProvider } from './components/theme/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
