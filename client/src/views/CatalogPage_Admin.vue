<template>
    <body>
        <header>
            <div class="headernav">
                <div class="header-container">
                    <div class="header-image">
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
        <a id="top"></a>
        <div class="catalog-page">
            <div class="search-and-book-container">
                <div class="search-container">
                    <div class="search-bar-container" id="first-searchy-bar">
                        <form action="">
                            <input type="text" placeholder="Search.." name="search">
                            <div><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></div>
                        </form>
                    </div>
                    <div class="lib-button-container">
                        <div><font-awesome-icon icon="fa-regular fa-handshake" style="font-size: 21px; margin-right: 15px;"/></div>
                    </div>
                </div>
                <div class="search-container search-container-fixe hide" id="search-container-fixe">
                    <div class="search-bar-container">
                        <form action="">
                            <input type="text" placeholder="Search.." name="search">
                            <div><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></div>
                        </form>
                    </div>
                    <div class="lib-button-container">
                        <div class="dropdown">
                            <font-awesome-icon icon="fa-regular fa-heart" />
                           
                        </div>
                    </div>
                </div>
                <div class="cat-Navbar-container">
                    <div class="cat-Navbar" >
                        <button class="choose-cat-Btn" v-for = "category in categories" :key = "category" >
                            {{ category }}
                        </button>
                    </div>
                </div>
                <div class="vid-categories-cont" @scroll="onScroll" v-for = "category in categories" :key = "category">
                    <div class="cat-vids-label">
                        {{category}}
                    </div>
                    <div class="hor-scroll-wrap">
                        <div class="hor-scroll">
                            <ul class="item-grid">
                                <li v-for = "i in 10" :key="i">
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic" >
                                    <div class="mini-vid-desc">
                                        <div class="mini-vid-name">
                                            Really cool video
                                        </div>
                                        <div class="mini-vid-author">
                                            <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                            <div class="mini-vid-author-info">
                                                Belvie asso
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a id="TopBtn" href="#top" class="fa fa-angle-double-up hide" style="font-size: 24px"><font-awesome-icon
                icon="fa-solid fa-arrow-up" size="xs" style="color: #fff0fe;" /></a>
        <footer style="margin-top: 40px;">
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
    name: "CatalogPageAdmin",
    components: {
        DarkLightMode,
        UserMenu
    },

    data(){
        return{
            categories:["Animal Cruelty","Ecology","War crimes","Illness Awareness","Fight against cancer","Childhood violence","Domestic Assault","Climate change","Natural Catastrophy support"]
        }
    },
    mounted() {
        var thisID = document.getElementById("TopBtn");
        var SearchClass = document.getElementById("search-container-fixe");
        var myScrollFunc = function () {
            var y = window.scrollY;
            if (y >= 300) {
                thisID.className = "fa fa-angle-double-up show";
            } else {
                thisID.className = "fa fa-angle-double-up hide";
            }
        };
        var myScrollFunc1 = function () {
            var z = window.scrollY;
            if (z >= 315) {
                SearchClass.className = "search-container search-container-fixe show";
            } else {
                SearchClass.className = "search-container-fixe hide";
            }
        };
        window.addEventListener("scroll", myScrollFunc);
        window.addEventListener("scroll", myScrollFunc1);
    },


}
</script>