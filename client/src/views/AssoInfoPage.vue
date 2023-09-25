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
        <!-- <div class="login-color-container" style="z-index:0">
        <div class="login-color"></div>
        <div class="login-color"></div>
        <div class="login-color"></div>
        <div class="login-color"></div>
        </div> -->
        <a id="top"></a>

        <div class="Asso-info-page-container">

            <div class="asso-presentation-cont">
                <div class="follow-container">
                    <div class="follow-icon"><button class="join-asso-Btn">
                        <font-awesome-icon icon="fa-regular fa-heart" /> Join
                        </button></div>
                    <div class="follow-number">154263</div>
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
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-pinned-pic">
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
                <div class="vid-pinned" @scroll="onScroll">
                    <div class="cat-vids-label">
                        Play
                    </div>
                    <div class="hor-scroll-wrap1">
                        <div class="hor-scroll">
                            <ul class="item-grid1">
                                <li>
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-pinned-pic">
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
            </div>
            <div class="asso-summary-label-cont">
            <div class="asso-summary-label">
                Our Mission...
            </div>
            <div class="asso-summary-container">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
                felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
                consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi
                vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
                eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.
            </div></div>

            <div class="vid-categories-cont" @scroll="onScroll">
                <div class="cat-vids-label">
                    Videos
                </div>
                <div class="hor-scroll-wrap">
                    <div class="hor-scroll">
                        <ul class="item-grid">
                            <li>
                                <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
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
                            <li>
                                <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
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
                            <li>
                                <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
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
                            <li>
                                <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
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
                            <li>
                                <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
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
                            <li>
                                <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
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
                            <li>
                                <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
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
                            <li>
                                <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
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
                            <li>
                                <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
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

            <div class="vid-categories-cont" @scroll="onScroll" style="margin-top: 25px;">
                <div class="cat-vids-label">
                    Games
                </div>
                <div class="hor-scroll-wrap">
                    <div class="hor-scroll">
                        <ul class="item-grid">
                            <li>
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
                            <li>
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
                            <li>
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
                            <li>
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
                            <li>
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
                            <li>
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
                            <li>
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
                            <li>
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
                            <li>
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
}
</script>