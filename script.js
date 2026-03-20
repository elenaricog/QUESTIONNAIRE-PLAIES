// ==========================================
// CONFIGURACIÓN: PREGUNTAS DEL CUESTIONARIO
// ==========================================

const preguntas = [
    // PARTIE A: AUTO-ÉVALUATION (3 preguntas - escala 1-5)
    {
        id: 'A1',
        tipo: 'likert',
        texto: 'Je me sens capable d\'identifier les différents types de tissus (nécrose, fibrine, bourgeon).',
        etiquetas: ['Pas du tout', 'Peu', 'Moyennement', 'Assez', 'Très']
    },
    {
        id: 'A2',
        tipo: 'likert',
        texto: 'Je sais choisir le pansement adapté en fonction du niveau d\'exsudat.',
        etiquetas: ['Pas du tout', 'Peu', 'Moyennement', 'Assez', 'Très']
    },
    {
        id: 'A3',
        tipo: 'likert',
        texto: 'Je suis à l\'aise pour différencier une infection locale d\'une colonisation bactérienne.',
        etiquetas: ['Pas du tout', 'Peu', 'Moyennement', 'Assez', 'Très']
    },
    
    // PARTIE B: CONNAISSANCES (8 preguntas - QCM)
    {
        id: 'B4',
        tipo: 'qcm',
        texto: 'Concernant le nettoyage d\'une plaie chronique en phase de bourgeonnement (tissu rouge), quelle est la pratique recommandée ?',
        opciones: [
            { valor: 'A', texto: 'Utiliser systématiquement de l\'alcool à 70° pour désinfecter.' },
            { valor: 'B', texto: 'Utiliser un antiseptique coloré (type Bétadine) pour sécher la plaie.' },
            { valor: 'C', texto: 'Utiliser du sérum physiologique ou de l\'eau stérile pour ne pas altérer les cellules saines.', correcta: true },
            { valor: 'D', texto: 'Frotter vigoureusement avec une compresse sèche.' }
        ]
    },
    {
        id: 'B5',
        tipo: 'qcm',
        texto: 'Que signifie l\'acronyme "T.I.M.E" utilisé internationalement pour l\'évaluation des plaies ?',
        opciones: [
            { valor: 'A', texto: 'Température, Infection, Mesure, Épiderme.' },
            { valor: 'B', texto: 'Tissu, Infection/Inflammation, Maintien de l\'humidité, Épidermisation (Bords).', correcta: true },
            { valor: 'C', texto: 'Temps, Irrigation, Médicament, Évaluation.' },
            { valor: 'D', texto: 'Trauma, Incision, Massage, Élévation.' }
        ]
    },
    {
        id: 'B6',
        tipo: 'qcm',
        texto: 'Face à une plaie présentant de la fibrine (tissu jaune/gluant) adhérente, quelle est l\'action prioritaire ?',
        opciones: [
            { valor: 'A', texto: 'Appliquer un pansement sec pour assécher la fibrine.' },
            { valor: 'B', texto: 'Mettre un antibiotique local (crème) immédiatement.' },
            { valor: 'C', texto: 'Réaliser une détersion (mécanique ou autolytique) pour retirer la fibrine.', correcta: true },
            { valor: 'D', texto: 'Laisser la fibrine car elle protège la plaie.' }
        ]
    },
    {
        id: 'B7',
        tipo: 'qcm',
        texto: 'Quel est le rôle principal d\'un milieu humide dans la cicatrisation ?',
        opciones: [
            { valor: 'A', texto: 'Il favorise la macération et doit être évité.' },
            { valor: 'B', texto: 'Il accélère la migration cellulaire et l\'angiogenèse (formation de vaisseaux).', correcta: true },
            { valor: 'C', texto: 'Il augmente le risque d\'infection bactérienne.' },
            { valor: 'D', texto: 'Il sert uniquement à diminuer la douleur.' }
        ]
    },
    {
        id: 'B8',
        tipo: 'qcm',
        texto: 'Vous suspectez une infection locale sur une plaie (signes cliniques). Quel signe NE FAIT PAS partie des signes classiques d\'infection ?',
        opciones: [
            { valor: 'A', texto: 'Rougeur (Érythème) péri-lésionnelle.' },
            { valor: 'B', texto: 'Chaleur locale.' },
            { valor: 'C', texto: 'Présence de tissu de granulation rouge vif et sain.', correcta: true },
            { valor: 'D', texto: 'Odeur nauséabonde après nettoyage.' }
        ]
    },
    {
        id: 'B9',
        tipo: 'qcm',
        texto: 'Quel type de pansement choisissez-vous pour une plaie très exsudative (qui coule beaucoup) ?',
        opciones: [
            { valor: 'A', texto: 'Un tulle gras (interface).' },
            { valor: 'B', texto: 'Un film polyuréthane transparent.' },
            { valor: 'C', texto: 'Une fibre absorbante (alginate ou hydrofibre) ou une mousse (hydrocellulaire).', correcta: true },
            { valor: 'D', texto: 'Un hydrogel.' }
        ]
    },
    {
        id: 'B10',
        tipo: 'qcm',
        texto: 'Concernant l\'éducation du patient, quelle affirmation est FAUSSE ?',
        opciones: [
            { valor: 'A', texto: 'Le patient doit surveiller l\'apparition de fièvre ou de douleur croissante.' },
            { valor: 'B', texto: 'Une bonne nutrition (protéines) est essentielle à la cicatrisation.' },
            { valor: 'C', texto: 'Le patient ne doit jamais toucher son pansement, même s\'il est souillé et décollé.', correcta: true },
            { valor: 'D', texto: 'L\'hygiène corporelle générale est un facteur préventif d\'infection.' }
        ]
    },
    {
        id: 'B11',
        tipo: 'qcm',
        texto: 'La traçabilité du soin doit obligatoirement mentionner :',
        opciones: [
            { valor: 'A', texto: 'Uniquement le nom du pansement utilisé.' },
            { valor: 'B', texto: 'L\'état du lit de la plaie, les dimensions, l\'état de la peau périlésionnelle et le soin réalisé.', correcta: true },
            { valor: 'C', texto: 'L\'humeur du patient ce jour-là.' },
            { valor: 'D', texto: 'La quantité de compresses utilisées pour la facturation uniquement.' }
        ]
    },
    
    // PARTIE C: CAS CLINIQUES (4 preguntas)
    {
        id: 'C12',
        tipo: 'casoclinico',
        texto: 'Quel pansement choisissez-vous en première intention ?',
        caso: 'Mme Dubois, 45 ans, se présente avec une coupure nette de 3 cm au doigt (accident de cuisine, date d\'hier). La plaie est peu exsudative, fermée aux bords.',
        opciones: [
            { valor: 'A', texto: 'Alginate (fortement absorbant)' },
            { valor: 'B', texto: 'Hydrocolloïde ou film transparent', correcta: true },
            { valor: 'C', texto: 'Mousse hydrocellulaire' },
            { valor: 'D', texto: 'Hydrogel' }
        ]
    },
    {
        id: 'C13',
        tipo: 'casoclinico',
        texto: 'Quelle est votre action prioritaire ?',
        caso: 'M. Leroy, 52 ans, ouvrier, plaie du mollet post-traumatique (5 jours). La plaie présente un tissu jaune/gluant adhérent, peu de liquide.',
        opciones: [
            { valor: 'A', texto: 'Appliquer antibiotique local' },
            { valor: 'B', texto: 'Mettre pansement sec pour assécher' },
            { valor: 'C', texto: 'Détersion (retirer la fibrine)', correcta: true },
            { valor: 'D', texto: 'Laisser tel quel, c\'est normal' }
        ]
    },
    {
        id: 'C14',
        tipo: 'casoclinico',
        texto: 'Quel signe confirme l\'infection ?',
        caso: 'Mme Petit, 38 ans, plaie de sacrocoxigien (plaie de pression stade 2). La peau périlésionnelle est rouge, chaude, la plaie sent mauvais.',
        opciones: [
            { valor: 'A', texto: 'La rougeur périlésionnelle seule' },
            { valor: 'B', texto: 'La combinaison rougeur + chaleur + odeur', correcta: true },
            { valor: 'C', texto: 'L\'absence de douleur' },
            { valor: 'D', texto: 'La présence de tissu noir' }
        ]
    },
    {
        id: 'C15',
        tipo: 'casoclinico',
        texto: 'Quelle est votre conduite à tenir immédiatement ?',
        caso: 'M. Dupont, 67 ans, plaie du pied diabétique profonde. Vous observez une exposition osseuse, la peau est chaude, rouge étendue (>2cm), et le patient présente une fièvre à 38,5°C.',
        opciones: [
            { valor: 'A', texto: 'Nettoyer avec sérum physiologique et appliquer un pansement standard' },
            { valor: 'B', texto: 'Appeler le médecin immédiatement pour avis spécialisé', correcta: true },
            { valor: 'C', texto: 'Administrer un antibiotique oral et surveiller 48h' },
            { valor: 'D', texto: 'Recouvrir la plaie et demander au patient de revenir dans 3 jours' }
        ]
    }
];

