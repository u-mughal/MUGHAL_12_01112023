import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, Legend } from 'recharts';

/**
 * Composant de légende personnalisée pour le graphique à barres radiales.
 *
 * @returns {JSX.Element} - Composant de légende personnalisée.
 */
function CustomLegend() {
  return (
    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
      <li style={{ color: 'rgba(0,0,0,0.5)', fontSize: '15px', fontWeight: '700' }}>
        Score
      </li>
    </ul>
  );
}

/**
 * Composant de graphique à barres radiales personnalisé.
 *
 * @component
 * @param {object} props - Les propriétés du composant.
 * @param {number} props.data - La valeur du score pour le graphique à barres radiales (entre 0 et 1).
 * @returns {JSX.Element} - Composant de graphique à barres radiales personnalisé.
 */
export default function CustomRadialBarChart({ data }) {
  // Calcul de la valeur en pourcentage
  const percentageValue = data * 100;
  // Données pour le graphique à barres radiales
  const dataRadialBar = [
    { name: 'Score', value: percentageValue, fill: '#ff0101' },
  ];

  // Styles pour les pourcentages et le texte de l'objectif
  const percentageStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FBFBFB',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const goalTextStyle = {
    position: 'absolute',
    top: '55%',
    left: '58%',
    transform: 'translateX(-50%)',
    backgroundColor: '#FBFBFB',
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.7)',
  };

  return (
    <div style={{
      width: '200px',
      height: '200px',
      backgroundColor: '#FBFBFB',
      display: 'flex',
      padding: '5px',
      borderRadius: '5px',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Graphique à barres radiales */}
      <RadialBarChart width={200} height={200} startAngle={90} endAngle={450} innerRadius={80} outerRadius={260} cy="55%" barSize={10} data={dataRadialBar}>
        {/* Axe des angles polaires de type nombre avec des ticks désactivés */}
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        {/* Barre radiale avec des propriétés personnalisées */}
        <RadialBar
          minAngle={15}
          clockWise={true}
          dataKey="value"
          cornerRadius={10}
          fill="#FF4136"
        />
        {/* Légende personnalisée */}
        <Legend content={<CustomLegend />} verticalAlign="top" align="left" wrapperStyle={{ marginLeft: "20px", marginTop: '-20px', width: '200px', height: '36px' }} />

        {/* Cercle blanc au centre du graphique */}
        <svg width="200" height="200">
          <circle cx="100" cy="110" r="75" fill="white" />
        </svg>
      </RadialBarChart>

      {/* Affichage du pourcentage au centre du graphique */}
      <div style={percentageStyle}>
        {percentageValue}%
      </div>

      {/* Affichage du texte de l'objectif */}
      <div style={goalTextStyle}>
        De votre objectif
      </div>
    </div>
  );
}
