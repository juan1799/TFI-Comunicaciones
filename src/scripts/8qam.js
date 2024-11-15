let indiceActual = 0;
let phases;
const botonAtras = document.getElementById('atras');
const botonAdelante = document.getElementById('adelante');

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
    const puntos = document.querySelectorAll('.point-qam');
    const rows = document.querySelectorAll('.row');
    // const botones = document.getElementById('botones');
    // botones.classList.remove('ocultar');
    
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
    phases = getQAM(binaryInput);
    
    //actualizar()
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
    document.getElementById('cadena').innerText = `Cadena: ${document.getElementById('binaryInput').value.match(/.{1,3}/g).join("-")}`
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

function actualizar(){
    console.log(indiceActual);
    const puntos = document.querySelectorAll('.active');
    const rows = document.querySelectorAll('.row');

    puntos.forEach((elemento) => {
        elemento.classList.remove('active');
    })
    rows.forEach((row) => {
        row.classList.remove('active-row')
    })
    document.getElementById(''+phases[indiceActual][0]+''+phases[indiceActual][1]+'').classList.add('active');
    document.getElementById(''+phases[indiceActual][0]+''+phases[indiceActual][1]+'t').classList.add('active-row');
}

function irAtras() {  
    if (indiceActual > 0) {
      indiceActual--;
      actualizar();
    }
    if (indiceActual > 0) {
      botonAdelante.classList.remove('button-disabled')
    }
    else{
      botonAtras.classList.add('button-disabled')
    }
}
  
function irAdelante() {
  if (indiceActual < phases.length - 1) {
    indiceActual++;
    actualizar();
  }
  
  if (indiceActual < phases.length - 1) {
    botonAtras.classList.remove('button-disabled');
  }
  else{
    botonAdelante.classList.add('button-disabled');
  }
}
