import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./components/Home";
import JsonEditor from "./components/JsonEditor";
import TreeVisualizer from "./components/TreeVisualizer";

function App() {

  return (
    <div className="">
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/json-editor" element={<JsonEditor />} />
              <Route path="/tree-visualizer" element={<TreeVisualizer />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
