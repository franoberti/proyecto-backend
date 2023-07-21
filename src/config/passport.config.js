import passport from "passport";
import local from "passport-local"
import { createHash, isValidPassword } from "../utils/validations.js";
import { UsersModel } from "../DAO/models/users.model.js";
import GitHubStrategy from 'passport-github2';

const LocalStategy = local.Strategy

export function configPassport() {
    passport.use(
        'login',
        new LocalStategy({ usernameField: 'email' }, async (username, password, done) => {
            try {
                const user = await UsersModel.findOne({ email: username })
                if (!user) {
                    console.log('user not foundwith username (email): ', username)
                    return done(null, false)
                }
                if (!isValidPassword(password, user.password)) {
                    console.log('ivalid Password')
                    return done(null, false)
                }

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        })
    )

    passport.use(
        'register',
        new LocalStategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                const { email, firstName, lastName, age } = req.body
                let user = await UsersModel.findOne({ email: username })

                if (user) {
                    console.log('User already exists')
                    return done(null, false)
                }

                const newUser = {
                    email,
                    firstName,
                    lastName,
                    age,
                    admin: false,
                    password: createHash(password)
                }

                let userCreated = await UsersModel.create(newUser)

                console.log(userCreated)
                console.log('User Registration Succesful')
                return done(null, userCreated)

            } catch (error) {
                console.log('Error in register')
                console.log(error)
                return done(error)
            }
        })
    )

    passport.use(
        'github',
        new GitHubStrategy(
            {
                clientID: 'Iv1.a85363892db0a0aa',
                clientSecret: '3c381128b3464b2533718006e4af8408108bd304',
                callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
            },
            async (accesToken, _, profile, done) => {
                console.log(profile);
                try {
                    const res = await fetch('https://api.github.com/user/emails', {
                        headers: {
                            Accept: 'application/vnd.github+json',
                            Authorization: 'Bearer ' + accesToken,
                            'X-Github-Api-Version': '2022-11-28',
                        },
                    });
                    const emails = await res.json();
                    const emailDetail = emails.find((email) => email.verified == true);

                    if (!emailDetail) {
                        return done(new Error('cannot get a valid email for this user'));
                    }
                    profile.email = emailDetail.email;

                    let user = await UsersModel.findOne({ email: profile.email });
                    if (!user) {
                        const newUser = {
                            email: profile.email,
                            firstName: profile._json.name || profile._json.login || 'noname',
                            lastName: 'nolast',
                            isAdmin: false,
                            password: 'nopass',
                        };
                        let userCreated = await UserModel.create(newUser);
                        console.log('User Registration succesful');
                        return done(null, userCreated);
                    } else {
                        console.log('User already exists');
                        return done(null, user);
                    }
                } catch (e) {
                    console.log('Error en auth github');
                    console.log(e);
                    return done(e);
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await UsersModel.findById(id)
        done(null, user)
    })
}