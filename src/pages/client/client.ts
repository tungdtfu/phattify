import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RoundProvider } from '../../providers/round/round';
import { ResponseStatus } from '../../constants/response-status.constain';
import { HealthyProvider } from '../../providers/healthy/healthy';
import { DatetimeProvider } from '../../providers/date-time-format/date-time-format';
import { LoadingProvider } from '../../providers/loading/loading';

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
        round: {}
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

    showPrompt() {
        const prompt = this.alertCtrl.create({
            title: 'Login',
            message: "Enter a name for this new album you're so keen on adding",
            inputs: [
                {
                    name: 'weight',
                    placeholder: 'Title',
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
                    text: 'Save',
                    handler: data => {
                        this.yourWeight = {
                            current: data.weight,
                            lost: this.chartWeight.start.weight - data.weight,
                            remaining: data.weight - this.chartWeight.target.weight
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

    getData () {
        this._loadingProvider.showLoading();
        this._roundProvider.getRounDetail().subscribe(res => {
            this._loadingProvider.hideLoading();
            if (res['status'] == ResponseStatus.error) {
                return;
            } else {
                let chart = res['data'].find(item => {
                    return item.Status == 'Processing';
                })

                this.chartWeight = {
                    start: {
                        weight: chart.StartWeight,
                        bmi: this._healthyProvider.getBmi(chart.StartWeight, 2.1),
                        date: this._datetimeProvider.dateFormatRound(chart.StartDate)
                    },
                    target: {
                        weight: chart.StartWeight,
                        status: chart.Status,
                        date: this._datetimeProvider.dateFormatRound(chart.EndDate)
                    },
                    round: {
                        current: this._datetimeProvider.subDate(new Date(chart.StartDate), new Date()),
                        max: chart.NumberOfProgramDays
                    }
                }

                this._roundProvider.getRoundByUserId('DA66958A-292C-4EC5-B44D-3F7C98E48983').subscribe(detail => {
                    if (detail['status'] == ResponseStatus.error) {
                        return;
                    } else {
                        let data = detail['data'];

                        let listDay = [], listWeight = [];
                        data.map(item => {
                            listDay.push(this._datetimeProvider.dateFormatRound(item.createdAt));
                        })
                        data.map(item => {
                            listWeight.push(item.CurrentWeight);
                        })
                        this.dayChartWeight.day = listDay;
                        this.dayChartWeight.weight = listWeight;

                        this.drawDayChart();
                    }
                })
            }
        })
    }

    drawDayChart () {
        this.options = {
            chart: {
                defaultSeriesType: 'areaspline',
                margin: [20, 20, 30, 45],
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