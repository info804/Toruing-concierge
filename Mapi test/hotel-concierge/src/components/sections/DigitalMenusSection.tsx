'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GlassWater, UtensilsCrossed, Wine, Leaf, Flame, Wheat, Soup, Baby, Pizza, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tag?: string;
  tagColor?: string;
}

interface MenuSection {
  icon: React.ElementType;
  label: string;
  items: MenuItem[];
}

const BAR_MENU: Record<string, MenuSection> = {
  caffetteria: {
    icon: Flame,
    label: 'Caffetteria',
    items: [
      { name: 'Caffé espresso', desc: '', price: '€1,40' },
      { name: 'Caffé americano', desc: '', price: '€2,00' },
      { name: 'Caffé decaffeinato', desc: '', price: '€1,80' },
      { name: 'Caffé doppio', desc: '', price: '€2,80' },
      { name: 'Caffé corretto', desc: '', price: '€2,00' },
      { name: 'Orzo', desc: '', price: '€1,50 / 2,00' },
      { name: 'Ginseng', desc: '', price: '€1,60 / 2,50' },
      { name: 'Cappuccino', desc: 'Soia, decaffeinato o orzo €2,50', price: '€2,00' },
      { name: 'Latte macchiato', desc: '', price: '€2,00' },
      { name: 'Marocchino', desc: '', price: '€2,00' },
      { name: 'Tè, camomilla, tisana', desc: '', price: '€3,00' },
      { name: 'Caffé shakerato', desc: 'Alcolico a scelta €4,00', price: '€3,00' },
      { name: 'Bombardino', desc: 'Vov, latte, panna', price: '€4,00', tag: 'Alpino', tagColor: 'bg-amber-100 text-amber-700' },
      { name: 'Lumumba', desc: 'Cioccolata, rum, panna', price: '€5,00' },
      { name: 'Jagertee', desc: '', price: '€4,00' },
      { name: 'Punch al liquore', desc: '', price: '€3,50' },
      { name: 'Vin brulè', desc: 'Alcolico', price: '€4,00' },
      { name: 'Mela brulè', desc: 'Analcolico', price: '€4,00' },
      { name: 'Calimero', desc: 'Vov, latte, brandy, panna, whiskey, caffè', price: '€5,00' },
      { name: 'Irish coffee', desc: '', price: '€7,00' },
      { name: 'Cioccolata', desc: 'Fondente €4,00 | Bianca €4,00 | +Panna €0,50', price: '€3,50' },
    ],
  },
  cocktailsSpeciali: {
    icon: GlassWater,
    label: 'Cocktails Speciali',
    items: [
      { name: 'Livignasc', desc: 'Taneda, Braulio, vodka, sciroppo di zucchero fatto in casa, succo di limone, sprite', price: '€11,00', tag: 'Signature', tagColor: 'bg-rose-100 text-rose-700' },
      { name: 'Ice Bombardino', desc: 'Whiskey, latte, vov, panna', price: '€10,00' },
      { name: 'Sour a scelta', desc: 'Base alcolica a scelta, succo di limone, sciroppo zucchero, magic foamer', price: '€10,00' },
      { name: 'Cuban Mojito', desc: 'Rum Havana 3, succo di lime, zucchero, menta, soda', price: '€10,00' },
      { name: 'Sage Smach', desc: 'Vodka, sciroppo di zucchero, succo limone, salvia, soda', price: '€10,00' },
      { name: 'Tequila Sunrise', desc: 'Tequila, succo arancia, granatina', price: '€10,00' },
    ],
  },
  cocktailsClassici: {
    icon: GlassWater,
    label: 'Cocktails Classici',
    items: [
      { name: 'Hugo Spritz', desc: 'Prosecco, succo di lime, liquore al sambuco, soda, menta', price: '€7,50' },
      { name: 'Aperol Spritz', desc: 'Aperol, soda, prosecco', price: '€7,50' },
      { name: 'Negroni', desc: 'Vermouth rosso, gin, bitter Campari', price: '€8,50' },
      { name: 'Americano', desc: 'Vermouth rosso, bitter Campari, soda', price: '€8,50' },
      { name: 'Cuba Libre', desc: 'Rum bianco, succo di lime, cola', price: '€8,50' },
      { name: 'Long Island Ice Tea', desc: 'Vodka, tequila, gin, Cointreau, rum bianco, succo di limone, cola', price: '€8,50' },
      { name: 'Margarita', desc: 'Tequila, triple sec, succo di lime', price: '€8,50' },
      { name: 'Moscow Mule', desc: 'Vodka, ginger beer, succo di lime', price: '€8,50' },
      { name: 'Sex on the Beach', desc: 'Vodka, liquore alla pesca, succo di lime, sciroppo di mirtillo, succo arancia', price: '€8,50' },
      { name: 'Espresso Martini', desc: 'Caffè, vodka, Kahlúa, sciroppo di zucchero', price: '€8,50' },
      { name: 'Black Russian', desc: 'Vodka, Kahlúa, panna montata', price: '€8,50' },
    ],
  },
  analcolici: {
    icon: Leaf,
    label: 'Analcolici & Gin Tonic',
    items: [
      { name: 'Il Biondo', desc: 'Succo di limone, succo di pompelmo, succo arancia', price: '€7,00' },
      { name: 'Shake on the Peach', desc: 'Succo arancia, succo limone, sciroppo cranberry, tè alla pesca', price: '€7,00' },
      { name: 'Virgin Mojito', desc: 'Menta, lime, zucchero, soda', price: '€7,00' },
      { name: 'Tramonto', desc: 'Succo ananas, succo arancia, granatina', price: '€7,00' },
      { name: 'Gin Tonic — Gordon\'s London Dry', desc: 'Con Fever Tree Tonic', price: '€8,00' },
      { name: 'Gin Tonic — 1816 Livigno', desc: 'Con Fever Tree Tonic', price: '€12,00', tag: 'Locale', tagColor: 'bg-green-100 text-green-700' },
      { name: 'Gin Tonic — Hendrick\'s', desc: 'Con Fever Tree Tonic', price: '€12,00' },
      { name: 'Gin Tonic — Adamus', desc: 'Con Fever Tree Tonic', price: '€16,00' },
      { name: 'Gin Tonic — Malfy Rosa', desc: 'Con Fever Tree Tonic', price: '€13,50' },
    ],
  },
  bibite: {
    icon: GlassWater,
    label: 'Bibite & Birre',
    items: [
      { name: 'Acqua', desc: '25 / 50 / 75 cl', price: '€1 / 2 / 3' },
      { name: 'Bibite alla spina', desc: 'Coca-Cola, Fuze Tea, Fanta, Sprite — 30/40 cl', price: '€3,50' },
      { name: 'Bibite in vetro', desc: 'Coca-Cola, Zero, Fanta, Sprite', price: '€4,00' },
      { name: 'Bibite Lurisia', desc: 'Limonata, Chinotto, Aranciata amara', price: '€3,00 / 4,00' },
      { name: 'Succhi di frutta', desc: 'Ace, albicocca, ananas, arancia, mela, mirtillo, pera, pesca, pompelmo', price: '€3,50' },
      { name: 'Spremuta di arancia', desc: '', price: '€4,00' },
      { name: 'Birra alla spina Calanda', desc: '30 / 50 cl', price: '€3,50 / 6,00' },
      { name: 'Panache', desc: '30 / 50 cl', price: '€3,50 / 6,00' },
      { name: 'Corona / Heineken', desc: 'Bottiglia', price: '€4,00' },
      { name: 'Chimay', desc: 'Bottiglia', price: '€5,50' },
      { name: '1816 Livigno', desc: 'Pils, Weiss, Hells, IPA', price: '€7,00', tag: 'Locale', tagColor: 'bg-green-100 text-green-700' },
      { name: 'Paulaner Weizen', desc: 'Bottiglia', price: '€6,00' },
      { name: 'Moretti analcolica / Weiss analcolica Erdinger', desc: '', price: '€4,00 / 5,00' },
    ],
  },
  dolci: {
    icon: Wheat,
    label: 'Dolci & Snack',
    items: [
      { name: 'Crepes', desc: 'Nutella, albicocca, frutti di bosco, zucchero — Aggiunte: cocco, panna, gelato (+0,50), banana/macedonia (+2,00)', price: '€5,00' },
      { name: 'Strudel di mele e vaniglia', desc: '', price: '€7,00' },
      { name: 'Tiramisù', desc: '', price: '€6,00' },
      { name: 'Sacher', desc: '', price: '€7,00' },
      { name: 'Crostata', desc: '', price: '€6,00' },
      { name: 'Macedonia', desc: '', price: '€5,00' },
      { name: 'Coppa Danemark', desc: 'Gelato alla panna, topping cioccolato, panna', price: '€6,00' },
      { name: 'Coppa Arlecchino', desc: 'Gelato e topping alla frutta, macedonia, panna', price: '€7,00' },
      { name: 'Coppa Meringata', desc: 'Gelato alla panna, meringhe, topping cioccolato, panna montata', price: '€6,00' },
      { name: 'Coppa Fantasy', desc: 'Gelato alla frutta, panna, topping frutti di bosco', price: '€6,00' },
      { name: 'Affogato al caffè', desc: '', price: '€5,00' },
      { name: 'Affogato al Braulio', desc: '', price: '€6,00' },
      { name: 'Panino', desc: 'Livigno, Valtellina, Fiordilatte, Tirolese, Estate, Inverno, Primavera — chiedere disponibilità', price: '€7,00' },
      { name: 'Maxi Toast', desc: 'Prosciutto e formaggio', price: '€6,00' },
    ],
  },
  distillati: {
    icon: Wine,
    label: 'Distillati & Vini',
    items: [
      { name: 'Amari Locali', desc: 'Braulio €5 | Braulio Riserva €6 | TaNEDA €4 | Al Fedaria €6', price: 'da €4,00', tag: 'Locale', tagColor: 'bg-green-100 text-green-700' },
      { name: 'Amari', desc: 'Brancamenta, Fernet, Cynar, Ramazzotti, Averna, Montenegro, Jagermeister, Disaronno, Limoncello', price: 'da €4,00' },
      { name: 'Grappe', desc: 'Williams, Mirtillo, La Trentina, Anfora, Moscato, 18 Lune, Sforzato e altre', price: 'da €4,00' },
      { name: 'Rum', desc: 'Zacapa 23 anni €10 | Havana 7 €6 | Diplomatico Anejo €7', price: 'da €6,00' },
      { name: 'Vodka', desc: 'Smirnoff €4 | Belvedere €7 | Beluga €8', price: 'da €4,00' },
      { name: 'Whisky', desc: 'Jack Daniels €5 | Jameson €5 | Johnnie Walker €5 | Chivas €6 | The Balvenie €6 | Caol Ila 12 anni €8', price: 'da €5,00' },
      { name: 'Cognac', desc: 'Curvoisier €6 | Remy Martin VSOP €8', price: 'da €6,00' },
      { name: 'Vino a calice — Rosso', desc: 'Sassella €6 | Sforzato €12 | Valpolicella Ripasso €8 | Amarone €12', price: 'da €6,00' },
      { name: 'Vino a calice — Bianco', desc: 'Pinot Grigio €6 | Lugana €7 | Sauvignon €7 | Chardonnay €7', price: 'da €6,00' },
      { name: 'Vino a calice — Bollicine & Rosé', desc: 'Franciacorta €8 | Prosecco €6 | Lagrain Rosé €7', price: 'da €6,00' },
    ],
  },
};

