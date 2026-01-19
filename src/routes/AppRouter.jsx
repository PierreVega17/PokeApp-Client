import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PokemonDetails from "../pages/PokemonDetail";
import Favoritos from "../pages/Favoritos";
import PostDetail from "../features/posts/Post";
import PostsPage from "../pages/PostPage";
import Navbar from "../components/Navbar";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:name" element={<PokemonDetails />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
        </BrowserRouter>
    );
}