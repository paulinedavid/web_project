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
                    <router-link to="/video-catalog-page" class="to-page-nav">Videos</router-link>
                    <router-link to="/game-catalog-page" class="to-page-nav">Games</router-link>
                    <router-link to="/organization-catalog-page" class="to-page-nav">Organizations</router-link>
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
                    <img src="..\assets\video_example.jpg" alt="book_pic" class="book-cover-info">
                </div>

                <div class="Titre-desc-container"></div>
                <div class="Book-info-specs-container">
                    <div class="book-title-info">
                        Super Game avec un Super Titre
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
                            Belvie asso
                        </div>
                        <button class="visit-page-btn">Visit Page</button>
                        <button class="donate-btn">Donate</button>
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
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                    massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
                    felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                    justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                    venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                    Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
                    consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                    Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi
                    vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
                    eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. </div>
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
                            <li v-for="i in 10" :key="i">
                                <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
                                <div class="mini-vid-desc">
                                    <div class="mini-vid-name">
                                        Really cool game
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
import UserAvatar from "../assets/User.png"
export default {
    name: "GameInfoPage",
    components: {
        DarkLightMode,
        UserMenu
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

        this.setContainerScroll();
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
    },

}
</script>