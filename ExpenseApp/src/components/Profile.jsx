import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { ImCross } from "react-icons/im";
const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [userProfile, setUserProfile] = useState(null);
   const [edit,setEdit]=  useState(false)
  const token = localStorage.getItem("token"); 
  useEffect(() => {
    if (!token) return;

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAldW9iw7I-eLFW7ihK1WE_JYjxfySjHAU`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error.message);
        } else {
          const user = data.users[0];
          setUserProfile(user);
          setFullName(user.displayName || "");
          setPhotoURL(user.photoUrl || "");
        }
      })
      .catch((err) => alert(err.message));
  }, [token]);

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
        headers: { "Content-Type": "application/json" },
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
          setFullName("")
          setPhotoURL("")
          setUserProfile(data);
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "100px auto",borderRadius:"10px",boxShadow:"0px 0px 10px purple",background:"purple",color:"white"}}>
      <h2 >Profile Details</h2>

      {/* Show current profile */}
      {userProfile && (
        <div style={{ marginBottom: "20px" }}>
          <h3 >Name: {userProfile.displayName || "N/A"}</h3>
          {userProfile.photoUrl && (
            <img
              src={userProfile.photoUrl}
              alt={userProfile.displayName}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          )}
        </div>
      )}
      <hr />
      {!edit&&<button onClick={()=>setEdit(!edit)} style={{padding:"10px",borderRadius:"5px",border:'none',background:"linear-gradient(130deg,purple,pink)",marginLeft:"40%",boxShadow:"0px 0px 10px white"}} >Edit Profile</button>}
      {edit &&
        <>
        <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "10px",display:"flex" }}>
          <FaGithub size={30} style={{ marginRight: "5px" }} />
          <label htmlFor="name">Full Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your name"
            style={{ padding: "5px", width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "10px" ,display:"flex"}}>
          <TbWorld size={30} style={{ marginRight: "5px" }} />
          <label htmlFor="photo">Profile Photo URL: </label>
          <input
            type="text"
            name="photo"
            id="photo"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Enter photo URL"
            style={{ padding: "5px", width: "100%" }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: "#f171e8",
            border: "none",
            borderRadius: "5px",
            padding: "10px",
            color: "white",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Update
        </button>
        </form>
        <button onClick={() => setEdit(!edit)} style={{border:"none",margin:"10px",padding:"10px",borderRadius:"50px",background:"gray",color:"white"}} >
        <ImCross size={20}/>
        </button>
</>
}
    </div>
  );
};

export default Profile;
