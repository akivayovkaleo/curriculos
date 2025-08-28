import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBriefcase } from 'react-icons/fa';

const CurriculumCard = ({ curriculum }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center text-gray-500 mr-4">
          <FaUser className="text-xl" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{curriculum.nomeCompleto}</h3>
          <p className="text-gray-600 flex items-center mt-1">
            <FaBriefcase className="mr-2 text-blue-500" />
            {curriculum.experiencias && curriculum.experiencias.length > 0 
              ? curriculum.experiencias[0].cargo 
              : 'Cargo nÃ£o informado'}
          </p>
          
          <div className="mt-4">
            <Link 
              to={`/curriculo/${curriculum.id}`} 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Ver detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumCard;