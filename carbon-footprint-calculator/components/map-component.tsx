"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

type MapComponentProps = {
  route: {
    origin: { lat: number; lng: number; name: string }
    destination: { lat: number; lng: number; name: string }
    distance?: number
  }
}

export default function MapComponent({ route }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Initialize map if it doesn't exist
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([0, 0], 2)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)
    }

    const map = mapRef.current
    if (!map) return

    // Clear previous markers and routes
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer)
      }
    })

    const { origin, destination } = route

    // Create custom icons
    const originIcon = L.divIcon({
      html: `<div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">A</div>`,
      className: "custom-div-icon",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    })

    const destIcon = L.divIcon({
      html: `<div class="flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white">B</div>`,
      className: "custom-div-icon",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    })

    // Add markers
    const originMarker = L.marker([origin.lat, origin.lng], { icon: originIcon })
      .addTo(map)
      .bindPopup(`<b>Origin:</b> ${origin.name}`)

    const destMarker = L.marker([destination.lat, destination.lng], { icon: destIcon })
      .addTo(map)
      .bindPopup(`<b>Destination:</b> ${destination.name}`)

    // Draw route line
    const routeLine = L.polyline(
      [
        [origin.lat, origin.lng],
        [destination.lat, destination.lng],
      ],
      { color: "#10b981", weight: 4, opacity: 0.7, dashArray: "10, 10" },
    ).addTo(map)

    // Fit map to show both markers
    const bounds = L.latLngBounds([
      [origin.lat, origin.lng],
      [destination.lat, destination.lng],
    ])
    map.fitBounds(bounds, { padding: [50, 50] })

    // Add distance label if available
    if (route.distance) {
      const midpoint = [(origin.lat + destination.lat) / 2, (origin.lng + destination.lng) / 2]

      L.marker(midpoint as L.LatLngExpression, {
        icon: L.divIcon({
          html: `<div class="px-2 py-1 bg-background border rounded text-xs">${route.distance.toFixed(1)} km</div>`,
          className: "distance-label",
          iconSize: [80, 20],
          iconAnchor: [40, 10],
        }),
      }).addTo(map)
    }

    return () => {
      // Cleanup will happen on next effect run
    }
  }, [route])

  return <div ref={mapContainerRef} className="h-[400px] w-full rounded-md" />
}
