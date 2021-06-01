import GlobalStyle from './styles/global'
import {Container, Content} from "./styles";

import Upload from './components/upload'

function App() {
  return (
      <Container>
        <Content><Upload/></Content>
        <GlobalStyle/>
      </Container>
  )
}

export default App;
