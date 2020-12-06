import React, { useState, useEffect, useContext } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css';
import { UserContext } from '../App'
import NavHome from '../components/navHome'
import { Link } from 'react-router-dom'
// import { Button, Card, Row, Col } from 'react-materialize';
import CreatePost from '../components/createPost'



function Home() {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:5000/allposts', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.posts)
            })
    }, [])

    const likePost = (id) => {
        fetch("http://localhost:5000/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })

    }

    const unlikePost = (id) => {
        fetch("http://localhost:5000/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const writeComment = (text, postId) => {
        fetch("http://localhost:5000/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: postId,
                text: text
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const deletePost = (postid) => {
        fetch(`http://localhost:5000/deletepost/${postid}`, {
            method: 'delete',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            {/* <div className="cont-color shadow-lg p-3 mb-5 bg-white rounded">
                <div className="nav_bar">
                    <div className="logo">

                        <h3 class="brand-logo mxy-5" >🅸🅽🆂🆃🅰🅶🆁🅰🅼</h3>
                    </div>
                    <div className="menu_items">
                        <li><a href="#" className="a mx-4">Home</a></li>
                        <li><a href="#" className="a mx-4">Profile</a></li>
                        <li><Link to="/createPost" className="a mx-4">Create Post</Link></li>
                        <li><a href="#" className="a mx-4">Log Out</a></li>
                    </div>
                </div>
            </div> */}


            <div className="home">
                {
                    data.map(item => {
                        return (
                            <div className="card post-card">
                                <h4 className="card-title"><Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile/"} className="profile_name">{item.postedBy.name}</Link> {item.postedBy._id == state._id
                                    && <i className="material-icons" style={{ float: "right", cursor: "pointer" }}
                                        onClick={() => {
                                            deletePost(item._id)
                                        }}>delete</i>
                                }
                                </h4>
                                <div className="card-image">
                                    <img className="card-imagee" src={item.photo} />
                                </div>
                                <div className="card-action mx-2 my-2">
                                    {/* <a href="#" >This is a link</a> */}
                                    {/* <i class="material-icons" style={{ color: "red" }}>favorite</i> */}
                                    {item.likes.includes(state._id)
                                        ?
                                        <i class="material-icons" onClick={() => { unlikePost(item._id) }} style={{ color: "red", cursor: "pointer" }}>favorite</i>
                                        :
                                        <i class="material-icons" onClick={() => { likePost(item._id) }} style={{ cursor: "pointer" }}>favorite_border </i>

                                    }
                                    {/* <a href="#" className="mx-4">This is a link</a> */}
                                </div>
                                <div className="my-2 mx-2 card-content">
                                    <h6>{item.likes.length} likes  </h6>
                                    <h6>{item.title}</h6>
                                    <p>{item.body}</p>
                                    {
                                        item.comments.map(record => {
                                            return (
                                                <h6 key={record._id}><span>{record.postedBy.name}</span> {record.text}</h6>
                                            )
                                        })
                                    }

                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        writeComment(e.target[0].value, item._id)
                                    }}>
                                        <input type="text" className="form-control" placeholder="Add a comment" style={{ border: "none", textDecoration: "none" }} />
                                    </form>
                                </div>
                            </div>
                        )
                    })
                }


                {/* <div className="card post-card my-2">
                    <h4 className="card-title">Card Title</h4>
                    <div className="card-image">
                        <img className="card-imagee" src="https://images.unsplash.com/photo-1502759683299-cdcd6974244f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                    </div>
                    <div className="card-action mx-2 my-2">
                        <a href="#" >This is a link</a>
                        <a href="#" className="mx-4">This is a link</a>
                    </div>
                    <div className="my-2 mx-2 card-content">
                        <h6>Title</h6>
                        <p>Nature's Beauty</p>
                        <input type="text" className="form-control" placeholder="Add a comment" style={{ border: "none", textDecoration: "none" }} />
                    </div>
                </div> */}

                {/* <div className="card post-card">
                    <h4 className="card-title">Card Title</h4>
                    <div className="card-image">
                        <img className="card-imagee" src="https://images.unsplash.com/photo-1502759683299-cdcd6974244f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                    </div>
                    <div className="card-action mx-2 my-2">
                        <a href="#" >This is a link</a>
                        <a href="#" className="mx-4">This is a link</a>
                    </div>
                    <div className="my-2 mx-2 card-content">
                        <h6>Title</h6>
                        <p>Nature's Beauty</p>
                        <input type="text" className="form-control" placeholder="Add a comment" style={{ border: "none", textDecoration: "none" }} />
                    </div>
                </div> */}
            </div>

        </>
    )
}

export default Home;
