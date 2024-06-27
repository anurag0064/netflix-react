// import React, { useEffect, useState } from 'react';


// const Personal = () => {
//   const [personDetails, setPersonDetails] = useState([]);

//   const fetchData = async () => {
//     try {
//       const data = await fetchPer();
//       setPersonDetails(data.results);
//     } catch (error) {
//       console.error('Error fetching person details:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Popular People</h1>
//       <ul>
//         {personDetails.map(person => (
//           <li key={person.id}>{person.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default Personal;
