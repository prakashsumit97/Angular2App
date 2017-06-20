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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var core_2 = require("angular2-google-maps/core");
var index_1 = require("../_services/index");
var SearchLocationComponent = (function () {
    function SearchLocationComponent(mapsAPILoader, ngZone, searchElementRef, router, userService, alertService, locationService) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.searchElementRef = searchElementRef;
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.locationService = locationService;
        this.model = {};
        this.title = 'My first angular2-google-maps project';
    }
    SearchLocationComponent.prototype.saveSearch = function () {
        this.locationService.saveLocation(this.locationData)
            .subscribe(function (data) {
            //this.alertService.success('Registration successful', true);
            //this.router.navigate(['/login']);
        }, function (error) {
            //this.alertService.error(error._body);
        });
    };
    SearchLocationComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        //create search FormControl
        this.searchControl = new forms_1.FormControl();
        //set current position
        this.setCurrentPosition();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(document.getElementById('auto'));
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    console.log(place);
                    _this.locationData = place;
                    //this.locationData=JSON.parse(this.locationData);
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 12;
                });
            });
        });
    };
    SearchLocationComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 12;
            });
        }
    };
    return SearchLocationComponent;
}());
SearchLocationComponent = __decorate([
    core_1.Component({
        selector: 'app-search-location',
        templateUrl: "./app/searchLocation/searchLocation.html",
    }),
    __metadata("design:paramtypes", [core_2.MapsAPILoader,
        core_1.NgZone,
        core_1.ElementRef,
        router_1.Router,
        index_1.UserService,
        index_1.AlertService,
        index_1.LocationService])
], SearchLocationComponent);
exports.SearchLocationComponent = SearchLocationComponent;
// import { Component, NgModule, NgZone, OnInit, ViewChild,ElementRef } from '@angular/core';
// import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { BrowserModule } from "@angular/platform-browser";
// import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
// @Component({
//   selector: 'app-search-location',
//   styles: [`
//     .sebm-google-map-container {
//        height: 300px;
//      }
//   `],
//   template: `
//   <div class="container">
//     <h1>Angular 2 + Google Maps Places Autocomplete</h1>
//  <div class="form-group">
//       <input id="auto" placeholder="search for location" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #search [formControl]="searchControl">
//     <sebm-google-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom">
//       <sebm-google-map-marker [latitude]="latitude" [longitude]="longitude"></sebm-google-map-marker>
//     </sebm-google-map>
//   </div>
//   `
// })
// export class SearchLocationComponent implements OnInit {
//   public latitude: number;
//   public longitude: number;
//   public searchControl: FormControl;
//   public zoom: number;
//   // @ViewChild("search")
//   // public searchElementRef: ElementRef;
//   constructor(
//     private mapsAPILoader: MapsAPILoader,
//     private ngZone: NgZone,
//     public searchElementRef: ElementRef
//   ) {}
//   ngOnInit() {
//     //set google maps defaults
//     this.zoom = 4;
//     this.latitude = 39.8282;
//     this.longitude = -98.5795;
//     //create search FormControl
//     this.searchControl = new FormControl();
//     //set current position
//     this.setCurrentPosition();
//     //load Places Autocomplete
//     this.mapsAPILoader.load().then(() => {
//       let autocomplete = new google.maps.places.Autocomplete(document.getElementById('auto'), {
//         types: ["address"]
//       });
//       autocomplete.addListener("place_changed", () => {
//         this.ngZone.run(() => {
//           //get the place result
//           let place: google.maps.places.PlaceResult = autocomplete.getPlace();
//           //verify result
//           if (place.geometry === undefined || place.geometry === null) {
//             return;
//           }
//           //set latitude, longitude and zoom
//           this.latitude = place.geometry.location.lat();
//           this.longitude = place.geometry.location.lng();
//           this.zoom = 12;
//         });
//       });
//     });
//   }
//   private setCurrentPosition() {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         this.latitude = position.coords.latitude;
//         this.longitude = position.coords.longitude;
//         this.zoom = 12;
//       });
//     }
//   }
// }
// export class AppModule {} 
//# sourceMappingURL=searchLocation.js.map