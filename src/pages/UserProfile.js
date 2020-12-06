import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const [userProfile, setProfile] = useState(null)
    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams()
    console.log(userid)
    useEffect(() => {
        fetch(`http://localhost:5000/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setProfile(result)
            })
    }, [])

    return (
        <>
            {userProfile ?
                <div style={{ maxWidth: "550px", margin: "0px auto" }} >
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "18px 0px",
                        borderBottom: "1px solid grey"
                    }}>
                        <div>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                                src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfDJ8MHw%3D&auto=format&fit=crop&w=500&q=60" />
                        </div >

                        <div>
                            <h4>{userProfile.user.name}</h4>
                            <h4>{userProfile.user.email}</h4>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                                <h6>{userProfile.posts.length} posts</h6>
                                <h6>30 followers</h6>
                                <h6>30 following</h6>
                            </div>
                        </div>
                    </div>

                    <div className="gallery">
                        {
                            userProfile.posts.map(item => {
                                return (
                                    <img key={item._id} className="items" src={item.photo} alt={item.title} />
                                )
                            })
                        }

                    </div>
                </div>
                : <h3>Loading....!</h3>}
        </>
    )

}

export default Profile