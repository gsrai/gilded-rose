export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export const AGED_BRIE = 'Aged Brie';
export const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
export const SULFURAS = 'Sulfuras, Hand of Ragnaros';

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;
const BASE_VALUE = 1;

export class GildedRose {
    items: Item[];

    constructor(items = [] as Item[]) {
        this.items = items;
    }

    updateQuality(): Item[] {
        return this.items.map(item => {
            switch (item.name) {
                case AGED_BRIE:
                    return this.updateItem(item, true);
                case BACKSTAGE_PASSES:
                    let multiple = 1;
                    let zeroOut = false;
                    if (item.sellIn < 11) {
                        multiple++;
                    }
                    if (item.sellIn < 6) {
                        multiple++;
                    }
                    if (item.sellIn <= 0) {
                        zeroOut = true;
                    }
                    return this.updateItem(item, true, multiple, zeroOut);
                case SULFURAS:
                    return item;
                default:
                    return this.updateItem(item);
            }
        });
    }

    private updateItem(
        item: Item,
        invert: boolean = false,
        modifierMultiple: number = 1,
        zeroOut: boolean = false,
    ): Item {
        const { name, sellIn, quality } = item;

        const newSellin = sellIn - 1;
        const newQuality = this.updateQualityProp(quality, invert, newSellin < 0 ? 2 : modifierMultiple, zeroOut);

        return new Item(name, newSellin, newQuality);
    }

    private updateQualityProp(quality: number, invert: boolean, modifierMultiple: number, zeroOut: boolean): number {
        if (zeroOut) {
            return 0;
        }

        if (quality <= MIN_QUALITY || quality >= MAX_QUALITY) {
            return quality;
        }

        const value = BASE_VALUE * modifierMultiple;
        return invert ? quality + value : quality - value;
    }
}
