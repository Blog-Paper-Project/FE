import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    * {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    };
    body{
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #fffdf7;
    };
    button{
        cursor: pointer;
        border: none;
    };
    img{
        cursor: pointer;
    };
    input{
        outline: none;
        padding-left: 10px;
        padding-right: 10px;
        box-sizing : border-box;
        border-width: 0;
        margin: 0;
    };
    a{ color: inherit; }
`;

export default GlobalStyle;
