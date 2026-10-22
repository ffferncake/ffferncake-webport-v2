"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const makeMaterial = (color, options = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.76, ...options });

export default function GeoWorld({ onZoneEnter }) {
  const mountRef = useRef(null);
  const keysRef = useRef({});
  const zoomRef = useRef(1.12);
  const onZoneEnterRef = useRef(onZoneEnter);
  const [started, setStarted] = useState(false);

  useEffect(() => { onZoneEnterRef.current = onZoneEnter; }, [onZoneEnter]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x121212, 18, 42);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(9, 10, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x121212, 0);
    mount.appendChild(renderer.domElement);

    const world = new THREE.Group();
    scene.add(world);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(38, 38), makeMaterial(0x17171b));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    world.add(ground);
    const grid = new THREE.GridHelper(38, 38, 0x2cc7c1, 0x2d2631);
    grid.material.transparent = true;
    grid.material.opacity = 0.2;
    world.add(grid);

    const roadMaterial = makeMaterial(0x29252d);
    const roadA = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.05, 34), roadMaterial);
    roadA.position.y = 0.03;
    const roadB = new THREE.Mesh(new THREE.BoxGeometry(34, 0.05, 4.3), roadMaterial);
    roadB.position.y = 0.035;
    world.add(roadA, roadB);

    const concreteMaterial = makeMaterial(0x4a484e, { roughness: .94 });
    const curbMaterial = makeMaterial(0x77737b, { roughness: .88 });
    const addSidewalk = (width, depth, x, z) => {
      const walk = new THREE.Mesh(new THREE.BoxGeometry(width,.11,depth),concreteMaterial);
      walk.position.set(x,.055,z); walk.receiveShadow=true; world.add(walk);
    };
    addSidewalk(.62,34,-3.05,0); addSidewalk(.62,34,3.05,0);
    addSidewalk(34,.62,0,-2.62); addSidewalk(34,.62,0,2.62);
    [[-3.38,0,.08,34],[3.38,0,.08,34],[0,-2.95,34,.08],[0,2.95,34,.08]].forEach(([x,z,w,d])=>{
      const curb=new THREE.Mesh(new THREE.BoxGeometry(w,.16,d),curbMaterial);
      curb.position.set(x,.08,z); curb.receiveShadow=true; world.add(curb);
    });

    const addParcel = (x,z,width,depth,color,opacity=.72) => {
      const parcel = new THREE.Mesh(new THREE.BoxGeometry(width,.035,depth),makeMaterial(color,{transparent:true,opacity}));
      parcel.position.set(x,.02,z); parcel.receiveShadow=true; world.add(parcel);
    };
    addParcel(-10,-10,10.8,9.8,0x182421);
    addParcel(10,-10,10.8,9.8,0x17232a);
    addParcel(-10,10,10.8,9.8,0x231c29);
    addParcel(10,10,10.8,9.8,0x201d29);

    const water = new THREE.Mesh(new THREE.PlaneGeometry(8,5),new THREE.MeshStandardMaterial({color:0x173342,roughness:.35,metalness:.15,transparent:true,opacity:.78}));
    water.rotation.x=-Math.PI/2; water.position.set(10,.075,-10); world.add(water);
    for(let i=-3;i<=3;i++){
      const ripple=new THREE.Mesh(new THREE.BoxGeometry(1.3,.018,.035),new THREE.MeshBasicMaterial({color:0x69b5c6,transparent:true,opacity:.35}));
      ripple.position.set(10+(i%2)*.45,.095,-10+i*.55); ripple.rotation.y=.18; world.add(ripple);
    }
    const park = new THREE.Mesh(new THREE.CircleGeometry(4.3,32),makeMaterial(0x193027));
    park.rotation.x=-Math.PI/2; park.position.set(-10,.078,10); world.add(park);
    for(let i=0;i<9;i++){
      const tree=new THREE.Group();
      const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.07,.09,.45,8),makeMaterial(0x705344));trunk.position.y=.24;
      const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(.32,0),makeMaterial(i%2?0x2a6455:0x347565));crown.position.y=.68;
      tree.add(trunk,crown); const angle=i*.72; tree.position.set(-10+Math.cos(angle)*(1.4+(i%3)*.65),0,10+Math.sin(angle)*(1.4+(i%3)*.65));world.add(tree);
    }
    const pathMaterial=makeMaterial(0xa39484,{roughness:1});
    const parkPath=new THREE.Mesh(new THREE.RingGeometry(2.15,2.42,36),pathMaterial);
    parkPath.rotation.x=-Math.PI/2;parkPath.position.set(-10,.092,10);world.add(parkPath);
    [-1,1].forEach(side=>{
      const bench=new THREE.Group();
      const seat=new THREE.Mesh(new THREE.BoxGeometry(1.15,.12,.38),makeMaterial(0x8b654d));seat.position.y=.42;
      const back=new THREE.Mesh(new THREE.BoxGeometry(1.15,.5,.1),makeMaterial(0x8b654d));back.position.set(0,.67,-.18);
      [-.4,.4].forEach(x=>{const leg=new THREE.Mesh(new THREE.BoxGeometry(.08,.38,.08),makeMaterial(0x4b4a50,{metalness:.35}));leg.position.set(x,.2,0);bench.add(leg);});
      bench.add(seat,back);bench.position.set(-10+side*2.8,0,10);bench.rotation.y=side*Math.PI/2;world.add(bench);
    });

    const railMaterial=makeMaterial(0x78858e,{metalness:.48,roughness:.4});
    [-4.1,4.1].forEach(offset=>{
      const rail=new THREE.Mesh(new THREE.BoxGeometry(.06,.42,5.1),railMaterial);
      rail.position.set(10+offset,.34,-10);world.add(rail);
    });

    const edgeMaterial = new THREE.MeshBasicMaterial({color:0x2cc7c1,transparent:true,opacity:.28});
    [-2.72,2.72].forEach(x=>{const edge=new THREE.Mesh(new THREE.BoxGeometry(.045,.018,34),edgeMaterial);edge.position.set(x,.082,0);world.add(edge);});
    [-2.27,2.27].forEach(z=>{const edge=new THREE.Mesh(new THREE.BoxGeometry(34,.018,.045),edgeMaterial);edge.position.set(0,.085,z);world.add(edge);});

    const crossingMaterial = new THREE.MeshBasicMaterial({color:0xe7e5eb,transparent:true,opacity:.34});
    for(let i=-3;i<=3;i++){
      const stripeA=new THREE.Mesh(new THREE.BoxGeometry(.34,.02,1.15),crossingMaterial);stripeA.position.set(i*.62,.096,-2.95);
      const stripeB=new THREE.Mesh(new THREE.BoxGeometry(1.15,.02,.34),crossingMaterial);stripeB.position.set(3.05,.096,i*.62);
      world.add(stripeA,stripeB);
    }

    const stopLineMaterial = new THREE.MeshBasicMaterial({color:0xf4f0ea,transparent:true,opacity:.66});
    [[0,-3.55,3.8,.12],[0,3.55,3.8,.12],[-3.7,0,.12,3.4],[3.7,0,.12,3.4]].forEach(([x,z,w,d])=>{
      const line=new THREE.Mesh(new THREE.BoxGeometry(w,.025,d),stopLineMaterial);
      line.position.set(x,.105,z); world.add(line);
    });

    const dashMaterial = new THREE.MeshBasicMaterial({ color: 0x9c8bc2 });
    for (let i = -15; i <= 15; i += 2) {
      const dashA = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.9), dashMaterial);
      dashA.position.set(0, 0.075, i);
      const dashB = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.02, 0.08), dashMaterial);
      dashB.position.set(i, 0.08, 0);
      world.add(dashA, dashB);
    }

    const rover = new THREE.Group();
    const roverBody = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.45, 2), makeMaterial(0x2cc7c1));
    roverBody.position.y = 0.55;
    roverBody.castShadow = true;
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.52, 0.85), makeMaterial(0xf1f1f2));
    cabin.position.set(0, 1.02, -0.18);
    cabin.castShadow = true;
    rover.add(roverBody, cabin);
    const windshield = new THREE.Mesh(new THREE.PlaneGeometry(.72,.34),makeMaterial(0x203c49,{roughness:.18,metalness:.2,transparent:true,opacity:.82}));
    windshield.position.set(0,1.05,.435); windshield.rotation.x=-.08;
    const bumper = new THREE.Mesh(new THREE.BoxGeometry(1.18,.13,.12),makeMaterial(0xb7b5bb,{metalness:.55,roughness:.32}));
    bumper.position.set(0,.45,1.04);
    const headlightMaterial = new THREE.MeshBasicMaterial({color:0xffe8ad});
    [-.42,.42].forEach(x=>{const lamp=new THREE.Mesh(new THREE.CircleGeometry(.095,16),headlightMaterial);lamp.position.set(x,.63,1.011);rover.add(lamp);});
    rover.add(windshield,bumper);
    const wheels = [];
    [[-.78,.8],[.78,.8],[-.78,-.72],[.78,-.72]].forEach(([x,z]) => {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.28,.28,.25,16), makeMaterial(0x18181d));
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x,.38,z);
      rover.add(wheel);
      wheels.push(wheel);
    });
    const dishStem = new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,.48,10), makeMaterial(0xe95aa8));
    dishStem.position.set(0,1.46,.1);
    const dish = new THREE.Mesh(new THREE.SphereGeometry(.35,20,12,0,Math.PI * 2,0,Math.PI / 2), makeMaterial(0xe95aa8,{side:THREE.DoubleSide}));
    dish.scale.z = .22;
    dish.rotation.x = -.4;
    dish.position.set(0,1.72,.05);
    rover.add(dishStem,dish);
    rover.position.set(0,0,-7);
    world.add(rover);

    const addStreetLight=(x,z,rotation=0)=>{
      const lamp=new THREE.Group();
      const pole=new THREE.Mesh(new THREE.CylinderGeometry(.045,.065,2.15,10),makeMaterial(0x777680,{metalness:.5,roughness:.4}));
      pole.position.y=1.08;
      const arm=new THREE.Mesh(new THREE.BoxGeometry(.55,.055,.055),makeMaterial(0x777680,{metalness:.5,roughness:.4}));
      arm.position.set(.23,2.1,0);
      const glow=new THREE.Mesh(new THREE.BoxGeometry(.22,.045,.14),new THREE.MeshBasicMaterial({color:0xffdca3}));
      glow.position.set(.5,2.05,0);
      lamp.add(pole,arm,glow); lamp.position.set(x,0,z); lamp.rotation.y=rotation; world.add(lamp);
    };
    [-11,-5,5,11].forEach(z=>{addStreetLight(-3.55,z,0);addStreetLight(3.55,z,Math.PI);});
    [-11,-5,5,11].forEach(x=>{addStreetLight(x,-3.15,Math.PI/2);addStreetLight(x,3.15,-Math.PI/2);});

    const addCityBuilding=(x,z,width,depth,height,color,accent)=>{
      const building=new THREE.Group();
      const body=new THREE.Mesh(new THREE.BoxGeometry(width,height,depth),makeMaterial(color,{roughness:.82}));
      body.position.y=height/2; body.castShadow=true; body.receiveShadow=true; building.add(body);
      const roof=new THREE.Mesh(new THREE.BoxGeometry(width*.72,.16,depth*.72),makeMaterial(0x29282e,{metalness:.3,roughness:.55}));
      roof.position.y=height+.08; building.add(roof);
      const windowMaterial=new THREE.MeshBasicMaterial({color:accent,transparent:true,opacity:.72});
      const rows=Math.max(1,Math.floor(height/.72));
      for(let row=0;row<rows;row++) for(let col=-1;col<=1;col+=2){
        const pane=new THREE.Mesh(new THREE.PlaneGeometry(.28,.26),windowMaterial);
        pane.position.set(col*width*.23,.48+row*.62,depth/2+.006); building.add(pane);
      }
      building.position.set(x,.08,z); world.add(building);
    };
    addCityBuilding(7.2,-13,3.6,3.1,3.8,0x2d333b,0x76c7d7);
    addCityBuilding(12.2,-12.5,2.8,3.8,5.1,0x30303a,0xf0b2d3);
    addCityBuilding(12.5,-6.5,3.4,2.7,2.8,0x34323b,0xa99ada);
    addCityBuilding(-12.2,12.5,3.4,3.2,3.4,0x293632,0x75d7bd);

    const parkingMaterial=new THREE.MeshBasicMaterial({color:0xd7d4d7,transparent:true,opacity:.42});
    for(let i=0;i<5;i++){
      const space=new THREE.Mesh(new THREE.BoxGeometry(.045,.012,1.45),parkingMaterial);
      space.position.set(6.2+i*1.15,.105,12.7); world.add(space);
    }

    const colors = [0x2cc7c1, 0x9c8bc2, 0xe95aa8];
    const createZone = (x, z, color, height, kind) => {
      const group = new THREE.Group();
      const base = new THREE.Mesh(new THREE.CylinderGeometry(2.25,2.5,.4,6), makeMaterial(0x202027));
      base.position.y=.2;
      base.receiveShadow=true;
      group.add(base);
      if (kind === "satellite") {
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(.1,.16,1.3,12),makeMaterial(color));
        stem.position.y=1;
        const bowl = new THREE.Mesh(new THREE.SphereGeometry(.8,24,16,0,Math.PI*2,0,Math.PI/2),makeMaterial(0xf2f2f3,{side:THREE.DoubleSide}));
        bowl.scale.z=.25; bowl.rotation.x=-.75; bowl.position.y=1.9;
        group.add(stem,bowl);
      } else if (kind === "map") {
        for(let i=0;i<5;i++){const tile=new THREE.Mesh(new THREE.BoxGeometry(.9,.15,.9),makeMaterial(colors[i%3]));tile.position.set((i%2-.5)*1.1,.5+i*.24,(Math.floor(i/2)-1)*.65);tile.rotation.y=i*.3;group.add(tile);}
      } else {
        const pinHead = new THREE.Mesh(new THREE.TorusGeometry(.55,.18,12,28),makeMaterial(color));
        pinHead.position.y=1.55;
        const pinTail = new THREE.Mesh(new THREE.ConeGeometry(.22,.85,18),makeMaterial(color));
        pinTail.position.y=.75;
        group.add(pinHead,pinTail);
      }
      group.position.set(x,0,z);
      group.scale.setScalar(height);
      world.add(group);
    };
    createZone(-7,-3,colors[0],1,"satellite");
    createZone(7,3,colors[1],1,"map");
    createZone(-6,8,colors[2],1,"pin");

    const makeLabel = (text, color) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512; canvas.height = 128;
      const context = canvas.getContext("2d");
      context.fillStyle = "rgba(18,18,18,.88)";
      context.roundRect(8, 8, 496, 112, 28); context.fill();
      context.strokeStyle = `#${color.toString(16).padStart(6,"0")}`;
      context.lineWidth = 5; context.stroke();
      context.fillStyle = "#f7f7f8";
      context.font = "700 48px sans-serif"; context.textAlign = "center"; context.textBaseline = "middle";
      context.fillText(text, 256, 66);
      const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
      const label = new THREE.Sprite(new THREE.SpriteMaterial({ map:texture, transparent:true }));
      label.scale.set(3.8,.95,1);
      return label;
    };
    const createDestination = (x,z,type,color) => {
      const group = new THREE.Group();
      const platform = new THREE.Mesh(new THREE.CylinderGeometry(2.5,2.7,.25,24),makeMaterial(0x202027));
      platform.position.y=.13; group.add(platform);
      if(type === "education") {
        const building = new THREE.Mesh(new THREE.BoxGeometry(3.2,1.8,2.2),makeMaterial(0xe8e8eb));
        building.position.y=1.15;
        const roof = new THREE.Mesh(new THREE.ConeGeometry(2.45,1.15,4),makeMaterial(color));
        roof.rotation.y=Math.PI/4; roof.position.y=2.62;
        const door = new THREE.Mesh(new THREE.BoxGeometry(.55,.9,.08),makeMaterial(0x2cc7c1));
        door.position.set(0,.72,1.13);
        group.add(building,roof,door);
      } else {
        const tower = new THREE.Mesh(new THREE.BoxGeometry(2.8,3.5,2.4),makeMaterial(0x302d38));
        tower.position.y=1.88; group.add(tower);
        for(let row=0;row<3;row++) for(let col=-1;col<=1;col+=2) {
          const windowPane = new THREE.Mesh(new THREE.PlaneGeometry(.55,.48),new THREE.MeshBasicMaterial({color}));
          windowPane.position.set(col*.65,.9+row*.9,1.211); group.add(windowPane);
        }
      }
      const beacon = new THREE.Mesh(new THREE.TorusGeometry(2.75,.055,10,60),new THREE.MeshBasicMaterial({color}));
      beacon.rotation.x=Math.PI/2; beacon.position.y=.18; group.add(beacon);
      for(let ringIndex=0;ringIndex<2;ringIndex++){
        const guideRing=new THREE.Mesh(new THREE.RingGeometry(3.05+ringIndex*.42,3.1+ringIndex*.42,48),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.13-ringIndex*.035,side:THREE.DoubleSide}));
        guideRing.rotation.x=-Math.PI/2; guideRing.position.y=.03; group.add(guideRing);
      }
      const label=makeLabel(type === "education" ? "SCHOOL · EDUCATION" : "OFFICE · EXPERIENCE",color);
      label.position.y=4.25; group.add(label);
      group.position.set(x,0,z); world.add(group);
    };
    const destinations = [
      { id:"education", position:new THREE.Vector3(-9,0,-6) },
      { id:"experience", position:new THREE.Vector3(9,0,6) },
    ];
    createDestination(-9,-6,"education",0x2cc7c1);
    createDestination(9,6,"experience",0xe95aa8);

    const routeMaterial = new THREE.MeshBasicMaterial({color:0x9c8bc2,transparent:true,opacity:.52});
    [[-3.3,-2.9,-6.6,-5.4],[3.3,2.9,6.6,5.4]].forEach(([startX,startZ,endX,endZ])=>{
      for(let i=0;i<5;i++){
        const t=(i+1)/6;
        const routeDot=new THREE.Mesh(new THREE.CircleGeometry(.11,14),routeMaterial);
        routeDot.rotation.x=-Math.PI/2; routeDot.position.set(THREE.MathUtils.lerp(startX,endX,t),.105,THREE.MathUtils.lerp(startZ,endZ,t)); world.add(routeDot);
      }
    });

    for(let i=0;i<24;i++){
      const marker=new THREE.Mesh(new THREE.CylinderGeometry(.08,.13,.7,10),makeMaterial(colors[i%3]));
      const side=i%2===0?-1:1;
      marker.position.set(side*(4+Math.random()*10),.35,-14+Math.random()*28);
      world.add(marker);
    }

    scene.add(new THREE.HemisphereLight(0xf5f3ff,0x281526,2.7));
    const light=new THREE.DirectionalLight(0xffffff,3.5);light.position.set(8,14,8);light.castShadow=true;scene.add(light);
    const pinkLight=new THREE.PointLight(0xe95aa8,8,18);pinkLight.position.set(-7,5,-2);scene.add(pinkLight);

    const keyDown=(event)=>{keysRef.current[event.key.toLowerCase()]=true;if(["arrowup","arrowdown","arrowleft","arrowright"].includes(event.key.toLowerCase())&&window.scrollY<mount.offsetHeight)event.preventDefault();};
    const keyUp=(event)=>{keysRef.current[event.key.toLowerCase()]=false;};
    window.addEventListener("keydown",keyDown,{passive:false});
    window.addEventListener("keyup",keyUp);
    const wheelZoom=(event)=>{event.preventDefault();zoomRef.current=THREE.MathUtils.clamp(zoomRef.current+event.deltaY*.0007,.62,1.55);};
    mount.addEventListener("wheel",wheelZoom,{passive:false});
    const resize=()=>{const rect=mount.getBoundingClientRect();renderer.setSize(rect.width,rect.height,false);camera.aspect=rect.width/rect.height;camera.updateProjectionMatrix();};
    resize();window.addEventListener("resize",resize);

    let frame;
    let activeDestination = null;
    const clock=new THREE.Clock();
    const cameraTarget=new THREE.Vector3();
    const animate=()=>{
      const dt=Math.min(clock.getDelta(),.04);
      const keys=keysRef.current;
      const forward=(keys.w||keys.arrowup?1:0)-(keys.s||keys.arrowdown?1:0);
      const turn=(keys.a||keys.arrowleft?1:0)-(keys.d||keys.arrowright?1:0);
      rover.rotation.y+=turn*dt*2.25;
      rover.position.x+=Math.sin(rover.rotation.y)*forward*dt*5;
      rover.position.z+=Math.cos(rover.rotation.y)*forward*dt*5;
      rover.position.x=THREE.MathUtils.clamp(rover.position.x,-15,15);
      rover.position.z=THREE.MathUtils.clamp(rover.position.z,-15,15);
      wheels.forEach(w=>w.rotation.x+=forward*dt*7);
      dish.rotation.y+=dt*.6;
      const entered = destinations.find(destination=>rover.position.distanceTo(destination.position)<3.35)?.id || null;
      if(entered && entered!==activeDestination) onZoneEnterRef.current?.(entered);
      activeDestination=entered;
      const zoom=zoomRef.current;
      cameraTarget.set(rover.position.x+7*zoom,9*zoom,rover.position.z+10*zoom);
      camera.position.lerp(cameraTarget,.035);
      camera.lookAt(rover.position.x,0,rover.position.z);
      renderer.render(scene,camera);
      frame=requestAnimationFrame(animate);
    };
    animate();

    return()=>{cancelAnimationFrame(frame);window.removeEventListener("keydown",keyDown);window.removeEventListener("keyup",keyUp);window.removeEventListener("resize",resize);mount.removeEventListener("wheel",wheelZoom);scene.traverse(o=>{o.geometry?.dispose?.();if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material?.dispose?.();});renderer.dispose();mount.removeChild(renderer.domElement);};
  },[]);

  const setKey=(key,value)=>{keysRef.current[key]=value;setStarted(true);};
  const zoom=(amount)=>{zoomRef.current=THREE.MathUtils.clamp(zoomRef.current+amount,.62,1.55);setStarted(true);};
  return <div className="geo-world-wrap">
    <div ref={mountRef} className="geo-world" aria-label="Interactive 3D geospatial world controlled with WASD or arrow keys" />
    <div className={`world-controls ${started ? "is-active" : ""}`}>
      <p><b>EXPLORE</b><span>WASD / ARROWS</span></p>
      <div className="control-pad">
        <button aria-label="Move forward" onPointerDown={()=>setKey("w",true)} onPointerUp={()=>setKey("w",false)} onPointerLeave={()=>setKey("w",false)}>↑</button>
        <button aria-label="Turn left" onPointerDown={()=>setKey("a",true)} onPointerUp={()=>setKey("a",false)} onPointerLeave={()=>setKey("a",false)}>←</button>
        <button aria-label="Move backward" onPointerDown={()=>setKey("s",true)} onPointerUp={()=>setKey("s",false)} onPointerLeave={()=>setKey("s",false)}>↓</button>
        <button aria-label="Turn right" onPointerDown={()=>setKey("d",true)} onPointerUp={()=>setKey("d",false)} onPointerLeave={()=>setKey("d",false)}>→</button>
      </div>
      <div className="zoom-controls" aria-label="Map zoom controls">
        <button aria-label="Zoom in" onClick={()=>zoom(-.18)}>+</button>
        <button aria-label="Zoom out" onClick={()=>zoom(.18)}>−</button>
      </div>
    </div>
  </div>;
}
