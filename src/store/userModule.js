import { userService } from "../services/user.service";

export const userStore = {
  state: {
    loggedInUser: userService.getLoggedInUser(),
    users: [],
    viewedUser: null,
  },
  getters: {
    users({ users }) {
      return users;
    },
    loggedinUser({ loggedInUser }) {
      return loggedInUser;
    },
    viewedUser({ viewedUser }) {
      return viewedUser;
    },
  },
  mutations: {
    setLoggedInUser(state, { user }) {
      state.loggedInUser = user;
    },
    setUsers(state, { users }) {
      state.users = users;
    },
    removeUser(state, { userId }) {
      state.users = state.users.filter((user) => user._id !== userId);
    },
    setViewedUser(state, { user }) {
      state.viewedUser = user;
    },
    removeViewedUser(state, payload) {
      state.viewedUser = null;
    }
  },
  actions: {
    async login({ commit }, { userCred }) {
      try {
        const user = await userService.login(userCred);
        commit({ type: "setLoggedInUser", user });
        return user;
      } catch (err) {
        console.log("userStore: Error in login", err);
        throw err;
      }
    },
    async signup({ commit }, { userCred }) {
      try {
        const user = await userService.signup(userCred);
        commit({ type: "setLoggedInUser", user });
        return user;
      } catch (err) {
        console.log("userStore: Error in signup", err);
        throw err;
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout();
        commit({ type: "setLoggedInUser", user: null });
      } catch (err) {
        console.log("userStore: Error in logout", err);
        throw err;
      }
    },
    async loadUser({ commit }) {
      try {
        const users = await userService.getUsers();
        // commit({ type: "setUsers", users });
        //Remove after making a proper user login page
        commit({ type: "setLoggedInUser", user: users[0] });
      } catch (err) {
        console.log("userStore: Error in loadUsers", err);
        throw err;
      }
    },
    async getUser({ commit }, { userId }) {
      try {
        const user = await userService.getUser(userId);
        commit({ type: "setViewedUser", user: user });
      } catch (err) {
        console.log("userStore: Error in getting user tio view", err);
        throw err;
      }
    },
    async removeUser({ commit }, { userId }) {
      try {
        await userService.remove(userId);
        commit({ type: "removeUser", userId });
      } catch (err) {
        console.log("userStore: Error in removeUser", err);
        throw err;
      }
    },
    async updateUser({ commit }, { user }) {
      try {
        user = await userService.update(user);
      } catch (err) {
        console.log("userStore: Error in updateUser", err);
        throw err;
      }
    },
   async updateNotifications ({ commit }, { hostId }) {
     try {
      const user = await userService.getUser(hostId); 
      user.notifications += 1
      await userService.update(user, true)
     } catch (err) {
      console.log("userStore: Error in updating notifications", err);
      throw err;
     }
    }
  },
};
