import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../features/auth/authSlice';

const Header = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    const logOutHandler = () => {
        dispatch(logOut());
    };
    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <div className="header__logo">
                        <Link
                            to={
                                !user?.companyname
                                    ? `/company_list`
                                    : `/company_this`
                            }
                        >
                            {!user?.companyname
                                ? 'Мой профиль'
                                : 'Моя компания'}
                        </Link>
                    </div>
                    <div className="header__auth">
                        {user ? (
                            <>
                                <a onClick={logOutHandler}>Выйти</a>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/singup" className="header-active">
                                    Sing Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
