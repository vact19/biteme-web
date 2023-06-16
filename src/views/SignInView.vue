<template>
  <div class="container">
    <h2>Login</h2>
    <form @submit="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login(event) {
      event.preventDefault(); // Prevent form submission

      // Create login data object
      const loginData = {
        email: this.email,
        password: this.password,
      };

      // Send POST request to login endpoint
      fetch("https://localhost:8443/students/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((res) => res.json())
        .then((res) => {
          const { accessToken, refreshToken } = res.data;
          // Store the access token and refresh token in local storage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // Redirect to home page
          this.$router.push("/");
        });
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.form-group button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>
