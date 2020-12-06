import React, { useState, useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'


function CreatePost() {
    const History = useHistory()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    useEffect(() => {
        if (url) {
            fetch("http://localhost:5000/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    title,
                    body,
                    photo: url
                })
            }).then(res => res.json()
                .then(data => {
                    console.log(data)
                    if (data.error) {
                        // alert({ html: data.error })
                        M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                    }
                    else {
                        M.toast({ html: "successfull created", classes: "#2e7d32 green darken-3" })
                        // alert({ html: data.message })

                        History.push('/')
                    }

                })).catch(err => {
                    console.log(err)
                })
        }
    }, [url])

    const postDetails = () => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'insta-clone')
        data.append('cloud_name', 'harsh205')
        fetch("https://api.cloudinary.com/v1_1/harsh205/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <div className="card input-field"
                style={{
                    margin: "30px auto",
                    maxWidth: "500px",
                    padding: "20px",
                    textAlign: "center"
                }}>
                <input type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input type="text"
                    placeholder="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Upload Image</span>
                        <input type="file"
                            onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                        onClick={() => postDetails()}>
                        Submit Post
                   </button>
                </div>
            </div>
        </>
    )
}

export default CreatePost;