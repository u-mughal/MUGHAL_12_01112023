import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Composant de graphique radar personnalisé.
 *
 * @component
 * @param {object} props - Les propriétés du composant.
 * @param {Array} props.data - Les données pour le graphique radar.
 * @returns {JSX.Element} - Composant de graphique radar personnalisé.
 */
export default function CustomRadarChart({ data }) {
  // Inverser les données pour afficher le radar dans le sens inverse des aiguilles d'une montre.
  const reversedData = [...data].reverse();

  return (
    <div style={{ backgroundColor: '#282D30', borderRadius: '5px', width: '200px', height: '200px', padding: '5px', aspectRatio: '1/1' }}>
      {/* Conteneur responsive pour le graphique */}
      <ResponsiveContainer width="100%" height="100%" aspect={1}>
        {/* Graphique radar */}
        <RadarChart cx="50%" cy="50%" outerRadius={70} data={reversedData}>
          {/* Grille polaire de type polygone */}
          <PolarGrid gridType="polygon" />
          {/* Axe des angles polaires avec étiquettes personnalisées */}
          <PolarAngleAxis dataKey="kind" tick={{ fontSize: '10px' }} />
          {/* Infobulle par défaut */}
          <Tooltip />
          {/* Radar avec nom, données et style de remplissage */}
          <Radar name="Performance" dataKey="value" fill="red" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
