// Code For Practice

// import React from "react";
// import { View, StyleSheet, Alert } from "react-native";

// import { Circle } from "react-native-maps";

// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { Marker } from "react-native-maps";

// import { Polyline } from "react-native-maps";

// const GoogleMap = () => {
//   const handleLocationPress = (data, details = null) => {
//     if (details && details.description) {
//       const { description, structured_formatting } = details;
//       const mainText = structured_formatting
//         ? structured_formatting.main_text
//         : "";
//       const secondaryText = structured_formatting
//         ? structured_formatting.secondary_text
//         : "";

//       Alert.alert(
//         "Location Details",
//         `Description: ${description}\nMain Text: ${mainText}\nSecondary Text: ${secondaryText}`
//       );
//     } else {
//       console.error("Invalid details object:", details);
//     }
//   };

//   const markerArray = [
//     {
//       id: 1,
//       latitude: 33.685,
//       longitude: 73.03,
//       title: "Location of Shayan",
//       description: "This is Shaaani Here",
//     },

//     {
//       id: 2,
//       latitude: 33.6844,
//       longitude: 73.0479,
//       title: "Location of Muneeb",
//       description: "This is Muneeb Here",
//     },
//   ];

//   const polylineCoordinates = [
//     { latitude: 33.6844, longitude: 73.0479 },
//     { latitude: 33.685, longitude: 73.03 },
//   ];
//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <GooglePlacesAutocomplete
//           placeholder="Search"
//           onPress={handleLocationPress}
//           query={{
//             key: "AIzaSyDkhbfPOStZtd8mp1-_RSeonvo8ePxsjZk",
//             language: "en",
//           }}
//           onFail={(error) => {
//             console.log("There is some error " + error);
//           }}
//         />
//       </View>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         region={{
//           latitude: 33.6844,
//           longitude: 73.0479,
//           latitudeDelta: 0.1,
//           longitudeDelta: 0.1,
//         }}
//       >
//         {markerArray.map((marker) => (
//           <Marker
//             draggable
//             onDragEnd={(e) => {
//               console.log({ x: e.nativeEvent.coordinate });
//             }}
//             key={marker.id}
//             coordinate={{
//               latitude: marker.latitude,
//               longitude: marker.longitude,
//             }}
//             title={marker.title}
//             description={marker.description}
//           />
//         ))}

//         <Circle
//           center={{ latitude: 33.6844, longitude: 73.0479 }}
//           radius={200}
//           fillColor="black"
//           strokeColor="grey"
//         />

//         <Polyline
//           coordinates={polylineCoordinates}
//           strokeWidth={6}
//           strokeColor="black"
//         />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   searchContainer: {
//     zIndex: 1,
//     flex: 0.5,
//     width: "100%",
//     position: "absolute",
//     padding: 40,
//   },
//   container: {
//     flex: 1,
//     flexDirection: "column",
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//     zIndex: 0,
//   },
// });

// export default GoogleMap;

// New Fresh Code

import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GoogleMap = () => {
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  const [markers, setMarkers] = React.useState([]);

  const handleLocationPress = (data, details = null) => {
    if (data && data.description) {
      console.log("Data.description" + data.description);
      const { geometry } = details;
      const { description } = data;

      if (geometry && geometry.location) {
        const { location } = geometry;
        console.log("Location Object:", location);

        setSelectedLocation({
          description,
          location,
        });

        setMarkers((prevMarkers) => [
          ...prevMarkers,
          {
            id: Date.now(), // Unique ID for each marker
            description,
            location,
          },
        ]);

        Alert.alert(
          "Location Details",
          `Description: ${description}\nLatitude: ${location.lat}\nLongitude: ${location.lng}`
        );
      } else {
        console.error("Invalid geometry object:", geometry);
      }
    } else {
      console.error("Invalid data object:", data);
    }
  };

  //  Handle double press function

  const handleDoublePress = (e) => {
    const { coordinate } = e.nativeEvent;

    setSelectedLocation({
      description: "Double Pressed Location",
      location: {
        lat: coordinate.latitude,
        lng: coordinate.longitude,
      },
    });

    setMarkers((prevMarkers) => [
      ...prevMarkers,
      {
        id: Date.now(), // Unique ID for each marker
        description: "Double Pressed Location",
        location: {
          lat: coordinate.latitude,
          lng: coordinate.longitude,
        },
      },
    ]);

    Alert.alert(
      "Location Details",
      `Description: Double Pressed Location\nLatitude: ${coordinate.latitude}\nLongitude: ${coordinate.longitude}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details) => handleLocationPress(data, details)}
          query={{
            key: "AIzaSyDkhbfPOStZtd8mp1-_RSeonvo8ePxsjZk",
            language: "en",
          }}
          fetchDetails={true}
          onFail={(error) => {
            console.log("There is some error " + error);
          }}
        />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onDoublePress={handleDoublePress}
        region={
          selectedLocation
            ? {
                latitude: selectedLocation.location.lat,
                longitude: selectedLocation.location.lng,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }
            : {
                latitude: 33.6844,
                longitude: 73.0479,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }
        }
      >
        {selectedLocation &&
          markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.location.lat,
                longitude: marker.location.lng,
              }}
              title={marker.description}
              description={selectedLocation.description || ""}
            />
          ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    zIndex: 1,
    flex: 0.5,
    width: "100%",
    position: "absolute",
    padding: 40,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
});

export default GoogleMap;
