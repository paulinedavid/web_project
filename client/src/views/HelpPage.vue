<template>
    <body>
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
                    <router-link to="/catalog-page" class="to-page-nav">Videos</router-link>
                    <router-link to="/catalog-library-page" class="to-page-nav">Games</router-link>
                    <router-link to="/catalog-recs-page" class="to-page-nav">Organizations</router-link>
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
        <div class="help-page">
            <div class="help-page-container" style="z-index:10">
                <h1 class="modal-Title">Contact Support</h1>
                <p class="help-prompt">For any problem with your account, security concerns, or questions about our policy,
                    we're happy to help !</p>
                <form action="" class="help-form" @submit.prevent="formSubmit">
                    <div class="all-questions">
                        <div class="help-question">
                            <label for="fname" class="help-label">Your Name * </label>
                            <input type="text" id="fname" name="fname" class="help-input" placeholder="..."
                                v-model="txtName"><br>
                        </div>
                        <div class="help-question">
                            <label for="fname" class="help-label">Your Email * </label>
                            <input type="text" id="fname" name="fname" class="help-input" placeholder="..."
                                v-model="email"><br>
                        </div>
                        <div class="help-question">
                            <label for="fname" class="help-label">Summary * </label>
                            <input type="text" id="fname" name="fname" class="help-input"
                                placeholder="Give us a brief description of what's happening." v-model="txtSummary"><br>
                        </div>
                        <div class="help-question">
                            <label for="fname" class="help-label">Add more details * </label>
                            <textarea name="" id="" cols="30" rows="10" class="help-input"
                                placeholder="If you have more specific info, add it here."
                                v-model="txtDetails"></textarea><br>
                        </div>
                        <div class="help-question">
                            <label for="fname" class="help-label">Page Link </label>
                            <input type="text" id="fname" name="fname" class="help-input"
                                placeholder="Paste the link to where the issue is happening." v-model="txtLink"><br>
                        </div>
                        <div class="help-question" style="height: 40px;">
                            <p class="help-prompt" v-if="sent" style="color: green"> Help Request sent !</p>
                            <p class="help-prompt" v-if="error" style="color: red"> Please fill every field with a * !</p>
                        </div>
                        <button @click="sendMail" type="submit" class="submit-help-btn" id="UpdateBtn">
                            Send
                        </button>
                    </div>
                </form>
                <p class="help-prompt">Thank you for your feedback !</p>

            </div>
        </div>
        <a id="TopBtn" href="#top" class="fa fa-angle-double-up hide" style="font-size: 24px"><font-awesome-icon
                icon="fa-solid fa-arrow-up" size="xs" style="color: #fff0fe;" /></a>
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
    </body>
</template>

<script>
import UserMenu from "../components/UserMenu.vue";
import DarkLightMode from "../components/DarkLightMode.vue";
export default {
    name: "HelpPage",
    components: {
        DarkLightMode,
        UserMenu
    },
    data() {
        return {
            txtName: "",
            email: "",
            txtSummary: "",
            txtDetails: "",
            txtLink: "",
            message:"",
            formData:"",
            sent: false,
            error: false,
            selectedFile: null,
            labelText: "No file selected",
            addressServer: localStorage.getItem('addressServer')
        };
    },
    mounted() {
        var thisID = document.getElementById("TopBtn");
        var myScrollFunc = function () {
            var y = window.scrollY;
            if (y >= 300) {
                thisID.className = "fa fa-angle-double-up show";
            } else {
                thisID.className = "fa fa-angle-double-up hide";
            }
        };
        window.addEventListener("scroll", myScrollFunc);
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFile = file;
                this.labelText = file.name;

                // console.log(file.name);
                // const reader = new FileReader();
                // console.log(reader)
                // reader.onload = () =>  {
                //     console.log("here");
                //     imageContent = reader.result;
                //     console.log("image Content", imageContent)
                // }

            } else {
                this.selectedFile = null;
                this.labelText = "No file selected";
            }


        },
        sendMail() {
            let mailOptions = {
                to: 'masterbookefrei@gmail.com',
                subject: 'Demande de support',
                template: 'email-body-support',
                context: {
                    name: this.txtName,
                    email: this.email,
                    summary: this.txtSummary,
                    details: this.txtDetails,
                    link: this.txtLink,
                },
                attachments: [
                    {
                        filename: 'LogoJour.png',
                        path: 'LogoJour.png',
                        cid: 'image_cid', // Identifiant unique de l'image pour le .handlebars
                    },
                ],
            };

            fetch(this.addressServer + "/email/send", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mailOptions)
        })
          .then(response => {
            if (response.ok) {
              this.message = 'Email sent';
            } else {
              throw new Error('Error sending the email');
            }
            this.sent=true;

            return response.json();
          })
          .catch(error => {
            console.log('Error:', error);
          });



        }
    }
};
</script>

<style></style>