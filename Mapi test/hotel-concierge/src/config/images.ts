/**
 * ═══════════════════════════════════════════════════
 *  HOTEL TOURING LIVIGNO — Image Registry
 * ═══════════════════════════════════════════════════
 *
 *  Tutte le immagini sono in /public/images/
 *  Per cambiare un'immagine basta sostituire il file
 *  con lo stesso nome nella cartella, oppure
 *  aggiornare il percorso qui sotto.
 *
 *  COME CAMBIARE UN'IMMAGINE:
 *  1. Rinomina la tua foto con il nome indicato
 *  2. Copiala in public/images/
 *  3. Oppure cambia il valore del percorso qui
 * ═══════════════════════════════════════════════════
 */

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const IMAGES = {

  // ── LOGO / ICONA ────────────────────────────────
  // Stella Alpina — usata come logo in Header e Footer
  stellaAlpina: `${base}/images/stella alpina.png`,

  // ── HERO ────────────────────────────────────────
  // Immagine principale della home (schermata intera)
  hero: `${base}/images/hero.jpg`,

  // ── PERSONALIZZA IL SOGGIORNO ───────────────────
  // Card "Vino in Camera"
  concierge: {
    wine:    `${base}/images/concierge-wine.jpg`,
    // Card "Massaggio / Spa"
    massage: `${base}/images/concierge-massage.jpg`,
    // Card "Torta Celebrativa"
    cake:    `${base}/images/concierge-cake.jpg`,
    // Card "Bouquet di Benvenuto"
    flowers: `${base}/images/concierge-flowers.jpg`,
  },

  // ── LIVIGNO — IMPIANTI SKI ──────────────────────
  // Immagini delle card degli impianti invernali
  lifts: {
    teola:     `${base}/images/livigno-teola.jpg`,
    mottolino: `${base}/images/livigno-mottolino.jpg`,
    carosello: `${base}/images/livigno-carosello.jpg`,
    federia:   `${base}/images/livigno-federia.jpg`,
  },

  // ── CITY PULSE ──────────────────────────────────
  // Sfondo della sezione eventi
  cityPulseBg: `${base}/images/citypulse-bg.jpg`,

  // ── PISCINA / WELLNESS ──────────────────────────
  // Foto extra della piscina/wellness (opzionali)
  pool: [
    `${base}/images/pool-02.jpg`,
    `${base}/images/pool-03.jpg`,
    `${base}/images/pool-04.jpg`,
    `${base}/images/pool-05.jpg`,
    `${base}/images/pool-06.jpg`,
  ],

};
