import React from "react";
import { body as Body } from "./body";
import Footer from "./footer";
import Top from "./top";

export default function DefaultLayout({ children }) {
    return (
        <React.Fragment>
            <Top />
            <Body>{children}</Body>
            <Footer />
        </React.Fragment>
    )
}