import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <div className="flex items-center justify-center min-h-screen">
    <App />
  </div>
);
