# 🐉 RincónFlix

Aplicación web multipágina para explorar series de TV usando la API pública de [TVMaze](https://api.tvmaze.com).

## Integrantes
-Dana Arrubla
-Janier Leudo
-Edwin Henaho

## Funcionalidades implementadas

- ✅ Carga automática de series desde TVMaze API
- ✅ Tarjetas con imagen, nombre, géneros y rating
- ✅ Buscador con fetch a la API
- ✅ Historial de búsquedas persistente (localStorage)
- ✅ Filtrado por género (client-side)
- ✅ Paginación con selector de cantidad por página
- ✅ Página de detalles (`indexDetalles.html?id=123`)
- ✅ Sistema de favoritos (agregar / quitar / sin duplicados)
- ✅ Página dedicada de favoritos
- ✅ Persistencia con localStorage (favoritos, historial, límite)
- ✅ Diseño responsive (móvil, tablet, escritorio)
- ✅ Arquitectura modular ES Modules

## Estructura del proyecto

```

├── index.html
├── indexDetalles.html
├── indexFavoritos.html
├── imagenes/
│   └── Icono.png
├── css/
│   └── styles.css
└── js/
    ├── main/
    │   ├── main.js
    │   ├── mainDetalles.js
    │   └── mainFavoritos.js
    ├── ui/
    │   ├── ui.js
    │   ├── uiDetalles.js
    │   └── uiFavoritos.js
    ├── service/
    │   ├── service.js
    │   └── serviceFilter.js
    ├── state/
    │   └── state.js
    └── persistence/
        └── persistence.js
```


## API utilizada
- `GET /shows` — Lista inicial de series
- `GET /search/shows?q={query}` — Búsqueda
- `GET /shows/{id}` — Detalle de una serie
