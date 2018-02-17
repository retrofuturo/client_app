
import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate {

  // сработает на canActivate

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.map( auth => {
      if(!auth){
        this.router.navigate(['/login']);
        return false
      } else {
        return true;
      }
    })
  }
}
