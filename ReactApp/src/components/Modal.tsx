import React, {ChangeEvent, FC, FormEvent, ReactNode, useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {useLocation} from 'react-router-dom';
import "../styles/Modal/Modal.css";

type ModalPropsType = {
    open: boolean,
    onClose: () => void,
    saveToJson?: Function,
}


interface SaveRoom {
    label: string,
    floor: number
}

interface SaveLibrary {
    section: string,
    abbreviation: string,
    desc: string,
}

enum ModalType {
    ADD_FLOOR_PLAN = "ADD_FLOOR_PLAN",
    DEFAULT = "DEFAULT"
}

const Modal: FC<ModalPropsType> = ({onClose, open, saveToJson}) => {
    const [saveElement, setSaveElement] = useState<SaveRoom | SaveLibrary>();
    const [modalType, setModalType] = useState<ModalType>();
    const location = useLocation();
    const urlPath = location.pathname;

    useEffect(() => {
        switch (urlPath) {
            case '/add-floor-plan':
                setModalType(ModalType.ADD_FLOOR_PLAN);
                setSaveElement({
                    section: "",
                    abbreviation: "",
                    desc: "",
                })
                break;
            default:
                setModalType(ModalType.DEFAULT);
                setSaveElement({
                    label: "",
                    floor: 0,
                })
                break;
        }
    }, [urlPath]);


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if (saveToJson) saveToJson(saveElement?.label, saveElement!.floor, document.getElementById("canvas"));
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> |ChangeEvent<HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        // setSaveElement({...saveElement, [name]: value});

    }

    if (!open) return null;

    return ReactDOM.createPortal(
        <>
            <div className="OVERLAY_STYLES"/>
            <div className="MODAL_STYLES">
                <div className="top_row">
                    <h3 style={{color: "#6965db"}}>Shrani model</h3>
                    <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 352 512" className="close_modal"
                         onClick={onClose}>
                        <path fill="currentColor"
                              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                    </svg>
                </div>
                <form onSubmit={handleSubmit} className="modal_form">
                    {/*<div className="modal_inputContainer">*/}
                    {/*    <label htmlFor='label'>Knjižnica: </label>*/}
                    {/*    <input name="label" id="label" type="text" required*/}
                    {/*           value={saveElement.label}*/}
                    {/*           onChange={handleChange}/>*/}
                    {/*</div>*/}
                    {/*<div className="modal_inputContainer">*/}
                    {/*    <label htmlFor='label'>Nadstropje: </label>*/}
                    {/*    <input name="floor" id="floor" type="number" min="0"*/}
                    {/*           value={saveElement.floor}*/}
                    {/*           onChange={handleChange}/>*/}
                    {/*</div>*/}

                    <div className="modal_inputContainer">
                        <label htmlFor='label'>Knjižnica: </label>
                        <input name="section" id="label" type="text" required
                               // value={saveElement?.section}
                               onChange={handleChange}/>
                    </div>
                    <div className="modal_inputContainer">
                        <label htmlFor='label'>Knjižnica: </label>
                        <input name="abbreviation" id="label" type="text" required
                               // value={saveElement.abbreviation}
                               onChange={handleChange}/>
                    </div>
                    <div className="modal_inputContainer">
                        <label htmlFor='label'>Knjižnica: </label>
                        <input name="label" id="label" type="text" required
                               // value={saveElement.label}
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