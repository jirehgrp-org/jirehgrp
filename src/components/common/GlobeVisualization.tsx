/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @/components/common/GlobeVisualization.tsx

"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Color, Scene, Fog, Vector3, Group } from "three";
import ThreeGlobe from "three-globe";
import { useFrame, Canvas, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "next-themes";
import countries from "@/data/globe.json";
import { useLanguage } from "@/components/context/LanguageContext";

// Extend Three-Globe for Fiber
extend({ ThreeGlobe });

const CONTINENT_COLORS = {
  "North America": "#4169E1",
  "South America": "#32CD32",
  Europe: "#9370DB",
  Africa: "#CD853F",
  Asia: "#DC143C",
  Oceania: "#FF8C00",
  Antarctica: "#F0F8FF",
};

// Ethiopia's coordinates
const ETHIOPIA_COORDINATES = {
  lat: 9.145,
  lng: 40.489,
};

// Define major cities for transactions
const MAJOR_CITIES = [
  { city: "Addis Ababa", lat: 8.9806, lng: 38.7578 },
  { city: "New York", lat: 40.7128, lng: -74.006 },
  { city: "London", lat: 51.5074, lng: -0.1278 },
  { city: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { city: "Dubai", lat: 25.2048, lng: 55.2708 },
  { city: "Paris", lat: 48.8566, lng: 2.3522 },

  // Africa
  { city: "Cairo", lat: 30.0444, lng: 31.2357 },
  { city: "Lagos", lat: -6.2088, lng: 106.8456 },
  { city: "Johannesburg", lat: -26.2041, lng: 28.0473 },
  { city: "Nairobi", lat: -1.2921, lng: 36.8219 },

  // Asia
  { city: "Singapore", lat: 1.3521, lng: 103.8198 },
  { city: "Seoul", lat: 37.5665, lng: 126.978 },
  { city: "Mumbai", lat: 19.076, lng: 72.8777 },
  { city: "Shanghai", lat: 31.2304, lng: 121.4737 },

  // Europe
  { city: "Berlin", lat: 52.52, lng: 13.405 },
  { city: "Rome", lat: 41.9028, lng: 12.4964 },
  { city: "Stockholm", lat: 59.3293, lng: 18.0686 },
  { city: "Madrid", lat: 40.4168, lng: -3.7038 },

  // Americas
  { city: "São Paulo", lat: -23.5505, lng: -46.6333 },
  { city: "Mexico City", lat: 19.4326, lng: -99.1332 },
  { city: "Toronto", lat: 43.6532, lng: -79.3832 },
  { city: "Los Angeles", lat: 34.0522, lng: -118.2437 },

  // Oceania
  { city: "Sydney", lat: -33.8688, lng: 151.2093 },
  { city: "Melbourne", lat: -37.8136, lng: 144.9631 },
  { city: "Auckland", lat: -36.8509, lng: 174.7645 },
];

// Generate arcs from Ethiopia to major cities
const generateArcs = () => {
  return MAJOR_CITIES.map((city, index) => ({
    startLat: ETHIOPIA_COORDINATES.lat,
    startLng: ETHIOPIA_COORDINATES.lng,
    endLat: city.lat,
    endLng: city.lng,
    color: index % 2 === 0 ? "#0066FF" : "#2E2E2E",
    order: index,
  }));
};

const getDefaultConfig = (theme: string | undefined) => {
  const isLightMode = theme === "light";

  return {
    globeColor: isLightMode ? "#1F1F1F" : "#FFF0DF",
    polygonColor: isLightMode ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.7)",
    showAtmosphere: isLightMode,
    atmosphereColor: isLightMode ? "#99ccff" : "#ff6666",
    atmosphereAltitude: 0.18,
    emissive: isLightMode ? "#1F1F1F" : "#FFF0DF",
    emissiveIntensity: 0.35,
    shininess: 1,

    // Inverted light colors
    ambientLight: isLightMode ? "#FFF0DF" : "#1F1F1F",
    directionalLight: isLightMode ? "#ffffff" : "#808080",
    pointLight: isLightMode ? "#ffffff" : "#999999",

    arcTime: 2000,
    arcLength: 0.9,
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
};


// Custom Controls component to set initial position facing Africa
const CustomControls = ({
  config,
}: {
  config: ReturnType<typeof getDefaultConfig>;
}) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (controlsRef.current && !initializedRef.current) {
      camera.position.set(100, 200, 300);
      controlsRef.current.target = new Vector3(0, 0, 0);
      controlsRef.current.update();
      initializedRef.current = true;
    }
  }, [camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      camera={camera}
      domElement={gl.domElement}
      enablePan={false}
      enableZoom={false}
      minDistance={300}
      maxDistance={300}
      autoRotate={config.autoRotate}
      autoRotateSpeed={config.autoRotateSpeed}
      minPolarAngle={Math.PI / 3.5}
      maxPolarAngle={Math.PI - Math.PI / 3}
    />
  );
};

