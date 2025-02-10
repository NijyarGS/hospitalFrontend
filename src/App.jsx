import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Unavilable from "./pages/unavilable";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Unavilable />} />
    </Routes>
  );
}

/* 

Patient's Chart
-------------------

Stage 1: Data Structure & UI Design

- Gather Data about how a patient chart is structured
- Search for Medial UI designs for patient charts

Stage 2 : Data 
- create Simple mockup data structure with a mockup api

Stage 3: UI Design Figma (PHONE CENTRIC)
- create Login Page
- Create Patient Chart general Page layout
- Create Patient Chart List
- Create Patient Chart filter design
- Create Patient Chart edit modal design
- Create Patient Chart add cases modal design

Stage 4: Code
- Code.



Day 1 : Login Page & Cases mockup Data & Cases List Design.
Day 2 : Cases List Implementation & Filter Design and implementation.
Day 3 : Add & Edit Cases Modal Design & Implementation.

*/