// ==========================================
// VARIABLES GLOBALES
// ==========================================

let preguntaActual = 0;
let respuestas = {};
let codigo = '';
let momento = '';

// ==========================================
// FUNCIONES DE NAVEGACIÓN ENTRE PANTALLAS
// ==========================================

function mostrarPantalla(idPantalla) {
    document.querySelectorAll('.pantalla').forEach(p => {
        p.classList.remove('activa');
    });
    
    const pantalla = document.getElementById(idPantalla);
    if (pantalla) {
        pantalla.classList.add('activa');
    }
}

function cerrarCuestionario() {
    window.close();
    setTimeout(() => {
        alert('Vous pouvez fermer cet onglet manuellement. Merci !');
    }, 100);
}

// ==========================================
// FUNCIONES DEL CUESTIONARIO
// ==========================================

function iniciarCuestionario() {
    codigo = document.getElementById('codigo').value;
    momento = document.querySelector('input[name="momento"]:checked')?.value;
    
    if (!codigo || !momento) {
        alert('Veuillez sélectionner votre code et le moment de l\'évaluation.');
        return;
    }
    
    respuestas.codigo = codigo;
    respuestas.momento = momento;
    respuestas.fecha = new Date().toLocaleDateString('fr-FR');
    
    mostrarPantalla('pantalla-preguntas');
    mostrarPregunta(0);
}

