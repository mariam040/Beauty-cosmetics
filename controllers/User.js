const Users = require('../models/users');
const path = require('path');
const fs = require('fs');
const AddUser = (req, res) => {
    let imgFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    imgFile = req.files.img;
    uploadPath = path.join(__dirname, '../public/images/' + req.body.un + path.extname(imgFile.name));

    // Use the mv() method to place the file somewhere on your server
    imgFile.mv(uploadPath, function (err) {
        if (err)
            res.status(500).send(err);

        const user = new Users({
            UserName: req.body.un,
            Password: req.body.pw,
            Image: req.body.un + path.extname(imgFile.name),
            Type: req.body.type
        })
        user.save()
            .then(result => {
                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
            });
    });
};

const GetUser = (req, res) => {
    var query = { UserName: req.body.un, Password: req.body.pw };
    Users.findOne(query)
        .then(result => {
            if (!result) {
                res.render('err', { err: 'Invalid Data', user: (req.session.user === undefined ? "" : req.session.user) })
            }
            else {
                req.session.user = result;
                res.redirect('/user/profile');
            }
        })
        .catch(err => {
            console.log(err);
        });
};

const checkUN = (req, res) => {
    var query = { UserName: req.body.UserName };
    Users.find(query)
        .then(result => {
            if (result.length > 0) {
                res.send('taken');
            }
            else {
                res.send('available');
            }
        })
        .catch(err => {
            console.log(err);
        });
};

const editUser = (req, res) => {
    Users.findByIdAndUpdate(req.session.user._id, { Password: req.body.pw })
        .then(result => {
            req.session.user.Password = req.body.pw;
            res.redirect('/user/profile')
        })
        .catch(err => {
            console.log(err);
        });
};

const deleteMyAccount = (req, res) => {
  const userId = req.session.user._id;        // user is logged in
  const userImg = req.session.user.Image;     // assuming 'Image' is stored in session

  Users.findByIdAndDelete(userId)
    .then(result => {
      // Delete profile image
      fs.unlink(path.join(__dirname, '../public/images/' + userImg), (err) => {
        if (err) console.log('Image not found or already deleted.');

        req.session.destroy();  // Logout user
        res.redirect('/');      // Redirect to home or login
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Error deleting your account.");
    });
};

// const DeleteUser = (req, res) => {
//   Users.findByIdAndDelete(req.params.id)
//     .then(result => {
//       fs.unlink(path.join(__dirname, '../public/images/' + req.params.img), (err) => {
//         if (err) {
//           throw err;
//         }
//         req.session.destroy();

//         res.redirect('/');
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

module.exports = {
    AddUser,
    GetUser,
    checkUN,
    deleteMyAccount,
    editUser
};