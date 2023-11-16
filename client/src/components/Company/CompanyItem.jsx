import React from 'react';
import { TableList } from '../TableList';
import { useParams } from 'react-router-dom';
import { useGetCompanyUserQuery } from '../../features/company/companyApiSlice';
import { useSelector } from 'react-redux';
import Loader from '../Loader';

export const CompanyItem = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.auth.user);

    // !получаем все компании пользователя
    const {
        data: company,
        isSuccess,
        isLoading,
        isError,
        error,
    } = useGetCompanyUserQuery(user._id);

    if (isLoading) return <Loader />;
    if (isError) return <div className="">Организаций не дайдено</div>;

    //! получаем кокретную компанию пользоваетля
    const data = company.filter((el) => el.companyname === id)[0];

    // console.log('company');
    // console.log(company);
    // console.log('data');
    // console.log(data);

    return (
        <div className="block">
            <div className="flex flex-row  w-fit border-l pl-4 border-[#8b6afd]">
                <div className="flex-1 mr-[20px]">
                    <h1 className=" w-max ">Имя компании:</h1>
                    <h1 className=" w-max">Логин:</h1>
                    <h1 className=" w-max">Пароль:</h1>
                </div>
                <div className="flex-1">
                    <h1 className=" w-max">{data.companyname}</h1>
                    <h1 className=" w-max">{data.username}</h1>
                    <h1 className=" w-max">{data.password}</h1>
                </div>
            </div>
            {data ? <TableList data={data.tables} /> : <h1>нету</h1>}{' '}
        </div>
    );
};
