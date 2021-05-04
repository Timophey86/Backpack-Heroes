<template>
  <section class="home-page">
    <div class="hero">
      <img :src="require(`@/assets/images/hero/1.jpg`)" alt="" />
      <div class="hero-txt">
        <h1>Travel with Purpose</h1>
        <p>
          Connecting kind hearted travelers with amazing volunteering
          opportunities across the globe
        </p>
        <div @click="projList" class="call-to-action">
          <h3>Explore more</h3>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="about-us">
        <h1>Who are we?</h1>
        <div class="text-and-img">
          <div class="image-container">
          <img
            src="@/assets/433976291648_151809676705056.jpeg"
            alt=""
          />
          </div>
          <p>
            Hello traveler, wanderer, casual internet straler! We, at the
            Backpack Heroes team would like to welcome you to our platform,
            built for and by amazing people such as yourself. Here we aim to
            encourage an alternative way of traveling. One that is not only
            focused on casual tourism but also on immersment in local
            communities, helping others, and a sense of porpouse and
            fullfilment. We’re on a mission and we want to do things
            differently! Building a sharing community of global travellers who
            genuinely want to see the world whilst contributing and giving back
            to the places they visit. Alongside our welcoming hosts, ready to
            receive visitors who are able to help out. We believe that you get
            out of life what you are willing to put into it! We hope you'll find
            what ever is your looking for here, and if not we still more than
            appreciate you passing by here. We're still in the process of growth
            and development. New hosts are registering daily, bringing with them
            new volunteering oportiunities in new exciting locations. So if the
            mission of the site is for your liking, keep coming back once in a
            while. 
          </p>
        </div>
        <hr />
      </div>
      <div class="main-img-container">
        <div class="img-category-container">
          <h1>Our Categories</h1>
          <ul>
            <li
              @click="enterCategory(category)"
              v-for="(category, index) in categories"
              :key="index"
            >
              <p>{{ category }}</p>
              <img
                :src="require(`@/assets/images/categories/${category}.jpg`)"
                alt=""
              />
            </li>
          </ul>
          <hr />
        </div>

        <div class="img-locations-container">
          <h1>Our Locations</h1>
          <ul>
            <li
              @click="enterLocation(location)"
              v-for="(location, index) in locations"
              :key="index"
            >
              <p>{{ location }}</p>
              <img
                :src="require(`@/assets/images/locations/${location}.jpg`)"
                alt=""
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { socketService } from "../services/socket.service";
import {
  increaseCount,
  filterBtCategory,
} from "../services/eventBusServices.js";

export default {
  name: "homePage",
  data() {
    return {
      projs: [],
      categories: [
        "Agriculture",
        "Animals",
        "Building",
        "Children",
        "Education",
        "Environment",
        "Medical Care",
        "Women's Empowerment",
      ],
      locations: [
        "Costa Rica",
        "India",
        "Madagascar",
        "Nepal",
        "Peru",
        "Thailand",
        "South Africa",
        "Tanzania",
      ],
    };
  },
  computed: {
    currUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    async loadProjs() {
      await this.$store.dispatch({
        type: "loadProjs",
      });
    },
    projList() {
      this.$router.push("/project");
    },
    enterCategory(category) {
      this.$router.push({ name: "project", params: { category: category } });
    },
    enterLocation(location) {
      this.$router.push({ name: "project", params: { location: location } });
    },
  },
  async created() {
    this.projs = this.$store.getters.projs;
    // socketService.setup();
    // socketService.on("requestFromUser", (request) => {
    //   console.log("home");
    //   if (this.currUser._id === request.proj.host._id) {
    //     increaseCount();
    //   } else {
    //     return;
    //   }
    // });
  },
  destroyed() {
    // socketService.off("requestFromUser");
    // socketService.terminate();
  },
};
</script>
