import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((Response) => {
      setRepositories(Response.data);
    });
  }, []);
  async function handleAddRepository() {
    // TODO
    const response = await api.post("repositories", {
      title: "Umbriel",
      url: "https://github.com/rocketseat/umbriel",
      techs: ["node", "Reactjs"],
    });

    setRepositories([...repositories, response.date])
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
