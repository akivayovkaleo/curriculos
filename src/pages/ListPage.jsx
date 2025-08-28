import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CurriculumCard from '../components/CurriculumCard';
import Button from '../components/Button';

const ListPage = () => {
  const [curriculums, setCurriculums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredCurriculums = curriculums.filter(curriculum =>
    curriculum.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (curriculum.experiencias && curriculum.experiencias.some(exp => 
      exp.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.empresa.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Meus Currículos</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Buscar currículos..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>
          
          <Link to="/criar-curriculo">
            <Button variant="primary">
              + Novo Currículo
            </Button>
          </Link>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <p>Carregando currículos...</p>
        </div>
      ) : filteredCurriculums.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Nenhum currículo encontrado com os termos da busca.' : 'Você ainda não criou nenhum currículo.'}
          </p>
          {!searchTerm && (
            <Link to="/criar-curriculo">
              <Button variant="primary">
                Criar seu primeiro currículo
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCurriculums.map((curriculum) => (
            <CurriculumCard key={curriculum.id} curriculum={curriculum} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListPage;