function getPSKPhase(binaryInput) { 
  const phases = {
      '000': 0,
      '001': 45,
      '010': 90,
      '011': 135,
      '100': 180,
      '101': 225,
      '110': 270,
      '111': 315
  };

  // Dividir la cadena de entrada en bloques de 3 bits
  let phasesArray = [];
  for (let i = 0; i < binaryInput.length; i += 3) {
      let triplet = binaryInput.substr(i, 3);
      phasesArray.push(phases[triplet]);
  }

  return phasesArray;
}

function showPhases() {
  const binaryInput = document.getElementById('binaryInput').value;
  const elementos = document.querySelectorAll('.point')
  const rows = document.querySelectorAll('.row');

  elementos.forEach((elemento) => {
      elemento.classList.remove('active');
  })
  rows.forEach((row)=>{
    row.classList.remove('active-row')
  })
  if (binaryInput.length !== 12) {
      alert("Debe ingresar una cadena binaria de 12 bits.");
      return;
  }
  const phases = getPSKPhase(binaryInput);

  phases.forEach(
    (phase) => {
       document.getElementById(''+phase+'').classList.add('active');
       document.getElementById(''+phase+'t').classList.add('active-row');
    }
  );
  document.getElementById('cadena').innerText = `Cadena: ${document.getElementById('binaryInput').value.match(/.{1,3}/g).join("-")}`
  document.getElementById('result').innerText = `Fases: ${phases.map(phase => phase).join('°, ')}°`;
}