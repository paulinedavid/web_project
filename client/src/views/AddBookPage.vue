<template>
  <body>
    <a id="top"></a>
    <div class="FormPage2" style="overflow-y: hidden">
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
      <div class="FormBox" style="margin-top: -50px;">
        <div class="FormContainer">
          <div class="Form-banner-container">
            <div class="loginForm">
              <h2>Add a video</h2>
              <p class="Form-presentation" style="text-align: center">
                <br />
                Please fill in
                <i class="fa fa-bold" aria-hidden="true">all</i> the necessary
                information <br /><br />
                The mandatory fields are marked by a * <br /><br />
              </p>
              <!--<form :action="addressServer + '/vid/upload'" method="post" @submit.prevent="handleSend">-->
              <!--<form action="#" method="post" @submit.prevent="handleSend">-->
                <div class="Form-question">
                  <p class="CharacterLimitMessage" style="color: red" v-if="bookAlreadyExists">
                    Video already stored in the database.
                  </p>
                  <label for="file-upload">
                    <p class="Form-question">
                      <i class="fa fa-bold" aria-hidden="true">Video's *** file*</i>
                    </p>
                  </label>
                  <div class="AddBookInput" style="margin-top:15px;">
                    <!--<button class="Form-File-Btn" style="margin-right: 5px; margin-bottom: 8px"-->
                    <!--  @click="$refs.epubfileupload.click()">-->
                    <button class="Form-File-Btn" style="margin-right: 5px; margin-bottom: 8px"
                      @click="$refs.videoFile.click()">
                      Click here
                    </button>
                    <!--<input type="file" id="epubfile-upload" ref="epubfileupload" name="file-upload" class="loginInputBox"-->
                    <!--  placeholder="Upload a screenshot of the issue." @change="handleEpubFileChange"-->
                    <!--  style="display: none" />-->
                    <input type="file" id="videoFile" ref="videoFile" name="videoFile" class="loginInputBox"
                      placeholder="Please select a video to upload." @change="handleVideoFileChange"
                      style="display: none" />
                    <!--{{ labelTextEpub }}-->
                    {{ labelTextVideo }}
                  </div>
                </div>
                <p class="Form-question">
                  <i class="fa fa-bold" aria-hidden="true">Video's title*</i>
                </p>
                <div class="loginInputBox">
                  <input v-model="title" type="text" name="txtEmail" placeholder="Title" />
                </div>

                <p class="Form-question">
                  <i class="fa fa-bold" aria-hidden="true">Video's author*</i>
                </p>
                <div class="loginInputBox">
                  <input v-model="author" type="text" name="txtEmail" placeholder="Name or Id of the organization." />
                </div>

                <p class="Form-question">
                  <i class="fa fa-bold" aria-hidden="true">Video's themes*</i>
                </p>
                <div class="loginInputBox">
                  <input v-model="themes" type="text" name="txtEmail" placeholder="Format ex: Ecology, Climate Change" />
                </div>

                <div class="Form-question">
                  <label for="file-upload">
                    <p class="Form-question">
                      <i class="fa fa-bold" aria-hidden="true">Video's thumbnail picture*</i>
                    </p>
                  </label>
                  <div class="AddBookInput" style="margin-top:15px;">
                    <button class="Form-File-Btn" style="margin-right: 15px; margin-bottom: 8px"
                      @click="$refs.thumbnailFile.click()">
                      Click here
                    </button>
                    <input type="file" id="thumbnailFile" ref="thumbnailFile" name="file-upload" @change="handleThumbnailFileChange"
                      style="display: none" />
                    {{ labelTextThumbnail }}
                  </div>
                </div>
                <p class="Form-question">
                  <i class="fa fa-bold" aria-hidden="true">Publication year</i>
                </p>
                <div class="loginInputBox">
                  <input v-model="publication_year" type="text" name="txtEmail" placeholder="Year in 4 digits" />
                </div>
                <p class="Form-question">
                  <i class="fa fa-bold" aria-hidden="true">Video's summary*</i>
                </p>
                <div class="loginInputBox">
                  <p class="CharacterLimitMessage" style="color: red" v-if="resumeExceedsLimit">
                    Summary should not exceed 1000 characters.
                  </p>
                  <textarea name="" id="" cols="30" rows="10" class="add-book-input" placeholder="Enter a short summary."
                    v-model="resume" @input="handleResumeInput"></textarea><br />
                </div>
                <br /><br />
                <div class="loginInputBox FormInputBox">
                  <p class="CharacterLimitMessage" style="color: red; text-align: center; font-weight: bold"
                    v-if="bookAlreadyExists">
                    Video already stored in the database.
                  </p>
                  <p class="CharacterLimitMessage" style="color: red; text-align: center; font-weight: bold"
                    v-if="notComplete">
                    Please fill all the fields with a * !
                  </p>
                  <p class="CharacterLimitMessage" style="text-align: center; font-weight: bold">
                    {{ labelStatus }}
                  </p>
                  <p class="CharacterLimitMessage" style="text-align: center; font-weight: bold" v-if="sent">
                    Video successfully added !
                  </p>

                  <input type="submit" value="Submit Information" name="btnUpdate" @click="handleSend()" />
                </div>
                <p class="Form-forgotPswd">
                  Done here ?
                  <router-link to="/organization-catalog-page">Go back</router-link>
                </p>
              <!--</form>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <a id="TopBtn" href="#top" class="fa fa-angle-double-up hide" style="font-size: 24px"><font-awesome-icon
        icon="fa-solid fa-arrow-up" size="xs" style="color: #fff0fe" /></a>
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
// import DarkLightMode from "../components/DarkLightMode.vue";
import axios from 'axios';
export default {
  name: "EntryFormPage2",
  components: {
    UserMenu,
    // DarkLightMode
  },
  data() {
    return {
      title: "",
      author: "",
      resume: "",
      publication_year: "",
      themes: "",
      sent: false,
      error: false,
      labelTextVideo: "No file selected",
      labelTextThumbnail: "No file selected",
      resumeExceedsLimit: false,
//      bookAlreadyExists: false,
      notComplete: false,
//      genres: [],
//      nbGenre: 1,
      addressServer: localStorage.getItem('addressServer'),
      videoFile: '',
      thumbnailFile: '',
      uploadPercentage: 0,
      labelStatus: ''
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
    this.fetchGenres();
    console.log(this.genres);
  },
  methods: {
    fetchGenres() {
      fetch(this.addressServer + "/api/livre/getgenres")
        .then((response) => response.json())
        .then((data) => {
          this.genres = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleSend() {
      // TODO: Check if the fields have been completed!

      console.log("Sending video...");
      console.log("Sending file " + this.videoFile.name);

      let formData = new FormData();
      formData.append('video_file', this.videoFile);
      formData.append('thumbnail_file', this.thumbnailFile);
      formData.append('title', this.title);
      formData.append('author', this.author);
      formData.append('publication_year', this.publication_year);
      formData.append('description', this.resume);
      formData.append('themes', this.themes);

      axios.post(this.addressServer + '/vid/upload',
                 formData,
                 {
                   headers: {
                    'Content-Type': 'multipart/form-data'
                   },
                   onUploadProgress: function(progressEvent) {
                     this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100));
                     console.log(this.uploadPercentage + '%');
                     this.labelStatus = `Uploading... ${this.uploadPercentage}%`;

                     if (this.uploadPercentage === 100) {
                       this.labelStatus = "Working magic...";
                     }
                   }.bind(this)
                 }
      ).then(function() {
        this.labelStatus = '';
        this.sent = true;
        console.log("File was uploaded!");
      }.bind(this)).catch(function(e) {
        this.labelStatus = "An error occurred while uploading the video!";
        console.error("File was not uploaded!");
        console.error(e);
      }.bind(this));
    },
    handleSendOld() {
      console.log(this.name, this.email, this.summary, this.details, this.link);
      // const fdata = new FormData();
      console.log(this.selectedGenres);

      if (
        this.titre == "" ||
        this.auteur == "" ||
        this.pages == "" ||
        this.resume == "" ||
        this.url == "" ||
        this.date_parution == "" ||
        this.image_src == "" ||
        this.selectedGenres == [] ||
        this.langue == ""
      ) {
        this.sent = false;
        this.error = true;
        this.notComplete = true;
        return "Fill every field with a * !";
      }

      this.error = false;

      const data = {
        titre: this.titre,
        auteur: this.auteur,
        pages: this.pages,
        resume: this.resume,
        url: this.url,
        date_parution: this.date_parution,
        image_src: this.image_src,
        genres: this.selectedGenres,
        langue: this.langue,
      };

      console.log(data.genres);

      const jsonData = JSON.stringify(data);

      fetch(this.addressServer + "/api/livre/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((error) => {
              throw new Error(JSON.stringify(error));
            });
          }
        })
        .then((data) => {
          // Check the response message for book creation
          if (data.message === "Book added successfully") {
            this.sent = true;
            this.titre = "";
            this.auteur = "";
            this.pages = "";
            this.resume = "";
            this.url = "";
            this.date_parution = "";
            this.image_src = "";
            this.selectedGenres = [];
            this.langue = "";
            this.selectedFileEpu = null;
            this.selectedFileCover = null;
            this.labelTextEpub = "No file selected";
            this.labelTextCover = "No file selected";
            this.resumeExceedsLimit = false;
            this.bookAlreadyExists = false;
            this.notComplete = false;
            this.nbGenre = 1;
          } else if (data.message === "Book already exists") {
            this.bookAlreadyExists = true;
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle any errors that occur during the fetch request
        });

    },
    handleVideoFileChange(event) {
      this.videoFile = event.target.files[0];

      if (this.videoFile) {
//        this.selectedFileEpub = file; // Useful???
        if (this.videoFile.name.length > 35)
          this.labelTextVideo = this.videoFile.name.substring(0, 35) + "...";
        else
          this.labelTextVideo = this.videoFile.name;
      } else {
//        this.selectedFileEpub = null; // Useful ??
        this.labelTextVideo = "No file selected.";
      }
    },
    handleThumbnailFileChange(event) {
      this.thumbnailFile = event.target.files[0];

      if (this.thumbnailFile) {
        if (this.thumbnailFile.name.length > 35)
          this.labelTextThumbnail = this.thumbnailFile.name.substring(0, 35) + "...";
        else
          this.labelTextThumbnail = this.thumbnailFile.name;
      } else {
        this.labelTextThumbnail = "No file selected.";
      }
    },
    handleEpubFileChange(event) {
      const file = event.target.files[0];
      console.log("here");
      if (file) {
        this.selectedFileEpub = file;
        if (file.name.length > 35) {
          this.labelTextEpub = file.name.substring(0, 35) + "...";
        } else {
          this.labelTextEpub = file.name;
        }

        const formData = new FormData();
        formData.append("file", file);
        console.log("here");
        fetch(this.addressServer + "/api/livre/metadata", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.json().then((error) => {
                throw new Error(JSON.stringify(error));
              });
            }
          })
          .then((data) => {
            // Use the retrieved metadata
            this.titre = data.titre;
            this.auteur = data.auteur;
            this.date_parution = data.date_parution;
            this.pages = data.pages;
            this.resume = data.resume;
            this.url = data.url;
            // Check if cover image exists
            if (data.image_src) {
              this.image_src = data.image_src;
              this.selectedFileCover = null;
              this.labelTextCover = "Cover already stored";
            }
            this.handleResumeInput();
          })
          .catch((error) => {
            console.error("Error:", error);
            // Handle errors
          });
      } else {
        this.selectedFileEpub = null;
        this.labelTextEpub = "No file selected";
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFileCover = file;
        this.labelTextCover = file.name;
      } else {
        this.selectedFileCover = null;
        this.labelTextCover = "No file selected";
      }
    },
    handleResumeInput() {
      const maxCharacters = 1000;

      if (this.resume.length > maxCharacters) {
        this.resume = this.resume.substring(0, maxCharacters);
        this.resumeExceedsLimit = true; // Add a new data property to indicate if the limit is exceeded
      } else {
        this.resumeExceedsLimit = false; // Reset the flag if the limit is not exceeded
      }
    },
  },
};
</script>
