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
                        <br/>
                        On /SCG page you will see 2 column.<br/>
                        First is column that you can fill anything after you fill value, it will send your input to search value from server and display results on UI. <br/>
                        <br/>
                        Second column, you still can fill anything like the first column but it will return list of restaurants in the name of area that you fill.
                    </TextWithMargit>
                    <MyText>Enjoy</MyText>
                </InfoLayout>
                <iframe title="resume" src="https://drive.google.com/file/d/1ca3m0QGNqL1LELrUAV6ryrhlMQ0neh4d/preview" width="600" height="800"></iframe>
            </AboutLayout>
        );
    }
}

export default About;