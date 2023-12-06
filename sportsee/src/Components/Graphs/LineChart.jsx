import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/**
 * Composant de fenêtre modale d'erreur personnalisée pour le graphique à lignes.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {Array} props.payload - Les données du graphique.
 * @param {boolean} props.active - Indique si le curseur est actif.
 * @returns {JSX.Element|null} - Composant de fenêtre modale d'erreur personnalisée ou `null` s'il n'y a pas de données.
 */
function CustomTooltip({ payload, active }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: 'white', paddingLeft: '10px', paddingRight: '10px' }}>
        <p>{payload[0].value} min</p>
      </div>
    );
  }
  return null;
}

/**
 * Composant pour une étiquette d'axe personnalisée pour le graphique à lignes.
 *
 * @param {object} props - Les propriétés du composant.
 * @returns {JSX.Element} - Composant d'étiquette d'axe personnalisée.
 */
function CustomAxisTick(props) {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={12}>
        {payload.value}
      </text>
    </g>
  );
}

/**
 * Composant pour la légende personnalisée du graphique à lignes.
 *
 * @returns {JSX.Element} - Composant de légende personnalisée.
 */
function CustomLegend() {
  return (
    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
      <li style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
        Durée moyenne des  <br/> sessions
      </li>
    </ul>
  );
}

/**
 * Composant de graphique à lignes personnalisé.
 *
 * @component
 * @param {object} props - Les propriétés du composant.
 * @param {Array} props.data - Les données pour le graphique.
 * @returns {JSX.Element} - Composant de graphique à lignes personnalisé.
 */
function CustomLineChart({ data }) {
  const [gradientPosition, setGradientPosition] = useState(50);

  /**
   * Gère l'événement de déplacement de la souris pour mettre à jour la position du gradient.
   *
   * @param {object} e - L'événement de déplacement de la souris.
   */
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setGradientPosition(percentage);
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ backgroundColor: 'red', background: `linear-gradient(to right, red ${gradientPosition -1}%, rgb(200,0,0) ${gradientPosition}%)`, borderRadius: '5px', padding: '5px', width: '200px', height: '200px', aspectRatio: '1/1' }}>
      {/* Conteneur responsive pour le graphique */}
      <ResponsiveContainer width="100%" height="100%" aspect={1}>
        {/* Graphique à lignes */}
        <LineChart
          data={data}
          margin={{
            top: 25, right: 10, left: -50, bottom: 25,
          }}
        >
          {/* Axe X avec étiquettes personnalisées */}
          <XAxis dataKey="day" stroke="white" tickLine={false} axisLine={false} tick={<CustomAxisTick />} />
          {/* Axe Y (transparent) */}
          <YAxis stroke="transparent" />
          {/* Infobulle personnalisée */}
          <Tooltip content={<CustomTooltip />} cursor={false} />
          {/* Légende personnalisée */}
          <Legend content={<CustomLegend />} verticalAlign="top" align="left" wrapperStyle={{ marginLeft: "60px", marginTop: '-20px', width: '200px', height: '36px' }} />
          {/* Ligne du graphique */}
          <Line
            name="Durée moyenne des sessions"
            dot={false}
            type="monotone"
            dataKey="sessionLength"
            stroke="white"
            strokeWidth={1}
            activeDot={{ r: 8, fill: 'white' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomLineChart;
