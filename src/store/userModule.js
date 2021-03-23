import { userService } from "../services/user.service";

export const userStore = {
  state: {
    loggedinUser: userService.getLoggedinUser(),
    users: [],
  },
  getters: {
    users({ users }) {
      return users;
    },
    loggedinUser({ loggedinUser }) {
      return loggedinUser;
    },
  },
  mutations: {
    setLoggedinUser(state, { user }) {
      state.loggedinUser = user;
      console.log(state.loggedinUser);
    },
    setUsers(state, { users }) {
      state.users = users;
    },
    removeUser(state, { userId }) {
      state.users = state.users.filter((user) => user._id !== userId);
    },
  },
  actions: {
    async login({ commit }, { userCred }) {
      try {
        const user = await userService.login(userCred);
        commit({ type: "setLoggedinUser", user });
        return user;
      } catch (err) {
        console.log("userStore: Error in login", err);
        throw err;
      }
    },
    async signup({ commit }, { userCred }) {
      try {
        const user = await userService.signup(userCred);
        commit({ type: "setLoggedinUser", user });
        return user;
      } catch (err) {
        console.log("userStore: Error in signup", err);
        throw err;
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout();
        commit({ type: "setLoggedinUser", user: null });
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
        commit({ type: "setLoggedinUser", user: users[0] });
      } catch (err) {
        console.log("userStore: Error in loadUsers", err);
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
        commit({ type: "setUser", user });
      } catch (err) {
        console.log("userStore: Error in updateUser", err);
        throw err;
      }
    },
  },
};
