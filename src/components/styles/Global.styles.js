import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    
  }

  background-color:${props => props.bgColor} ;
`;
export default GlobalStyle;