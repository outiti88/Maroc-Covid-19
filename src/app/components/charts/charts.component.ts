import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Chart} from 'chart.js';
import * as _ from 'lodash';
import { TaskService } from 'src/app/services/task.service';




@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, OnChanges {

  @Input('my-id') myId = '';
  @Input('type') type = '';
  @Input('regionUne') regionUne = '' ;
  @Input('regionDeux') regionDeux = '';
  @Input('choice') choice = 'line';

  
  //@Input('data') data ;


    maroc = {
        Cases : 0,
        Deaths : 0,
        Recoveries : 0
    };

  region : any =[] ; 

  regions = [
    "Guelmim-Oued Noun",
    "Laayoune-Sakia El Hamra",
    "Marrakech-Safi",
    "Rabat-Salé-Kénitra",
    "Casablanca-Settat",
    "Fés-Meknés",
    "Tanger-Tétouan-Al Hoceima",
    "Beni Mellal-Khénifra",
    "Drâa-Tafilalet",
    "Oriental",
    "Eddakhla-Oued Eddahab",
    "Souss-Massa"
 ];
  constructor(private taskService: TaskService ) { }

  ngOnInit(): void {
    this.makeChart();
    
  }

  ngOnChanges(){
    this.makeChart();
}
  
  ngAfterViewInit(){

  }

 async makeChart(){

    let  data = await this.getMarocStat();
    console.log("dataaaa: ",data);
    let regions = _.map(data, 'RegionFr');
    let cas = _.map(data, 'Cases');
    let deces = _.map(data, 'Deaths');
    let gueris = _.map(data, 'Recoveries');
    
    let test = data.find(region => region.RegionFr === 'Oriental');
    console.log("region! : ",test);


    var myChart = new Chart(this.myId, {
      type: this.myId === 'chart4' ? this.choice :this.type,
      data: {
          labels: this.type !=='pie' ?regions : [this.regionDeux , this.regionUne],
          datasets: [{
              label: 'Décès',
              data:  this.type !=='pie' ?deces : [data.find(region => region.RegionFr === this.regionDeux ).Deaths ,data.find(region => region.RegionFr === this.regionUne ).Deaths ] ,
              backgroundColor: this.type === 'bar' ?
                  'rgba(255, 99, 132, 9)' :
                  [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',

                    'rgba(205, 99, 12, 0.2)',
                    'rgba(54, 62, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 12, 192, 0.2)',
                    'rgba(13, 102, 255, 0.2)',
                    'rgba(25, 159, 4, 0.2)'
                ]
                 
              ,
              borderColor: this.type === 'bar' ?
                  'rgba(255, 99, 132, 15)' :
                  [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 12, 1)',
                    'rgba(54, 62, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 12, 192, 1)',
                    'rgba(13, 102, 255, 12)',
                    'rgba(255, 159, 4, 1)'
                ]
              ,
              borderWidth: 1
          },{
            label: 'Guéris',
            
            data:  this.type !=='pie' ?gueris : [data.find(region => region.RegionFr === this.regionDeux ).Recoveries ,data.find(region => region.RegionFr === this.regionUne ).Recoveries ] ,
            backgroundColor: this.type === 'bar' ?
            'rgba(60, 202, 192, 2)' :
                  [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',

                    'rgba(255, 99, 12, 0.2)',
                    'rgba(54, 62, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 12, 192, 0.2)',
                    'rgba(13, 102, 255, 0.2)',
                    'rgba(255, 159, 4, 0.2)'
                ]
                 
              ,
              borderColor: this.type === 'bar' ?
              'rgba(75, 192, 192, 1)' :
                  [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 12, 1)',
                    'rgba(54, 62, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 12, 192, 1)',
                    'rgba(13, 102, 255, 12)',
                    'rgba(255, 159, 4, 1)'
                ]
            ,
            borderWidth: 1
        },{
            label: 'Confirmés',
            data:  this.type !=='pie' ?cas : [data.find(region => region.RegionFr === this.regionDeux ).Cases ,data.find(region => region.RegionFr === this.regionUne ).Cases ] ,
            backgroundColor: this.type === 'bar' ?
            'rgba(255, 159, 64, 2)' :
                  [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',

                    'rgba(255, 99, 12, 0.2)',
                    'rgba(54, 62, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 12, 192, 0.2)',
                    'rgba(13, 102, 255, 0.2)',
                    'rgba(255, 159, 4, 0.2)'
                ]
                 
              ,
              borderColor: this.type === 'bar' ?
              'rgba(255, 159, 64, 1)' :
                  [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 12, 1)',
                    'rgba(54, 62, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 12, 192, 1)',
                    'rgba(13, 102, 255, 12)',
                    'rgba(255, 159, 4, 1)'
                ]
            ,
            borderWidth: 1
        }
        
        
        ]
      },
      options: {
          scales: {
            xAxes: [{
                stacked: true
            }],
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  },
                  stacked: true

              }]
          }
      }
  });

  }

  getRegion(nom){
    return this.taskService.findRegion(nom);

  }

  async getMarocStat(){
    
    let resultat = [];
  
    for (let j = 0; j < this.regions.length; j++) {

      this.region = await this.getRegion(this.regions[j]);

      var c=0 , d=0 ,r=0 ;
      for (let i = 0; i < this.region.length; i++) {
        c += +this.region[i].Cases;
        d += +this.region[i].Deaths;
        r += +this.region[i].Recoveries;
      }
      let temp =  { //kanakhoud biha region + infos dyalha bacg ndirhoum f resultat
        RegionFr : '',
        Cases : 0,
        Deaths: 0,
        Recoveries: 0
      };
      temp.Cases = c;
      temp.Deaths = d;
      temp.Recoveries=r;
      temp.RegionFr = this.region[0].RegionFr;


      this.maroc.Cases += +c/2;
      this.maroc.Deaths += +d/2;
      this.maroc.Recoveries += +r/2;
      console.log("maroc: ", this.maroc);


      resultat.push(temp);
    }
    console.log("resultat: ", resultat);
        return resultat ;

  }


}
