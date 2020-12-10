import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'


const Profile = () => {
    const [mypics, setPics] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [image, setImage] = useState("")
    // const [url, setUrl] = useState("")
    console.log(state)
    useEffect(() => {
        fetch('http://localhost:5000/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                setPics(result.mypost)
            })
    }, [])

    useEffect(() => {
        if (image) {
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
                    console.log(data)
                    fetch('http://localhost:5000/updatephoto', {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("jwt")
                        },
                        body: JSON.stringify({
                            photo: data.url
                        })
                    }).then(res => res.json())
                        .then(result => {
                            console.log(result)
                            localStorage.setItem("user", JSON.stringify({ ...state, photo: result.photo }))
                            dispatch({ type: "UPDATEPHOTO", payload: result.photo })
                            // window.location.reload()

                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [image])
    const updatePhoto = (file) => {
        setImage(file)

    }

    return (
        <>
            <div style={{ maxWidth: "550px", margin: "0px auto" }} >
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "18px 0px",
                    borderBottom: "1px solid grey"
                }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src={state ? state.photo : "loading"} />
                        {/* <Form.File id="formcheck-api-regular">
                            <Button variant="info" className="followbtn" onClick={() => {
                                updatePhoto()
                            }} > Update Pic</Button></Form.File> */}
                        <Form.File id="formcheck-api-regular">
                            <Form.File.Input onChange={(e) => updatePhoto(e.target.files[0])}></Form.File.Input>
                        </Form.File>


                    </div >

                    <div>
                        <h4>{state ? state.name : "loading"}</h4>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                            <h6>{mypics.length} posts</h6>
                            <h6>{state ? state.followers.length : "0"} followers</h6>
                            <h6>{state ? state.following.length : "0"} following</h6>
                        </div>
                    </div>
                </div>

                <div className="gallery">
                    {
                        mypics.map(item => {
                            return (
                                <img key={item._id} className="items" src={item.photo} alt={item.title} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )

}

export default Profile