import React, { useEffect, useRef } from 'react';
import styles from './boards.module.scss';
import {
    useCreateBoardMutation,
    useDeleteBoardMutation,
    useGetBoardsQuery,
    useUpdateBoardMutation,
} from './boardsApiSlice';
import Loader from '../../components/Loader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';

const BoardsList = () => {
    const { data, isSuccess, isLoading, isError, error } = useGetBoardsQuery();
    const [updateBoard] = useUpdateBoardMutation();


    // редактирование заметки

    const [isShowTitle, setIsShowTitle] = useState();

    const titleRef = useRef([]);

    const [titleState, setTitleState] = useState('');

    const updateBoardHandler = async (e, board, i) => {
        if (e.key === 'Enter') {
            await updateBoard({
                idBoard: board._id,
                title: titleState,
            });
            setIsShowTitle(false);
        }
    };

    const titleRefHandler = (el, board) => {
        if (el && !titleRef.current.includes(el)) {
            titleRef.current.push(el);
        }
    };

    // проверяем, содержит ли какой-либо из элементов, на которые даны ссылки, элемент, на который был сделан щелчок
    const handlerClickOutside = (event) => {
        const clickedElement = event.target;

        if (!titleRef.current.some((ref) => ref.contains(clickedElement))) {
            setIsShowTitle(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handlerClickOutside, true);
        return () => {
            window.removeEventListener('click', handlerClickOutside, true);
        };
    });

    // фокус на textarea при редактирование
    useEffect(() => {
        if (isShowTitle) {
            titleRef.current.map(
                (el) => el.value === viewMenu.board.title && el.focus()
            );
        }
    }, [isShowTitle]);

    if (isSuccess) {
        content = data.map((board, i) => {
            return (
                <Link
                    key={board._id}
                    to={`${board._id}`}
                    state={{ plates: board.plates }}
                    className={styles.item}
                >
                    <textarea
                        onBlur={() =>
                            titleState !== board.title &&
                            updateBoard({
                                idBoard: board._id,
                                title: titleState,
                            })
                        }
                        ref={titleRefHandler}
                        onChange={(e) => setTitleState(e.target.value)}
                        onKeyDown={(e) => updateBoardHandler(e, board, i)}
                        disabled={
                            !isShowTitle || viewMenu.board?._id !== board?._id
                        }
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        className={`${
                            !isShowTitle || viewMenu.board?._id !== board?._id
                                ? 'cursor-pointer'
                                : ''
                        } bg-transparent resize-none`}
                        value={
                            isShowTitle && viewMenu.board === board
                                ? titleState
                                : board.title
                        }
                    />

                
                </Link>
            );
        });
    }
};

export default BoardsList;
