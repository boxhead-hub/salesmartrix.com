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
