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
        background-color: #fffdf7;
        /* background-color:  white; */
        overflow-x: hidden;
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

    // toast Edit 
    .toastui-editor-contents p {
        /* font-family: "Noto Sans Light","Malgun Gothic",sans-serif !important; */
        font-size: 11pt !important;
        letter-spacing: .8px !important;
        line-height: 23pt !important;
        color: #333 !important;
        margin-top: 30px;
        margin-bottom: 10px !important;
    }
    .toastui-editor-contents h1 {
        font-family: "Noto Sans" !important;
        font-size: 2.3rem !important;
        line-height: 1.5 !important;
        border-bottom: none !important;
        color: #333 !important;
    }
    .toastui-editor-contents h2 {
        font-family: "Noto Sans" !important;
        font-size: 1.8rem !important;
        line-height: 1.5 !important;
        border-bottom: none !important;
        color: #333 !important;

    }
    .toastui-editor-contents h3 {
        font-family: "Noto Sans" !important;
        font-size: 1.3rem !important;
        line-height: 1.5 !important;
        border-bottom: none !important;
        color: #333 !important;

    }
    .toastui-editor-contents h4 {
        font-family: "Noto Sans" !important;
        font-size: 1.1rem !important;
        line-height: 1.5 !important;
        border-bottom: none !important;
        color: #333 !important;

    }

`;

export default GlobalStyle;
