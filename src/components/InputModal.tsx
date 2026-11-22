import {useEffect, useState} from "react";

interface InputModalProps {
    title: string;
    placeholder: string;
    isOpen: boolean;
    error?: string;
    onSubmit: (value: string) => void;
    onClose: () => void;
}

export function InputModal(
    {title,
    placeholder,
    isOpen,
    error,
    onSubmit,
    onClose
    }: InputModalProps){
        const [value, setValue] = useState("");

        // Đóng cửa sổ thì xóa chữ đã nhập
        useEffect(() => {
            if(!isOpen){
                setValue("");
            }
        }, [isOpen]);

        // Không mở khi isOpen là false
        if(!isOpen){
            return null;
        }

        // Xử lí nút Submit
        const handleSubmit = (e) => {
            e.preventDefault();
            let trimmedValue = value.trim();
            if(trimmedValue !== ""){
                onSubmit(trimmedValue); 
            }
        }

        // Xử lí nút Close
        const handleClose = () => {
            setValue("");
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
                                <input type="text" className='form-control' autoFocus
                                    placeholder={placeholder}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    onKeyDown={(e) => {if(e.key === "Enter") handleSubmit(e)}} />
                            </div>
                            <div className='modal-footer'>
                                <button className='btn btn-secondary' onClick={handleClose}>
                                    Close
                                </button>
                                <button className='btn btn-primary' onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='modal-backdrop fade show'></div>
            </>
        );
    }