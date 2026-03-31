'use client';

import { MapPin, Phone, Mail } from 'lucide-react';
import { IMAGES } from '@/config/images';

export function Footer() {
  return (
    <footer className="bg-alpine-charcoal text-white/80">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-alpine-wood flex items-center justify-center">
                <img src={IMAGES.stellaAlpina} alt="Stella Alpina" className="w-7 h-7 object-contain drop-shadow-sm" />
              </div>
              <div>
                <p className="font-serif text-lg text-white">Hotel Touring</p>
                <p className="text-xs text-white/50">Livigno, Italy</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Siamo qui da generazioni, in mezzo alle Alpi. Vi aspettiamo per farvi sentire a casa, con calore e semplicità.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-white mb-4 text-lg">Contacts</h4>
            <div className="space-y-3 text-sm">
              <a href="https://maps.google.com/?q=Via+Plan+117+Livigno+SO" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <MapPin size={15} className="text-alpine-wood-light flex-shrink-0" />
                <span>Via Plan, 117 — Livigno (SO)</span>
              </a>
              <a href="tel:+390342996131" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone size={15} className="text-alpine-wood-light flex-shrink-0" />
                <span>+39 0342 996131</span>
              </a>
              <a href="mailto:info@touringlivigno.com" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail size={15} className="text-alpine-wood-light flex-shrink-0" />
                <span>info@touringlivigno.com</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-white mb-4 text-lg">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/hotel.touring.livigno"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-alpine-wood transition-colors flex items-center justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/touring.livigno"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-alpine-wood transition-colors flex items-center justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
            <p className="text-xs text-white/60 mt-3">@hotel.touring.livigno</p>
            <p className="text-xs text-white/40 mt-4">
              © {new Date().getFullYear()} Hotel Touring. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
