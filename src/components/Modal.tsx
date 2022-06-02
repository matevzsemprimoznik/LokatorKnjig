import React, {ChangeEvent, FC, FormEvent, ReactNode, useState} from 'react';
import ReactDOM from "react-dom";
import "../styles/Submit_Modal/Modal.css";

type ModalPropsType = {
    open: boolean,
    onClose: () => void,
    saveToJson: Function,
}


interface SaveElement {
    label: string,
    floor: number
}

const Modal: FC<ModalPropsType> = ({onClose, open, saveToJson}) => {
    const [saveElement, setSaveElement] = useState<SaveElement>({
        label: "",
        floor: 0,
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveToJson(saveElement.label, saveElement.floor, document.getElementById("canvas"));
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setSaveElement({...saveElement, [name]: value});

    }

    if (!open) return null;

    return ReactDOM.createPortal(
        <>
            <div className="OVERLAY_STYLES"/>
            <div className="MODAL_STYLES">
                <div className="top_row">
                    <h3 style={{color: "#6965db"}}>Shrani model</h3>
                    <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 352 512" className="close_modal" onClick={onClose}>
                        <path fill="currentColor"
                              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                    </svg>
                </div>
                <form onSubmit={handleSubmit} className="modal_form">
                    <div className="modal_inputContainer">
                        <label htmlFor='label'>Knjižnica: </label>
                        <input name="label" id="label" type="text" required
                               value={saveElement.label}
                               onChange={handleChange}/>
                    </div>
                    <div className="modal_inputContainer">
                        <label htmlFor='label'>Nadstropje: </label>
                        <input name="floor" id="floor" type="number" min="0"
                               value={saveElement.floor}
                               onChange={handleChange}/>
                    </div>
                    <div className="modal_buttonContainer">
                        <button onClick={onClose}>Prekliči</button>
                        <button type="submit">Shrani</button>
                    </div>
                </form>
            </div>
        </>,
        document.getElementById('portal') as HTMLElement
    );
};

export default Modal;