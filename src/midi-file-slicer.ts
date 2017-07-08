import { IMidiFile } from 'midi-json-parser-worker';
import { isIMidiSetTempoEvent } from './guards/midi-set-tempo-event';
import { ITimedMidiEvent } from './interfaces';

export class MidiFileSlicer {

    private _json: IMidiFile;

    private _microsecondsPerBeat: number;

    constructor ({ json }: { json: IMidiFile }) {
        this._json = json;

        this._gatherMicrosecondsPerBeat();
    }

    public slice (start: number, end: number): ITimedMidiEvent[] {
        const events: ITimedMidiEvent[] = [];

        end = end / ((this._microsecondsPerBeat / this._json.division) / 1000);
        start = start / ((this._microsecondsPerBeat / this._json.division) / 1000);

        const tracks = this._json.tracks;

        const length = tracks.length;

        for (let i = 0; i < length; i += 1) {
            let offset = 0;

            const track = tracks[i];

            const lngth = track.length;

            for (let j = 0; j < lngth; j += 1) {
                const event = track[j];

                offset += event.delta;

                if (offset >= start && offset < end) {
                    events.push({ event, time: (offset - start) * ((this._microsecondsPerBeat / this._json.division) / 1000) });
                }

                if (offset >= end) {
                    break;
                }
            }
        }

        return events;
    }

    private _gatherMicrosecondsPerBeat () {
        const tracks = this._json.tracks;

        const length = tracks.length;

        tracks: for (let i = 0; i < length; i += 1) {
            const track = tracks[i];

            const lngth = track.length;

            for (let j = 0; j < lngth; j += 1) {
                const event = track[j];

                if (isIMidiSetTempoEvent(event)) {
                    this._microsecondsPerBeat = event.setTempo.microsecondsPerBeat;

                    break tracks;
                }
            }
        }

        if (this._microsecondsPerBeat === undefined) {
            this._microsecondsPerBeat = 500000;
        }
    }

}
