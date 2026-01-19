import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const base =
    "text-sm font-medium transition-colors";
  const active =
    "text-primary underline";
  const inactive =
    "text-slate-500 hover:text-primary";

  const handleInicioClick = () => {
    localStorage.setItem('pokemonPage', '0');
    localStorage.setItem('pokemonSearch', '');
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow px-6 py-3 flex justify-between items-center">
      <h2 className="font-bold text-lg">PokeApp</h2>
      
      {/* Botón hamburguesa para móviles */}
      <button
        className="md:hidden text-slate-500 hover:text-slate-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Menú de navegación */}
      <nav className={`md:flex gap-6 ${isOpen ? 'flex' : 'hidden'} flex-col md:flex-row absolute md:relative top-full md:top-auto left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0`}>
        <Link
          to="/"
          onClick={handleInicioClick}
          className={`${base} ${inactive} block md:inline`}
        >
          Inicio
        </Link>
        <NavLink
          to="/posts"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive} block md:inline`
          }
        >
          Posts
        </NavLink>
        <NavLink
          to="/favoritos"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive} block md:inline`
          }
        >
          Favoritos
        </NavLink>
      </nav>
    </header>
  );
}
