import { TMidiEvent } from 'midi-json-parser-worker';

export interface ITimedMidiEvent {

    event: TMidiEvent;

    time: number;

}
