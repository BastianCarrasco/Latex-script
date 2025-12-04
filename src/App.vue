<script setup></script>

<template>
  <header>
    <h1>🌿 Latex Script</h1>
    <nav>
      <RouterLink to="/" class="link" active-class="active">Portada</RouterLink>
      <RouterLink to="/tablas" class="link" active-class="active">Tablas</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>

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

body {
  background-color: var(--bg);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--secondary);
  margin: 0;
  padding: 0;
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
}

header h1 {
  font-size: 1.2rem;
  color: var(--primary);
}

nav {
  display: flex;
  gap: 1.5rem;
}

.link {
  text-decoration: none;
  color: var(--secondary);
  font-weight: 500;
  transition: 0.25s;
}

.link:hover {
  color: var(--primary);
}

.active {
  color: var(--primary);
  border-bottom: 2px solid var(--primary);
}

/* --- Contenido principal --- */
main {
  padding: 2rem 4rem;
  min-height: calc(100vh - 140px);
}

/* --- Footer --- */
footer {
  background-color: var(--white);
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #666;
  border-top: 1px solid #eee;
}
</style>