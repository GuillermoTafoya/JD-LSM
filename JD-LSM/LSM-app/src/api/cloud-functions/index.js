const express = require('express');
const app = express();
const { Datastore } = require('@google-cloud/datastore');
const { PubSub } = require('@google-cloud/pubsub');
var uuid = require('uuid');
const datastore = new Datastore();
const cors = require('cors');

const PORT = 5555;

app.use(cors({
    // allow all origins
    origin: '*',
}));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

async function createToken(body) {
    const kind = 'token';
    const ID = uuid.v1();
    let admin = body.admin || false;
    const tokenKey = datastore.key([kind, ID]);
    const token = {
        key: tokenKey,
        data: {
            ID,
            admin,
        },
    };
    await datastore.save(token);
    return ID;
}
app.post('/admin/create-token', async (req, res, next) => {
    try{
        // Validate mail and password
        const body = req.body;
        const user = await getuserByMailAndPassword(body.mail, body.password);
        if (!user) {
            res.status(404).send({error: 'Invalid mail or password'});
            return;
        }
        if (!user.admin) {
            res.status(403).send({error: 'Not an admin'});
            return;
        }
        const token = await createToken(body);
        res.status(200).send(token);
    } catch (err) {
        res.status(500).send({error: err});
    }
});

app.post('/admin/show-all-tokens', async (req, res, next) => {
    try{
        // Validate mail and password
        const body = req.body;
        const user = await getuserByMailAndPassword(body.mail, body.password);
        if (!user) {
            res.status(404).send({error:'Invalid mail or password'});
            return;
        }
        if (!user.admin) {
            res.status(403).send({error:'User is not admin'});
            return;
        }
        const tokens = await getAllTokens();
        res.status(200).send(tokens);
    } catch (err) {
        res.status(500).send(err);
    }
});

async function getAllTokens() {
    const query = datastore.createQuery('token');
    const [tokens] = await datastore.runQuery(query);
    return tokens;
}

app.post('/admin/get-all-users', async (req, res, next) => {
    try{
        // Validate mail and password
        const body = req.body;
        const user = await getuserByMailAndPassword(body.mail, body.password);
        if (!user) {
            res.status(404).send({error:'Invalid mail or password'});
            return;
        }
        if (!user.admin) {
            res.status(403).send({error:'User is not admin'});
            return;
        }
        const users = await listusers();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({error:err});
    }
});

