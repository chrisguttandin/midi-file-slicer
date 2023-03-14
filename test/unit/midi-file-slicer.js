import { MidiFileSlicer } from '../../src/midi-file-slicer';
import multipleSetTempoEvents from '../fixtures/multiple-set-tempo-events.json';
import noSetTempoEvent from '../fixtures/no-set-tempo-event.json';
import oneSetTempoEvent from '../fixtures/one-set-tempo-event.json';

describe('MidiFileSlicer', () => {
    describe('slice()', () => {
        it('should slice a midi representation with no set tempo event', () => {
            const midiFileSlicer = new MidiFileSlicer({ json: noSetTempoEvent });

            expect(midiFileSlicer.slice(500, 1000)).to.deep.equal([
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 0
                },
                {
                    event: {
                        delta: 240,
                        noteOff: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 250
                }
            ]);
        });

        it('should slice a midi representation with one set tempo event', () => {
            const midiFileSlicer = new MidiFileSlicer({ json: oneSetTempoEvent });

            expect(midiFileSlicer.slice(500, 1000)).to.deep.equal([
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 0
                },
                {
                    event: {
                        delta: 240,
                        noteOff: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 125
                },
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 250
                },
                {
                    event: {
                        delta: 240,
                        noteOff: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 375
                }
            ]);
        });

        it('should slice a midi representation with multiple set tempo events', () => {
            const midiFileSlicer = new MidiFileSlicer({ json: multipleSetTempoEvents });

            expect(midiFileSlicer.slice(500, 1000)).to.deep.equal([
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 0
                },
                {
                    event: {
                        delta: 240,
                        noteOff: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 125
                },
                {
                    event: {
                        delta: 0,
                        setTempo: {
                            microsecondsPerQuarter: 500000
                        }
                    },
                    time: 125
                },
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 375
                }
            ]);
        });
    });
});
