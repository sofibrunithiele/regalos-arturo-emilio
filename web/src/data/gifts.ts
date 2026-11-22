export type BudgetLevel = 'accesible' | 'medio' | 'mayor'

export type Gift = {
  id: string
  name: string
  link: string
  quantity: number
  budget: BudgetLevel
  unlimited?: boolean
  notes?: string
  image?: string | null
  store?: string
}

export const budgetLabels: Record<BudgetLevel, string> = {
  accesible: 'Accesible',
  medio: 'Medio',
  mayor: 'Mayor',
}

function storeFromLink(link: string): string {
  try {
    const host = new URL(link).hostname.replace(/^www\./, '')
    if (host.includes('mercadolibre')) return 'Mercado Libre'
    if (host.includes('falabella')) return 'Falabella'
    if (host.includes('lider')) return 'Lider'
    if (host.includes('ikea')) return 'IKEA'
    if (host.includes('shein')) return 'SHEIN'
    if (host.includes('infanti')) return 'Infanti'
    if (host.includes('bebesit')) return 'Bebesit'
    if (host.includes('pichintun')) return 'Pichintún'
    if (host.includes('opaline')) return 'Opaline'
    if (host.includes('drbrowns')) return "Dr. Brown's"
    if (host.includes('rootstoys')) return 'Roots Toys'
    if (host.includes('estilodebebe')) return 'Estilo de Bebé'
    if (host.includes('malee')) return 'Maleé'
    if (host.includes('novasalud')) return 'Nova Salud'
    return host.split('.')[0] ?? 'Tienda'
  } catch {
    return 'Tienda'
  }
}

