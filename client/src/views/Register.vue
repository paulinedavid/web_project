<template>

  <body>
    <section class="RegisterPage">
      <div class="register-color-container">
        <div class="register-color"></div>
        <div class="register-color"></div>
        <div class="register-color"></div>
        <div class="register-color"></div>
      </div>
      <div class="loginBox">
        <div class="loginContainer">
          <div class="loginForm">
            <h2>Get Started</h2>
            <form @submit.prevent action="" method="post">
              <div class="loginInputBox">
                <input
                  v-model="name"
                  type="text"
                  placeholder="Username"
                  name="txtFName"
                />
              </div>
              <div class="loginInputBox">
                <input
                  v-model="mail"
                  type="text"
                  placeholder="Email"
                  name="txtEmail"
                />
              </div>
              <div class="loginInputBox">
                <input
                  v-model="remail"
                  type="text"
                  placeholder="Verify Email"
                  name="txtConfirmationEmail"
                />
              </div>
              <div class="loginInputBox">
                <input
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  name="txtPassword"
                />
              </div>
              <p
                  class="CharacterLimitMessage"
                  style="color: red; text-align: center; font-weight: bold"
                  v-if="!matching"
                >Emails must be the same.</p>
              <p
                  class="CharacterLimitMessage"
                  style="color: red; text-align: center; font-weight: bold"
                >{{ message }}</p>
              <div class="loginInputBox">
                <input
                  @click="() => register()"
                  id="Registerbtn"
                  type="submit"
                  value="Register"
                  name="btnRegister"
                />
              </div>
            </form>
            <p class="forgotPswd">
              Already have an account ?
              <router-link to="/login-page">Login</router-link>
            </p>
            <p class="forgotPswd">
              Need Help ?<router-link to="/help-page">Contact us</router-link>
            </p>
          </div>
        </div>
        <div class="img-log-container">
        <img
          src="../assets/waterfall_register.png"
          alt="waterfall"
          class="register-img"
        /></div>
      </div>
    </section>
  </body>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      mail: "",
      remail: "",
      password: "",
      matching: true,
      message: "",
      // addressServer: localStorage.getItem('addressServer')
      addressServer: "http://localhost:8080"
    };
  },
  methods: {
    register() {
      this.matching = true;
      this.message = "";
      if (this.mail === this.remail) {
        fetch("http://localhost:8080/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            mail: this.mail,
            password: this.password,
          }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.json().then((error) => {
                throw new Error(JSON.stringify(error));
              });
            }
          })
          .then(() => {
            this.$router.push("/login-page");
          })
          .catch((error) => {
            console.error(error);
            let errorMessage;
            try {
              errorMessage = JSON.parse(error.message);
            } catch {
              errorMessage = {
                message: "An error occurred.",
              };
            }

            if (errorMessage.error) {
              const keys = Object.keys(errorMessage.error);
              if (keys.length > 0) {
                this.message = errorMessage.error[keys[0]][0];
              } else {
                this.message = errorMessage.error;
              }
            } else {
              this.message = errorMessage.message;
            }
          });
      } else {
        this.matching = false;
      }
    },
  },
};
</script>

<style></style>
