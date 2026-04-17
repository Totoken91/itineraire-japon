import React, { useState } from 'react';

const REGIONS = {
  tokyo:   { label: 'Tokyo',    kanji: '東京',   color: '#FF2D55', glow: 'rgba(255,45,85,0.35)'  },
  nagano:  { label: 'Nagano',   kanji: '長野',   color: '#34C759', glow: 'rgba(52,199,89,0.35)'  },
  kyoto:   { label: 'Kyoto',    kanji: '京都',   color: '#FF9500', glow: 'rgba(255,149,0,0.35)'  },
  daytrip: { label: 'Day Trip', kanji: '日帰り', color: '#5E5CE6', glow: 'rgba(94,92,230,0.35)' },
};

const DAYS_DATA = [
  { day: 1, date: '27 mai', region: 'tokyo', title: 'Arrivée à Tokyo', items: [
    { type: 'transport', text: 'Atterrissage Narita ou Haneda', detail: 'Achète une carte Suica/Pasmo au kiosque — indispensable' },
    { type: 'hotel',     text: 'Check-in à Shinjuku ou Shibuya', detail: 'Pose les valises, douche, combat le jetlag' },
    { type: 'food',      text: 'Ramen tranquille', detail: 'Ichiran ou un shop de quartier, rien de trop ambitieux' },
    { type: 'night',     text: 'Balade à Kabukicho', detail: 'Néons partout, vibe Blade Runner. Photo sous le signe rouge du north entrance' },
  ]},
  { day: 2, date: '28 mai', region: 'tokyo', title: 'Shibuya × Shinjuku', items: [
    { type: 'spot',     text: 'Shibuya Crossing + Shibuya Sky', detail: 'Rooftop 229m, ouvert jour et nuit. Avant coucher du soleil. ¥2,500', note: '⭐ spot iconique' },
    { type: 'spot',     text: 'Meiji Jingu (forêt)', detail: 'Sanctuaire shinto dans 70ha de forêt. Calme surprenant après Shibuya' },
    { type: 'shopping', text: 'Harajuku — Takeshita + Cat Street', detail: 'Takeshita = kawaii, Cat Street = streetwear adulte' },
    { type: 'food',     text: 'Yakiniku à Shinjuku', detail: 'Gyukaku Omekaido (B1F Kotakibashi Pacifica, 7-10-18 Nishi-Shinjuku) — AYCE ~¥4,000' },
    { type: 'night',    text: 'Golden Gai (drinks)', detail: '~200 micro-bars empilés. Regardez les pancartes pour savoir quels acceptent les étrangers' },
  ]},
  { day: 3, date: '29 mai', region: 'tokyo', title: 'PÈLERINAGE ANIME — Your Name', items: [
    { type: 'anime', text: 'Escalier de Suga Shrine 🎌', detail: '5 Sugacho, Shinjuku. LE escalier rouge où Taki et Mitsuha se retrouvent. 8min de Yotsuya-Sanchome (Marunouchi). Ils vendent des omamori Your Name', note: '⭐⭐⭐ THE spot' },
    { type: 'anime', text: 'National Art Center — Salon de Thé ROND', detail: 'Roppongi. Le café du date Taki/Okudera. 3e étage = meilleure vue. Ouvre 11h' },
    { type: 'anime', text: 'Pont piétonnier de Yotsuya', detail: 'Où Taki réalise ses sentiments. Spot discret mais magnifique' },
    { type: 'anime', text: 'Hijiri-bashi Bridge (Suzume)', detail: 'Ochanomizu Station. 4 Chome Kanda Surugadai. Pont de la course-poursuite dans Suzume no Tojimari' },
    { type: 'food',  text: 'Pause kissaten', detail: 'Entre deux spots, un café rétro pour reprendre' },
  ]},
  { day: 4, date: '30 mai', region: 'tokyo', title: 'PÈLERINAGE GHIBLI — Totoro', items: [
    { type: 'anime',     text: 'Ghibli Museum (Mitaka) 🎋', detail: '1-1-83 Shimorenjaku, Mitaka 181-0013. ¥1000. Ouvert 10-18h sauf mardi', note: '⚠️ RÉSERVE LE 10 MAI 10H JST via LAWSON' },
    { type: 'transport', text: 'JR Chuo Line → Mitaka', detail: '20min depuis Shinjuku. Bus Ghibli toutes les 15min ou 15min à pied' },
    { type: 'anime',     text: 'Forêt de Totoro (Sayama Hills)', detail: 'Inspiration de Mon Voisin Totoro. 30min-1h depuis Tokyo. Station Seibukyujo-Mae (Seibu Sayama Line)', note: 'Campagne pure' },
    { type: 'anime',     text: 'Kurosuke House 🏚️', detail: 'Ferme-musée au cœur de la forêt. Ouvert SEULEMENT mardi, mercredi, samedi. Totoro géant à l\'intérieur' },
    { type: 'spot',      text: 'Lac Sayama au coucher du soleil', detail: 'Vue sur Mt Fuji par temps clair' },
  ]},
  { day: 5, date: '31 mai', region: 'tokyo', title: 'Asakusa × Akihabara', items: [
    { type: 'spot',     text: 'Senso-ji Temple (tôt)', detail: 'Arrive avant 8h. Nakamise-dori avant l\'ouverture des shops' },
    { type: 'food',     text: 'Melonpan chez Kagetsudo', detail: 'Le meilleur melonpan de Tokyo, près de Senso-ji' },
    { type: 'shopping', text: 'Akihabara — retro gaming deep', detail: 'Super Potato (1-11-2 Sotokanda, F3-F5) + BEEP + Friends. F5 arcade ¥100/play' },
    { type: 'spot',     text: '@Home Café (Akihabara)', detail: '1-11-4 Sotokanda, 4F-7F Mitsuwa Bldg. Maid café le plus célèbre. ~¥1500' },
    { type: 'anime',    text: 'Radio Kaikan + Mandarake', detail: 'Temple absolu de la pop culture' },
  ]},
  { day: 6, date: '1 juin', region: 'tokyo', title: 'Vintage — Shimokita × Koenji', items: [
    { type: 'shopping', text: 'Flamingo Shimokitazawa', detail: '5-26-6 Daizawa, Setagaya. Vintage US mid-century depuis 2005. Néon flamant' },
    { type: 'shopping', text: 'New York Joe Exchange', detail: '3-26-4 Kitazawa. Ancien bathhouse, carrelage d\'origine. 1er dimanche du mois = moitié prix' },
    { type: 'shopping', text: 'Stick Out', detail: 'Tout à ¥800 (+10% taxe). 2F d\'un immeuble discret au sud de la station' },
    { type: 'food',     text: 'Kissaten à Shimokita', detail: 'Plein de petits cafés rétro dans les ruelles' },
    { type: 'transport',text: 'Train vers Koenji (10min)', detail: 'Version plus grunge et underground' },
    { type: 'shopping', text: 'Pal/Look arcades + Atlantis Vintage', detail: 'Spank!, Don Don Down on Wednesday (prix baissent chaque jour)' },
    { type: 'night',    text: 'JIROKICHI (live jazz)', detail: '3-7-3 Koenjiminami. Live house historique' },
  ]},
  { day: 7, date: '2 juin', region: 'tokyo', title: 'Coffee Zingaro × Speakeasies', items: [
    { type: 'food',     text: 'Coffee Zingaro (Nakano Broadway)', detail: 'Café Takashi Murakami. Tables = bornes arcade (Mario, Street Fighter). Flower coins ¥500. Cookies fleur Murakami. Horaires irréguliers, check IG', note: '⭐ absolu' },
    { type: 'shopping', text: 'Mandarake Galaxy Floor', detail: '2e étage Nakano Broadway — saint des saints retro gaming' },
    { type: 'food',     text: 'Fujun Kissa Dope', detail: 'Près de Coffee Zingaro. Kissaten rétro le plus authentique' },
    { type: 'pachinko', text: 'Pachinko / pachislot', detail: 'Salles de Kabukicho ou Akihabara. Bruit assourdissant, expérience en soi' },
    { type: 'night',    text: 'A10 (speakeasy Ebisu)', detail: '1-12-11 Ebisunishi Bios Bldg B1F. Entrée derrière casiers verts. 1000+ vinyles. 19h-3h. Cocktail "Feel Like a Cinema". ¥1100 cover', note: '⭐⭐ unique' },
    { type: 'night',    text: 'Alt: No Room for Squares', detail: 'Shimokitazawa. Porte secrète déguisée en distributeur Coca-Cola. Jazz, cocktails ¥1400-1600' },
  ]},
  { day: 8, date: '3 juin', region: 'tokyo', title: 'Derniers instants Tokyo', items: [
    { type: 'spot',     text: 'Marché Tsukiji (matin)', detail: 'Outer Market. Sushi petit-déj aux stands' },
    { type: 'spot',     text: 'teamLab Borderless ou Planets', detail: 'Réserve à l\'avance. Planets = marcher dans l\'eau, Borderless = immersif' },
    { type: 'spot',     text: 'Odaiba au sunset', detail: 'Rainbow Bridge + statue Liberté + Gundam Unicorn à DiverCity. Cyberpunk night' },
    { type: 'food',     text: 'Dîner Rokunen Yonkumi', detail: 'Assorti Shibuya 4F, 32-12 Udagawacho. Izakaya thème école primaire. Staff en prof, randoseru. ~¥3500' },
    { type: 'tip',      text: 'Prépare Nagano demain', detail: 'Azusa Limited Express de Shinjuku. Réserve ton siège' },
  ]},
  { day: 'FLEX', date: 'option', region: 'daytrip', title: '🗻 Day Trip — Hakone ou Kamakura', items: [
    { type: 'transport', text: 'HAKONE / Mt Fuji', detail: 'Bus + shinkansen retour ~¥12,000 (Klook) à ~¥24,500 (JTB). 5th Station + Ropeway + Lake Ashi cruise' },
    { type: 'tip',       text: 'VÉRIFIE LA MÉTÉO la veille', detail: 'Mt Fuji souvent caché en tsuyu. Si ciel couvert, bascule sur Kamakura' },
    { type: 'anime',     text: 'KAMAKURA (alt) — Slam Dunk crossing', detail: 'Kamakurakōkō-Mae Station (Enoden Line). 1-1 Koshigoe, Kamakura. Le passage à niveau face à la mer + Enoshima', note: '⭐ iconique' },
    { type: 'spot',      text: 'Great Buddha de Kamakura', detail: 'Bouddha bronze 13m' },
    { type: 'spot',      text: 'Enoshima Island', detail: 'Petite île reliée par pont. Vue Fuji depuis le haut' },
  ]},
  { day: 9, date: '4 juin', region: 'nagano', title: 'Transit → Matsumoto', items: [
    { type: 'transport', text: 'Azusa Express Shinjuku → Matsumoto', detail: '2h30-3h. Vue sur Alpes japonaises en chemin' },
    { type: 'hotel',     text: 'Check-in Matsumoto', detail: 'Dormy Inn Matsumoto recommandé — onsen naturel sur le toit' },
    { type: 'spot',      text: 'Château de Matsumoto 🏯', detail: 'Le "Crow Castle". Un des plus beaux originaux du Japon. 15min à pied de la gare' },
    { type: 'shopping',  text: 'Nakamachi Street', detail: 'Rue traditionnelle, maisons en bois noir, ateliers d\'artisans' },
    { type: 'food',      text: 'Soba local', detail: 'Nagano = soba country. Cherche "手打ち" (fait main)' },
  ]},
  { day: 10, date: '5 juin', region: 'nagano', title: 'Lake Suwa — Your Name IRL 🌊', items: [
    { type: 'transport', text: 'Train local → Kami-Suwa', detail: '20min. Paysage qui change vite' },
    { type: 'anime',     text: 'Lac Suwa (inspiration Itomori) 🎌', detail: 'LE lac qui a inspiré Itomori dans Your Name. Shinkai est né à Nagano', note: '⭐⭐ vibe absolue' },
    { type: 'spot',      text: 'MONTÉE VERS TATEISHI PARK ⛰️', detail: 'La montée à pied à travers ruelles résidentielles + rizières = scène d\'anime. 20-30min de marche', note: '⭐⭐⭐ must' },
    { type: 'spot',      text: 'Vue panoramique Tateishi Park', detail: 'LA vue d\'Itomori. Au coucher du soleil = irréel' },
    { type: 'food',      text: 'Déjeuner Kamisuwa', detail: 'Essaie le miso tendon (tempura sauce miso) — Suwa est famous pour le miso' },
    { type: 'spot',      text: 'Onsen pieds gratuit au bord du lac', detail: 'Près du Geyser Center. Parfait pour 21h' },
  ]},
  { day: 11, date: '6 juin', region: 'nagano', title: 'Campagne anime — Wasabi & rizières', items: [
    { type: 'spot',  text: 'Daio Wasabi Farm (Azumino)', detail: '10min taxi de Hotaka Station (JR Oito Line). 37 acres de wasabi alimentés par les Alpes. Moulin, promenade' },
    { type: 'food',  text: 'Glace wasabi à la ferme', detail: 'Étonnamment délicieuse' },
    { type: 'anime', text: 'Obasute Station (rizières) 🌾', detail: 'Une des "3 Great Train Views" du Japon. Platform surplombant plaine de Zenkoji. Switchback rare. Prends le Resort View Furusato si possible', note: 'Vibe Summer Wars' },
    { type: 'spot',  text: 'Shinshu Inagura Rice Terraces', detail: 'Classées parmi les 100 plus belles rizières du Japon' },
    { type: 'hotel', text: 'Retour Matsumoto (ou Nagano City)', detail: 'Selon itinéraire' },
  ]},
  { day: 12, date: '7 juin', region: 'nagano', title: 'Nagano City — Zenkoji', items: [
    { type: 'transport', text: 'Matsumoto → Nagano City', detail: 'Limited Express Shinano, 50min-1h' },
    { type: 'hotel',     text: 'Dormy Inn Nagano ⭐', detail: '1min de JR Nagano. Onsen sur le toit + sauna. Ramen gratuit 21h30-23h' },
    { type: 'spot',      text: 'Zenkoji Temple', detail: '1400 ans. Traverse le "kaidan meguri" (passage sombre sous l\'autel — clé du paradis)' },
    { type: 'spot',      text: 'Approche du temple', detail: 'Rue commerçante, artisans, sake, bouddhisme-goods' },
    { type: 'food',      text: 'Oyaki (spécialité Nagano)', detail: 'Petits pains vapeur fourrés aux légumes de montagne' },
  ]},
  { day: 13, date: '8 juin', region: 'nagano', title: 'Transit → Kyoto', items: [
    { type: 'transport', text: 'Nagano → Kyoto', detail: 'Via Nagoya (Shinano + Tokaido Shinkansen) ~4h' },
    { type: 'food',      text: 'Ekiben dans le train', detail: 'LE plaisir du train au Japon' },
    { type: 'hotel',     text: 'Check-in à Kyoto', detail: 'Zone Gion/Kawaramachi recommandée' },
    { type: 'night',     text: 'Balade Pontocho Alley', detail: 'Ruelle illuminée par lanternes rouges au bord de la Kamo. Old Japan pure' },
  ]},
  { day: 14, date: '9 juin', region: 'kyoto', title: 'Higashiyama Classic', items: [
    { type: 'spot', text: 'Kiyomizu-dera (tôt)', detail: 'Arrive à 7h. Temple ouvre à 6h. Évite les foules, lumière dorée' },
    { type: 'spot', text: 'Descente Sannenzaka/Ninenzaka', detail: 'Rues Edo préservées. Céramique, matcha, yatsuhashi' },
    { type: 'food', text: '% Arabica Higashiyama', detail: 'Café minimaliste iconique. Attente souvent longue' },
    { type: 'spot', text: 'Yasaka Shrine + Maruyama Park', detail: 'Centre spirituel de Gion' },
    { type: 'spot', text: 'Gion au coucher du soleil', detail: 'Hanamikoji Street — chance de croiser une geiko/maiko' },
  ]},
  { day: 15, date: '10 juin', region: 'kyoto', title: 'Kimono × Tea ceremony', items: [
    { type: 'spot',  text: 'Location kimono (matin)', detail: 'Maikoya Nishiki ou Yumeyakata. Habillage en 15min' },
    { type: 'spot',  text: 'Cérémonie du thé', detail: 'Maikoya combine kimono + tea au même lieu. ~¥8000-12000 package' },
    { type: 'spot',  text: 'Balade en kimono dans Gion', detail: 'Photos partout' },
    { type: 'anime', text: 'Nanzen-ji Suirokaku (K-ON!) 🎌', detail: 'Aqueduc en briques du temple Nanzenji — apparaît dans l\'opening de K-ON! saison 1' },
    { type: 'food',  text: 'Dîner kaiseki (optionnel)', detail: 'Plein culturel gastronomique' },
  ]},
  { day: 16, date: '11 juin', region: 'kyoto', title: 'Arashiyama — Bambous × Ghibli vibe', items: [
    { type: 'transport', text: 'Train vers Arashiyama', detail: 'JR San-in Line. Arrive à 8h pour bamboo grove sans foule' },
    { type: 'spot',     text: 'Bamboo Grove', detail: 'Tôt le matin = magique, midi = Disneyland' },
    { type: 'spot',     text: 'Tenryu-ji Temple', detail: 'Jardin UNESCO avec miroir d\'eau' },
    { type: 'anime',    text: 'Pont Togetsukyo (Rurouni Kenshin)', detail: 'Apparaît dans l\'opening de Rurouni Kenshin s2' },
    { type: 'food',     text: '% Arabica Arashiyama', detail: 'Au bord de la rivière — une des vues les plus stylées de l\'archipel' },
    { type: 'spot',     text: 'Monkey Park Iwatayama', detail: 'Montée 30min. Vue panoramique + macaque en liberté' },
    { type: 'spot',     text: 'Retour: randen tram', detail: 'Tram vintage à travers quartiers résidentiels magnifiques' },
  ]},
  { day: 17, date: '12 juin', region: 'kyoto', title: 'Fushimi Inari avant les foules', items: [
    { type: 'spot',     text: 'Fushimi Inari AVANT 7H', detail: 'Seule façon d\'avoir les torii pour toi. Monte jusqu\'au sommet (2-3h aller-retour)' },
    { type: 'food',     text: 'Petit-déj en bas', detail: 'Inari-sushi (tofu frit farci de riz) aux stands' },
    { type: 'spot',     text: 'Tofuku-ji Temple', detail: 'Jardin zen célèbre, peu touristique' },
    { type: 'food',     text: 'Smart Coffee (Teramachi Arcade)', detail: 'Kissaten rétro, hotcakes fluffy + egg sandwiches légendaires' },
    { type: 'shopping', text: 'Nishiki Market', detail: '"La cuisine de Kyoto". 400m de stands — pickles, tako-tamago, matcha' },
  ]},
  { day: 18, date: '13 juin', region: 'kyoto', title: 'Nord Kyoto — Kinkaku-ji & Ryoan-ji', items: [
    { type: 'spot',     text: 'Kinkaku-ji (Pavillon d\'Or)', detail: 'Préfère le matin quand le soleil touche l\'or' },
    { type: 'spot',     text: 'Ryoan-ji (zen)', detail: '15 pierres dont tu ne peux en voir que 14 simultanément' },
    { type: 'spot',     text: 'Daitoku-ji Complex', detail: 'Sous-temples zen bien moins touristiques. Jardins kare-sansui' },
    { type: 'food',     text: 'Shojin-ryori (cuisine bouddhiste)', detail: 'Dans un sous-temple — expérience unique' },
    { type: 'shopping', text: 'Aritsugu (Nishiki)', detail: 'Meilleurs couteaux de cuisine traditionnels. Petite pierre symbolique avec le cadeau (pour ne pas "couper l\'amitié")' },
    { type: 'shopping', text: 'Kamiji Kakimoto (washi)', detail: '54 Tokiwagicho, Nakagyo. Papier washi depuis 1845' },
  ]},
  { day: 19, date: '14 juin', region: 'kyoto', title: 'Philosopher\'s Path & Gion', items: [
    { type: 'spot',  text: 'Philosopher\'s Path (matin)', detail: 'Promenade 2km le long d\'un canal. En juin = hydrangeas en fleur' },
    { type: 'spot',  text: 'Ginkaku-ji (Pavillon d\'Argent)', detail: 'Plus sobre que Kinkaku-ji, jardin zen magnifique' },
    { type: 'food',  text: 'Inoda Coffee Honten', detail: 'Depuis 1940. Café européen-inspired, ambiance nostalgique' },
    { type: 'spot',  text: 'Kennin-ji Temple', detail: 'Plus vieux temple zen de Kyoto, plafond de dragons' },
    { type: 'night', text: 'Pontocho Alley', detail: 'Dîner dans un resto donnant sur la Kamo. Old Japan' },
  ]},
  { day: 20, date: '15 juin', region: 'kyoto', title: 'Uji — matcha + KyoAni', items: [
    { type: 'transport', text: 'Train Kyoto → Uji', detail: '20min. JR Nara Line' },
    { type: 'food',      text: 'Matcha experience à Uji', detail: 'Capitale du matcha. Ateliers pour moudre le thé' },
    { type: 'anime',     text: 'Uji = Hibike! Euphonium 🎌', detail: 'Kyoto Animation est basé à Uji. Rivière, ponts, sanctuaires reconnaissables' },
    { type: 'spot',      text: 'Byodo-in Temple', detail: 'Le temple sur les pièces de 10 yens. Pavillon Phoenix sur l\'eau' },
    { type: 'food',      text: 'Glace matcha ultra concentrée', detail: 'Chez Itohkyuemon ou Nakamura Tokichi. Essaie les différents niveaux' },
  ]},
  { day: 21, date: '16 juin', region: 'kyoto', title: 'Dernière journée', items: [
    { type: 'shopping', text: 'Zohiko (lacquerware)', detail: 'La meilleure boutique de laque de Kyoto. 1er étage quasi un musée' },
    { type: 'shopping', text: 'Kyoto Handicraft Center', detail: '17 Enshoji-cho, Sakyo. 7 étages, tax-free' },
    { type: 'food',     text: 'Déjeuner Otafuku (Kawaramachi)', detail: 'Kissaten rétro pour s\'échapper du centre-ville' },
    { type: 'spot',     text: 'Promenade Gion', detail: 'Profite des ruelles sans carte' },
    { type: 'food',     text: 'Dîner d\'adieu — Pontocho', detail: 'Izakaya ou cuisine kyoto raffinée' },
    { type: 'spot',     text: 'Kamogawa au sunset', detail: 'Les terrasses sur la rivière en été — tradition kyoto absolue' },
  ]},
  { day: 22, date: '17 juin', region: 'kyoto', title: 'Retour 🛫', items: [
    { type: 'transport', text: 'Shinkansen vers aéroport', detail: 'Selon vol. Haneda/Narita = 3h shinkansen' },
    { type: 'tip',       text: 'Souvenirs à la gare', detail: 'Kyoto Station = galerie immense d\'omiyage' },
    { type: 'food',      text: 'Dernier ekiben', detail: 'Un bento shinkansen pour la route — le vrai adieu' },
  ]},
];

