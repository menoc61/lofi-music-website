
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import FirstTimeModal from "./components/Model/firstTimeModel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header /> <Home />
            </>
          }
        />
      </Routes>
      <FirstTimeModal />
    </BrowserRouter>
  );
}

export default App;
