const express = require('express');
const passport = require('passport');
const activityController = require("../controllers/activityController");

const router = express.Router();

router.get("/", activityController.getContent);

router.get('/signup', function(req, res, next) {
    res.render('signup', { message: req.flash('error') });
});

// router.post(
//   '/signup',
//   passport.authenticate('signup', { session: false }),
//   async (req, res, next) => {
//     res.redirect('/')
//   }
// );

router.post('/signup', passport.authenticate('signup', {
  successRedirect : '/', //redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true ,// allow flash messages
  successFlash : true
}));

router.get('/login', function(req, res, next) {
    res.render('login', { message: req.flash('error') });
  });

router.post('/login', passport.authenticate('login',{
successRedirect : '/', //redirect to the secure profile section
failureRedirect : '/login', // redirect back to the signup page if there is an error
failureFlash : true // allow flash messages
}));
 

// router.post(
//     '/login',
//     async (req, res, next) => {
//       passport.authenticate(
//         'login',
//         async (err, user, info) => {
//           try {
//             if (err || !user) {
//               const error = new Error(info);
//               return next(error);
//             }
  
//             req.login(
//               user,
//               { session: false },
//               async (error) => {
//                 if (error) return next(error);
  
//                 // const body = { email: user.email,  username: user.username , title: "Logged in successfully"};
  
//                 return res.redirect('./');
//               }
//             );
//           } catch (error) {
//             return next(error);
//           }
//         }
//       )(req, res, next);
//     }
//   );

router.post('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});
module.exports = router;