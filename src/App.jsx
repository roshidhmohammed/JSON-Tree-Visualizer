import { BrowserRouter, Route, Routes } from "react-router-dom";

// components
import AppLayout from "./layout/AppLayout";
import JsonEditor from "./components/JsonEditor";
import TreeVisualizer from "./components/TreeVisualizer";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<JsonEditor />} />
            <Route path="/tree-visualizer" element={<TreeVisualizer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
