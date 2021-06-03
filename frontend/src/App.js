import {useState} from 'react'
import GlobalStyle from './styles/global'
import {Container, Content} from "./styles";
import { uniqueId} from 'lodash'
import filesize from "filesize";
import api from "./services/api";

import Upload from './components/upload'
import FileList from "./components/FileList";

function App() {

    const [uploadedFiles, setUploadedFiles] = useState([])

    const handleUpload = files => {
        const uploads = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null
        }))

        console.log(uploads)

        const newFiles = uploadedFiles;
        newFiles.concat(uploads)

        setUploadedFiles(newFiles)

        uploads.forEach(processUpload)

    }

    const updateFile = (id, data) => {
        const upload = uploadedFiles.map(uploadedFile => {
            return id === uploadedFile.id
                ? {...uploadedFile, ...data }
                : uploadedFile
            }
        )

        setUploadedFiles(upload)
    }

    const processUpload = (file) => {
        const data = new FormData()

        data.append('file', file.file, file.name)

        api.post('posts', data, {
            onUploadProgress: e => {
                const progress = parseInt(Math.round((e.loaded * 100) / e.total));

                updateFile(file.id, {
                    progress,
                })
            }
        }).then(response => {
            updateFile(file.id, {
                uploaded: true,
                id: response.data._id,
                url: response.data.url
            })
        }).catch(() => {
            updateFile(file.id, {
                error:true
            })
        })
    }

    const handleDelete = async id => {
        await api.delete(`posts/${id}`)
        const notDeleted = uploadedFiles.filter(file => file.id !== id)
        setUploadedFiles(notDeleted)

    }

  return (

      <Container>
        <Content>
            <Upload onUpload={handleUpload}/>
            {!!uploadedFiles.length && (
                <FileList files={uploadedFiles} onDelete={handleDelete}/>
            )}

        </Content>
        <GlobalStyle/>
      </Container>
  )
}

export default App;
