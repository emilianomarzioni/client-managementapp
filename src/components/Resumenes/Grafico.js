import React,{useContext,useEffect} from 'react';
import Chart from "react-apexcharts";
import Spinner from '../layout/Spinner';
import movimientoContext from '../../context/movimientos/movimientoContext';

const Grafico = ({cotizaciones}) => {
    const movimientosContext = useContext(movimientoContext);
    const { movimientos, getMovimientos} = movimientosContext;
    useEffect(
        () => {
           getMovimientos();
           // eslint-disable-next-line
        }   , []    ) 

    if(movimientos.length === 0) return <Spinner />;
    if(!cotizaciones) return <Spinner />;    
        const balanceArray = movimientos.map(movimiento => {
        switch(movimiento.moneda){
            case "DKK" : 
            return ({
                monto: (movimiento.monto).toFixed(2),
                tipo: movimiento.tipo
            });
            case "EUR" : 
            return({ 
                tipo: movimiento.tipo,
                monto: (movimiento.monto*cotizaciones.DKK).toFixed(2)
            });
            case "USD" : 
            return({
                monto:(movimiento.monto/cotizaciones.USD*cotizaciones.DKK).toFixed(2),
                tipo: movimiento.tipo
            });
            default : 
            return ({
                monto: (movimiento.monto).toFixed(2),
                tipo: movimiento.tipo
            });
        }
        });
        


        // Funcion Agrupadora 
            const groupBy = (array, key) => {
                return array.reduce((result, currentValue) => {
                (result[currentValue[key]] = result[currentValue[key]] || []).push(
                    currentValue
                );
                return result;
                }, {}); 
            };
            //GroupByType obtengo objeto de movimientos agrupados por tipo
            var groupByType = groupBy(balanceArray, 'tipo');
            var seriesObjMontos = [];
            var labelsArrayTipos = [];

            //Creo un array de objectos que posean el monto acumulado por tipo
            Object.keys(groupByType).forEach(function(key) {
                if(key !== "Sueldo" && key !== "Cambio" && key !== "Tips"){

                labelsArrayTipos.push(key);
                
                seriesObjMontos.push(
                    
                    groupByType[key].reduce((x, y) => ( {
                    monto: Math.abs(x.monto) + Math.abs(y.monto)}),{monto:0})
                    );//Push close
                
                }//IfClose
              });
              var seriesArrayMontos = [];
              //Itero el Objeto y creo un array con los valores
            Object.keys(seriesObjMontos).forEach(key => {
                seriesArrayMontos.push(seriesObjMontos[key].monto)
            })
            
        
        const options = {
         labels: labelsArrayTipos,
         chart:{
            width:300
         },
         responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
        const series= seriesArrayMontos;
         let totalGastos = 0;
         series.forEach(mont => totalGastos += mont);
         totalGastos = totalGastos.toFixed(1);
         console.log(totalGastos)
      
    return (
            <div className="card border-primary mb-3" >
<h3 className="card-header"><i className="fas fa-chart-pie"></i> {''}Gastos DKK - Total: {totalGastos}</h3>
                <div className="card-body">
                <Chart
                            options={options}
                            series={series}
                            type="pie"
                            width="500"
                            />
                </div>
</div>            
    );
};

export default Grafico;