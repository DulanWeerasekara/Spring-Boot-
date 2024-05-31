// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import img01 from "../assets/img01.png";

function LandingPage() {
    return (
        <>
            <br />
            <Header />
            <br />
            <center>
                <div className="d-flex justify-content-center align-items-center">
                    <img src={img01} style={{ width: "1340px" }} />
                </div>
            </center>
            <br />
            <Footer />
        </>
    );
}

export default LandingPage;
