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

export class GildedRose {
    items: Item[];

    constructor(items = [] as Item[]) {
        this.items = items;
    }

    updateQuality(): Item[] {
        for (let i = 0; i < this.items.length; i++) {
            const currentItem = this.items[i];
            if (currentItem.name !== AGED_BRIE && currentItem.name !== BACKSTAGE_PASSES) {
                if (currentItem.quality > 0) {
                    if (currentItem.name !== SULFURAS) {
                        currentItem.quality = currentItem.quality - 1;
                    }
                }
            } else {
                if (currentItem.quality < 50) {
                    currentItem.quality = currentItem.quality + 1;
                    if (currentItem.name === BACKSTAGE_PASSES) {
                        if (currentItem.sellIn < 11) {
                            if (currentItem.quality < 50) {
                                currentItem.quality = currentItem.quality + 1;
                            }
                        }
                        if (currentItem.sellIn < 6) {
                            if (currentItem.quality < 50) {
                                currentItem.quality = currentItem.quality + 1;
                            }
                        }
                    }
                }
            }
            if (currentItem.name !== SULFURAS) {
                currentItem.sellIn = currentItem.sellIn - 1;
            }
            if (currentItem.sellIn < 0) {
                if (currentItem.name !== AGED_BRIE) {
                    if (currentItem.name !== BACKSTAGE_PASSES) {
                        if (currentItem.quality > 0) {
                            if (currentItem.name !== SULFURAS) {
                                currentItem.quality = currentItem.quality - 1;
                            }
                        }
                    } else {
                        currentItem.quality = currentItem.quality - currentItem.quality;
                    }
                } else {
                    if (currentItem.quality < 50) {
                        currentItem.quality = currentItem.quality + 1;
                    }
                }
            }
        }

        return this.items;
    }
}
