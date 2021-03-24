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
  setFilter,
  getEmptyProj,
};

var gFilterBy = { name: "", type: "all", userId: "", pageDiff: 0 };
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
  return httpService.get(`proj?userId=${gFilterBy.userId}`);
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

function getEmptyProj() {
  return {
    name: "",
    loc: {
      country: "",
      countryCode: "",
      address: "",
      lat: 0,
      lng: 0,
    },
    tags: [],
    details: {
      description: "",
      amenities: [],
    },
    imgCategory: "default",
    imgUrls: ["1", "2", "3"],
    startsAt: Date.now(),
    endAt: Date.now(),
    members: [],
    reviews: [],
  };
}

