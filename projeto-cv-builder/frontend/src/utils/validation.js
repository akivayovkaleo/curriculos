// Funções utilitárias para validação

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateTelefone = (telefone) => {
  // Remove caracteres não numéricos
  const cleaned = telefone.replace(/\D/g, '');
  // Verifica se tem 10 ou 11 dígitos
  return cleaned.length === 10 || cleaned.length === 11;
};

export const validateCEP = (cep) => {
  // Remove caracteres não numéricos
  const cleaned = cep.replace(/\D/g, '');
  // Verifica se tem 8 dígitos
  return cleaned.length === 8;
};