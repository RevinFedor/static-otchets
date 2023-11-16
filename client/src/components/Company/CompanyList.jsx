import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useCreateCompanyMutation,
    useDeleteCompanyMutation,
    useGetCompanyUserQuery,
} from '../../features/company/companyApiSlice';
import Loader from '../Loader';
import { Link } from 'react-router-dom';

import testData from './db';
import { CompanyInput } from './CompanyInput';

export const CompanyList = () => {
    // ! получаем user
    const [status, setStatus] = useState('');
    const user = useSelector((state) => state.auth.user);
    // ! полуение get всех компаний у этого пользователя
    const {
        data: company,
        isSuccess,
        isLoading,
        isError,
        error,
    } = useGetCompanyUserQuery(user._id);
    // ! создание новой организации
    const [companyname, setCompanyname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [createCompany] = useCreateCompanyMutation();
    const [deleteCompany] = useDeleteCompanyMutation();

    //! создание компании и отлов ошибок
    const createCompanyHundler = async ({
        companyname,
        username,
        password,
        userId,
        tables,
    }) => {
        try {
            await createCompany({
                data: {
                    companyname,
                    username,
                    password,
                    userId,
                    tables,
                },
            }).unwrap();
            setStatus('Пользователь успешно создан');
            setCompanyname('');
            setUsername('');
            setPassword('');
        } catch (error) {
            setStatus(error.data.message);
        }
    };

    const deleteCompanyHundler = async (e,companyId) => {
        e.preventDefault();
        e.stopPropagation();
        await deleteCompany({ data: { companyId } });
    };

    let content;
    if (isLoading) {
        content = <Loader />;
    } else if (isError) {
        content = (
            <div className="">
                <h1 className="text-red-600">{status}</h1>
                <CompanyInput
                    companyname={companyname}
                    setCompanyname={setCompanyname}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    createCompany={createCompany}
                    user={user}
                    createCompanyHundler={createCompanyHundler}
                />
                Организаций не дайдено
            </div>
        );
    } else {
        content = (
            <div>
                <h1 className="text-red-600">{status}</h1>
                <CompanyInput
                    companyname={companyname}
                    setCompanyname={setCompanyname}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    createCompany={createCompany}
                    user={user}
                    createCompanyHundler={createCompanyHundler}
                />
                <h3 className=" text-[18px] my-[30px]">
                    Перечень организаций:{' '}
                </h3>
                <div className="flex flex-col">
                    {company.map((item) => {
                        return (
                            <Link
                                to={item.companyname}
                                className="relative mb-[20px] border-company-list"
                            >
                                <button
                                    onClick={(e) =>
                                        deleteCompanyHundler(e,item._id)
                                    }
                                    className="absolute left-[-95px] bottom-[3px]  bg-red-700 rounded-md px-3 py-0.5 mt-5 duration-200 hover:bg-opacity-80 outline-none"
                                >
                                    Удалить
                                </button>

                                {item.companyname}
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }
    return content;
};
