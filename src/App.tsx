import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroupPage from "./pages/GroupPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          {/* <Route index element={<GroupPage />} /> */}
          <Route path="*" element={<GroupPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;