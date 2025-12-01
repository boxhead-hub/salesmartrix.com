loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const q = query(collection(db, "users"), where("username", "==", username), where("password", "==", password));
  const snap = await getDocs(q);

  if (snap.empty) {
    statusEl.innerText = "Invalid username or password!";
  } else {
    statusEl.innerText = "Login successful!";
    localStorage.setItem("username", username);
    window.location.href = "home.html"; // redirect after login
  }
});