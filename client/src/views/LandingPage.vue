<template>
    <body>
        <div class="Landing-page-container">

            <a id="top"></a>
            <div class="WelcomePrompt">
                <div class="Landing-banner-container">
                    <header>
                <div class="header-landing-container">
                <div class="header-container">
                    <!-- <div class="header-image">
                        <div class="logo-nav"></div>
                    </div> -->
                    <div>
                        <router-link to="/login-page" class="LogRegBtnLink"
                            style="--shadow: #39ff16; --color: #91f29cad; --background: #dbf2918d;">Login</router-link>
                        <router-link to="/register-page" class="LogRegBtnLink"
                            style="--shadow: #39ff16; --color: #91f29cad; --background: #dbf2918d;">Register</router-link>
                    </div>
                </div>
            </div>
            </header>
                    <div class="Landing-banner">
                        <div class="Landing-banner-text">
                            <h2 class="Slogan">Your actions can make a difference</h2>
                            <br />
                            <h2 class="TimeToDo">TOGETHEARTH</h2>
                            <br />
                            <h2 class="Slogan">Lets change the world together</h2>
                        </div>
                        <div>
                            <img src="../assets/elephant_landing.jpeg" alt="Landing-png" class="Landing-png" />
                        </div>
                    </div>
                </div>
                <p>
                    Always wanted to leave an indelible mark on the world ?<br /><br />This is the place for
                    you
                </p>
                
                <div class="header-image"  style="margin-top: 2%;">
                        <!-- <img alt="Vue logo" src="../assets/LogoBrown3.png" class="VueLogo" /> -->
                        <div class="logo-nav"></div>
                    </div>

                <router-link to="/register-page" class="TryOutBtnLink" style="margin-top: 4%;">Try it out!</router-link>
                
            </div>
            <div class="SiteContent-container">
                <div class="VocabPrez">
                    <div class="VocabDescription">
                        <h1 class="VocabH1">1000+ organizations at your disposition</h1>
                        <p>
                            Browse our endless selection of organizations
                            and discover new causes !<br /><br />
                            Commit yourself for a brighter future...
                        </p>
                    </div>
                    <img src="../assets/LandingPagePic1.png" alt="Planner demo" class="Vocabdemo">
                </div>
                <div class="ExoPrez">
                    <img src="../assets/LandingPagePic2.png" alt="Add Task demo" class="Vocabdemo">
                    <div class="ExoDescription" style="margin-top: 8%;">
                        <h1>Stay updated</h1>
                        <p>
                            Keep in touch with the most recent content of the organizations you follow.<br /><br />
                            Follow as many organizations as you wish and be notified for all of their updates ! 
                        </p>
                    </div>
                </div>
                <div class="VocabPrez">
                    <div class="VocabDescription" style="margin-top: 10%;">
                        <h1 class="TestH1">An interactive experience</h1>
                        <p>
                            Deepen your knowledge of topics you're interested in, in a dynamic way : <br /><br />
                            Watch our various videos and play our enticing games!
                        </p>
                    </div>
                    <img src="../assets/LandingPagePic3.png" alt="ToDo demo" class="Vocabdemo" style="margin-top:3%;">
                </div>
                <div class="WelcomePrompt WelcomeEnd">
                    <h1> </h1>
                    <router-link to="/register-page" class="TryOutBtnLink">Get started!</router-link>
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
        </div>
    </body>
</template>

<script>
export default {
    name: "LandingPage",
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
    }
};
</script>

<style></style>
