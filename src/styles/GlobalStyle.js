import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    * {
    margin: 0;
    padding: 0;
    box-sizing : border-box;
    };
    body{
        font-family: 'Noto Sans KR', sans-serif;
        background-color:  #FFFDF7;
    };
    button{
        cursor: pointer;
    };
    img{
        cursor: pointer;
    };
    input{
        outline: none;
        padding-left: 10px;
        padding-right: 10px;
        margin: 0;
    };
`;

export default GlobalStyle;
