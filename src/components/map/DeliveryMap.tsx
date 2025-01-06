import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { colors } from "../../theme/shared-styles";

// Replace with your Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1Ijoic3BhY282NyIsImEiOiJjbHVxenlveXkwMmZxMm1uMW01MmY0dzBjIn0.lPuj0ZZXvvcfaWqZq9eyLg";

interface Location {
  lng: number;
  lat: number;
  address: string;
}

interface DeliveryMapProps {
  pickup?: Location;
  dropoff?: Location;
  onLocationSelect?: (location: Location) => void;
}

export function DeliveryMap({
  pickup,
  dropoff,
  onLocationSelect,
}: DeliveryMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40], // Default center
      zoom: 13,
    });

    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || !pickup || !dropoff) return;

    // Add markers for pickup and dropoff
    new mapboxgl.Marker({ color: colors.primary })
      .setLngLat([pickup.lng, pickup.lat])
      .addTo(map.current);

    new mapboxgl.Marker({ color: colors.danger })
      .setLngLat([dropoff.lng, dropoff.lat])
      .addTo(map.current);

    // Draw route between points
    const bounds = new mapboxgl.LngLatBounds()
      .extend([pickup.lng, pickup.lat])
      .extend([dropoff.lng, dropoff.lat]);

    map.current.fitBounds(bounds, {
      padding: 50,
    });

    // Get route from Mapbox Directions API
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/` +
        `${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}` +
        `?geometries=geojson&access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        const route = data.routes[0].geometry;

        if (map.current?.getSource("route")) {
          (map.current.getSource("route") as mapboxgl.GeoJSONSource).setData({
            type: "Feature",
            properties: {},
            geometry: route,
          });
        } else {
          map.current?.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {},
                geometry: route,
              },
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": colors.primary,
              "line-width": 4,
              "line-opacity": 0.75,
            },
          });
        }
      });
  }, [pickup, dropoff]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
}
