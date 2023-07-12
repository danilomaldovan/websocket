import express from 'express';
import http from 'http';
import path from 'path';
import handlebars from 'express-handlebars';
import { Server as SocketIO } from 'socket.io';
import productRouter from './routes/products.js';
import cartRouter from './routes/carts.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

// Configurar el motor de plantillas Handlebars
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Configurar el directorio de vistas
app.set('views', path.join(__dirname, 'views'));

// Configurar el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('newProduct', (product) => {
    console.log('Nuevo producto:', product);
    io.emit('newProduct', product);
  });

  socket.on('deleteProduct', (productId) => {
    console.log('Producto eliminado:', productId);
    io.emit('deleteProduct', productId);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Configurar las rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Ruta raíz
app.get('/', (req, res) => {
  // Renderizar la vista "index.handlebars" con la lista de productos
  res.render('index', { products });
});

// Ruta para productos en tiempo real
app.get('/realtimeproducts', (req, res) => {
  // Renderizar la vista "realTimeProducts.handlebars" con la lista de productos
  res.render('realTimeProducts', { products });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});