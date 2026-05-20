// ─── قائمة طعام مطعم Milano Pizzeria Duisburg الكاملة ─────────────────────

export interface MenuSize {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  number: string;
  category: string;
  name: string;
  description: string;
  emoji: string;
  sizes: MenuSize[];
  tags: string[];
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

export const CATEGORIES = [
  { id: 'all',            label: 'Alle Gerichte',      emoji: '🍽️' },
  { id: 'pizza',          label: 'Pizzen',              emoji: '🍕' },
  { id: 'pizza_veg',      label: 'Vegetarische Pizza',  emoji: '🥦' },
  { id: 'pizza_cheesy',   label: 'Cheesy Pizza',        emoji: '🧀' },
  { id: 'pizza_holland',  label: 'Pizza Hollandaise',   emoji: '🥚' },
  { id: 'pizza_bbq',      label: 'BBQ-Pizza',           emoji: '🔥' },
  { id: 'salate',         label: 'Salate',              emoji: '🥗' },
  { id: 'pizzabroetchen', label: 'Pizzabrötchen',       emoji: '🥖' },
  { id: 'vorspeisen',     label: 'Vorspeisen',          emoji: '🫕' },
  { id: 'nudeln',         label: 'Nudeln',              emoji: '🍝' },
  { id: 'alforno',        label: 'Al Forno',            emoji: '🫙' },
  { id: 'haehnchen',      label: 'Hähnchen',            emoji: '🍗' },
  { id: 'schnitzel',      label: 'Schnitzel',           emoji: '🥩' },
  { id: 'fingerfoods',    label: 'Fingerfoods',         emoji: '🍟' },
  { id: 'fisch',          label: 'Fisch',               emoji: '🐟' },
  { id: 'reis',           label: 'Reis',                emoji: '🍚' },
  { id: 'getraenke',      label: 'Getränke',            emoji: '🥤' },
  { id: 'angebote',       label: 'Angebote',            emoji: '🎁' },
];

const P = (klein: number, gross: number, usa?: number): MenuSize[] => [
  { name: 'Klein 24cm', price: klein },
  { name: 'Groß 29cm',  price: gross },
  ...(usa ? [{ name: 'USA 35cm', price: usa }] : []),
];

export const MENU_ITEMS: MenuItem[] = [

  // ═══════════════════════════════════════════════════════
  // PIZZEN
  // ═══════════════════════════════════════════════════════
  { id:'01',   number:'01',   category:'pizza', emoji:'🍕', name:'Pizza Margherita',         description:'Klassische Margherita mit Tomatensauce und Käse',                                                         sizes:P(5.50,8.00,14.00),  tags:['Klassiker'], isVegetarian:true },
  { id:'01a',  number:'01a',  category:'pizza', emoji:'🍕', name:'Pizza Beeck',               description:'Mit Sardellen, Kapern, Peperoni, Knoblauch, Thunfisch',                                                   sizes:P(9.00,12.00,20.50), tags:['Fisch','Scharf'] },
  { id:'01b',  number:'01b',  category:'pizza', emoji:'🍕', name:'Pizza Salami Diavolo',      description:'Mit Paprika, Zwiebeln, Peperoni, Knoblauch',                                                               sizes:P(8.00,11.50,21.00), tags:['Scharf'], isSpicy:true },
  { id:'01c',  number:'01c',  category:'pizza', emoji:'🍕', name:'Pizza Milano',              description:'Mit Schinken, Artischocken, Kapern, Peperoni, Knoblauch',                                                  sizes:P(7.50,11.00,19.50), tags:['Fleisch'] },
  { id:'01d',  number:'01d',  category:'pizza', emoji:'🍕', name:'Pizza Mia',                 description:'Margherita mit Mais, Knoblauch, scharf',                                                                   sizes:P(7.00,9.50,17.50),  tags:['Scharf'], isVegetarian:true, isSpicy:true },
  { id:'02',   number:'02',   category:'pizza', emoji:'🍕', name:'Pizza Cipolla',             description:'Mit Zwiebeln',                                                                                              sizes:P(7.00,10.00,16.00), tags:['Vegetarisch'], isVegetarian:true },
  { id:'03',   number:'03',   category:'pizza', emoji:'🍕', name:'Pizza Napoli',              description:'Mit Oliven, Sardellen, Knoblauch',                                                                          sizes:P(7.00,10.00,18.00), tags:['Fisch'] },
  { id:'04',   number:'04',   category:'pizza', emoji:'🍕', name:'Pizza Diavolo',             description:'Mit Paprika, Zwiebeln, Peperoni',                                                                           sizes:P(7.50,10.50,18.00), tags:['Scharf'], isSpicy:true },
  { id:'05',   number:'05',   category:'pizza', emoji:'🍕', name:'Pizza Salami',              description:'Mit Salami',                                                                                                sizes:P(6.50,9.50,16.00),  tags:['Fleisch'] },
  { id:'06',   number:'06',   category:'pizza', emoji:'🍕', name:'Pizza Bolognese',           description:'Mit Fleischsauce',                                                                                          sizes:P(7.00,9.50,17.50),  tags:['Fleisch'] },
  { id:'07',   number:'07',   category:'pizza', emoji:'🍕', name:'Pizza Prosciutto',          description:'Mit Schinken',                                                                                              sizes:P(6.50,9.50,16.00),  tags:['Fleisch'] },
  { id:'07a',  number:'07a',  category:'pizza', emoji:'🍕', name:'Pizza Prosciutto II',       description:'Mit Schinken und milden Peperoni',                                                                          sizes:P(7.50,10.50,18.00), tags:['Fleisch'] },
  { id:'08',   number:'08',   category:'pizza', emoji:'🍕', name:'Pizza Funghi',              description:'Mit Champignons',                                                                                           sizes:P(6.50,9.50,16.00),  tags:['Vegetarisch'], isVegetarian:true },
  { id:'09',   number:'09',   category:'pizza', emoji:'🍕', name:'Pizza Romantica',           description:'Schinken, Spinat, Knoblauch',                                                                               sizes:P(7.50,11.00,20.00), tags:['Fleisch'] },
  { id:'10',   number:'10',   category:'pizza', emoji:'🍕', name:'Pizza Toscana',             description:'Schinken, Champignons',                                                                                     sizes:P(7.00,10.00,21.50), tags:['Fleisch'] },
  { id:'11',   number:'11',   category:'pizza', emoji:'🍕', name:'Pizza Mimmo',               description:'Schinken, Thunfisch',                                                                                       sizes:P(8.00,11.00,20.00), tags:['Fleisch','Fisch'] },
  { id:'12',   number:'12',   category:'pizza', emoji:'🍕', name:'Pizza Hawaii',              description:'Mit Schinken und Ananas',                                                                                   sizes:P(7.50,11.50,18.00), tags:['Fleisch','Beliebt'] },
  { id:'12a',  number:'12a',  category:'pizza', emoji:'🍕', name:'Pizza Hawaii Hollandaise',  description:'Mit Schinken, Ananas und Hollandaise',                                                                      sizes:P(8.00,11.50,20.00), tags:['Fleisch'] },
  { id:'13',   number:'13',   category:'pizza', emoji:'🍕', name:'Pizza Bacina',              description:'Schinken, Artischocken, Zwiebeln',                                                                          sizes:P(8.00,11.00,18.50), tags:['Fleisch'] },
  { id:'14',   number:'14',   category:'pizza', emoji:'🍕', name:'Calzone',                   description:'Gefüllt mit Schinken, Salami, Champignons, Zwiebeln',                                                       sizes:[{name:'Klein 24cm',price:9.00},{name:'Groß 29cm',price:11.00}], tags:['Fleisch'] },
  { id:'15',   number:'15',   category:'pizza', emoji:'🍕', name:'Calzone Hawaii',            description:'Gefüllt mit Schinken und Ananas',                                                                           sizes:[{name:'Klein 24cm',price:9.00},{name:'Groß 29cm',price:11.50}], tags:['Fleisch'] },
  { id:'15a',  number:'15a',  category:'pizza', emoji:'🍕', name:'Calzone Vegetarisch',       description:'Gefüllt mit Broccoli, Spinat, Zwiebeln, Champignons, Knoblauch',                                            sizes:[{name:'Klein 24cm',price:9.00},{name:'Groß 29cm',price:12.00}], tags:['Vegetarisch'], isVegetarian:true },
  { id:'16',   number:'16',   category:'pizza', emoji:'🍕', name:'Pizza Asparigi',            description:'Schinken, Spargel, Ei',                                                                                     sizes:P(8.00,11.00,18.00), tags:['Fleisch'] },
  { id:'16a',  number:'16a',  category:'pizza', emoji:'🍕', name:'Pizza Spargel',             description:'Schinken, Spargel, Ei, Hollandaise',                                                                        sizes:P(9.00,12.00,19.00), tags:['Fleisch'] },
  { id:'17',   number:'17',   category:'pizza', emoji:'🍕', name:'Pizza Tonno',               description:'Mit Thunfisch',                                                                                             sizes:P(7.00,9.50,18.00),  tags:['Fisch'] },
  { id:'17a',  number:'17a',  category:'pizza', emoji:'🍕', name:'Pizza Don Pepone',          description:'Mit Thunfisch, Krabben, Knoblauch',                                                                         sizes:P(9.00,12.00,21.50), tags:['Fisch'] },
  { id:'17b',  number:'17b',  category:'pizza', emoji:'🍕', name:'Pizza Fantasia',            description:'Mit Schinken, Krabben, Mozzarella, Knoblauch',                                                              sizes:P(9.50,12.50,22.50), tags:['Fleisch','Fisch'] },
  { id:'17c',  number:'17c',  category:'pizza', emoji:'🍕', name:'Pizza Roma',                description:'Mit Thunfisch, milde Peperoni, Knoblauch',                                                                  sizes:P(7.50,10.00,18.00), tags:['Fisch'] },
  { id:'18',   number:'18',   category:'pizza', emoji:'🍕', name:'Pizza Marinara',            description:'Mit Thunfisch und Zwiebeln',                                                                                sizes:P(8.00,10.50,19.00), tags:['Fisch'] },
  { id:'18a',  number:'18a',  category:'pizza', emoji:'🍕', name:'Pizza Rucola',              description:'Mit frischen Tomaten, Mozzarella, Rucolasalat',                                                             sizes:P(9.00,12.00,21.50), tags:['Vegetarisch'], isVegetarian:true },
  { id:'18b',  number:'18b',  category:'pizza', emoji:'🍕', name:'Pizza Rucola 2',            description:'Mit frischen Tomaten, Rucolasalat, Parmesankäse',                                                           sizes:P(9.00,12.00,21.50), tags:['Vegetarisch'], isVegetarian:true },
  { id:'19',   number:'19',   category:'pizza', emoji:'🍕', name:'Pizza Don Camillo',         description:'Schinken, Spinat, Oliven, Knoblauch, Peperoni',                                                             sizes:P(8.00,11.00,22.00), tags:['Fleisch','Scharf'] },
  { id:'20',   number:'20',   category:'pizza', emoji:'🍕', name:'Pizza 4 Stagioni',          description:'Schinken, Thunfisch, Champignons, Paprika, Oliven',                                                         sizes:P(9.50,12.50,22.00), tags:['Fleisch','Fisch'] },
  { id:'20a',  number:'20a',  category:'pizza', emoji:'🍕', name:'Pizza 4 Formaggi',          description:'4 verschiedene Käsesorten',                                                                                 sizes:P(8.00,11.00,20.00), tags:['Vegetarisch'], isVegetarian:true },
  { id:'21',   number:'21',   category:'pizza', emoji:'🍕', name:'Pizza Speciale',            description:'Salami, Gorgonzola, Peperoni, Knoblauch',                                                                   sizes:P(7.50,11.00,20.50), tags:['Fleisch','Scharf'], isSpicy:true },
  { id:'22',   number:'22',   category:'pizza', emoji:'🍕', name:'Pizza Mista',               description:'Schinken, Salami, Champignons',                                                                             sizes:P(8.00,11.00,21.00), tags:['Fleisch'] },
  { id:'23',   number:'23',   category:'pizza', emoji:'🍕', name:'Pizza Meiderich',           description:'Salami, Schinken, Thunfisch, Champignons, Knoblauch, Peperoni',                                             sizes:P(9.00,12.00,22.00), tags:['Fleisch','Fisch'] },
  { id:'24',   number:'24',   category:'pizza', emoji:'🍕', name:'Pizza La Rustica',          description:'Schinken, Salami',                                                                                          sizes:P(8.00,10.50,18.00), tags:['Fleisch'] },
  { id:'24a',  number:'24a',  category:'pizza', emoji:'🍕', name:'Pizza La Rustica 2',        description:'Schinken, Salami, Rucolasalat, Parmesan',                                                                   sizes:P(8.50,12.00,22.50), tags:['Fleisch'] },
  { id:'24b',  number:'24b',  category:'pizza', emoji:'🍕', name:'Pizza Turin',               description:'Schinken, Salami, milde Peperoni',                                                                          sizes:P(9.00,12.00,20.00), tags:['Fleisch'] },
  { id:'25',   number:'25',   category:'pizza', emoji:'🍕', name:'Pizza Capricciosa',         description:'Schinken, Salami, Champignons, Krabben',                                                                    sizes:P(10.00,12.50,22.50), tags:['Fleisch','Fisch'] },
  { id:'26',   number:'26',   category:'pizza', emoji:'🍕', name:'Pizza Valentino',           description:'Schinken, Champignons, Artischocken, Ei',                                                                   sizes:P(9.00,12.00,22.00), tags:['Fleisch'] },
  { id:'27',   number:'27',   category:'pizza', emoji:'🍕', name:'Pizza Gorgonzola',          description:'Frische Tomaten, Gorgonzola, Knoblauch',                                                                    sizes:P(8.00,11.00,20.00), tags:['Vegetarisch'], isVegetarian:true },
  { id:'28',   number:'28',   category:'pizza', emoji:'🍕', name:'Pizza Mozzarella',          description:'Mit frischen Tomaten, Mozzarella, Basilikum',                                                               sizes:P(7.50,10.50,19.50), tags:['Vegetarisch'], isVegetarian:true },
  { id:'29',   number:'29',   category:'pizza', emoji:'🍕', name:'Pizza Verdemare',           description:'Thunfisch, Meeresfrüchte, Krabben, Knoblauch',                                                              sizes:P(9.00,12.00,21.50), tags:['Fisch'] },
  { id:'29a',  number:'29a',  category:'pizza', emoji:'🍕', name:'Pizza Pescatore',           description:'Thunfisch, Meeresfrüchte, Lachs, Knoblauch',                                                               sizes:P(9.50,12.50,21.00), tags:['Fisch'] },
  { id:'30',   number:'30',   category:'pizza', emoji:'🍕', name:'Pizza Gamberetti',          description:'Mit Krabben, Knoblauch',                                                                                    sizes:P(9.00,12.00,22.50), tags:['Fisch'] },
  { id:'31',   number:'31',   category:'pizza', emoji:'🍕', name:'Pizza Italia',              description:'Spinat, Zwiebeln, Knoblauch, Paprika',                                                                      sizes:P(8.50,11.50,20.50), tags:['Vegetarisch'], isVegetarian:true },
  { id:'32',   number:'32',   category:'pizza', emoji:'🍕', name:'Pizza Peppone',             description:'Schinken, Thunfisch, Krabben, Knoblauch',                                                                   sizes:P(9.00,12.00,22.00), tags:['Fleisch','Fisch'] },
  { id:'33',   number:'33',   category:'pizza', emoji:'🍕', name:'Pizza Salvatore',           description:'Schinken, Salami, Champignons, Artischocken',                                                               sizes:P(9.00,12.00,21.50), tags:['Fleisch'] },
  { id:'33a',  number:'33a',  category:'pizza', emoji:'🍕', name:'Pizza Salvatore II',        description:'Schinken, Salami, Champignons, Artischocken, Thunfisch, Knoblauch',                                         sizes:P(9.50,12.50,22.00), tags:['Fleisch','Fisch'] },
  { id:'34',   number:'34',   category:'pizza', emoji:'🍕', name:'Pizza Mexicana',            description:'Hähnchenfleisch, Paprika, Zwiebeln, Peperoni',                                                              sizes:P(9.00,12.00,22.50), tags:['Hähnchen','Scharf'], isSpicy:true },
  { id:'34a',  number:'34a',  category:'pizza', emoji:'🍕', name:'Pizza Mexicana II',         description:'Hähnchenfleisch, Paprika, Zwiebeln, Peperoni, Rucola',                                                      sizes:P(10.00,12.50,24.50), tags:['Hähnchen','Scharf'], isSpicy:true },
  { id:'34b',  number:'34b',  category:'pizza', emoji:'🍕', name:'Pizza Mexicana III',        description:'Hähnchenfleisch, Paprika, Zwiebeln, milde Peperoni',                                                        sizes:P(10.00,12.50,24.50), tags:['Hähnchen'] },
  { id:'35',   number:'35',   category:'pizza', emoji:'🍕', name:'Pizza Pollo Funghi',        description:'Hähnchenbrustfilet, Champignons, Paprika, Knoblauch, Peperoni',                                             sizes:P(9.00,12.00,22.50), tags:['Hähnchen'] },
  { id:'36',   number:'36',   category:'pizza', emoji:'🍕', name:'Pizza Pollo Broccoli',      description:'Hähnchenbrustfilet, Broccoli, Paprika, Knoblauch',                                                          sizes:P(9.00,12.00,22.50), tags:['Hähnchen'] },
  { id:'37',   number:'37',   category:'pizza', emoji:'🍕', name:'Pizza Pollo Hawaii',        description:'Mit Hähnchenbrustfilet und Ananas',                                                                         sizes:P(9.00,12.00,22.50), tags:['Hähnchen'] },
  { id:'37a',  number:'37a',  category:'pizza', emoji:'🍕', name:'Pizza Hawaii Pollo Hollandaise', description:'Hähnchenbrustfilet, Ananas und Hollandaise',                                                           sizes:P(9.50,12.50,23.00), tags:['Hähnchen'] },
  { id:'38',   number:'38',   category:'pizza', emoji:'🍕', name:'Pizza Costa',               description:'Gyros, Paprika, Knoblauch, Peperoni',                                                                      sizes:P(9.00,12.00,22.50), tags:['Fleisch','Scharf'], isSpicy:true },
  { id:'38a',  number:'38a',  category:'pizza', emoji:'🍕', name:'Pizza Costa 2',             description:'Gyros, Paprika, Knoblauch, Peperoni, Rucolasalat',                                                          sizes:P(9.50,13.00,24.50), tags:['Fleisch','Scharf'], isSpicy:true },
  { id:'39',   number:'39',   category:'pizza', emoji:'🍕', name:'Pizza Milano',              description:'Mit Gyros, Hirtenkäse',                                                                                     sizes:P(9.00,12.00,22.50), tags:['Fleisch'] },
  { id:'39a',  number:'39a',  category:'pizza', emoji:'🍕', name:'Pizza Gyros',               description:'Mit Gyros, Hirtenkäse, Zwiebeln',                                                                           sizes:P(9.50,12.50,22.50), tags:['Fleisch'] },
  { id:'39b',  number:'39b',  category:'pizza', emoji:'🍕', name:'Pizza MSV',                 description:'Thunfisch, Lachs, Krabben, Knoblauch',                                                                      sizes:P(10.00,13.00,22.50), tags:['Fisch'] },
  { id:'40',   number:'40',   category:'pizza', emoji:'🍕', name:'Pizza Colloseum',           description:'Hähnchenbrustfilet, frische Tomaten, Zwiebeln, Peperoni',                                                   sizes:P(9.00,12.00,22.50), tags:['Hähnchen'] },
  { id:'41',   number:'41',   category:'pizza', emoji:'🍕', name:'Pizza Feta',                description:'Mit Spinat, Hirtenkäse, Knoblauch',                                                                         sizes:P(9.00,12.00,19.50), tags:['Vegetarisch'], isVegetarian:true },
  { id:'42',   number:'42',   category:'pizza', emoji:'🍕', name:'Pizza Spaghetti',           description:'Mit Spaghetti Bolognese',                                                                                   sizes:P(8.50,11.50,20.50), tags:['Fleisch'] },
  { id:'43',   number:'43',   category:'pizza', emoji:'🍕', name:'Pizza Sucuk',               description:'Knoblauchwurst, frische Tomaten, Zwiebeln',                                                                  sizes:P(9.00,12.00,21.50), tags:['Fleisch'] },
  { id:'43a',  number:'43a',  category:'pizza', emoji:'🍕', name:'Pizza Sucuk Hollandaise',   description:'Knoblauchwurst, frische Tomaten, Zwiebeln, Hollandaise',                                                     sizes:P(9.50,12.50,21.50), tags:['Fleisch'] },
  { id:'43b',  number:'43b',  category:'pizza', emoji:'🍕', name:'Pizza Sucuk Rucola',        description:'Knoblauchwurst, Rucolasalat, scharf, Knoblauch',                                                             sizes:P(10.00,12.50,22.50), tags:['Fleisch','Scharf'], isSpicy:true },
  { id:'44',   number:'44',   category:'pizza', emoji:'🍕', name:'Pizza Sucuk Special',       description:'Mit Knoblauchwurst, Zwiebeln, Paprika, Peperoni',                                                            sizes:P(9.00,12.00,22.50), tags:['Fleisch','Scharf'], isSpicy:true },
  { id:'44a',  number:'44a',  category:'pizza', emoji:'🍕', name:'Pizza Sucuk Speciale',      description:'Mit Knoblauchwurst, Zwiebeln, Paprika, Peperoni, Hollandaise',                                               sizes:P(9.50,12.50,22.50), tags:['Fleisch','Scharf'], isSpicy:true },
  { id:'44c',  number:'44c',  category:'pizza', emoji:'🍕', name:'Pizza Sucuk Ankara',        description:'Mit Knoblauchwurst, Spiegelei, Knoblauch',                                                                   sizes:P(9.50,12.50,24.00), tags:['Fleisch'] },

  // ═══════════════════════════════════════════════════════
  // VEGETARISCHE PIZZEN
  // ═══════════════════════════════════════════════════════
  { id:'45',   number:'45',   category:'pizza_veg', emoji:'🥦', name:'Pizza Broccoli',        description:'Mit Broccoli',                                                                                              sizes:P(8.00,10.00,18.00), tags:['Vegetarisch'], isVegetarian:true },
  { id:'45a',  number:'45a',  category:'pizza_veg', emoji:'🥦', name:'Pizza Broccoli II',     description:'Rote Zwiebeln, Artischocken, milde Peperoni, Knoblauch',                                                    sizes:P(9.50,12.50,20.00), tags:['Vegetarisch'], isVegetarian:true },
  { id:'46',   number:'46',   category:'pizza_veg', emoji:'🥦', name:'Pizza Pavia',           description:'Spinat, Broccoli, Knoblauch',                                                                               sizes:P(8.50,11.50,19.50), tags:['Vegetarisch'], isVegetarian:true },
  { id:'47',   number:'47',   category:'pizza_veg', emoji:'🥦', name:'Pizza Venezia',         description:'Mit Spinat, Champignons, Zwiebeln, Knoblauch',                                                              sizes:P(8.50,11.50,19.50), tags:['Vegetarisch'], isVegetarian:true },
  { id:'48',   number:'48',   category:'pizza_veg', emoji:'🥦', name:'Pizza Firenze',         description:'Paprika, Zwiebeln, Artischocken, Oliven, Knoblauch',                                                        sizes:P(8.50,11.50,19.50), tags:['Vegetarisch'], isVegetarian:true },
  { id:'49',   number:'49',   category:'pizza_veg', emoji:'🥦', name:'Pizza Papino',          description:'Mit Spinat, Champignons, Artischocken, Knoblauch',                                                          sizes:P(8.50,11.50,19.50), tags:['Vegetarisch'], isVegetarian:true },
  { id:'50',   number:'50',   category:'pizza_veg', emoji:'🥦', name:'Pizza Filo',            description:'Broccoli, Zwiebeln, Peperoni, Knoblauch',                                                                   sizes:P(8.50,11.50,19.50), tags:['Vegetarisch','Scharf'], isVegetarian:true },

  // ═══════════════════════════════════════════════════════
  // CHEESY PIZZA
  // ═══════════════════════════════════════════════════════
  { id:'192',  number:'192',  category:'pizza_cheesy', emoji:'🧀', name:'Cheesy Pollo Hawaii',         description:'Hähnchen, Ananas, Curry',                                         sizes:[{name:'Portion',price:13.00}], tags:['Hähnchen'] },
  { id:'193',  number:'193',  category:'pizza_cheesy', emoji:'🧀', name:'Cheesy Pizza Salami',         description:'Mit Salami',                                                      sizes:[{name:'Portion',price:11.00}], tags:['Fleisch'] },
  { id:'194',  number:'194',  category:'pizza_cheesy', emoji:'🧀', name:'Cheesy Pizza Schinken',       description:'Mit Formfleischvorderschinken',                                   sizes:[{name:'Portion',price:11.00}], tags:['Fleisch'] },
  { id:'195',  number:'195',  category:'pizza_cheesy', emoji:'🧀', name:'Cheesy Pizza Thunfisch',      description:'Thunfisch, Zwiebeln',                                             sizes:[{name:'Portion',price:13.00}], tags:['Fisch'] },
  { id:'196',  number:'196',  category:'pizza_cheesy', emoji:'🧀', name:'Cheesy Pizza Hawaii',         description:'Mit Schinken und Ananas',                                         sizes:[{name:'Portion',price:13.00}], tags:['Fleisch'] },
  { id:'197',  number:'197',  category:'pizza_cheesy', emoji:'🧀', name:'Cheesy Pizza Schinken Tonno', description:'Schinken, Thunfisch',                                             sizes:[{name:'Portion',price:13.00}], tags:['Fleisch','Fisch'] },
  { id:'198a', number:'198a', category:'pizza_cheesy', emoji:'🧀', name:'Cheesy Pizza Spinat',         description:'Spinat, Krabben, Knoblauch',                                      sizes:[{name:'Portion',price:13.00}], tags:['Fisch'] },
  { id:'198b', number:'198b', category:'pizza_cheesy', emoji:'🧀', name:'Cheesy Pizza MSV',            description:'Thunfisch, Lachs, Krabben, Knoblauch, scharf',                    sizes:[{name:'Portion',price:15.00}], tags:['Fisch','Scharf'], isSpicy:true },

  // ═══════════════════════════════════════════════════════
  // PIZZA HOLLANDAISE
  // ═══════════════════════════════════════════════════════
  { id:'139',  number:'139',  category:'pizza_holland', emoji:'🥚', name:'Pizza Amsterdam',    description:'Schinken, Broccoli, Hollandaise, Knoblauch',                               sizes:P(9.50,12.00,22.00), tags:['Fleisch'] },
  { id:'139a', number:'139a', category:'pizza_holland', emoji:'🥚', name:'Pizza Venlo',        description:'Thunfisch, Lachs, Krabben Hollandaise, Knoblauch',                         sizes:P(10.50,15.00,26.00), tags:['Fisch'] },
  { id:'140',  number:'140',  category:'pizza_holland', emoji:'🥚', name:'Pizza Rotterdam',    description:'Hähnchen, Ananas, Hollandaise, Knoblauch',                                 sizes:P(9.50,13.00,22.00), tags:['Hähnchen'] },
  { id:'141',  number:'141',  category:'pizza_holland', emoji:'🥚', name:'Pizza Den Haag',     description:'Mit Artischocken, Champignons, Zwiebeln, Hollandaise',                     sizes:P(9.00,12.50,21.50), tags:['Vegetarisch'], isVegetarian:true },
  { id:'142',  number:'142',  category:'pizza_holland', emoji:'🥚', name:'Pizza Sandfort',     description:'Mit Schinken, Paprika, Thunfisch, Oliven, Hollandaise',                    sizes:P(10.00,13.50,22.50), tags:['Fleisch','Fisch'] },
  { id:'143',  number:'143',  category:'pizza_holland', emoji:'🥚', name:'Pizza Venlo Classic', description:'Mit Thunfisch, Lachs, Hollandaise',                                      sizes:P(10.50,14.00,23.50), tags:['Fisch'] },

  // ═══════════════════════════════════════════════════════
  // BBQ-PIZZA
  // ═══════════════════════════════════════════════════════
  { id:'150',  number:'150',  category:'pizza_bbq', emoji:'🔥', name:'Pizza Vulcano',          description:'Schinken, BBQ-Sauce, Peperoni, Jalapenos, Tabasco',                        sizes:P(9.00,12.50,22.00), tags:['Fleisch','Scharf'], isSpicy:true },
  { id:'151',  number:'151',  category:'pizza_bbq', emoji:'🔥', name:'Pizza Gonzales',         description:'BBQ-Sauce, Hähnchenbrust, Tomaten, Paprika, Zwiebeln, Mais, Jalapenos',    sizes:P(9.50,13.00,24.00), tags:['Hähnchen','Scharf'], isSpicy:true },
  { id:'152',  number:'152',  category:'pizza_bbq', emoji:'🔥', name:'Pizza Los Pizzero',      description:'BBQ-Sauce, Salami, Peperoni, Zwiebeln, Mais, Jalapenos',                   sizes:P(9.50,13.00,22.00), tags:['Fleisch','Scharf'], isSpicy:true },
  { id:'153',  number:'153',  category:'pizza_bbq', emoji:'🔥', name:'Pizza Notruf 112',       description:'BBQ-Sauce, gebratener Hähnchenbrust, Ananas, Jalapenos, Tabasco',          sizes:P(9.50,13.00,22.00), tags:['Hähnchen','Scharf'], isSpicy:true },
  { id:'154',  number:'154',  category:'pizza_bbq', emoji:'🔥', name:'Pizza Wolter',           description:'Mit Hähnchenbrust, Broccoli, BBQ-Sauce',                                   sizes:P(9.50,13.00,22.00), tags:['Hähnchen'] },

  // ═══════════════════════════════════════════════════════
  // SALATE
  // ═══════════════════════════════════════════════════════
  { id:'211',  number:'211',  category:'salate', emoji:'🥗', name:'Insalata Mista',            description:'Gemischter Salat',                                                          sizes:[{name:'Portion',price:7.50}],  tags:['Vegetarisch'], isVegetarian:true },
  { id:'212',  number:'212',  category:'salate', emoji:'🥗', name:'Insalata al Tonno',         description:'Gemischter Salat, Thunfisch',                                               sizes:[{name:'Portion',price:9.00}],  tags:['Fisch'] },
  { id:'213',  number:'213',  category:'salate', emoji:'🥗', name:'Insalata Italiano',         description:'Gemischter Salat, Käse, Schinken, Ei',                                     sizes:[{name:'Portion',price:9.00}],  tags:['Fleisch'] },
  { id:'214',  number:'214',  category:'salate', emoji:'🥗', name:'Insalata Capricciosa',      description:'Gem. Salat, Käse, Schinken, Thunfisch, Ei',                                sizes:[{name:'Portion',price:10.00}], tags:['Fleisch','Fisch'] },
  { id:'215',  number:'215',  category:'salate', emoji:'🥗', name:'Insalata Mozzarella',       description:'Fruchtige Tomaten, frischer Basilikum, Mozzarella',                        sizes:[{name:'Portion',price:8.50}],  tags:['Vegetarisch'], isVegetarian:true },
  { id:'215a', number:'215a', category:'salate', emoji:'🥗', name:'Insalata Mozzarella II',    description:'Tomaten, Basilikum, Mozzarella, Oliven, Artischocken, rote Zwiebeln',      sizes:[{name:'Portion',price:10.00}], tags:['Vegetarisch'], isVegetarian:true },
  { id:'216',  number:'216',  category:'salate', emoji:'🥗', name:'Insalata Venezia',          description:'Gem. Salat mit Krabben und Ananas',                                        sizes:[{name:'Portion',price:11.50}], tags:['Fisch'] },
  { id:'217',  number:'217',  category:'salate', emoji:'🥗', name:'Insalata Romana',           description:'Gem. Salat mit gebratenem Hähnchenfleisch',                                sizes:[{name:'Portion',price:10.00}], tags:['Hähnchen'] },
  { id:'218',  number:'218',  category:'salate', emoji:'🥗', name:'Insalata La Luna',          description:'Gem. Salat, Hähnchenfleisch, Champignons, Zwiebeln',                       sizes:[{name:'Portion',price:11.00}], tags:['Hähnchen'] },
  { id:'219',  number:'219',  category:'salate', emoji:'🥗', name:'Insalata Tropicana',        description:'Gem. Salat, Hähnchenfleisch, Ananas',                                      sizes:[{name:'Portion',price:11.50}], tags:['Hähnchen'] },
  { id:'220',  number:'220',  category:'salate', emoji:'🥗', name:'Insalata Berlina',          description:'Gem. Salat, Thunfisch, Oliven, Hirtenkäse',                                sizes:[{name:'Portion',price:10.00}], tags:['Fisch'] },
  { id:'221',  number:'221',  category:'salate', emoji:'🥗', name:'Insalata Milano',           description:'Gem. Salat, gebr. Gyros, Champignons, Zwiebeln',                           sizes:[{name:'Portion',price:12.00}], tags:['Fleisch'] },
  { id:'222',  number:'222',  category:'salate', emoji:'🥗', name:'Insalata di Mare',          description:'Gem. Salat mit gebratenen Garnelen',                                       sizes:[{name:'Portion',price:12.50}], tags:['Fisch'] },
  { id:'223',  number:'223',  category:'salate', emoji:'🥗', name:'Insalata MSV',              description:'Eisbergsalat, Mais, Thunfisch, Garnelen, Zwiebeln',                        sizes:[{name:'Portion',price:13.50}], tags:['Fisch'] },
  { id:'223a', number:'223a', category:'salate', emoji:'🥗', name:'Insalata Verdemare',        description:'Eisbergsalat, Tomaten, Gurken, Essig & Öl, Frutti di Mare',               sizes:[{name:'Portion',price:10.50}], tags:['Fisch'] },
  { id:'223b', number:'223b', category:'salate', emoji:'🥗', name:'Griechischer Salat',        description:'Kraut, Gurken, Tomaten, Hirtenkäse, Oliven, Artischocken, Essig & Öl',   sizes:[{name:'Portion',price:10.00}], tags:['Vegetarisch'], isVegetarian:true },
  { id:'223d', number:'223d', category:'salate', emoji:'🥗', name:'Rucola Polo',               description:'Eisbergsalat, Rucola, Hähnchenfleisch, Parmesankäse, Essig/Öl',          sizes:[{name:'Portion',price:11.00}], tags:['Hähnchen'] },
  { id:'223e', number:'223e', category:'salate', emoji:'🥗', name:'Rucola Gyros',              description:'Eisbergsalat, Rucola, Gyros, Parmesankäse, Essig/Öl',                     sizes:[{name:'Portion',price:11.00}], tags:['Fleisch'] },

  // ═══════════════════════════════════════════════════════
  // PIZZABRÖTCHEN
  // ═══════════════════════════════════════════════════════
  { id:'pb198', number:'198', category:'pizzabroetchen', emoji:'🥖', name:'Pizzabrötchen Schinken & Salami', description:'Mit Schinken und Salami',                    sizes:[{name:'Portion',price:7.50}],  tags:['Fleisch'] },
  { id:'pb199', number:'199', category:'pizzabroetchen', emoji:'🥖', name:'Pizzabrötchen Käse',              description:'Mit Käse',                                    sizes:[{name:'Portion',price:6.00}],  tags:['Vegetarisch'], isVegetarian:true },
  { id:'pb200', number:'200', category:'pizzabroetchen', emoji:'🥖', name:'Pizzabrötchen Salami & Käse',     description:'Mit Salami und Käse',                         sizes:[{name:'Portion',price:7.00}],  tags:['Fleisch'] },
  { id:'pb201', number:'201', category:'pizzabroetchen', emoji:'🥖', name:'Pizzabrötchen Schinken & Käse',   description:'Mit Schinken und Käse',                       sizes:[{name:'Portion',price:7.00}],  tags:['Fleisch'] },
  { id:'pb202', number:'202', category:'pizzabroetchen', emoji:'🥖', name:'Pizzabrötchen Thunfisch & Käse',  description:'Mit Thunfisch und Käse',                      sizes:[{name:'Portion',price:8.00}],  tags:['Fisch'] },
  { id:'pb204', number:'204', category:'pizzabroetchen', emoji:'🥖', name:'Pizzabrötchen Sucuk & Käse',      description:'Sucuk (Knoblauchwurst) mit Käse',              sizes:[{name:'Portion',price:8.50}],  tags:['Fleisch'] },
  { id:'pb205', number:'205', category:'pizzabroetchen', emoji:'🥖', name:'Pizzabrötchen Thunfisch scharf',  description:'Thunfisch, Zwiebeln, Peperoni',                sizes:[{name:'Portion',price:8.50}],  tags:['Fisch','Scharf'], isSpicy:true },
  { id:'pb206', number:'206', category:'pizzabroetchen', emoji:'🥖', name:'Pizzabrötchen Hawaii',            description:'Schinken, Ananas, Käse',                      sizes:[{name:'Portion',price:8.50}],  tags:['Fleisch'] },
  { id:'pb207', number:'207', category:'pizzabroetchen', emoji:'🥖', name:'Pizzabrötchen Sucuk Hirtenkäse',  description:'Sucuk mit Hirtenkäse',                        sizes:[{name:'Portion',price:9.00}],  tags:['Fleisch'] },
  { id:'pb208', number:'208', category:'pizzabroetchen', emoji:'🥖', name:'Pizzabrötchen Gyros',             description:'Gyros, Hirtenkäse, Peperoni',                 sizes:[{name:'Portion',price:8.50}],  tags:['Fleisch','Scharf'], isSpicy:true },
  { id:'pb209', number:'209', category:'pizzabroetchen', emoji:'🥖', name:'Pizzabrötchen Pollo Hawaii',      description:'Mit Hähnchen, Ananas, Käse',                   sizes:[{name:'Portion',price:9.00}],  tags:['Hähnchen'] },
  { id:'pb210', number:'210', category:'pizzabroetchen', emoji:'🥖', name:'Pizzabrötchen Special',           description:'Schinken, Salami, Thunfisch, Peperoni, Knoblauch', sizes:[{name:'Portion',price:9.00}], tags:['Fleisch','Fisch'] },
  { id:'pb6kk', number:'-',   category:'pizzabroetchen', emoji:'🥖', name:'6 Pizzabrötchen mit Kräutercreme', description:'6 Stück mit Kräutercreme',                  sizes:[{name:'6 Stück',price:3.50}],  tags:['Vegetarisch'], isVegetarian:true },
  { id:'pb6ai', number:'-',   category:'pizzabroetchen', emoji:'🥖', name:'6 Pizzabrötchen mit Aioli',       description:'6 Stück mit Aioli',                           sizes:[{name:'6 Stück',price:3.50}],  tags:['Vegetarisch'], isVegetarian:true },

  // ═══════════════════════════════════════════════════════
  // WARME VORSPEISEN
  // ═══════════════════════════════════════════════════════
  { id:'51',   number:'51',   category:'vorspeisen', emoji:'🫕', name:'Überbackener Spinat',              description:'Mit Schinken, Knoblauch, Sahnesauce',                         sizes:[{name:'Portion',price:10.50}], tags:['Fleisch'] },
  { id:'52',   number:'52',   category:'vorspeisen', emoji:'🫕', name:'Überbackener Broccoli',            description:'Schinken, Knoblauch, Sahnesauce',                             sizes:[{name:'Portion',price:10.50}], tags:['Fleisch'] },
  { id:'53',   number:'53',   category:'vorspeisen', emoji:'🫕', name:'Überbackene Champignons gefüllt',  description:'Mit Schinken, Knoblauch, Spinat oder Broccoli, Sahnesauce',   sizes:[{name:'Portion',price:11.00}], tags:['Fleisch'] },
  { id:'54',   number:'54',   category:'vorspeisen', emoji:'🫕', name:'Überbackene Champignons',          description:'Knoblauch, Petersilie in Sahnesauce',                         sizes:[{name:'Portion',price:11.00}], tags:['Vegetarisch'], isVegetarian:true },

  // ═══════════════════════════════════════════════════════
  // NUDELN — SPAGHETTI
  // ═══════════════════════════════════════════════════════
  { id:'55',   number:'55',   category:'nudeln', emoji:'🍝', name:'Spaghetti Bolognese',        description:'Mit Fleischsauce',                                                        sizes:[{name:'Portion',price:9.00}],  tags:['Fleisch'] },
  { id:'56',   number:'56',   category:'nudeln', emoji:'🍝', name:'Spaghetti Napoli',           description:'Mit Tomatensauce',                                                        sizes:[{name:'Portion',price:8.00}],  tags:['Vegetarisch'], isVegetarian:true },
  { id:'57',   number:'57',   category:'nudeln', emoji:'🍝', name:'Spaghetti Carbonara',        description:'Mit Schinken, Ei, Parmesankäse, Sahnesauce',                             sizes:[{name:'Portion',price:9.50}],  tags:['Fleisch','Klassiker'] },
  { id:'58',   number:'58',   category:'nudeln', emoji:'🍝', name:'Spaghetti Gamberi',          description:'Mit Krabben, Knoblauch, Tomatensauce',                                   sizes:[{name:'Portion',price:11.50}], tags:['Fisch'] },
  { id:'59',   number:'59',   category:'nudeln', emoji:'🍝', name:'Spaghetti Tonno',            description:'Mit Thunfisch, Zwiebeln, Knoblauch, Tomatensauce',                       sizes:[{name:'Portion',price:11.00}], tags:['Fisch'] },
  { id:'60',   number:'60',   category:'nudeln', emoji:'🍝', name:'Spaghetti Frutti di Mare',   description:'Mit Meeresfrüchten, Knoblauch, Tomatensauce',                            sizes:[{name:'Portion',price:11.00}], tags:['Fisch'] },
  { id:'61',   number:'61',   category:'nudeln', emoji:'🍝', name:'Spaghetti al Pollo',         description:'Mit Hähnchenbrustfilet, grünem Pfeffer, Sahnesauce',                     sizes:[{name:'Portion',price:11.00}], tags:['Hähnchen'] },
  { id:'62',   number:'62',   category:'nudeln', emoji:'🍝', name:'Spaghetti Milano',           description:'Mit Hähnchenbrustfilet, Champignons, Sahnesauce',                        sizes:[{name:'Portion',price:11.00}], tags:['Hähnchen'] },
  { id:'63',   number:'63',   category:'nudeln', emoji:'🍝', name:'Spaghetti Vegetale',         description:'Mit Spinat, Broccoli, Zwiebeln, Knoblauch, Peperoni, Tomatensauce',      sizes:[{name:'Portion',price:10.00}], tags:['Vegetarisch'], isVegetarian:true },
  { id:'64',   number:'64',   category:'nudeln', emoji:'🍝', name:'Spaghetti De la Casa',       description:'Mit Schinken, Champignons, Sahnesauce',                                  sizes:[{name:'Portion',price:9.50}],  tags:['Fleisch'] },
  { id:'65',   number:'65',   category:'nudeln', emoji:'🍝', name:'Spaghetti Adria',            description:'Mit Spinat, Champignons, Knoblauch, Peperoni, Sahnesauce',               sizes:[{name:'Portion',price:10.00}], tags:['Vegetarisch'], isVegetarian:true },
  { id:'65a',  number:'65a',  category:'nudeln', emoji:'🍝', name:'Gebratene Spaghetti Krabben', description:'Gebratene Nudeln mit Krabben, Broccoli, Champignons, Knoblauch, Tabasco', sizes:[{name:'Portion',price:13.50}], tags:['Fisch','Scharf'], isSpicy:true },
  { id:'65b',  number:'65b',  category:'nudeln', emoji:'🍝', name:'Gebratene Spaghetti Hähnchen', description:'Gebratene Nudeln mit Hähnchen, Zwiebeln, Paprika, Knoblauch',         sizes:[{name:'Portion',price:13.50}], tags:['Hähnchen'] },
  { id:'65c',  number:'65c',  category:'nudeln', emoji:'🍝', name:'Gebratene Spaghetti Pollo Funghi', description:'Gebratene Nudeln mit Hähnchen, Champignons, Broccoli',            sizes:[{name:'Portion',price:13.50}], tags:['Hähnchen'] },
  { id:'65d',  number:'65d',  category:'nudeln', emoji:'🍝', name:'Gebratene Spaghetti Krabben II', description:'Gebratene Nudeln, Krabben, Zwiebeln, Peperoni, Knoblauch',          sizes:[{name:'Portion',price:13.50}], tags:['Fisch','Scharf'], isSpicy:true },
  { id:'65e',  number:'65e',  category:'nudeln', emoji:'🍝', name:'Gebratene Spaghetti Vegetarisch', description:'Kapern, Paprika, Oliven, Peperoni, Knoblauch',                     sizes:[{name:'Portion',price:13.50}], tags:['Vegetarisch'], isVegetarian:true },
  { id:'65f',  number:'65f',  category:'nudeln', emoji:'🍝', name:'Gebratene Spaghetti Lachs',  description:'Lachs, Krabben, Peperoni, Knoblauch',                                    sizes:[{name:'Portion',price:14.50}], tags:['Fisch'] },
  { id:'65g',  number:'65g',  category:'nudeln', emoji:'🍝', name:'Gebratene Spaghetti Rucola Lachs', description:'Rucola, Lachs, Krabben, Peperoni, Knoblauch',                    sizes:[{name:'Portion',price:15.50}], tags:['Fisch'] },
  { id:'65h',  number:'65h',  category:'nudeln', emoji:'🍝', name:'Gebratene Spaghetti Rucola Hähnchen', description:'Rucola, Hähnchenfleisch, frische Tomaten, scharf, Knoblauch', sizes:[{name:'Portion',price:14.00}], tags:['Hähnchen','Scharf'], isSpicy:true },
  { id:'65i',  number:'65i',  category:'nudeln', emoji:'🍝', name:'Gebratene Spaghetti Rucola Pollo', description:'Rucola, Hähnchenfleisch, Paprika, Zwiebeln, scharf, Knoblauch',  sizes:[{name:'Portion',price:14.00}], tags:['Hähnchen','Scharf'], isSpicy:true },

  // Rigatoni
  { id:'66',   number:'66',   category:'nudeln', emoji:'🍝', name:'Rigatoni 4 Formaggi',        description:'Mit 4 verschiedenen Käsesorten',                                          sizes:[{name:'Portion',price:9.50}],  tags:['Vegetarisch'], isVegetarian:true },
  { id:'67',   number:'67',   category:'nudeln', emoji:'🍝', name:'Rigatoni Diavolo',           description:'Schinken, Paprika, Zwiebeln, Peperoni in Tomatensauce',                  sizes:[{name:'Portion',price:9.00}],  tags:['Fleisch','Scharf'], isSpicy:true },
  { id:'68',   number:'68',   category:'nudeln', emoji:'🍝', name:'Rigatoni Della Casa',        description:'Mit Hähnchenfleisch, Champignons, Zwiebeln, Tomatensauce',               sizes:[{name:'Portion',price:11.00}], tags:['Hähnchen'] },
  { id:'69',   number:'69',   category:'nudeln', emoji:'🍝', name:'Rigatoni Centarelli',        description:'Mit Hähnchenfleisch, Pfifferlingen, Sahnesauce',                         sizes:[{name:'Portion',price:11.00}], tags:['Hähnchen'] },
  { id:'70',   number:'70',   category:'nudeln', emoji:'🍝', name:'Rigatoni Zigeuner',          description:'Hähnchenfleisch, Zwiebeln, Paprika, Peperoni, Tomatensauce',             sizes:[{name:'Portion',price:11.00}], tags:['Hähnchen','Scharf'], isSpicy:true },
  { id:'71',   number:'71',   category:'nudeln', emoji:'🍝', name:'Rigatoni Milano',            description:'Mit Hähnchenfleisch, grünem Pfeffer, Sahnesauce',                        sizes:[{name:'Portion',price:11.00}], tags:['Hähnchen'] },
  { id:'71a',  number:'71a',  category:'nudeln', emoji:'🍝', name:'Rigatoni Amsterdam',         description:'Mit Hähnchenfleisch, grünem Pfeffer, Hollandaise',                       sizes:[{name:'Portion',price:11.50}], tags:['Hähnchen'] },

  // Penne
  { id:'72',   number:'72',   category:'nudeln', emoji:'🍝', name:'Penne Diavolo',              description:'Mit Paprika, Zwiebeln, Peperoni, Tomatensauce',                          sizes:[{name:'Portion',price:9.00}],  tags:['Vegetarisch','Scharf'], isVegetarian:true, isSpicy:true },
  { id:'73',   number:'73',   category:'nudeln', emoji:'🍝', name:'Penne Milano',               description:'Mit Hähnchenfleisch, grünem Pfeffer, Sahnesauce',                        sizes:[{name:'Portion',price:11.00}], tags:['Hähnchen'] },
  { id:'73a',  number:'73a',  category:'nudeln', emoji:'🍝', name:'Penne Amsterdam',            description:'Mit Hähnchenfleisch, grünem Pfeffer, Hollandaise',                       sizes:[{name:'Portion',price:11.00}], tags:['Hähnchen'] },
  { id:'74',   number:'74',   category:'nudeln', emoji:'🍝', name:'Penne Provinciale',          description:'Champignons, Spinat, Zwiebeln, Knoblauch, Tomatensauce',                 sizes:[{name:'Portion',price:10.00}], tags:['Vegetarisch'], isVegetarian:true },
  { id:'74a',  number:'74a',  category:'nudeln', emoji:'🍝', name:'Gebratene Penne Hähnchen',   description:'Hähnchenfleisch, Champignons, Paprika, scharf, Knoblauch',               sizes:[{name:'Portion',price:13.00}], tags:['Hähnchen','Scharf'], isSpicy:true },
  { id:'74b',  number:'74b',  category:'nudeln', emoji:'🍝', name:'Gebratene Penne Lachs',      description:'Lachs, Krabben, Champignons, Paprika, scharf, Knoblauch',               sizes:[{name:'Portion',price:14.00}], tags:['Fisch','Scharf'], isSpicy:true },

  // Tortellini
  { id:'75',   number:'75',   category:'nudeln', emoji:'🍝', name:'Tortellini Nonna',           description:'Mit Fleischsauce',                                                        sizes:[{name:'Portion',price:9.00}],  tags:['Fleisch'] },
  { id:'76',   number:'76',   category:'nudeln', emoji:'🍝', name:'Tortellini Italia',          description:'Mit Schinken, Broccoli, Zwiebeln, Sahnesauce',                           sizes:[{name:'Portion',price:10.00}], tags:['Fleisch'] },
  { id:'77',   number:'77',   category:'nudeln', emoji:'🍝', name:'Tortellini Della Casa',      description:'Mit Schinken, Champignons, Sahnesauce',                                  sizes:[{name:'Portion',price:10.00}], tags:['Fleisch'] },
  { id:'78',   number:'78',   category:'nudeln', emoji:'🍝', name:'Tortellini Alla Panna',      description:'Mit Schinken, Käse, Sahnesauce',                                         sizes:[{name:'Portion',price:9.50}],  tags:['Fleisch'] },
  { id:'79',   number:'79',   category:'nudeln', emoji:'🍝', name:'Tortellini Speziale',        description:'Mit Spinat, Champignons, Knoblauch, Peperoni, Sahnesauce',               sizes:[{name:'Portion',price:10.00}], tags:['Vegetarisch'], isVegetarian:true },

  // Tagliatelle
  { id:'80',   number:'80',   category:'nudeln', emoji:'🍝', name:'Tagliatelle 4 Formaggi',     description:'Mit 4 verschiedenen Käsesorten',                                          sizes:[{name:'Portion',price:9.50}],  tags:['Vegetarisch'], isVegetarian:true },
  { id:'81',   number:'81',   category:'nudeln', emoji:'🍝', name:'Tagliatelle al Salmone',     description:'Mit Lachs, Knoblauch, Sahnesauce',                                       sizes:[{name:'Portion',price:12.00}], tags:['Fisch'] },
  { id:'82',   number:'82',   category:'nudeln', emoji:'🍝', name:'Tagliatelle Enzo',           description:'Mit Schinken, Broccoli, Zwiebeln, Tomatensahnesauce',                    sizes:[{name:'Portion',price:9.50}],  tags:['Fleisch'] },
  { id:'83',   number:'83',   category:'nudeln', emoji:'🍝', name:'Tagliatelle Pasta',          description:'Mit Krabben, Curry, Knoblauch, Sahnesauce',                              sizes:[{name:'Portion',price:11.00}], tags:['Fisch'] },
  { id:'84',   number:'84',   category:'nudeln', emoji:'🍝', name:'Tagliatelle Milano',         description:'Mit Hähnchenfleisch, Pfifferlingen, Zwiebeln, Tomatensahnesauce',        sizes:[{name:'Portion',price:11.00}], tags:['Hähnchen'] },
  { id:'84a',  number:'84a',  category:'nudeln', emoji:'🍝', name:'Tagliatelle Spinaci',        description:'Gebratene Nudeln, Spinat, Champignons, Zwiebeln, Knoblauch, scharf',     sizes:[{name:'Portion',price:12.00}], tags:['Vegetarisch','Scharf'], isVegetarian:true, isSpicy:true },
  { id:'84b',  number:'84b',  category:'nudeln', emoji:'🍝', name:'Gebratene Tagliatelle Hähnchen', description:'Hähnchenfleisch, Champignons, Paprika, scharf, Knoblauch',          sizes:[{name:'Portion',price:13.00}], tags:['Hähnchen','Scharf'], isSpicy:true },
  { id:'84c',  number:'84c',  category:'nudeln', emoji:'🍝', name:'Gebratene Tagliatelle Lachs', description:'Lachs, Krabben, Champignons, Paprika, scharf, Knoblauch',              sizes:[{name:'Portion',price:14.00}], tags:['Fisch','Scharf'], isSpicy:true },

  // Gnocchi
  { id:'85',   number:'85',   category:'nudeln', emoji:'🍝', name:'Gnocchi Gorgonzola',         description:'Mit Gorgonzolasauce',                                                    sizes:[{name:'Portion',price:10.00}], tags:['Vegetarisch'], isVegetarian:true },
  { id:'86',   number:'86',   category:'nudeln', emoji:'🍝', name:'Gnocchi Broccoli',           description:'In Tomatensahnesauce',                                                   sizes:[{name:'Portion',price:10.00}], tags:['Vegetarisch'], isVegetarian:true },
  { id:'87',   number:'87',   category:'nudeln', emoji:'🍝', name:'Gnocchi Bolognese',          description:'In Fleischsauce',                                                        sizes:[{name:'Portion',price:9.50}],  tags:['Fleisch'] },
  { id:'88',   number:'88',   category:'nudeln', emoji:'🍝', name:'Gnocchi Spinaci',            description:'Mit Spinat, Knoblauch in Sahnesauce',                                    sizes:[{name:'Portion',price:10.00}], tags:['Vegetarisch'], isVegetarian:true },
  { id:'88a',  number:'88a',  category:'nudeln', emoji:'🍝', name:'Gnocchi Amsterdam',          description:'Mit Spinat, Knoblauch und Hollandaise',                                  sizes:[{name:'Portion',price:11.00}], tags:['Vegetarisch'], isVegetarian:true },
  { id:'88b',  number:'88b',  category:'nudeln', emoji:'🍝', name:'Gnocchi Rotterdam',          description:'Mit Hähnchen, Hollandaise, Sahnesauce, Knoblauch',                       sizes:[{name:'Portion',price:12.00}], tags:['Hähnchen'] },
  { id:'88c',  number:'88c',  category:'nudeln', emoji:'🍝', name:'Gnocchi Salmone',            description:'Mit Lachs, Spinat, Sahnesauce, Knoblauch',                               sizes:[{name:'Portion',price:13.50}], tags:['Fisch'] },

  // ═══════════════════════════════════════════════════════
  // AL FORNO
  // ═══════════════════════════════════════════════════════
  { id:'89',   number:'89',   category:'alforno', emoji:'🫙', name:'Lasagne',                   description:'Geschichtete Nudeln mit Fleisch und Bechamelsauce',                      sizes:[{name:'Portion',price:9.50}],  tags:['Fleisch','Klassiker'] },
  { id:'90',   number:'90',   category:'alforno', emoji:'🫙', name:'Lasagne La Luna',            description:'Mit Mozzarella, Spinat, Knoblauch, Peperoni',                           sizes:[{name:'Portion',price:11.00}], tags:['Vegetarisch'], isVegetarian:true },
  { id:'91',   number:'91',   category:'alforno', emoji:'🫙', name:'Lasagne Milano',             description:'Mit Hähnchenbrustfilet, Ananas, Curry',                                 sizes:[{name:'Portion',price:11.50}], tags:['Hähnchen'] },
  { id:'92',   number:'92',   category:'alforno', emoji:'🫙', name:'Tris di Pasta',              description:'Drei verschiedene Nudelsorten mit 3 verschiedenen Saucen',               sizes:[{name:'Portion',price:10.50}], tags:['Fleisch'] },
  { id:'93',   number:'93',   category:'alforno', emoji:'🫙', name:'Tris di Pasta Vegetarisch',  description:'Mit Broccoli oder Spinat',                                               sizes:[{name:'Portion',price:11.00}], tags:['Vegetarisch'], isVegetarian:true },
  { id:'94',   number:'94',   category:'alforno', emoji:'🫙', name:'Tortellini al Forno',        description:'Gefüllte Nudeln, Schinken, Champignons, Fleischsauce',                  sizes:[{name:'Portion',price:11.00}], tags:['Fleisch'] },
  { id:'95',   number:'95',   category:'alforno', emoji:'🫙', name:'Tortellini al Broccoli',     description:'Schinken, Broccoli, Sahnesauce',                                        sizes:[{name:'Portion',price:11.00}], tags:['Fleisch'] },
  { id:'96',   number:'96',   category:'alforno', emoji:'🫙', name:'Tortellini della Casa',      description:'Schinken, Fleischsauce, gekochtes Ei',                                  sizes:[{name:'Portion',price:10.50}], tags:['Fleisch'] },
  { id:'97',   number:'97',   category:'alforno', emoji:'🫙', name:'Penna alla Maria',           description:'Schinken, Spinat in Gorgonzolasahnesauce',                              sizes:[{name:'Portion',price:10.50}], tags:['Fleisch'] },
  { id:'98',   number:'98',   category:'alforno', emoji:'🫙', name:'Rigatoni Siciliana',         description:'Schinken, Broccoli in Gorgonzolasahnesauce',                            sizes:[{name:'Portion',price:10.50}], tags:['Fleisch'] },
  { id:'99',   number:'99',   category:'alforno', emoji:'🫙', name:'Penne Gratinate',            description:'Schinken, Champignons, Fleischsauce',                                   sizes:[{name:'Portion',price:10.50}], tags:['Fleisch'] },
  { id:'99a',  number:'99a',  category:'alforno', emoji:'🫙', name:'Penne Tonno',                description:'Thunfisch, Mais, Tomatensahnesauce, Knoblauch',                         sizes:[{name:'Portion',price:12.00}], tags:['Fisch'] },
  { id:'100',  number:'100',  category:'alforno', emoji:'🫙', name:'Rigatoni Polo Hawaii',       description:'Mit Currysauce, Hähnchen, Ananas',                                      sizes:[{name:'Portion',price:12.50}], tags:['Hähnchen'] },
  { id:'100b', number:'100b', category:'alforno', emoji:'🫙', name:'Rigatoni Polo II',           description:'Hähnchenbrustfilet, Spinat, Tomatensahnesauce, Knoblauch',              sizes:[{name:'Portion',price:12.50}], tags:['Hähnchen'] },
  { id:'100d', number:'100d', category:'alforno', emoji:'🫙', name:'Penne Krabben',              description:'Krabben, Spinat, Tomatensahnesauce, Knoblauch',                         sizes:[{name:'Portion',price:12.50}], tags:['Fisch'] },
  { id:'100e', number:'100e', category:'alforno', emoji:'🫙', name:'Penne Polo',                 description:'Hähnchenbrustfilet, Champignons, Tomatensahnesauce, Knoblauch',         sizes:[{name:'Portion',price:12.50}], tags:['Hähnchen'] },

  // ═══════════════════════════════════════════════════════
  // HÄHNCHEN
  // ═══════════════════════════════════════════════════════
  { id:'101',  number:'101',  category:'haehnchen', emoji:'🍗', name:'Pollo al Pepe',           description:'Hähnchenbrustfilet, grünem Pfeffer in Sahnesauce',                        sizes:[{name:'Portion',price:13.00}], tags:['Hähnchen'] },
  { id:'102',  number:'102',  category:'haehnchen', emoji:'🍗', name:'Pollo al Funghi',          description:'Hähnchenbrustfilet mit Champignons in Sahnesauce',                       sizes:[{name:'Portion',price:13.00}], tags:['Hähnchen'] },
  { id:'102a', number:'102a', category:'haehnchen', emoji:'🍗', name:'Pollo al Funghi Hollandaise', description:'Hähnchenbrustfilet mit Champignons, Sahnesauce und Hollandaise',    sizes:[{name:'Portion',price:13.50}], tags:['Hähnchen'] },
  { id:'103',  number:'103',  category:'haehnchen', emoji:'🍗', name:'Pollo Hawaii',             description:'Hähnchenbrustfilet mit Ananas-Currysauce',                               sizes:[{name:'Portion',price:13.00}], tags:['Hähnchen','Beliebt'] },
  { id:'103a', number:'103a', category:'haehnchen', emoji:'🍗', name:'Pollo Hawaii Hollandaise', description:'Hähnchenbrustfilet mit Ananas-Currysauce und Hollandaise',              sizes:[{name:'Portion',price:13.50}], tags:['Hähnchen'] },
  { id:'104',  number:'104',  category:'haehnchen', emoji:'🍗', name:'Pollo alla Zingara',       description:'Hähnchenbrustfilet mit Paprika, Zwiebeln, Tomatensauce',                sizes:[{name:'Portion',price:13.00}], tags:['Hähnchen','Scharf'], isSpicy:true },
  { id:'105',  number:'105',  category:'haehnchen', emoji:'🍗', name:'Pollo Milano',             description:'Hähnchenbrustfilet mit Krabben in Sahnesauce',                           sizes:[{name:'Portion',price:14.00}], tags:['Hähnchen','Fisch'] },
  { id:'106',  number:'106',  category:'haehnchen', emoji:'🍗', name:'Pollo al Gorgonzola',      description:'Hähnchenbrustfilet mit Gorgonzolasauce',                                sizes:[{name:'Portion',price:13.00}], tags:['Hähnchen'] },

  // ═══════════════════════════════════════════════════════
  // SCHNITZEL
  // ═══════════════════════════════════════════════════════
  { id:'107',  number:'107',  category:'schnitzel', emoji:'🥩', name:'Schnitzel',                description:'Mit frischer Zitrone',                                                    sizes:[{name:'Portion',price:11.50}], tags:['Fleisch','Klassiker'] },
  { id:'108',  number:'108',  category:'schnitzel', emoji:'🥩', name:'Jägerschnitzel',           description:'Mit Champignons und Sahne',                                               sizes:[{name:'Portion',price:13.00}], tags:['Fleisch'] },
  { id:'108a', number:'108a', category:'schnitzel', emoji:'🥩', name:'Jägerschnitzel Hollandaise', description:'Mit Champignons und Hollandaise',                                     sizes:[{name:'Portion',price:13.50}], tags:['Fleisch'] },
  { id:'109',  number:'109',  category:'schnitzel', emoji:'🥩', name:'Zigeunerschnitzel',        description:'Mit Zigeunersauce',                                                      sizes:[{name:'Portion',price:13.00}], tags:['Fleisch','Scharf'], isSpicy:true },
  { id:'110',  number:'110',  category:'schnitzel', emoji:'🥩', name:'Bolognese Schnitzel',      description:'Mit Schinken und Käse überbacken',                                       sizes:[{name:'Portion',price:13.50}], tags:['Fleisch'] },
  { id:'111',  number:'111',  category:'schnitzel', emoji:'🥩', name:'Hawaii Schnitzel',         description:'Mit Schinken, Ananas und Käse überbacken',                               sizes:[{name:'Portion',price:13.00}], tags:['Fleisch'] },
  { id:'111a', number:'111a', category:'schnitzel', emoji:'🥩', name:'Hawaii Schnitzel Hollandaise', description:'Mit Schinken, Ananas und Hollandaise überbacken',                  sizes:[{name:'Portion',price:14.00}], tags:['Fleisch'] },
  { id:'112',  number:'112',  category:'schnitzel', emoji:'🥩', name:'Schnitzel Gamberi',        description:'Mit Krabben, Knoblauch, Krabbensauce',                                  sizes:[{name:'Portion',price:14.50}], tags:['Fleisch','Fisch'] },
  { id:'113',  number:'113',  category:'schnitzel', emoji:'🥩', name:'Schnitzel Spargel',        description:'Schinken, Spargel, Sahne, mit Käse überbacken',                         sizes:[{name:'Portion',price:13.50}], tags:['Fleisch'] },
  { id:'113a', number:'113a', category:'schnitzel', emoji:'🥩', name:'Schnitzel Spargel Hollandaise', description:'Schinken, Spargel und Hollandaise mit Käse überbacken',           sizes:[{name:'Portion',price:14.00}], tags:['Fleisch'] },
  { id:'114',  number:'114',  category:'schnitzel', emoji:'🥩', name:'Schnitzel al Pepe',        description:'Mit grünem Pfeffer, Sahne',                                             sizes:[{name:'Portion',price:13.00}], tags:['Fleisch'] },
  { id:'114a', number:'114a', category:'schnitzel', emoji:'🥩', name:'Pfeffer Schnitzel',        description:'Mit grünem Pfeffer, Broccoli, Hollandaise, Knoblauch',                  sizes:[{name:'Portion',price:13.50}], tags:['Fleisch'] },
  { id:'115',  number:'115',  category:'schnitzel', emoji:'🥩', name:'Schnitzel Gambaretti',     description:'Mit Pfifferlingen in Sahnesauce',                                        sizes:[{name:'Portion',price:13.00}], tags:['Fleisch'] },
  { id:'115a', number:'115a', category:'schnitzel', emoji:'🥩', name:'Schnitzel Pfifferlinge',   description:'Mit Pfifferlingen, Champignons, Hollandaise, Knoblauch',                sizes:[{name:'Portion',price:13.50}], tags:['Fleisch'] },
  { id:'116',  number:'116',  category:'schnitzel', emoji:'🥩', name:'Schnitzel Spinaci',        description:'Mit Spinat, Sahnesauce und Käse überbacken',                            sizes:[{name:'Portion',price:13.50}], tags:['Fleisch'] },
  { id:'116a', number:'116a', category:'schnitzel', emoji:'🥩', name:'Schnitzel Broccoli',       description:'Mit Schinken, Broccoli, Hollandaise und Käse überbacken',               sizes:[{name:'Portion',price:14.00}], tags:['Fleisch'] },
  { id:'117',  number:'117',  category:'schnitzel', emoji:'🥩', name:'Schnitzel Gorgonzola',     description:'Mit Gorgonzolasauce',                                                    sizes:[{name:'Portion',price:13.00}], tags:['Fleisch'] },
  { id:'117a', number:'117a', category:'schnitzel', emoji:'🥩', name:'Zwiebelschnitzel',         description:'Mit gebratenen Zwiebeln',                                                sizes:[{name:'Portion',price:13.00}], tags:['Fleisch'] },
  { id:'117b', number:'117b', category:'schnitzel', emoji:'🥩', name:'Schnitzel Milano',         description:'Mit Krabben, Pilzen, Knoblauch in Tomaten-Sahnesauce',                  sizes:[{name:'Portion',price:14.00}], tags:['Fleisch','Fisch'] },

  // ═══════════════════════════════════════════════════════
  // FINGERFOODS
  // ═══════════════════════════════════════════════════════
  { id:'121',  number:'121',  category:'fingerfoods', emoji:'🍟', name:'Chicken Nuggets 6 Stück',        description:'6 Stück mit 1 Sauce',                              sizes:[{name:'6 Stück',price:6.50}],   tags:['Hähnchen'] },
  { id:'121a', number:'121a', category:'fingerfoods', emoji:'🍟', name:'Chicken Nuggets 6 Stück + Pommes', description:'6 Stück mit 1 Sauce und Pommes',                sizes:[{name:'Portion',price:9.00}],   tags:['Hähnchen'] },
  { id:'122',  number:'122',  category:'fingerfoods', emoji:'🍟', name:'Chicken Nuggets 9 Stück',        description:'9 Stück mit 2 Saucen',                             sizes:[{name:'9 Stück',price:7.50}],   tags:['Hähnchen'] },
  { id:'122a', number:'122a', category:'fingerfoods', emoji:'🍟', name:'Chicken Nuggets 9 + Pommes',      description:'9 Stück mit 2 Saucen und Pommes',                 sizes:[{name:'Portion',price:10.50}],  tags:['Hähnchen'] },
  { id:'123',  number:'123',  category:'fingerfoods', emoji:'🍟', name:'Chicken Nuggets 20 Stück',       description:'20 Stück mit 3 Saucen',                            sizes:[{name:'20 Stück',price:11.50}], tags:['Hähnchen'] },
  { id:'123a', number:'123a', category:'fingerfoods', emoji:'🍟', name:'Nuggets Jäger + Pommes',         description:'9 Stück mit Jägersauce und Pommes',                sizes:[{name:'Portion',price:12.00}],  tags:['Hähnchen'] },
  { id:'123b', number:'123b', category:'fingerfoods', emoji:'🍟', name:'Nuggets Zigeuner + Pommes',      description:'9 Stück mit Zigeunersauce und Pommes',             sizes:[{name:'Portion',price:12.00}],  tags:['Hähnchen','Scharf'], isSpicy:true },
  { id:'124',  number:'124',  category:'fingerfoods', emoji:'🍟', name:'Pommes Frites',                  description:'Knusprige Pommes Frites',                          sizes:[{name:'Portion',price:4.00}],   tags:['Vegetarisch'], isVegetarian:true },
  { id:'124b', number:'124b', category:'fingerfoods', emoji:'🍟', name:'Kroketten',                      description:'Knusprige Kroketten',                              sizes:[{name:'Portion',price:4.50}],   tags:['Vegetarisch'], isVegetarian:true },
  { id:'125',  number:'125',  category:'fingerfoods', emoji:'🍟', name:'Pommes Spezial',                 description:'Große Pommes, Zwiebel, Curryketchup, Mayo',        sizes:[{name:'Portion',price:5.00}],   tags:['Vegetarisch'], isVegetarian:true },
  { id:'125a', number:'125a', category:'fingerfoods', emoji:'🍟', name:'Chicken Wings 6 + Pommes',       description:'6 Stück Chicken Wings, Pommes, Sauce',             sizes:[{name:'Portion',price:10.00}],  tags:['Hähnchen'] },
  { id:'125b', number:'125b', category:'fingerfoods', emoji:'🍟', name:'Chicken Wings 9 + Pommes',       description:'9 Stück Chicken Wings, Pommes, Sauce',             sizes:[{name:'Portion',price:11.00}],  tags:['Hähnchen'] },

  // ═══════════════════════════════════════════════════════
  // FISCH
  // ═══════════════════════════════════════════════════════
  { id:'126',  number:'126',  category:'fisch', emoji:'🐟', name:'Calamari Fritti',             description:'Tintenfischringe mit hausgemachter Remouladensauce, Pommes',              sizes:[{name:'Portion',price:13.00}], tags:['Fisch'] },
  { id:'127',  number:'127',  category:'fisch', emoji:'🦐', name:'Scampi Livornese',            description:'Große Garnelen, Tomatensauce, Knoblauch, Pommes',                         sizes:[{name:'Portion',price:16.50}], tags:['Fisch'] },
  { id:'128',  number:'128',  category:'fisch', emoji:'🦐', name:'Scampi Cafe Paris',           description:'Große Garnelen, frischer Knoblauch in Sahnesauce, Pommes',               sizes:[{name:'Portion',price:16.50}], tags:['Fisch'] },
  { id:'129',  number:'129',  category:'fisch', emoji:'🦐', name:'Scampi al Pepe',              description:'Große Garnelen, grünem Pfeffer in Sahnesauce, Pommes',                   sizes:[{name:'Portion',price:16.50}], tags:['Fisch'] },
  { id:'129b', number:'129b', category:'fisch', emoji:'🐟', name:'Seelachs Milano',             description:'Seelachs paniert mit Pommes oder Kroketten und Salatbeilage',            sizes:[{name:'Portion',price:12.50}], tags:['Fisch'] },
  { id:'129c', number:'129c', category:'fisch', emoji:'🐟', name:'Seelachs Jägersauce',         description:'Seelachs paniert mit Pommes, Jägersauce und Salatbeilage',               sizes:[{name:'Portion',price:13.00}], tags:['Fisch'] },
  { id:'129d', number:'129d', category:'fisch', emoji:'🐟', name:'Seelachs Zigeunersauce',      description:'Seelachs paniert mit Pommes, Zigeunersauce und Salatbeilage',            sizes:[{name:'Portion',price:13.00}], tags:['Fisch','Scharf'], isSpicy:true },

  // ═══════════════════════════════════════════════════════
  // REIS
  // ═══════════════════════════════════════════════════════
  { id:'134',  number:'134',  category:'reis', emoji:'🍚', name:'Risotto Vegetarisch',           description:'Reis mit Broccoli, Erbsen, Möhren, Knoblauch, scharf',                   sizes:[{name:'Portion',price:11.00}], tags:['Vegetarisch','Scharf'], isVegetarian:true, isSpicy:true },
  { id:'135',  number:'135',  category:'reis', emoji:'🍚', name:'Risotto Pollo Milano',          description:'Reis, Hähnchenbrustfilet, Champignons in Sahnesauce',                    sizes:[{name:'Portion',price:11.00}], tags:['Hähnchen'] },
  { id:'135a', number:'135a', category:'reis', emoji:'🍚', name:'Gebratener Reis Hähnchen',      description:'Mit Hähnchenfleisch, Champignons, Broccoli, Knoblauch, scharf',          sizes:[{name:'Portion',price:11.00}], tags:['Hähnchen','Scharf'], isSpicy:true },
  { id:'135b', number:'135b', category:'reis', emoji:'🍚', name:'Gebratener Reis Lachs',         description:'Mit Lachs, Krabben, Knoblauch, scharf',                                  sizes:[{name:'Portion',price:13.00}], tags:['Fisch','Scharf'], isSpicy:true },
  { id:'135c', number:'135c', category:'reis', emoji:'🍚', name:'Gebratener Reis Vegetarisch',   description:'Mit Champignons, Broccoli, Kapern, Knoblauch, scharf',                   sizes:[{name:'Portion',price:10.50}], tags:['Vegetarisch','Scharf'], isVegetarian:true, isSpicy:true },
  { id:'136',  number:'136',  category:'reis', emoji:'🍚', name:'Risotto Mexico',                description:'Reis in Tomatensauce, Filetspitzen, Zwiebeln, rote Bohnen, Paprika',     sizes:[{name:'Portion',price:11.00}], tags:['Fleisch','Scharf'], isSpicy:true },
  { id:'136a', number:'136a', category:'reis', emoji:'🍚', name:'Risotto Mexico II',             description:'Gebratener Reis mit Hähnchen, Paprika, Knoblauch, scharf',               sizes:[{name:'Portion',price:11.00}], tags:['Hähnchen','Scharf'], isSpicy:true },
  { id:'137',  number:'137',  category:'reis', emoji:'🍚', name:'Risotto Cantarelli',            description:'Reis, Filetspitzen, Pfifferlinge in Sahnesauce, scharfe Sauce',          sizes:[{name:'Portion',price:11.00}], tags:['Fleisch','Scharf'], isSpicy:true },
  { id:'138',  number:'138',  category:'reis', emoji:'🍚', name:'Pollo dello Chef',              description:'Knusprig gebratene Hähnchenbruststreifen, speziell gewürzt, Reis & Salat', sizes:[{name:'Portion',price:13.00}], tags:['Hähnchen'] },
  { id:'138a', number:'138a', category:'reis', emoji:'🍚', name:'Pollo dello Chef II',           description:'Knusprig gebratene Hähnchenbruststreifen, Paprika, Reis oder Pommes',    sizes:[{name:'Portion',price:14.00}], tags:['Hähnchen'] },

  // ═══════════════════════════════════════════════════════
  // GETRÄNKE
  // ═══════════════════════════════════════════════════════
  { id:'g01',  number:'-',    category:'getraenke', emoji:'🥤', name:'Fanta Orange',             description:'Erfrischendes Fanta Orange',                                              sizes:[{name:'0,33l',price:2.00},{name:'1,0l',price:3.00}],  tags:['Kalt'] },

  // ═══════════════════════════════════════════════════════
  // ANGEBOTE
  // ═══════════════════════════════════════════════════════
  { id:'ang1',  number:'-',   category:'angebote', emoji:'🎁', name:'Top Angebot',               description:'2 Pizzableche, 1 Nudelblech, 1 Lasagneblech, 1 Salatplatte, 4x Pizzabrötchen mit Butter, 3 Fl. Getränke', sizes:[{name:'Komplett',price:150.00}], tags:['Gruppe'] },
  { id:'ang2',  number:'-',   category:'angebote', emoji:'🎁', name:'Pizzablech Salami & Schinken', description:'Pizzablech mit Salami und Schinken',                                  sizes:[{name:'Blech',price:30.00}], tags:['Gruppe'] },
  { id:'ang3',  number:'-',   category:'angebote', emoji:'🎁', name:'Pizzablech mit Champignons',   description:'Salami, Schinken, Pilze',                                            sizes:[{name:'Blech',price:34.00}], tags:['Gruppe'] },
  { id:'ang4',  number:'-',   category:'angebote', emoji:'🎁', name:'Pizzablech Spezial',           description:'Salami, Schinken, Thunfisch, Champignons, Paprika',                  sizes:[{name:'Blech',price:37.00}], tags:['Gruppe'] },
  { id:'ang5',  number:'-',   category:'angebote', emoji:'🎁', name:'Pizzablech Frutti di Mare',    description:'Thunfisch, Lachs, Krabben, Knoblauch, scharf',                        sizes:[{name:'Blech',price:45.00}], tags:['Gruppe','Fisch'] },
  { id:'ang6',  number:'-',   category:'angebote', emoji:'🎁', name:'Nudelblech Lasagne',           description:'Großes Lasagneblech',                                                sizes:[{name:'Blech',price:35.50}], tags:['Gruppe'] },
  { id:'ang7',  number:'-',   category:'angebote', emoji:'🎁', name:'Nudelblech Maccheroni',        description:'Maccheroni al Forno',                                                sizes:[{name:'Blech',price:35.50}], tags:['Gruppe'] },
  { id:'ang8',  number:'-',   category:'angebote', emoji:'🎁', name:'Nudelblech Tortellini',        description:'Tortellini al Forno',                                                sizes:[{name:'Blech',price:37.00}], tags:['Gruppe'] },
  { id:'ang9',  number:'-',   category:'angebote', emoji:'🎁', name:'Angebot 2 — 3 Gerichte',      description:'3 Gerichte nach Wahl, 3 gr. Pizzen (außer Hollandaise/Cheesy/BBQ/Lachs/Parmesan) oder Nudeln, 1 Salat, 1 Fl. Getränk', sizes:[{name:'Komplett',price:34.00}], tags:['Gruppe'] },
];
