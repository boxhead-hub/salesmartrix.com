/* -------------------------
    FIREBASE INIT
-------------------------- */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "YOUR_ID",
    storageBucket: "YOUR_BUCKET",
    messagingSenderId: "YOUR_SENDER",
    appId: "YOUR_APP"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* -------------------------
    ORDER FORM HANDLING
-------------------------- */
const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // generate unique ID
    const orderID = "ORD-" + Math.floor(Math.random() * 9999999999);

    const orderData = {
        orderID: orderID,
        username: document.getElementById("username").value,
        product: document.getElementById("productName").value,
        quantity: document.getElementById("quantity").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        status: "Pending",
        date: new Date().toISOString()
    };

    try {
        // SAVE order to Firestore
        await addDoc(collection(db, "orders"), orderData);

        // SEND email notification (using EmailJS)
        sendEmail(orderData);

        alert("Order placed successfully! Your ID: " + orderID);
        window.location.href = "tracking.html?orderID=" + orderID;

    } catch (error) {
        console.error("Error saving order:", error);
        alert("Error placing order.");
    }
});

/* -------------------------
    EMAIL SENDER
-------------------------- */
function sendEmail(order) {
    emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");

    emailjs.send("service_xxx", "template_xxx", {
        order_id: order.orderID,
        user_name: order.username,
        product_name: order.product,
        quantity: order.quantity,
        phone: order.phone,
        email: order.email,
        address: order.address,
    });
}
