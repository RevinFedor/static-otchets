import React, { useEffect, useRef, useState } from 'react';
import { companyActions } from '../features/company/companySlice';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '../assets/pen-tool.svg?react';
import SaveIcon from '../assets/save.svg?react';
import DeleteIcon from '../assets/delete.svg?react';

const TableComponent = ({
    tableData,
    tableName,
    handleDeleteRow,
    isCompany,
}) => {
    if (!tableData || tableData.length === 0) {
        return <p>No data available.</p>;
    }
    const dispatch = useDispatch();

    //! индекс в строке и в колонке
    const [isShowTitle, setIsShowTitle] = useState();
    const [isShowRow, setIsShowRow] = useState();

    const titleRef = useRef([]);
    const [titleState, setTitleState] = useState('');

    // !проверяем, содержит ли какой-либо из элементов, на которые даны ссылки, элемент, на который был сделан щелчок
    const updateBoardHandler = async (e, columnText, columnIndex) => {
        if (e.key === 'Enter') {
            dispatch(
                companyActions.setFromEdit({
                    tableName,
                    columnName,
                    rowIndex: rowIndex + 1,
                    columnIndex: columnIndex,
                    title: titleState,
                })
            );
            setIsShowTitle(null);
        }
    };

    const titleRefHandler = (el) => {
        if (el && !titleRef.current.includes(el)) {
            titleRef.current.push(el);
        }
    };

    const handlerClickOutside = (event) => {
        const clickedElement = event.target;

        if (!titleRef.current.some((ref) => ref.contains(clickedElement))) {
            setIsShowTitle(null);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handlerClickOutside, true);
        return () => {
            window.removeEventListener('click', handlerClickOutside, true);
        };
    });

    // ! обрабочтики событий
    return (
        <div className=" table_container">
            <div className=" table_block">
                <table className=" table shadow-xl rounded-xl drop-shadow-2xl py-3 px-2">
                    <thead>
                        <tr>
                            {Object.values(tableData[0]).map(
                                (column, columnIndex) => (
                                    <td key={columnIndex}>{column}</td>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody className="relative">
                        {tableData.slice(1).map((row, rowIndex) => (
                            <>
                                {isCompany && (
                                    <button
                                        onClick={(e) => {
                                            handleDeleteRow({
                                                tableName: tableName,
                                                rowIndex: rowIndex + 1,
                                            });
                                        }}
                                        className="absolute z-30 left-[-24px]"
                                    >
                                        <DeleteIcon className="w-[25px] fill-[rgb(220, 38, 38)]" />
                                    </button>
                                )}

                                <tr key={rowIndex}>
                                    {Object.entries(row).map(
                                        (
                                            [columnName, columnText],
                                            columnIndex
                                        ) => (
                                            <td
                                                className="relative"
                                                key={columnIndex}
                                            >
                                                {isCompany && (
                                                    <button
                                                        // className="bg-[#8b6afd] rounded-md px-3 py-0.5 mt-5 duration-200 hover:bg-opacity-80"
                                                        onClick={(e) => {
                                                            setIsShowTitle(
                                                                columnIndex
                                                            );
                                                            setIsShowRow(
                                                                rowIndex
                                                            );
                                                            setTitleState(
                                                                columnText
                                                            );
                                                        }}
                                                    >
                                                        {isShowTitle ===
                                                            columnIndex &&
                                                        isShowRow ===
                                                            rowIndex ? (
                                                            <SaveIcon className="absolute right-5 bottom-3" />
                                                        ) : (
                                                            <EditIcon className="absolute right-5 bottom-3" />
                                                        )}
                                                    </button>
                                                )}
                                                <textarea
                                                    onBlur={() => {
                                                        if (
                                                            isShowTitle ===
                                                                columnIndex &&
                                                            isShowRow ===
                                                                rowIndex
                                                        )
                                                            dispatch(
                                                                companyActions.setFromEdit(
                                                                    {
                                                                        tableName,
                                                                        columnName,
                                                                        rowIndex:
                                                                            rowIndex +
                                                                            1,
                                                                        columnIndex:
                                                                            columnIndex,
                                                                        title: titleState,
                                                                    }
                                                                )
                                                            );
                                                    }}
                                                    ref={titleRefHandler}
                                                    onChange={(e) =>
                                                        setTitleState(
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyDown={(e) =>
                                                        updateBoardHandler(
                                                            e,
                                                            columnText,
                                                            columnIndex
                                                        )
                                                    }
                                                    disabled={
                                                        isShowTitle !==
                                                            columnIndex ||
                                                        isShowRow !== rowIndex
                                                    }
                                                    className={`resize-none bg-transparent outline-none ${
                                                        isShowTitle ===
                                                            columnIndex &&
                                                        isShowRow === rowIndex
                                                            ? 'text-green-400'
                                                            : '  '
                                                    } `}
                                                    type="text"
                                                    value={
                                                        isShowTitle ===
                                                            columnIndex &&
                                                        isShowRow === rowIndex
                                                            ? titleState
                                                            : columnText
                                                    }
                                                />
                                            </td>
                                        )
                                    )}
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableComponent;
