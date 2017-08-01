"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../_services/index");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var index_2 = require("../_services/index");
var AllLocationComponent = (function () {
    function AllLocationComponent(userService, alertService, locationService, http, pagerService) {
        this.userService = userService;
        this.alertService = alertService;
        this.locationService = locationService;
        this.http = http;
        this.pagerService = pagerService;
        this.model = {};
        this.title = 'My first angular2-google-maps project';
        // pager object
        this.pager = {};
    }
    AllLocationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.locationService.getAllLocation()
            .subscribe(function (data) {
            _this.allLocationData = data;
            //this.alertService.success('Registration successful', true);
            //this.router.navigate(['/login']);
            // set items to json response
            _this.allItems = data;
            // initialize to page 1
            _this.setPage(1);
        }, function (error) {
            _this.alertService.error(error._body);
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
    };
    AllLocationComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);
        console.log(this.pager);
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log(this.pagedItems);
    };
    AllLocationComponent = __decorate([
        core_1.Component({
            selector: 'app-Location',
            templateUrl: './app/allLocation/allLocation.html',
        }),
        __metadata("design:paramtypes", [index_1.UserService,
            index_1.AlertService,
            index_1.LocationService,
            http_1.Http,
            index_2.PagerService])
    ], AllLocationComponent);
    return AllLocationComponent;
}());
exports.AllLocationComponent = AllLocationComponent;
//# sourceMappingURL=allLocation.js.map