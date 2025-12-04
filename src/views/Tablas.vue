<template>
    <section class="tablas">
        <h2>Gestor de Tablas Semanales</h2>
        <p>Agrega las actividades y títulos de imágenes por semana 📅</p>

        <!-- Listado dinámico de semanas -->
        <div v-for="(semana, i) in semanas" :key="i" class="semana">
            <h3 contenteditable="true" @input="e => semana.titulo = e.target.innerText">
                {{ semana.titulo }}
            </h3>

            <!-- Tabla de actividades -->
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Equipo / Sistema</th>
                        <th>Tipo de Mant.</th>
                        <th>Descripción</th>
                        <th>Personal Directo</th>
                        <th>Área</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(fila, j) in semana.actividades" :key="j">
                        <td><input v-model="fila.fecha" placeholder="dd-mm-aaaa" /></td>
                        <td><input v-model="fila.equipo" /></td>
                        <td><input v-model="fila.tipo" /></td>
                        <td><textarea v-model="fila.descripcion"></textarea></td>
                        <td><input v-model="fila.personal" /></td>
                        <td><input v-model="fila.area" /></td>
                    </tr>
                </tbody>
            </table>

            <button @click="agregarFila(semana)">➕ Agregar Actividad</button>

            <!-- Bloque de imágenes -->
            <div class="imagenes">
                <h4>Registro Fotográfico</h4>
                <div v-for="(img, idx) in semana.imagenes" :key="idx" class="img-row">
                    <input v-model="semana.imagenes[idx]" placeholder="Nombre o descripción de imagen..." />
                </div>
                <button @click="agregarImagen(semana)">🖼 Agregar Imagen</button>
            </div>

            <hr />
        </div>

        <button @click="agregarSemana">➕ Agregar Semana</button>

        <div class="descarga">
            <button @click="descargarLatex">💾 Descargar LaTeX</button>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const semanas = ref([
    {
        titulo: 'Semana 1. (20 al 24) de Octubre del 2025',
        actividades: [
            {
                fecha: '21-10-2025',
                equipo: 'Precipitador A - Drenaje',
                tipo: 'Correctivo',
                descripcion: 'Retiro de drenaje para realizar cambio de Stub.',
                personal: '1 Supervisor, 6 Maestros, 1 APR',
                area: 'PLG 1'
            }
        ],
        imagenes: ['s1(1).jpg', 's1(2).jpg', 's1(3).jpg']
    }
])

// funciones de edición dinámica
function agregarSemana() {
    semanas.value.push({
        titulo: 'Nueva Semana',
        actividades: [],
        imagenes: []
    })
}

function agregarFila(semana) {
    semana.actividades.push({
        fecha: '',
        equipo: '',
        tipo: '',
        descripcion: '',
        personal: '',
        area: ''
    })
}

function agregarImagen(semana) {
    semana.imagenes.push('')
}

// Generar código LaTeX
// Generar código LaTeX corregido
function descargarLatex() {
    let contenido = ''

    for (const sem of semanas.value) {
        contenido += `\\subsection{${sem.titulo}}\n`

        sem.actividades.forEach((act) => {
            contenido += `
\\begin{table}[H]
\\centering
\\label{tab:actividades}
\\footnotesize
\\begin{tabular}{|>{\\small}m{1.8cm}|>{\\small}m{2.8cm}|>{\\small}m{2.8cm}|>{\\small}m{4cm}|>{\\small}m{2cm}|>{\\small}m{1.2cm}|}
\\hline
\\centering\\textbf{Fecha} &
\\centering\\textbf{Equipo / Sistema} &
\\centering\\textbf{Tipo de Mantenimiento} &
\\centering\\textbf{Descripción del trabajo realizado} &
\\centering\\textbf{Personal Directo} &
\\textbf{Área} \\\\ \\hline \\hline
\\centering\\small\\textbf{${act.fecha}} &
\\centering\\small ${act.equipo} &
\\centering\\small ${act.tipo} &
\\small ${act.descripcion} &
\\begin{flushleft} ${act.personal} \\end{flushleft} &
\\begin{center} ${act.area} \\end{center} \\\\ \\hline
\\multicolumn{6}{|c|}{\\textbf{Registro Fotográfico\\rule{0pt}{0.4cm}}} \\\\ \\hline
\\multicolumn{6}{|c|}{
\\begin{tabular}{
  >{\\centering\\arraybackslash}m{5cm}
  >{\\centering\\arraybackslash}m{5cm}
  >{\\centering\\arraybackslash}m{5cm}
}`

            // Insertar las imágenes con el formato correcto (tamaño 4x5cm y borde negro)
            contenido += sem.imagenes
                .map(
                    (img, idx) =>
                        `\\vspace{0.5cm}\\fcolorbox{gray}{black}{\\includegraphics[width=4cm,height=5cm]{COKE_template/Y-Imagenes/${img}}}\\vspace{0.5cm}` +
                        (idx < sem.imagenes.length - 1 ? ' &' : '')
                )
                .join('\n')

            contenido += `
\\\\
\\end{tabular}} \\\\ \\hline
\\end{tabular}
\\end{table}
\\newpage
`
        })
    }

    const blob = new Blob([contenido], { type: 'text/plain' })
    const enlace = document.createElement('a')
    enlace.href = URL.createObjectURL(blob)
    enlace.download = 'tablas_dinamicas.tex'
    enlace.click()
    URL.revokeObjectURL(enlace.href)
}
</script>

<style scoped>
.tablas {
    max-width: 1000px;
    margin: 2rem auto;
    background: #fff;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    color: var(--primary);
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
}

th,
td {
    padding: 0.6rem;
    border-bottom: 1px solid #ccc;
}

th {
    background-color: #f2f6f7;
}

textarea,
input {
    width: 100%;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.4rem;
}

textarea {
    resize: vertical;
    height: 70px;
}

button {
    margin-top: 0.7rem;
    background: #42b983;
    color: white;
    border: none;
    padding: 0.5rem 1.2rem;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background: #369f70;
}

.img-row {
    margin-bottom: 0.4rem;
}

.descarga {
    text-align: center;
    margin-top: 2rem;
}
</style>