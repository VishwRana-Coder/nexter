import { message } from "antd";
import { auth, db } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface props {
  email: string;
  password: string;
}
const SignIn = async ({ email, password }: props) => {
  try {
    const result = signInWithEmailAndPassword(auth, email, password);
    const user = (await result).user;
    const docRef = doc(db, "Users", user.uid);
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
      message.error("Please create an account");
    }
  } catch (error) {
    message.error("There is an error");
  }
};
export default SignIn;
