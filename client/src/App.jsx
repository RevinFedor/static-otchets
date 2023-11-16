import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import Login from './features/auth/Login';
import SingUp from './features/auth/SingUp';
import Requireauth from './features/auth/RequireAuth';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './features/auth/authSlice';
import { CompanyList } from './components/Company/CompanyList';
import { CompanyItem } from './components/Company/CompanyItem';
import { CompanyThis } from './components/CompanyThis/CompanyThis';

function App() {
    const dispatch = useDispatch();
    // проверка логина
    const user = localStorage.getItem('user');
    if (user) dispatch(setCredentials(JSON.parse(user)));

    return (
        <div className="app">
            <Header />

            <div className="content-page">
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="singup" element={<SingUp />} />
                    {/* protected routes */}
                    <Route element={<Requireauth />}>
                        <Route path="company_list" element={<CompanyList />} />
                        <Route
                            path="company_list/:id"
                            element={<CompanyItem />}
                        />
                        <Route path="company_this" element={<CompanyThis />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
