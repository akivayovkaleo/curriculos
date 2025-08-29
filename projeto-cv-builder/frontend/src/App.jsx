import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy loading das páginas
const LandingPage = lazy(() => import('./pages/LandingPage'));
const FormPage = lazy(() => import('./pages/FormPage'));
const ListPage = lazy(() => import('./pages/ListPage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<div className="flex justify-center items-center h-64">Carregando...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/criar-curriculo" element={<FormPage />} />
              <Route path="/editar-curriculo/:id" element={<FormPage />} />
              <Route path="/visualizar-curriculos" element={<ListPage />} />
              <Route path="/curriculo/:id" element={<DetailPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;