function getPSKPhase(binaryInput) { 
    const phases = {
        '0000': 0,
        '0001': 22.5,
        '0010': 45,
        '0011': 67.5,
        '0100': 90,
        '0101': 112.5,
        '0110': 135,
        '0111': 157.5,
        '1000': 180,
        '1001': 202.5,
        '1010': 225,
        '1011': 247.5,
        '1100': 270,
        '1101': 292.5,
        '1110': 315,
        '1111': 337.5
    };
  
    // Dividir la cadena de entrada en bloques de 4 bits
    let phasesArray = [];
    for (let i = 0; i < binaryInput.length; i += 4) {
        let tetrabit = binaryInput.substr(i, 4);
        phasesArray.push(phases[tetrabit]);
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
    document.getElementById('cadena').innerText = `Cadena: ${document.getElementById('binaryInput').value.match(/.{1,4}/g).join("-")}`
    document.getElementById('result').innerText = `Fases: ${phases.map(phase => phase).join('°, ')}°`;
  }