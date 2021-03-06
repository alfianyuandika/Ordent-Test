const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { user } = require("../../db/models");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, user.id);
});

exports.signup = (req, res, next) => {
  passport.authenticate("signup", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }

    if (!user) {
      return res.status(401).json({
        message: info.message,
      });
    }

    req.user = user;

    next();
  })(req, res, next);
};

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        let userSignUp = await user.create(req.body);

        return done(null, userSignUp, {
          message: "User can be created",
        });
      } catch (e) {
        return done(null, false, {
          message: "Email sudah terdaftar",
        });
      }
    }
  )
);

exports.signin = (req, res, next) => {
  passport.authenticate("signin", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }

    if (!user) {
      return res.status(401).json({
        message: info.message,
      });
    }

    req.user = user;

    next();
  })(req, res, next);
};

passport.use(
  "signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        let userSignIn = await user.findOne({ where: { email } });

        if (!userSignIn) {
          return done(null, false, {
            message: "Email tidak ditemukan",
          });
        }

        let validate = await bcrypt.compare(password, userSignIn.password);

        if (!validate) {
          return done(null, false, {
            message: "Password yang digunakan salah",
          });
        }
        
        return done(null, userSignIn, {
          message: "User can sign in",
        });
      } catch (e) {
        return done(null, false, {
          message: "User can't sign in",
        });
      }
    }
  )
);

exports.peminjam = (req, res, next) => {
  passport.authorize("peminjam", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }

    if (!user) {
      return res.status(403).json({
        message: info.message,
      });
    }

    req.user = user;

    next();
  })(req, res, next);
};

passport.use(
  "peminjam",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        let userSignIn = await user.findOne({ id: token.user.id });

        if (userSignIn.role.includes("peminjam")) {
          return done(null, token.user);
        }
       
        return done(null, false, {
          message: "You're not authorized",
        });
      } catch (e) {
        return done(null, false, {
          message: "You're not authorized",
        });
      }
    }
  )
);

exports.admin = (req, res, next) => {
  passport.authorize("admin", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }

    if (!user) {
      return res.status(403).json({
        message: info.message,
      });
    }

    req.user = user;

    next();
  })(req, res, next);
};

passport.use(
  "admin",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        let userSignIn = await user.findOne({ where: { id: token.user.id } });

        if (userSignIn.role.includes("admin")) {
          return done(null, token.user);
        }
        return done(null, false, {
          message: "You're not authorized",
        });
      } catch (e) {
        return done(null, false, {
          message: "You're not authorized",
        });
      }
    }
  )
);
