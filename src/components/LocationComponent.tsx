// import { onCleanup, createSignal } from 'solid-js';

// function LocationComponent() {
//     const [location, setLocation] = createSignal(null);

//     onCleanup(() => {
//         // Cleanup any resources if needed
//     });

//     const getLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 position => {
//                     const latitude = position.coords.latitude;
//                     const longitude = position.coords.longitude;
//                     // setLocation({ latitude, longitude });
//                     console.log(position)
//                 },
//                 error => {
//                     console.error("Error getting location:", error);
//                 }
//             );
//         } else {
//             console.error("Geolocation is not supported by this browser.");
//         }
//     };

//     return (
//         <div>
//             <button onClick={getLocation}>Get Location</button>
//             {/* {location && (
//                 <div>
//                     Latitude: {location?.latitude}, Longitude: {location.longitude}
//                 </div>
//             )} */}
//         </div>
//     );
// }

// export default LocationComponent;
