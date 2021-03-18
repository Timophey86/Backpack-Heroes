import { storageService } from "./async-storage.service.js";
import { demoData } from "./demo-data.service.js/proj-data.js";
import { utilService } from "./util.service.js";

// import {utilService} from './util.service.js'

const KEY = "projDB";

export const projService = {
  query,
  getById,
  remove,
  save,
  getEmptyProj,
};

// TODO: support paging and filtering and sorting
async function query() {
  let projects = await storageService.query(KEY);

  if (!projects || !projects.length) {
    projects = demoData.getProj();
    await storageService.postMany(KEY, projects);
    return projects;
  } else {
    return projects;
  }
}

function getById(id) {
  console.log("id from storage", id);
  return storageService.get(KEY, id);
}

function remove(id) {
  return storageService.remove(KEY, id);
}

function save(proj) {
  const savedproj = proj._id
    ? storageService.put(KEY, proj)
    : storageService.post(KEY, proj);
  return savedproj;
}

function getEmptyProj() {
  return {
    _id: "",
    name: "",
    location: "",
    tags: [],
    desc: "",
    // imgs,
    startAt: "",
    endAt: "",
    members: 1,
  };
}

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