const HOTELS = {
  tokyo: [
    { tier: 'design', name: 'TRUNK(HOTEL)', area: 'Shibuya', price: '¥40,000-60,000', address: '5-31 Jingumae, Shibuya-ku, Tokyo', why: 'Boutique pionnier du "socialising". Lobby-bar électrique, design local-first, terrasse sur Cat Street' },
    { tier: 'design', name: 'Hotel Koé Tokyo', area: 'Shibuya', price: '¥30,000-45,000', address: '1-14-28 Dogenzaka, Shibuya-ku', why: 'Hotel-boutique-bakery-restaurant-store. Design minimaliste, pain frais sorti du four, DJ sets' },
    { tier: 'design', name: 'K5 Tokyo', area: 'Nihonbashi', price: '¥35,000-55,000', address: '3-5-10 Nihonbashikabutocho, Chuo-ku', why: 'Ancienne banque des années 20 reconvertie. Bibliothèque, Brooklyn Brewery tap, pieds de lit en béton brut' },
    { tier: 'design', name: 'The Tokyo Station Hotel', area: 'Marunouchi', price: '¥50,000-80,000', address: '1-9-1 Marunouchi, Chiyoda-ku', why: 'Dans le bâtiment historique de Tokyo Station lui-même. Classique européen, service impeccable' },
    { tier: 'budget', name: 'APA Hotel Shinjuku Kabukicho Tower', area: 'Shinjuku', price: '¥12,000-15,000', address: '1-20-2 Kabukicho, Shinjuku-ku', why: 'Chaîne business japonaise classique. Centralissime, tout petites rooms mais efficaces' },
    { tier: 'budget', name: 'Sotetsu Fresa Inn Higashi Shinjuku', area: 'Shinjuku', price: '¥10,000-15,000', address: '7-27-9 Shinjuku, Shinjuku-ku', why: '3★, rating 8.4. Proche métro, propre. Solide rapport qualité-prix' },
    { tier: 'budget', name: 'Tokyu Stay Shinjuku', area: 'Shinjuku', price: '¥18,000-25,000', address: '3-7-1 Shinjuku', why: 'Machine à laver + kitchenette EN CHAMBRE. Parfait séjour long. Près métro' },
    { tier: 'budget', name: 'MIMARU Tokyo Shinjuku West', area: 'Nishi-Shinjuku', price: '¥20,000-30,000', address: 'Nishishinjuku, Shinjuku-ku', why: 'APPART-HOTEL. Cuisine complète dans chaque room + coin laundry. Si long séjour' },
    { tier: 'budget', name: '9h nine hours Shinjuku-North', area: 'Shinjuku', price: '¥2,500-4,000', address: '3min train de Shinjuku', why: 'Capsule hotel design pour l\'expérience d\'une nuit. Mixte, propre, self check-in' },
  ],
  nagano: [
    { tier: 'design', name: 'Ryokan Seifuso', area: 'Matsumoto', price: '¥25,000-50,000', address: 'Matsumoto, Nagano', why: '2★ mais ryokan traditionnel. Shuttle aéroport, vélos. Pour l\'expérience tatami + futon + onsen' },
    { tier: 'design', name: 'Alpico Plaza Hotel Matsumoto', area: 'Matsumoto', price: '¥18,000-28,000', address: 'Matsumoto (5min Timepiece Museum)', why: '3★ central, vélos en prêt, bien noté' },
    { tier: 'budget', name: 'Dormy Inn Matsumoto Natural Hot Spring ⭐', area: 'Matsumoto', price: '¥10,000-14,000', address: '5min walk JR Matsumoto Station', why: 'ONSEN NATUREL sur le toit (indoor + outdoor), sauna, glaces gratuites, ramen gratuit 21h30-23h. Deal imbattable' },
    { tier: 'budget', name: 'Dormy Inn Nagano ⭐', area: 'Nagano City', price: '¥10,000-15,000', address: '1min walk JR Nagano Station', why: 'Même formule onsen + ramen. Le top pour Nagano City' },
    { tier: 'budget', name: 'Tabino Hotel Matsumoto', area: 'Matsumoto', price: '¥8,000-12,000', address: 'Matsumoto', why: 'Rating 9.2. Très abordable, simple mais confortable' },
    { tier: 'budget', name: 'Toyoko Inn Matsumoto Eki Higashi Guchi', area: 'Matsumoto', price: '¥7,500-9,500', address: '1.4km de Matsumoto Castle', why: '333 chambres, breakfast inclus. Chaîne budget ultra fiable' },
  ],
  kyoto: [
    { tier: 'design', name: 'Ace Hotel Kyoto', area: 'Shinpukan', price: '¥40,000-70,000', address: '245-2 Kurumayacho, Nakagyo-ku', why: 'Dans le Shinpukan (bâtiment téléphonique rénové par Kuma Kengo). Piscine, DJ sets, designs par des artisans locaux' },
    { tier: 'design', name: 'The Thousand Kyoto', area: 'Kyoto Station', price: '¥45,000-65,000', address: '570 Higashishiokoji-cho, Shimogyo-ku', why: 'Hôtel 5★ épuré, design japonais modern-minimaliste. Accès direct gare' },
    { tier: 'design', name: 'HOTEL THE MITSUI Kyoto', area: 'Nijo Castle', price: '¥80,000-150,000', address: '284 Nijoaburanokoji-cho, Nakagyo-ku', why: 'LE luxe absolu. Onsen privé dans certaines suites, restaurant étoilé' },
    { tier: 'budget', name: 'Mitsui Garden Hotel Kawaramachi Jokyoji ⭐', area: 'Kawaramachi', price: '¥15,000-25,000', address: 'Kawaramachi, Nakagyo-ku', why: '166 rooms, 4★. 1min Hankyu Kawaramachi, 7min Gion Shijo. Public bath intérieur avec peinture à l\'encre, concept temple-hôtel' },
    { tier: 'budget', name: 'Dormy Inn Premium Kyoto Ekimae', area: 'Kyoto Station', price: '¥12,000-18,000', address: 'Près de Kyoto Tower', why: 'Onsen naturel + sauna + massage. La formule Dormy Inn' },
    { tier: 'budget', name: 'Len Kyoto Kawaramachi (hostel design)', area: 'Kawaramachi', price: '¥4,000-10,000', address: 'Kawaramachi Street, Kyoto', why: 'Auberge design industriel-chic. Lits énormes, bar/café au rez, étage women-only' },
    { tier: 'budget', name: 'Nishitetsu Resort Inn Kyoto', area: 'Shijo Karasuma', price: '¥9,000-14,000', address: 'Shijo Karasuma', why: 'Central, propre, simple, pas cher' },
  ],
};

