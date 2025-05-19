
import passport from 'passport';

app.get('/api/sessions/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: 'Usuario autenticado', user: req.user });
  }
);