const raw: Omit<Gift, 'store'>[] = [
  {
    id: 'g01',
    name: 'Calentador de mamaderas',
    link: 'https://www.mercadolibre.cl/calentador-de-mamaderas-portatil-balia/p/MLC45616181',
    quantity: 1,
    budget: 'medio',
    image: '/gifts/g01-calentador.png',
  },
  {
    id: 'g02',
    name: 'Contenedor de pañales',
    link: 'https://infanti.cl/products/contenedor-de-panales-para-control-de-olores-bebe-confort',
    quantity: 1,
    budget: 'medio',
    image: 'https://infanti.cl/cdn/shop/files/01471120930_6.jpg?v=1747144213',
  },
  {
    id: 'g03',
    name: 'Cojín de lactancia',
    link: 'https://www.pichintun.com/products/cojin-de-lactancia-grey-ergobaby',
    quantity: 1,
    budget: 'mayor',
    image:
      'https://www.pichintun.com/cdn/shop/files/ergobaby-cojin-de-lactancia-cojin-de-lactancia-grey-ergobaby-npagrystp-1246807444.jpg?v=1782938169',
  },
  {
    id: 'g05',
    name: 'Máquina de ruido blanco',
    link: 'https://www.lider.cl/ip/seguridad/momcozy-maquina-de-ruido-blanco-para-bebes-20-sonidos-relajantes-y-luz-tactil-portatil/00072950355497',
    quantity: 1,
    budget: 'medio',
    image: '/gifts/g05-ruido-blanco.png',
  },
  {
    id: 'g06',
    name: 'Carrito mudador',
    link: 'https://www.ikea.com/cl/es/p/raskog-norrava-carrito-con-tapa-menta-grisaceo-s69580761/',
    quantity: 1,
    budget: 'medio',
    image: '/gifts/g06-carrito-mudador.png',
  },
  {
    id: 'g07',
    name: 'Mudador de silicona',
    link: 'https://rootstoys.cl/products/mudador-eva-gris-impermeable-bebe',
    quantity: 1,
    budget: 'medio',
    image:
      'https://rootstoys.cl/cdn/shop/files/mudador_5518d922-1d34-4a81-a2b4-3d234c5139d0.jpg?v=1779587074',
  },
  {
    id: 'g08',
    name: 'Alfombra mat',
    link: 'https://www.mercadolibre.cl/alfombra-antigolpes-nino-bebe--bolso-150x200x2cm-premium/up/MLCU3251633202',
    quantity: 1,
    budget: 'medio',
    image: '/gifts/g08-alfombra.png',
  },
  {
    id: 'g10',
    name: 'Monitor',
    link: 'https://www.falabella.com/falabella-cl/product/17194254/Monitor-Digital-Portatil-A240C-Bebesit/17194254',
    quantity: 1,
    budget: 'mayor',
    image: '/gifts/g10-monitor.png',
  },
  {
    id: 'g12',
    name: 'Saco de dormir',
    link: 'https://www.opaline.cl/set-3-sacos-de-dormir-beige-bebe-unisex/p',
    quantity: 1,
    budget: 'medio',
    image:
      'https://opalinecl.vtexassets.com/arquivos/ids/394090/p-stgau966s27-1.jpg?v=639207669403230000',
  },
  {
    id: 'g13',
    name: 'Mudador portátil',
    link: 'https://cl.shein.com/Cozy-Pixies-New-Plaid-Portable-Waterproof-Baby-Changing-Pad-Outdoor-Multi-Functional-Diaper-Changing-Mat-Foldable-Mommy-Bag-Accessory-p-51509214.html',
    quantity: 1,
    budget: 'accesible',
    image: '/gifts/g13-mudador-portatil.png',
  },
  {
    id: 'g14',
    name: 'Mochila / bolso maternal',
    link: 'https://estilodebebe.cl/bolso-maternal-2-en-1-mochila-y-bandolera-eva-negro-verde/',
    quantity: 1,
    budget: 'medio',
    image: '/gifts/g14-mochila-maternal.png',
  },
  {
    id: 'g15',
    name: 'Bolso maternal',
    link: 'https://cl.shein.com/2pcs-Set-Handheld-Mommy-Bag-Lightweight-Large-Capacity-Shoulder-Bag-Fashionable-Casual-Multi-Function-Maternity-Bag-p-304373188.html',
    quantity: 1,
    budget: 'accesible',
    image: '/gifts/g15-bolso-maternal.png',
  },
  {
    id: 'g16',
    name: 'Lima eléctrica',
    link: 'https://cl.shein.com/Electric-Nail-Sharpener-Baby-Nail-Polisher-Hand-Held-Home-Nail-Driller-Nail-Sander-Fully-Automatic-Mini-Nail-Sharpener-Portable-Manicure-Tool-Nail-File-Halloween-Christmas-Gift-p-49171459.html',
    quantity: 1,
    budget: 'accesible',
    image: '/gifts/g16-lima.png',
  },
  {
    id: 'g17',
    name: 'Luz nocturna',
    link: 'https://cl.shein.com/1pc-Mini-Baby-Night-Light-Portable-LED-Touch-Night-Light-With-Timer-Remote-Control-RGB-16-Color-Lighting-Suitable-For-Kids-Adults-Breastfeeding-Sleep-Aid-USB-Rechargeable-Nursing-Light-Dimmable-Warm-Nightlight-Soft-Eye-Carebaby-Shower-Family-Decorations-Gifts-p-43890874.html',
    quantity: 1,
    budget: 'accesible',
    image: '/gifts/g17-luz-nocturna.png',
  },
  {
    id: 'g19',
    name: 'Mamaderas',
    link: 'https://drbrowns.cl/producto/mamaderas/mamaderas-boca-ancha/set-recien-nacido-boca-ancha-options-dr-browns/',
    quantity: 1,
    budget: 'medio',
    image: 'https://drbrowns.cl/wp-content/uploads/2021/04/WB09600_1-1.jpg',
  },
  {
    id: 'g20',
    name: 'Toalla con capucha',
    link: 'https://www.mercadolibre.cl/toalla-bebe-pellitos-100-bambu-90x90-cm-blanco-con-capucha/p/MLC46273438',
    quantity: 2,
    budget: 'accesible',
    image: '/gifts/g20-toalla.png',
  },
  {
    id: 'g21',
    name: 'Limpiador nasal',
    link: 'https://infanti.cl/products/aspirador-electrico-2-en-1-bebe-confort',
    quantity: 1,
    budget: 'medio',
    image: 'https://infanti.cl/cdn/shop/files/014711NS13A.jpg?v=1781222238',
  },
  {
    id: 'g23',
    name: 'Frascos almacenamiento leche materna',
    link: 'https://www.falabella.com/falabella-cl/product/80727657/almacenamiento-leche-set-x4-momcozy/80727657',
    quantity: 1,
    budget: 'accesible',
    image: 'https://media.falabella.com/falabellaCL/80727657_1/public',
  },
  {
    id: 'g24',
    name: 'Adaptadores de extractor',
    link: 'https://www.mercadolibre.cl/inserto-de-brida-1315171921mm-y-2-valvula-de-pico-pato/p/MLC2082973555',
    quantity: 1,
    budget: 'accesible',
    image: '/gifts/g24-adaptadores.png',
  },
  {
    id: 'g25',
    name: 'Mochila de porteo',
    link: 'https://www.malee.cl/producto/evolutiva-algodon-poliester-gris-perla-conejitos-copia-25',
    quantity: 1,
    budget: 'mayor',
    image: 'https://www.malee.cl/uploads/1795103552194-3e5be9751146.webp',
  },
  {
    id: 'g26',
    name: 'Wipes aptos para recién nacido',
    link: 'https://bebesit.cl/products/pack-12-toallitas-humedas-bewater-60-unidades-c-u-720-un',
    quantity: 1,
    budget: 'accesible',
    unlimited: true,
    notes: 'Las que quieran',
    image:
      'https://bebesit.cl/cdn/shop/files/caja-bw-1-8ae603c4-8517-4646-bfbe-ad2478216a7b_1200x1200.png?v=1789408507',
  },
  {
    id: 'g27',
    name: 'Gel de baño',
    link: 'https://www.mercadolibre.cl/mustela-gel-de-bano-500-ml-botella/p/MLC20666207',
    quantity: 1,
    budget: 'accesible',
    image: '/gifts/g27-gel-bano.png',
  },
  {
    id: 'g28',
    name: 'Paños de muselina',
    link: 'https://cl.shein.com/7pcs-Soft-Comfortable-100-Cotton-Baby-Bibs-Solid-Color-Floral-Cartoon-Animal-Printed-Baby-Cotton-Gauze-Burp-Cloths-Feeding-Handkerchiefs-Essential-For-Newborns-p-430839199.html',
    quantity: 1,
    budget: 'accesible',
    image: '/gifts/g28-panos-muselina.png',
  },
  {
    id: 'g29',
    name: 'Crema para coseduras',
    link: 'https://www.mercadolibre.cl/mustela-crema-preventiva-de-panal-vitaminada-123-bebe-100ml/p/MLC18397534',
    quantity: 1,
    budget: 'accesible',
    image: '/gifts/g29-crema-coseduras.png',
  },
  {
    id: 'g30',
    name: 'Crema corporal recién nacido',
    link: 'https://www.novasalud.cl/eucerin-piel-sensible-400ml-crema-corporal',
    quantity: 1,
    budget: 'medio',
    image:
      'https://www.novasalud.cl/media/catalog/product/cache/3844d86fa8143adcf940177c5498f63c/4/0/4003072_13.jpg',
  },
  {
    id: 'g31',
    name: 'Body recién nacido',
    link: 'https://cl.shein.com/SHEIN-3pcs-Set-Newborn-Baby-Girls-Boys-Blue-And-White-Stripe-Crossed-Collar-Long-Sleeve-Bodysuit-Outfit-Set-Autumn-Family-Matching-Gender-Neutral-p-134456404.html',
    quantity: 1,
    budget: 'accesible',
    image: '/gifts/g31-body.png',
  },
  {
    id: 'g32',
    name: 'Pijama',
    link: 'https://cl.shein.com/Loomiva-Newborn-Baby-Girl-Cartoon-Bear-Pattern-Knitted-Soft-Crew-Neck-Long-Sleeve-Jumpsuit-Brown-Clothes-Natural-New-Born-Swaddle-Boy-Fall-Zipper-Suit-p-372581066.html',
    quantity: 1,
    budget: 'accesible',
    image: '/gifts/g32-pijama.png',
  },
  {
    id: 'g33',
    name: 'Ajuar gorro',
    link: 'https://www.opaline.cl/pack-2-gorro-ajuar-celeste-bebe-nino/p',
    quantity: 1,
    budget: 'medio',
    image: 'https://opalinecl.vtexassets.com/arquivos/ids/382003.jpg',
  },
  {
    id: 'g34',
    name: 'Ajuar calcetines',
    link: 'https://www.opaline.cl/set-de-regalo-pack-5-calcetin-celeste-bebe-nino/p',
    quantity: 1,
    budget: 'medio',
    image: 'https://opalinecl.vtexassets.com/arquivos/ids/383225.jpg',
  },
  {
    id: 'g35',
    name: 'Ajuar bodys',
    link: 'https://www.opaline.cl/pack-2-body-celeste-rib--bebe-nino/p?skuId=22911',
    quantity: 1,
    budget: 'medio',
    image: 'https://opalinecl.vtexassets.com/arquivos/ids/381677.jpg',
  },
  {
    id: 'g36',
    name: 'Ajuar ropita',
    link: 'https://www.opaline.cl/conjunto-clinica-celeste-bebe-nino/p?skuId=23447',
    quantity: 1,
    budget: 'medio',
    image: 'https://opalinecl.vtexassets.com/arquivos/ids/383323.jpg',
  },
]

function withBase(path: string | null | undefined): string | null | undefined {
  if (!path) return path
  if (/^https?:\/\//i.test(path)) return path
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
}

export const gifts: Gift[] = raw.map((g) => ({
  ...g,
  store: storeFromLink(g.link),
  image: withBase(g.image),
}))
