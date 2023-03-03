import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ShopBasket from '../pages/ShopBasket';
import SignUp from '../pages/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="shop" element={<ShopBasket />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
