import React, { Component } from "react";
import GlobaStyle from './styles/global'
import { Container, Content} from "./styles";

import Upload from "./components/Upload";

export default class App extends Component {
  render() {
    return (
    <Container>
      <Content>
        <Upload/>
      </Content>
      <GlobaStyle/>
    </Container>
    )
  }
}
