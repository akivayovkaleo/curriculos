import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Kaleo e dudu curriculum</h3>
            <p className="text-gray-400">Crie currículos profissionais em minutos</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Sobre</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contato</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Termos</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Kaleo e dudu curriculum. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;