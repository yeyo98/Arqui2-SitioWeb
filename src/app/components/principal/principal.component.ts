import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { mediaContagio } from '../../models/mediaContagio';
import { traficoPersona } from '../../models/traficoPersona';
import { ConsumirApiService } from '../../services/consumir-api.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {


  /*public etiquetas = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartData: ChartDataSets[]=[
    { data: [27, 63, 34, 85, 93, 23], label: 'Confirmados', lineTension: 0, fill: false,},
    { data: [26, 34, 75, 45, 15, 39], label: 'Muertes',  lineTension: 0, fill: false,},
    { data: [63, 36, 83, 92, 14, 74], label: 'Recuperados',  lineTension: 0, fill: false,},
  ]

  lineChartLabels: Label[] = this.etiquetas;

  lineChartOptions = { 
    responsive: true, 
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: 'rgba(176, 196, 222,0.5)',
    },
  ]

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';*/


  
  //============================ PIE ============================ 
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Personas', 'Sin', 'Sintomas %'], ['Personas', 'Con', 'Sintomas %']];
  public pieChartData: SingleDataSet = [300, 500];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColor: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: ['#373DEC','#F90E0E'],
    },
  ]

  //============================ BAR ============================ 
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Cantidad de personas' }
  ];
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColor: Color[] = [
    {
      backgroundColor: '#2DCA22'
    },
  ]



  constructor(private consumirApi: ConsumirApiService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  ngOnInit(): void {
    this.ObtenerPorcentajeCasos();
    this.ObtenerTrafico();
  }


  public ObtenerPorcentajeCasos(){
    this.consumirApi.getMediumTemperature().subscribe((res:mediaContagio)=>{
      this.pieChartData = [res.Entro, res.No_Entro];
    },err=>{

    })
  }

  public ObtenerTrafico(){
    this.consumirApi.getTraficoPersona().subscribe((res:traficoPersona[])=>{
      let auxLabel = [];
      let auxData = [];
      res.map( (dato)=>{
        auxLabel.push(dato.Fecha);
        auxData.push(dato.Cantidad);
      } )

      this.barChartLabels = auxLabel;

      this.barChartData = [
        { data: auxData, label: 'Cantidad de personas' }
      ];
      
    },err=>{

    })
  }

}
