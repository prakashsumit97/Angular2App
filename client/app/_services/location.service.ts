import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { User } from '../_models/index';



@Injectable()
export class LocationService {
    constructor(private http: Http, private config: AppConfig) { }

    saveLocation(data: object) {
        var locationData = {
            location: data,
            user: JSON.parse(localStorage.getItem('currentUser'))
        }
        return this.http.post(this.config.apiUrl + '/location/saveLocation', locationData, this.jwt()).map((response: Response) => response.json());
    }

    getAllLocation() {
        var user = JSON.parse(localStorage.getItem('currentUser'))
        return this.http.get(this.config.apiUrl + '/location/allLocation/' + user._id, this.jwt()).map((response: Response) => response.json());
    }

    // getById(_id: string) {
    //     return this.http.get(this.config.apiUrl + '/users/' + _id, this.jwt()).map((response: Response) => response.json());
    // }

    // create(user: User) {
    //     return this.http.post(this.config.apiUrl + '/users/register', user, this.jwt());
    // }

    // update(user: User) {
    //     return this.http.put(this.config.apiUrl + '/users/' + user._id, user, this.jwt());
    // }

    // delete(_id: string) {
    //     return this.http.delete(this.config.apiUrl + '/users/' + _id, this.jwt());
    // }
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}