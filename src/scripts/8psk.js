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

  phases.forEach((phase, index) => {

      setTimeout(()=>{
        rows.forEach((row)=>{
          row.classList.remove('active-row')
        })
        elementos.forEach((elemento) => {
          elemento.classList.remove('active');
        })
        document.getElementById(''+phase+'').classList.add('active');
        document.getElementById(''+phase+'t').classList.add('active-row');
      },1250*index);

    }
  );
  document.getElementById('cadena').innerText = `Cadena: ${document.getElementById('binaryInput').value.match(/.{1,3}/g).join("-")}`
  document.getElementById('result').innerText = `Fases: ${phases.map(phase => phase).join('°, ')}°`;
}

document.addEventListener('DOMContentLoaded', (event) => {
  const tabla = document.getElementById('miTabla');
  const elementos = document.querySelectorAll('.point')
  const rows = document.querySelectorAll('.row');

  tabla.addEventListener('click', (event) => {
    const fila = event.target.closest('tr');

    if (fila) {
      console.log('Fila clickeada:', fila.rowIndex);
      const dato = fila.cells[1].textContent.slice(0,-1);
      
      if(document.getElementById(''+dato+'t').classList.contains('active-row')){

        document.getElementById(''+dato+'t').classList.remove('active-row') 
        document.getElementById(''+dato+'').classList.remove('active');
      }else{

        document.getElementById(''+dato+'t').classList.add('active-row');
        document.getElementById(''+dato+'').classList.add('active');
      }
    }
  });
});

function generateRandomBinary() {
  let binaryString = '';
  for (let i = 0; i < 12; i++) {
      binaryString += Math.floor(Math.random() * 2); // Genera 0 o 1 de forma aleatoria
  }
  document.getElementById('binaryInput').value = binaryString;
}
