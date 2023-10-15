<template>
  <body>
    <div class="LoginPage">
      <div class="login-color-container">
        <div class="login-color"></div>
        <div class="login-color"></div>
        <div class="login-color"></div>
        <div class="login-color"></div>
      </div>
      
      <div class="loginBox">
        <div class="loginContainer">
          <div class="loginForm">
            <h2>Welcome back</h2>
            <form @submit.prevent action="" method="post">
              <div class="loginInputBox">
                <input
                  v-model="mail"
                  type="text"
                  name="txtEmail"
                  placeholder="Email"
                />
              </div>
              <div class="loginInputBox">
                <input
                  v-model="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <p
                    class="CharacterLimitMessage"
                    style="color: red; text-align: center; font-weight: bold"
                  >{{ message }}</p>
              <div class="loginInputBox">
                <input @click="() => login()" type="submit" value="Login" />
              </div>
            </form>
            <p class="forgotPswd">
              Forgot your password ?
              <router-link to="/fgpassword-page">Reset it</router-link>
            </p>
            <p class="forgotPswd">
              New here ? <router-link to="/register-page">Sign up</router-link>
            </p>
            <p class="forgotPswd">
              Need Help ?<router-link to="/help-page">Contact us</router-link>
            </p>
          </div>
        </div>
        <div class="img-log-container">
        <img
          src="../assets/plant_login.png"
          alt="login_plant"
          class="login-img"
        /></div>
      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";
export default {
  
  name: "LoginPage",
  data() {
    return {
      mail: "",
      password: "",
      message: "",
      //addressServer: "http://localhost:8080",
      addressServer: localStorage.getItem('addressServer'),
    };
  },
  methods: {
    login() {
      console.log("login")
      this.message = "";
      const userData = {
        mail: this.mail,
        password: this.password,
      };
      console.log(userData)
      axios
        .post(this.addressServer+"/auth/login", userData)
        //.post("http://localhost:8080/auth/login", userData)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("userData", JSON.stringify(response.data));
            console.log("responseData",localStorage.getItem("userData"));
            return response.data;
          } else {
            throw new Error(JSON.stringify(response.data));
          }
        }).then((data) => {
          const token = data.token;
          localStorage.setItem("token", token);
        })
        .then(() => {
          this.$router.push("/video-catalog-page");
          })
        .catch((error) => {
          let errorMessage;
          try {
            errorMessage = JSON.parse(error.message);
          } catch {
            errorMessage = {
              message: "An error occurred.",
            };
          }
          if (
            errorMessage.message === "Email not registered" ||
            errorMessage.message === "Wrong password"
          ) {
            this.message = errorMessage.message;
          } else {
            const keys = Object.keys(errorMessage);
            if (keys.length > 0) {
              const firstKey = keys[0];
              if (Array.isArray(errorMessage[firstKey])) {
                this.message = errorMessage[firstKey][0];
              } else {
                this.message = errorMessage[firstKey];
              }
            } else {
              this.message = errorMessage;
            }
          }
        });
    },
  },
};
</script>

<style></style>