const ANIME_SPOTS = [
  { series: 'Your Name.', rank: '⭐⭐⭐', city: 'tokyo', name: 'Suga Shrine Stairs', japanese: '須賀神社', address: '5 Sugacho, Shinjuku-ku, Tokyo 160-0018', access: '8min walk Yotsuya-Sanchome (Marunouchi) · 10min JR Yotsuya', why: 'L\'escalier ROUGE iconique où Taki et Mitsuha se retrouvent à la fin. Le sanctuaire vend des omamori Your Name officiels. Très calme le matin tôt' },
  { series: 'Your Name.', rank: '⭐⭐', city: 'tokyo', name: 'Salon de Thé ROND (NACT)', japanese: '国立新美術館', address: '7-22-2 Roppongi, Minato-ku, Tokyo 106-8558', access: 'Roppongi Station (Metro Hibiya/Oedo)', why: 'Le café du NACT où Taki date avec Okudera-senpai. 3e étage = meilleure vue. Architecture futuriste' },
  { series: 'Your Name.', rank: '⭐⭐', city: 'tokyo', name: 'Yotsuya Station + Pedestrian Bridge', japanese: '四ツ谷駅', address: '1 Chome Yotsuya, Shinjuku-ku, Tokyo', access: 'JR Yotsuya / Metro Yotsuya', why: 'Le pont piétonnier où Taki réalise ses sentiments. L\'escalier aussi visible dans le film' },
  { series: 'Your Name.', rank: '⭐', city: 'tokyo', name: 'NTT Docomo Yoyogi Building', japanese: 'NTTドコモ代々木ビル', address: 'Shinanomachi Station area', access: 'JR Shinanomachi Station', why: 'Visible dans le montage Tokyo du film. Le bâtiment le plus reconnaissable du skyline' },
  { series: 'Your Name. (INSPIRATION)', rank: '⭐⭐⭐', city: 'nagano', name: 'Lake Suwa + Tateishi Park', japanese: '諏訪湖・立石公園', address: 'Tateishi Park, Suwa, Nagano', access: 'Kami-Suwa Station (JR Chuo) + 20-30min walk uphill', why: 'LE lac qui a inspiré Itomori. Makoto Shinkai est né à Nagano. La montée à pied à travers les rizières = scène d\'anime pure. Vue d\'Itomori au sommet' },
  { series: 'Weathering With You', rank: '⭐⭐', city: 'tokyo', name: 'Asahi Inari Shrine (torii rooftop)', japanese: '朝日稲荷神社', address: 'Ginza 3-8-12 (dans un immeuble !)', access: '2min walk Ginza Station', why: 'LE sanctuaire rooftop rouge du film — en vrai dans un immeuble à Ginza. Aussi apparu dans Your Name (date Taki/Okudera)' },
  { series: 'Weathering With You', rank: '⭐⭐', city: 'tokyo', name: 'Koenji Hikawa Shrine (Kisho)', japanese: '氷川神社', address: 'Suginami-ku, Koenji', access: 'Koenji Station (JR Chuo)', why: 'Inspiration du Kisho Shrine du film. Ema en forme de chaussures — référence aux predictions météo à l\'époque Edo' },
  { series: 'Weathering With You', rank: '⭐', city: 'tokyo', name: 'Roppongi Hills Sky Deck', japanese: '六本木ヒルズ展望台', address: '6-10-1 Roppongi, Minato-ku', access: 'Exit 1C Roppongi Station', why: 'Le rooftop 270m où Hina prie pour le beau temps (feux d\'artifice). ¥2,300 adulte' },
  { series: 'Weathering With You', rank: '⭐', city: 'tokyo', name: 'Tabata Station South Exit', japanese: '田端駅', address: 'Tabata, Kita-ku', access: 'JR Yamanote Tabata Station', why: 'Plusieurs scènes de pluie dans le film. Quartier peu touristique' },
  { series: 'Suzume', rank: '⭐⭐', city: 'tokyo', name: 'Hijiri-bashi Bridge', japanese: '聖橋', address: '4 Chome Kanda Surugadai, Chiyoda-ku, Tokyo 101-0062', access: 'Ochanomizu Station (sortie Hijiribashi)', why: 'Le pont de la course-poursuite dans Suzume no Tojimari. Vue sur les trains et le canal en contrebas' },
  { series: 'Suzume', rank: '⭐', city: 'tokyo', name: 'Ochanomizu + Tokyo Station', japanese: '御茶ノ水駅', address: 'Chiyoda-ku, Tokyo', access: 'JR Ochanomizu', why: 'Plusieurs scènes du climax — voies ferrées élevées, briques, pentes caractéristiques' },
  { series: 'Suzume', rank: '⭐', city: 'tokyo', name: 'Busta Shinjuku', japanese: 'バスタ新宿', address: 'Shinjuku Station south', access: 'Shinjuku Station', why: 'Terminal bus 4e étage où Suzume conclut son parcours. Vue sur Tokyo avec composition similaire au film' },
  { series: 'Studio Ghibli', rank: '⭐⭐⭐', city: 'tokyo', name: 'Ghibli Museum (Mitaka)', japanese: '三鷹の森ジブリ美術館', address: '1-1-83 Shimorenjaku, Mitaka-shi, Tokyo 181-0013', access: 'JR Mitaka Station + 15min walk OR Ghibli bus', why: '¥1000. Ouvert 10-18h sauf mardi. ⚠️ TICKETS VENDUS LE 10 DU MOIS PRÉCÉDENT À 10H (Lawson). Pour juin 2026 = dispo le 10 mai 10h JST' },
  { series: 'Mon Voisin Totoro', rank: '⭐⭐', city: 'tokyo', name: 'Totoro Forest (Sayama Hills)', japanese: 'トトロの森', address: 'Tokorozawa, Saitama', access: 'Seibukyujo-Mae Station (Seibu Sayama) · 30min-1h from Tokyo', why: 'L\'inspiration officielle du film. Forêt préservée grâce à la fondation Totoro. Balades, rizières, lac Sayama avec vue Fuji' },
  { series: 'Mon Voisin Totoro', rank: '⭐⭐', city: 'tokyo', name: 'Kurosuke House 🏚️', japanese: 'クロスケの家', address: 'Sayama Hills, Tokorozawa', access: 'Dans la forêt Totoro', why: 'Ferme centenaire gérée par la fondation Totoro. Totoro géant à l\'intérieur. Ouvert SEULEMENT mardi, mercredi, samedi' },
  { series: 'Slam Dunk', rank: '⭐⭐⭐', city: 'daytrip', name: 'Kamakura Kokomae Railroad Crossing', japanese: '鎌倉高校前1号踏切', address: '1-1 Koshigoe, Kamakura, Kanagawa 248-0033', access: 'Enoden Line · 4min from Enoshima Station', why: 'LE passage à niveau iconique de l\'opening. Vue mer + Enoshima + parfois Mt Fuji. Sunset = magie. Day trip depuis Tokyo facile (~1h)' },
  { series: 'Rascal Does Not Dream / Tari Tari', rank: '⭐', city: 'daytrip', name: 'Kamakura Kokomae Station', japanese: '鎌倉高校前駅', address: '1-1 Koshigoe, Kamakura', access: 'Enoden Line', why: 'Même station featured dans Rascal Does Not Dream of Bunny Girl Senpai et Tari Tari' },
  { series: 'K-ON!', rank: '⭐⭐', city: 'kyoto', name: 'Nanzen-ji Suirokaku', japanese: '南禅寺水路閣', address: 'Nanzen-ji Temple, Sakyo-ku, Kyoto', access: 'Keage Station (Metro Tozai)', why: 'Aqueduc en briques qui apparaît dans l\'opening de K-ON! saison 1. Construit en 1880 pour l\'eau du lac Biwa. Un des plus beaux spots de Kyoto' },
  { series: 'Hibike! Euphonium', rank: '⭐', city: 'kyoto', name: 'Uji (KyoAni setting)', japanese: '宇治', address: 'Uji, Kyoto', access: '20min en train depuis Kyoto Station (JR Nara Line)', why: 'Kyoto Animation est basé à Uji. La rivière, les ponts, Byodo-in — plusieurs lieux reconnaissables dans la série' },
  { series: 'Rurouni Kenshin', rank: '⭐', city: 'kyoto', name: 'Togetsukyo Bridge (Arashiyama)', japanese: '渡月橋', address: 'Arashiyama, Kyoto', access: 'Randen Arashiyama Station', why: 'Apparaît dans l\'opening de Rurouni Kenshin s2. Vue sur les montagnes Arashi, pont en bois iconique' },
  { series: 'Lucky Star / K-ON!', rank: '⭐', city: 'kyoto', name: 'Kamo River Delta', japanese: '鴨川デルタ', address: 'Kamo River Delta, Kyoto', access: 'Demachiyanagi Station (Keihan Line)', why: 'Apparaît dans K-ON! (voyage scolaire) et plein d\'autres. Les pierres en forme de tortue pour traverser = spot photo culte' },
];

