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


const order = {
    _id: "o1225",
    createdAt: 9898989,
    buyer: "mini-user",
    host: {
        _id: "u101",
        fullname: "User 1"
    },
    proj: {
        _id: "h102",
        name: "House Of Uncle My",
    },
    status: "pending"
}