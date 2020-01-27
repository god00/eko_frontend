import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Nav = styled.nav`
    position: fixed;
    height: 60px;
    width: 100%;
    top: 0;
    z-index: 999;
`
const LiWithMargin = styled.li`
    margin: 0 5px;
`
const FlexUl = styled.ul`
    display: flex;
    flex-direction: row;
`
const MyText = styled.span`
    color: #ee2524;
`


class Top extends Component {
    render() {
        return (
            <Nav className="navbar navbar-expand-lg navbar-light bg-light">
                <FlexUl className="navbar-nav mr-auto">
                    <LiWithMargin><Link to={'/'} className="nav-link"><MyText>Home</MyText></Link></LiWithMargin>
                    <LiWithMargin><Link to={'/about'} className="nav-link"><MyText>About</MyText></Link></LiWithMargin>
                </FlexUl>
            </Nav>
        );
    }
}

export default Top;