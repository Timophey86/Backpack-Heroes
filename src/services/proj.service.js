import { storageService } from "./async-storage.service.js";
import { demoData } from "./demo-data.service.js/proj-data.js";
import { utilService } from "./util.service.js";
import { httpService } from "./http.service.js";


const KEY = "projDB";

export const projService = {
  query,
  getById,
  remove,
  save,
  setFilter
  // getEmptyProj,
};

var gFilterBy = { name: "", type: "all", userId:'', pageDiff:0 };
// var gSort = { sortType: "name" };

function setFilter(filter) {
  gFilterBy = filter;

}

// function setSort(sort) {
//   gSort = sort;
// }

// TODO: support paging and filtering and sorting

function query(filterBy = {}) {
  console.log(gFilterBy);
  return httpService.get(`proj?userId=${gFilterBy.userId}`)
}

function getById(id) {
  return httpService.get(`proj/${id}`);
}

function remove(id) {
  return httpService.delete(`proj/${id}`);
}

function save(proj) {
  if (proj._id) {
    return httpService.put(`proj/${proj._id}`, proj);
  } else {
    return httpService.post(`proj`, proj);
  }
}










// async function query() {
//   let projects = await storageService.query(KEY);

//   if (!projects || !projects.length) {
//     projects = demoData.getProj();
//     await storageService.postMany(KEY, projects);
//     return projects;
//   } else {
//     return projects;
//   }
// }

// function getById(id) {
//   return storageService.get(KEY, id);
// }

// function remove(id) {
//   return storageService.remove(KEY, id);
// }

// function save(proj) {
//   const savedproj = proj._id
//     ? storageService.put(KEY, proj)
//     : storageService.post(KEY, proj);
//   return savedproj;
// }

// function getEmptyProj() {
//   return {
//     _id: "",
//     name: "",
//     loc: {
//       country: "",
//       countryCode: "",
//       address: "",
//       lat: 0,
//       lng: 0,
//     },
//     tags: [],
//     details: {
//       description: "",
//       amenities: "",
//     },
//     imgUrls: [],
//     startsAt: Date.now(),
//     startsEnd: Date.now(),
//     members: [],
//   };
// }

// Create Test Data:
// function _createprojs() {
//     var projs = JSON.parse(localStorage.getItem(KEY))
//     if (!projs || !projs.length) {
//         projs = [
//                 _createproj('Television 55 inch'),
//                 _createproj('Tape Double Cassette'),
//                 _createproj('Tea Pot'),
//             ]
//         localStorage.setItem(KEY, JSON.stringify(projs))
//     }
//     return projs;
// }

// function _createproj(name) {
//     const proj = getEmptyproj(name, utilService.getRandomInt(80, 300))
//     proj._id = utilService.makeId()
//     return proj
// }
