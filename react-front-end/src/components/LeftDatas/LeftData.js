<<<<<<< HEAD
// import React from 'react';

// // import ReactWordcloud from 'react-wordcloud';
// import words from './tempWords';

// import './LeftData.scss';


// const callbacks = {
//   getWordColor: word => word.value > 50 ? 'green' : "pink",
//   getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
// }
// const options = {
//   rotations: 2,
//   rotationAngles: [0, 0],
//   fontFamily: 'UniNeue'

// };
// const size = [500, 200];


// export default function LeftData() {

//   return (
//     <section className="leftData">
//       <div className='dataContainer'>
//         more data
//         </ div>
//       <div className='dataContainer'>
//         more data
//         </ div>

//       <div className='dataContainer'>
//         more data
//         </ div>
//       <div className='dataContainer'>
//         <ReactWordcloud
//           callbacks={callbacks}
//           options={options}
//           size={size}
//           words={words}
//           className='wordCloud'
//         />
//       </ div>
//     </section>
//   );
// }
=======
import React from 'react';

import words from './tempWords';

import './LeftData.scss';
import Wordcloud from './Wordcloud';
import SentiBarChart from './BarChart';
import SentiPieChart from './PieChart';

export default function LeftData() {

  return (
    <section className="leftData">

      <span>Sentiment Analysis</span>
      <div className='dataContainer'>
        <SentiBarChart />
      </ div>

      <span>Pie Chart</span>
      <div className='dataContainer'>
        <SentiPieChart />
      </ div>

      <span>Common words</span>
      <div className='dataContainer'>
        <Wordcloud words={words} />
      </ div>
    </section>
  );
}
>>>>>>> master
