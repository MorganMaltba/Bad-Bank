const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGODB_URI;
const url = 'mongodb://mongo:27017';
let db = null;

await MongoClient.connect(uri, {useUnifiedTopology: true}, (err, client) => {
    console.log('Connected to MongoDB...');
    db = client.db('bad-bank')
});

function create(name,email,password) {
    return new Promise ( (resolve, reject) => {
        const users = db.collection('users');
        const user = {name, email, password, balance: 0};
        users.insertOne(user, {w:1}, (err, user) =>{
            err ? reject(err) : resolve(user)
        });
    });
};

function find(email, password) {
    return new Promise( (resolve,reject) => {
        const  user = db.collection('users')
            .findOne({email:email}, {password:password})
            .then( (doc) => resolve(doc))
            .catch( (err) => reject(err));
    });
};

function findAccount(email) {
    return new Promise( (resolve, reject) => {
        const user = db.collection('users')
        .findOne({email:email})
        .then( (doc) => resolve(doc))
        .catch( (err) => reject(err))
    });
}

function all() {
    return new Promise( (resolve, reject) => {
        const users = db.collection('users')
            .find({})
            .toArray( (err, users) => {
                err ? reject(err) : resolve(users)
            });
    });
};

function update(email, amount) {
    return new Promise ( (resolve, reject) => {
        const users = db.collection('users')
            .updateOne(
                {email: email},
                { $inc: {balance: amount}},
                {returnOriginal: false},
                (err, docs) => {
                    err ? reject(err) : resolve (docs);
                }
            )
    });
};

function deleteAccount(email) {
    return new Promise( (resolve, reject) => {
        const users = db.collection('users')
            .findOneAndDelete({email:email})
            .then ((err, docs) => {
                err? reject(err) : resolve(docs)
            });
    });
};

module.exports = ({create, all, find, update, findAccount, deleteAccount});