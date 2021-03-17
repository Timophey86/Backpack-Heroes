const proj = {
  _id: "10006546",
  name: "Tanzia Animal Shelter",
  imgUrls: ["mainImg.jpg", "otherImg.jpg"],
  desc: "Rescue animals while having fun..",
  startsAt: 123311,
  startsEnd: 13243311,
  tags: ["Animal Care", "Farmstay help"],
  //       amenities: ["private-room", "Wifi", "transportation", "Meals Provided", "Free-time activities"], move to description
  members: [
    { _id: 111122, fullName: muki, imgUrl: imf.com / 2332443 },
    { _id: 111123, name: muzi, imgUrl: imf.com / 233 },
  ],
  host: {
    _id: 51399391,
    fullname: "Davit Pok",
    imgUrl: "https://x.com/pic.jpg",
  },
  loc: {
    country: "Tanzia",
    countryCode: "TZ",
    address: "Porto, Tanzia",
    lat: -8.61308,
    lng: 41.1413,
  },
  reviews: [
    {
      id: 233242,
      txt: "Very fun great expirence,…",
      rate: 4,
      by: {
        _id: "u102",
        fullname: "user2",
        imgUrl: "/img/img2.jpg",
      },
    },
  ],
};

const minimalUser = {
  _id: "u101",
  fullName: "Orly Amdadi",
  imgUrl: "http://some-img",
};

const user = {
  _id: "u101",
  fullname: "Orly Amdadi",
  username: "orly@amdadi.com",
  password: "tinkerbell",
  isAdmin: true,
  imgUrl: "http://some-img",
};


const order = [
      {
        "_id": "o1225",
        "createdAt": 9898989,
        "buyer": {
          "_id": "u101",
          "fullname": "User 1"
        },
        "proj": {
          "_id": "h102",
          "name": "House Of Uncle My",
        },
        "status": "pending"
      }    
    
]