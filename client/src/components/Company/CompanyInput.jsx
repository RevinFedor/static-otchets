import React from 'react';
import testData from './db';

export const CompanyInput = (props) => {
    const {
        companyname,
        setCompanyname,
        username,
        setUsername,
        password,
        setPassword,
        createCompany,
        user,
        createCompanyHundler,
    } = props;

    return (
        <div>
            <input
                className="text-black bg-[#f0f3fd] border-none outline-none rounded-xl ml-3 px-2 h-9 mr-3"
                type="text"
                value={companyname}
                onChange={(e) => setCompanyname(e.target.value)}
                placeholder="Введите название организации"
            />
            <input
                className="text-black bg-[#f0f3fd] border-none outline-none rounded-xl ml-3 px-2 h-9 mr-3"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите логи"
            />
            <input
                className="text-black bg-[#f0f3fd] border-none outline-none rounded-xl ml-3 px-2 h-9 mr-3"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
            />
            <button
                className="left-[-40px] bg-[#8b6afd] rounded-md px-3 py-0.5 mt-5 duration-200 hover:bg-opacity-80 outline-none h-9 "
                onClick={(e) => {
                    createCompanyHundler({
                        companyname,
                        username,
                        password,
                        userId: user._id,
                        tables: testData,
                    });
                }}
            >
                Cоздать организацию
            </button>
        </div>
    );
};
