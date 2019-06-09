import { expect } from 'chai';
import { Item, GildedRose, AGED_BRIE, BACKSTAGE_PASSES, SULFURAS } from '../app/gilded-rose';

describe('Gilded Rose', (): void => {
    it('should construct inventory correctly when there are no items', (): void => {
        const gildedRose = new GildedRose();
        expect(gildedRose.items.length).to.equal(0);
    });

    it('should lower quality and sellIn at the end of the day', (): void => {
        const gildedRose = new GildedRose([new Item('bar', 5, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(4);
    });

    it('should lower quality by 2 when sellIn date has passed', (): void => {
        const gildedRose = new GildedRose([new Item('baz', 0, 4)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(2);
    });

    it('should not lower quality below 0 at the end of the day', (): void => {
        const gildedRose = new GildedRose([new Item('quux', 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });

    it('should increase quality of Aged Brie at the end of the day', (): void => {
        const gildedRose = new GildedRose([new Item(AGED_BRIE, 0, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(7);
    });

    it('should not increase quality beyond 50', (): void => {
        const gildedRose = new GildedRose([new Item(AGED_BRIE, 0, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
    });

    describe('Quality of Backstage Passes', (): void => {
        it('should increase quality by 1 if concert is not within 10 days', (): void => {
            const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 11, 5)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.equal(6);
        });

        it('should increase quality by 2 if concert is within 10 days', (): void => {
            const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 9, 5), new Item(BACKSTAGE_PASSES, 9, 49)]); // TODO: maybe calculate these values
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.equal(7);
        });

        it('should increase quality by 3 if concert is within 5 days', (): void => {
            const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 4, 10), new Item(BACKSTAGE_PASSES, 4, 49)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.equal(13);
        });

        it('should decrease quality to 0 if concert has passed', (): void => {
            const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 0, 23)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.equal(0);
        });
    });

    describe('Sulfuras', (): void => {
        it('should not lower quality and sellIn at the end of the day ', (): void => {
            const gildedRose = new GildedRose([new Item(SULFURAS, -9999, 80)]);
            const items = gildedRose.updateQuality();
            expect(items[0].sellIn).to.equal(-9999);
            expect(items[0].quality).to.equal(80);
        });
    });
});
