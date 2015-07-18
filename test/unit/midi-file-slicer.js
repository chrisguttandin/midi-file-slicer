'use strict';

var MidiFileSlicer = require('../../src/midi-file-slicer.js').MidiFileSlicer;

describe('MidiFileSlicer', function () {

    describe('slice()', function () {

        it('should slice the midi representation of default.json', function () {
            var json,
                midiFileSlicer;

            json = require('../fixtures/default.json');

            midiFileSlicer = new MidiFileSlicer({
                json: json
            });

            expect(midiFileSlicer.slice(500, 1000)).to.deep.equal([
                {
                    delta: 240,
                    noteOn: {
                        noteNumber: 60,
                        velocity: 127
                    },
                    time: 0.00000000000005921189464667502
                }, {
                    delta: 240,
                    noteOff: {
                        noteNumber: 60,
                        velocity: 127
                    },
                    time: 250.00000000000009
                }
            ]);
        });

        it('should slice the midi representation of 240-bpm.json', function () {
            var json,
                midiFileSlicer;

            json = require('../fixtures/240-bpm.json');

            midiFileSlicer = new MidiFileSlicer({
                json: json
            });

            expect(midiFileSlicer.slice(500, 1000)).to.deep.equal([
                {
                    delta: 240,
                    noteOn: {
                        noteNumber: 60,
                        velocity: 127
                    },
                    time: 0.00000000000005921189464667502
                }, {
                    delta: 240,
                    noteOff: {
                        noteNumber: 60,
                        velocity: 127
                    },
                    time: 125.00000000000007
                }, {
                    delta: 240,
                    noteOn: {
                        noteNumber: 60,
                        velocity: 127
                    },
                    time: 250.00000000000009
                }, {
                    delta: 240,
                    noteOff: {
                        noteNumber: 60,
                        velocity: 127
                    },
                    time: 375.0000000000001
                }
            ]);
        });

    });

});
