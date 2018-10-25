import {Injectable} from '@angular/core';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {WebPlayerState} from "../../web-player-state.service";
import {Tracks} from "../tracks.service";
import {Track} from "../../../models/Track";

@Injectable()
export class TrackPageResolver implements Resolve<Track> {

    constructor(
        private tracks: Tracks,
        private router: Router,
        private state: WebPlayerState
    ) {console.log('in constr')}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Track> {
        this.state.loading = true;

        const id = +route.paramMap.get('id');
        console.log('in')
        return this.tracks.get(id).toPromise().then(track => {
            this.state.loading = false;
            console.log(track,'in resolve')
            if (track) {
                return track;
            } else {
                this.router.navigate(['/']);
                return null;
            }
        }).catch(() => {
            this.state.loading = false;
            this.router.navigate(['/']);
        }) as any;
    }
}