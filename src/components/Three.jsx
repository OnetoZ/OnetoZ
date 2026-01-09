import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Environment } from '@react-three/drei';
import * as THREE from 'three';

import FoxDialogue from './FoxDialogue';

// Main Model Component
function Model({ url, setBlur }) {
    const group = useRef();
    const { scene, animations } = useGLTF(url);
    const { actions, names } = useAnimations(animations, group);

    // Mobile Responsive Check
    const isMobile = window.innerWidth < 768;

    // Sequence States
    const [state, setState] = useState('START_DELAY'); // New initial state
    const [positionX, setPositionX] = useState(isMobile ? 6 : 12); // Start Right (Match reset)
    const [positionY, setPositionY] = useState(isMobile ? 3.5 : 4.5); // Default Height (Match reset)
    const [rotationY, setRotationY] = useState(-Math.PI / 2); // Facing Left
    const [scale, setScale] = useState(isMobile ? 0.08 : 0.12); // Default Scale (Match reset)
    const [isVisible, setIsVisible] = useState(false); // Hidden during delay

    const [isDialogueComplete, setIsDialogueComplete] = useState(false);

    // Valid states for dialogue: SITTING or IDLE at the end
    const showDialogue = state === 'IDLE';

    useEffect(() => {
        // Trigger blur when dialogue starts, REMOVE when complete
        if (setBlur) {
            setBlur(showDialogue && !isDialogueComplete);
        }
    }, [showDialogue, isDialogueComplete, setBlur]);

    const handleDialogueComplete = () => {
        setIsDialogueComplete(true);
    };

    useEffect(() => {
        // Broadcast state change for blur effect (Naive approach: direct DOM or Context is better, 
        // but for now we lift state up or handle locally if we can. 
        // Actually, we can pass a callback up to ThreeScene).
    }, [state]);

    // ... (Existing useEffects and useFrame logic remains unchanged) ...

    // 1. INITIALIZATION & RESET EFFECT (Runs on Mount + Screen Resize)
    useEffect(() => {
        // Reset everything to STARTING conditions
        setState('START_DELAY');
        setIsVisible(false); // Stay hidden during reset transition
        setPositionX(isMobile ? 6 : 12);
        setPositionY(isMobile ? 3.5 : 4.5);
        setRotationY(-Math.PI / 2);
        setScale(isMobile ? 0.08 : 0.12);
        setIsDialogueComplete(false);

        // Hard stop any lingering animations from previous renders
        Object.values(actions).forEach(action => action?.stop());
    }, [isMobile, actions]); // Only run if mobile-state changes or actions load

    // 2. ANIMATION DRIVER EFFECT (Runs when 'state' changes)
    useEffect(() => {
        let timeout;

        // Cleanup previous state's animation (smooth fade out usually)
        if (state === 'WALK_BACK_IN' || state === 'RUN_AWAY_LEFT') {
            // Hard stops for immediate transitions
            Object.values(actions).forEach(action => action?.stop());
        } else {
            // Smooth fade for others
            Object.values(actions).forEach(action => action?.fadeOut(0.3));
        }

        // --- STATE MACHINE ---

        // Stage 0: Delay on load
        if (state === 'START_DELAY') {
            timeout = setTimeout(() => {
                setIsVisible(true);
                setState('RUN_IN');
            }, 2000); // 2 Second Delay
        }
        // Stage 1: Run In (Right -> Center)
        else if (state === 'RUN_IN') {
            const action = actions['Fox_Run_InPlace'] || actions['Fox_Run'];
            if (action) action.reset().fadeIn(0.2).play();
            // (Positions are already set by the Reset Effect above)
        }
        // Stage 2: Somersault (Flip in Center)
        else if (state === 'SOMERSAULT') {
            const action = actions['Fox_Somersault'];
            if (action) {
                action.reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.1).play();
                action.clampWhenFinished = true;
                timeout = setTimeout(() => {
                    setPositionX(prev => prev - (isMobile ? 3.5 : 5.5));
                    setState('RUN_AWAY_LEFT');
                }, 1100);
            }
            // NO ELSE: Wait for action to be ready
        }
        // Stage 3: Run Away Left (Center -> Off-screen Left)
        else if (state === 'RUN_AWAY_LEFT') {
            const action = actions['Fox_Run_InPlace'] || actions['Fox_Run'];
            if (action) action.reset().play();
            setRotationY(-Math.PI / 2);
        }
        // Stage 4: Re-Entry Walk to BUTTON Position
        else if (state === 'WALK_BACK_IN') {
            const action = actions['Fox_Walk_Right_InPlace'] || actions['Fox_Walk_Right'];
            if (action) action.reset().fadeIn(0.1).play();

            setRotationY(Math.PI / 2); // Face Right
            setIsVisible(true);
            setPositionX(isMobile ? -8 : -20);
            setPositionY(isMobile ? -4.5 : -6.5);
            setScale(isMobile ? 0.16 : 0.24);
        }
        // Stage 5: Jump
        else if (state === 'JUMP') {
            const action = actions['Fox_Jump'];
            if (action) {
                action.reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.2).play();
                setRotationY(0);
                timeout = setTimeout(() => setState('SIT'), 1000);
            } else {
                setState('SIT');
            }
        }
        // Stage 6: Sit
        else if (state === 'SIT') {
            const action = actions['Fox_Sit1'];
            if (action) {
                action.reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.4).play();
                action.clampWhenFinished = true;
                setRotationY(0);
                timeout = setTimeout(() => setState('IDLE'), 1500);
            } else {
                setState('IDLE');
            }
        }
        // Stage 7: Idle
        else if (state === 'IDLE') {
            const action = actions['Fox_Sit_Idle_Break'];
            if (action) {
                action.reset().fadeIn(0.5).play();
                setRotationY(0);
            }
        }

        return () => clearTimeout(timeout);
    }, [state, actions, isMobile]);

    useFrame((_, delta) => {
        // Wait for actions to be available before running sequence
        if (Object.keys(actions).length === 0) return;

        // Stage 1: Run Right to Target Spot for Flip
        if (state === 'RUN_IN') {
            const targetX = isMobile ? 0 : -2.8;
            if (positionX > targetX) {
                setPositionX(prev => prev - delta * 6);
            } else {
                // Only advance if next action is also ready
                if (actions['Fox_Somersault']) {
                    setState('SOMERSAULT');
                }
            }
        }
        // Stage 3: Run from x:-8 to Off-Screen Left
        else if (state === 'RUN_AWAY_LEFT') {
            if (positionX > -30) { // Run until off-screen left
                setPositionX(prev => prev - delta * 8);
            } else {
                setIsVisible(false); // Vanish
                setState('WALK_BACK_IN');
            }
        }
        // Stage 4: Walk IN to BUTTON SPOT (x: -7.5 on Desktop, 0 on Mobile)
        else if (state === 'WALK_BACK_IN') {
            const targetX = isMobile ? 0 : -7.5;
            if (positionX < targetX) {
                setPositionX(prev => prev + delta * 3.5);
            } else {
                setState('JUMP');
            }
        }
    });

    // Pass showDialogue up to parent? Or simply render Html here.
    // For blur, we can use a callback prop to the parent ThreeScene

    // Debugging: Check available animation names
    useEffect(() => {
        console.log("Available Animations:", names);
    }, [names]);

    const handleReactionStart = (type) => {
        console.log("Hover Start requesting:", type);

        // Robust search: Try exact match, then case-insensitive match
        let action = actions[type];

        if (!action) {
            const availableNames = Object.keys(actions);
            const match = availableNames.find(name => name.toLowerCase() === type.toLowerCase());
            if (match) {
                console.log(`Found case-insensitive match: '${match}' for '${type}'`);
                action = actions[match];
            }
        }

        if (action) {
            console.log("Playing action:", action.getClip().name);
            // Stop others smoothly
            Object.values(actions).forEach(a => a !== action && a?.fadeOut(0.2));

            // Play reaction LOOPING while hovering
            action.reset().fadeIn(0.2).setLoop(THREE.LoopRepeat, Infinity).play();
        } else {
            console.warn(`Animation '${type}' not found! Available:`, Object.keys(actions));
        }
    };

    const handleReactionEnd = () => {
        // Return to IDLE
        const idle = actions['Fox_Sit_Idle_Break'];
        const yes = actions['Fox_Sit_Yes'];
        const no = actions['Fox_Sit_NO'];

        yes?.fadeOut(0.3);
        no?.fadeOut(0.3);

        if (idle) {
            idle.reset().fadeIn(0.3).play();
        }
    };

    // State for toggling face click animations
    const [faceClickCount, setFaceClickCount] = useState(0);

    const handleBodyPartClick = (e) => {
        e.stopPropagation(); // Prevent partial clicks

        const partName = e.object.name.toLowerCase();

        const worldY = e.point.y;
        const rootY = positionY;
        const relativeY = worldY - rootY;
        const relativeX = e.point.x - positionX; // Check X-offset from center

        // Check X offset to detect tail sticking out?
        // Fox is at X=positionX, rotated -90 deg Y. 
        // Local Z is World X. Local X is World -Z.
        // Tail is typically at the "back".

        // Let's use simpler explicit fallback bands first.

        console.log(`Clicked Part: ${partName} | RelY: ${relativeY.toFixed(2)} | RelX: ${relativeX.toFixed(2)}`);

        let actionName = null;

        // --- SIMPLIFIED BINARY LOGIC ---
        // 1. HEAD (High Y) -> Falling
        if (partName.includes('head') || partName.includes('ear') || partName.includes('snout') ||
            partName.includes('jaw') || partName.includes('eye') || relativeY > 2.8) {
            console.log("Action: HEAD (Falling)");
            actionName = (faceClickCount % 2 === 0) ? 'Fox_Falling_Left' : 'Fox_Falling';
            setFaceClickCount(prev => prev + 1);
        }
        // 2. EVERYTHING ELSE (Body, Legs, Tail) -> Paws
        else {
            console.log("Action: BODY/TAIL/LEGS (Paws)");
            actionName = 'Fox_Attack_Paws';
        }

        if (actionName) {
            const action = actions[actionName];
            if (action) {
                Object.values(actions).forEach(a => a !== action && a?.fadeOut(0.2));
                action.reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.1).play();
                action.clampWhenFinished = true;

                const duration = action.getClip().duration * 1000;
                setTimeout(() => {
                    action.fadeOut(0.5);
                    actions['Fox_Sit_Idle_Break']?.reset().fadeIn(0.5).play();
                }, duration);
            }
        }
    };

    return (
        <group ref={group} dispose={null} visible={isVisible} position={[positionX, positionY, 0]} rotation={[0, rotationY, 0]}>
            <primitive
                object={scene}
                scale={scale}
                onClick={handleBodyPartClick} // Attach Click Listener
            />
            {showDialogue && !isDialogueComplete && (
                <FoxDialogue
                    position={isMobile ? [0, 6, 0] : [3, 4, 0]}
                    onHoverStart={handleReactionStart}
                    onHoverEnd={handleReactionEnd}
                    onComplete={handleDialogueComplete}
                />
            )}
        </group>
    );
}

useGLTF.preload('/models/fox/scene.gltf');

const ThreeScene = ({ modelPath = '/models/fox/scene.gltf' }) => {
    // We need to know when dialogue is showing to blur the background
    // Since state is inside Model, let's move the blurring logic to CSS/Global or just Hack it?
    // A clean way is to accept a callback from Model.
    const [isBlurry, setIsBlurry] = useState(false);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            // BLUR EFFECT:
            background: isBlurry ? 'rgba(0,0,0,0.6)' : 'transparent',
            backdropFilter: isBlurry ? 'blur(8px)' : 'none',
            transition: 'all 1s ease'
        }}>
            <Canvas
                shadows
                camera={{ position: [0, 1, 28], fov: 35 }}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <ambientLight intensity={3} />
                    <directionalLight position={[10, 10, 10]} intensity={3} castShadow />
                    <directionalLight position={[-10, 5, -10]} intensity={2} />

                    {/* Pass setBlur to Model */}
                    <Model url={modelPath} setBlur={setIsBlurry} />

                    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default ThreeScene; 