const HIDDEN_GEMS = {
  tokyo: [
    { name: 'A10 (speakeasy caché)', vibe: 'Cocktail bar · vinyle', address: '1-12-11 Ebisunishi Bios Bldg B1F, Shibuya 150-0021', why: 'Derrière un mur de casiers verts. 1000+ vinyles jazz/R&B. Ouvert 19h-3h. Cocktail "Feel Like a Cinema". ¥1100 cover' },
    { name: 'No Room for Squares', vibe: 'Jazz bar · entrée Coca-Cola', address: '4F, Shimokitazawa', why: 'Porte secrète déguisée en distributeur Coca-Cola rétro. Jazz, cocktails ¥1400-1600' },
    { name: 'Janai Coffee', vibe: 'Speakeasy à énigme', address: 'Ebisu', why: 'Café hipster en façade. Résous l\'énigme en ligne → entrée cachée au sous-sol. Espresso martinis' },
    { name: 'Planetarium Bar', vibe: 'Étoiles au plafond', address: 'Ginza', why: 'Étoiles projetées au plafond pendant que tu bois ton cocktail' },
    { name: 'Fishing Restaurant Zauo', vibe: 'Pêche ton repas', address: 'Shinjuku Washington Hotel', why: 'Tu pêches ton poisson, ils le cuisinent. Concept insolite' },
    { name: 'Meguro Sky Garden', vibe: 'Park au-dessus autoroute', address: 'Ikejiri-Ohashi', why: '7000m² de verdure sur un échangeur d\'autoroute. Vue Fuji par temps clair' },
    { name: 'Bar Trench', vibe: 'Speakeasy Shibuya', address: 'Shibuya (basement unmarked)', why: 'Sous-sol non marqué. Craft cocktails, vibe speakeasy pure' },
    { name: 'TIGHT (Nonbei Yokocho)', vibe: '5 sièges · time warp 1950', address: 'Nonbei Yokocho, Shibuya', why: 'Micro-bar à 5 sièges dans la ruelle Nonbei. Vibe 1950 absolue' },
  ],
  nagano: [
    { name: 'Daio Wasabi Farm', vibe: 'Campagne surréaliste', address: 'Azumino · 10min taxi de Hotaka Station', why: '37 acres de wasabi alimentés par les Alpes. Moulin + promenade' },
    { name: 'Obasute Station', vibe: 'Vue 3 Great Train Views', address: 'Shinonoi Line', why: 'Platform surplombant la plaine de Zenkoji + rizières. Switchback rare au Japon' },
    { name: 'Shinshu Inagura Rice Terraces', vibe: 'Rizières en gradins', address: 'Ueda City', why: 'Une des 100 plus belles rizières du Japon' },
    { name: 'Takashima Castle', vibe: 'Château lakeside', address: 'Suwa', why: 'Petit château élégant au bord du lac, entouré d\'un fossé et de cerisiers' },
  ],
  kyoto: [
    { name: 'Philosopher\'s Path en juin', vibe: 'Hydrangeas (ajisai) en fleur', address: 'Higashiyama', why: 'En juin = saison tsuyu = hydrangeas partout. Canal de 2km. LE moment de l\'année' },
    { name: 'Daitoku-ji Complex', vibe: 'Zen gardens secrets', address: 'North Kyoto', why: 'Sous-temples zen très peu touristiques. Jardins kare-sansui de maîtres' },
    { name: 'Kurama-dera', vibe: 'Temple de montagne mystique', address: 'Kurama (30min train Eizan Line)', why: 'Temple dans une forêt, lieu de naissance du Reiki. Balade dans les cèdres centenaires' },
    { name: 'Mimurotoji (ajisai temple)', vibe: 'Hydrangea garden', address: 'Uji', why: 'En juin, 10,000 hortensias fleurissent. Temple hydrangea le plus célèbre' },
    { name: 'Weekenders Coffee', vibe: 'Specialty caché', address: 'Parking rénové, centre Kyoto', why: 'Single-origin, favoris des locals. L\'adresse des connaisseurs' },
  ],
};

