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
        <div className="flex flex-col gap-4 h-full">
            <div className="md:col-span-3 bg-gridlock-panel border border-white/10 rounded-xl overflow-hidden relative flex-1 min-h-0">
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
                    {data.map((point, idx) => {
                        const isRecovered = point.rec === 1; // Assuming 'rec' field exists
                        const opacity = isRecovered ? (sliderVal / 100) : 1;
                        const color = isRecovered ? "#ff003c" : "#00f3ff";

                        if (opacity < 0.1) return null;

                        return (
                            <CircleMarker
                                key={idx}
                                center={[point.lat, point.lng || point.lon]} // Handle potential key diff
                                radius={point.severity > 5 ? 5 : 2}
                                pathOptions={{
                                    color: color,
                                    fillColor: color,
                                    fillOpacity: opacity * 0.6,
                                    weight: 0
                                }}
                            >
                                <Popup className="custom-popup">
                                    <div className="p-2 bg-black text-white font-mono text-xs">
                                        <div className="font-bold text-gridlock-cyan border-b border-white/20 mb-1 pb-1">
                                            {isRecovered ? "FORENSIC RECOVERY" : "STANDARD RECORD"}
                                        </div>
                                        <div>Severity: {point.severity}</div>
                                        {point.borough && <div>Borough: {point.borough}</div>}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        </div>
    );
};
