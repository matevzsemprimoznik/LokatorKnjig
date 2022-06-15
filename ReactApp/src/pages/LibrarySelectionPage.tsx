import React, {useContext, useEffect, useRef, useState} from 'react';
import '../styles/editing_page/librarySelection_page/LibrarySelectionPage.css'
import Library from "../components/editing_page/Library";
import Modal from "../components/Modal";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {LibraryContext, LibraryContextType, ServerRoute} from "../context/libraryContext";
import {fetcher, libraryApi} from "../context/axios";
import BackButton from '../assets/2d-modeling_page/icons8-back-50.png'
import Button from "../components/Button";
import LeftArrowImage from '../assets/left-arrow.png'
import PlusImage from '../assets/plus.png'
import '../styles/landing_page/Header.css'
import useSWR from 'swr'

export type LibraryDataType = {
    section: string,
    abbreviation: string,
    hasNewData: boolean
}

const LibrarySelectionPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [libraryData, setLibraryData] = useState<any>([])
    const {data} = useSWR(`/editor/`, fetcher)


    useEffect(() => {
        if (data)
            setLibraryData(parseLibraryData(data))
    }, [data])

    const saveLibraryInfo = async (library: LibraryDataType) => {
        try {
            await libraryApi.post(`editor/`, library);
        } catch (err) {
            console.log(err);
        }
    }

    const parseLibraryData = (libraryData: []) => {
        return libraryData?.map((library: any) => {
            return {
                section: library.section,
                abbreviation: library.abbreviation,
                hasNewData: library.nekaj
            }
        })
    }

    return (
        <>
            <Modal open={open} onClose={() => setOpen(!open)} addLibrary={saveLibraryInfo}/>

            <div className="libSelPage header">
                <div className='libSelPage_header'>
                    <Button onClick={() => navigate("/")} image={LeftArrowImage} style={{position: 'relative'}}/>
                    <h2>Vse knjižnice</h2>
                    <Button onClick={() => setOpen(true)} image={PlusImage} style={{position: 'relative'}}/>
                </div>
                <div className="libSelPage_body">
                    {libraryData?.map((library: LibraryDataType, index: number) => (
                        <Library key={index} {...library}/>
                    ))}
                </div>
            </div>

        </>
    );
};

export default LibrarySelectionPage;