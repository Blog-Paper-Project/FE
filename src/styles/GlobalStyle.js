import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    * {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    box-sizing : border-box;
    };
    body{
        /* width:100%; */
        font-family: 'Noto Sans KR', sans-serif;
        background-color:  #FFFDF7;
    };
    button{
        cursor: pointer;
        border: none;
        font-family: "Gmarket Sans";
        background-color: white;
    };
    img{
        cursor: pointer;
    };
    input{
        outline: none; 
        padding-left: 10px;
        padding-right: 10px;
        margin: 0;
        border:none;
    };
    a{ color: inherit; }
`;

export default GlobalStyle;
