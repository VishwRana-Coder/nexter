import { message } from "antd";
import { auth, googleProvider, db } from "./Firebase";
import { signInWithPopup } from "firebase/auth";

//Sending Data to Firestore
import { doc, setDoc, getDoc } from "firebase/firestore";

const GoogleLogin = async () => {
  try {
    signInWithPopup(auth, googleProvider).then((result) => {
      const user = result.user;
      const docRef = doc(db, "Users", user.uid);
      const sendData = async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const userName = data.userName;
          const userEmail = data.userEmail;
          const userPhoto = data.userPhoto;
          const userUID = data.userUID;
          localStorage.setItem("Name", userName);
          localStorage.setItem("Email", userEmail);
          localStorage.setItem("Photo", userPhoto);
          localStorage.setItem("UID", userUID);
          message.success("Successfully Logged in");
          window.location.href = "/home";
        } else {
          setDoc(doc(db, "Users", user.uid), {
            userName: user.displayName,
            userEmail: user.email,
            userPhoto: user.photoURL,
            userUID: user.uid,
          });

          const userName = user.displayName;
          const userEmail = user.email;
          const userPhoto = user.photoURL;
          const userUID = user.uid;
          localStorage.setItem("Name", userName as string);
          localStorage.setItem("Email", userEmail as string);
          localStorage.setItem("Photo", userPhoto as string);
          localStorage.setItem("UID", userUID);
          message.success("Successfully Logged in");
          window.location.href = "/home";
        }
      };
      sendData();
    });
  } catch (error) {
    console.log(error);
  }
};
export default GoogleLogin;
