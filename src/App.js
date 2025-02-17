import { Routes, Route } from 'react-router';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import Project from './pages/Project';
import Terms from './pages/Terms';
import Rights from './pages/Rights';
import Privacy from './pages/Privacy';
import Use from './pages/Use';
import Instructions from './pages/Instructions';
import Recording from './pages/Recording';

function App() {
  return (
    <div className="flex">
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/project' element={<Project/>}/>
        <Route path='/terms' element={<Terms/>}/>
        <Route path='/instructions' element={<Instructions/>}/>
        <Route path='/rights' element={<Rights/>}/>
        <Route path='/privacy' element={<Privacy/>}/>
        <Route path='/use' element={<Use/>}/>
        <Route path='/recording' element={<Recording/>}/>
      </Routes>
    </div>
  );
}

export default App;
