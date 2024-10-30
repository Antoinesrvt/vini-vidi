import React from 'react';
import { Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { WebView } from 'react-native-webview';

type MapComponentProps = {
  latitude: number;
  longitude: number;
  interactive?: boolean;
  style?: any;
};

export const MapComponent = ({ latitude, longitude, interactive = true, style }: MapComponentProps) => {
  if (Platform.OS === 'web') {
    // Use OpenStreetMap for web
    return (
      <WebView
        style={style}
        source={{
          html: `
            <div id="map" style="height: 100%; width: 100%;"></div>
            <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
            <link href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" rel="stylesheet">
            <script>
              const map = L.map('map').setView([${latitude}, ${longitude}], 13);
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
              }).addTo(map);
              L.marker([${latitude}, ${longitude}]).addTo(map);
              ${!interactive ? 'map.dragging.disable(); map.touchZoom.disable(); map.doubleClickZoom.disable(); map.scrollWheelZoom.disable();' : ''}
            </script>
          `
        }}
      />
    );
  }

  // Use react-native-maps for native platforms
  return (
    <MapView
      style={style}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      pitchEnabled={interactive}
      rotateEnabled={interactive}
      zoomEnabled={interactive}
      scrollEnabled={interactive}
    >
      <Marker coordinate={{ latitude, longitude }} />
    </MapView>
  );
}; 