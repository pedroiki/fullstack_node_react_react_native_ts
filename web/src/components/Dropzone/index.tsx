import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import './styles.css';
import {FiUpload} from 'react-icons/fi'

// Função que retorna void
interface Props {
    onFileUploaded: (file: File) => void
}

// React.FC<Props> - Para aceitar as props
const Dropzone: React.FC<Props> = ({onFileUploaded}) => {
    /*****************************************************************************
     STATE
     *****************************************************************************/
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    /*****************************************************************************
     CALL_BACK
     *****************************************************************************/
    const onDrop = useCallback(acceptedFiles => {
        // Pega o arquivo
        const file = acceptedFiles[0];
        // Mostra o arquivo na tela quando seleciona
        const fileURL = URL.createObjectURL(file);
        setSelectedFileUrl(fileURL);
        // Envia o arquivo para o pai, que no caso é o CreatePoint
        onFileUploaded(file);
    }, [onFileUploaded])
    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    /*****************************************************************************
     HTML
     *****************************************************************************/
    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*"/>
            {
                selectedFileUrl ? <img src={selectedFileUrl} alt="Upload image"/>
                    : (
                        <p>
                            <FiUpload/>
                            Imagem do estabelecimento ou casa
                        </p>
                    )
            }
        </div>
    )
}

export default Dropzone;
