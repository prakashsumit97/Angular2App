import { Component, OnInit } from '@angular/core';
import { AlertService, UserService, LocationService } from '../_services/index';


import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import * as _ from 'underscore';

import { PagerService } from '../_services/index'


@Component({
    selector: 'app-Location',
    templateUrl: './app/allLocation/allLocation.html',
})


export class AllLocationComponent implements OnInit {
    model: any = {};
    title: string = 'My first angular2-google-maps project';
    allLocationData: Object;

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private locationService: LocationService,
        private http: Http,
        private pagerService: PagerService
    ) { }

    // array of all items to be paged
    private allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];


    ngOnInit() {
        this.locationService.getAllLocation()
            .subscribe(
            data => {
                this.allLocationData = data;
                //this.alertService.success('Registration successful', true);
                //this.router.navigate(['/login']);
                // set items to json response
                this.allItems = data;

                // initialize to page 1
                this.setPage(1);
            },
            error => {
                this.alertService.error(error._body);
            });


        // //get dummy data
        // this.http.get('./dummy-data.json')
        //     .map((response: Response) => response.json())
        //     .subscribe(data => {
        //         // set items to json response
        //         this.allItems = data;

        //         // initialize to page 1
        //         this.setPage(1);
        //     });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);
console.log(this.pager);
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log(this.pagedItems);
    }
}

