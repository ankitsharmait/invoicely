import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import AddItem from './components/AddItem';
import GenerateBill from './components/GenerateBill';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-item" element={<AddItem />} />
      <Route path="/generate-bill" element={<GenerateBill />} />
    </Routes>
  );
}
export default App;