const FOOD_HIGHLIGHTS = {
  tokyo: [
    { name: 'Coffee Zingaro (Murakami)', type: '☕ Café iconique', addr: 'Nakano Broadway', notes: 'Tables = bornes d\'arcade (Mario Bros, Donkey Kong, Street Fighter). Flower coins ¥500. Pancakes Tonari no Kaido. Cookies fleur Murakami' },
    { name: 'Rokunen Yonkumi', type: '🏫 Izakaya école', addr: 'Assorti Shibuya 4F, 32-12 Udagawacho', notes: 'Nom = "6e année classe 4". Plats de cantine, staff en prof, randoseru. ~¥3500' },
    { name: 'Gyukaku Omekaido Overbridge', type: '🥩 Yakiniku abordable', addr: 'B1F Kotakibashi Pacifica, 7-10-18 Nishi-Shinjuku', notes: 'All-you-can-eat ~¥4,000. Chaîne fiable. 5min de Shinjuku' },
    { name: 'Ushikoi Shinjuku', type: '🥩 Wagyu raffiné', addr: 'B2F Kurihashi Bldg, 3-13-5 Shinjuku', notes: '~¥11,000 dîner. Wagyu leaner cuts. North exit Seibu-Shinjuku' },
    { name: '@Home Café', type: '🎀 Maid café authentique', addr: '1-11-4 Sotokanda, 4F-7F Mitsuwa Bldg', notes: 'Le plus célèbre d\'Akihabara. ~¥1,500 entrée + conso' },
    { name: 'Fujun Kissa Dope', type: '☕ Kissaten rétro', addr: 'Nakano (près Coffee Zingaro)', notes: 'Le plus authentique jun-kissa de Tokyo. Machine à remonter le temps' },
    { name: 'Ninja Experience Cafe', type: '🥷 Thème ninja', addr: 'Harajuku + Asakusa (2 branches)', notes: 'Habille-toi en ninja, lance des shuriken, boissons créatives ninja-inspired' },
  ],
  nagano: [
    { name: 'Soba shops (cherchez 手打ち)', type: '🍜 Spécialité Nagano', addr: 'Matsumoto + Nagano', notes: 'Nagano = soba country. "Teuchi" = fait main. Le must à chaque déjeuner' },
    { name: 'Oyaki', type: '🥟 Pain vapeur', addr: 'Stands rue (approche Zenkoji)', notes: 'Spécialité Nagano, pain fourré aux légumes de montagne' },
    { name: 'Miso tendon (Suwa)', type: '🍤 Tempura sauce miso', addr: 'Kamisuwa', notes: 'Suwa est famous pour son miso. Tendon sauce miso sucrée-épicée' },
  ],
  kyoto: [
    { name: 'Smart Coffee', type: '☕ Kissaten classique', addr: 'Teramachi Arcade', notes: 'Hotcakes ultra fluffy + egg sandwiches légendaires' },
    { name: 'Inoda Coffee Honten', type: '☕ Depuis 1940', addr: 'Downtown Kyoto', notes: 'Café européen-inspired, ambiance nostalgique. LE kissaten historique' },
    { name: '% Arabica Higashiyama + Arashiyama', type: '☕ Minimaliste iconique', addr: 'Higashiyama & Arashiyama', notes: 'Design minimalist japonais, attente souvent longue mais ça vaut le coup' },
    { name: 'Otafuku', type: '☕ Kissaten caché', addr: 'Kawaramachi', notes: 'Échappe au tumulte du centre. Retro pure' },
    { name: 'Weekenders Coffee', type: '☕ Specialty', addr: 'Parking rénové, centre', notes: 'Single-origin, favoris des locals' },
    { name: 'Kurasu Kyoto', type: '☕ Multi-roasters', addr: 'Près de Kyoto Station', notes: 'Beans de roasters partout au Japon. Must pour les amateurs' },
  ],
};

