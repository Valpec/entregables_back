import passport from 'passport';
import passportLocal from 'passport-local';
import jwtStrategy from 'passport-jwt'
import GitHubStrategy from 'passport-github2';
import userModel from '../dao/db/models/user.js';
import { PRIVATE_KEY, createHash, isValidPassword } from '../utils.js';


const localStrategy = passportLocal.Strategy;

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {

    passport.use('jwt', new JwtStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: PRIVATE_KEY
        }, async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload.user)
            } catch (error) {
                return done(error)
            }
        }
    ));

    passport.use('github', new GitHubStrategy(
        {
            clientID: '.',
            clientSecret: '',
            callbackUrl: 'http://localhost:8080/api/sessions/githubcallback'
        }, async (accessToken, refreshToken, profile, done) => {
            console.log("Profile obtenido del usuario:");
            console.log(profile);
            console.log('asd'+profile._json.email )
            
            try {
                const user = await userModel.findOne({ email: profile._json.email });
                console.log(`Usuario encontrado para login: ${user}`);

                if (!user) {
                    console.warn("User doesn't exists with username: " + profile._json.email);

                    let newUser = {
                        firstName: profile._json.name,
                        lastName: '',
                        age: 20,
                        email: profile._json.email,
                        password: '',
                        cart: '65f6e85d9ee742a71efd9ff9',
                        role: '',
                        loggedBy: 'GitHub'
                    }
                    let result = await userModel.create(newUser)
                    return done(null, result)
                } else {
                    return done(null, user)
                }
            } catch (error) {
                return done(error)
            }
        }
    ))


    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },

        async (req, username, password, done) => {
            const { firstName, lastName, email, age } = req.body
            try {
                const exists = await userModel.findOne({ email })
                if (exists) {
                    console.log("El usuario ya existe");
                    return done(null, false)
                }
                
                const user = {
                    firstName,
                    lastName,
                    email,
                    age,
                    password: createHash(password)
                }

                const result = await userModel.create(user);

                return done(null, result)
            } catch (error) {
                return done("Error registrando el usuario: " + error)
            }
        }
    ))

    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                console.log(`Usuario encontrado: ${user}`)
            
                 if (!user) {
                    console.warn(`Credenciales incorrectas para ${username}`)
                    return done(null, false)
                }

                if (!isValidPassword(user, password)) {
                    console.warn(`Credenciales incorrectas para ${username}`)
                    return done(null, false)
                }


                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error(`Error deserializando el usuario: ${error}`);
        }
    });

  
};

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwtCookieToken']
    }
    return token;
};

export default initializePassport;
