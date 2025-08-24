import EntityPalette from "./components/EntityPalette/EntityPalette";
import Dashboard from "./components/ServerTable/Dashboard";
import Map3D from "./page/3DMap";

const App: React.FC = () => {
  return (
    <div className="flex h-full">
      <EntityPalette />
    </div>
  );
};

export default App;
