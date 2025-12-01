import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Firebase config
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

// EmailJS init
emailjs.init("YOUR_EMAILJS_KEY");

// Generate random 6-digit code
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const verifyForm = document.getElementById("verifyForm");
const statusEl = document.getElementById("status");

// ---------------- SEND CODE WHEN USER SIGNS UP ----------------
const username = localStorage.getItem("username");
const email = localStorage.getItem("email");
let currentCode = generateCode();
localStorage.setItem("verifyCode", currentCode);

// Send code to email
emailjs.send("service_xxx","template_xxx", { to_name: username, to_email: email, code: currentCode })
    .then(() => console.log("Verification code sent!"))
    .catch(err => console.error("Email error:", err));

// ---------------- VERIFY ----------------
verifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputCode = document.getElementById("codeInput").value;

    if (inputCode === localStorage.getItem("verifyCode")) {
        statusEl.innerText = "Verified! Redirecting...";
        // Update user in Firebase as verified
        const q = query(collection(db, "users"), where("username", "==", username));
        const snap = await getDocs(q);
        if (!snap.empty) {
            const userDoc = doc(db, "users", snap.docs[0].id);
            await updateDoc(userDoc, { verified: true });
        }
        setTimeout(() => window.location.href = "home.html", 1500);
    } else {
        statusEl.innerText = "Invalid code, try again!";
    }
});
