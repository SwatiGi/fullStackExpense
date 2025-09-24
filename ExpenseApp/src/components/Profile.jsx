import React from 'react'

const Profile = () => {
  const email = localStorage.getItem("userEmail");
  const uid = localStorage.getItem("userUID");

  return (
    <div style={{padding: "20px", border: "1px solid #ccc", marginTop: "20px"}}>
      <h2>User Profile</h2>
      <p><b>Email:</b> {email}</p>
      <p><b>UID:</b> {uid}</p>
    </div>
  )
}

export default Profile;
