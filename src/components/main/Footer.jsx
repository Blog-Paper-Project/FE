import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <FooterBox>
        <Footer1>
          <div>푸터 1</div>
        </Footer1>
        <Footer2>
          <div>푸터 2</div>
        </Footer2>
        <Footer3>
          <div>푸터 3</div>
        </Footer3>
        <Footer4>
          <div>푸터 4</div>
        </Footer4>
      </FooterBox>
    </>
  )
}
const FooterBox = styled.div`
  width: 100%;
  height: 313px;
  border-top: 1px solid #ACACAC;
  padding-top: 60px;
`
const Footer1 = styled.div`
  width: 25%;
  height: 219px;
  background-color: red;
  float: left;
`
const Footer2 = styled.div`
  width: 25%;
  height: 219px;
  background-color: green;
  float: left;
`
const Footer3 = styled.div`
  width: 25%;
  height: 219px;
  background-color: yellow;
  float: left;
`
const Footer4 = styled.div`
  width: 25%;
  height: 219px;
  background-color: blue;
  float: left;
`
export default Footer
