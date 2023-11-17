import React, { useEffect, useState } from 'react';
import TableComponent from './TableComponent';
import testData from './Company/db';
import { useUpdateCompanyMutation } from '../features/company/companyApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '../features/company/companySlice';
import { ExportPage } from './ExportPage';

export const TableList = ({ data, isSuccessData }) => {
    // ! добавить в конец массива (название таблицы по ключу) пустую строчку
    const [updateCompany, { isLoading }] = useUpdateCompanyMutation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const companyForm = useSelector((state) => state.company.formData);

    const handleAddRow = async (tableName) => {
        await dispatch(companyActions.setFromAdd(tableName));
    };
    const handleDeleteRow = async (tableName_rowIndex) => {
        await dispatch(companyActions.setFromDelete(tableName_rowIndex));
    };

    console.log(companyForm);
    // Используем useEffect для обработки изменений companyForm если объект не равен нулю, тоесть сработа initForm
    useEffect(() => {
        // Вызываем updateCompany, когда companyForm обновится
        if (companyForm && Object.keys(companyForm).length && isSuccessData) {
            updateCompany({ data: { userId: user._id, tables: companyForm } });
        }
    }, [companyForm]);

    return (
        <div>
            {Object.keys(data).map((tableKey, index) => (
                <div key={index}>
                    <h2 className="text-[#f0f3fd] text-[24px] my-[50px] text-left">
                        {tableKey}
                    </h2>
                    <div className="flex justify-between">
                        {user.companyname && (
                            <button
                                className="bg-[#8b6afd] rounded-md px-3 py-0.5 mt-5 duration-200 hover:bg-opacity-80"
                                onClick={(e) => handleAddRow(tableKey)}
                            >
                                Добавить новую строку
                            </button>
                        )}
                        <ExportPage data={data[tableKey]} />
                    </div>

                    <TableComponent
                        tableData={data[tableKey]}
                        tableName={tableKey}
                        handleDeleteRow={handleDeleteRow}
                        isCompany={user.companyname}
                    />
                </div>
            ))}
        </div>
    );
};
