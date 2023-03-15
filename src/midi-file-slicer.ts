import { IMidiFile } from 'midi-json-parser-worker';
import { isIMidiSetTempoEvent } from './guards/midi-set-tempo-event';
import { ITimedMidiEvent } from './interfaces';

export class MidiFileSlicer {
    private _json: IMidiFile;

    constructor({ json }: { json: IMidiFile }) {
        this._json = json;
    }

    public slice(start: number, end: number): ITimedMidiEvent[] {
        const endInMicroseconds = end * 1000;
        const events: ITimedMidiEvent[] = [];
        const tracks = this._json.tracks;
        const indexOfNextEvents = tracks.map(() => 0);
        const offsetOfNextEvents = tracks.map(([{ delta }]) => delta);
        const startInMicroseconds = start * 1000;

        let currentOffset = offsetOfNextEvents.reduce((min, offset) => Math.min(min, offset), 0);
        let elapsedMicrosecondsBeforeSetTimeEvent = 0;
        let microsecondsPerQuarter = 500000;
        let nextOffset = Number.POSITIVE_INFINITY;
        let offsetOfSetTimeEvent = 0;

        while (currentOffset < Number.POSITIVE_INFINITY) {
            const offsetInMicroseconds =
                elapsedMicrosecondsBeforeSetTimeEvent +
                ((currentOffset - offsetOfSetTimeEvent) * microsecondsPerQuarter) / this._json.division;

            if (offsetInMicroseconds >= endInMicroseconds) {
                break;
            }

            for (let i = 0; i < tracks.length; i += 1) {
                if (currentOffset === offsetOfNextEvents[i]) {
                    const event = tracks[i][indexOfNextEvents[i]];

                    if (isIMidiSetTempoEvent(event)) {
                        elapsedMicrosecondsBeforeSetTimeEvent = offsetInMicroseconds;
                        microsecondsPerQuarter = event.setTempo.microsecondsPerQuarter;
                        offsetOfSetTimeEvent = currentOffset;
                    }

                    if (offsetInMicroseconds >= startInMicroseconds) {
                        events.push({ event, time: (offsetInMicroseconds - startInMicroseconds) / 1000 });
                    }

                    indexOfNextEvents[i] += 1;
                    offsetOfNextEvents[i] = currentOffset + (tracks[i][indexOfNextEvents[i]]?.delta ?? Number.POSITIVE_INFINITY);
                }

                nextOffset = Math.min(nextOffset, offsetOfNextEvents[i]);
            }

            currentOffset = nextOffset;
            nextOffset = Number.POSITIVE_INFINITY;
        }

        return events;
    }
}
