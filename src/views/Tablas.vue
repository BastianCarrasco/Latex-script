<template>
    <section class="tablas">
        <h2>Gestor de Tablas Semanales</h2>
        <p>Agrega las actividades y títulos de imágenes por semana 📅</p>

        <!-- Listado dinámico de semanas -->
        <div v-for="(semana, i) in semanas" :key="i" class="semana">
            <div class="semana-titulo">
                <h3 contenteditable="true" spellcheck="false" @input="e => semana.titulo = e.target.innerText"
                    :data-placeholder="'(Indique título de la semana)'">
                    {{ semana.titulo }}
                </h3>
            </div>

            <div class="actividades-grid">
                <div v-for="(fila, j) in semana.actividades" :key="j" class="actividad-card">
                    <div class="actividad-campo">
                        <label>Fecha:</label>
                        <input v-model="fila.fecha" placeholder="dd-mm-aaaa" />
                    </div>
                    <div class="actividad-campo">
                        <label>Equipo / Sistema:</label>
                        <input v-model="fila.equipo" placeholder="Ej: Precipitador A" />
                    </div>
                    <div class="actividad-campo">
                        <label>Tipo de Mant.:</label>
                        <input v-model="fila.tipo" placeholder="Correctivo / Preventivo" />
                    </div>
                    <div class="actividad-campo col-descripcion">
                        <label>Descripción:</label>
                        <textarea v-model="fila.descripcion"
                            placeholder="Descripción del trabajo realizado..."></textarea>
                    </div>
                    <div class="actividad-campo">
                        <label>Personal Directo:</label>
                        <input v-model="fila.personal" placeholder="Ej: 1 Supervisor, 6 Maestros" />
                    </div>
                    <div class="actividad-campo">
                        <label>Área:</label>
                        <input v-model="fila.area" placeholder="PLG 1" />
                    </div>

                    <!-- Bloque de imágenes por actividad -->
                    <div class="imagenes-actividad">
                        <h4>Registro Fotográfico de Actividad</h4>
                        <div v-for="(img, idx) in fila.imagenes" :key="idx" class="img-row-actividad">
                            <input v-model="fila.imagenes[idx]"
                                placeholder="Nombre o descripción de imagen (ej: s1(1).jpg)" />
                            <button @click="eliminarImagenActividad(fila, idx)" class="btn-eliminar-img">
                                ➖
                            </button>
                        </div>
                        <button @click="agregarImagenActividad(fila)" class="btn-agregar-img-actividad">
                            🖼 Agregar Imagen a Actividad
                        </button>
                    </div>

                    <button @click="eliminarActividad(semana, j)" class="btn-eliminar-actividad">
                        ➖ Eliminar Actividad
                    </button>
                </div>
            </div>

            <button @click="agregarFila(semana)">➕ Agregar Actividad</button>

            <hr />
        </div>

        <button @click="agregarSemana">➕ Agregar Semana</button>
        <button @click="eliminarUltimaSemana" v-if="semanas.length > 1">
            ➖ Eliminar Última Semana
        </button>

        <div class="descarga">
            <button @click="descargarLatex">💾 Descargar LaTeX</button>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import '../../styles/tablas.css'; // Asumiendo que esta es la ruta correcta de tu CSS

const semanas = ref([
    {
        titulo: 'Semana 1: Trabajos en Precipitador A',
        actividades: [
            {
                fecha: '21-10-2025',
                equipo: 'Precipitador A - Drenaje',
                tipo: 'Correctivo',
                descripcion: 'Retiro de drenaje para realizar cambio de Stub.',
                personal: '1 Supervisor, 6 Maestros, 1 APR',
                area: 'PLG 1',
                imagenes: ['s1(1).jpg', 's1(2).jpg'], // Imágenes para esta actividad
            },
            {
                fecha: '22-10-2025',
                equipo: 'Filtro de Manga B',
                tipo: 'Preventivo',
                descripcion: 'Inspección de elementos filtrantes y limpieza general.',
                personal: '1 Supervisor, 3 Maestros',
                area: 'PLG 2',
                imagenes: ['s1(3).jpg', 's1(4).jpg', 's1(5).jpg'], // Imágenes para esta otra actividad
            },
        ],
    },
    {
        titulo: 'Semana 2: Mantenimiento General',
        actividades: [
            {
                fecha: '28-10-2025',
                equipo: 'Molino de Bolas C',
                tipo: 'Preventivo',
                descripcion: 'Cambio de revestimientos internos y rodamientos.',
                personal: '1 Supervisor, 8 Maestros, 2 APR',
                area: 'Molienda',
                imagenes: ['s2(1).jpg'],
            },
        ],
    },
]);

function agregarSemana() {
    semanas.value.push({
        titulo: '',
        actividades: [],
    });
}

