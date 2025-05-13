import React from 'react';
import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './index.css';

function App() {
  const [url, setUrl] = useState('');
  const canvasRef = useRef();

  useEffect(() => {
    if (url) {
      QRCode.toCanvas(canvasRef.current, url, { width: 256 }, (err) => {
        if (err) console.error(err);
      });
    }
  }, [url]);

  const descargarQR = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'codigo-qr.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <>
    <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/Video/Fondo.mp4" type="video/mp4" />
      </video>

      <div className="min-h-screen bg-black/70 text-white flex flex-col items-center justify-center px-4">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-center"
        >
          Generador de Código QR
        </motion.h1>

        <motion.input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Ingresá una URL"
          className="w-full max-w-md p-3 text-black rounded-lg outline-none mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <canvas ref={canvasRef} className="bg-white p-2 rounded-lg" />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={descargarQR}
              className="bg-blue-600 hover:bg-blue-500 transition-colors px-6 py-2 rounded-lg text-white font-semibold"
            >
              Descargar PNG
            </motion.button>
          </motion.div>
        )}
      </div>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="fixed bottom-0 w-full bg-gray-800 text-center text-sm text-gray-300 py-4 shadow-inner"
      >
        <p>&copy; {new Date().getFullYear()} Mauricio Urquiza. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-6 mt-2 text-xl">
          <a
            href="https://github.com/mauriciogurquiza"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/mauricio-urquiza-briones-a1b198203/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/mauriurquiza9/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaInstagram />
          </a>
        </div>
      </motion.footer>

    </>
  );
}

export default App;
