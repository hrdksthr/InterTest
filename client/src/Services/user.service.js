import APIProvider from "./../APIProvider";

const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
};


class UserService {
    getList = () => APIProvider.get("list", null, headers);

    appUpdateUser = data => APIProvider.post("addUpdate", data, headers);
}

export default new UserService()