import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
    name: 'company',
    initialState: { formData: null },
    reducers: {
        setFromInit: (state, action) => {
            state.formData = action.payload;
        },
        setFromAdd: (state, action) => {
            const tableName = action.payload;
            const newData = { ...state.formData };

            if (newData[tableName] && newData[tableName][0]) {
                const newObject = {};
                // Используем ключи из первого объекта в массиве
                Object.keys(newData[tableName][0]).forEach((key) => {
                    newObject[key] = '';
                });

                // Создаем новый массив, добавляя новый объект
                newData[tableName] = [...newData[tableName], newObject];
            }

            state.formData = newData;
        },
        setFromDelete: (state, action) => {
            const { tableName, rowIndex } = action.payload;
            const newData = { ...state.formData };
            console.log(action.payload);
            if (newData[tableName] && newData[tableName][rowIndex]) {
                // Удаляем массив по индексу строки
                newData[tableName].splice(rowIndex, 1);
            }

            state.formData = newData;
        },
        setFromEdit: (state, action) => {
            const { tableName, columnName, rowIndex, columnIndex, title } =
                action.payload;
            const newData = { ...state.formData };

            if (newData[tableName] && newData[tableName][rowIndex]) {
                // Обновляем значение конкретной ячейки
                newData[tableName][rowIndex][columnName] = title;
            }

            state.formData = newData;
        },
    },
});

export const { reducer: companyReducer } = companySlice;
export const { actions: companyActions } = companySlice;
