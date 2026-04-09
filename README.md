# TerraNova Premium Website

Este es el proyecto final consolidado de TerraNova usando la base de diseño HTML "Stitch".

## 📂 Archivos y Estructura
La web es un sitio **estático multi-página**.
- `/css/styles.css`: Estilos unificados y clases específicas.
- `/js/tailwind-config.js`: Variables y colores de Tailwind extraídos de los mockups de Stitch.
- `/js/main.js`: Lógica responsable del menú de navegación interactivo y el reproductor de video atado al Scroll ("Scroll-Driven Video").
- `index.html`, `produce.html`, `logistics.html`, `sustainability.html`, `contact.html`: Páginas finales unificadas con navegación real.

## 🚀 Cómo abrirlo
Al ser un proyecto estático Vanilla HTML/CSS/JS, **solo necesitas hacer doble clic en el archivo `index.html`** para abrirlo en tu navegador. Puedes navegar por todas las páginas libremente.

### Notas para Servidor Local o Despliegue (Deploy)
Si quieres subirlo a internet, puedes simplemente arrastrar toda la carpeta `TerraNova_FinishedWeb` a servicios gratuitos como:
- **Netlify** (Opción más fácil, solo arrastrar y soltar)
- **Vercel**
- **GitHub Pages**

## 🎥 Scroll-Driven Hero (Conversión de Video)
En el Home (`index.html`), el Hero está diseñado para avanzar o retroceder de acuerdo al Scroll. 

**IMPORTANTE:** Tu archivo original en el escritorio era `.webp` (`Diseosinttulo-ezgif.com-video-to-webp-converter.webp`). Los navegadores **no permiten controlar el avance de un WebP animado usando Javascript**. Es mandatorio usar un video `.mp4`. 

Por defecto, he dejado tu archivo `.webp` incrustado como una **Imagen Fallback temporal** para que la página no se vea rota, pero el "Scrubbing" o avance por scroll necesita del video mp4.

### Cómo convertir tu WebP a MP4
Desafortunadamente, la herramienta `ffmpeg` no estaba instalada en tu sistema Mac.
Si instalas `ffmpeg` (usando `brew install ffmpeg` en la terminal), puedes transformar tu WebP al Mp4 correcto usando este comando desde tu consola:

```bash
ffmpeg -i /Users/andreamelchor/Desktop/Diseosinttulo-ezgif.com-video-to-webp-converter.webp -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p /Users/andreamelchor/Desktop/TerraNova_FinishedWeb/assets/hero.mp4
```

Una vez que tengas el archivo `hero.mp4` guardado en la carpeta `assets/`, el reproductor atado al scroll se activará automáticamente y la foto fallback desaparecerá sola.
