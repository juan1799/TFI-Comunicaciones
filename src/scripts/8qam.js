function getQAM(binaryInput) { 
    const phases = {
        '000': [0,1],
        '001': [0,2],
        '010': [90,1],
        '011': [90,2],
        '100': [180,1],
        '101': [180,2],
        '110': [270,1],
        '111': [270,2]
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
    const puntos = document.querySelectorAll('.active');
    const rows = document.querySelectorAll('.row');

    puntos.forEach((elemento) => {
        elemento.classList.remove('active');
    })
    rows.forEach((row) => {
        row.classList.remove('active-row')
    })
    if (binaryInput.length !== 12) {
        alert("Debe ingresar una cadena binaria de 12 bits.");
        return;
    }
    const phases = getQAM(binaryInput);
    phases.forEach(
      (phase) => {
        document.getElementById(''+phase[0]+''+phase[1]+'').classList.add('active');

        document.getElementById(''+phase[0]+''+phase[1]+'t').classList.add('active-row');
      }
    );
    document.getElementById('cadena').innerText = `Cadena: ${document.getElementById('binaryInput').value.match(/.{1,3}/g).join("-")}`
    document.getElementById('result').innerText = `
    Fases:
     ${phases.map(phase => phase.join('°, Amplitud: ')).join('  |  ')} `;
  }