const PACHINKO_SPOTS = [
  { city: 'tokyo', name: 'Maruhan Shinjuku Toho', area: 'Kabukicho', why: 'Une des plus grandes salles de Tokyo. Plusieurs étages, pachislot + pachinko modernes' },
  { city: 'tokyo', name: 'Salles d\'Akihabara', area: 'Akihabara', why: 'Concentration massive, ambiance plus otaku. Machines thématiques anime partout' },
  { city: 'kyoto', name: 'Pachinko près de Kyoto Station', area: 'Shichijo', why: 'Salles du quartier Shichijo. Plus petites mais authentiques' },
];

const TIPS = [
  { title: '🌧️ JUIN = TSUYU', text: 'Saison des pluies. Début juin à mi-juillet. Pluie plus forte fin juin. MAIS : pluie généralement douce et intermittente, ~15 jours de soleil en juin. Humidité 75%+, 22-28°C' },
  { title: '🧥 Pack rainy season', text: 'Chaussures imperméables, veste légère respirante à capuche, tissus quick-dry (PAS de denim/coton lourd), parapluie compact windproof, microfibre towel, protection sac. Les konbini vendent des ponchos à ¥500' },
  { title: '🌸 BONUS : hydrangeas', text: 'En juin, les ajisai (hortensias) fleurissent partout. Spots top : Mimurotoji (Uji), Philosopher\'s Path (Kyoto), Bunkyo Hydrangea Festival (Tokyo, Hakusan Shrine)' },
  { title: '🎨 Stratégie anti-pluie', text: 'Matins DEHORS (plus frais + moins de monde), après-midis INDOOR si nuageux : musées, onsen, cafés, shopping arcades. Check météo la veille via yahoo.co.jp/weather' },
  { title: '🎟️ Ghibli Museum', text: 'Tickets pour juin sortent LE 10 MAI À 10H JST via Lawson Ticket. Vendus en quelques minutes. Connecte-toi à l\'avance. ¥1000' },
  { title: '💴 Argent', text: 'Le Japon reste cash-heavy. Les 7-Eleven ATM acceptent les cartes internationales. Prévois ¥3000-5000 cash sur toi toujours' },
  { title: '🚆 JR Pass ?', text: 'Depuis oct 2023, le JR Pass a +70%. Calcule ton itinéraire AVANT. Utilise trainline.com pour comparer' },
  { title: '📱 SIM / eSIM', text: 'eSIM Airalo ou Ubigi, activation à l\'arrivée. ~€20 pour 10-15 Go. Indispensable pour Maps (+ Shabero 😉)' },
  { title: '🎋 Shabero en action', text: 'Utilise ton propre app Shabero pour les phrases du quotidien ! Resto, transport, shopping — tout y est avec l\'audio ElevenLabs. Test grandeur nature' },
  { title: '🍣 Réserve les restos top', text: 'Les vrais bons spots se réservent 1-2 mois à l\'avance. TableCheck.com ou Omakase.in' },
  { title: '👘 Étiquette temples', text: 'Bow avant le torii. Lave-toi mains+bouche au chozuya. Pas de photos à l\'intérieur sauf mention. Parle bas' },
  { title: '🏯 Heures dorées', text: 'Temples touristiques : ARRIVE 7H-8H. Tu auras Kiyomizu, Fushimi Inari, Bamboo Grove presque pour toi seul' },
];

const ICONS = {
  transport: '🚆', hotel: '🏨', spot: '📍', food: '🍜',
  shopping: '🛍', pachinko: '🎰', night: '🌃', tip: '💡', anime: '🎌',
};

// ═══════════════════════════════════════════════════════════════

