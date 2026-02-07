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
                    <>
                        <div className="md:col-span-3 bg-gridlock-panel border border-white/10 rounded-xl overflow-hidden relative h-[500px]">
                            {/* MAP CONTAINER */}
                            <MapContainer
                                center={center}
                                zoom={11}
                                style={{ height: "100%", width: "100%", background: "#050505" }}
                                zoomControl={false}
                            >
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                />
                                <MapController center={center} zoom={11} />

                                {/* RENDER CRASH POINTS */}
                                {visibleData.map((point, idx) => {
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

                            {/* OVERLAY CONTROLS */}
                            <div className="absolute top-4 right-4 z-[400] bg-black/80 backdrop-blur border border-white/20 p-4 rounded-lg w-64">
                                <div className="text-xs text-gridlock-muted mb-2 font-mono uppercase tracking-widest">Data Layer Strength</div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={sliderVal}
                                    onChange={(e) => setSliderVal(e.target.value)}
                                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gridlock-cyan"
                                />
                                <div className="flex justify-between mt-2 text-[10px] font-mono">
                                    <span className="text-gridlock-red">LEGACY (52%)</span>
                                    <span className="text-gridlock-cyan">FULL (100%)</span>
                                </div>
                            </div>
                        </div>

                        {/* STATS HUD BAR */}
                        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div className="bg-gridlock-panel/40 border border-white/10 p-4 rounded-lg flex flex-col items-center justify-center">
                                <div className="text-3xl font-tech font-bold text-white">60,001</div>
                                <div className="text-xs text-gridlock-muted uppercase tracking-wider mt-1">Total Crashes</div>
                            </div>
                            <div className="bg-gridlock-panel/40 border border-gridlock-red/30 p-4 rounded-lg flex flex-col items-center justify-center">
                                <div className="text-3xl font-tech font-bold text-gridlock-red">18,240</div>
                                <div className="text-xs text-gridlock-red/70 uppercase tracking-wider mt-1">Total Injured</div>
                            </div>
                            <div className="bg-gridlock-panel/40 border border-gridlock-cyan/30 p-4 rounded-lg flex flex-col items-center justify-center">
                                <div className="text-3xl font-tech font-bold text-gridlock-cyan">8,342</div>
                                <div className="text-xs text-gridlock-cyan/70 uppercase tracking-wider mt-1">Vulnerable Users</div>
                            </div>
                            <div className="bg-gridlock-panel/40 border border-white/10 p-4 rounded-lg flex flex-col items-center justify-center">
                                <div className="text-3xl font-tech font-bold text-white">$1.8B</div>
                                <div className="text-xs text-gridlock-muted uppercase tracking-wider mt-1">Est. Econ Impact</div>
                            </div>
                        </div>
                    </>
    );
};
