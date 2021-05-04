<template>
  <div class="container about main-container">
    <div v-if="loggedinUser">
      <h3>
        Loggedin User:
        {{ loggedinUser.username }}
        <button @click="doLogout">Logout</button>
      </h3>
    </div>
    <div class="login" v-else>
      <h2>Login</h2>
      <form @submit.prevent="doLogin">
        <input
          type="text"
          placeholder="Your username"
          v-model="loginCred.username"
        />
        <input type="password" v-model="loginCred.password" />
        <button>Login</button>
      </form>
      <form @submit.prevent="doSignup">
        <h2>Signup</h2>
        <input
          type="text"
          v-model="signupCred.fullname"
          placeholder="Your full name"
        />
        <input
          type="text"
          v-model="signupCred.password"
          placeholder="Password"
        />
        <input
          type="text"
          v-model="signupCred.username"
          placeholder="Username"
        />
        <label for="">
          <el-button :loading="isLoading" size="mini" @click="triggerFileInput"
            >Add profile pic</el-button
          >
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            @change="onUploadImg"
          />
        </label>
        <button>Signup</button>
      </form>
    </div>
  </div>
</template>

<script>
import { uploadImg } from "../services/img-upload.service";

export default {
  name: "test",
  data() {
    return {
      loginCred: { username: "user1", password: "123" },
      signupCred: {
        username: "",
        password: "",
        fullname: "",
        imgUrl: "",
        about: "",
        email: "",
      },
      isLoading: false,
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  created() {
    // this.loadUsers();
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username || !this.loginCred.password) {
        this.$swal({
          icon: "error",
          title: "Failed to login",
          text: "Please enter Username/Password",
        });
        return;
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
        this.$router.push("/");
      } catch (err) {
        this.$swal({
          icon: "warning",
          title: "Failed to login",
          text: "Wrong Username/Password",
        });
        console.log(err);
      }
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async onUploadImg(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.signupCred.imgUrl = res.url;
      this.isLoading = false;
    },
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.username
      ) {
        this.$swal({
          icon: "warning",
          title: "Failed to SignUp",
          text: "Please fill up all fields",
        });
        return;
      }
      try {
        this.signupCred.about = `Hello, im ${this.signupCred.fullname} a volunteer project manager from Israel.
Currently residing in Thailand.
My passion is helping others and my speciality is educational projects, working with special needs children, and community management.
I love traveling, basketball, and mountain biking.
I'm here to connect with other amazing people who share the same passion for traveling and helping others, just like myself.`;
        this.signupCred.email = `${this.signupCred.username}@gmail.net`;
        await this.$store.dispatch({
          type: "signup",
          userCred: this.signupCred,
        });
        this.$router.push("/");
      } catch (err) {
        this.$swal({
          icon: "error",
          title: "Failed to SignUp",
        });
        console.log(err);
      }
    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" });
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId });
        this.msg = "User removed";
        this.$swal({
          icon: "success",
          title: "User removed",
        });
      } catch (err) {
        this.$swal({
          icon: "error",
          title: "Failed to remove user",
        });
      }
    },
  },
};
</script>
