import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import IMask from 'imask';
import Swal from 'sweetalert2';
import InputField from '../components/InputField';
import TextAreaField from '../components/TextAreaField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import { formatCEP, formatTelefone } from '../utils/format';

// Validação com Yup
const schema = yup.object().shape({
  nomeCompleto: yup.string().required('Nome completo é obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  telefone: yup.string().required('Telefone é obrigatório').min(14, 'Telefone inválido'),
  cep: yup.string().required('CEP é obrigatório').min(9, 'CEP inválido'),
  rua: yup.string().required('Rua é obrigatória'),
  numero: yup.string().required('Número é obrigatório'),
  bairro: yup.string().required('Bairro é obrigatório'),
  cidade: yup.string().required('Cidade é obrigatória'),
  estado: yup.string().required('Estado é obrigatório'),
  resumo: yup.string().max(500, 'Resumo deve ter no máximo 500 caracteres'),
});

const FormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nomeCompleto: '',
      email: '',
      telefone: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      resumo: '',
      experiencias: [{ cargo: '', empresa: '', dataInicio: '', dataFim: '', descricao: '' }],
      formacoes: [{ curso: '', instituicao: '', anoConclusao: '' }],
      idiomas: [{ idioma: '', nivel: '' }]
    }
  });
  
  const [experiencias, setExperiencias] = useState([{ cargo: '', empresa: '', dataInicio: '', dataFim: '', descricao: '' }]);
  const [formacoes, setFormacoes] = useState([{ curso: '', instituicao: '', anoConclusao: '' }]);
  const [idiomas, setIdiomas] = useState([{ idioma: '', nivel: '' }]);
  
  // Aplicar máscaras
  useEffect(() => {
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    
    if (telefoneInput) {
      const telefoneMask = IMask(telefoneInput, {
        mask: '(00) 00000-0000'
      });
      
      telefoneInput.addEventListener('input', () => {
        setValue('telefone', telefoneMask.value);
      });
    }
    
    if (cepInput) {
      const cepMask = IMask(cepInput, {
        mask: '00000-000'
      });
      
      cepInput.addEventListener('input', () => {
        setValue('cep', cepMask.value);
      });
    }
    
    // Limpar máscaras ao desmontar
    return () => {
      if (telefoneInput) {
        const mask = IMask(telefoneInput, { mask: '' });
        mask.destroy();
      }
      if (cepInput) {
        const mask = IMask(cepInput, { mask: '' });
        mask.destroy();
      }
    };
  }, []);
  
  // Carregar dados para edição
  useEffect(() => {
    if (isEditing) {
      const fetchCurriculum = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/curriculums/${id}`);
          const data = response.data;
          
          // Preencher campos principais
          Object.keys(data).forEach(key => {
            if (key !== 'experiencias' && key !== 'formacoes' && key !== 'idiomas') {
              setValue(key, data[key]);
            }
          });
          
          // Preencher experiências
          if (data.experiencias && data.experiencias.length > 0) {
            setExperiencias(data.experiencias);
          }
          
          // Preencher formações
          if (data.formacoes && data.formacoes.length > 0) {
            setFormacoes(data.formacoes);
          }
          
          // Preencher idiomas
          if (data.idiomas && data.idiomas.length > 0) {
            setIdiomas(data.idiomas);
          }
        } catch (error) {
          console.error('Erro ao carregar currículo:', error);
          Swal.fire('Erro', 'Não foi possível carregar o currículo para edição', 'error');
        }
      };
      
      fetchCurriculum();
    }
  }, [id, isEditing, setValue]);
  
  // Atualizar experiências no formulário
  useEffect(() => {
    setValue('experiencias', experiencias);
  }, [experiencias, setValue]);
  
  // Atualizar formações no formulário
  useEffect(() => {
    setValue('formacoes', formacoes);
  }, [formacoes, setValue]);
  
  // Atualizar idiomas no formulário
  useEffect(() => {
    setValue('idiomas', idiomas);
  }, [idiomas, setValue]);
  
  // Manipuladores para experiências
  const addExperiencia = () => {
    setExperiencias([...experiencias, { cargo: '', empresa: '', dataInicio: '', dataFim: '', descricao: '' }]);
  };
  
  const removeExperiencia = (index) => {
    if (experiencias.length > 1) {
      const newExperiencias = [...experiencias];
      newExperiencias.splice(index, 1);
      setExperiencias(newExperiencias);
    }
  };
  
  const updateExperiencia = (index, field, value) => {
    const newExperiencias = [...experiencias];
    newExperiencias[index][field] = value;
    setExperiencias(newExperiencias);
  };
  
  // Manipuladores para formações
  const addFormacao = () => {
    setFormacoes([...formacoes, { curso: '', instituicao: '', anoConclusao: '' }]);
  };
  
  const removeFormacao = (index) => {
    if (formacoes.length > 1) {
      const newFormacoes = [...formacoes];
      newFormacoes.splice(index, 1);
      setFormacoes(newFormacoes);
    }
  };
  
  const updateFormacao = (index, field, value) => {
    const newFormacoes = [...formacoes];
    newFormacoes[index][field] = value;
    setFormacoes(newFormacoes);
  };
  
  // Manipuladores para idiomas
  const addIdioma = () => {
    setIdiomas([...idiomas, { idioma: '', nivel: '' }]);
  };
  
  const removeIdioma = (index) => {
    if (idiomas.length > 1) {
      const newIdiomas = [...idiomas];
      newIdiomas.splice(index, 1);
      setIdiomas(newIdiomas);
    }
  };
  
  const updateIdioma = (index, field, value) => {
    const newIdiomas = [...idiomas];
    newIdiomas[index][field] = value;
    setIdiomas(newIdiomas);
  };
  
  // Submissão do formulário
  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3000/api/curriculums/${id}`, data);
        Swal.fire('Sucesso', 'Currículo atualizado com sucesso!', 'success');
      } else {
        await axios.post('http://localhost:3000/api/curriculums', data);
        Swal.fire('Sucesso', 'Currículo criado com sucesso!', 'success');
      }
      
      navigate('/visualizar-curriculos');
    } catch (error) {
      console.error('Erro ao salvar currículo:', error);
      Swal.fire('Erro', 'Não foi possível salvar o currículo', 'error');
    }
  };
  
  const onCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Editar Currículo' : 'Criar Novo Currículo'}
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Informações Pessoais */}
        <div className="form-section">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Informações Pessoais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Nome Completo"
              name="nomeCompleto"
              register={register}
              error={errors.nomeCompleto?.message}
              placeholder="Digite seu nome completo"
              required
            />
            
            <InputField
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
              placeholder="seu.email@exemplo.com"
              required
            />
            
            <InputField
              label="Telefone"
              name="telefone"
              register={register}
              error={errors.telefone?.message}
              placeholder="(00) 00000-0000"
              required
              id="telefone"
            />
            
            <InputField
              label="CEP"
              name="cep"
              register={register}
              error={errors.cep?.message}
              placeholder="00000-000"
              required
              id="cep"
            />
            
            <InputField
              label="Rua"
              name="rua"
              register={register}
              error={errors.rua?.message}
              placeholder="Nome da rua"
              required
            />
            
            <InputField
              label="Número"
              name="numero"
              register={register}
              error={errors.numero?.message}
              placeholder="Número do endereço"
              required
            />
            
            <InputField
              label="Bairro"
              name="bairro"
              register={register}
              error={errors.bairro?.message}
              placeholder="Bairro"
              required
            />
            
            <InputField
              label="Cidade"
              name="cidade"
              register={register}
              error={errors.cidade?.message}
              placeholder="Cidade"
              required
            />
            
            <InputField
              label="Estado"
              name="estado"
              register={register}
              error={errors.estado?.message}
              placeholder="Estado"
              required
            />
          </div>
        </div>
        
        {/* Resumo Profissional */}
        <div className="form-section">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumo Profissional</h2>
          
          <TextAreaField
            label="Resumo"
            name="resumo"
            register={register}
            error={errors.resumo?.message}
            placeholder="Descreva brevemente sua experiência profissional, habilidades e objetivos..."
            rows={4}
          />
        </div>
        
        {/* Experiência Profissional */}
        <div className="form-section">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Experiência Profissional</h2>
            <Button type="button" onClick={addExperiencia} variant="outline">
              + Adicionar Experiência
            </Button>
          </div>
          
          {experiencias.map((exp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Cargo"
                  value={exp.cargo}
                  onChange={(e) => updateExperiencia(index, 'cargo', e.target.value)}
                  placeholder="Cargo"
                />
                
                <InputField
                  label="Empresa"
                  value={exp.empresa}
                  onChange={(e) => updateExperiencia(index, 'empresa', e.target.value)}
                  placeholder="Nome da empresa"
                />
                
                <InputField
                  label="Data de Início"
                  type="date"
                  value={exp.dataInicio}
                  onChange={(e) => updateExperiencia(index, 'dataInicio', e.target.value)}
                />
                
                <InputField
                  label="Data de Fim"
                  type="date"
                  value={exp.dataFim}
                  onChange={(e) => updateExperiencia(index, 'dataFim', e.target.value)}
                />
              </div>
              
              <TextAreaField
                label="Descrição das Atividades"
                value={exp.descricao}
                onChange={(e) => updateExperiencia(index, 'descricao', e.target.value)}
                placeholder="Descreva suas principais responsabilidades e conquistas..."
                rows={3}
              />
              
              {experiencias.length > 1 && (
                <div className="text-right">
                  <Button 
                    type="button" 
                    variant="danger" 
                    size="sm"
                    onClick={() => removeExperiencia(index)}
                  >
                    Remover Experiência
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Formação Acadêmica */}
        <div className="form-section">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Formação Acadêmica</h2>
            <Button type="button" onClick={addFormacao} variant="outline">
              + Adicionar Formação
            </Button>
          </div>
          
          {formacoes.map((form, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField
                  label="Curso"
                  value={form.curso}
                  onChange={(e) => updateFormacao(index, 'curso', e.target.value)}
                  placeholder="Nome do curso"
                />
                
                <InputField
                  label="Instituição"
                  value={form.instituicao}
                  onChange={(e) => updateFormacao(index, 'instituicao', e.target.value)}
                  placeholder="Nome da instituição"
                />
                
                <InputField
                  label="Ano de Conclusão"
                  value={form.anoConclusao}
                  onChange={(e) => updateFormacao(index, 'anoConclusao', e.target.value)}
                  placeholder="Ano de conclusão"
                />
              </div>
              
              {formacoes.length > 1 && (
                <div className="text-right">
                  <Button 
                    type="button" 
                    variant="danger" 
                    size="sm"
                    onClick={() => removeFormacao(index)}
                  >
                    Remover Formação
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Idiomas */}
        <div className="form-section">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Idiomas</h2>
            <Button type="button" onClick={addIdioma} variant="outline">
              + Adicionar Idioma
            </Button>
          </div>
          
          {idiomas.map((idioma, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField
                label="Idioma"
                value={idioma.idioma}
                onChange={(e) => updateIdioma(index, 'idioma', e.target.value)}
                placeholder="Nome do idioma"
              />
              
              <div className="flex items-end gap-2">
                <SelectField
                  label="Nível"
                  value={idioma.nivel}
                  onChange={(e) => updateIdioma(index, 'nivel', e.target.value)}
                  options={[
                    { value: 'basico', label: 'Básico' },
                    { value: 'intermediario', label: 'Intermediário' },
                    { value: 'avancado', label: 'Avançado' },
                    { value: 'fluente', label: 'Fluente' }
                  ]}
                />
                
                {idiomas.length > 1 && (
                  <Button 
                    type="button" 
                    variant="danger" 
                    size="sm"
                    onClick={() => removeIdioma(index)}
                  >
                    Remover
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Ações */}
        <div className="flex justify-end gap-4 mt-8">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? 'Atualizar Currículo' : 'Salvar Currículo'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;