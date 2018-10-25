import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerQueue} from "../player/player-queue.service";
import {Track} from "../../models/Track";
import {Player} from "../player/player.service";
import {QueueSidebar} from "./queue-sidebar.service";
import {TrackContextMenuComponent} from "../tracks/track-context-menu/track-context-menu.component";
import {Settings} from "vebto-client/core/config/settings.service";
import {WebPlayerImagesService} from "../web-player-images.service";
import {ContextMenu} from 'vebto-client/core/ui/context-menu/context-menu.service';

@Component({
    selector: 'queue-sidebar',
    templateUrl: './queue-sidebar.component.html',
    styleUrls: ['./queue-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {'[class.hide]': '!sidebar.isVisible()'}
})
export class QueueSidebarComponent implements OnInit {

    /**
     * QueueSidebarComponent Constructor.
     */
    constructor(
        public queue: PlayerQueue,
        public player: Player,
        public sidebar: QueueSidebar,
        private contextMenu: ContextMenu,
        private settings: Settings,
        public wpImages: WebPlayerImagesService,
    ) {}

    ngOnInit() {
        if (this.settings.get('player.hide_queue')) {
            this.sidebar.hide();
        }
    }

    /**
     * Play specified track.
     */
    public playTrack(track: Track, index: number) {
        if (this.player.cued(track)) {
            this.player.play();
        } else {
            this.player.stop();
            this.queue.set(index);
            this.player.play();
        }
    }

    /**
     * Check if specified track is cued and playing.
     */
    public trackIsPlaying(track: Track) {
        return this.player.isPlaying() && this.player.cued(track);
    }

    /**
     * Show context menu for specified track.
     */
    public showContextMenu(track: Track, e: MouseEvent) {
        e.stopPropagation();
        this.contextMenu.open(TrackContextMenuComponent, e.target, {data: {item: track, type: 'track'}});
    }
}
