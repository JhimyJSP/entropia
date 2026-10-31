# ML Quantitative Researcher

Índice interactivo de formación e investigación cuantitativa en mercados financieros. El sitio funciona en una vista 2D de una sola página: selecciona un tema para abrir su área de lectura y vuelve al índice con el botón superior.

---

El índice contiene doce etapas y 73 temas. Al seleccionar un tema se abre una vista de lectura 2D de una sola página. El contenido de cada tema se puede incorporar posteriormente.

---

## 🚀 Despliegue en GitHub Pages

Este repositorio está configurado con **GitHub Actions** para publicarse automáticamente en **GitHub Pages**.

Para activarlo en GitHub:
1. Ve a la pestaña **Settings** (Configuración) de este repositorio.
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En **Build and deployment > Source**, selecciona **GitHub Actions**.
4. ¡Listo! Tu sitio estará disponible en:
   `https://<tu-usuario>.github.io/<tu-repositorio>/`

---

## 🛠️ Estructura del Proyecto

```text
entropia/
├── dist/
│   ├── index.html        # Índice y vista de lectura de una sola página
│   ├── curriculum.css    # Diseño 2D adaptable
│   ├── book-content.js   # Etapas y temas del índice
│   ├── learning-engine.js # Navegación entre índice y temas
│   ├── robots.txt        # Instrucciones para motores de búsqueda (Google)
│   └── sitemap.xml       # Mapa del sitio para indexación rápida
├── .github/
│   └── workflows/
│       └── deploy.yml    # Despliegue automático a GitHub Pages
└── README.md
```

---

## 📝 Autor y Licencia
Desarrollado con fines educativos y de investigación cuantitativa.
