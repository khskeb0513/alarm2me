import './App.css';
import Index from './component/index/Index';
import Header from './component/Header';
import Footer from './component/Footer';
import Spacer from './component/Spacer';
import { AuthProvider } from './service/auth.service';
import React from 'react';

function App() {
  return (
    <AuthProvider
      children={
        <>
          <Header />
          <div className={'content'}>
            <Index />
          </div>
          <Spacer />
          <Footer />
        </>
      }
    />
  );
}

export default App;
