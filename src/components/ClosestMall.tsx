// import { createSignal, onCleanup } from 'solid-js';
// import fetch from 'node-fetch';

// function findClosestMall(apiKey, latitude, longitude, radius = 5000) {
//     return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=shopping_mall&key=${apiKey}`)
//         .then(response => response.json())
//         .then(data => data.results.length > 0 ? data.results[0] : null);
// }

// // Replace 'your_api_key' with your actual Google Maps API key
// const apiKey = 'your_api_key';
// const latitude = 40.7128; // Example latitude (New York City)
// const longitude = -74.0060; // Example longitude (New York City)

// function ClosestMall() {
//     const [closestMall, setClosestMall] = createSignal(null);

//     findClosestMall(apiKey, latitude, longitude)
//         .then(mall => setClosestMall(mall))
//         .catch(error => console.error("Error:", error));

//     onCleanup(() => {
//         // Clean up any resources if needed
//     });

//     return (
//         <div>
//             {closestMall !== null ? (
//                 <div>
//                     <h1>Closest mall found:</h1>
//                     <p>Name: {closestMall.name}</p>
//                     <p>Address: {closestMall.vicinity}</p>
//                 </div>
//             ) : (
//                 <p>No malls found nearby.</p>
//             )}
//         </div>
//     );
// }

// export default ClosestMall;
