import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import { AlertService, UserService, LocationService } from '../_services/index';


@Component({
  selector: 'app-search-location',
  templateUrl: `./app/searchLocation/searchLocation.html`,
})


export class SearchLocationComponent implements OnInit {
  model: any = {};
  title: string = 'My first angular2-google-maps project';
  // lat: number = 51.678418;
  // lng: number = 7.809007;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public locationData: object;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public searchElementRef: ElementRef,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private locationService: LocationService,
   ) { }



  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementById('auto'));
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.locationService.saveLocation(place)
            .subscribe(
            data => {
              //this.alertService.success('Registration successful', true);
              //this.router.navigate(['/login']);
            },
            error => {
              //this.alertService.error(error._body);
            });
          this.locationData = place;
          //this.locationData=JSON.parse(this.locationData);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

    




  }
  
  


  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}

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