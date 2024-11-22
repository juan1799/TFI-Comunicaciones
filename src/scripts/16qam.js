function getQAM(binaryInput) { 
    const phases = {
        '0000': [0,1],
        '0001': [45,1],
        '0010': [90,1],
        '0011': [135,1],
        '0100': [180,1],
        '0101': [225,1],
        '0110': [270,1],
        '0111': [315,1],
        '1000':[0,2],
        '1001':[45,2],
        '1010':[90,2],
        '1011':[135,2],
        '1100':[180,2],
        '1101':[225,2],
        '1110':[270,2],
        '1111':[315,2],
    };
  
    // Dividir la cadena de entrada en bloques de 4 bits
    let phasesArray = [];
    for (let i = 0; i < binaryInput.length; i += 4) {
        let tetrabit = binaryInput.substr(i, 4);
        phasesArray.push(phases[tetrabit]);
    }
  console.log(phasesArray);
  
    return phasesArray;
  
  }
  
  function showPhases() {
    const binaryInput = document.getElementById('binaryInput').value;
    const puntos = document.querySelectorAll('.point-qam');
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
      (phase,index) => {
        setTimeout(()=>{
          console.log(phase);
          puntos.forEach((elemento) => {
            elemento.classList.remove('active');
          })
          rows.forEach((row) => {
            row.classList.remove('active-row')
          })
          document.getElementById(''+phase[0]+''+phase[1]+'').classList.add('active');
  
          document.getElementById(''+phase[0]+''+phase[1]+'t').classList.add('active-row');
        },1250*index)
        
      }
    );
    document.getElementById('cadena').innerText = `Cadena: ${document.getElementById('binaryInput').value.match(/.{1,4}/g).join("-")}`
    document.getElementById('result').innerText = `
    Fases:
     ${phases.map(phase => phase.join('°, Amplitud: ')).join('  |  ')} `;
  }

  document.addEventListener('DOMContentLoaded', (event) => {
    const tabla = document.getElementById('miTabla');
    
    tabla.addEventListener('click', (event) => {
      const fila = event.target.closest('tr');
      
      if (fila) {
        console.log('Fila clickeada:', fila.rowIndex);
  
        const phase = fila.cells[1].textContent.slice(0, -1);
        const amplitude = fila.cells[2].textContent;
        
        console.log('Phase:', phase);
        console.log('Amplitude:', amplitude);
  
        if(document.getElementById(''+phase+''+amplitude+'t').classList.contains('active-row')){
  
          document.getElementById(''+phase+''+amplitude+'t').classList.remove('active-row') 
          document.getElementById(''+phase+''+amplitude).classList.remove('active');
        }else{
  
          document.getElementById(''+phase+''+amplitude+'t').classList.add('active-row');
          document.getElementById(''+phase+''+amplitude).classList.add('active');
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