const RESTAURANT_MENU: Record<string, MenuSection> = {
  antipasti: {
    icon: Leaf,
    label: 'Antipasti',
    items: [
      { name: 'Tagliere "TAST"', desc: 'Bresaola, speck, pancetta, salam da baita, slinzega, Casera e Scimudin con giardiniera fresca', price: '€17', tag: 'Signature', tagColor: 'bg-rose-100 text-rose-700' },
      { name: 'Bresaola punta d\'anca', desc: '100% italiano con rucola e scaglie di Bitto DOP', price: '€15', tag: 'Locale', tagColor: 'bg-green-100 text-green-700' },
      { name: 'Sciatt Valtellinesi', desc: 'Su letto d\'insalata e vinaigrette all\'aceto di mele (15 pezzi)', price: '€12', tag: 'Tipico', tagColor: 'bg-amber-100 text-amber-700' },
      { name: 'Battuta al coltello di manzo', desc: 'Condita, tuorlo e velette di mandorle tostate', price: '€16' },
      { name: 'Tagliere di formaggi locali', desc: 'Scimudin, Casera, Latteria gold e Caprino, accompagnati da composte', price: '€15' },
      { name: 'Tataki di capriolo', desc: 'Con funghi misti sott\'olio', price: '€22' },
      { name: 'Bruschetta all\'italiana', desc: '', price: '€12' },
      { name: 'Tartare di branzino alla mela verde', desc: '', price: '€22' },
    ],
  },
  zuppe: {
    icon: Soup,
    label: 'Zuppe',
    items: [
      { name: 'Minestra d\'orzo alla grigionese', desc: '', price: '€14' },
      { name: 'Crema di pomodoro con fiocco di panna', desc: '', price: '€10' },
      { name: 'Zuppa di cipolla in crosta di pasta sfoglia', desc: 'Con sesamo', price: '€14' },
      { name: 'Minestrone di verdure fresco', desc: '', price: '€10' },
      { name: 'Vellutata di zucca con granella di amaretti', desc: '', price: '€10' },
      { name: 'Zuppa di Gulash', desc: '', price: '€14' },
    ],
  },
  primi: {
    icon: UtensilsCrossed,
    label: 'Primi',
    items: [
      { name: 'Pasta al pomodoro / Bolognese / Pesto', desc: 'Tre classici disponibili ogni giorno', price: '€12' },
      { name: 'Pizzoccheri Valtellinesi fatti a mano', desc: 'Al profumo d\'erbe e Casera DOP', price: '€16', tag: 'Tipico', tagColor: 'bg-amber-100 text-amber-700' },
      { name: 'Raviolacci di porcini', desc: 'Con fonduta di bitto', price: '€16' },
      { name: 'Gnocchi di patate gamberi e zucchine', desc: '', price: '€16' },
      { name: 'Tagliatelle fatte in casa', desc: 'Con funghi porcini, bacon e pomodorini', price: '€15' },
      { name: 'Spaghetti alla carbonara', desc: 'Con pecorino romano e guanciale', price: '€14' },
      { name: 'Spatzle verdi allo speck croccante', desc: '', price: '€14' },
      { name: 'Lasagne della tradizione romagnola', desc: '', price: '€14' },
      { name: 'Risotto alle erbe aromatiche', desc: 'E sminuzzato di capriolo', price: '€20' },
      { name: 'Risotto alla milanese', desc: 'Con ossobuco di vitello', price: '€22', tag: 'Signature', tagColor: 'bg-rose-100 text-rose-700' },
    ],
  },
  secondi: {
    icon: Flame,
    label: 'Secondi',
    items: [
      { name: 'Costoletta d\'agnello alla scottadito', desc: 'Con patate al forno e verdure grigliate', price: '€28' },
      { name: 'Salmì di Cervo con polenta taragna', desc: '', price: '€22', tag: 'Tipico', tagColor: 'bg-amber-100 text-amber-700' },
      { name: 'Tzgoiner Valtellinese', desc: 'Spiedino di manzo alla griglia con patate saltate e verdure grigliate', price: '€22' },
      { name: 'Piatto del montanaro', desc: 'Gorgonzola, polenta taragna, uovo e speck croccante', price: '€16' },
      { name: 'Tagliata di manzo', desc: 'Con funghi porcini di selva', price: '€27' },
      { name: 'Filetto di manzo 220gr alla griglia', desc: 'Con patate saltate e verdure grigliate — oppure al pepe verde', price: '€30' },
      { name: 'Cotoletta alla milanese 400gr', desc: 'Con osso e patatine fritte', price: '€32' },
      { name: 'Trota spinata alle erbe di montagna', desc: 'Con patate al vapore', price: '€22' },
      { name: 'Grigliata mista di carne', desc: 'Con patatine fritte', price: '€29' },
    ],
  },
  insalate: {
    icon: Leaf,
    label: 'Insalate',
    items: [
      { name: 'Insalata verde', desc: '', price: '€6' },
      { name: 'Insalata mista', desc: 'Insalata, pomodori, cetrioli, carote e finocchi', price: '€7' },
      { name: 'Insalata cipolle e pomodoro', desc: '', price: '€6' },
      { name: 'Insalata Caprese', desc: 'Pomodoro e mozzarella di bufala e basilico', price: '€12' },
      { name: 'Insalata Caesar', desc: 'Insalata, olive taggiasche, pomodorini, petto di pollo, parmigiano, finocchi', price: '€12' },
      { name: 'Insalata Nizzarda', desc: 'Uovo, pomodorini, fagiolini, patate, tonno, olive taggiasche, acciughe', price: '€16' },
    ],
  },
  contorni: {
    icon: Wheat,
    label: 'Contorni',
    items: [
      { name: 'Polenta taragna', desc: '', price: '€6' },
      { name: 'Patatine fritte', desc: '', price: '€7' },
      { name: 'Patate al forno', desc: '', price: '€6' },
      { name: 'Verdure alla griglia', desc: '', price: '€6' },
      { name: 'Funghi porcini di selva trifolati', desc: '', price: '€12' },
    ],
  },
  piccoli: {
    icon: Baby,
    label: 'Per i Piccoli',
    items: [
      { name: 'Pasta al pomodoro / Bolognese / Pesto', desc: '', price: '€8' },
      { name: 'Passato di verdure', desc: '', price: '€8' },
      { name: 'Lasagne della tradizione romagnola', desc: '', price: '€10' },
      { name: 'Cotoletta di vitello alla milanese', desc: 'Con patatine fritte', price: '€12' },
      { name: 'Paillard di vitello con pomodorini', desc: '', price: '€12' },
      { name: 'Wurstel alla griglia con patatine fritte', desc: '', price: '€10' },
    ],
  },
};

