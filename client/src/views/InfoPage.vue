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
        <a id="top"></a>

        <div class="Book-page-container">
            <div class="Book-info-container">
                <div class="Book-image-container">
                    <!--<img src="..\assets\video_example.jpg" alt="book_pic" class="book-cover-info">-->
                    <!--<video id="video-player" playsinline controls :data-poster="addressServer + '/files/'+this.id+'.png'" style="max-height: 50vh;">-->
                    <video id="video-player" playsinline controls style="max-height: 50vh;">
                      <!--<source src="../../../server/vid/13.mp4" type="video/mp4" />-->
                      <!--<source :src="addressServer + '/files/' + this.id +'.mp4'" type="video/mp4" />-->

                      <!-- Captions are optional -->
                      <!--<track kind="captions" label="English captions" src="/path/to/captions.vtt" srclang="en" default />-->
                    </video>
                </div>

                <div class="Titre-desc-container"></div>
                <div class="Book-info-specs-container">
                    <div class="book-title-info">
                        {{item.name}}
                        <!-- <div class="rate">
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label for="star5" title="Must read - 5">5 stars</label> -->
                        <!-- <input type="radio" id="star4" name="rate" value="4" />
                        <label for="star4" title="Really good - 4">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label for="star3" title="Entertaining - 3">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label for="star2" title="Passable - 2">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label for="star1" title="No comment - 1">1 star</label> -->
                        <!-- </div> -->
                    </div>
                    <div class="Asso-pic-name">
                        <img class="comment-avatar" src="../assets/UserWrite.png" alt="User Write img">
                        <div class="book-author-info">
                            {{ item.organization.name }}
                        </div>
                        <router-link class="visit-page-btn" :to="{ path: 'organization-info-page', query: { org_id: item.organization.id }}" >Visit Page</router-link>
                        <button class="donate-btn" @click="redirectToExternalSite(item.organization.url_gofounding);">Donate</button>
                    </div>
                    <div class="date-and-language-info">
                        2023
                    </div>
                    <!-- <div class="book-genres-info">
                        Romance, Action
                    </div> -->

                    <!-- <div class="lib-button-container adapted-wishlist" style="padding-left: 35px; padding-top: 40px; ">
                        <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                        <div><font-awesome-icon icon="fa-regular fa-bookmark" /></div>
                    </div> -->
                </div>
                <div class="summary-container">
                    {{ item.description }} </div>
                <!-- <div class="save-share-info">
                    <div>
                        <router-link to="/book-read-page" class="LogRegBtnLink"
                            style="--shadow: #9216ffd1; --color: #f291bb; --background: #f291bbba; text-align: center;">Read</router-link>
                    </div>
                    <div class="help-question">
                        <label for="fname" class="help-label label-recs-book" style="text-align: center; ">Want to share
                            this book with someone?</label>
                        <input type="text" id="fname" name="fname" class="help-input label-recs-book" placeholder="Email"
                            v-model="email"><br>
                    </div>
                --><!-- <p class="Form-question"><i class="fa fa-bold" aria-hidden="true">Number of pages*</i> </p>
                                <div class="loginInputBox">
                                    <input v-model="email" type="text" name="txtEmail" placeholder="Number of pages">
                                </div> --><!--
                    <button to="/register-page" @click="OpenDeleteTask()" class="LogRegBtnLink"
                        style="--shadow: #f291bb; --color: rgb(162, 85, 255,0.3); --background: #c18cd6; border-top: transparent; border-left:transparent; margin-top: 10px;">Share</button>
                    <p class="book-disclaimer-info">*Read/Share available for 30 days</p>


                </div> -->

            </div>

            <div class="suggested-vids-label">
                You might also like...
            </div>
            <div class="you-might-like-cont" @scroll="onScroll">
                <div class="hor-scroll-wrap" >
                    <div class="hor-scroll" >
                        <ul class="item-grid" >
                            
                            <li v-for="i in other_items" :key="i.id">
                                <router-link :to="item_type === 'video' ? { path: 'video-info-page', query: { video_id: i.id } } : { path: 'game-info-page', query: { game_id: i.id } }" @click="getItem(i.id)">
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
                                </router-link>
                                <div class="mini-vid-desc">
                                    <div class="mini-vid-name">
                                        {{i.name}}
                                    </div>
                                    <div class="mini-vid-author">
                                        <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                        <div class="mini-vid-author-info">
                                            {{i.organization}}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            <div class="Comment-section-container">
                <div class="FAQcontainer">
                    <!-- <h3 class="comment-container-title">Feedback & Comments</h3> -->
                    <div class="comments">
                        <div class="comment flex items-start justify-start">
                            <img class="comment-avatar" src="../assets/UserMe.png" alt="Admin img">
                            <div class="flex-1">
                                <h3 class="comment-author1">Admin</h3>
                                <p class="comment-body">What did you think about this book ? Feel free to speak your mind !
                                </p>
                            </div>
                        </div>
                    </div>
                    <!--------------------------------------------------Comment input section--------------------------------------------------------------->

                    <div class="comment comment-new flex items-start justify-start">
                        <img class="comment-avatar" src="../assets/UserWrite.png" alt="User Write img">
                        <div class="flex-1">

                            <form action="#" class="comment-form">
                                <textarea placeholder="Username" class="comment-author"></textarea>
                                <textarea placeholder="Add your comment" class="comment-input"></textarea>
                                <input type="submit" class="comment-submit" value="Submit">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="myModalDeleteTask" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <span class="close" @click='CloseDeleteTask'>&times;</span>
                    <h1 class="modal-Title">Share this Book ?</h1>
                    <div class="modal-center">
                        <p style="margin-top: 50px; margin-bottom: 10px;">Are you sure you want to share this Book with the
                            following email address?</p>
                        <div class="message"> {{ message }}</div>
                        <div class="help-question">
                            <input type="text" id="fname" name="fname" class="help-input" placeholder="Email"
                                v-model="email"><br>
                        </div>
                        <div class="delete-list-button">
                            <div class="AddTaskInputBox no">
                                <input class="close" type="submit" value="Cancel" name="submit" @click='CloseDeleteTask' />
                            </div>
                            <div class="AddTaskInputBox no">
                                <input style="margin-left: 0px;" type="submit" value="Share" name="submit"
                                    @click='DeleteTask' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button id="TopBtn"  class="fa fa-angle-double-up hide" style="font-size: 24px" @click="scrollTop"><font-awesome-icon
                icon="fa-solid fa-arrow-up" size="xs" style="color: #fff0fe;" /></button>
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
    <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
