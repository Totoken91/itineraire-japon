'use client';

import React, { useState } from 'react';

const REGIONS = {
  tokyo:   { label: 'Tokyo',    kanji: '東京',   color: '#FF2D55', glow: 'rgba(255,45,85,0.35)'  },
  nagano:  { label: 'Nagano',   kanji: '長野',   color: '#34C759', glow: 'rgba(52,199,89,0.35)'  },
  kyoto:   { label: 'Kyoto',    kanji: '京都',   color: '#007AFF', glow: 'rgba(0,122,255,0.35)' },
  osaka:   { label: 'Osaka',    kanji: '大阪',   color: '#FF9500', glow: 'rgba(255,149,0,0.35)'  },
};

const ACTIVITIES = {
  tokyo: [
    { name: 'Senso-ji Temple', days: 1, region: 'tokyo' },
    { name: 'Akihabara Electric District', days: 1, region: 'tokyo' },
    { name: 'Shibuya Crossing', days: 1, region: 'tokyo' },
  ],
  nagano: [
    { name: 'Snow Monkey Park', days: 1, region: 'nagano' },
    { name: 'Zenko-ji Temple', days: 1, region: 'nagano' },
  ],
  kyoto: [
    { name: 'Fushimi Inari Shrine', days: 1, region: 'kyoto' },
    { name: 'Arashiyama Bamboo Grove', days: 1, region: 'kyoto' },
    { name: 'Kinkaku-ji Temple', days: 1, region: 'kyoto' },
  ],
  osaka: [
    { name: 'Osaka Castle', days: 1, region: 'osaka' },
    { name: 'Dotonbori Street', days: 1, region: 'osaka' },
  ],
};

export default function JapanTrip() {
  const [selected, setSelected] = useState(new Set());
  const [expandedRegion, setExpandedRegion] = useState(null);

  const toggleActivity = (activity) => {
    const newSelected = new Set(selected);
    newSelected.has(activity) ? newSelected.delete(activity) : newSelected.add(activity);
    setSelected(newSelected);
  };

  const toggleRegion = (region) => {
    setExpandedRegion(expandedRegion === region ? null : region);
  };

  const getTotalDays = () => {
    return Array.from(selected).reduce((sum, activity) => sum + activity.days, 0);
  };

  return (
    <div style={styles.container}>
      <style>{globalStyles}</style>
      <div style={styles.header}>
        <h1 style={styles.title}>Japan Trip Planner 🗾</h1>
        <p style={styles.subtitle}>Plan your Japanese adventure</p>
      </div>

      <div style={styles.content}>
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>Trip Summary</div>
          <div style={styles.summaryItem}>
            <span>Total Days:</span>
            <span style={styles.summaryValue}>{getTotalDays()}</span>
          </div>
          <div style={styles.summaryItem}>
            <span>Activities:</span>
            <span style={styles.summaryValue}>{selected.size}</span>
          </div>
          <button style={styles.resetButton} onClick={() => setSelected(new Set())}>
            Reset
          </button>
        </div>

        <div style={styles.main}>
          <div style={styles.regionsGrid}>
            {Object.entries(REGIONS).map(([key, region]) => (
              <div
                key={key}
                style={{
                  ...styles.regionCard,
                  borderColor: region.color,
                  boxShadow: `0 0 20px ${region.glow}`,
                }}
                onClick={() => toggleRegion(key)}
              >
                <div style={styles.regionHeader}>
                  <h2 style={styles.regionTitle}>{region.label}</h2>
                  <span style={styles.regionKanji}>{region.kanji}</span>
                </div>

                {expandedRegion === key && (
                  <div style={styles.activitiesContainer}>
                    {ACTIVITIES[key].map((activity, idx) => (
                      <label key={idx} style={styles.activityLabel}>
                        <input
                          type="checkbox"
                          checked={selected.has(activity)}
                          onChange={() => toggleActivity(activity)}
                          style={styles.checkbox}
                        />
                        <span style={styles.activityName}>{activity.name}</span>
                        <span style={styles.activityDays}>({activity.days}d)</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    color: #fff;
    min-height: 100vh;
  }
`;

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    paddingTop: '20px',
  },
  title: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '10px',
    background: 'linear-gradient(45deg, #FF2D55, #34C759, #007AFF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '18px',
    color: '#ccc',
    fontWeight: '300',
  },
  content: {
    display: 'flex',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sidebar: {
    width: '250px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '20px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    height: 'fit-content',
  },
  sidebarHeader: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#fff',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    fontSize: '14px',
  },
  summaryValue: {
    fontWeight: '600',
    color: '#34C759',
  },
  resetButton: {
    width: '100%',
    padding: '10px',
    marginTop: '20px',
    background: 'linear-gradient(45deg, #FF2D55, #FF6B6B)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },
  main: {
    flex: 1,
  },
  regionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  regionCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '15px',
    padding: '25px',
    border: '2px solid',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
  },
  regionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  regionTitle: {
    fontSize: '24px',
    fontWeight: '700',
  },
  regionKanji: {
    fontSize: '32px',
    opacity: 0.7,
  },
  activitiesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  activityLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'background 0.2s ease',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  activityName: {
    flex: 1,
    fontSize: '14px',
  },
  activityDays: {
    fontSize: '12px',
    opacity: 0.6,
  },
};
