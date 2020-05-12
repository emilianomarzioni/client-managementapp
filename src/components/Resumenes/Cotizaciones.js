import React from 'react';
import Spinner from '../layout/Spinner';
import Swal from 'sweetalert2'
class Cotizaciones extends React.Component {
    state = {
    }
    abrirConvertidor = () => {
      
      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Siguiente &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2']
      }).queue([
        {
          title: 'Monto',
          text:'Monto a convertir'},
        {
          title: 'Moneda Inicio',
          input: 'select',
          inputOptions: {
            DKK: 'Coronas DKK',
            USD: 'USD',
            EUR: 'EUROS',
          }
        }
        
      ]).then((result) => {
        if (result.value) {
          const answers = result.value;
          let num = parseInt(answers[0],10);
          const cotizaciones = this.props.cotizaciones;
          let r;

          switch(answers[1]){
            case "DKK" : 
              r = `EUR: ${(num/cotizaciones.DKK).toFixed(2)} USD: ${(num /cotizaciones.DKK * cotizaciones.USD).toFixed(2)}`;
              break;
            case "EUR" : 
              r = `DKK: ${(num*cotizaciones.DKK).toFixed(2)} USD: ${(num * cotizaciones.USD).toFixed(2)}`;
              break;
            case "USD" : 
              r = `EUR: ${(num/cotizaciones.USD).toFixed(2)} DKK: ${(num *cotizaciones.DKK / cotizaciones.USD).toFixed(2)}`;
              break;
            default:break;
          }
          console.log(answers);
          console.log(r);
          Swal.fire({
            title: 'Resultados',
            html: `
              <h1>${answers[0]} ${answers[1]} </h1> 
              <i class="fas fa-arrow-down"></i>
              <h3>
              ${r}</h3>
            `,
            confirmButtonText: 'Cerrar'
          })
        }
      })
  
   }
    render () {
      const cotizaciones= this.props.cotizaciones;
    if(!this.props.cotizaciones) return <Spinner />;
    

    return (
        <div className="card text-white bg-info mb-3" >
  <div className="card-header"><i className="fas fa-coins"></i>{''} Cotizaciones</div>
  <div className="card-body">
    <ul className="card-text">
      <li>
        Kr to EUR : {cotizaciones.DKK}
      </li>
      <li>
        USD to EUR : {cotizaciones.USD}
      </li>
      <li>
        Kr to USD : {cotizaciones.DKK / cotizaciones.USD} 
      </li>
      
      <button className="btn btn-warning mt-3 ml-4" onClick={this.abrirConvertidor}>Convertidor</button>
      
    </ul>
  </div>
</div>
    );}
};


export default Cotizaciones;
