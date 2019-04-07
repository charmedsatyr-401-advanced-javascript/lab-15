'use strict';

const router = require('express').Router();
const auth = require('./auth/middleware.js');
const Roles = require('./auth/roles-model.js');
const Users = require('./auth/users-model.js');

// router.get('/', (req, res, next) => {
//   res.status(200).send('Server up and running...');
// });

// autopopulate roles
router.post('/autopopulate-roles', (req, res, next) => {
  const admin = { role: 'admin', capabilities: ['create', 'read', 'update', 'delete'] };
  const editor = { role: 'editor', capabilities: ['create', 'read', 'update'] };
  const user = { role: 'user', capabilities: ['read'] };

  [user, editor, admin].forEach(role => {
    Roles.findOne({ role: role.role })
      .then(result => {
        if (!result) {
          const r = new Roles(role);
          r.save().then(role => {
            console.log(`'${role.role}' successfully saved!`);
          });
        } else {
          console.log(`Role '${role.role}' already exists...`);
        }
      })
      .catch(console.error);
  });

  res.status(200).send('Populating roles...');
});

// Use to populate roles
router.post('/roles', (req, res, next) => {
  const role = new Roles(req.body);
  role
    .save()
    .then(role => {
      res.send(role);
    })
    .catch(next);
});

// autopopulate users
router.post('/autopopulate-users', (req, res, next) => {
  const admin = { username: 'admin', password: 'admin', role: 'admin' };
  const editor = { username: 'editor', password: 'editor', role: 'editor' };
  const user = { username: 'user', password: 'user' };

  [user, editor, admin].forEach(user => {
    Users.findOne({ username: user.username })
      .then(result => {
        if (!result) {
          const u = new Users(user);
          u.save().then(user => {
            console.log(`'${user.username}' successfully saved!`);
          });
        } else {
          console.log(`User '${user.username}' already exists...`);
        }
      })
      .catch(console.error);
  });
  res.status(200).send('Populating users...');
});

// Get all users
router.get('/users', (req, res, next) => {
  Users.find().then(users => {
    users.forEach(user => {
      console.log('BRAND NEW STUFF:', user);
    });
  });
  res.status(200).send('Accessing `/users`...');
});

// router.get('/public-stuff') should be visible by anyone
router.get('/public-stuff', (req, res, next) => {
  res.status(200).send('Hi, this is public.');
});

// router.get('/hidden-stuff') should require only a valid login
router.get('/hidden-stuff', auth(), (req, res, next) => {
  res.status(200).send('Shhh, this is hidden.');
});

// router.get('/something-to-read') should require the read capability
router.get('/something-to-read', auth('read'), (req, res, next) => {
  res.status(200).send('Reading rainbow!');
});

// router.post('/create-a-thing) should require the create capability
router.get('/create-a-thing', auth('create'), (req, res, next) => {
  res.status(200).send('You are an artist!');
});

// router.put('/update) should require the update capability
router.put('/update', auth('update'), (req, res, next) => {
  res.status(200).send('That needed changing!');
});

// router.patch('/jp) should require the update capability
router.patch('/jp', auth('update'), (req, res, next) => {
  res.status(200).send('Patch your system.');
});

// router.delete('/bye-bye) should require the delete capability
router.delete('/bye-bye', auth('delete'), (req, res, next) => {
  res.status(200).send('Poor fella, he died so young.');
});
// router.get('/everything') should require the superuser capability
router.get(
  '/everything',
  auth('create'),
  auth('read'),
  auth('update'),
  auth('delete'),
  (req, res, next) => {
    res.status(200).send('I BOW BEFORE YOU, MASTER');
  }
);

module.exports = router;
