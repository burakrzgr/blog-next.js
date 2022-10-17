import Router from "next/router";
import React from "react";
import { Dropdown,Form,Button } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/InputGroup';
import ThemePicker from "./theme-picker";

function Navbar({}) {
    const [seachText,setSearchText] = React.useState("");
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <a className="navbar-brand fs-3 fw-bold pe-3" onClick={() => Router.push("/")}>My Blog App</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
                <li className="nav-item pe-2">
                <a className="nav-link active" onClick={() => Router.push("/new")}>Yeni Yazı
                    <span className="visually-hidden">(current)</span>
                </a>
                </li>
                <li className="nav-item pe-2">
                <a className="nav-link" href="#">Blog Oku</a>
                </li>
                <li className="nav-item pe-2">
                <a className="nav-link" href="#">Takip Ettiklerim</a>
                </li>
                <li className="nav-item pe-2">
                <a className="nav-link" href="#">Benim Yazdıklarım</a>
                </li>
            </ul>
            <div className="pe-4">
                <ThemePicker selected="vapor"></ThemePicker>
            </div>
            <form className="d-flex" onSubmit={(e) => {e.preventDefault(); Router.push(`/search/${encodeURIComponent(seachText)}`)}}>
                <ButtonGroup >
                    <Form.Control type="text" placeholder="Blogları arayın..." value={seachText} onChange={e => setSearchText(e.target.value)}></Form.Control>
                    <Button variant="secondary" className="ps-2 pe-2" type="submit" >Ara</Button>
                </ButtonGroup>
            </form>
            </div>
        </div>
        </nav>
    );   
}
export default Navbar;