export default function JapanTrip() {
  const [tab, setTab] = useState('roadmap');
  const [regionFilter, setRegionFilter] = useState('all');
  const [hotelTier, setHotelTier] = useState('all');
  const [animeCity, setAnimeCity] = useState('all');

  const filteredDays = regionFilter === 'all' ? DAYS_DATA : DAYS_DATA.filter(d => d.region === regionFilter);
  const filteredAnime = animeCity === 'all' ? ANIME_SPOTS : ANIME_SPOTS.filter(s => s.city === animeCity);

  return (
    <div style={styles.root}>
      <style>{css}</style>

      <header style={styles.hero}>
        <div style={styles.grainOverlay} />
        <div style={styles.heroInner}>
          <div style={styles.heroKanji}>日本の旅</div>
          <h1 style={styles.heroTitle}>KENNY × MÉLANIE</h1>
          <div style={styles.heroDates}>27 MAI — 17 JUIN 2026</div>
          <div style={styles.heroRoute}>
            <RouteDot color={REGIONS.tokyo.color}  label="TOKYO"  kanji="東京" />
            <span style={styles.heroDash}>↯</span>
            <RouteDot color={REGIONS.nagano.color} label="NAGANO" kanji="長野" />
            <span style={styles.heroDash}>↯</span>
            <RouteDot color={REGIONS.kyoto.color}  label="KYOTO"  kanji="京都" />
          </div>
          <div style={styles.heroSub}>22 jours · 3 régions · 1 voyage</div>
        </div>
      </header>

      <nav style={styles.nav}>
        <div style={styles.navInner}>
          {[
            ['roadmap', 'Roadmap'],
            ['anime', '🎌 Anime'],
            ['hotels', 'Hôtels'],
            ['gems', 'Gems'],
            ['food', 'Food'],
            ['pachinko', 'Pachinko'],
            ['tips', 'Tips'],
          ].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ ...styles.navBtn, ...(tab === id ? styles.navBtnActive : {}) }}>
              {label}
            </button>
          ))}
        </div>
      </nav>

      <main style={styles.main}>
        {tab === 'roadmap' && (
          <section>
            <SectionHeader title="Jour par jour" subtitle="22 jours · filtre par région" />
            <div style={styles.filterBar}>
              <FilterBtn active={regionFilter === 'all'} onClick={() => setRegionFilter('all')} color="#fff">ALL</FilterBtn>
              {Object.entries(REGIONS).map(([k, r]) => (
                <FilterBtn key={k} active={regionFilter === k} onClick={() => setRegionFilter(k)} color={r.color}>
                  {r.label.toUpperCase()}
                </FilterBtn>
              ))}
            </div>
            <div style={styles.daysGrid}>
              {filteredDays.map((d, i) => <DayCard key={i} day={d} />)}
            </div>
          </section>
        )}

        {tab === 'anime' && (
          <section>
            <SectionHeader title="🎌 Pèlerinage Anime" subtitle="Seichi Junrei · 聖地巡礼 · les spots qu'on adore" />
            <div style={styles.animeIntro}>
              Makoto Shinkai dessine avec une précision telle que ses lieux sont reconnaissables à 100%. 
              Studio Ghibli s'inspire de lieux réels que vous pouvez visiter. Ces endroits deviennent sacrés 
              pour les fans — c'est le "pèlerinage vers les lieux saints" (seichi junrei).
            </div>
            <div style={styles.filterBar}>
              <FilterBtn active={animeCity === 'all'} onClick={() => setAnimeCity('all')} color="#fff">ALL</FilterBtn>
              <FilterBtn active={animeCity === 'tokyo'} onClick={() => setAnimeCity('tokyo')} color={REGIONS.tokyo.color}>TOKYO</FilterBtn>
              <FilterBtn active={animeCity === 'nagano'} onClick={() => setAnimeCity('nagano')} color={REGIONS.nagano.color}>NAGANO</FilterBtn>
              <FilterBtn active={animeCity === 'kyoto'} onClick={() => setAnimeCity('kyoto')} color={REGIONS.kyoto.color}>KYOTO</FilterBtn>
              <FilterBtn active={animeCity === 'daytrip'} onClick={() => setAnimeCity('daytrip')} color={REGIONS.daytrip.color}>DAY TRIP</FilterBtn>
            </div>
            <div style={styles.animeGrid}>
              {filteredAnime.map((s, i) => <AnimeCard key={i} spot={s} />)}
            </div>
          </section>
        )}

        {tab === 'hotels' && (
          <section>
            <SectionHeader title="Hôtels" subtitle="Design/Boutique OU abordable — vous choisissez" />
            <div style={styles.filterBar}>
              <FilterBtn active={hotelTier === 'all'} onClick={() => setHotelTier('all')} color="#fff">TOUS</FilterBtn>
              <FilterBtn active={hotelTier === 'design'} onClick={() => setHotelTier('design')} color="#E0B0FF">✦ DESIGN</FilterBtn>
              <FilterBtn active={hotelTier === 'budget'} onClick={() => setHotelTier('budget')} color="#9FFF9F">¥ ABORDABLE</FilterBtn>
            </div>
            {Object.entries(HOTELS).map(([city, list]) => {
              const filtered = hotelTier === 'all' ? list : list.filter(h => h.tier === hotelTier);
              if (filtered.length === 0) return null;
              return (
                <div key={city} style={{ marginBottom: 48 }}>
                  <CityHeader city={city} />
                  <div style={styles.cardGrid}>
                    {filtered.map((h, i) => <HotelCard key={i} hotel={h} city={city} />)}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {tab === 'gems' && (
          <section>
            <SectionHeader title="Gems cachées" subtitle="Spots insolites et hors-radar" />
            {Object.entries(HIDDEN_GEMS).map(([city, list]) => (
              <div key={city} style={{ marginBottom: 40 }}>
                <CityHeader city={city} />
                <div style={styles.cardGrid}>
                  {list.map((g, i) => <GemCard key={i} gem={g} city={city} />)}
                </div>
              </div>
            ))}
          </section>
        )}

        {tab === 'food' && (
          <section>
            <SectionHeader title="Food & Drink" subtitle="Cafés rétro, yakiniku, maids, kissaten" />
            {Object.entries(FOOD_HIGHLIGHTS).map(([city, list]) => (
              <div key={city} style={{ marginBottom: 40 }}>
                <CityHeader city={city} />
                <div style={styles.cardGrid}>
                  {list.map((f, i) => <FoodCard key={i} food={f} city={city} />)}
                </div>
              </div>
            ))}
          </section>
        )}

        {tab === 'pachinko' && (
          <section>
            <SectionHeader title="🎰 Pachinko / Pachislot" subtitle="Pour l'expérience sensorielle" />
            <div style={styles.pachinkoIntro}>
              ⚠️ Tenir 5-10min dans une salle est une expérience à part entière. 
              Techniquement pas du gambling (système de "prix échangés") mais tout le monde sait.
            </div>
            <div style={styles.cardGrid}>
              {PACHINKO_SPOTS.map((p, i) => <PachinkoCard key={i} p={p} />)}
            </div>
          </section>
        )}

        {tab === 'tips' && (
          <section>
            <SectionHeader title="Pratical tips" subtitle="Essentiels pour juin 2026" />
            <div style={styles.cardGrid}>
              {TIPS.map((t, i) => <TipCard key={i} tip={t} />)}
            </div>
          </section>
        )}
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerKanji}>旅は道連れ</div>
        <div style={styles.footerText}>"Un voyage se partage" · bon voyage, Kenny & Mélanie</div>
        <div style={styles.footerTiny}>v3 · avril 2026 · made with love</div>
      </footer>
    </div>
  );
}

function RouteDot({ color, label, kanji }) {
  return (
    <div style={styles.routeDot}>
      <div style={{ ...styles.routeDotCircle, background: color, boxShadow: `0 0 30px ${color}` }} />
      <div style={styles.routeDotLabel}>{label}</div>
      <div style={styles.routeDotKanji}>{kanji}</div>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={styles.sectionHeader}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {subtitle && <div style={styles.sectionSub}>{subtitle}</div>}
    </div>
  );
}

function FilterBtn({ active, onClick, color, children }) {
  return (
    <button onClick={onClick} style={{ ...styles.filterBtn, background: active ? color : 'transparent', color: active ? '#000' : '#fff', borderColor: color }}>
      {children}
    </button>
  );
}

function CityHeader({ city }) {
  const r = REGIONS[city] || { label: city, kanji: '', color: '#fff' };
  return (
    <div style={{ ...styles.cityHeader, borderColor: r.color }}>
      <span style={{ ...styles.cityHeaderKanji, color: r.color }}>{r.kanji}</span>
      <span style={styles.cityHeaderLabel}>{r.label}</span>
      <div style={{ ...styles.cityHeaderLine, background: r.color }} />
    </div>
  );
}

function DayCard({ day }) {
  const r = REGIONS[day.region];
  return (
    <div style={{ ...styles.card, borderTopColor: r.color, borderTopWidth: 3, boxShadow: `0 0 40px ${r.glow}` }}>
      <div style={styles.dayHeader}>
        <div style={{ ...styles.dayNumber, color: r.color }}>J{day.day}</div>
        <div>
          <div style={styles.dayDate}>{day.date}</div>
          <div style={{ ...styles.dayRegion, color: r.color }}>{r.kanji} · {r.label}</div>
        </div>
      </div>
      <h3 style={styles.cardTitle}>{day.title}</h3>
      <ul style={styles.dayItems}>
        {day.items.map((it, i) => (
          <li key={i} style={styles.dayItem}>
            <div style={styles.dayItemType}>{ICONS[it.type] || '·'}</div>
            <div style={{ flex: 1 }}>
              <div style={styles.dayItemText}>{it.text}</div>
              {it.detail && <div style={styles.dayItemDetail}>{it.detail}</div>}
              {it.note && <div style={{ ...styles.dayItemNote, color: r.color }}>{it.note}</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AnimeCard({ spot }) {
  const r = REGIONS[spot.city];
  return (
    <div style={{ ...styles.card, borderColor: r.color, boxShadow: `0 0 35px ${r.glow}` }}>
      <div style={styles.animeCardTop}>
        <div style={{ ...styles.animeRank, color: r.color }}>{spot.rank}</div>
        <div style={styles.animeSeries}>{spot.series}</div>
      </div>
      <h3 style={styles.cardTitle}>{spot.name}</h3>
      <div style={{ ...styles.animeJapanese, color: r.color }}>{spot.japanese}</div>
      <div style={styles.animeMeta}>
        <div style={styles.animeMetaLine}>📍 {spot.address}</div>
        <div style={styles.animeMetaLine}>🚉 {spot.access}</div>
      </div>
      <div style={styles.cardBody}>{spot.why}</div>
    </div>
  );
}

function HotelCard({ hotel, city }) {
  const r = REGIONS[city];
  const tierColor = hotel.tier === 'design' ? '#E0B0FF' : '#9FFF9F';
  const tierLabel = hotel.tier === 'design' ? '✦ DESIGN' : '¥ ABORDABLE';
  return (
    <div style={{ ...styles.card, borderColor: r.color, position: 'relative' }}>
      <div style={{ ...styles.hotelTierTag, background: tierColor, color: '#000' }}>{tierLabel}</div>
      <h3 style={{ ...styles.cardTitle, marginRight: 90 }}>{hotel.name}</h3>
      <div style={{ ...styles.cardMeta, color: r.color }}>{hotel.area} · {hotel.price}</div>
      <div style={styles.cardAddr}>📍 {hotel.address}</div>
      <div style={styles.cardBody}>{hotel.why}</div>
    </div>
  );
}

function GemCard({ gem, city }) {
  const r = REGIONS[city];
  return (
    <div style={{ ...styles.card, borderColor: r.color }}>
      <h3 style={styles.cardTitle}>{gem.name}</h3>
      <div style={{ ...styles.cardMeta, color: r.color }}>{gem.vibe}</div>
      <div style={styles.cardAddr}>📍 {gem.address}</div>
      <div style={styles.cardBody}>{gem.why}</div>
    </div>
  );
}

function FoodCard({ food, city }) {
  const r = REGIONS[city];
  return (
    <div style={{ ...styles.card, borderColor: r.color }}>
      <div style={{ ...styles.cardMeta, color: r.color }}>{food.type}</div>
      <h3 style={styles.cardTitle}>{food.name}</h3>
      <div style={styles.cardAddr}>📍 {food.addr}</div>
      <div style={styles.cardBody}>{food.notes}</div>
    </div>
  );
}

function PachinkoCard({ p }) {
  const r = REGIONS[p.city];
  return (
    <div style={{ ...styles.card, borderColor: r.color, boxShadow: `0 0 25px ${r.glow}` }}>
      <div style={{ ...styles.cardMeta, color: r.color }}>{r.kanji} {r.label}</div>
      <h3 style={styles.cardTitle}>{p.name}</h3>
      <div style={styles.cardAddr}>{p.area}</div>
      <div style={styles.cardBody}>{p.why}</div>
    </div>
  );
}

function TipCard({ tip }) {
  return (
    <div style={{ ...styles.card, borderColor: 'rgba(255,255,255,0.1)' }}>
      <h3 style={styles.cardTitle}>{tip.title}</h3>
      <div style={styles.cardBody}>{tip.text}</div>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500;700;900&family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&family=Bodoni+Moda:wght@400;700;900&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; background: #0A0A0F; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.85; transform: scale(1.05); } }
  @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  button { cursor: pointer; font-family: inherit; transition: all 0.2s; }
  button:hover { transform: translateY(-1px); }
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: #0A0A0F; }
  ::-webkit-scrollbar-thumb { background: #FF2D55; border-radius: 4px; }
`;

const styles = {
  root: { minHeight: '100vh', background: '#0A0A0F', color: '#fff', fontFamily: "'DM Sans', 'Noto Sans JP', sans-serif", overflowX: 'hidden' },
  hero: { position: 'relative', padding: '100px 20px 80px', background: 'linear-gradient(135deg, #0A0A0F 0%, #1A0F1F 50%, #0F0A1F 100%)', borderBottom: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' },
  grainOverlay: { position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='a'><feTurbulence baseFrequency='0.9' numOctaves='3' seed='5'/></filter><rect width='200' height='200' filter='url(%23a)' opacity='0.6'/></svg>")` },
  heroInner: { maxWidth: 1200, margin: '0 auto', textAlign: 'center', position: 'relative', animation: 'fadeUp 0.8s ease-out' },
  heroKanji: { fontFamily: "'Noto Sans JP', serif", fontSize: 'clamp(80px, 14vw, 160px)', fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg, #FF2D55 0%, #FF9500 50%, #34C759 100%)', backgroundSize: '200% 200%', animation: 'gradient 8s ease infinite', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.04em', marginBottom: 30 },
  heroTitle: { fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, margin: 0, letterSpacing: '0.2em' },
  heroDates: { fontFamily: "'Space Mono', monospace", fontSize: 14, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.6)', marginTop: 16, marginBottom: 40 },
  heroRoute: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap', marginTop: 40 },
  heroDash: { color: 'rgba(255,255,255,0.3)', fontSize: 28 },
  heroSub: { fontFamily: "'Space Mono', monospace", marginTop: 30, fontSize: 12, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)' },
  routeDot: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
  routeDotCircle: { width: 16, height: 16, borderRadius: '50%', animation: 'pulse 3s ease-in-out infinite' },
  routeDotLabel: { fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: '0.2em', color: '#fff' },
  routeDotKanji: { fontFamily: "'Noto Sans JP', serif", fontSize: 18, color: 'rgba(255,255,255,0.5)' },
  nav: { position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 20px' },
  navInner: { maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 8, overflowX: 'auto', justifyContent: 'center', flexWrap: 'wrap' },
  navBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', padding: '10px 18px', borderRadius: 100, fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', whiteSpace: 'nowrap' },
  navBtnActive: { background: '#fff', color: '#000', borderColor: '#fff' },
  main: { maxWidth: 1400, margin: '0 auto', padding: '60px 20px' },
  sectionHeader: { marginBottom: 30 },
  sectionTitle: { fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' },
  sectionSub: { fontFamily: "'Space Mono', monospace", fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 10, letterSpacing: '0.1em' },
  filterBar: { display: 'flex', gap: 8, marginBottom: 30, flexWrap: 'wrap' },
  filterBtn: { border: '1px solid', padding: '8px 16px', borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', fontFamily: "'Space Mono', monospace" },
  cityHeader: { display: 'flex', alignItems: 'baseline', gap: 16, padding: '20px 0 12px', borderBottom: '2px solid', marginBottom: 24, position: 'relative' },
  cityHeaderKanji: { fontFamily: "'Noto Sans JP', serif", fontSize: 36, fontWeight: 900, lineHeight: 1 },
  cityHeaderLabel: { fontFamily: "'Bodoni Moda', serif", fontSize: 28, fontWeight: 700, letterSpacing: '0.05em' },
  cityHeaderLine: { position: 'absolute', bottom: -2, left: 0, width: 60, height: 4 },
  daysGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 20 },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 },
  animeGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 20 },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24, transition: 'all 0.3s' },
  cardTitle: { fontFamily: "'Bodoni Moda', serif", fontSize: 20, fontWeight: 700, margin: '4px 0 6px', letterSpacing: '-0.01em' },
  cardMeta: { fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 10 },
  cardAddr: { fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 10, lineHeight: 1.4, fontFamily: "'Space Mono', monospace" },
  cardBody: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.55 },
  dayHeader: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 },
  dayNumber: { fontFamily: "'Bodoni Moda', serif", fontSize: 42, fontWeight: 900, lineHeight: 1 },
  dayDate: { fontFamily: "'Space Mono', monospace", fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' },
  dayRegion: { fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, fontWeight: 700, marginTop: 4 },
  dayItems: { listStyle: 'none', padding: 0, margin: '16px 0 0' },
  dayItem: { display: 'flex', gap: 12, padding: '10px 4px', borderTop: '1px solid rgba(255,255,255,0.05)' },
  dayItemType: { fontSize: 18, flexShrink: 0, width: 24, textAlign: 'center' },
  dayItemText: { fontSize: 14, fontWeight: 500, color: '#fff' },
  dayItemDetail: { fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 4, lineHeight: 1.5 },
  dayItemNote: { fontSize: 11, fontFamily: "'Space Mono', monospace", marginTop: 6, letterSpacing: '0.05em', fontWeight: 700 },
  animeIntro: { fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', marginBottom: 30, padding: 20, background: 'rgba(255,45,85,0.06)', border: '1px solid rgba(255,45,85,0.2)', borderRadius: 8, maxWidth: 900 },
  animeCardTop: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  animeRank: { fontSize: 14, fontWeight: 700 },
  animeSeries: { fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' },
  animeJapanese: { fontFamily: "'Noto Sans JP', serif", fontSize: 18, fontWeight: 700, marginBottom: 14 },
  animeMeta: { padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 14 },
  animeMetaLine: { fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: '4px 0', lineHeight: 1.4 },
  hotelTierTag: { position: 'absolute', top: 14, right: 14, fontSize: 10, fontWeight: 700, fontFamily: "'Space Mono', monospace", letterSpacing: '0.1em', padding: '4px 8px', borderRadius: 4 },
  pachinkoIntro: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 30, padding: 20, background: 'rgba(255,149,0,0.06)', border: '1px solid rgba(255,149,0,0.2)', borderRadius: 8, lineHeight: 1.6, maxWidth: 900 },
  footer: { padding: '60px 20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 80 },
  footerKanji: { fontFamily: "'Noto Sans JP', serif", fontSize: 32, background: 'linear-gradient(135deg, #FF2D55, #FF9500, #34C759)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900, marginBottom: 16 },
  footerText: { fontFamily: "'Bodoni Moda', serif", fontSize: 16, color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' },
  footerTiny: { fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 16, letterSpacing: '0.2em' },
};
