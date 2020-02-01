const Datastore = require('nedb');

const db = {};

/**
 * @description create and load dyanmic Databases AND  it's physical file
*/
db[`users`] = new Datastore(`${'./../database/users.db'}`);
/**
* @description Load datafile in db object
*/
db[`users`].loadDatabase();
/**
* @description remove $delete refernce and corrupt data row from physical data file after every 20 sec
*/
db[`users`].persistence.setAutocompactionInterval(20000);

exports.db = db;
