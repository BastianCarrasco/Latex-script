<template>
    <section>
        <h2>Vista de Tablas</h2>
        <p>Próximamente: tus tablas dinámicas ⚙️</p>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Ejemplo A</td>
                    <td>123</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Ejemplo B</td>
                    <td>456</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup></script>

<style scoped>
h2 {
    color: var(--primary);
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1.5rem;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
}

th,
td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
}

th {
    background-color: #f7f9fb;
    color: #555;
}

tr:hover {
    background-color: #f0f7f4;
}
</style>