const Globe = ({ config }: { config: ReturnType<typeof getDefaultConfig> }) => {
  const groupRef = useRef<Group>(null);
  const globeRef = useRef<ThreeGlobe | null>(null);
  const { language } = useLanguage();

  // Rotate the group manually each frame
  useFrame(() => {
    if (groupRef.current && config.autoRotate) {
      groupRef.current.rotation.y += config.autoRotateSpeed * 0.001;
    }
  });

  useEffect(() => {
    if (!globeRef.current) {
      globeRef.current = new ThreeGlobe();
      if (groupRef.current) {
        groupRef.current.add(globeRef.current);
      }
    }
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    const cleanupGlobe = () => {
      globeRef.current?.hexPolygonsData([]).arcsData([]);
    };

    const configureGlobe = () => {
      const globeMaterial = globeRef.current!.globeMaterial() as any;
      globeMaterial.color = new Color(config.globeColor);
      globeMaterial.emissive = new Color(config.emissive);
      globeMaterial.emissiveIntensity = config.emissiveIntensity;
      globeMaterial.shininess = config.shininess;
      globeMaterial.opacity = 0.9;

      globeRef.current!
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(config.showAtmosphere)
        .atmosphereColor(config.atmosphereColor)
        .atmosphereAltitude(config.atmosphereAltitude)
        .hexPolygonColor((feature: any) => {
          if (feature.properties.name === "Ethiopia") {
            return "#0066FF";
          }
          const continent = getContinent(feature.properties.name);
          return config.polygonColor; // Use dynamic theme color, not continent-based
        })
        .hexPolygonColor((feature: any) =>
          feature.properties.name === "Ethiopia" ? "#0066FF" : config.polygonColor
        )


      globeRef.current!
        .arcsData(generateArcs())
        .arcColor("color")
        .arcAltitude(0.3)
        .arcStroke(0.5)
        .arcDashLength(config.arcLength)
        .arcDashGap(1)
        .arcDashAnimateTime(config.arcTime);
    };

    cleanupGlobe();
    const timer = setTimeout(configureGlobe, 50);

    return () => {
      clearTimeout(timer);
      cleanupGlobe();
    };
  }, [language, config]);

  return <group ref={groupRef} />;
};


const getContinent = (countryName: string): keyof typeof CONTINENT_COLORS => {
  const countryToContinentMap: Record<string, keyof typeof CONTINENT_COLORS> = {
    "United States": "North America",
    Canada: "North America",
    Brazil: "South America",
    Argentina: "South America",
    "United Kingdom": "Europe",
    France: "Europe",
    Germany: "Europe",
    Ethiopia: "Africa",
    Kenya: "Africa",
    Nigeria: "Africa",
    China: "Asia",
    Japan: "Asia",
    India: "Asia",
    Australia: "Oceania",
    "New Zealand": "Oceania",
  };

  return countryToContinentMap[countryName] || "Africa";
};

const GlobeVisualization = () => {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();

  const config = getDefaultConfig(resolvedTheme);
  const scene = new Scene();
  scene.fog = new Fog(new Color(config.globeColor), 400, 2000);

  return (
    <div className="relative w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <Canvas
          key={`globe-canvas-${language}-${resolvedTheme}`}
          scene={scene}
          camera={{ fov: 50, near: 180, far: 1800, position: [0, 0, 300] }}
          className="w-full h-full"
        >
          <ambientLight color={config.ambientLight} intensity={0.6} />
          <directionalLight color={config.directionalLight} position={new Vector3(-400, 100, 400)} />
          <pointLight color={config.pointLight} position={new Vector3(-200, 500, 200)} intensity={0.8} />

          <Globe config={config} />
          <CustomControls config={config} />
        </Canvas>
      </motion.div>
    </div>
  );
};

export default GlobeVisualization;