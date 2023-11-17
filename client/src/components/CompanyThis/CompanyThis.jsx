import React, { useEffect, useLayoutEffect } from 'react';
import { TableList } from '../TableList';
import { useParams } from 'react-router-dom';
import {
    useGetCompanyThisQuery,
    useGetCompanyUserQuery,
} from '../../features/company/companyApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { companyActions } from '../../features/company/companySlice';

export const CompanyThis = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const {
        data: company,
        isSuccess,
        isLoading,
        isError,
        error,
    } = useGetCompanyThisQuery(user._id);

    useEffect(() => {
        console.log(isSuccess);
        if (isSuccess) dispatch(companyActions.setFromInit(company.tables));
    }, [isSuccess]);

    if (isLoading) return <Loader />;
    if (isError) return <div className="">Орг анизаций не дайдено</div>;

    return (
        <div className="block">
            <h1 className="border-this-list text-[24px]">{user.companyname}</h1>
            {company ? (
                <TableList isSuccessData={isSuccess} data={company.tables} />
            ) : (
                <h1>нету</h1>
            )}{' '}
        </div>
    );
};
