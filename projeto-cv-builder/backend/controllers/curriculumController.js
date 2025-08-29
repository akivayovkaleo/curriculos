const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');

// Função para ler dados do arquivo
const readData = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

// Função para escrever dados no arquivo
const writeData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Obter todos os currículos
const getAllCurriculums = (req, res) => {
  try {
    const data = readData();
    res.status(200).json(data.curriculums);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar currículos', error: error.message });
  }
};

// Obter currículo por ID
const getCurriculumById = (req, res) => {
  try {
    const { id } = req.params;
    const data = readData();
    const curriculum = data.curriculums.find(c => c.id === parseInt(id));
    
    if (!curriculum) {
      return res.status(404).json({ message: 'Currículo não encontrado' });
    }
    
    res.status(200).json(curriculum);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar currículo', error: error.message });
  }
};

// Criar novo currículo
const createCurriculum = (req, res) => {
  try {
    const data = readData();
    const newCurriculum = {
      id: data.curriculums.length > 0 ? Math.max(...data.curriculums.map(c => c.id)) + 1 : 1,
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    data.curriculums.push(newCurriculum);
    writeData(data);
    
    res.status(201).json(newCurriculum);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar currículo', error: error.message });
  }
};

// Atualizar currículo
const updateCurriculum = (req, res) => {
  try {
    const { id } = req.params;
    const data = readData();
    const curriculumIndex = data.curriculums.findIndex(c => c.id === parseInt(id));
    
    if (curriculumIndex === -1) {
      return res.status(404).json({ message: 'Currículo não encontrado' });
    }
    
    data.curriculums[curriculumIndex] = {
      ...data.curriculums[curriculumIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    writeData(data);
    res.status(200).json(data.curriculums[curriculumIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar currículo', error: error.message });
  }
};

// Deletar currículo
const deleteCurriculum = (req, res) => {
  try {
    const { id } = req.params;
    const data = readData();
    const curriculumIndex = data.curriculums.findIndex(c => c.id === parseInt(id));
    
    if (curriculumIndex === -1) {
      return res.status(404).json({ message: 'Currículo não encontrado' });
    }
    
    data.curriculums.splice(curriculumIndex, 1);
    writeData(data);
    
    res.status(200).json({ message: 'Currículo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar currículo', error: error.message });
  }
};

module.exports = {
  getAllCurriculums,
  getCurriculumById,
  createCurriculum,
  updateCurriculum,
  deleteCurriculum
};