function mostrarPregunta(indice) {
    preguntaActual = indice;
    const pregunta = preguntas[indice];
    const contenedor = document.getElementById('contenedor-pregunta');
    
    document.getElementById('num-pregunta').textContent = indice + 1;
    document.getElementById('progreso').style.width = ((indice + 1) / 15 * 100) + '%';
    
    let html = `<h3 class="pregunta-titulo">${pregunta.id}. ${pregunta.texto}</h3>`;
    
    if (pregunta.tipo === 'casoclinico') {
        html += `<div class="caso-clinico"><strong>Cas :</strong> ${pregunta.caso}</div>`;
    }
    
    if (pregunta.tipo === 'likert') {
        html += generarLikert(pregunta);
    } else {
        html += generarQCM(pregunta);
    }
    
    contenedor.innerHTML = html;
    
    if (respuestas[pregunta.id]) {
        restaurarRespuesta(pregunta, respuestas[pregunta.id]);
    }
    
    document.getElementById('btn-anterior').style.display = indice === 0 ? 'none' : 'inline-block';
    document.getElementById('btn-siguiente').textContent = indice === 14 ? 'Terminer' : 'Suivant →';
}

function generarLikert(pregunta) {
    let html = '<div class="likert-container">';
    for (let i = 1; i <= 5; i++) {
        const seleccionada = respuestas[pregunta.id] == i ? 'checked' : '';
        html += `
            <div class="likert-option">
                <input type="radio" name="${pregunta.id}" id="${pregunta.id}_${i}" value="${i}" ${seleccionada} onchange="guardarRespuesta('${pregunta.id}', ${i})">
                <label for="${pregunta.id}_${i}">${i}</label>
            </div>
        `;
    }
    html += '</div>';
    html += '<div class="likert-labels"><span>Pas du tout à l\'aise</span><span>Très à l\'aise/Expert</span></div>';
    return html;
}

