require('dotenv').config();
const passport = require('./auth/passport');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { productController } = require('./modules/product');

const app = express();
const port = 3000;

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

// Middleware para validar el token
const authenticateToken = (req, res, next) => {
  const token = req.query.token || req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).send('Token no proporcionado');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Token inválido o expirado');
    req.user = user;
    next();
  });
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

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const redirectUrl = `http://localhost:3001/?token=${token}`;
    return res.redirect(redirectUrl);
  })(req, res);
});

// Ruta protegida de productos
app.get('/products', authenticateToken, async (req, res) => {
  try {
    const products = await productController.getProducts(req, res);
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
});

app.post('/products', authenticateToken, async (req, res) => {
  try {
    const products = await productController.createProduct(req, res);
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
});

app.put('/products/:id', authenticateToken, async (req, res) => {
  try {
    const products = await productController.updateProduct(req, res);
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
});

app.delete('/products/:id', authenticateToken, async (req, res) => {
  try {
    const products = await productController.deleteProduct(req, res);
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
