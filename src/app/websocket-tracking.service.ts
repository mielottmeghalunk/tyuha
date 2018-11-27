import { Injectable, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store } from '@ngrx/store';
import { AppState } from '../store';

import * as io from 'socket.io-client';

import { TrackingService } from './tracking.service';
import { InitialMarkersAction, UpdateMarkersAction } from '../store/app-actions';

const wsUrl = 'http://172.25.0.112:10337';

@Injectable()
export class WebsocketTrackingService extends TrackingService implements OnDestroy {
    private webSocketConnection: SocketIOClient.Socket;
    private connected: boolean;
    private authorized: Subject<boolean> = new Subject();

    constructor(private store: Store<AppState>) {
        super();
        this.webSocketConnection = io(wsUrl);

        this.webSocketConnection.on('connect', () => {
            console.log('Successful websocket connection to: ' + wsUrl);
            this.connected = true;
        });

        this.webSocketConnection.on('authorized', () => {
            console.log('Authorized, receiving data');
            this.initializeDataConnection();
            this.authorized.next(true);
        });

        this.webSocketConnection.on('unauthorized', () => {
            console.log('Unauthorized, server closed connection');
            this.authorized.next(false);
        });
    }

    ngOnDestroy() {
        this.closeConnection();
    }

    initializeDataConnection() {
        this.webSocketConnection.on('disconnect', () => {
            console.log('Disconnected from: ' + wsUrl);
        });

        this.webSocketConnection.on('connect_timeout', (error: Error) => {
            console.error('Connection timeouted from: ' + wsUrl);
            console.error(error);
        });

        this.webSocketConnection.on('connect_error', (error: Error) => {
            console.error('Websocket connection failed to: ' + wsUrl);
            console.error(error);
        });

        this.webSocketConnection.on('error', (error: Error) => {
            console.error('Websocket error:');
            console.error(error);
        });

        this.webSocketConnection.on('reconnecting', () => {
            console.log('Reconnecting to: ' + wsUrl);
        });

        this.webSocketConnection.on('reconnect_failed', () => {
            console.error('Reconnect failed to: ' + wsUrl);
        });

        this.webSocketConnection.on('track', (info) => {
            console.log('Track request incoming: ', info);
            this.onTrack(info);
        });

        this.webSocketConnection.on('retrieveall', (info) => {
            this.onInitialData(info);
        });
    }

    closeConnection() {
        this.webSocketConnection.disconnect();
        this.connected = false;
    }

    onTrack(info) {
        this.store.dispatch(new UpdateMarkersAction(info));
    }

    onInitialData(info) {
        if (!info) {
            info = {};
        }
        console.log('Marker retrieved from server: ', info);
        const markers: any[] = [];
        const jsonInfo = JSON.parse(info);
        for (const key of jsonInfo) {
            const dataObj = Object.keys(key)[0];
            markers.push(JSON.parse(key[dataObj]));
        }

        this.store.dispatch(new InitialMarkersAction(markers));
    }

    get isConnected(): boolean {
        return this.connected;
    }

    get isAuthorized(): Observable<boolean> {
        return this.authorized.asObservable();
    }

    authenticateClient(accesToken: string) {
        this.webSocketConnection.emit('auth', accesToken);
    }
}
