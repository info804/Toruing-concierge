'use client';

import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, QrCode } from 'lucide-react';

const QR_URL = 'https://touringlivigno.com/concierge';

export function QRCodeSection() {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;

    // Create a high-res version for printing
    const printCanvas = document.createElement('canvas');
    const size = 1200;
    const padding = 80;
    printCanvas.width = size;
    printCanvas.height = size + 160;
    const ctx = printCanvas.getContext('2d');
    if (!ctx) return;

    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, printCanvas.width, printCanvas.height);

    // Hotel name at top
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 56px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('Hotel Touring', size / 2, 72);

    ctx.font = '36px Georgia, serif';
    ctx.fillStyle = '#8B9EB7';
    ctx.fillText('Livigno', size / 2, 118);

    // QR code
    ctx.drawImage(canvas, padding, 140, size - padding * 2, size - padding * 2);

    // URL below
    ctx.fillStyle = '#9B9B9B';
    ctx.font = '32px Arial, sans-serif';
    ctx.fillText(QR_URL, size / 2, size + 100);

    ctx.fillStyle = '#4A4A4A';
    ctx.font = '28px Arial, sans-serif';
    ctx.fillText('Scansiona per il Concierge Digitale', size / 2, size + 148);

    const link = document.createElement('a');
    link.download = 'qr-hotel-touring-livigno.png';
    link.href = printCanvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section className="py-20 bg-[#F7F7F5]">
      <div className="max-w-4xl mx-auto px-4 text-center">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2C3E50]/10 text-[#2C3E50] text-xs font-semibold uppercase tracking-widest mb-4">
            <QrCode size={13} />
            Concierge Digitale
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C3E50]">
            Accedi dal tuo smartphone
          </h2>
          <p className="text-[#9B9B9B] text-base mt-3 max-w-md mx-auto">
            Scansiona il QR code con la fotocamera del telefono per accedere al concierge digitale dell'Hotel Touring.
          </p>
        </div>

        {/* QR Card */}
        <div className="inline-flex flex-col items-center gap-6 bg-white rounded-3xl shadow-lg p-8 sm:p-12">
          <div ref={canvasRef} className="p-3 rounded-2xl border-2 border-[#EBEBEB]">
            <QRCodeCanvas
              value={QR_URL}
              size={220}
              bgColor="#FFFFFF"
              fgColor="#2C3E50"
              level="H"
            />
          </div>

          <div className="text-center">
            <p className="text-xs text-[#9B9B9B] uppercase tracking-widest font-medium mb-1">
              Hotel Touring Livigno
            </p>
            <p className="text-sm text-[#4A4A4A] font-medium">{QR_URL}</p>
          </div>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2C3E50] hover:bg-[#1a252f] text-white text-sm font-semibold transition-colors shadow-md"
          >
            <Download size={15} />
            Scarica per la Stampa
          </button>
        </div>

        <p className="mt-6 text-xs text-[#9B9B9B]">
          Il file scaricato è in alta risoluzione (1200×1360 px) — ideale per stampare su cartoncini o brochure.
        </p>
      </div>
    </section>
  );
}
