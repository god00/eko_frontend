import React, { Component } from 'react';
import styled from 'styled-components';

const AboutLayout = styled.div`
    display: flex;
    justify-content: space-evenly;
`
const InfoLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 35%;
`
const MyText = styled.div`
    font-size: 50px;
    font-family: cursive;
    display: flex;
    margin: auto;
`
const TextWithMargit = styled.div`
    margin: 36px;
`

class About extends Component {
    render() {
        return (
            <AboutLayout>
                <InfoLayout>
                    <TextWithMargit>
                        Hello everyone<br />  
                        This is my Demo website. <br/>
                    </TextWithMargit>
                    <MyText>Enjoy</MyText>
                </InfoLayout>
                <iframe title="resume" src="https://drive.google.com/file/d/1ca3m0QGNqL1LELrUAV6ryrhlMQ0neh4d/preview" width="600" height="800"></iframe>
            </AboutLayout>
        );
    }
}

export default About;