function eliminarUltimaSemana() {
    if (semanas.value.length > 1) {
        semanas.value.pop();
    }
}

function agregarFila(semana) {
    semana.actividades.push({
        fecha: '',
        equipo: '',
        tipo: '',
        descripcion: '',
        personal: '',
        area: '',
        imagenes: [],
    });
}

function eliminarActividad(semana, index) {
    semana.actividades.splice(index, 1);
}

function agregarImagenActividad(actividad) {
    actividad.imagenes.push('');
}

function eliminarImagenActividad(actividad, index) {
    actividad.imagenes.splice(index, 1);
}

// Generar código LaTeX
function descargarLatex() {
    let contenido = '';

    for (let i = 0; i < semanas.value.length; i++) {
        const sem = semanas.value[i];
        const tituloSemana = sem.titulo || 'Semana sin título';
        contenido += `\\subsection*{${tituloSemana}}\n`;

        sem.actividades.forEach((act) => {
            const escapeLatex = (text) => {
                if (!text) return '';
                return text
                    .replace(/&/g, '\\&')
                    .replace(/%/g, '\\%')
                    .replace(/\$/g, '\\$')
                    .replace(/#/g, '\\#')
                    .replace(/_/g, '\\_')
                    .replace(/{/g, '\\{')
                    .replace(/}/g, '\\}')
                    .replace(/~/g, '\\textasciitilde{}')
                    .replace(/\^/g, '\\textasciicircum{}')
                    .replace(/\\/g, '\\textbackslash{}');
            };

            // Aseguramos que solo se genere la tabla si hay contenido útil
            if (
                act.fecha ||
                act.equipo ||
                act.tipo ||
                act.descripcion ||
                act.personal ||
                act.area ||
                act.imagenes.length > 0
            ) {
                contenido += `
\\begin{table}[H]
\\centering
\\label{tab:actividad-${escapeLatex(tituloSemana.replace(/\s/g, '-'))}-${escapeLatex(act.fecha.replace(/\s/g, '-'))}} % Etiqueta única
\\footnotesize
\\begin{tabular}{|>{\\small}m{1.8cm}|>{\\small}m{2.8cm}|>{\\small}m{2.8cm}|>{\\small}m{4cm}|>{\\small}m{2cm}|>{\\small}m{1.2cm}|}
\\hline
\\centering\\textbf{Fecha} &
\\centering\\textbf{Equipo / Sistema} &
\\centering\\textbf{Tipo de Mantenimiento} &
\\centering\\textbf{Descripción del trabajo realizado} &
\\centering\\textbf{Personal Directo} &
\\textbf{Área} \\\\ \\hline \\hline
\\centering\\small\\textbf{${escapeLatex(act.fecha)}} &
\\centering\\small ${escapeLatex(act.equipo)} &
\\centering\\small ${escapeLatex(act.tipo)} &
\\small ${escapeLatex(act.descripcion)} &
\\begin{flushleft} ${escapeLatex(act.personal)} \\end{flushleft} &
\\begin{center} ${escapeLatex(act.area)} \\end{center} \\\\ \\hline
`;

                if (act.imagenes.length > 0) {
                    contenido += `
\\multicolumn{6}{|c|}{\\textbf{Registro Fotográfico\\rule{0pt}{0.4cm}}} \\\\ \\hline
\\multicolumn{6}{|c|}{
\\begin{tabular}{
  >{\\centering\\arraybackslash}m{5cm}
  >{\\centering\\arraybackslash}m{5cm}
  >{\\centering\\arraybackslash}m{5cm}
}`;

                    let imagenesHtml = '';
                    for (let imgIdx = 0; imgIdx < act.imagenes.length; imgIdx += 3) {
                        const rowImages = act.imagenes.slice(imgIdx, imgIdx + 3);
                        imagenesHtml += rowImages
                            .map(
                                img =>
                                    `\\vspace{0.5cm}\\fcolorbox{gray}{black}{\\includegraphics[width=4cm,height=5cm]{COKE_template/Y-Imagenes/${escapeLatex(img)}}}\\vspace{0.5cm}`
                            )
                            .join(' &\n');
                        imagenesHtml += ' \\\\\n';
                    }
                    contenido += imagenesHtml;

                    contenido += `
\\end{tabular}} \\\\ \\hline
`;
                }
                contenido += `
\\end{tabular}
\\end{table}
`;
            }
        });

        // Añadir \newpage SÓLO si no es la última semana y si hay actividades en esta semana
        if (i < semanas.value.length - 1 && sem.actividades.length > 0) {
            contenido += '\\newpage\n';
        }
    }

    const blob = new Blob([contenido], { type: 'text/plain' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = 'tablas_dinamicas.tex';
    enlace.click();
    URL.revokeObjectURL(enlace.href);
}
</script>

<style scoped>
/* Tu CSS importado en "../../styles/tablas.css" */
</style>