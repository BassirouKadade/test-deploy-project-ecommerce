import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Menu from './components/menu/Menu';
import Publier from './components/Publier';
import Modifier from './components/Mod';
import Home from './components/pages/Home';
import ChaussureHomme from './components/pages/homme/ChaussureHomme';
import DetailChaussure from './components/pages/homme/DetailChaussure';
import Panier from './components/pages/homme/Panier';

function App() {
  return (
      <BrowserRouter>
            <Routes>
                 <Route path="/" element={ <Menu/>}>
                       <Route index element={<Home/>}></Route>
                       <Route path="publier" element={<Publier/>}></Route>
                       <Route path="chassure-hommes" element={<ChaussureHomme/>}></Route>
                       <Route path="modifier/:id" element={<Modifier/>}></Route>
                       <Route path="detail/:id" element={<DetailChaussure/>}></Route>
                       <Route path="panier" element={<Panier/>}></Route>
                       
                 </Route>
            </Routes>
       </BrowserRouter>
  );
}

export default App;
