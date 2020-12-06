import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import avatar from '../img/avatar.svg'
import wave from '../img/wave.png'
import bg from '../img/bg.svg'
import M from 'materialize-css'
import { Link, useHistory } from 'react-router-dom'

function SignUp() {
    const History = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const SendPostData = () => {

        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) {
            M.toast({ html: 'invalid email', classes: "#e53935 red darken-1" })
            return
        }

        fetch("http://localhost:5000/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res => res.json()
            .then(data => {
                console.log(data)
                if (data.error) {
                    // alert({ html: data.error })
                    M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                }
                else {
                    M.toast({ html: data.message, classes: "#2e7d32 green darken-3" })
                    History.push('/signin')
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
                                {/* <h5>Username</h5> */}
                                <input type="text"
                                    placeholder="Username"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input" />
                            </div>
                        </div>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                {/* <h5>Password</h5> */}
                                <input type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input" />
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                {/* <h5>Password</h5> */}
                                <input type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input" />
                            </div>
                        </div>
                        <center><Link to="/signin">Already have an account?</Link></center>
                        <input type="submit" className="btn" value="SignUp" onClick={() => SendPostData()} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;