import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER",
  appId: "YOUR_APP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const statusEl = document.getElementById("status");

// ---------------- SIGNUP ----------------
signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await addDoc(collection(db, "users"), { username, email, password });
    statusEl.innerText = "Sign up successful! Go to login.";
    signupForm.reset();
  } catch (err) {
    console.error(err);
    statusEl.innerText = "Error signing up!";
  }
});

// ---------------- LOGIN ----------------
loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const q = query(collection(db, "users"),
        where("username", "==", username),
        where("password", "==", password)
    );
    const snap = await getDocs(q);

    if (snap.empty) {
        statusEl.innerText = "Invalid username or password!";
    } else {
        const userData = snap.docs[0].data();
        if (!userData.verified) {
            // User not verified yet
            statusEl.innerText = "Please verify your email first!";
            // Save username/email to local storage for verification page
            localStorage.setItem("username", username);
            localStorage.setItem("email", userData.email);
            setTimeout(() => window.location.href = "verify.html", 1500);
        } else {
            // Verified, login success
            statusEl.innerText = "Login successful!";
            localStorage.setItem("username", username);
            window.location.href = "home.html";
        }
    }
});
