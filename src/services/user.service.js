import { storageService } from "./async-storage.service";
import { httpService } from "./http.service";

export const userService = {
  login,
  signup,
  logout,
  getLoggedInUser,
  update,
  getUser,
};

async function login(credentials) {
  const user = await httpService.post("auth/login", credentials);
  if (user) return _saveLocalUser(user);
}

async function signup(signupCredentials) {
  const user = await httpService.post("auth/signup", signupCredentials);
  return _saveLocalUser(user);
}

async function update(user, isNotificationUpdate) {
  const updatedUser = await httpService.put(`user/${user._id}`, user);
  if (!isNotificationUpdate) {
    _saveLocalUser(updatedUser);
  }
  return updatedUser;
}

async function getUser(id) {
  const user = await httpService.get(`user/${id}`);
  return user;
}

function logout() {
  sessionStorage.clear();
  return httpService.post("auth/logout");
}

function _saveLocalUser(user) {
  sessionStorage.setItem("loggedInUser", JSON.stringify(user));
  return user;
}

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem("loggedInUser"));
}

// export const userService = {
//   login,
//   logout,
//   signup,
//   getUsers,
//   getById,
//   remove,
//   update,
//   getLoggedinUser,
// };

window.userService = userService;
// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123', isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', isAdmin: true})
// userService.signup({fullname: 'Muki G', username: 'muki', password:'123'})

// async function getUsers() {
//   var user = await storageService.query("user");
//   if (!user || !user.length) {
//     user = {
//       _id: "u101",
//       fullname: "Orly Amdadi",
//       username: "orly@amdadi.com",
//       password: "123",
//       isAdmin: false,
//       imgUrl: "http://some-img",
//     };
//     await storageService.post("user", user);
//     var user = await storageService.query("user");
//     return user;
//   } else {
//     return user;
//   }
// }

// function getById(userId) {
//   return storageService.get("user", userId);
// return httpService.get(`user/${userId}`)
// }
// function remove(userId) {
// return storageService.remove("user", userId);
// return httpService.delete(`user/${userId}`)
// }

// async function update(user) {
//   return storageService.put("user", user);
// user = await httpService.put(`user/${user._id}`, user)
// Handle case in which admin updates other user's details
// if (getLoggedinUser()._id === user._id) _saveLocalUser(user);
// }

// async function increaseScore(by = SCORE_FOR_REVIEW) {
//     const user = getLoggedinUser()
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }

// async function login(userCred) {
// const users = await storageService.query("user");
// console.log("users", users);
// console.log("userCred", userCred);
// const user = users.find((user) => {
//   return (
//     user.username === userCred.username && user.password === userCred.password
//   );
// });
// return _saveLocalUser(user);

// const user = await httpService.post('auth/login', userCred)
// if (user) return _saveLocalUser(user)
// }
// async function signup(userCred) {
//   const user = await storageService.post("user", userCred);
// const user = await httpService.post('auth/signup', userCred)
//   return _saveLocalUser(user);
// }
// async function logout() {
//   sessionStorage.clear();
// return await httpService.post('auth/logout')
// }
// function _saveLocalUser(user) {
// console.log('from saveLocalUser',user);
//   sessionStorage.setItem("loggedinUser", JSON.stringify(user));
//   return user;
// }

// function getLoggedinUser() {
// console.log(sessionStorage.getItem('loggedinUser'));
// return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
// }
