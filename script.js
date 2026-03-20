// ==========================================
// CONFIGURACIÓN: URL de tu Apps Script (ACTUALIZAR CON LA NUEVA)
// ==========================================
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyf2ZS4jZPnAP9lZ0MMEqL_EU9N8jOgWmLHukpXpWrasQE1glUt1B8NFkuvbv9k342irA/exec';

// ==========================================
// VARIABLES GLOBALES
// ==========================================
let preguntaActual = 0;
let respuestas = {};
let tokenInfo = null;

// ==========================================
// INICIO: Leer token de la URL al cargar
// ==========================================
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (!token) {
        mostrarError('Accès non autorisé. Utilisez le lien fourni.');
        return;
    }
    
    // Verificar formato del token (básico)
    if (!token.match(/^tk_[a-z0-9]+_(pre|post)$/)) {
        mostrarError('Lien invalide. Vérifiez l\'URL.');
        return;
    }
    
    // Extraer info del token directamente (sin llamar a Google Sheets)
    const partes = token.split('_');
    const codigo = partes[1].toUpperCase(); // 7x9m2k → 7X9M2K (pero usaremos U01, U02...)
    const fase = partes[2].toUpperCase();  // pre o post
    
    // Mapear token a código de usuario (U01, U02...)
    const mapeoTokens = {
        '7X9M2K': 'U01',
        '3P8N5Q': 'U02',
        '4R7S8T': 'U03',
        '9V2W1X': 'U04',
        '5Y6Z3A': 'U05',
        '8B4C7D': 'U06',
        '1E5F9G': 'U07',
        '6H2I8J': 'U08',
        '0K4L7M': 'U09',
        '2N5P8Q': 'U10',
        '7R9S3T': 'U11',
        '4U6V1W': 'U12'
    };
    
    const codigoUsuario = mapeoTokens[codigo] || 'DESCONOCIDO';
    
    tokenInfo = {
        token: token,
        codigo: codigoUsuario,
        fase: fase
    };
    
    // Verificar si ya fue usado (localStorage - solo en este navegador)
    const yaUsado = localStorage.getItem('token_usado_' + token);
    if (yaUsado) {
        mostrarError('Ce lien a déjà été utilisé sur ce navigateur.');
        return;
    }
    
    // Mostrar bienvenida
    configurarPantallaBienvenida();
};

function mostrarError(mensaje) {
    document.body.innerHTML = `
        <div style="max-width: 600px; margin: 50px auto; padding: 30px; text-align: center; font-family: Arial, sans-serif; background: #fff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #e74c3c; margin-bottom: 20px;">⚠️ Erreur</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">${mensaje}</p>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">Contactez l'administratrice si nécessaire.</p>
        </div>
    `;
}

// ==========================================
// CONFIGURAR PANTALLA DE BIENVENIDA
// ==========================================
function configurarPantallaBienvenida() {
    const pantallaBienvenida = document.getElementById('pantalla-bienvenida');
    
    const mensajeFase = document.createElement('div');
    mensajeFase.id = 'info-fase';
    mensajeFase.style.cssText = 'background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3498db; text-align: center;';
    
    if (tokenInfo.fase === 'PRE') {
        mensajeFase.innerHTML = `
            <strong style="font-size: 16px; color: #2980b9;">📋 Phase : Pré-formation</strong><br>
            <small style="color: #666;">Code anonyme : ${tokenInfo.codigo}</small>
        `;
    } else {
        mensajeFase.innerHTML = `
            <strong style="font-size: 16px; color: #27ae60;">📋 Phase : Post-formation</strong><br>
            <small style="color: #666;">Code anonyme : ${tokenInfo.codigo}</small>
        `;
    }
    
    const subtitle = pantallaBienvenida.querySelector('.subtitle');
    if (subtitle && subtitle.nextSibling) {
        pantallaBienvenida.insertBefore(mensajeFase, subtitle.nextSibling);
    } else {
        pantallaBienvenida.appendChild(mensajeFase);
    }
    
    mostrarPantalla('pantalla-bienvenida');
}

// ==========================================
// NAVEGACIÓN ENTRE PANTALLAS
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
// INICIAR CUESTIONARIO
// ==========================================
function iniciarCuestionario() {
    respuestas.token = tokenInfo.token;
    respuestas.codigo = tokenInfo.codigo;
    respuestas.momento = tokenInfo.fase;
    respuestas.fecha = new Date().toLocaleDateString('fr-FR');
    
    mostrarPantalla('pantalla-preguntas');
    mostrarPregunta(0);
}

// ==========================================
// PREGUNTAS DEL CUESTIONARIO
// ==========================================
const preguntas = [
    // PARTIE A: AUTO-ÉVALUATION (3 preguntas)
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
    
    // PARTIE B: CONNAISSANCES (8 preguntas)
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
// FUNCIONES DE VISUALIZACIÓN
// ==========================================

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
// FINALIZAR Y ENVIAR
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
    
    // Marcar como usado en localStorage
    localStorage.setItem('token_usado_' + tokenInfo.token, 'true');
    
    enviarAGoogleSheets();
    mostrarPantalla('pantalla-final');
    
    document.getElementById('resumen-puntuacion').innerHTML = `
        <p>Score : <span class="puntuacion-numero">${correctas}/${totalQCM}</span></p>
        <p>(${puntuacion}% de réponses correctes)</p>
        <p style="margin-top: 15px; font-size: 0.9em; color: #666;">
            Code anonyme : ${respuestas.codigo}<br>
            Moment : ${respuestas.momento}
        </p>
    `;
}

function enviarAGoogleSheets() {
    // Usar no-cors para evitar problemas de CORS
    fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(respuestas)
    })
    .then(() => console.log('Datos enviados'))
    .catch(err => {
        console.error('Error al enviar:', err);
        // Aunque falle, el usuario ya vio el mensaje de éxito
        // y el token está marcado como usado
    });
}