app.post('/get-user', async (req, res, next) => {
    try{
        const body = req.body;
        // Get by user ID
        const user = await getuserByID(body.ID);
        if (!user) {
            res.status(404).send({error:'User not found'});
            return;
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({error:err});
    }
});

async function getuserByID(ID) {
    const key = datastore.key(['user', ID]);
    const [user] = await datastore.get(key);
    return user;
}

app.post('/login', async (req, res, next) => {
    try{
        const body = req.body;
        // get the user with the mail and password
        const user = await getuserByMailAndPassword(body.mail, body.password);
        if (!user) {
            res.status(404).send({error:'Invalid mail or password'});
            return;
        }
        res.status(200).send(user);
    }catch(e){
        res.status(400).send({error:e});
    }
});

app.post('/create-user', async (req, res, next) => {
    try{
        // Validate unique mail
        const isUnique = await isMailUnique(req.body.mail);
        if (!isUnique) {
            res.status(400).send({error:'Mail already exists'});
            return;
        }
        // Validate unique name
        const validName = await isNameUnique(req.body.name);
        if (!validName) {
            res.status(400).send({error:'Username already exists'});
            return;
        }
        // Validate token
        const token = req.body.token || '';
        // Check if token is valid
        const validToken = await isValidElement(token);
        if (!validToken) {
            res.status(401).send({error:'Invalid token'});
            return;
        }
        const body = req.body;
        const userId = await createuser(body);
        // Delete token after use
        await deleteToken(token);
        res.status(200).send(userId);
    }
    catch(e){
        res.status(401).send({error:e});
    }
});

async function deleteToken(token) {
    const key = datastore.key(['token', token]);
    await datastore.delete(key);
}

async function isValidElement(token) {
    const query = datastore.createQuery('token').filter('ID', '=', token);
    const [tokens] = await datastore.runQuery(query);
    return tokens.length > 0;
}

async function isMailUnique(mail) {
    const query = datastore.createQuery('user').filter('mail', '=', mail);
    const [users] = await datastore.runQuery(query);
    return users.length === 0;
}

async function isNameUnique(name) {
    const query = datastore.createQuery('user').filter('name', '=', name);
    const [users] = await datastore.runQuery(query);
    return users.length === 0;
}

app.post('/user/update', async (req, res, next) => {
    try{
    const body = req.body;
    // Validate mail and password
    const user = await getuserByMailAndPassword(body.mail, body.password);
    
        if (user) {
        const userId = await merge(body, user);
        res.status(200).send(userId);
    }else{
        res.status(404).send({error:'Invalid mail or password'});
    }
    }catch(e){
        res.status(400).send({error:e});
    }
});

app.get('/user/:userId', async (req, res, next) => {
    try{
        const user = await getuser(req.params.userId);
        res.status(200).send(user);
    }catch(e){
        res.status(400).send({error:e});
    }
});

app.post('/video', async (req, res, next) => {
    // Parse the path to be url safe (spaces to %20, etc)
    const body = req.body;
    const path = decodeURIComponent(body.path);
    // https://storage.cloud.google.com/jd-lsm-u/Videos/ + path
    const url = 'https://storage.cloud.google.com/jd-lsm-u/Videos/' + path;
    res.status(200).send(url);
});

async function deleteuser(mail) {
    // Get the user by mail
    const query = datastore.createQuery('user').filter('mail', '=', mail);
    const [users] = await datastore.runQuery(query);
    const user = users[0];
    // Delete the user
    const key = datastore.key(['user', user.ID]);
    await datastore.delete(key);
}

app.post('/admin/force-delete-user', async (req, res, next) => {
    try{
        // Validate mail and password
        const body = req.body;
        const user = await getuserByMailAndPassword(body.mail, body.password);
        if (!user) {
            res.status(404).send({error:'Invalid mail or password'});
            return;
        }
        if (!user.admin) {
            res.status(403).send({error:'User is not admin'});
            return;
        }
        // Delete user
        await deleteuser(body.userMail);
        res.status(200).send({success:'User deleted'});
    }catch(e){
        res.status(400).send({error:e});
    }
});

app.post('/delete-user', async (req, res, next) => {
    try{
        // Validate mail and password
        const body = req.body;
        const user = await getuserByMailAndPassword(body.mail, body.password);
        if (!user) {
            res.status(404).send({error:'Invalid mail or password'});
            return;
        }
        // Delete user
        await deleteuser(body.mail);
        res.status(200).send({success:'User deleted'});
    }catch(e){
        res
        .status(400)
        .send
        (e);
    }
});

async function createuser(body) {
    const kind = 'user';
    const ID = uuid.v1();
    const userKey = datastore.key([kind, ID]);
	let achievements = body.achievements || [];
	// decide admin status based on token 
    const token = body.token;
    const admin = await isAdmin(token);
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
    return user;
}

async function isAdmin(token) {
    const query = datastore.createQuery('token').filter('ID', '=', token);
    const [tokens] = await datastore.runQuery(query);
    if (tokens.length === 0) {
        return false;
    }
    return tokens[0].admin;
}

async function getuserByMailAndPassword(mail, password) {
    const query = datastore
        .createQuery('user')
        .filter('mail', '=', mail)
        .filter('password', '=', password
    );
    const [users] = await datastore.runQuery(query);
    const userId = await users[0];
    return await userId;
}

async function merge(body, user) {
    // Update the user
    const userKey = user[datastore.KEY];
    var adminStatus = user.admin;
    // Check if body has a token
    if (body.hasOwnProperty('token')) {
        // Check if token is valid
        const validToken = await isValidElement(body.token);
        if (validToken) {
            // Check if token is admin
            adminStatus = await isAdmin(body.token);
        }
    }
    const userEntity = {
        key: userKey,
        data: {
            achievements: body.achievements || user.achievements,
            admin: adminStatus,
            currentStrike: body.currentStrike || user.currentStrike,
            daysAttended: body.daysAttended || user.daysAttended,
            lessonsProgress: body.lessonsProgress || user.lessonsProgress,
            mail: body.mail || user.mail,
            name: body.name || user.name,
            password: body.password || user.password,
            profilePicture: body.profilePicture || user.profilePicture,
        },
    };
    await datastore.save(userEntity);
    return user.ID;
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