let state = {
    tables: [],
    votes: [],
  };
  
  // Crear inputs para las mesas
  function createTableInputs() {
    const numTables = document.getElementById("numTables").value;
    const tableInputsDiv = document.getElementById("table-inputs");
    tableInputsDiv.innerHTML = '';
    state.tables = [];
  
    // Ocultar sección de agregar mesas una vez seleccionadas
    document.getElementById('add-tables-section').style.display = 'none';
  
    for (let i = 1; i <= numTables; i++) {
      const inputHTML = `
        <input type="text" id="table${i}" placeholder="Nombre de la mesa ${i}" class="input-field">
      `;
      tableInputsDiv.innerHTML += inputHTML;
    }
  
    const buttonHTML = `<button class="btn" onclick="startVoting()">Iniciar Votación</button>`;
    tableInputsDiv.innerHTML += buttonHTML;
  }
  
  // Iniciar votación
  function startVoting() {
    const numTables = document.getElementById("numTables").value;
    const tablesListDiv = document.getElementById("tables-list");
    tablesListDiv.innerHTML = '';
    state.votes = new Array(Number(numTables)).fill(0);
  
    // Ocultar inputs una vez que comienza la votación
    document.getElementById("table-inputs").style.display = 'none';
  
    for (let i = 1; i <= numTables; i++) {
      const tableName = document.getElementById(`table${i}`).value;
      state.tables.push(tableName);
  
      const voteButtonHTML = `
        <div class="table-item">
          <h3>${tableName}</h3>
          <button class="vote-btn" onclick="registerVote(${i - 1})">Votar</button>
        </div>
      `;
      tablesListDiv.innerHTML += voteButtonHTML;
    }
  
    document.getElementById("vote-section").style.display = "block";
  }
  
  // Registrar voto
  function registerVote(index) {
    state.votes[index]++;
    updateResults();
  }
  
  // Actualizar resultados
  function updateResults() {
    const resultsSection = document.getElementById("results-section");
    const numericResultsDiv = document.getElementById("numeric-results");
    const resultsGraphDiv = document.getElementById("results-graph");
    
    resultsSection.style.display = "block";
    
    // Actualizar resultados numéricos
    numericResultsDiv.innerHTML = state.tables.map((table, i) => `${table}: ${state.votes[i]} votos`).join('<br>');
    
    // Limpiar gráfico anterior
    resultsGraphDiv.innerHTML = '';
  
    // Crear gráfico simple usando barras
    state.tables.forEach((table, i) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.width = `${(state.votes[i] / Math.max(...state.votes) * 100) || 0}%`; // Ajustar el ancho según los votos
      const barLabel = document.createElement('div');
      barLabel.className = 'bar-label';
      barLabel.innerText = `${table}: ${state.votes[i]} votos`;
      bar.appendChild(barLabel);
      resultsGraphDiv.appendChild(bar);
    });
  }
  
