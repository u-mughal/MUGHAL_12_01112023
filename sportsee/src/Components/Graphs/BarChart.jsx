import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle, ResponsiveContainer} from 'recharts';

/**
 * Fonction qui extrait les trois valeurs de kilogrammes uniques les plus élevées.
 *
 * @param {Array} data - Les données brutes.
 * @returns {Array} - Les trois valeurs de kilogrammes uniques les plus élevées.
 */
function getTopThreeUniqueKilograms(data) {
  const uniqueKilograms = [...new Set(data.map(item => item.kilogram))].sort((a, b) => b - a);
  return uniqueKilograms.slice(0, 3);
}

/**
 * Composant de barre personnalisée pour le graphique à barres.
 *
 * @param {object} props - Les propriétés du composant.
 * @returns {JSX.Element} - Composant de barre personnalisée.
 */
const CustomBar = (props) => {
  const { x, y, width, height, ...others } = props;
  const newY = y - 10;
  const newHeight = height + 10;
  return <Rectangle {...others} x={x} y={newY} width={width} height={newHeight} />;
};

/**
 * Composant de fenêtre modale d'erreur personnalisée pour le graphique à barres.
 *
 * @param {object} props - Les propriétés du composant.
 * @returns {JSX.Element|null} - Composant de fenêtre modale d'erreur personnalisée ou `null` s'il n'y a pas de données.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'red',
        padding: '2px',
        fontSize: '10px',
        color: 'white',
        textAlign: 'center',
      }}>
        <p>{`${payload[0].value} Kg`}</p>
        <p>{`${payload[1].value} Kcal`}</p>
      </div>
    );
  }
  return null;
};

/**
 * Composant de graphique à barres personnalisé.
 *
 * @component
 * @param {object} props - Les propriétés du composant.
 * @param {Array} props.data - Les données pour le graphique.
 * @returns {JSX.Element} - Composant de graphique à barres personnalisé.
 */
function CustomBarChart({ data }) {
  // Extraction des trois valeurs de kilogrammes uniques les plus élevées
  const topThreeKilograms = getTopThreeUniqueKilograms(data);
  // Calcul des valeurs maximale et minimale des kilogrammes
  const maxKilogram = Math.max(...topThreeKilograms);
  const minKilogram = Math.min(...topThreeKilograms);
  // Domaine des calories basé sur le kilogramme maximal
  const calorieDomain = [0, maxKilogram * 2];

  return (
    <div style={{ backgroundColor: '#FBFBFB', padding: '40px 2px 10px', width: '100%', height: '250px', aspectRatio: '16/9' }}>
      {/* Conteneur responsive pour le graphique */}
      <ResponsiveContainer width={"100%"} height={"100%"}>
        {/* Graphique à barres */}
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 60, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          {/* Axe Y droit pour les kilogrammes */}
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[minKilogram, maxKilogram]}
            tickCount={topThreeKilograms.length}
            tickFormatter={(value) => topThreeKilograms.includes(value) ? value : ''}
            ticks={topThreeKilograms}
          />
          {/* Axe Y gauche pour les calories (caché) */}
          <YAxis yAxisId="left" orientation="left" domain={calorieDomain} hide={true} />
          {/* Infobulle personnalisée */}
          <Tooltip content={<CustomTooltip />} />
          {/* Barres pour les kilogrammes avec une forme personnalisée */}
          <Bar radius={[5, 5, 0, 0]} yAxisId="right" dataKey="kilogram" fill="#282D30" barSize={10} shape={<CustomBar />} />
          {/* Barres pour les calories avec une forme personnalisée */}
          <Bar radius={[5, 5, 0, 0]} yAxisId="left" dataKey="calories" fill="#ff0000" barSize={10} shape={<CustomBar />} />
          {/* Légende */}
          <Legend
            align="right"
            verticalAlign="top"
            wrapperStyle={{ paddingLeft: '40px', top: '-10px' }}
            payload={[
              { value: 'Poids (kg)', type: 'circle', id: 'ID01', color: '#282D3' },
              { value: 'Calories brûlées (kCal)', type: 'circle', id: 'ID02', color: '#ff0000' }
            ]}
          />
          {/* Texte du titre */}
          <text x={50} y={10} fontSize={14} fontWeight="bold">
            Activité quotidienne
          </text>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomBarChart;
