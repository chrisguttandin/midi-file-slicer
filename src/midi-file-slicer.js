'use strict';

class MidiFileSlicer {

    constructor (options) {
        this._json = options.json;

        this._gatherMicrosecondsPerBeat();
    }

    _gatherMicrosecondsPerBeat () {
        tracks: for (let i = 0, length = this._json.tracks.length; i < length; i += 1) {
            let track = this._json.tracks[i];

            for (let j = 0, length = track.length; j < length; j += 1) {
                let event = track[j];

                if (event.setTempo !== undefined) {
                    this._microsecondsPerBeat = event.setTempo.microsecondsPerBeat;

                    break tracks;
                }
            }
        }

        if (this._microsecondsPerBeat === undefined) {
            this._microsecondsPerBeat = 500000;
        }
    }

    slice (start, end) {
        var events = [];

        end = end / ((this._microsecondsPerBeat / this._json.division) / 1000);
        start = start / ((this._microsecondsPerBeat / this._json.division) / 1000);

        for (let i = 0, length = this._json.tracks.length; i < length; i += 1) {
            let offset = 0,
                track = this._json.tracks[i];

            for (let j = 0, length = track.length; j < length; j += 1) {
                let event = track[j];

                offset += event.delta;

                if (offset >= start && offset < end) {
                    event.time = (offset - start) * ((this._microsecondsPerBeat / this._json.division) / 1000);

                    events.push(event);
                }

                if (offset >= end) {
                    break;
                }
            }
        }

        return events;
    }

}

module.exports.MidiFileSlicer = MidiFileSlicer;
