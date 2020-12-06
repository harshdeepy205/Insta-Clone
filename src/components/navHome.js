import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useHistory } from 'react-router-dom'
// import 'materialize-css';
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App';

function NavHome() {

    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
        console.log(state)
        if (state) {
            return [
                <li><Link to="/" className="a mx-4">Home</Link></li>,
                <li><Link to="/profile" className="a mx-4">Profile</Link></li>,
                <li><Link to="/createPost" className="a mx-4">Create Post</Link></li>,
                <li><Link to="#" className="a mx-4" onClick={() => {
                    localStorage.clear()
                    dispatch({ type: "CLEAR" })
                    history.push('/signin')
                }}>Log Out</Link></li>
            ]
        }
        else {
            return [
                <li><Link to="/signin" className="a mx-4">Signin</Link></li>,
                <li><Link to="/signup" className="a mx-4">SignUp</Link></li>
            ]
        }
    }

    return (
        <>
            <div className="cont-color shadow-lg p-3 mb-5 bg-white rounded">
                <div className="nav_bar">
                    <div className="logo">
                        <Link to={state ? "/" : "/signin"}><h3 class="brand-logo mxy-5" style={{ textDecoration: "none" }} >🅸🅽🆂🆃🅰🅶🆁🅰🅼</h3></Link>
                    </div>
                    <div className="menu_items">
                        {renderList()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavHome;