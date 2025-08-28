import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from '../components/Button';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/curriculums/${id}`);
        setCurriculum(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar currículo:', error);
        setLoading(false);
      }
    };

    fetchCurriculum();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/curriculums/${id}`);
        Swal.fire('Deletado!', 'O currículo foi deletado com sucesso.', 'success');
        navigate('/visualizar-curriculos');
      } catch (error) {
        console.error('Erro ao deletar currículo:', error);
        Swal.fire('Erro!', 'Não foi possível deletar o currículo.', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p>Carregando currículo...</p>
        </div>
      </div>
    );
  }

  if (!curriculum) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Currículo não encontrado</h2>
          <p className="text-gray-600 mb-6">O currículo que você está procurando não existe ou foi removido.</p>
          <Link to="/visualizar-curriculos">
            <Button variant="primary">Voltar para a lista</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Detalhes do Currículo</h1>
        
        <div className="flex gap-2">
          <Link to={`/editar-curriculo/${id}`}>
            <Button variant="outline">Editar</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>Excluir</Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl mx-auto">
        {/* Informações Pessoais */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Informações Pessoais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Nome Completo</h3>
              <p className="text-gray-800">{curriculum.nomeCompleto}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700">Email</h3>
              <p className="text-gray-800">{curriculum.email}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700">Telefone</h3>
              <p className="text-gray-800">{curriculum.telefone}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700">Endereço</h3>
              <p className="text-gray-800">
                {curriculum.rua}, {curriculum.numero} - {curriculum.bairro}<br />
                {curriculum.cidade} - {curriculum.estado}, {curriculum.cep}
              </p>
            </div>
          </div>
        </section>
        
        {/* Resumo Profissional */}
        {curriculum.resumo && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Resumo Profissional</h2>
            <p className="text-gray-700 whitespace-pre-line">{curriculum.resumo}</p>
          </section>
        )}
        
        {/* Experiência Profissional */}
        {curriculum.experiencias && curriculum.experiencias.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Experiência Profissional</h2>
            
            <div className="space-y-6">
              {curriculum.experiencias.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-1">
                  <h3 className="text-xl font-semibold text-gray-800">{exp.cargo}</h3>
                  <p className="text-gray-700">{exp.empresa}</p>
                  <p className="text-gray-600 text-sm">
                    {exp.dataInicio} - {exp.dataFim || 'Atual'}
                  </p>
                  {exp.descricao && (
                    <p className="mt-2 text-gray-700 whitespace-pre-line">{exp.descricao}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Formação Acadêmica */}
        {curriculum.formacoes && curriculum.formacoes.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Formação Acadêmica</h2>
            
            <div className="space-y-4">
              {curriculum.formacoes.map((form, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{form.curso}</h3>
                    <p className="text-gray-700">{form.instituicao}</p>
                  </div>
                  <div className="text-gray-600">
                    {form.anoConclusao}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Idiomas */}
        {curriculum.idiomas && curriculum.idiomas.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">Idiomas</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {curriculum.idiomas.map((idioma, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800">{idioma.idioma}</h3>
                  <p className="text-gray-700 capitalize">
                    {idioma.nivel === 'basico' && 'Básico'}
                    {idioma.nivel === 'intermediario' && 'Intermediário'}
                    {idioma.nivel === 'avancado' && 'Avançado'}
                    {idioma.nivel === 'fluente' && 'Fluente'}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/visualizar-curriculos">
          <Button variant="secondary">Voltar para a lista</Button>
        </Link>
      </div>
    </div>
  );
};

export default DetailPage;