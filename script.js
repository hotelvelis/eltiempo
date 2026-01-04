// DATOS COMPLETOS 2026
const PANTANOS = [
    { nombre: "La Viñuela", actual: 75.1, total: 164.4, coords: [36.88, -4.17] },
    { nombre: "La Concepción", actual: 46.4, total: 57.5, coords: [36.56, -4.94] },
    { nombre: "C. de Guadalhorce", actual: 37.4, total: 66.5, coords: [36.93, -4.79] },
    { nombre: "Guadalteba", actual: 32.1, total: 153.3, coords: [36.98, -4.83] },
    { nombre: "Casasola", actual: 11.2, total: 21.7, coords: [36.79, -4.48] },
    { nombre: "El Limonero", actual: 11.6, total: 22.3, coords: [36.76, -4.43] }
];

const MUNICIPIOS = [
    { n: "Málaga", t: 21, v: 18, h: 62 }, { n: "Marbella", t: 22, v: 12, h: 58 },
    { n: "Vélez-Málaga", t: 23, v: 14, h: 50 }, { n: "Antequera", t: 16, v: 32, h: 42 },
    { n: "Ronda", t: 14, v: 25, h: 45 }, { n: "Fuengirola", t: 21, v: 11, h: 65 },
    { n: "Estepona", t: 22, v: 15, h: 60 }, { n: "Mijas", t: 20, v: 18, h: 55 },
    { n: "Torremolinos", t: 21, v: 13, h: 63 }, { n: "Benalmádena", t: 20, v: 14, h: 66 }
];

// Inicialización de Mapa
const map = L.map('map', {zoomControl: false}).setView([36.72, -4.42], 9);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

function renderDashboard() {
    const pg = document.getElementById('pantanos-grid');
    pg.innerHTML = ''; 

    PANTANOS.forEach(p => {
        // CORRECCIÓN FINAL: Cálculo de porcentaje verificado
        const perc = ((p.actual / p.total) * 100).toFixed(1);
        
        // Marcadores en mapa
        L.circle(p.coords, {
            color: 'rgb(0, 113, 227)',
            fillOpacity: 0.3,
            radius: 4000
        }).addTo(map).bindPopup(`<b>${p.nombre}</b>: ${perc}%`);

        pg.innerHTML += `
            <div class="card">
                <div style="display:flex; justify-content:space-between; align-items:center">
                    <strong style="font-size:1rem">${p.nombre}</strong>
                    <span style="font-weight:800; color:var(--accent)">${perc}%</span>
                </div>
                <div class="water-track">
                    <div class="water-fill" style="width:${perc}%"></div>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:0.75rem; opacity:0.7">
                    <span>${p.actual} hm³ actuales</span>
                    <span>Capacidad: ${p.total} hm³</span>
                </div>
            </div>`;
    });

    const mg = document.getElementById('municipios-grid');
    mg.innerHTML = '';
    MUNICIPIOS.forEach(m => {
        mg.innerHTML += `
            <div class="card">
                <div style="display:flex; justify-content:space-between; align-items:center">
                    <strong>${m.n}</strong>
                    <span style="font-size:1.6rem; font-weight:200">${m.t}°C</span>
                </div>
                <div style="display:flex; gap:15px; margin-top:8px; font-size:0.75rem; color:#86868b">
                    <span><i class="fas fa-wind"></i> ${m.v} km/h</span>
                    <span><i class="fas fa-droplet"></i> ${m.h}% Hum.</span>
                </div>
            </div>`;
    });
}

function updateAlert(v) {
    document.documentElement.setAttribute('data-alert', v);
}

document.getElementById('theme-toggle').onclick = () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.querySelector('#theme-toggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
};

window.onload = renderDashboard;