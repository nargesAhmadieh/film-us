import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AboutUs from "./pages/AboutUs";
import PageNotFound from "./pages/PageNotFound";
import PageNav from "./components/PageNav";
import MovieDetails from "./pages/MovieDetails";
function App() {
  return (
    <div>
      <BrowserRouter>
        <PageNav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="movies/:id" element={<MovieDetails />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
