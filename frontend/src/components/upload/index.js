import React from 'react';
import Dropzone from "react-dropzone";

import { DropContainer, UploadMessage} from './styles'

function Index(props) {
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