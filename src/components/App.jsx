import React, { useEffect, useState } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((plantsData) => setPlants(plantsData));
  }, []);

  function handleAddPlant(newPlantData) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlantData),
    })
      .then((response) => response.json())
      .then((createdPlant) => setPlants((currentPlants) => [...currentPlants, createdPlant]));
  }

  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <PlantPage
        plants={displayedPlants}
        onAddPlant={handleAddPlant}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </div>
  );
}

export default App;
