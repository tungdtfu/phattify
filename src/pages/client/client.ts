import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RoundProvider } from '../../providers/round/round';
import { ResponseStatus } from '../../constants/response-status.constain';
import { HealthyProvider } from '../../providers/healthy/healthy';
import { DatetimeProvider } from '../../providers/date-time-format/date-time-format';
import { LoadingProvider } from '../../providers/loading/loading';
import { ConversationPage } from '../conversation/conversation';

@Component({
    selector: 'page-client',
    templateUrl: 'client.html'
})
export class ClientPage {
    options: Object;
    stroke: number = 15;
    radius: number = 125;
    semicircle: boolean = false;
    rounded: boolean = false;
    responsive: boolean = false;
    clockwise: boolean = true;
    color: string = '#45ccce';
    background: string = '#eaeaea';
    duration: number = 800;
    animation: string = 'easeOutCubic';
    animationDelay: number = 0;
    animations: string[] = [];
    gradient: boolean = false;
    realCurrent: number = 0;

    yourWeight: any = {
        lost: 0,
        current: 0,
        remaining: 0
    }

    chartWeight: any = {
        start: {},
        target: {},
        round: {},
    };

    dayChartWeight: any = {
        day: ['0', '5', '10', '15', '20', '25', '30', '35', '40'],
        weight: [200, 140, 160, 180, 46, 60, 20, 110, 180]
    }

    constructor(public navCtrl: NavController, public alertCtrl: AlertController,
        private _roundProvider: RoundProvider, private _healthyProvider: HealthyProvider,
        private _datetimeProvider: DatetimeProvider, private _loadingProvider: LoadingProvider) {
        this.chartWeight = {
            start: {
                weight: 128,
                bmi: 42.6,
                date: 'Aug 23, 2018'
            },
            target: {
                weight: 96,
                status: 'Complete',
                date: 'Dec 23, 2018'
            },
            round: {
                current: 27,
                max: 50
            }
        }
    }

    ngAfterViewInit(): void {

    }

    testMessageModule(){
        this.navCtrl.push(ConversationPage);
    }

    showPrompt() {
        const prompt = this.alertCtrl.create({
            title: 'Weight',
            message: "Enter your Weight",
            inputs: [
                {
                    name: 'weight',
                    placeholder: 'Kg',
                    type: 'number'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: data => {
                        this.yourWeight = {
                            current: data.weight,
                            lost: this.chartWeight.start.weight - data.weight,
                            remaining: data.weight - this.chartWeight.target.weight
                        }
                        this.chartWeight.round = {
                            current: this.chartWeight.start.weight - this.chartWeight.target.weight - Math.abs(this.chartWeight.target.weight - data.weight),
                            max: this.chartWeight.start.weight - this.chartWeight.target.weight
                        }
                    }
                }
            ]
        });

        prompt.present();
    }

    ngOnInit() {
        // setInterval(() => {
        //     this.chartWeight.round.current = this.chartWeight.round.current + 1
        // }, 1000);

        this.getData();
    }

    calWeight(test) {
        var day = Math.ceil(test.length / 10);//round up 2
        var i = 0;
        var days = [];
        var weights = [];
        var flag = false;
        var daysText = [];

        while (!flag) {
            days.push(i);
            weights.push(test[i].CurrentWeight);

            daysText.push(this._datetimeProvider.dateFormatRound(test[i].createdAt))
            if (i + day >= test.length) {
                i = test.length - 1;
                if (days.indexOf(i) < 0) {
                    days.push(i);
                    daysText.push(this._datetimeProvider.dateFormatRound(test[i].createdAt))
                    weights.push(test[i].CurrentWeight);
                }
                flag = true;
            } else {
                i = i + day;
            }
        }
        this.dayChartWeight = {
            day: daysText,
            weight: weights
        }
    }
    getData() {
        this._loadingProvider.showLoading();
        this._roundProvider.getRounDetail().subscribe(res => {
            this._loadingProvider.hideLoading();
            if (res['status'] == ResponseStatus.error) {
                return;
            }
            let chart = res['data'].find(item => {
                return item.Status == 'Processing';
            })
            if (!chart) {
                return;
            }

           
            this._roundProvider.getRoundByUserId('DA66958A-292C-4EC5-B44D-3F7C98E48983').subscribe(detail => {
                if (detail['status'] == ResponseStatus.error) {
                    return;
                }
                let data = detail['data'];
                let currentDay = data.find(item =>{
                    return this._datetimeProvider.dateFormatRound(item.createdAt) == this._datetimeProvider.dateFormatRound(new Date());
                })
                if(currentDay){
                    this.yourWeight.current = currentDay.CurrentWeight;
                    this.yourWeight.lost = chart.StartWeight - currentDay.CurrentWeight;
                    this.yourWeight.remaining  = currentDay.CurrentWeight - chart.TargetWeight;
                }

                this.calWeight(data)
                this.drawDayChart();
                //chart.StartWeight = 120
                this.chartWeight = {
                    start: {
                        weight: chart.StartWeight,
                        bmi: this._healthyProvider.getBmi(chart.StartWeight, 2.1),
                        date: this._datetimeProvider.dateFormatRound(chart.StartDate)
                    },
                    target: {
                        weight: chart.TargetWeight,
                        status: chart.Status,
                        date: this._datetimeProvider.dateFormatRound(chart.EndDate)
                    },
                    round: {
                        current: currentDay ? chart.StartWeight - chart.TargetWeight - Math.abs(chart.TargetWeight - currentDay.CurrentWeight): 0,
                        max: chart.StartWeight- chart.TargetWeight
                    }
                }
            })

        })
    }

    drawDayChart() {
        this.options = {
            chart: {
                defaultSeriesType: 'areaspline',
                margin: [20, 20, 70, 45],
                backgroundColor: '#2699fb',
                selectionMarkerFill: 'none'

            },
            credits: false,
            title: { text: '' },
            legend: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.4,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false,
                            },
                            select: {
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
            tooltip: {
                enabled: false
            },
            yAxis: [{
                min: 0,
                tickInterval: 25,
                padding: 5,
                gridLineWidth: 0,
                tickWidth: 0,
                labels: {
                    style: {
                        color: '#fff',
                        fontSize: '9px'
                    }
                },
                title: { text: '' },
            }],
            xAxis: {
                categories: this.dayChartWeight.day,
                endOnTick: false,
                startOnTick: false,
                tickLength: 0,
                tickWidth: 0,
                gridLineWidth: 0,
                labels: {
                    style: {
                        color: '#fff',
                        fontSize: '9px'
                    }
                },
                lineWidth: 0,
                minorGridLineWidth: 0,
                minorTickLength: 0

            },
            series: [{
                data: this.dayChartWeight.weight,
                selected: false,
                color: {
                    linearGradient: [0, 150, 10, 1],
                    stops: [
                        [0, 'rgb(255, 255, 255,0.4)'],
                        [1, 'rgb(255, 255, 255,0.1)']
                    ]
                },
                lineWidth: 0
            }]
        };
    }
}