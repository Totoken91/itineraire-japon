'use client';

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
];

const HOTELS = {
  tokyo: [
    { tier: 'design', name: 'TRUNK(HOTEL)', area: 'Shibuya', price: '¥40,000-60,000', address: '5-31 Jingumae, Shibuya-ku, Tokyo', why: 'Boutique pionnier du "socialising". Lobby-bar électrique, design local-first, terrasse sur Cat Street' },
    { tier: 'budget', name: 'APA Hotel Shinjuku Kabukicho Tower', area: 'Shinjuku', price: '¥12,000-15,000', address: '1-20-2 Kabukicho, Shinjuku-ku', why: 'Chaîne business japonaise classique. Centralissime, tout petites rooms mais efficaces' },
  ],
  nagano: [
    { tier: 'design', name: 'Ryokan Seifuso', area: 'Matsumoto', price: '¥25,000-50,000', address: 'Matsumoto, Nagano', why: '2★ mais ryokan traditionnel. Shuttle aéroport, vélos. Pour l\'expérience tatami + futon + onsen' },
    { tier: 'budget', name: 'Dormy Inn Matsumoto Natural Hot Spring ⭐', area: 'Matsumoto', price: '¥10,000-14,000', address: '5min walk JR Matsumoto Station', why: 'ONSEN NATUREL sur le toit (indoor + outdoor), sauna, glaces gratuites, ramen gratuit 21h30-23h. Deal imbattable' },
  ],
  kyoto: [
    { tier: 'design', name: 'Ace Hotel Kyoto', area: 'Shinpukan', price: '¥40,000-70,000', address: '245-2 Kurumayacho, Nakagyo-ku', why: 'Dans le Shinpukan (bâtiment téléphonique rénové par Kuma Kengo). Piscine, DJ sets, designs par des artisans locaux' },
    { tier: 'budget', name: 'Mitsui Garden Hotel Kawaramachi Jokyoji ⭐', area: 'Kawaramachi', price: '¥15,000-25,000', address: 'Kawaramachi, Nakagyo-ku', why: '166 rooms, 4★. 1min Hankyu Kawaramachi, 7min Gion Shijo. Public bath intérieur avec peinture à l\'encre' },
  ],
};

const ANIME_SPOTS = [
  { series: 'Your Name.', rank: '⭐⭐⭐', city: 'tokyo', name: 'Suga Shrine Stairs', japanese: '須賀神社', address: '5 Sugacho, Shinjuku-ku, Tokyo 160-0018', access: '8min walk Yotsuya-Sanchome', why: 'L\'escalier ROUGE iconique où Taki et Mitsuha se retrouvent à la fin. Le sanctuaire vend des omamori Your Name officiels' },
  { series: 'Your Name.', rank: '⭐⭐', city: 'tokyo', name: 'Salon de Thé ROND (NACT)', japanese: '国立新美術館', address: '7-22-2 Roppongi, Minato-ku, Tokyo 106-8558', access: 'Roppongi Station', why: 'Le café du NACT où Taki date avec Okudera-senpai. 3e étage = meilleure vue' },
  { series: 'Slam Dunk', rank: '⭐⭐⭐', city: 'daytrip', name: 'Kamakura Kokomae Railroad Crossing', japanese: '鎌倉高校前1号踏切', address: '1-1 Koshigoe, Kamakura, Kanagawa 248-0033', access: 'Enoden Line', why: 'LE passage à niveau iconique de l\'opening. Vue mer + Enoshima. Day trip depuis Tokyo facile' },
  { series: 'K-ON!', rank: '⭐⭐', city: 'kyoto', name: 'Nanzen-ji Suirokaku', japanese: '南禅寺水路閣', address: 'Nanzen-ji Temple, Sakyo-ku, Kyoto', access: 'Keage Station', why: 'Aqueduc en briques qui apparaît dans l\'opening de K-ON! saison 1. Construit en 1880' },
];