const WINE_MENU: Record<string, MenuSection> = {
  bollicine: {
    icon: GlassWater,
    label: 'Bollicine & Champagne',
    items: [
      { name: '"VALDO VALDOBIADENE" IL FONDATORE DOCG', desc: 'Prosecco Superiore', price: '€28' },
      { name: '"PLOZZA" Brut – FRANCIACORTA DOCG', desc: 'Lombardia', price: '€38' },
      { name: '"PLOZZA" ROSÉ – FRANCIACORTA DOCG', desc: 'Lombardia', price: '€42' },
      { name: '"FERRARI MAXIMUM" BRUT – TRENTO DOC', desc: 'Trentino', price: '€40' },
      { name: '"MADONNA DELLE VITTORIE" – TRENTO DOC', desc: 'Trentino', price: '€35' },
      { name: '"BEAUMONT DES CRAYERES" – CHAMPAGNE GRAN ROSÉ BRUT', desc: 'Champagne AOC', price: '€68' },
      { name: '"BEAUMONT DES CRAYERES" – CHAMPAGNE GRANDE RESERVE BRUT', desc: 'Champagne AOC', price: '€63' },
      { name: 'VEUVE CLICQUOT – CHAMPAGNE AOC', desc: '', price: '€80' },
      { name: 'LAURENT-PERRIER – CHAMPAGNE AOC', desc: '', price: '€85' },
      { name: 'MOET & CHANDON – CHAMPAGNE AOC', desc: '', price: '€90' },
      { name: 'DOM PERIGNON BRUT – CHAMPAGNE AOC', desc: '', price: '€320', tag: 'Prestige', tagColor: 'bg-amber-100 text-amber-700' },
    ],
  },
  rosati: {
    icon: Wine,
    label: 'Vini Rosati',
    items: [
      { name: '"LAGRAIN ROSE" – Madonna delle Vittorie', desc: 'Uve Lagrein. Colore brillante, profumi di fragolina e lampone. Fresco ed equilibrato. · Lombardia', price: '€29' },
      { name: '"MONROSE" ALPI RETICHE IGT – Mamete Prevostini', desc: 'Da uve Nebbiolo. Rosato vivace, profumi di frutti rossi, sfumature minerali. Fine, sapido, armonioso. · Lombardia', price: '€26' },
      { name: '"CERASUM" ALPI RETICHE IGT – Cantine Nera', desc: 'Da uve Nebbiolo. Color cerasuolo, sentori di ciliegia, lampone e fragola. Morbido e fresco. · Lombardia', price: '€25' },
    ],
  },
  rossiLombardia: {
    icon: Wine,
    label: 'Vini Rossi · Lombardia',
    items: [
      { name: 'ROSSO DI VALTELLINA DOC "TOURING"', desc: 'Vino tipico da tutto pasto, fresco e leggermente fruttato.', price: '€14', tag: 'Casa', tagColor: 'bg-rose-100 text-rose-700' },
      { name: '"ALISIO" SASSELLA SUPERIORE DOCG – Cantina Nera', desc: 'Nebbiolo in purezza. Elegante e armonico, frutti rossi e mineralità. · 75cl / 375cl', price: '€26 / €14' },
      { name: '"TIRSO" GRUMELLO SUPERIORE DOCG – Cantina Nera', desc: 'Rosso rubino, profumi di frutti di bosco, confettura e note floreali. · 75cl / 375cl', price: '€26 / €15' },
      { name: '"SOREL" ALPI RETICHE IGT – Cantina Nera', desc: 'Nebbiolo pieno e rotondo. Frutta matura e spezie. Affinato 18 mesi in barrique.', price: '€41' },
      { name: '"AL CARMINE" INFERNO RISERVA DOCG – Cantina Nera', desc: 'Grande tipicità valtellinese. Profumo intenso, gusto asciutto e deciso.', price: '€41' },
      { name: '"PARADISO" RISERVA DOCG – Cantina Nera', desc: 'Elegante e strutturato. Frutti rossi, note speziate, finale morbido.', price: '€42' },
      { name: '"MESSERE" SFURZAT VALTELLINA DOCG – Cantina Nera', desc: 'Rosso granato, complesso. Frutti rossi maturi, spezie, cacao. Perfetto con cacciagione.', price: '€55', tag: 'Locale', tagColor: 'bg-green-100 text-green-700' },
      { name: '"MAZER" – VALTELLINA SUPERIORE DOCG – Nino Negri', desc: 'Parte delle uve leggermente appassita. Frutti rossi delicati, spezie dolci. Fine e armonico.', price: '€31' },
      { name: '"VIGNA SASSOROSSO" – GRUMELLO SUPERIORE DOCG – Nino Negri', desc: 'Rosso rubino brillante. More, ribes, ciliegie, lamponi. Fresco, dinamico e strutturato.', price: '€45' },
      { name: '"5 STELLE" – SFURZAT DI VALTELLINA DOCG – Nino Negri', desc: 'Appassimento 90 gg, 16 mesi in barrique. Icona assoluta della denominazione. Annata 2018 €110 · Annata 2020 €90.', price: '€90 / €110', tag: 'Icona', tagColor: 'bg-amber-100 text-amber-700' },
      { name: '"CORTE DI CAMA" SFURZAT VALTELLINA DOCG – Mamete Prevostini', desc: 'Da uve appassite. Profumi complessi di frutta matura, spezie alpine, note balsamiche. Corpo pieno.', price: '€61' },
      { name: '"LA CRUUS" INFERNO SUPERIORE DOCG – Mamete Prevostini', desc: 'Nebbiolo rubino brillante. Frutti rossi, spezie, nota minerale. Energico con tannini eleganti.', price: '€43' },
      { name: '"SOMMAROVINA" SASSELLA SUPERIORE DOCG – Mamete Prevostini', desc: 'Aromi di piccoli frutti rossi, agrumi, spezie leggere. Fine e teso, tipica mineralità della Sassella.', price: '€43' },
      { name: '"BOTONERO" T. RETICHE DI SONDRIO IGT – Mamete Prevostini', desc: 'Vino giovane e vivace. Ciliegia, lampone, violetta. Fresco, morbido e beverino. · 75cl / 375cl', price: '€27 / €16' },
      { name: '"RED EDITION" – SASSELLA SUPERIORE DOCG – Plozza', desc: 'Rosso granato, frutta rossa elegante. Ideale con piatti tipici. · 75cl / 375cl', price: '€30 / €16' },
      { name: '"BLACK EDITION" – SFURZAT DI VALTELLINA DOCG – Plozza', desc: 'Complesso, frutti rossi maturi, prugna, confettura, pepe verde. · 75cl / 375cl', price: '€44 / €23' },
      { name: '"PASSIONE" – ALPI RETICHE IGT 2015 – Plozza', desc: 'Nebbiolo appassite, lungo affinamento in legno. Rosso intenso con frutti maturi e sentori tostati.', price: '€64' },
      { name: '"NUMERO UNO" – ALPI RETICHE IGT – Plozza', desc: 'Nebbiolo appassite, due anni in barriques nuove. Rosso avvolgente, frutti sotto spirito, spezie dolci.', price: '€70' },
      { name: '"CINQUANTA 50" – ALPI RETICHE 2014 – Plozza', desc: 'Profilo olfattivo articolato con piccoli frutti rossi e ciliegie.', price: '€52' },
      { name: '"VIGNA CÀ GUICCIARDI" – INFERNO SUPERIORE DOCG – Plozza', desc: 'Rosso rubino intenso, frutti rossi, viola appassita, spezie. Gusto deciso e vigoroso.', price: '€45' },
      { name: '"CASTEL CHIURO" VALTELLINA SUPERIORE DOCG RISERVA 2013 – Plozza', desc: 'Grande struttura. Frutta sotto spirito, tabacco, legno pregiato. Tannini setosi, finale lunghissimo.', price: '€85', tag: 'Riserva', tagColor: 'bg-amber-100 text-amber-700' },
      { name: '"LE TENSE" – SASSELLA SUPERIORE DOCG – Plozza', desc: 'Rosso rubino, aromi di frutti rossi in confettura, fiori appassiti, spezie leggere. Elegante e persistente.', price: '€31' },
      { name: '"SASSI SOLIVI" – SASSELLA SUPERIORE RISERVA DOCG', desc: 'Frutti di bosco, note minerali, spezie. Elegante e persistente.', price: '€40' },
      { name: '"SASSI SOLIVI" – SASSELLA SUPERIORE RISERVA DOCG', desc: 'Rosso rubino, sentori di rose e lamponi. Fresco, sapido e armonico.', price: '€30' },
      { name: '"I CIAZ" – SASSELLA SUPERIORE DOCG – Sassi Solivi', desc: 'Solo nelle annate migliori. 20 mesi in botti di rovere. Lampone, spezie, balsamico.', price: '€35' },
    ],
  },
  rossiItalia: {
    icon: Wine,
    label: 'Vini Rossi · Resto d\'Italia',
    items: [
      { name: '"TEROLDEGO" – Madonna delle Vittorie', desc: 'Colore intenso, frutti rossi maturi, lievi note speziate. Morbido, fresco e armonioso. · Trentino', price: '€29' },
      { name: '"LAGRAIN" – Madonna delle Vittorie', desc: 'Ciliegia, mora, sfumature di cacao. Pieno, vellutato, tannini morbidi. · Trentino', price: '€32' },
      { name: '"BAROLO" DOCG – Cantina Cabianca', desc: 'Elegante e complesso. Rosa, spezie, frutta rossa matura. Strutturato con finale lungo. · Piemonte', price: '€55', tag: 'Premium', tagColor: 'bg-rose-100 text-rose-700' },
      { name: '"LANGHE NEBBIOLO" DOC – Cantina Cabianca', desc: 'Ciliegia, violetta, spezie leggere. Equilibrato, tannini morbidi. · Piemonte', price: '€25' },
      { name: '"BARBERA D\'ASTI" DOCG – Cantina Cabianca', desc: 'Frutti rossi, note speziate. Vivace, armonioso, bella acidità. · Piemonte', price: '€24' },
      { name: '"DOLCETTO D\'ACQUI" DOG – Cantina Cabianca', desc: 'Prugna, ciliegia, sentori floreali. Morbido, asciutto, piacevolmente fruttato. · Piemonte', price: '€24' },
      { name: '"SRU" ROERO DOCG – Cantina Manchiera Carbone', desc: 'Frutti rossi, rosa, sfumature speziate. Elegante, fresco, tannini delicati. · Piemonte', price: '€38' },
      { name: '"PRINTI" ROERO RISERVA DOCG – Cantina Manchiera Carbone', desc: 'Ciliegia matura, spezie, cenni balsamici. Pieno, armonioso, persistente. · Piemonte', price: '€58' },
      { name: '"PELISA" BARBERA D\'ALBA DOC – Cantina Manchiera Carbone', desc: 'Amarena, prugna, note speziate. Vivace, morbido, piacevole acidità. · Piemonte', price: '€26' },
      { name: '"BRUNELLO DI MONTALCINO" DOCG – Az. Ventolaio', desc: 'Ciliegia matura, spezie, note balsamiche. Strutturato, tannini fini, finale lungo. · Toscana', price: '€58', tag: 'Premium', tagColor: 'bg-rose-100 text-rose-700' },
      { name: '"RUSPOLI" CHIANTI CLASSICO DOC – Cantina di Lilliano', desc: 'Ciliegia, piccoli frutti rossi, spezie leggere. Equilibrato e persistente. · Toscana', price: '€28' },
      { name: '"RUSPOLI" CHIANTI CLASSICO RISERVA DOCG', desc: 'Frutta matura, spezie, accenti balsamici. Pieno, armonico, tannini setosi. · Toscana', price: '€41' },
      { name: '"RUSPOLI" CHIANTI CLASSICO GRAN SELEZIONE DOCG', desc: 'Amarena, mora, spezie dolci, cenni tostati. Elegante e potente. · Toscana', price: '€48' },
      { name: '"ROSSO DI MONTEPULCIANO" DOC – Cantina Val di Piatta', desc: 'Giovane e vivace. Ciliegia, frutti rossi, note speziate. Fresco e beverino. · Toscana', price: '€26' },
      { name: '"VINO NOBILE DI MONTEPULCIANO" DOCG – Cantina Val di Piatta', desc: 'Frutti rossi maturi, violetta, spezie dolci. Pieno, armonico, persistente. · Toscana', price: '€40' },
      { name: '"WHEART" PUGLIA IGT – Cantina Barsento', desc: 'Carattere moderno e mediterraneo. Frutti rossi, spezie leggere, nota erbacea. · Puglia', price: '€26' },
      { name: 'CANNONAU DI SARDEGNA DOC – Cantina Audarya', desc: 'Caldo e mediterraneo. Frutti rossi maturi, mirto, note speziate. Morbido e avvolgente. · Sardegna', price: '€26' },
      { name: 'VALPOLICELLA CLASSICO DOC – Cantina S. Sofia', desc: 'Fresco e fragrante. Ciliegia, piccoli frutti rossi, note floreali. Agile e beverino. · Veneto', price: '€27' },
      { name: 'VALPOLICELLA RIPASSO SUPERIORE DOC – Cantina S. Sofia', desc: 'Frutta matura, spezie, lieve nota di cacao. Morbido, caldo, ottima struttura. · Veneto', price: '€31' },
      { name: 'AMARONE DELLA VALPOLICELLA CLASSICO DOCG – Cantina S. Sofia', desc: 'Amarena, prugna secca, spezie, cioccolato. Pieno, elegante e vellutato. · Veneto', price: '€58', tag: 'Premium', tagColor: 'bg-rose-100 text-rose-700' },
      { name: '"CARLO SANTI" AMARONE DELLA VALPOLICELLA – Cantina Santi', desc: 'Amarena, prugna secca, spezie, cacao. Ricco, caldo e avvolgente. · Veneto', price: '€70' },
      { name: '"SANTICO" AMARONE DELLA VALPOLICELLA – Cantina Santi', desc: 'Frutta rossa matura, vaniglia, spezie dolci. Pieno, morbido, tannini setosi. · Veneto', price: '€56' },
      { name: '"SOLANE" VALPOLICELLA RIPASSO SUPERIORE DOCG – Cantina Santi', desc: 'Ciliegia, prugna, sentori tostati. Corposo ma armonioso, buona struttura. · Veneto', price: '€29' },
      { name: '"LE CALESELLE" VALPOLICELLA CLASSICO DOC – Cantina Santi', desc: 'Ciliegia, piccoli frutti rossi, note floreali. Equilibrato, leggero, molto piacevole. · Veneto', price: '€26' },
      { name: '"MERLOT COLLIO" DOC – Cantina Forminitini', desc: 'Frutti rossi maturi, prugna, note erbacee. Armonioso, rotondo, ben equilibrato. · Friuli V.G.', price: '€26' },
    ],
  },
  bianchi: {
    icon: Leaf,
    label: 'Vini Bianchi',
    items: [
      { name: '"LA NOVELLA" TERRAZZE RETICHE DI SONDRIO IGT – Cantina Nera', desc: 'Frutti rossi, fiori di montagna, sfumatura minerale. Armonico e delicatamente aromatico. · 75cl / 375cl · Lombardia', price: '€22 / €13' },
      { name: '"WHITE EDITION" TERRAZZE RETICHE DI SONDRIO IGT – Plozza', desc: 'Frutta a polpa bianca, agrumi, nota minerale. Elegante, equilibrato e vibrante. · Lombardia', price: '€26' },
      { name: '"OPERA" ALPI RETICHE IGT – Mamete Prevostini', desc: 'Pera, mela verde, agrumi, fine nota minerale. Fresco, armonico, delicatamente sapido. · Lombardia', price: '€38' },
      { name: '"ALPI RETICHE" IGT – Nino Negri', desc: 'Frutta bianca, fiori alpini, accenti agrumati. Equilibrato, vivace e minerale. · Lombardia', price: '€28' },
      { name: '"WHIGEL" LUGANA DOC – Tenuta Roveglia', desc: 'Pesca bianca, mandorla fresca, agrumi. Morbido, minerale, di grande finezza. · Lombardia', price: '€27' },
      { name: '"GAVI" DOCG – Cantina Cabianca', desc: 'Agrumi, fiori bianchi, sottile nota minerale. Armonico, delicato, sapido. · Piemonte', price: '€28' },
      { name: '"ROERO ARNEIS" DOCG – Cantina Cabianca', desc: 'Pera, mela, fiori bianchi, accenno di erbe. Fresco, equilibrato, morbido. · Piemonte', price: '€26' },
      { name: 'VERMENTINO DI SARDEGNA DOC – Cantina Audarya', desc: 'Agrumi, fiori bianchi, delicata nota salina. Armonico, fragrante e sapido. · Sardegna', price: '€25' },
      { name: '"MÜLLER THURGAU" IGP – Kellerei Aichholz', desc: 'Fiori bianchi, agrumi, erbe alpine. Leggero, vivace e minerale. · Trentino A.A.', price: '€29' },
      { name: '"SAUVIGNON" IGP – Kellerei Aichholz', desc: 'Foglia di pomodoro, pesca bianca, erbe aromatiche. Fresco, equilibrato, chiusura vibrante. · Trentino A.A.', price: '€29' },
      { name: '"TERA ALTA" VALDADIGE PINOT GRIGIO – Cantina Roeno', desc: 'Pera, mela verde, note floreali. Equilibrato, morbido, piacevolmente minerale. · Trentino A.A.', price: '€25' },
      { name: '"PRAECIPUUS" DELLE VENEZIE IGT – Cantina Roeno', desc: 'Agrumi, pesca bianca, fiori delicati. Fresco, armonico, sapido, chiusura raffinata. · Trentino A.A.', price: '€32' },
      { name: '"KIES" TRENTINO DOC GEWÜRZTRAMINER – Cantina Roeno', desc: 'Litchi, rosa, spezie dolci tipiche del vitigno. Avvolgente, aromatico, persistente. · 75cl / 375cl · Trentino A.A.', price: '€27 / €16' },
      { name: 'RIBOLLA GIALLA COLLIO DOC – Cantina Formentini', desc: 'Agrumi, fiori bianchi, nota minerale. Leggero, elegante, delicatamente sapido. · Friuli V.G.', price: '€26' },
      { name: 'SAUVIGNON COLLIO DOC – Cantina Formentini', desc: 'Foglia di pomodoro, agrumi, erbe aromatiche. Fresco, equilibrato, fragrante. · Friuli V.G.', price: '€26' },
      { name: 'CHARDONNAY COLLIO DOC – Cantina Formentini', desc: 'Frutta a polpa bianca, vaniglia delicata, tocco minerale. Rotondo, equilibrato, fine. · Friuli V.G.', price: '€26' },
      { name: '"LUGANA" DOC – Cantina S. Sofia', desc: 'Agrumi, pesca bianca, note floreali. Morbido, equilibrato, delicatamente minerale. · Veneto', price: '€26' },
      { name: '"LE CALDERARE" GARDA DOC PINOT GRIGIO – Cantina S. Sofia', desc: 'Pera, mela, fiori bianchi. Fresco, leggero, scorrevole. · 75cl / 375cl · Veneto', price: '€24 / €14' },
    ],
  },
};

