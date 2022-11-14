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
	let achievements = body.achievements || [];
	let admin = body.admin || false;
	let currentStrike = body.currentStrike || 0;
	let daysAttended = body.daysAttended || [];
	let lessonsProgress = body.lessonsProgress || [];
	let mail = body.mail || "";
	let name = body.name || "";
	let password = body.password || "";
	let profilePicture = body.profilePicture || "";
    const user = {
        key: userKey,
        data: {
            achievements: achievements,
			admin: admin,
			currentStrike: currentStrike,
			daysAttended: daysAttended,
			lessonsProgress: lessonsProgress,
			mail: mail,
			name: name,
			password: password,
			profilePicture: profilePicture,
        },
    };

    await datastore.save(user);
    console.log(`Saved ${user.key.name}`);
    return ID;
}

async function merge(userToUpdate) {
    const userKey = datastore.key(['user', userToUpdate.userId]);
    const user = {
        achievements: userToUpdate.achievements,
		admin: userToUpdate.admin,
		currentStrike: userToUpdate.currentStrike,
		daysAttended: userToUpdate.daysAttended,
		lessonsProgress: userToUpdate.lessonsProgress,
		mail: userToUpdate.mail,
		name: userToUpdate.name,
		password: userToUpdate.password,
		profilePicture: userToUpdate.profilePicture,
    };
    
    await datastore.update({
        key: userKey,
        data: user,
    });
    console.log(`Updated ${userKey.name}`);
    return userKey.name;
}

async function getuser(userId) {
    const userKey = datastore.key(['user', userId]);

    let user = await datastore.get(userKey);
    console.log(`user ${userId}`, user);
    return user;
}

async function listusers() {
    const query = datastore.createQuery('user');
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