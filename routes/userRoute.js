const express = require('express');
const passport = require('passport');

const router = express.Router();
 
router.get('/signup', function(req, res, next) {
    res.render('signup');
  });

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.render({
      message: 'Signup successful',
      user: req.user
    });
    res.redirect('/')
  }
);

router.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { email: user.email,  username: user.username };
  
                return res.render({ body });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
  );

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});
module.exports = router;