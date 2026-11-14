import {useState} from "react";

interface InputModalProps {
    title: string;
    placeholder: string;
    isOpen: boolean;
    onSubmit: (value: string) => void;
    onClose: () => void;
}

export function InputModal(
    {title,
    placeholder,
    isOpen,
    onSubmit,
    onClose
    }: InputModalProps){
        const [value, setValue] = useState("");

        // Không mở khi isOpen là false
        if(!isOpen){
            return null;
        }

        // Xử lí nút Submit
        const handleSubmit = () => {
            let trimmedValue = value.trim();
            if(trimmedValue !== ""){
                onSubmit(trimmedValue); 
            }
            setValue("");
        }

        // Xử lí nút Close
        const handleClose = () => {
            setValue("");
            onClose();
        };

        return(
            <>
                <div>
                    <h5>{title}</h5>
                    <input type="text" 
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue(e.target.value)} />
                    <button onClick={handleSubmit}>
                        Submit
                    </button>
                    <button onClick={handleClose}>
                        Close
                    </button>
                </div>
            </>
        );
    }