const HIDDEN_GEMS = {
  tokyo: [
    { name: 'A10 (speakeasy caché)', vibe: 'Cocktail bar · vinyle', address: '1-12-11 Ebisunishi Bios Bldg B1F, Shibuya 150-0021', why: 'Derrière un mur de casiers verts. 1000+ vinyles jazz/R&B. ¥1100 cover' },
    { name: 'Janai Coffee', vibe: 'Speakeasy à énigme', address: 'Ebisu', why: 'Café hipster en façade. Résous l\'énigme en ligne → entrée cachée au sous-sol' },
  ],
  nagano: [
    { name: 'Daio Wasabi Farm', vibe: 'Campagne surréaliste', address: 'Azumino', why: '37 acres de wasabi alimentés par les Alpes. Moulin + promenade' },
  ],
  kyoto: [
    { name: 'Philosopher\'s Path en juin', vibe: 'Hydrangeas en fleur', address: 'Higashiyama', why: 'En juin = saison tsuyu = hydrangeas partout. Canal de 2km' },
    { name: 'Daitoku-ji Complex', vibe: 'Zen gardens secrets', address: 'North Kyoto', why: 'Sous-temples zen très peu touristiques. Jardins kare-sansui de maîtres' },
  ],
};

const FOOD_HIGHLIGHTS = {
  tokyo: [
    { name: 'Coffee Zingaro (Murakami)', type: '☕ Café iconique', addr: 'Nakano Broadway', notes: 'Tables = bornes d\'arcade (Mario, Street Fighter). Pancakes Tonari no Kaido' },
    { name: 'Rokunen Yonkumi', type: '🏫 Izakaya école', addr: 'Assorti Shibuya 4F', notes: 'Plats de cantine, staff en prof, randoseru. ~¥3500' },
  ],
  nagano: [
    { name: 'Soba shops (cherchez 手打ち)', type: '🍜 Spécialité Nagano', addr: 'Matsumoto + Nagano', notes: 'Nagano = soba country. "Teuchi" = fait main' },
  ],
  kyoto: [
    { name: 'Smart Coffee', type: '☕ Kissaten classique', addr: 'Teramachi Arcade', notes: 'Hotcakes ultra fluffy + egg sandwiches légendaires' },
    { name: '% Arabica Higashiyama', type: '☕ Minimaliste iconique', addr: 'Higashiyama', notes: 'Design minimalist japonais, attente souvent longue' },
  ],
};

const PACHINKO_SPOTS = [
  { city: 'tokyo', name: 'Maruhan Shinjuku Toho', area: 'Kabukicho', why: 'Une des plus grandes salles de Tokyo. Plusieurs étages' },
  { city: 'kyoto', name: 'Pachinko près de Kyoto Station', area: 'Shichijo', why: 'Salles du quartier. Plus petites mais authentiques' },
];

const TIPS = [
  { title: '🌧️ JUIN = TSUYU', text: 'Saison des pluies. Début juin à mi-juillet. Pluie plus forte fin juin. ~15 jours de soleil en juin. Humidité 75%+, 22-28°C' },
  { title: '🧥 Pack rainy season', text: 'Chaussures imperméables, veste légère respirante à capuche, tissus quick-dry, parapluie compact windproof' },
  { title: '🎨 Stratégie anti-pluie', text: 'Matins DEHORS (plus frais + moins de monde), après-midis INDOOR si nuageux : musées, onsen, cafés' },
];

const ICONS = {
  transport: '🚆', hotel: '🏨', spot: '📍', food: '🍜',
  shopping: '🛍', pachinko: '🎰', night: '🌃', tip: '💡', anime: '🎌',
};

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
            <SectionHeader title="🎌 Pèlerinage Anime" subtitle="Seichi Junrei · les spots qu'on adore" />
            <div style={styles.animeIntro}>
              Makoto Shinkai dessine avec une précision telle que ses lieux sont reconnaissables. Ces endroits deviennent sacrés pour les fans.
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
            <SectionHeader title="Hôtels" subtitle="Design/Boutique OU abordable" />
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
            <SectionHeader title="Food & Drink" subtitle="Cafés rétro, yakiniku, kissaten" />
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
            </div>
            <div style={styles.cardGrid}>
              {PACHINKO_SPOTS.map((p, i) => <PachinkoCard key={i} p={p} />)}
            </div>
          </section>
        )}

        {tab === 'tips' && (
          <section>
            <SectionHeader title="Practical tips" subtitle="Essentiels pour juin 2026" />
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
