Uma aplicação web completa para criação e gerenciamento de currículos profissionais, desenvolvida com **React** no frontend e **Node.js** no backend.

---

🚀 **Funcionalidades**

* Criação de currículos profissionais com informações pessoais, experiências, formações e idiomas.
* Interface moderna e responsiva que funciona em desktops, tablets e celulares.
* **CRUD** completo (Criar, Ler, Atualizar, Deletar) de currículos.
* Validações de formulário com feedback em tempo real.
* Máscaras de input para telefone e CEP.
* Design profissional com **Tailwind CSS**.
* Visualização de currículos em formato profissional.

---

🛠️ **Tecnologias Utilizadas**

**Frontend**

* React com Vite
* Tailwind CSS para estilização
* React Router para navegação
* Axios para requisições HTTP
* React Hook Form com Yup para validações
* iMask para máscaras de input
* SweetAlert2 para alertas e notificações
* React Icons para ícones

**Backend**

* Node.js com Express
* Arquivo JSON como banco de dados (db.json)
* API RESTful para operações CRUD



🚀 **Como Executar o Projeto**

**Pré-requisitos**

* Node.js (versão 14 ou superior)
* npm ou yarn

**Passo a passo**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/akivayovkaleo/curriculos](https://github.com/akivayovkaleo/curriculos)
    cd projeto-cv-builder
    ```

2.  **Instale as dependências do backend:**
    ```bash
    cd backend
    npm install
    ```

3.  **Instale as dependências do frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Execute o backend (em um terminal separado):**
    ```bash
    cd backend
    node server.js
    ```
    O backend estará disponível em: `http://localhost:3000`

5.  **Execute o frontend (em outro terminal):**
    ```bash
    cd frontend
    npm run dev
    ```
    O frontend estará disponível em: `http://localhost:3001`

---

📱 **Páginas da Aplicação**

1.  **Página Inicial (`/`)**
    * Apresentação do projeto e estatísticas de currículos.
    * Acesso rápido para criar ou visualizar currículos.
    * Exibição dos currículos recentes.

2.  **Criar/Editar Currículo (`/criar-curriculo`, `/editar-curriculo/:id`)**
    * Formulário completo com validações.
    * Seções: Informações Pessoais, Resumo Profissional, Experiências, Formações e Idiomas.
    * Adicione múltiplos itens em cada seção.
    * Botões de salvar e cancelar.

3.  **Lista de Currículos (`/visualizar-curriculos`)**
    * Listagem de todos os currículos criados.
    * Busca por nome ou cargo.
    * Cards com informações resumidas e botão para criar novo currículo.

4.  **Detalhes do Currículo (`/curriculo/:id`)**
    * Visualização completa do currículo em formato profissional.
    * Botões para editar ou excluir.
    * Layout organizado e profissional.

---

🔧 **Endpoints da API**

* **`GET /api/curriculums`** - Lista todos os currículos.
* **`GET /api/curriculums/:id`** - Obtém um currículo específico.
* **`POST /api/curriculums`** - Cria um novo currículo.
* **`PUT /api/curriculums/:id`** - Atualiza um currículo existente.
* **`DELETE /api/curriculums/:id`** - Deleta um currículo.

---

🎨 **Design e Experiência do Usuário**

* **Responsivo:** Funciona em todos os dispositivos.
* **Intuitivo:** Interface clara e fácil de usar.
* **Feedback visual:** Notificações de sucesso/erro.
* **Carregamento otimizado:** Lazy loading de componentes.
* **Design moderno:** Cores profissionais e layout limpo.

---

📝 **Validações Implementadas**

* **Nome completo:** obrigatório (mínimo 3 caracteres).
* **Email:** válido e obrigatório.
* **Telefone e CEP:** com máscara e validação.
* **Endereço:** campos obrigatórios.
* **Resumo profissional:** máximo de 500 caracteres.
* **Datas:** validação de datas de experiência profissional.
* **Idiomas:** níveis pré-definidos.
