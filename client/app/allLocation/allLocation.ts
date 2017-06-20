import { Component, OnInit } from '@angular/core';
import { AlertService, UserService, LocationService } from '../_services/index';

@Component({
    selector: 'app-Location',
    templateUrl: './app/allLocation/allLocation.html',
})


export class AllLocationComponent implements OnInit {
    model: any = {};
    title: string = 'My first angular2-google-maps project';
    allLocationData:Object;

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private locationService: LocationService
    ) { }


    ngOnInit() {
        this.locationService.getAllLocation()
            .subscribe(
            data => {
                this.allLocationData=data;
                //this.alertService.success('Registration successful', true);
                //this.router.navigate(['/login']);

            },
            error => {
                this.alertService.error(error._body);
            });
    }
}
