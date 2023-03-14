import { MidiFileSlicer } from '../../src/midi-file-slicer';
import dflt from '../fixtures/default.json';
import mixedBpm from '../fixtures/mixed-bpm.json';
import twoFourZero from '../fixtures/240-bpm.json';

describe('MidiFileSlicer', () => {
    describe('slice()', () => {
        it('should slice the midi representation of default.json', () => {
            const midiFileSlicer = new MidiFileSlicer({ json: dflt });

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

        it('should slice the midi representation of 240-bpm.json', () => {
            const midiFileSlicer = new MidiFileSlicer({ json: twoFourZero });

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

        it('should slice the midi representation of mixed-bpm.json', () => {
            const midiFileSlicer = new MidiFileSlicer({ json: mixedBpm });

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
