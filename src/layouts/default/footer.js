import React, { Component } from "react";
import styled from "styled-components";

const MyFooter = styled.footer`
    height: 50px;
    background-color: #ee2524;
    display: flex;
    font-size: 13px;
    font-family: initial;
`
const WhiteText = styled.div`
    margin: auto 36px auto auto;
    color: #e9ecef;
`
class Footer extends Component {
    render() {
        return (
            <MyFooter>
                <WhiteText>Powered by Phosawat Ongmorakot</WhiteText>
            </MyFooter>
        );
    }
}


export default Footer