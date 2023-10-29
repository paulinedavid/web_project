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
        <!-- <div class="login-color-container" style="z-index:0">
        <div class="login-color"></div>
        <div class="login-color"></div>
        <div class="login-color"></div>
        <div class="login-color"></div>
        </div> -->
        <a id="top"></a>
        <div class="login-color-container" style="z-index:0;"><div class="contrast"></div>
        <div class="login-color" style = "display: none;"></div>
        <div class="login-color"></div>
        <div class="login-color"></div>
        <div class="login-color"></div></div>
        
        <div class="Asso-info-page-container">
            
            <div class="asso-presentation-cont">
                <div class="asso-name-profile">
                <div class="HomeImages">
                    <div class="iDpicDiv"><img src="..\assets\profile_pic.avif" alt="Profile pic asso" class="iDpic"></div>
                    <div class="BigiDpicDiv"><img src="..\assets\profile_pic.avif" alt="Profile pic asso" class="BigiDpic"></div>
                    <div class="SmalliDpicDiv"><img src="..\assets\profile_pic.avif" alt="Profile pic asso" class="SmalliDpic">
                    </div>
                    
                </div>
                <div class="asso-name">
                        {{ organization.name }}
                    </div></div>
                <div class="follow-container"> 
                    <div class="follow-icon"><button :class="isSubscribed?'join-asso-Btn-joined':'join-asso-Btn'" @click="subscribe()">
                        <!-- <font-awesome-icon icon="fa-regular fa-bell" />  -->
                        <font-awesome-icon icon="fa-regular fa-handshake" style="font-size: 21px; margin-right: 15px;"/>
                        Join
                        </button></div>
                    <div class="follow-number">{{ organization.nb_membres }}</div>
                    <div class="follow-member">Members</div>
                </div>
            </div>
            <div class="pinned-container">
                <div class="vid-pinned" @scroll="onScroll">
                    <div class="cat-vids-label">
                        Watch
                    </div>
                    <div class="hor-scroll-wrap1">
                        <div class="hor-scroll">
                            <ul class="item-grid1">
                                <li>
                                    <router-link :to="{ path: 'video-info-page', query: { video_id: pined_video.id }}">
                                        <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-pinned-pic">
                                    </router-link>
                                    <div class="mini-vid-desc">
                                        <div class="mini-vid-name">
                                            {{ pined_video.name }}
                                        </div>
                                        <div class="mini-vid-author">
                                            <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                            <div class="mini-vid-author-info">
                                                {{ pined_video.organization.name }}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div class="vid-pinned" @scroll="onScroll">
                    <div class="cat-vids-label">
                        Play
                    </div>
                    <div class="hor-scroll-wrap1">
                        <div class="hor-scroll">
                            <ul class="item-grid1">
                                <li>
                                    <router-link :to="{ path: 'game-info-page', query: { game_id: pined_game.id }}">
                                        <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-pinned-pic">
                                    </router-link>
                                    <div class="mini-vid-desc">
                                        <div class="mini-vid-name">
                                            {{ pined_game.name }}
                                        </div>
                                        <div class="mini-vid-author">
                                            <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                            <div class="mini-vid-author-info">
                                                {{ pined_game.organization.name }}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
            <div class="asso-summary-label-cont">
                <div class="asso-summary-label">
                    Our Mission...
                </div>
                <div class="asso-summary-container">
                    {{ organization.description }}
                </div>
                <div class="donate-asso-btn">
                    <button class="choose-cat-Btn">
                        Join the cause
                    </button>
                </div>
            </div>

            <div class="vid-categories-cont" @scroll="onScroll">
                <div class="cat-vids-label">
                    Videos
                </div>
                <div class="hor-scroll-wrap">
                    <div class="hor-scroll">
                        <ul class="item-grid">
                            <li v-for="video in other_videos" :key= video.id >
                                <router-link :to="{ path: 'video-info-page', query: { video_id: video.id }}">
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
                                </router-link>
                                <div class="mini-vid-desc">
                                    <div class="mini-vid-name">
                                        {{video.name}}
                                    </div>
                                    <div class="mini-vid-author">
                                        <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                        <div class="mini-vid-author-info">
                                            {{video.organization}}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

            <div class="vid-categories-cont" @scroll="onScroll" style="margin-top: 25px;">
                <div class="cat-vids-label">
                    Games
                </div>
                <div class="hor-scroll-wrap">
                    <div class="hor-scroll">
                        <ul class="item-grid">
                            <li v-for="game in other_games" :key= game.id >
                                <router-link :to="{ path: 'game-info-page', query: { game_id: game.id }}">
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
                                </router-link>
                                <div class="mini-vid-desc">
                                    <div class="mini-vid-name">
                                        {{ game.name }}
                                    </div>
                                    <div class="mini-vid-author">
                                        <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                        <div class="mini-vid-author-info">
                                            {{ game.organization }}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
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
    data() {
        return {
            organization:{name:"name", description:"description", nb_membres:1000 },
            pined_video:{name:"video_name",organization:"video_organization"},
            other_videos:[],
            pined_game:{name:"game_name",organization:"game_organization"},
            other_games:[],
            isSubscribed:false,
        }
    },
    methods: {
        scrollTop(){
            console.log("scrollTop")
            window.scrollTo({top: 0, behavior: 'smooth'});
        },
        getOrganization(org_id){
            axios.get(`${localStorage.getItem("addressServer")}/org/id`,{params:{org_id:org_id,token:localStorage.getItem('token')}})
                .then(response => {
                    this.organization = response.data;
                    this.isSubscribed = response.data.isSubsribed
                    console.log(response)
                    console.log("Organization  "+JSON.stringify(this.organization))
                    this.getPinedVideo()
                    this.getOtherVideos()
                    this.getPinedGame()
                    this.getOtherGames()
                })
                .catch(error => {
                    console.log(error.message);
                })
        },

        getPinedVideo() {
            console.log(JSON.stringify(this.organization.id_pined_video))
            axios.get(`${localStorage.getItem("addressServer")}/vid/id`,{params:{video_id:this.organization.id_pined_video}})
                .then(response => {
                    this.pined_video = response.data;
                })
                .catch(error => {
                    console.log(error.message);
                })

        },
        getOtherVideos() {
            console.log(JSON.stringify(this.video))
            axios.get(`${localStorage.getItem("addressServer")}/vid/filtered`,{params:{id_org:this.organization.id}})
                .then(response => {
                    this.other_videos = response.data;
                    console.log("videos  "+JSON.stringify(this.videos))
                })
                .catch(error => {
                    console.log(error);
                })
        },

        getPinedGame() {
            console.log(JSON.stringify(this.organization.id_pined_game))
            axios.get(`${localStorage.getItem("addressServer")}/game/id`,{params:{game_id:this.organization.id_pined_game}})
                .then(response => {
                    this.pined_game = response.data;
                })
                .catch(error => {
                    console.log(error.message);
                })

        },

        getOtherGames() {
            console.log(JSON.stringify(this.game))
            axios.get(`${localStorage.getItem("addressServer")}/game/filtered`,{params:{id_org:this.organization.id}})
                .then(response => {
                    this.other_games = response.data;
                    console.log("games  "+JSON.stringify(this.games))
                })
                .catch(error => {
                    console.log(error);
                })
        },

        subscribe(){
            axios.post(`${localStorage.getItem("addressServer")}/org/subscribe`,{org_id:this.organization.id,token:localStorage.getItem("token")})
                .then(response => {
                    console.log(this.isSubscribed)
                    this.isSubscribed = response.data
                })
                .catch(error => {
                    console.log(error);
                })
        },
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

        const urlParams = new URLSearchParams(window.location.search);
        this.getOrganization(parseInt(urlParams.get('org_id')))
    },

}
</script>