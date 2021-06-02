import React from 'react';
import Dropzone from "react-dropzone";

import { DropContainer, UploadMessage} from './styles'

function Index(props) {

    const renderDragMessage = (isDragActive, isDragReject) => {
        if(!isDragActive) {
            return <UploadMessage>Arraste arquivos aqui...</UploadMessage>
        }

        if (isDragReject) {
            return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
        }

        return <UploadMessage type="sucess">Solte os arquivos aqui</UploadMessage>
    }
    return (
        <Dropzone accept="image/*" onDropAccepted={() => {}}>
            { ({ getRootProps, getInputProps, isDragActive, isDragReject}) => (
                <DropContainer
                    { ...getRootProps()}
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}>

                    <input { ...getInputProps()}/>
                    Insira seus arquivos aqui!
                </DropContainer>
            )}
        </Dropzone>
    );
}

export default Index;