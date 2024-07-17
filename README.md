# Sobre el proyecto

Este proyecto consta de un ejercicio que extrae datos de la [api de Rick y Morty](https://rickandmortyapi.com/) y los renderiza en páginas generadas con [Next.js](https://nextjs.org).
El resultado se encuentra en la siguiente url, desplegada mediante Vercel:
https://test-rick-morty-pau-sabater.vercel.app/

## Ejecución del proyecto

Primero, instala los nódulos necesarios:

```bash
npm i
```

, ejecuta el servidor en modo dev:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) con el navegador para ver el resultado.

## Estructura del proyecto

```
.
├── public/                             # Documentos públicos
└── src/                                # Código source
    ├── app/                            # Ficheros generación de páginas
    ├── components/                     # Componentes interficie
    │   └── [component]/                # Componente
    │       ├── [componente].tsx        # Fichero tsx componente
    │       └── [styles].module.scss    # Módulo scss
    ├── hooks/                          # React hooks customizados
    ├── styles/                         # Estilos globales
    └── utils/                          # Funciones y constantes reutilizables
```

## Lamadas a la API de Rick y Morty

Se ha decidido usar la api graphql dada la mayor eficiencia en relación a los datos recibidos, la menor necesidad de customizar los datos recibidos. Se ha tratado de reutilizar las queries, las cuales se encuentran en `src/utils/queries.ts`. Las llamadas a la API se ejecutan mediante custom hooks para mayor reutilización y facilidad de uso en el componente, las cuales se pueden encontrar en `src/hooks/[customhook.].tsx`

## Enfoque general del proyecto

Se ha tratado de mantener la simplicidad, con el objetivo de una interfaz intuituva, a la vez que un aspecto moderno.

**Listado personajes:** se la decidido implementar un "infinite scroll", el cual llama a la API cada vez que se llega a las últimas imágenes, debido a la mayor facilidad de uso por parte del usuario. A la vez, se la implementado una paginación de carga los personajes con intervalos de 200. Los filtros actuan de forma que cada vez que se activan se resetean los datos y se renderizan los nuevos pertinentes. Se ha añadido también un input para buscar según el nombre del personaje.

**Páginas de personajes:** cada personaje tiene una página dedicada. Se han añadido links a la página anterior y siguiente para facilitar la nagevación entre personajes.

**Página de comparación:** la página `/compare` permite seleccionar dos personajes para consultar los episodios comunes. Para generar el resultado se hacen 2 llamadas distintas a la api en el custom hook `src/hooks/useCallApiCompareEpisodes.tsx`

## Métricas de google

Se ha tratado de generar un buen resultado en las métricas de performance, SEO y accessibilidad. Los resultados son buenos, aunque hay un límite debido a que las imágenes recibidas de la API no son óptimas en relación al formato y, segun el caso, el tamaño.

### Performance
**Páginas renderizadas en servidor:** El contenido de las páginas es renderizado en el servidor, donde se hacen las llamadas iniciales para la api de Rick y Morty.
**Imágenes:** Las imágenes estan dimensionadas en html para evitar 'layout shifts'.
**Tamaño bundle:** Se ha evitado usar paquetes js que augmenten el tamaño del bundle y ralentizen la página.

### SEO
Sehan complementado los datos en los <meta> tags. Los links son descriptivos. Las imágenes constan de atributos 'alt'.

### Accesibilidad
Se ha usado html semántico, con los elementos correspondientes para su uso. Los elementos como buttons sin texto constan de atributos que describen su uso.

### Responsive
El diseño se ha adaptado a mobile para que se pueda consultar el contenido en todas las pantallas.

### Desplegue
Ae ha usado [Vercel](https://vercel.com/). para desplegar el projecto, dado la facilidad de integración y el buen rendimiento de la plataforma.

## Aspectos a mejorar
Hay muchos aspectos a mejorar evidentemente.
**Interficie:** El diseño de la interficie podria ser más trabajado.
**Filtros:** Los filtros de la lista inicial podrian ser más complejos y permitir más combinaciones.
**Persistir datos:** Los parámetros que permiten customizar la lista inicial se podrian guardar en sessionStorage mantener el resultado mientras se navega en la web.
**Mejorar meta tags:** Ahora mismo son muy simples y se podrian añadir más parametros.
**Lista compare:** Se podrian añadir filtros para evitar tener una lista tan larga.