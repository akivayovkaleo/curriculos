import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CurriculumCard from '../components/CurriculumCard';
import { FaFileAlt, FaUsers, FaChartBar } from 'react-icons/fa';

const LandingPage = () => {
  const [curriculums, setCurriculums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/curriculums');
        setCurriculums(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar currículos:', error);
        setLoading(false);
      }
    };

    fetchCurriculums();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Crie seu currículo profissional em minutos
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Com nosso criador de currículos Kaleo e dudu, você pode criar, editar e compartilhar seu currículo de forma rápida e profissional.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/criar-curriculo" className="btn-primary px-8 py-3 text-lg">
            Criar Meu Currículo
          </Link>
          <Link to="/visualizar-curriculos" className="btn-secondary px-8 py-3 text-lg">
            Visualizar Currículos
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-blue-600 text-4xl mb-4 flex justify-center">
              <FaFileAlt />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {curriculums.length}
            </h3>
            <p className="text-gray-600">Currículos Criados</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-green-600 text-4xl mb-4 flex justify-center">
              <FaUsers />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {curriculums.filter(c => c.experiencias && c.experiencias.length > 0).length}
            </h3>
            <p className="text-gray-600">Profissionais</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-purple-600 text-4xl mb-4 flex justify-center">
              <FaChartBar />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">100%</h3>
            <p className="text-gray-600">Satisfação</p>
          </div>
        </div>
      </section>

      {/* Recent Curriculums Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Currículos Recentes
        </h2>
        
        {loading ? (
          <div className="text-center py-12">
            <p>Carregando currículos...</p>
          </div>
        ) : curriculums.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhum currículo criado ainda.</p>
            <Link to="/criar-curriculo" className="text-blue-600 hover:underline mt-4 inline-block">
              Crie seu primeiro currículo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculums.slice(0, 3).map((curriculum) => (
              <CurriculumCard key={curriculum.id} curriculum={curriculum} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
        <h2 className="text-3xl font-bold mb-4">Pronto para criar seu currículo?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Junte-se a milhares de profissionais que já criaram currículos incríveis com nossa plataforma.
        </p>
        <Link to="/criar-curriculo" className="bg-white text-blue-600 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors">
          Começar Agora
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;