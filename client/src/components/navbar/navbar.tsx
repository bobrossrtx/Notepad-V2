
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../../context/AppContext';

export default function Navbar(): JSX.Element {
    const { user, logout } = useContext(AppContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">NotePad</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/all-notes">All Notes</Link>
                    </li>
                    {!user ?
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Account
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/auth/login">Login</Link>
                                <Link className="dropdown-item" to="/auth/register">Register</Link>
                            </div>
                        </li>
                        : (
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/profile" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {user.name}
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/profile">Profile</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="#">Settings</Link>
                                    <button className="dropdown-item" onClick={logout}>Logout</button>
                                </div>
                            </li>
                        )}
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}
