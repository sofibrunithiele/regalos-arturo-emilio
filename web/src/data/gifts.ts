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
    id: 'g04',
    name: 'Fular',
    link: 'https://www.lider.cl/ip/coches-y-paseo/fular-portabebe-de-algodon-semielasticado-gris-perla/00040000766874',
    quantity: 1,
    budget: 'accesible',
    image: '/gifts/g04-fular.png',
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
    id: 'g09',
    name: 'Tina',
    link: 'https://bebesit.cl/collections/baneras-bebe/products/banera-plegable-bebe-con-hamaca-jelly-gris',
    quantity: 1,
    budget: 'medio',
    image:
      'https://bebesit.cl/cdn/shop/files/bb00001614hagr-b95ba69a-32a7-464a-81b6-91b4cd6c766c-c5e95817-7549-4750-9b1e-6f4900b763fb_1200x1200.jpg?v=1764787695',
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
    id: 'g11',
    name: 'Bolsas para leche materna',
    link: 'https://www.mercadolibre.cl/pack-60-bolsas-para-leche-materna-almacenar-250ml/p/MLC2041993288',
    quantity: 1,
    budget: 'accesible',
    unlimited: true,
    notes: 'Las que quieran',
    image: '/gifts/g11-bolsas-leche.png',
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
    id: 'g18',
    name: 'Láminas de aprendizaje',
    link: 'https://cl.shein.com/20pcs-1set-40-High-Contrast-Black-And-White-Visual-Stimulation-Cards-Newborn-Vision-Training-And-Tracking-Flashcards-Baby-Books-0-3-Months-3-6-Months-6-12-Months-Infant-Development-Toys-Baby-Supplies-Children-Toys-Toddler-Toys-Baby-Books-Alternative-Gifts-Toddler-Learning-Activities-p-428016979.html',
    quantity: 1,
    budget: 'accesible',
    image: '/gifts/g18-laminas.png',
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
    id: 'g22',
    name: 'Lavador y esterilizador de mamaderas',
    link: 'https://www.falabella.com/falabella-cl/product/155886137/esterilizador-electrico-a-vapor-para-mamaderas-y-accesorios-bebesit/155886138',
    quantity: 1,
    budget: 'mayor',
    image: '/gifts/g22-esterilizador.png',
  },
]

export const gifts: Gift[] = raw.map((g) => ({
  ...g,
  store: storeFromLink(g.link),
}))
