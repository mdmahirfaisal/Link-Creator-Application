import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Links from './components/Links/Links';
import LinksTypes from './components/LinksTypes/LinksTypes';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Sources from './components/SourcesFile/Sources';
import GlobalStyle from './components/styles/Global.styles';
import Targets from './components/Targets/Targets';

function App() {

  return (
    <div className="App">
      <GlobalStyle />
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/links' element={<Links />} />
        <Route path='/linkTypes' element={<LinksTypes />} />
        <Route path='/sources' element={<Sources />} />
        <Route path='/targets' element={<Targets />} />
      </Routes>
    </div>
  );
}

export default App;
