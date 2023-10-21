<template>
  <body>
    <div class="Profile-page-container">
      <header>
        <div class="headernav">
          <div class="header-container">
            <div class="header-image">
              <!-- <img alt="Vue logo" src="../assets/LogoDay.png" class="VueLogo" style="    width: 177px;
    height: 167px;
    margin: 0px;
    margin-bottom: 50px; margin-left: 37px;" /> -->
              <div class="logo-nav"></div>
            </div>
          </div>
          <div class="Navbar">
            <router-link to="/video-catalog-page" class="to-page-nav" >Videos</router-link>
            <router-link to="/game-catalog-page" class="to-page-nav" >Games</router-link>
            <router-link to="/organization-catalog-page" class="to-page-nav" >Organizations</router-link>
          </div>
          <UserMenu></UserMenu>
          <div class="light">
            <DarkLightMode></DarkLightMode>
          </div>
        </div>
      </header>
      <div class="login-color-container" style="z-index:0">
        <div class="login-color"></div>
        <div class="login-color"></div>
        <div class="login-color"></div>
        <div class="login-color"></div>
      </div>
      <a id="top"></a>

      <div class="edit-profile-container">
        <div class="formContainer">
          <div class="profileContainer">
            <div class="loginForm">
              <form @submit.prevent action="" method="post">
                <h2 class="Profile-Title">Edit Profile</h2>
                <div class="ProfileInputBox">
                  <input v-model="txtFName" type="text" name="txtFName" :placeholder="placeholderFName"><br>
                </div>
                <div class="ProfileInputBox">
                  <input v-model="txtEmail" type="email" name="txtEmail" :placeholder="placeholderEmail"><br>
                </div>
                <!-- <div class="error-message-profile">{{ message }}</div> -->
                <div class="ProfileInputBox" style="margin-left: -60px;">
                  <input @click="updateInformation" type="submit" value="Update Information" name="btnUpdate">
                </div>
              </form>
              <p class="Profile-forgotPswd">Change password ?<router-link to="/reset-pwd-page">Reset</router-link>
              </p>
            </div>
          </div>

        </div>
        <!-- <div class="Navbar" style="margin-top: 50px;" v-show="isAdmin"> -->
        <!-- <router-link to="/add-book-page" class="to-page-nav">Add Book</router-link>
          <router-link to="/catalog-admin-page" class="to-page-nav">Delete Book</router-link> -->
          <div class="Navbar" style="margin-top: 50px;">
          <button class="User-Edit-Btn"
          @click="$refs.coverfileupload.click()">
          Add new Video
        </button>
        <button class="User-Edit-Btn"
          @click="$refs.coverfileupload.click()">
          Add new Game
        </button>
        </div>
      </div>
      <a id="TopBtn" href="#top" class="fa fa-angle-double-up hide" style="font-size: 24px"></a>
      <footer>
        <div class="content-footer">
          <div class="top">
            <div class="logo-details">
              <!-- <img alt="Vue logo" style="opacity: 0.7;" src="../assets/LogoWhite.png"
                            class="logo-nav-clean" /> -->
              <div class="logo-nav-clean"></div>
              <p class="logo-name">
                TOGETHEARTH <br />
                <small>est. 2023</small>
              </p>
            </div>
            <div class="media-icons">
              <a href="https://www.linkedin.com/in/lou-brunesseaux-a843aa248"><font-awesome-icon
                  icon="fa-brands fa-linkedin-in" /></a>
              <a href="mailto:loubruness@gmail.com"><font-awesome-icon icon="fa-brands fa-google" /></a>
              <a href="https://github.com/loubruness"><font-awesome-icon icon="fa-brands fa-github" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </body>
</template>

<script>
import UserMenu from "../components/UserMenu.vue";
import DarkLightMode from "../components/DarkLightMode.vue";
export default {
  name: 'ProfilePage',
    data() {
      return {
        txtFName: '',
        txtEmail: '',
        message: '',
        placeholderFName: 'First name',
        placeholderEmail: 'Email Address',
        sent: false,
        error: false,
        userData: null,
        //addressServer: localStorage.getItem('addressServer')
        addressServer: "http://localhost:8080"
      };

    },
  components: {
    DarkLightMode,
    UserMenu
  },
    methods: {
      updateInformation() {
        fetch(this.addressServer + "/auth/updateProfile", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ mail_old: this.userData.mail, mail: this.txtEmail, name: this.txtFName })
        })
          .then(response => {
            if (response.ok) {
              this.message = 'Information updated';
            } else {
              throw new Error('Error updating information');
            }

            return response.json();
          })
          .then(data => {
            console.log('Response:', data);

            // Mise à jour de la variable locale (dans le navigateur) userData

            var newtoken = data.token;

            localStorage.setItem("token", newtoken);
          })
          .catch(error => {
            console.log('Error:', error);
          });
      },
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.selectedFile = file;
          this.labelText = file.name;
        } else {
          this.selectedFile = null;
          this.labelText = "No file selected";
        }
      }
    },
    mounted() {
      var token = localStorage.getItem("token");
      console.log(token);
      if (token === null) {
        // L'utilisateur n'est pas connecté, on le redirige vers la page de connexion
        this.$router.push("/login-page");
        return;
      }

      // L'utilisateur est connecté, on a ses infos.
      this.token = token;
      const url = this.addressServer + "/auth/get_mail_name?token=" + token;

      fetch(url, {method: 'GET',})
        .then(response => response.json())
        .then(data => {
          this.userData = data; // Assuming the response contains email and name
          this.txtFName = data.name;
          this.txtEmail = data.mail;
          this.placeholderFName = data.name;
          this.placeholderEmail = data.mail;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          // Handle the error (e.g., show an error message)
        });
    },
};
</script>


<style></style>