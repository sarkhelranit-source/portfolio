import * as THREE from 'three';
import { useRef, useState, useEffect, memo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  MeshTransmissionMaterial
} from '@react-three/drei';
import { easing } from 'maath';

export default function FluidGlass({ mode = 'lens', children, lensProps = {}, barProps = {}, cubeProps = {} }) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  
  // Use the props based on mode, falling back to top level props if provided (as in user snippet)
  const modeProps = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

  return (
    <Canvas 
      camera={{ position: [0, 0, 20], fov: 15 }} 
      gl={{ alpha: true, antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Wrapper modeProps={modeProps}>
        {children}
      </Wrapper>
    </Canvas>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  mode,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}) {
  const ref = useRef();
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    geoWidthRef.current = mode === 'bar' ? 5 : mode === 'cube' ? 1.5 : 2;
  }, [mode]);

  // Global mouse tracker to prevent DOM layers (like text) from blocking pointer events 
  // and causing the lens to stutter or lag.
  const globalMouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMouseMove = (e) => {
      globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame((state, delta) => {
    const { gl, viewport, camera } = state;
    gl.setClearAlpha(0); // Ensure canvas stays transparent to see DOM underneath
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const ptrX = globalMouse.current.x;
    const ptrY = globalMouse.current.y;

    const destX = followPointer ? (ptrX * v.width) / 2 : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (ptrY * v.height) / 2 : 0;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.05, delta);

    if (modeProps.scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(mode === 'bar' ? 0.8 : 1.5, desired));
    }

    // Performance optimization: Lower resolution and samples are handled in the material props.
    // We only update the buffer when necessary to save GPU cycles.
    if (children) {
      state.gl.setRenderTarget(buffer);
      state.gl.render(scene, state.camera);
      state.gl.setRenderTarget(null);
    }
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, transmission, roughness, ...extraMat } = modeProps;

  return (
    <>
      {children && createPortal(children, scene)}
      <mesh ref={ref} scale={scale ?? (mode === 'bar' ? 0.8 : 1.5)} rotation-x={mode === 'lens' ? Math.PI / 2 : 0} {...props}>
        {mode === 'lens' && <cylinderGeometry args={[2, 2, 0.5, 64]} />}
        {mode === 'cube' && <boxGeometry args={[2, 2, 2]} />}
        {mode === 'bar' && <boxGeometry args={[4, 0.8, 0.8]} />}
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          transmission={1}
          roughness={0}
          resolution={256} // Fixed resolution for better performance
          samples={4}      // Lower sample count for smoother movement
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }) {
  return <ModeWrapper mode="lens" followPointer modeProps={modeProps} {...p} />;
}

function Cube({ modeProps, ...p }) {
  return <ModeWrapper mode="cube" followPointer modeProps={modeProps} {...p} />;
}

function Bar({ modeProps = {}, ...p }) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25
  };

  return (
    <ModeWrapper
      mode="bar"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}

function NavItems({ items }) {
  const group = useRef();
  const { viewport, camera } = useThree();

  const DEVICE = {
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 }
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { spacing, fontSize } = DEVICE[device];

  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);

    group.current.children.forEach((child, i) => {
      child.position.x = (i - (items.length - 1) / 2) * spacing;
    });
  });

  const handleNavigate = link => {
    if (!link) return;
    link.startsWith('#') ? (window.location.hash = link) : (window.location.href = link);
  };

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          depthWrite={false}
          outlineWidth={0}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.5}
          depthTest={false}
          renderOrder={10}
          onClick={e => {
            e.stopPropagation();
            handleNavigate(link);
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}


