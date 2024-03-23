import { Outlet } from "react-router-dom";
import MainLayout from "./layouts/main";
import "./App.css";

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Outlet/>
      </MainLayout>
    </div>
  );
}

export default App;