const PIZZA_MENU: Record<string, MenuSection> = {
  classiche: {
    icon: Pizza,
    label: 'Classiche',
    items: [
      { name: 'Marinara', desc: 'Pomodoro, aglio, origano', price: '€7' },
      { name: 'Margherita', desc: 'Pomodoro e mozzarella', price: '€8' },
      { name: 'Ai Funghi', desc: 'Pomodoro, mozzarella e funghi', price: '€10' },
      { name: 'Prosciutto e Funghi', desc: 'Pomodoro, mozzarella, prosciutto e funghi', price: '€11' },
      { name: 'Prosciutto', desc: 'Pomodoro, mozzarella e prosciutto', price: '€10' },
      { name: 'Diavola', desc: 'Pomodoro, mozzarella e salame piccante', price: '€10' },
      { name: '4 Formaggi', desc: 'Mozzarella, gorgonzola, parmigiano ed Emmental', price: '€10.50' },
      { name: '4 Stagioni', desc: 'Pomodoro, mozzarella, prosciutto, funghi, olive, carciofi', price: '€11' },
      { name: 'Capricciosa', desc: 'Pomodoro, mozzarella, prosciutto, funghi, olive, carciofi e capperi', price: '€11' },
    ],
  },
  speciali: {
    icon: Pizza,
    label: 'Speciali',
    items: [
      { name: 'Touring', desc: 'Pomodoro, mozzarella, porcini, bresaola, grana, rucola', price: '€13' },
      { name: 'Burratina', desc: 'Pomodoro, mozzarella, burrata e crudo', price: '€14' },
      { name: 'Trentina', desc: 'Pomodoro, mozzarella, gorgonzola, speck e noci', price: '€12' },
      { name: 'Europa', desc: 'Pomodoro, mozzarella, porcini, gorgonzola, rucola e grana', price: '€13' },
      { name: 'Parma', desc: 'Pomodoro, mozzarella, prosciutto crudo e grana in uscita', price: '€12' },
      { name: 'Vulcano', desc: 'Pomodoro, mozzarella, salsiccia, cipolla e peperoncino', price: '€12' },
      { name: 'Gustosa', desc: 'Pomodoro, mozzarella, crema ai 4 formaggi, finferli', price: '€13' },
      { name: 'Boscaiola', desc: 'Pomodoro, mozzarella, salsiccia, finferli', price: '€13' },
      { name: 'Zola e Mele', desc: 'Mozzarella, gorgonzola e mele', price: '€11' },
    ],
  },
  cittadine: {
    icon: Pizza,
    label: 'Cittadine & Dell\'Orto',
    items: [
      { name: 'Napoletana', desc: 'Pomodoro, mozzarella, acciughe e origano', price: '€10' },
      { name: 'Siciliana', desc: 'Mozzarella, olive, tonno e pomodorini in uscita', price: '€11' },
      { name: 'Vegetariana', desc: 'Pomodoro, mozzarella, peperoni, melanzana, zucchine', price: '€11' },
      { name: 'Primavera', desc: 'Pomodoro, mozzarella, rucola, pomodorini e grana', price: '€10' },
      { name: 'Italia', desc: 'Pomodoro, mozzarella di bufala, pomodorini e basilico', price: '€13' },
      { name: 'California', desc: 'Pomodoro, mozzarella, wurstel e patatine fritte', price: '€11' },
    ],
  },
  calzone: {
    icon: Pizza,
    label: 'Calzone & Fornarine',
    items: [
      { name: 'Calzone Liscio', desc: 'Pomodoro, mozzarella e prosciutto', price: '€10' },
      { name: 'Calzone Farcito', desc: 'Pomodoro, mozzarella, prosciutto, funghi e carciofini', price: '€11' },
      { name: 'Fornarina Classica', desc: '', price: '€6' },
      { name: 'Fornarina Emiliana', desc: 'Prosciutto crudo in uscita', price: '€8.50' },
      { name: 'Fornarina Light', desc: 'Pomodorini e rucola in uscita', price: '€8.50' },
    ],
  },
};

