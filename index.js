require('dotenv').config();
const swaggerUI = require('swagger-ui-express');
const specs = require('./swagger/swagger.js')
const passport = require('./auth/passport');
const express = require('express');
const cors = require('cors');
const axios = require('axios')
const { productController } = require('./modules/product');

const app = express();
const port = 3000;

app.use('/documentation', swaggerUI.serve, swaggerUI.setup(specs))
app.use(express.json());

// Configuración de CORS
const allowedOrigins = ['http://localhost:3001'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
}));

// Inicializar Passport
app.use(passport.initialize());

async function validateToken(accessToken) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );

    // Token válido: devuelve la información del token
    return response.data;
  } catch (error) {
    // Token inválido o expirado
    console.error('El token no es válido o ha expirado', error.response.data);
    return null;
  }
}

// Middleware para validar el token
const validateTokenMiddleware = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ error: 'No se proporcionó el token' });
  }

  const isValid = await validateToken(accessToken);
  if (!isValid) {
    return res.status(401).json({ error: 'El token ha expirado o no es válido' });
  }

  next();
};

// Ruta para iniciar la autenticación con Google
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Callback de Google
app.get('/auth/google/callback', (req, res) => {
  passport.authenticate('google', (err, user) => {
    if (err || !user) {
      return res.status(401).send('Error en la autenticación');
    }

    const redirectUrl = `http://localhost:3001/?token=${user.accessToken}`;
    return res.redirect(redirectUrl);
  })(req, res);
});

// Ruta protegida de productos
app.get('/products', validateTokenMiddleware, async (req, res) => {
  try {
    const products = await productController.getProducts(req, res);
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
});

app.post('/products', validateTokenMiddleware, async (req, res) => {
  try {
    const products = await productController.createProduct(req, res);
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
});

app.put('/products/:id', validateTokenMiddleware, async (req, res) => {
  try {
    const products = await productController.updateProduct(req, res);
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
});

app.delete('/products/:id', validateTokenMiddleware, async (req, res) => {
  try {
    const products = await productController.deleteProduct(req, res);
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
