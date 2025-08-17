import Earth from "3d-earth";
import { useEffect } from "react";
export default function Map3D() {
  useEffect(() => {
    const cityList = {
      Beijing: { name: "Beijing", longitude: 116.3, latitude: 39.9 },
      Shanghai: { name: "Shanghai", longitude: 121.0, latitude: 31.0 },
      XiAn: { name: "XiAn", longitude: 108.0, latitude: 34.0 },
      Chengdu: { name: "Chengdu", longitude: 81.0, latitude: 31.0 },
      Urumqi: { name: "Urumqi", longitude: 87.0, latitude: 43.0 },
      Lhasa: { name: "Lhasa", longitude: 91.06, latitude: 29.36 },
      Guangzhou: { name: "Guangzhou", longitude: 113.0, latitude: 23.06 },
      Harbin: { name: "Harbin", longitude: 81.0, latitude: 45.5 },
      Shenyang: { name: "Shenyang", longitude: 123.43, latitude: 41.8 },
      Wuhan: { name: "Wuhan", longitude: 114.0, latitude: 30.0 },
      Haikou: { name: "Haikou", longitude: 110.0, latitude: 20.03 },
      NewYork: { name: "New York", longitude: -74.5, latitude: 40.5 },
      London: { name: "London", longitude: 0.1, latitude: 51.3 },
      Paris: { name: "Paris", longitude: 2.2, latitude: 48.5 },
      CapeTown: { name: "Cape Town", longitude: 18.25, latitude: -33.5 },
      Sydney: { name: "Sydney", longitude: 151.1, latitude: -33.51 },
      Tokyo: { name: "Tokyo", longitude: 139.69, latitude: 35.69 },
      RioDeJaneiro: {
        name: "Rio de Janeiro",
        longitude: -43.11,
        latitude: -22.54,
      },
    };

    const bizLines = [
      {
        from: "Beijing",
        to: [
          "Shanghai",
          "XiAn",
          "Chengdu",
          "Urumqi",
          "Lhasa",
          "Guangzhou",
          "Harbin",
          "Shenyang",
          "Wuhan",
          "Haikou",
          "NewYork",
          "London",
          "Paris",
          "CapeTown",
          "Sydney",
          "Tokyo",
          "RioDeJaneiro",
        ],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "Shanghai",
        to: [
          "Beijing",
          "Shanghai",
          "XiAn",
          "Chengdu",
          "Urumqi",
          "Lhasa",
          "Guangzhou",
          "Harbin",
          "Shenyang",
          "Wuhan",
          "Haikou",
          "NewYork",
          "London",
          "Paris",
          "CapeTown",
          "Sydney",
          "Tokyo",
          "RioDeJaneiro",
        ],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "XiAn",
        to: ["Beijing", "Shanghai", "Chengdu", "Guangzhou", "Urumqi", "Haikou"],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "Chengdu",
        to: [
          "Beijing",
          "Shanghai",
          "Guangzhou",
          "Wuhan",
          "Haikou",
          "NewYork",
          "Sydney",
        ],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "Urumqi",
        to: ["Beijing", "Shanghai", "XiAn"],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "Guangzhou",
        to: [
          "Beijing",
          "Shanghai",
          "Chengdu",
          "Lhasa",
          "Wuhan",
          "Haikou",
          "NewYork",
          "London",
          "Paris",
          "Sydney",
          "Tokyo",
          "RioDeJaneiro",
        ],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "Harbin",
        to: ["Beijing", "Shenyang"],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "Shenyang",
        to: ["Beijing", "Harbin"],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "Haikou",
        to: ["Beijing", "Shanghai", "Chengdu", "Guangzhou"],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "NewYork",
        to: ["Beijing", "Shanghai", "Chengdu", "Guangzhou"],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "London",
        to: ["Beijing", "Shanghai", "Guangzhou"],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "Paris",
        to: ["Beijing", "Shanghai", "Guangzhou"],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "CapeTown",
        to: ["Beijing", "Shanghai"],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "Sydney",
        to: ["Beijing", "Shanghai", "Chengdu", "Guangzhou"],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "Tokyo",
        to: ["Beijing", "Shanghai", "Guangzhou"],
        color: `rgba(227, 81, 14, 1)`,
      },
      {
        from: "RioDeJaneiro",
        to: ["Beijing", "Shanghai", "Guangzhou"],
        color: `rgba(227, 81, 14, 1)`,
      },
    ];

    const e = new Earth("container", cityList, bizLines, {
      autoRotate: true,
      zoomChina: false,
      starBackground: true,
      orbitControlConfig: {
        enableRotate: true,
        enableZoom: true,
      },
    });
    e.load();
    setTimeout(() => {
      console.log("e scene", e.scene);
      e.scene.traverse((obj) => {
        if (obj.isMesh && obj.geometry?.type === "SphereGeometry") {
          obj.material.map = null;
          obj.material.color.set("#f0b90b"); // globe: xanh đậm
        } else if (
          obj.isMesh &&
          obj.geometry?.type === "PlaneBufferGeometry" &&
          obj.material.color.getHex() === 0xffc300
        ) {
          obj.material.map = null;
          obj.material.color.set("#f0b90b"); // marker point: vàng
        } else if (
          obj.isMesh &&
          obj.geometry?.type === "PlaneBufferGeometry" &&
          obj.material.color.getHex() === 0x22ffcc
        ) {
          obj.material.map = null;
          obj.material.color.set("#00ff00"); // wave: xanh lá
        } else if (obj.isLineSegments) {
          obj.material.color.set("#ffffff"); // viền quốc gia: trắng
        } else if (obj.isSprite) {
          obj.material.opacity = 0.4; // glow: đổi độ mờ
        }
        obj.material.needsUpdate = true;
      });
    }, 2000);
  }, []);

  return (
    <div className="relative h-full overflow-hidden">
      <div
        id="container"
        style={{ width: "100%", height: "100vh", background: "black" }}
      ></div>
    </div>
  );
}
