const express = require('express');
const app = express();
const { Datastore } = require('@google-cloud/datastore');
const { PubSub } = require('@google-cloud/pubsub');
var uuid = require('uuid');
const datastore = new Datastore();
const cors = require('cors');

const PORT = 5555;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/user', async (req, res, next) => {
    const users = await listusers();
    res.status(200).send(users);
});

app.post('/user', async (req, res, next) => {
    const body = req.body;
    const userId = await createuser(body);
    res.status(200).send(userId);
});

app.put('/user', async (req, res, next) => {
    const body = req.body;
    const userId = await merge(body);
    res.status(200).send(userId);
});

app.get('/user/:userId', async (req, res, next) => {
    const user = await getuser(req.params.userId);
    res.status(200).send(user);
});

app.use(cors({
    origin: '*'
}));

async function createuser(body) {
    const kind = 'user';
    const ID = uuid.v1();
    const userKey = datastore.key([kind, ID]);
    const user = {
        key: userKey,
        data: {
            userName: body.userName,
            created: new Date().toString(),
            started: '',
            completed: ''
        },
    };

    await datastore.save(user);
    console.log(`Saved ${user.key.name}`);
    return ID;
}

async function merge(userToUpdate) {
    const userKey = datastore.key(['user', userToUpdate.userId]);
    const user = {
        userName: userToUpdate.userName,
    };
    if (userToUpdate.started != undefined && userToUpdate.started == true) {
        user.started = new Date().toString();
    }

    if (userToUpdate.completed != undefined && userToUpdate.completed == true) {
        user.completed = new Date().toString();
    }

    try {
        await datastore.merge({
            key: userKey,
            data: user,
        });
        console.log(`user ${userId} description updated successfully.`);
    } catch (err) {
        console.error('ERROR:', err);
    }
}

async function getuser(userId) {
    const userKey = datastore.key(['user', userId]);

    let user = await datastore.get(userKey);
    console.log(`user ${userId}`, user);
    return user;
}

async function listusers() {
    const query = datastore.createQuery('user').order('created');
    const [users] = await datastore.runQuery(query);
    console.log('users:');
    const usersToReturn = [];
    for (const user of users) {
        const userKey = user[datastore.KEY];
        console.log('--->', userKey.name, user);
        user.ID = userKey.name;
        usersToReturn.push(user);
    }
    return usersToReturn;
}

module.exports = {
    app
};





