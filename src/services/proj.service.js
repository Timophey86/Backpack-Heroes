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

var gFilterBy = { category: "",  location: "", from:"", to: "" , pageDiff: 0 };

function setFilter(filter) {
  gFilterBy = filter;
}

function query(filterBy={}) {
  if (!filterBy.filter) {
    return httpService.get(`proj?category=${gFilterBy.category}&location=${gFilterBy.location}&from=${gFilterBy.from}&to=${gFilterBy.to}`);
  }
  return httpService.get(`proj?userId=${filterBy.filter.userId}&category=${gFilterBy.category}&location=${gFilterBy.location}&from=${gFilterBy.from}&to=${gFilterBy.to}`);
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
    numOfVolunteersNeeded: 0,
    imgCategory: "default",
    imgUrls: [],
    startsAt: Date.now(),
    endAt: Date.now() + 86400000,
    members: [],
    reviews: [],
  };
}
