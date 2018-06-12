import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
    selector: 'page-client',
    templateUrl: 'client.html'
})
export class ClientPage {
    options: Object;

    constructor(public navCtrl: NavController) {

    }

    ngAfterViewInit(): void {
        var myElement = document.querySelector('#chart-compare');
        var temp = myElement.offsetWidth;
        this.options = {
            chart: {
                defaultSeriesType: 'areaspline',
                width: temp,
                margin: [20, 20, 30, 45],
                backgroundColor: '#2699fb',
                selectionMarkerFill: 'none'

            },
            credits: false,
            title: {text: ''},
            legend:{
                enabled:false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.4,
                    marker: {
                        enabled: false,
                        states:{
                            hover:{
                                enabled: false,
                            },
                            select:{
                                enabled: false,
                            }
                        }
                    },
                    pointPlacement: 'on'
                },
                series: {
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            },
            tooltip:{
                enabled:false
            },
            yAxis: [{
                min: 0,
                tickInterval: 25,
                padding:5,
                gridLineWidth:0,
                tickWidth:0,
                labels:{
                    style:{
                        color:'#fff',
                        fontSize:'9px'
                    }
                },
                title: {text: ''},
            }],
            xAxis:{
                categories: ['0', '5', '10', '15', '20', '25', '30', '35', '40'],
                endOnTick: false,
                startOnTick: false,
                tickLength:0,
                tickWidth:0,
                gridLineWidth:0,
                labels: {
                    style:{
                        color:'#fff',
                        fontSize:'9px'
                    }
                },
                lineWidth: 0,
                minorGridLineWidth: 0,
                minorTickLength: 0

            },
            series: [{
                data: [20, 140, 160, 180, 46, 60, 20, 110, 180],
                selected: false,
                color: {
                    linearGradient: [0, 150, 10, 1],
                    stops: [
                        [0, 'rgb(255, 255, 255,0.4)'],
                        [1, 'rgb(255, 255, 255,0.1)']
                    ]
                },
                lineWidth:0
            }]
        };

    }

    current = 2;
    max = 100;

    ngOnInit() {
        setInterval(() => {
            this.current = this.current + 1
        }, 1000);
    }


}
