const dbHelper = require('./../helpers/db.helper');
class UserController { 

    getUsersList() {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await dbHelper.getDbData("users", {});
                return resolve(users)
            } catch (error) {
                console.error("[getUsersList] Error : ", error) 
                return reject(error);                
            }
        })
    }

    addUpdateUser(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if(data._id) {
                    // UPDATE
                    // updateDbData
                    const users = await dbHelper.updateDbData("users", data._id,data);
                    return resolve(users)
                }
                // INSERT
                const users = await dbHelper.inserDbData("users", data);
                return resolve(users)
            } catch (error) {
                console.error("[getUsersList] Error : ", error) 
                return reject(error);                
            }
        })
    }
}

module.exports = new UserController();