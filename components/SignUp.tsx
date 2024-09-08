import { message } from "antd";
import { auth, db } from "./Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface props {
  email: string;
  password: string;
  username: string;
}

const SignUp = async ({ email, password, username }: props) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const docRef = doc(db, "Users", user.uid);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      message.error("Please Sign In");
    } else {
      await setDoc(doc(db, "Users", user.uid), {
        userName: username,
        userEmail: user.email,
        userPhoto:
          user.photoURL ||
          "https://firebasestorage.googleapis.com/v0/b/nexter-500.appspot.com/o/image-removebg-preview.png?alt=media&token=7d6c0808-22e1-4bf8-9fcf-442e4e3db7e7",
        userUID: user.uid,
      });
      const userEmail = user.email;
      const userUID = user.uid;
      localStorage.setItem(
        "Photo",
        user.photoURL ||
          "https://firebasestorage.googleapis.com/v0/b/nexter-500.appspot.com/o/image-removebg-preview.png?alt=media&token=7d6c0808-22e1-4bf8-9fcf-442e4e3db7e7"
      );
      localStorage.setItem("Name", user.displayName || username);
      localStorage.setItem("Email", userEmail as string);
      localStorage.setItem("UID", userUID);
      window.location.href = "/home"
      message.success("Successfully Logged in");
    }
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      message.error("Please login, Email already in use");
    } else {
      message.error(`Sign-up failed: ${error.message}`);
    }
  }
};

export default SignUp;
