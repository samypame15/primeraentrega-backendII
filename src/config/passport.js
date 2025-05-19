// import dotenv from 'dotenv';
// dotenv.config();

// import passport from 'passport';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import User from '../models/user.model.js';

// const opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_SECRET, // debe estar definido aquí
// };

// passport.use(
//   new JwtStrategy(opts, async (jwt_payload, done) => {
//     try {
//       const user = await User.findById(jwt_payload.id);
//       if (user) return done(null, user);
//       return done(null, false);
//     } catch (err) {
//       return done(err, false);
//     }
//   })
// );

// export default passport;


// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import User from '../models/user.model.js';
// import { comparePassword } from '../utils/hash.js';

// export const initializePassport = () => {
//   passport.use('local', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//   }, async (email, password, done) => {
//     try {
//       const user = await User.findOne({ email });
//       if (!user) return done(null, false, { message: 'Usuario no encontrado' });

//       const isValid = await comparePassword(password, user.password);
//       if (!isValid) return done(null, false, { message: 'Contraseña incorrecta' });

//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   }));

//   passport.use('jwt', new JwtStrategy({
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.JWT_SECRET
//   }, async (jwt_payload, done) => {
//     try {
//       const user = await User.findById(jwt_payload.id);
//       if (user) return done(null, user);
//       return done(null, false);
//     } catch (error) {
//       return done(error, false);
//     }
//   }));
// };

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.model.js';
import { comparePassword } from '../utils/hash.js';

export const initializePassport = () => {
  // Estrategia local (email + password)
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  // Estrategia JWT
  passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }));

  // Opcional: serializar y deserializar usuario (para sesiones)
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default passport;
