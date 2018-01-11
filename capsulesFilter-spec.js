QUnit.module('capsulesFilter', function() {

    QUnit.test('filters capsules by `text` filter correctly', function(assert) {
        assert.deepEqual(capsulesFilter(mock.capsules, {text: 'io'}), [
            {
                "id": "23",
                "name": "Arpeggio",
                "intensity": 1
            },
            {
                "id": "45",
                "name": "Fortissio",
                "intensity": 2
            },
            {
                "id": "99",
                "name": "Vanilio",
                "intensity": 3
            },
            {
                "id": "100",
                "name": "Capriccio",
                "intensity": 5
            }
        ]);
    });

    QUnit.test('filters capsules by `minIntensity` filter correctly', function(assert) {
        assert.deepEqual(capsulesFilter(mock.capsules, {minIntensity: 5}), [
            {
                "id": "100",
                "name": "Capriccio",
                "intensity": 5
            },
            {
                "id": "247",
                "name": "Decaffeinato",
                "intensity": 5
            },
            {
                "id": "455",
                "name": "Volluto",
                "intensity": 8
            },
            {
                "id": "979",
                "name": "Caramelito",
                "intensity": 7
            },
            {
                "id": "66",
                "name": "Rosabaya",
                "intensity": 8
            }
        ]);
    });

    QUnit.test('filters capsules by `orderAlpha` filter correctly', function(assert) {
        assert.deepEqual(capsulesFilter(mock.capsules, {orderAlpha: true}), [
            {
                "id": "23",
                "name": "Arpeggio",
                "intensity": 1
            },
            {
                "id": "100",
                "name": "Capriccio",
                "intensity": 5
            },
            {
                "id": "979",
                "name": "Caramelito",
                "intensity": 7
            },
            {
                "id": "247",
                "name": "Decaffeinato",
                "intensity": 5
            },
            {
                "id": "45",
                "name": "Fortissio",
                "intensity": 2
            },
            {
                "id": "66",
                "name": "Rosabaya",
                "intensity": 8
            },
            {
                "id": "99",
                "name": "Vanilio",
                "intensity": 3
            },
            {
                "id": "455",
                "name": "Volluto",
                "intensity": 8
            }
        ]);
    });

    QUnit.test('filters capsules by `orderReverseAlpha` filter correctly', function(assert) {
        assert.deepEqual(capsulesFilter(mock.capsules, {orderReverseAlpha: true}), [
            {
                "id": "455",
                "name": "Volluto",
                "intensity": 8
            },
            {
                "id": "99",
                "name": "Vanilio",
                "intensity": 3
            },
            {
                "id": "66",
                "name": "Rosabaya",
                "intensity": 8
            },
            {
                "id": "45",
                "name": "Fortissio",
                "intensity": 2
            },
            {
                "id": "247",
                "name": "Decaffeinato",
                "intensity": 5
            },
            {
                "id": "979",
                "name": "Caramelito",
                "intensity": 7
            },
            {
                "id": "100",
                "name": "Capriccio",
                "intensity": 5
            },
            {
                "id": "23",
                "name": "Arpeggio",
                "intensity": 1
            }
        ]);
    });

    QUnit.test('filters capsules by multiple filters correctly: text and orderAlpha', function(assert) {
        const filter = {
            text: 'io',
            orderAlpha: true
        };
        
        assert.deepEqual(capsulesFilter(mock.capsules, filter), [
            {
                "id": "23",
                "name": "Arpeggio",
                "intensity": 1
            },
            {
                "id": "100",
                "name": "Capriccio",
                "intensity": 5
            },
            {
                "id": "45",
                "name": "Fortissio",
                "intensity": 2
            },
            {
                "id": "99",
                "name": "Vanilio",
                "intensity": 3
            }
        ]);
    });
    
    QUnit.test('filters capsules by multiple filters correctly: text and orderReverseAlpha', function(assert) {
        const filter = {
            text: 'io',
            orderReverseAlpha: true
        };
        
        assert.deepEqual(capsulesFilter(mock.capsules, filter), [
            {
                "id": "99",
                "name": "Vanilio",
                "intensity": 3
            },
            {
                "id": "45",
                "name": "Fortissio",
                "intensity": 2
            },
            {
                "id": "100",
                "name": "Capriccio",
                "intensity": 5
            },
            {
                "id": "23",
                "name": "Arpeggio",
                "intensity": 1
            }
        ]);
    });
    
    QUnit.test('filters capsules by multiple filters correctly: text, intensity and orderReverseAlpha', function(assert) {
        const filter = {
            text: 'io',
            orderReverseAlpha: true,
            minIntensity: 3
        };
        
        assert.deepEqual(capsulesFilter(mock.capsules, filter), [
            {
                "id": "99",
                "name": "Vanilio",
                "intensity": 3
            },
            {
                "id": "100",
                "name": "Capriccio",
                "intensity": 5
            }
        ]);
    });


    QUnit.test('does not mutate passed data', function(assert) {
        const filter = {
            text: 'io',
            orderReverseAlpha: true,
            minIntensity: 3
        };
        
        const originalData = mock.capsules.slice(0);
        
        const filteredCapsules = capsulesFilter(mock.capsules, filter);
        assert.deepEqual(mock.capsules, originalData);
    });

    QUnit.test('Does not apply invalid filter', function(assert) {
        let filter = {};
        assert.deepEqual(capsulesFilter(mock.capsules, filter), mock.capsules);
        
        filter = {
            orderReverseDAlpha: true
        };
        assert.deepEqual(capsulesFilter(mock.capsules, filter), mock.capsules);
        
        filter = null;
        assert.deepEqual(capsulesFilter(mock.capsules, filter), mock.capsules);
        
        assert.deepEqual(capsulesFilter(mock.capsules), mock.capsules);
    });
    
    QUnit.test('Works with filter as a function', function(assert) {
        const filter = (capsule) => {
            return capsule.id === "23" || capsule.id === "45";
        };
        
        assert.deepEqual(capsulesFilter(mock.capsules, filter), [
            {
                "id": "23",
                "name": "Arpeggio",
                "intensity": 1
            },
            {
                "id": "45",
                "name": "Fortissio",
                "intensity": 2
            }
        ]);
    });
    
    QUnit.test('Works with order as a function', function(assert) {
        const order = (capsuleA, capsuleB) => {
            return parseInt(capsuleA.id) - parseInt(capsuleB.id);
        };
        
        assert.deepEqual(capsulesFilter(mock.capsules, null, order), mock.capsules.sort(order));
    });

});
