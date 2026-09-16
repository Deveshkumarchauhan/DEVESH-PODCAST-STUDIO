import React from 'react';import{createRoot}from'react-dom/client';import'./styles.css';import{Director}from'./pages/Director';import{Mobile}from'./pages/Mobile';import{Auth}from'./pages/Auth';
const p=location.pathname;createRoot(document.getElementById('root')!).render(p.startsWith('/mobile')?<Mobile/>:localStorage.getItem('studio_token')?<Director/>:<Auth/>);