type TabKey = 'bar' | 'restaurant' | 'pizza' | 'wineList';

const TABS: { key: TabKey; icon: React.ElementType; label: string }[] = [
  { key: 'restaurant', icon: UtensilsCrossed, label: 'Ristorante' },
  { key: 'pizza', icon: Pizza, label: 'Pizzeria' },
  { key: 'bar', icon: GlassWater, label: 'Bar' },
  { key: 'wineList', icon: Wine, label: 'Vini' },
];

const MENU_DATA: Record<TabKey, Record<string, MenuSection>> = {
  restaurant: RESTAURANT_MENU,
  pizza: PIZZA_MENU,
  bar: BAR_MENU,
  wineList: WINE_MENU,
};

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-alpine-cream/60 last:border-0 group">
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-alpine-charcoal text-sm group-hover:text-alpine-wood transition-colors">
            {item.name}
          </span>
          {item.tag && (
            <span className={cn('tag text-[10px]', item.tagColor)}>{item.tag}</span>
          )}
        </div>
        <p className="text-xs text-alpine-slate mt-0.5 leading-relaxed">{item.desc}</p>
      </div>
      <span className="text-alpine-wood font-semibold text-sm whitespace-nowrap flex-shrink-0">
        {item.price}
      </span>
    </div>
  );
}

