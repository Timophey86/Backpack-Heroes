export const demoData ={
  getProj
} 

function getProj () {
  return proj
}


const proj = [
  {
    _id: "10006546",
    name: "Animal rescue",
    imgUrls: ["1.jpg", "2.jpg", "3.jpg"],
    details: {
      description: "Support an Animal Rescue Centre team to care for injured, sick and abused animals",
      amenities: ["private-room", "Wifi", "transportation", "Meals Provided", "Free-time activities"]
    },
    startsAt: 1615998009209,
    startsEnd: 2015998009209,
    tags: ["Animal Care", "Farmstay help"],
    members: [
      { _id: 111122, fullname: 'muki', imgUrl: 'imf.com / 2332443' },
      { _id: 111123, fullname: 'shuki', imgUrl: 'imf.com / 233' },
    ],
    host: {
      _id: 51399391,
      fullname: "Davit Pok",
      imgUrl: "https://x.com/pic.jpg",
    },
    loc: {
      country: "Thailand",
      countryCode: "TH",
      address: "Chiang Mai, Thailand",
      lat: -8.61308,
      lng: 41.1413,
    },
    reviews: [
      {
        id: 233242,
        txt: "Very fun great expirence",
        rate: 4,
        by: {
          _id: "u102",
          fullname: "user2",
          imgUrl: "/img/img2.jpg",
        },
      },
    ],
  },
  {
    _id: "32234421",
    name: "Children",
    imgUrls: ["1.jpg", "2.jpg", "3.jpg"],
    details: {
      description: "Provide support and education at day care centres and community outreach projects",
      amenities: ["private-room", "Wifi", "transportation", "Meals Provided", "Free-time activities"]
    },
    startsAt: 1615998009209,
    startsEnd: 2015998009209,
    tags: ["Education", "Community"],
    members: [
      { _id: 111142, fullname: "kuki", imgUrl: "imf.com / 2332443 "},
      { _id: 111153, fullname: "puki", imgUrl: "imf.com / 233" },
    ],
    host: {
      _id: 51399391,
      fullname: "Davit Pok",
      imgUrl: "https://x.com/pic.jpg",
    },
    loc: {
      country: "Peru",
      countryCode: "PE",
      address: "Iquitos, Peru",
      lat: -8.61308,
      lng: 41.1413,
    },
    reviews: [
      {
        id: 233242,
        txt: "Very fun great expirence",
        rate: 4,
        by: {
          _id: "u102",
          fullname: "user2",
          imgUrl: "/img/img2.jpg",
        },
      },
    ],
  },
  {
    _id: "32234421",
    name: "Building",
    imgUrls: ["1.jpg", "2.jpg", "3.jpg"],
    details: {
      description: "Join a team of local builders to help improve community buildings in India",
      amenities: ["private-room", "Wifi", "transportation", "Meals Provided", "Free-time activities"]
    },
    startsAt: 1615998009209,
    startsEnd: 2015998009209,
    tags: ["Building", "Community"],
    members: [
      { _id: 111142, fullname: "kuki", imgUrl: "imf.com / 2332443" },
      { _id: 111153, fullname: "puki", imgUrl: "imf.com / 233" },
    ],
    host: {
      _id: 51399391,
      fullname: "Davit Pok",
      imgUrl: "https://x.com/pic.jpg",
    },
    loc: {
      country: "India",
      countryCode: "IN",
      address: "Udaipur, India",
      lat: -8.61308,
      lng: 41.1413,
    },
    reviews: [
      {
        id: 233242,
        txt: "Very fun great expirence",
        rate: 4,
        by: {
          _id: "u102",
          fullname: "user2",
          imgUrl: "/img/img2.jpg",
        },
      },
    ],
  }
]