import React, { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const uid = localStorage.getItem("userUID");
  const token = localStorage.getItem("token"); // idToken from login

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first!");
      return;
    }

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAldW9iw7I-eLFW7ihK1WE_JYjxfySjHAU`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
          displayName: fullName,
          photoUrl: photoURL,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error.message);
        } else {
          alert("Profile updated successfully!");
          console.log(data);
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", marginTop: "20px" }}>
      <h2>Contact Details</h2>
      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "10px" }}>
          <FaGithub size={30} style={{ marginRight: "5px" }} />
          <label htmlFor="name">Full Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <TbWorld size={30} style={{ marginRight: "5px" }} />
          <label htmlFor="photo">Profile Photo URL: </label>
          <input
            type="text"
            name="photo"
            id="photo"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>

        <button
          style={{
            background: "#f171e8",
            border: "none",
            borderRadius: "5px",
            padding: "10px",
            color: "white",
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
