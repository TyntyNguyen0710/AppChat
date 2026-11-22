import {useEffect, useState} from "react";

interface ConfirmProps {
    title: string;
    message: string;
    isOpen: boolean;
    error?: string;
    onSubmit: () => void;
    onClose: () => void;
}

export function ConfirmModal(
    {title,
    message,
    isOpen,
    error,
    onSubmit,
    onClose
    }: ConfirmProps){
        // Không mở khi isOpen là false
        if(!isOpen){
            return null;
        }

        // Xử lí nút Submit
        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit();
        }

        // Xử lí nút Close
        const handleClose = () => {
            onClose();
        };

        return(
            <>
                <div className='modal fade show d-block' tabIndex={-1}>
                    <div className='modal-dialog modal-dialog-centered'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>{title}</h5>
                                <button type='button' className='btn-close' onClick={handleClose}></button>
                            </div>
                            <div className='modal-body'>
                                {error && <div className='alert alert-danger'>{error}</div>}
                                <p>{message}</p>
                            </div>
                            <div className='modal-footer'>
                                <button className='btn btn-secondary' onClick={handleClose}>
                                    Hủy
                                </button>
                                <button className='btn btn-primary' onClick={handleSubmit}>
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='modal-backdrop fade show'></div>
            </>
        )
    }