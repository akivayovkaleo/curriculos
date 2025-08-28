import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaList } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
            <span className="bg-blue-600 text-white p-2 rounded mr-2">KD</span>
            Kaleo e dudu curriculum
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <FaHome className="mr-1" /> Início
            </Link>
            <Link to="/criar-curriculo" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <FaPlus className="mr-1" /> Criar Currículo
            </Link>
            <Link to="/visualizar-curriculos" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <FaList className="mr-1" /> Meus Currículos
            </Link>
          </nav>
          
          <button className="md:hidden text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;