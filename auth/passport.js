const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configuración de la estrategia de Google OAuth
passport.use('google',
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            // Guarda los tokens y el perfil del usuario
            const user = {
                profile: profile,
                accessToken: accessToken,
                refreshToken: refreshToken, // Disponible si el scope incluye 'offline_access'
            };
            return done(null, user); // El perfil del usuario se pasa a done
        }
    )
);

// Serializar y deserializar el usuario
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;