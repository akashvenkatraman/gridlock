import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

const MapController = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

export const InteractiveMap = ({ data }) => {
    if (!data) return null;
    const [sliderVal, setSliderVal] = useState(50); // 0 = Raw, 100 = Full Recovery
    const [center] = useState([40.7128, -74.0060]);

    // CartoDB Dark Matter Tiles (Free, no API key needed)
    const tileUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

    return (
        <div className="relative w-full h-[600px] border border-gridlock-cyan/20 rounded-xl overflow-hidden shadow-2xl bg-gridlock-bg">
            {/* Map Header Overlay */}
            <div className="absolute top-4 left-4 z-[400] bg-gridlock-panel/90 backdrop-blur p-4 rounded border border-gridlock-cyan/30 max-w-xs">
                <h3 className="text-gridlock-cyan font-tech text-lg font-bold">SPATIAL RECOVERY SYSTEM</h3>
                <p className="text-xs text-gridlock-muted font-mono mt-1">
                    Drag slider to visualize recovered coordinates.
                </p>
            </div>

            <MapContainer
                center={center}
                zoom={11}
                style={{ height: "100%", width: "100%", background: "#0a0a0a" }}
                zoomControl={false}
                scrollWheelZoom={false}
            >
                <TileLayer url={tileUrl} />
                <MapController center={center} zoom={11} />

                {/* Data Points */}
                {data.map((point) => {
                    // If rec=1 (recovered), visibility depends on slider
                    // If rec=0 (original), always visible (or fade out if slider goes left? No, "Before" is Raw data)

                    // Logic:
                    // Slider 0: Show ONLY Original (rec=0)
                    // Slider 100: Show ALL (Original + Recovered)

                    // Opacity of recovered points
                    const isRecovered = point.rec === 1;
                    const opacity = isRecovered ? (sliderVal / 100) : 1;

                    // Color: Cyan for Original, Red for Recovered (to highlight them) 
                    // OR: Red for Danger (Severity), Cyan for New?
                    // Let's stick to: Cyan = Original, Red = Recovered (Newly found danger)
                    const color = isRecovered ? "#ff003c" : "#00f3ff";

                    if (opacity < 0.1) return null; // Performance optimization

                    return (
                        <CircleMarker
                            key={point.id}
                            center={[point.lat, point.lng]}
                            radius={3 + (point.severity / 5)} // Size by severity
                            pathOptions={{
                                color: color,
                                fillColor: color,
                                fillOpacity: opacity * 0.6,
                                weight: 0
                            }}
                        >
                            <Popup className="custom-popup">
                                <div className="bg-gridlock-bg text-white p-2 font-mono text-xs">
                                    <strong className="text-gridlock-cyan">ID: {point.id}</strong><br />
                                    Severity: {point.severity}<br />
                                    Recovered: {isRecovered ? "YES" : "NO"}
                                </div>
                            </Popup>
                        </CircleMarker>
                    );
                })}
            </MapContainer>

            {/* Slider Control */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[400] w-64 md:w-96 bg-gridlock-panel/80 backdrop-blur px-6 py-4 rounded-full border border-gridlock-cyan/30">
                <div className="flex justify-between text-xs font-mono text-gridlock-cyan mb-2">
                    <span>RAW_DATA</span>
                    <span>RECOVERED</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(e.target.value)}
                    className="w-full h-1 bg-gridlock-bg rounded-lg appearance-none cursor-pointer accent-gridlock-cyan"
                />
            </div>
        </div>
    );
};
