import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <FooterBox>
        <Footer1>
          <Footer1T>
            paper
          </Footer1T>
        </Footer1>
        <Footer2>
          <Footer2T>
            <div>Front-end Developer</div>
            <div>구자덕</div>
            <div>정대규</div>
            <div>임운철</div>
          </Footer2T>
        </Footer2>
        <Footer3>
          <Footer3T>
            <div>Back-end Developer</div>
            <div>문광민</div>
            <div>김성준</div>
            <div>송민지</div>
            <div>박선우</div>
          </Footer3T>
        </Footer3>
        <Footer4>
          <Footer4T>
            <div>푸터 4</div>
          </Footer4T>
        </Footer4>
        <FooterEnd>
          <div>
            Copyright PAPER.All Rights Reserved
          </div>
        </FooterEnd>
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
  outline: 1px solid #acacac;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Footer1T = styled.div`
width: 70%;
height: 55%;
outline: 1px solid #acacac;
background-color: yellow;
`
const Footer2 = styled.div`
  width: 25%;
  height: 219px;
  outline: 1px solid #acacac;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Footer2T = styled.div`
width: 70%;
height: 55%;
outline: 1px solid #acacac;
background-color: yellow;
`
const Footer3 = styled.div`
  width: 25%;
  height: 219px;
  outline: 1px solid #acacac;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Footer3T = styled.div`
width: 70%;
height: 55%;
outline: 1px solid #acacac;
background-color: yellow;
`
const Footer4 = styled.div`
  width: 25%;
  height: 219px;
  outline: 1px solid #acacac;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Footer4T = styled.div`
width: 70%;
height: 55%;
outline: 1px solid #acacac;
background-color: yellow;
`
const FooterEnd = styled.div`
  
  align-items: center;
  justify-content: center;
`
export default Footer
