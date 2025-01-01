const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

jest.mock('passport-google-oauth20', () => {
    return {
        Strategy: jest.fn((options, verify) => {
            // Simulamos la estrategia de Google
            return {
                authenticate: jest.fn(),
            };
        }),
    };
});

describe('Passport Google OAuth Strategy', () => {
    beforeAll(() => {
        // Configuración de la estrategia de Google OAuth
        passport.use('google',
            new GoogleStrategy(
                {
                    clientID: 'test-client-id',
                    clientSecret: 'test-client-secret',
                    callbackURL: 'http://localhost:3000/auth/google/callback',
                },
                (accessToken, refreshToken, profile, done) => {
                    return done(null, profile);
                }
            )
        );
    });

    test('should serialize user', done => {
        const user = { id: '123', displayName: 'Test User' };
        passport.serializeUser ((user, done) => {
            done(null, user);
        });

        passport.serializeUser (user, (err, result) => {
            expect(err).toBeNull();
            expect(result).toEqual(user);
            done();
        });
    });

    test('should deserialize user', done => {
        const user = { id: '123', displayName: 'Test User' };
        passport.deserializeUser ((user, done) => {
            done(null, user);
        });

        passport.deserializeUser (user, (err, result) => {
            expect(err).toBeNull();
            expect(result).toEqual(user);
            done();
        });
    });

    test('should use Google strategy', () => {
        const strategies = passport._strategies;
        expect(strategies).toHaveProperty('google');
        expect(GoogleStrategy).toHaveBeenCalled();
    });
});