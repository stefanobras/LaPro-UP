import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import opn from 'opn';

const app = express();
const PORT = 3003;

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configurar middleware para servir archivos de fuente desde la carpeta 'fonts'
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

// Ruta para servir la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lpSite.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}/`);

    // Abre el navegador al cargar el servidor
    opn(`http://localhost:${PORT}/`).catch(err => {
        console.error('No se pudo abrir el navegador:', err);
    });
});
