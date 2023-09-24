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
        <a id="top"></a>
        <div class="catalog-page">
            <!-- <div class="filterblock-container">
                <div class="filter-title-container1">
                    <p class="filter-main-Title">Filters</p>
                </div>
                <div class="filter-container1">

                    <div class="filters-list">
                        <ul>

                            <li class="filters-list-li">
                                <div class="filter-title">
                                    Genre
                                </div>
                                <div class="filters">
                                    <label class="task-container">Action
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">Horror
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">Romance
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">Sci-fi
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </li>
                            <li class="filters-list-li">
                                <div class="filter-title">
                                    Language
                                </div>
                                <div class="filters">
                                    <label class="task-container">English
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">French
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">Arabic
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">German
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </li>
                            <li class="filters-list-li">


                                <div class="filter-title">
                                    Number of pages
                                </div>
                                <div class="filters">
                                    <label class="task-container"> Under 100
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">100 ~ 500
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">500 ~ 1000
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container"> Over 1000
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </li>
                            <li class="filters-list-li">
                                <div class="filter-title">
                                    Parution year
                                </div>
                                <div class="filters">
                                    <label class="task-container">Before 1980
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">1980 ~ 2000
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">2000 ~ 2010
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">2010 ~ 2020
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">After 2020
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> -->
            <div class="search-and-book-container">
                <div class="search-container">
                    <div class="search-bar-container" id="first-searchy-bar">
                        <form action="">
                            <input type="text" placeholder="Search.." name="search">
                            <div><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></div>
                        </form>
                    </div>
                    <div class="lib-button-container">
                        <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                    </div>
                    <!-- <div class="page-turner">
                        <p class="page">Page</p>
                        <font-awesome-icon icon="fa-solid fa-angle-left" class="arrow-left-calendar"
                            @click="ChangeWeek(-1)" />
                        <div class="custom-select">
                            <select>
                                <option value="0">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option value="3">4</option>
                            </select>
                        </div>
                        <font-awesome-icon icon="fa-solid fa-angle-right" class="arrow-left-calendar"
                            @click="ChangeWeek(+1)" />
                    </div> -->
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
                    <!-- <div class="page-turner">
                        <p class="page">Page</p>
                        <font-awesome-icon icon="fa-solid fa-angle-left" class="arrow-left-calendar"
                            @click="ChangeWeek(-1)" />
                        <div class="custom-select">
                            <select>
                                <option value="0">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option value="3">4</option>
                            </select>
                        </div>
                        <font-awesome-icon icon="fa-solid fa-angle-right" class="arrow-left-calendar"
                            @click="ChangeWeek(+1)" />
                    </div> -->
                </div>
                <div class="cat-Navbar-container">
                    <div class="cat-Navbar">
                        <button class="choose-cat-Btn">
                            Animal Cruelty
                        </button>
                        <button class="choose-cat-Btn">
                            Ecology
                        </button>
                        <button class="choose-cat-Btn">
                            War crimes
                        </button>
                        <button class="choose-cat-Btn">
                            Illness Awareness
                        </button>
                        <button class="choose-cat-Btn">
                            Fight against cancer
                        </button>
                        <button class="choose-cat-Btn">
                            Childhood violence
                        </button>
                        <button class="choose-cat-Btn">
                            Domestic Assault
                        </button>
                        <button class="choose-cat-Btn">
                            Climate change
                        </button>
                        <button class="choose-cat-Btn">
                            Natural Catastrophy support
                        </button>
                    </div>
                </div>

                <div class="vid-categories-cont" @scroll="onScroll">
                    <div class="cat-vids-label">
                        Animal Cruelty
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


                <div class="vid-categories-cont" @scroll="onScroll">
                    <div class="cat-vids-label">
                        Ecology
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


                <div class="vid-categories-cont" @scroll="onScroll">
                    <div class="cat-vids-label">
                        Associations @arthur
                    </div>
                    <div class="hor-scroll-wrap assoc-categories-cont">
                        <div class="hor-scroll">
                            <ul class="item-grid">
                                <li>
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
                                    <div class="mini-vid-desc">
                                        <div class="mini-vid-author">
                                            <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                            <div class="book-author-info">
                                                Belvie asso
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                 <li>
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
                                    <div class="mini-vid-desc">
                                        <div class="mini-vid-author">
                                            <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                            <div class="book-author-info">
                                                Belvie asso
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                 <li>
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
                                    <div class="mini-vid-desc">
                                        <div class="mini-vid-author">
                                            <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                            <div class="book-author-info">
                                                Belvie asso
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                 <li>
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
                                    <div class="mini-vid-desc">
                                        <div class="mini-vid-author">
                                            <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                            <div class="book-author-info">
                                                Belvie asso
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                 <li>
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
                                    <div class="mini-vid-desc">
                                        <div class="mini-vid-author">
                                            <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                            <div class="book-author-info">
                                                Belvie asso
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                 <li>
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
                                    <div class="mini-vid-desc">
                                        <div class="mini-vid-author">
                                            <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                            <div class="book-author-info">
                                                Belvie asso
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                 <li>
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
                                    <div class="mini-vid-desc">
                                        <div class="mini-vid-author">
                                            <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                            <div class="book-author-info">
                                                Belvie asso
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                 <li>
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
                                    <div class="mini-vid-desc">
                                        <div class="mini-vid-author">
                                            <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                            <div class="book-author-info">
                                                Belvie asso
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                 <li>
                                    <img src="..\assets\video_example.jpg" alt="vid_pic" class="vid-mini-pic">
                                    <div class="mini-vid-desc">
                                        <div class="mini-vid-author">
                                            <img class="mini-vid-avatar" src="../assets/UserWrite.png" alt="User Write img">
                                            <div class="book-author-info">
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