</template>


<script>
import UserMenu from "../components/UserMenu.vue";
import DarkLightMode from "../components/DarkLightMode.vue";
import UserAvatar from "../assets/User.png"
import axios from "axios";
import Plyr from 'plyr';
import { ref } from 'vue';

export default {
    name: "BookInfoPage",
    components: {
        DarkLightMode,
        UserMenu
    },
    data(){
        return{
            item_type: this.$route.query.video_id ? "video" : "game",
            item:{name:"",organization:"",description:""},
            other_items:[],
            addressServer: localStorage.getItem('addressServer'),
            id: this.$route.query.video_id ?? this.$route.query.game_id,
            player: ref(null),
        }

    },
    mounted() {
        // Setup the video player
        // eslint-disable-next-line no-unused-vars
//        const player = new Plyr('#video-player');
        this.player = new Plyr('#video-player');
//        console.log(this.addressServer + "/files/" + this.id + "_thumbs.vtt");
//        player.setPreviewThumbnails({src: this.addressServer + "/files/" + this.id +"_thumbs.vtt", enabled: true})
//        this.player.setPreviewThumbnails({src: this.addressServer + "/files/" + this.id +"_thumbs.vtt", enabled: true})
        // TODO : Set the player source manually each time the function getVideo() is called.
        // This will allow the video to change when we click on another video in the "recommended videos" section.

        const urlParams = new URLSearchParams(window.location.search);

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

        const submit = document.querySelector('.comment-submit');
        const commentList = document.querySelector('.comments');
        const commentAuthor = document.querySelector('.comment-author');
        const commentInput = document.querySelector('.comment-input');


        function template(data) {
            commentList.insertAdjacentHTML("beforeend", `
            <div class="comment flex items-start justify-start">
                <img class="comment-avatar" :src="avatar" />
                <div class="flex-1">
                    <h3 class="comment-author1">${data.author}</h3>
                    <p class="comment-body">${data.comment}</p>
                </div>
                </div>
            </div>`);
        }

        function appendComment(event) {

            const data = {

                avatar: UserAvatar,
                author: commentAuthor.value,
                comment: commentInput.value,
                

            };

            event.preventDefault();

            if (commentInput.value.length < 1) return;

            // Insert new template into DOM
            template(data);

            // Reset Author text area value
            commentAuthor.value = "";

            // Reset text area value
            commentInput.value = "";

            // Save the list to localStorage
            localStorage.setItem('commentListing', JSON.stringify(commentList.innerHTML));
        }


        submit.addEventListener('click', appendComment, false)

        // Check for saved items

        const saved = JSON.parse(localStorage.getItem('commentListing'));

        // If there are any saved items, update the current list
        if (saved) {
            commentList.innerHTML = saved;
        }

//        var itemId = null
        if (urlParams.get('video_id')){
            this.item_type = "video"
//            itemId = parseInt(urlParams.get('video_id'));
        }
        else if (urlParams.get('game_id')){
            this.item_type = "game"
//            itemId = parseInt(urlParams.get('game_id'));
        }

        this.getItem(this.id);

//        this.setContainerScroll();
    },
    methods: {
        OpenDeleteTask(id) {

            this.DeleteTaskIndex = id;
            document.getElementById("myModalDeleteTask").style.display = "block";
        },
        CloseDeleteTask() {
            document.getElementById("myModalDeleteTask").style.display = "none";
        },

        setContainerScroll() {
            // Your setContainerScroll logic here
            const $this = this.$el.querySelector('.hor-scroll');
            const scrollLeft = $this.scrollLeft;
            const maxScrollWidth = $this.offsetWidth;
            const maxScrollAmt = $this.querySelector('ul').scrollWidth - maxScrollWidth;

            if (scrollLeft >= maxScrollAmt) {
                this.$el.classList.add('scrolled-right');
            } else {
                this.$el.classList.remove('scrolled-right');
            }

            if (scrollLeft > 0) {
                this.$el.classList.add('scrolled-left');
            } else {
                this.$el.classList.remove('scrolled-left');
            }
        },
        
        onScroll() {
            this.setContainerScroll();
        },

        scrollTop(){
            console.log("scrollTop")
            window.scrollTo({top: 0, behavior: 'smooth'});
        },

        redirectToExternalSite(externalSiteUrl) {
            window.open(externalSiteUrl, '_blank');
        },

        getItem(item_id){
            if (this.item_type == null){
                console.log("item type is null")
                return
            }
            else if (this.item_type == "video"){
                this.getVideo(item_id)
            }
            else if (this.item_type == "game"){
                this.getGame(item_id)
            }
        },
        
        getVideo(video_id) {
            //console.log(JSON.stringify(video_id))
            axios.get(`${localStorage.getItem("addressServer")}/vid/id`,{params:{video_id:video_id}})
                .then(response => {
                    this.item = response.data;
                    //console.log("Video  "+JSON.stringify(this.video))

                    this.getOtherVideos()

//                    this.player.destroy();
//                    this.player = new Plyr('#video-player');
                    this.player.source = {
                        type: 'video',
                        title: this.item.name,
                        sources: [
                            {
                                src: this.addressServer + "/files/" + this.item.id + ".mp4",
                                type: 'video/mp4'
                            }
                        ],
                        poster: this.addressServer + "/files/" + this.item.id + ".png",
                        previewThumbnails: {
                            src: this.addressServer + "/files/" + this.item.id + "_thumbs.vtt",
                            enabled: true
                        }
                    };

                    console.log("LOADED VIDEO " + this.item.name);
                })
                .catch(error => {
                    console.log(error.message);
                })
        },
        
        getOtherVideos() {
            //console.log(JSON.stringify(this.video))
            axios.get(`${localStorage.getItem("addressServer")}/vid/filtered`,{params:{id_org:this.item.id_org}})
                .then(response => {
                    this.other_items = response.data;
                    //console.log("videos  "+JSON.stringify(this.items))
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getGame(game_id) {
            //console.log(JSON.stringify(game_id))
            axios.get(`${localStorage.getItem("addressServer")}/game/id`,{params:{game_id:game_id}})
                .then(response => {
                    this.item = response.data;
                    this.getOtherGames()
                    //console.log("Game  "+JSON.stringify(this.game))
                })
                .catch(error => {
                    console.log(error.message);
                })

        },
        getOtherGames(){
            console.log(JSON.stringify(this.game))
            axios.get(`${localStorage.getItem("addressServer")}/game/filtered`,{params:{id_org:this.item.id_org}})
                .then(response => {
                    this.other_items = response.data;
                    //console.log("games  "+JSON.stringify(this.items))
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }
    

}
</script>