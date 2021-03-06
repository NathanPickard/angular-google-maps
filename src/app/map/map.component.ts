import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  apiLoaded: Observable<boolean>;
  zoom = 12;
  // center: google.maps.LatLngLiteral = {lat: 24, lng: 12};

  options: google.maps.MapOptions = {
    center: { lat: 45.5212, lng: -122.664 },
    mapTypeId: 'roadmap',
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyC2GzgTEHS2Dt3A541ar4Li358M3ILMOPk', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit() {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.center = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   }
    // })
  }

  addMarker(event: google.maps.MapMouseEvent) {
    console.log(event);
    this.markerPositions.push(event.latLng.toJSON());
  }

}
