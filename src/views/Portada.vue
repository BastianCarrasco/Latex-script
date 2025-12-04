<template>
    <section class="portada">
        <h2>Bienvenido a Latex Script</h2>
        <p>Tu espacio para trabajar con Vue, LaTeX y scripts bonitos ✨</p>
    </section>
</template>

<script setup></script>

<style scoped>
.portada {
    background: linear-gradient(135deg, #42b98325, #35495e25);
    padding: 3rem;
    border-radius: 12px;
    text-align: center;
    transition: all 0.3s ease;
}

.portada:hover {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
}

h2 {
    color: var(--primary);
    font-size: 2rem;
}

p {
    margin-top: 1rem;
    font-size: 1.1rem;
}
</style>