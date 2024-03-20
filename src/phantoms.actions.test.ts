import { describe, expect, test } from 'vitest'
import { deletePhantom, duplicatePhantom } from './phantoms.actions'
import { IPhantom } from './phantoms';

const phantomList: IPhantom[] = [
    {
        id: "1",
        name: "My First Phantom",
        script: "My First Phantom.js",
        manifest: {
            "tags": {
                "categories": [
                    "linkedin",
                ]
            }
        },
        launchType: "manually",
        repeatedLaunchTimes: {
            simplePreset: "Once per day"
        },
        nextLaunchIn: 3654
    }
];

describe('duplicatePhantom', () => {
    test('with existing phantomId', () => {
        const resultPhantoms: IPhantom[] = duplicatePhantom(phantomList, phantomList[0].id);
        expect(resultPhantoms.length).toBe(2);

        const originalPhantom = { ...resultPhantoms[0] };
        const duplicatedPhantom = { ...resultPhantoms[1] };
        expect(originalPhantom.name).toEqual(duplicatedPhantom.name);
        expect(originalPhantom.script).toEqual(duplicatedPhantom.script);
        expect(originalPhantom.manifest).toEqual(duplicatedPhantom.manifest);
        expect(originalPhantom.launchType).toEqual(duplicatedPhantom.launchType);
        expect(originalPhantom.repeatedLaunchTimes).toEqual(duplicatedPhantom.repeatedLaunchTimes);
        expect(originalPhantom.nextLaunchIn).toEqual(duplicatedPhantom.nextLaunchIn);
    });

    test('with not-existing phantomId', () => {
        expect(() => duplicatePhantom(phantomList, 'notExistingId')).toThrowError("Cannot duplicate phantoms notExistingId: not found");
    });
});

describe('deletePhantom', () => {
    console.log(JSON.stringify(phantomList));

    test('with existing phantomId', () => {
        const resultPhantoms: IPhantom[] = deletePhantom(phantomList, phantomList[0].id);
        expect(resultPhantoms.length).toBe(0);
    });

    test('with not-existing phantomId', () => {
        expect(() => deletePhantom(phantomList, 'notExistingId')).toThrowError("Cannot delete phantoms notExistingId: not found");
    });
})