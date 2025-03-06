import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GroupPage from "./pages/GroupPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:groupName" element={<GroupPage />} />
        <Route path="/:groupName/gallery" element={<GroupPage />} />
        <Route path="/:groupName/community" element={<GroupPage />} />
        <Route path="/:groupName/artists" element={<GroupPage />} />
        <Route path="/:groupName/otherinfo" element={<GroupPage />} />
        <Route path="/" element={<Navigate to="/ive" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;