function generarQCM(pregunta) {
    let html = '<div class="opciones-container">';
    pregunta.opciones.forEach(opcion => {
        const seleccionada = respuestas[pregunta.id] === opcion.valor ? 'seleccionada' : '';
        html += `
            <div class="opcion ${seleccionada}" onclick="seleccionarOpcion('${pregunta.id}', '${opcion.valor}')">
                <input type="radio" name="${pregunta.id}" value="${opcion.valor}" ${seleccionada ? 'checked' : ''}>
                <span>${opcion.valor}. ${opcion.texto}</span>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

function seleccionarOpcion(preguntaId, valor) {
    document.querySelectorAll(`input[name="${preguntaId}"]`).forEach(el => {
        el.closest('.opcion').classList.remove('seleccionada');
    });
    
    const input = document.querySelector(`input[name="${preguntaId}"][value="${valor}"]`);
    if (input) {
        input.checked = true;
        input.closest('.opcion').classList.add('seleccionada');
        guardarRespuesta(preguntaId, valor);
    }
}

function guardarRespuesta(preguntaId, valor) {
    respuestas[preguntaId] = valor;
    console.log('Respuesta guardada:', preguntaId, '=', valor);
}

function restaurarRespuesta(pregunta, valor) {
    if (pregunta.tipo === 'likert') {
        const input = document.getElementById(`${pregunta.id}_${valor}`);
        if (input) input.checked = true;
    } else {
        const input = document.querySelector(`input[name="${pregunta.id}"][value="${valor}"]`);
        if (input) {
            input.checked = true;
            input.closest('.opcion').classList.add('seleccionada');
        }
    }
}

function preguntaSiguiente() {
    const pregunta = preguntas[preguntaActual];
    if (!respuestas[pregunta.id]) {
        alert('Veuillez sélectionner une réponse avant de continuer.');
        return;
    }
    
    if (preguntaActual < 14) {
        mostrarPregunta(preguntaActual + 1);
    } else {
        finalizarCuestionario();
    }
}

function preguntaAnterior() {
    if (preguntaActual > 0) {
        mostrarPregunta(preguntaActual - 1);
    }
}

// ==========================================
// FINALIZAR Y ENVIAR A GOOGLE SHEETS
// ==========================================

function finalizarCuestionario() {
    let correctas = 0;
    let totalQCM = 12;
    
    for (let pregunta of preguntas) {
        if (pregunta.tipo !== 'likert') {
            const respuestaDada = respuestas[pregunta.id];
            const respuestaCorrecta = pregunta.opciones.find(o => o.correcta)?.valor;
            if (respuestaDada === respuestaCorrecta) {
                correctas++;
            }
        }
    }
    
    const puntuacion = Math.round((correctas / totalQCM) * 100);
    respuestas.puntuacion = puntuacion;
    respuestas.correctas = correctas;
    respuestas.total = totalQCM;
    
    enviarAGoogleSheets();
    mostrarPantalla('pantalla-final');
    
    document.getElementById('resumen-puntuacion').innerHTML = `
        <p>Score : <span class="puntuacion-numero">${correctas}/${totalQCM}</span></p>
        <p>(${puntuacion}% de réponses correctes)</p>
        <p style="margin-top: 15px; font-size: 0.9em; color: #666;">
            Code : ${respuestas.codigo}<br>
            Moment : ${respuestas.momento}
        </p>
    `;
}

// ==========================================
// CONEXIÓN A GOOGLE SHEETS
// ==========================================

function enviarAGoogleSheets() {
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwnVRXEDIoa8hYHqDiSh2GhQEKMDzMw5L61XRMa9noIjdAsRkLQwGaE4MPgRmFM0AOWMg/exec';
    
    if (GOOGLE_SHEETS_URL.includes('PEGA_AQUI')) {
        console.log('=== DATOS DEL CUESTIONARIO ===');
        console.log(respuestas);
        console.log('==============================');
        return;
    }
    
    fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(respuestas)
    })
    .then(() => console.log('Datos enviados correctamente'))
    .catch(err => console.error('Error:', err));
}
