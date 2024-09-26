import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Characters from "./components/Characters";
import CharacterDetail from "./components/Character";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/characters/:characterId" element={<CharacterDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
