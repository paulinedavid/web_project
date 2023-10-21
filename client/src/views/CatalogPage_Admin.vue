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
                    <router-link to="/video-catalog-page" class="to-page-nav" @click="getThemes">Videos</router-link>
                    <router-link to="/game-catalog-page" class="to-page-nav" @click="getThemes">Games</router-link>
                    <router-link to="/organization-catalog-page" class="to-page-nav" @click="getThemes">Organizations</router-link>
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
                        <!-- <form action=""> -->
                            <input type="text" placeholder="Search.." name="search" v-model="searchbar" @change="getThemes">
                            <div><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></div>
                        <!-- </form> -->
                    </div>
                    <div class="lib-button-container">
                        <div @click="filterJoined = !filterJoined; getThemes()"><font-awesome-icon icon="fa-regular fa-handshake" style="font-size: 21px; margin-right: 15px;"/></div>
                    </div>
                </div>
                <div class="search-container search-container-fixe hide" id="search-container-fixe">
                    <div class="search-bar-container">
                        <!-- <form action=""> -->
                            <input type="text" placeholder="Search.." name="search" v-model="searchbar" @change="getThemes">
                            <div><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></div>
                        <!-- </form> -->
                    </div>
                    <div class="lib-button-container">
                        <div class="dropdown">
                            <font-awesome-icon icon="fa-regular fa-heart" />
                           
                        </div>
                    </div>
                </div>
                <div class="cat-Navbar-container">
                    <div class="cat-Navbar" >
                        <div class="choose-cat-Btn" v-for = "theme in filteredThemes" :key = "theme.id" @click="scrollToComponent('video_cont-'+theme.id)" >
                            {{ theme.name }}
                        </div>
                    </div>
                </div>

                <div class="vid-categories-cont" @scroll="onScroll" :id="'video_cont-'+theme.id" v-for = "theme in filteredThemes" :key = "theme.id"  >
                    <div class="cat-vids-label">
                        {{theme.name}}
                    </div>
                    <div :class="page!='organization'?'hor-scroll-wrap':'hor-scroll-wrap assoc-categories-cont'">
                        <div class="hor-scroll">
                            <ul class="item-grid">
                                <li  v-for = "item in items[theme.id]" :key="item.id" >
                                    <RouterLink v-if="page==='video'" :to="{ path: 'video-info-page', query: { video_id: item.id }}">
                                        <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic" >
                                    </RouterLink>
                                    <RouterLink v-if="page==='game'" :to="{ path: 'game-info-page', query: { game_id: item.id }}">
                                        <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic" >
                                    </RouterLink>
                                    <RouterLink v-if="page==='organization'" :to="{ path: 'organization-info-page', query: { org_id: item.id }}">
                                        <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic" >
                                    </RouterLink>
                                    <div v-if="page!=='organization'" class="mini-vid-desc">
                                        <div class="mini-vid-name">
                                            {{item.name}}
                                        </div>
                                        <div class="mini-vid-author">
                                            <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                            <div class="mini-vid-author-info">
                                                {{item.organization}}
                                            </div>
                                        </div>
                                    </div> 
                                    <div v-if="page==='organization'" class="mini-vid-desc">
                                        <div class="mini-vid-author">
                                            <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                            <div class="book-author-info">
                                                {{item.name}}
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
        <button id="TopBtn"  class="fa fa-angle-double-up hide" style="font-size: 24px" @click="scrollTop"><font-awesome-icon
                icon="fa-solid fa-arrow-up" size="xs" style="color: #fff0fe;" /></button>
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
import axios from "axios";
export default {
    name: "CatalogPageAdmin",
    components: {
        DarkLightMode,
        UserMenu
    },

    data(){
        return{
            themes:[],
            items:{},
            searchbar:"",
            page:null,
            filterJoined:false,

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
        this.getThemes();
        
    },
    computed: {
        filteredThemes() {
            return this.themes.filter(theme => this.items[theme.id] && this.items[theme.id].length > 0);
        }
    },
    methods: {
        onScroll() {
            console.log("scrolling");
        },
        
        scrollToComponent(idComponent) {
            const component = document.getElementById(idComponent);
            console.log('scrool to '+idComponent)
            if (component) {
                component.scrollIntoView({ behavior: 'smooth' });
            }
        },

        scrollTop(){
            console.log("scrollTop")
            window.scrollTo({top: 0, behavior: 'smooth'});
        },

        getThemes() {
            console.log("getThemes");
            fetch(`${localStorage.getItem("addressServer")}/theme/all`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Network response was not ok.");
                    }
                })
                .then((data) => {
                    this.themes = data;
                    if(this.$route.path == "/game-catalog-page"){
                        this.page="game"
                        this.themes.forEach(theme => {
                        this.getFilteredGame(theme);
                        })
                    } 
                    else if(this.$route.path == "/video-catalog-page"){
                        this.page="video"
                        this.themes.forEach(theme => {
                        this.getFilteredVideo(theme);
                        })
                    }
                    else if(this.$route.path == "/organization-catalog-page"){
                        this.page="organization"
                        this.themes.forEach(theme => {
                        this.getFilteredOrganization(theme);
                        })
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        getFilteredVideo(theme) {
            //console.log("getfiltered "+JSON.stringify(theme))
            axios.get(`${localStorage.getItem("addressServer")}/vid/filtered`,{params:{themes:[theme],name:this.searchbar,joined:this.filterJoined,token:localStorage.getItem('token')}})
                .then(response => {
                    this.items[theme.id] = response.data;
                    //console.log("videos  "+JSON.stringify(this.videos))
                })
                .catch(error => {
                    console.log(error);
                })
        },

        getFilteredGame(theme) {
            axios.get(`${localStorage.getItem("addressServer")}/game/filtered`,{params:{themes:[theme],name:this.searchbar,joined:this.filterJoined,token:localStorage.getItem('token')}})
                .then(response => {
                    this.items[theme.id] = response.data;
                    //console.log("Games  "+JSON.stringify(this.items))
                })
                .catch(error => {
                    console.log(error.message);
                })
        },

        getFilteredOrganization(theme){
            axios.get(`${localStorage.getItem("addressServer")}/org/filtered`,{params:{themes:[theme],name:this.searchbar,joined:this.filterJoined,token:localStorage.getItem('token')}})
                .then(response => {
                    this.items[theme.id] = response.data;
                    //console.log("Organizations  "+JSON.stringify(this.items))
                })
                .catch(error => {
                    console.log(error.message);
                })
        },
    }
}
</script>