export function DigitalMenusSection() {
  const t = useTranslations('menus');
  const [activeTab, setActiveTab] = useState<TabKey>('restaurant');
  const [activeSubTab, setActiveSubTab] = useState<string>('antipasti');

  const currentMenu = MENU_DATA[activeTab];
  const subTabs = Object.keys(currentMenu);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setActiveSubTab(Object.keys(MENU_DATA[tab])[0]);
  };

  return (
    <SectionWrapper id="menus" className="bg-alpine-cream/40">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} center />

      {/* CTA bottone menù completo */}
      <div className="flex justify-center mb-8">
        <a
          href="https://www.touringlivigno.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-7 py-4 bg-alpine-wood text-white rounded-2xl font-semibold text-base shadow-lg hover:bg-alpine-wood-dark transition-all hover:shadow-alpine-wood/30 hover:-translate-y-0.5"
        >
          <UtensilsCrossed size={20} />
          <span>{t('browseMenuCta')}</span>
          <ExternalLink size={15} className="opacity-70 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>

      {/* Main Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-alpine-cream gap-1">
          {TABS.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={cn(
                'relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                activeTab === key
                  ? 'text-white'
                  : 'text-alpine-slate hover:text-alpine-charcoal'
              )}
            >
              {activeTab === key && (
                <motion.div
                  layoutId="menu-tab-bg"
                  className="absolute inset-0 bg-alpine-wood rounded-xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <Icon size={16} />
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
        {subTabs.map((sub) => {
          const section = currentMenu[sub];
          const Icon = section.icon;
          return (
            <button
              key={sub}
              onClick={() => setActiveSubTab(sub)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0',
                activeSubTab === sub
                  ? 'bg-alpine-wood/10 text-alpine-wood border border-alpine-wood/20'
                  : 'bg-white text-alpine-slate hover:text-alpine-charcoal border border-alpine-cream hover:border-alpine-cream/80'
              )}
            >
              <Icon size={14} />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Menu Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${activeSubTab}`}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl border border-alpine-cream/60 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-alpine-cream/60 flex items-center gap-2">
            {(() => {
              const section = currentMenu[activeSubTab];
              if (!section) return null;
              const Icon = section.icon;
              return (
                <>
                  <Icon size={18} className="text-alpine-wood" />
                  <h3 className="font-serif text-lg text-alpine-charcoal">{section.label}</h3>
                </>
              );
            })()}
          </div>
          <div className="px-6 divide-y-0">
            {currentMenu[activeSubTab]?.items.map((item, i) => (
              <MenuItemRow key={i} item={item} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
