<script setup></script>

<template>
  <header>
    <h1>🌿 Latex Script</h1>
    <nav>
      <RouterLink to="/" class="link" active-class="active">Portada</RouterLink>
      <RouterLink to="/tablas" class="link" active-class="active">Tablas</RouterLink>
    </nav>
  </header>

  <div class="main-layout-container">
    <aside class="sidebar-nav">
      <!-- Mueve aquí los enlaces de navegación si quieres que estén en la sidebar -->
      <RouterLink to="/" class="sidebar-link" active-class="active-sidebar">Portada</RouterLink>
      <RouterLink to="/tablas" class="sidebar-link" active-class="active-sidebar">Tablas</RouterLink>
      <!-- Puedes agregar más enlaces aquí -->
    </aside>

    <main class="content-area">
      <RouterView />
    </main>
  </div>

  <footer>
    <p>Hecho con 💚 usando Vue 3 + Vite + Bun</p>
  </footer>
</template>

<style scoped>
/* --- Paleta de colores suaves --- */
:root {
  --primary: #42b983;
  --secondary: #35495e;
  --bg: #f6f9fc;
  --white: #ffffff;
}

/* Base styles for body */
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--secondary);
  background-color: var(--bg);
  /* Asegura que el body tenga el color de fondo */
  min-height: 100vh;
  display: flex;
  /* Utiliza flexbox para que el footer se quede abajo */
  flex-direction: column;
}

/* --- Encabezado --- */
header {
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
  flex-shrink: 0;
  /* Evita que el header se encoja */
}

header h1 {
  font-size: 1.2rem;
  color: var(--primary);
  margin: 0;
  /* Eliminar margen predeterminado del h1 */
}

/* Oculta el nav original del header si los enlaces se movieron a la sidebar */
header nav {
  display: none;
}


/* --- Main Layout Container (Grid for sidebar and content) --- */
.main-layout-container {
  display: grid;
  /* REDUCCIÓN DEL ANCHO DEL NAV: De 200px a 160px */
  grid-template-columns: 160px 1fr;
  flex-grow: 1;
  /* Permite que este contenedor ocupe el espacio restante */
  overflow: hidden;
  /* Previene problemas de desbordamiento si el contenido es grande */
}

/* --- Sidebar Navigation --- */
.sidebar-nav {
  background-color: var(--white);
  padding: 1.5rem 0;
  /* Padding superior e inferior se mantienen, laterales a 0 */
  border-right: 1px solid #eee;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* Espacio entre los enlaces de la sidebar */
  flex-shrink: 0;
  /* Evita que la sidebar se encoja */
}

.sidebar-link {
  text-decoration: none;
  color: var(--secondary);
  font-weight: 500;
  /* REDUCCIÓN DEL PADDING DE LOS ENLACES PARA AJUSTARSE AL NUEVO ANCHO */
  padding: 0.75rem 1rem;
  /* Reducido de 1.5rem a 1rem */
  transition: 0.25s;
  display: block;
  /* Para que ocupe todo el ancho y se vea mejor el padding */
  white-space: nowrap;
  /* Evita que el texto se rompa en varias líneas */
  overflow: hidden;
  /* Oculta cualquier texto que exceda el ancho */
  text-overflow: ellipsis;
  /* Añade puntos suspensivos si el texto es muy largo */
}

.sidebar-link:hover {
  background-color: #f0f0f0;
  color: var(--primary);
}

.active-sidebar {
  background-color: var(--primary);
  color: var(--white);
  border-left: 4px solid #369f70;
  /* Borde de color para resaltar */
  font-weight: 600;
}

/* --- Content Area --- */
.content-area {
  padding: 2rem 3rem;
  /* Padding para el contenido principal */
  background-color: var(--bg);
  /* Fondo del área de contenido */
  overflow-y: auto;
  /* Permite scroll solo en el área de contenido si es necesario */
}


/* --- Footer --- */
footer {
  background-color: var(--white);
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #666;
  border-top: 1px solid #eee;
  flex-shrink: 0;
  /* Evita que el footer se encoja */
}

/* --- Media Queries para responsividad (muy importante) --- */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    padding: 0.75rem 1rem;
    gap: 0.5rem;
  }

  /* Mostrar la navegación en el header de nuevo para móviles */
  header nav {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 0.5rem;
    border-top: 1px solid #eee;
    margin-top: 0.5rem;
  }

  /* El diseño de una columna para móviles sigue siendo el mismo */
  .main-layout-container {
    grid-template-columns: 1fr;
    /* En pantallas pequeñas, la sidebar y el contenido se apilan */
  }

  .sidebar-nav {
    display: none;
    /* Oculta la sidebar en móviles para usar la navegación del header */
  }

  .content-area {
    padding: 1.5rem 1.5rem;
  }
}
</style>