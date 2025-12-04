<template>
    <section class="portada">
        <div class="encabezado">
            <h1 contenteditable="true" spellcheck="false">{{ titulo }}</h1>
            <h2 contenteditable="true" spellcheck="false">{{ subtitulo }}</h2>
            <img src="/invenio-logo.png" alt="Invenio logo" class="logo" />
        </div>

        <div class="info">
            <label>
                <strong>Fecha:</strong>
                <input v-model="fecha" type="text" />
            </label>
            <label>
                <strong>Empresa:</strong>
                <input v-model="empresa" type="text" />
            </label>
            <label>
                <strong>Contrato:</strong>
                <input v-model="contrato" type="text" />
            </label>
            <label>
                <strong>Elaborado por:</strong>
                <input v-model="elaboradoPor" type="text" />
            </label>
            <label>
                <strong>Supervisor:</strong>
                <input v-model="supervisor" type="text" />
            </label>
        </div>

        <div class="resumen">
            <h3 contenteditable="true" spellcheck="false">{{ seccionTitulo }}</h3>
            <textarea v-model="resumen" placeholder="Escribe o edita el resumen aquí..."></textarea>

            <button class="descargar" @click="descargarLatex">
                💾 Descargar Informe (.tex)
            </button>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const titulo = ref('INFORME MENSUAL DE MANTENIMIENTO')
const subtitulo = ref('PLANTAS DE LIMPIEZA DE GASES')

const fecha = ref('25 de Noviembre 2025')
const empresa = ref('INVENIO')
const contrato = ref('4600029959')
const elaboradoPor = ref('Jorge Carrasco V. - Administrador de Contrato')
const supervisor = ref('Pablo Cid – Supervisor')
const seccionTitulo = ref('1. Resumen General')

const resumen = ref(`Durante noviembre se realizan reparaciones en los Precipitadores A, B y C. 
Se logra abarcar la reparación interior completa de los Precipitadores A y C, en el Precipitador B 
aún quedan pendientes algunos puntos del nivel inferior, estos serán finalizados durante la última semana de Noviembre.
Se ejecutan trabajos correctivos con fibra, soldadura PP, HDPE y Gel Coat en drenajes, líneas de bajada y tuberías en la torre de lavado.
El periodo cierra con la reparación de 21 puntos correspondientes al nivel superior del precipitador B y trabajos adicionales en la ETP.`)

function descargarLatex() {
    const contenido = `
\\documentclass[a4paper, 12pt]{article}
\\usepackage{graphicx}
\\usepackage{caption}
\\usepackage[spanish]{babel}
\\usepackage{fontspec}
\\setmainfont{Times New Roman}
\\setsansfont{Times New Roman}
\\usepackage[top=2cm, bottom=2cm, left=2cm, right=2cm]{geometry}
\\usepackage{ragged2e}
\\usepackage{adjustbox}
\\usepackage{booktabs}
\\usepackage{tabularx}
\\usepackage{array}
\\usepackage{ragged2e}
\\usepackage{makecell}
\\usepackage[dvipsnames]{xcolor}
\\usepackage{multirow}
\\usepackage{titlesec}
\\usepackage{tocloft}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{bookmark}
\\usepackage{xcolor}
\\usepackage{background}
\\usepackage{float}
\\usepackage{indentfirst}
\\setlength{\\parindent}{1em}
\\usepackage{comment}
\\setcounter{secnumdepth}{4}
\\setcounter{tocdepth}{4}
\\backgroundsetup{
  scale=0.88,
  opacity=1,
  angle=0,
  contents={\\includegraphics[scale=1]{COKE_template/Y-Imagenes/bg.jpg}}
}
\\begin{document}

\\begin{titlepage}
\\centering
\\vspace*{0.5cm}

{\\sffamily\\fontsize{45}{40}\\selectfont \\textcolor{darkgray}{${titulo.value}} \\par}
\\vspace{1cm}
{\\sffamily\\fontsize{30}{36}\\selectfont \\textcolor{darkgray}{${subtitulo.value}} \\par}

\\vspace{8cm}
\\begin{flushleft}
{\\sffamily\\fontsize{15}{22}\\selectfont
\\textbf{Fecha:} ${fecha.value} \\par
\\textbf{Empresa:} ${empresa.value} \\par
\\textbf{Contrato:} ${contrato.value} \\par
}
\\end{flushleft}

\\vspace{0 cm}
\\begin{flushleft}
{\\sffamily\\fontsize{15}{22}\\selectfont
\\textbf{Elaborado por:} ${elaboradoPor.value} \\par
\\textbf{} \\hspace{3.4 cm} ${supervisor.value} \\par
}
\\end{flushleft}

\\begin{flushleft}
{\\sffamily\\fontsize{17}{26}\\selectfont \\textbf{${seccionTitulo.value}} \\par}
\\end{flushleft}

\\vspace{0 cm}
\\begin{flushleft}
{\\sffamily\\fontsize{14}{20}\\selectfont
\\justifying
${resumen.value}\\par}
\\end{flushleft}
\\vfill
\\end{titlepage}

\\backgroundsetup{
  scale=0.88,
  opacity=1,
  angle=0,
  contents={\\includegraphics[scale=1]{COKE_template/Y-Imagenes/bg.png}}
}
\\pagenumbering{arabic}
\\setcounter{section}{1}

\\section{Actividades Realizadas}
\\input{13-Contenido/Desarrollo}

\\end{document}
`

    const blob = new Blob([contenido], { type: 'text/plain' })
    const enlace = document.createElement('a')
    enlace.href = URL.createObjectURL(blob)
    enlace.download = 'informe_mensual.tex'
    enlace.click()
    URL.revokeObjectURL(enlace.href)
}
</script>

<style scoped>
.portada {
    background: linear-gradient(180deg, #ffffff, #f8f9fb);
    border-radius: 12px;
    padding: 3rem 2rem;
    max-width: 900px;
    margin: 2rem auto;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    color: #333;
}

.encabezado {
    text-align: center;
    margin-bottom: 2rem;
}

h1,
h2 {
    font-family: 'Times New Roman', serif;
    margin: 0;
}

h1 {
    font-size: 2rem;
    color: #2c3e50;
}

h2 {
    font-size: 1.3rem;
    color: #555;
}

.logo {
    margin-top: 1rem;
    width: 160px;
}

.info {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 2rem;
    font-family: 'Times New Roman', serif;
}

label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

input {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0.4rem 0.6rem;
    font-size: 1rem;
    font-family: 'Times New Roman', serif;
}

input:focus {
    border-color: #42b983;
    box-shadow: 0 0 3px #42b98355;
    outline: none;
}

.resumen {
    margin-top: 2rem;
}

.resumen h3 {
    font-size: 1.3rem;
    color: #2c3e50;
    font-family: 'Times New Roman', serif;
}

textarea {
    width: 100%;
    height: 220px;
    margin-top: 0.8rem;
    padding: 1rem;
    font-family: 'Times New Roman', serif;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: vertical;
}

textarea:focus {
    outline: none;
    border-color: #42b983;
    box-shadow: 0 0 4px #42b98355;
}

button.descargar {
    margin-top: 1.2rem;
    background-color: #42b983;
    color: white;
    border: none;
    padding: 0.7rem 1.4rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
}

button.descargar:hover {
    background-color: #369f70;
}
</style>