import React, { useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import avatar from '../img/avatar.svg'
import wave from '../img/wave.png'
import bg from '../img/bg.svg'
import M from 'materialize-css'
// import 'materialize-css/dist/css/materialize.min.css';
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'


function SignIn() {
    const { state, dispatch } = useContext(UserContext)
    const History = useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const SendPostData = () => {

        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) {
            M.toast({ html: 'invalid email', classes: "#e53935 red darken-1" })
            return
        }

        fetch("http://localhost:5000/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json()
            .then(data => {
                console.log(data)
                if (data.error) {
                    // alert({ html: data.error })
                    M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                }
                else {
                    localStorage.setItem('jwt', data.token)
                    localStorage.setItem('user', JSON.stringify(data.user))
                    dispatch({ type: 'USER', payload: data.user })
                    M.toast({ html: "successfull", classes: "#2e7d32 green darken-3" })
                    // alert({ html: data.message })
                    History.push('/')
                }

            })).catch(err => {
                console.log(err)
            })
    }



    return (
        <>
            <img src={wave} className="wave" />
            <div className="container">
                <div className="img">
                    <img src={bg} />
                </div>
                <div className="login-content">
                    <div className="form">
                        <img src={avatar} />
                        <h2 className="title">Welcome</h2>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="div">

                                <input type="text"
                                    className="input"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                {/* <h5>Password</h5> */}
                                <input type="password"
                                    className="input"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <a href="#">Forget Password</a>
                        <input type="submit"
                            onClick={() => SendPostData()}
                            className="btn"
                            value="Login" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn;