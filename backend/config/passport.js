import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import env from "dotenv";

env.config();

const passJwt = (passport) => {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          (req) => req.cookies[process.env.COOKIE_NAME],
        ]),
        secretOrKey: process.env.SECRETKEY,
      },
      (jwtPayload, done) => {
        try {
          if (jwtPayload) {
            done(null, jwtPayload);
          } else {
            done(null, false);
          }
        } catch (err) {
          done(err, false);
        }
      }
    )
  );
};

export { passJwt };
