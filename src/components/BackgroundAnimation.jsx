'use client';

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const BackgroundAnimation = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // You can perform actions once the particles are loaded
  }, []);

  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: false,
        },
        resize: true,
      },
    },
    particles: {
      color: {
        value: "#5588A3", 
      },
      links: {
        color: "#145374", 
        distance: 150,
        enable: true,
        opacity: 0.4, // Increased link opacity
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
        random: true,
        speed: 0.3, // Increased speed slightly
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800, // Reduced area to make particles denser
        },
        value: 80, // Increased number of particles
      },
      opacity: {
        value: 0.5, // Increased particle opacity
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 2 },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default BackgroundAnimation;

