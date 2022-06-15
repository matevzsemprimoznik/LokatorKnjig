import {ElementType} from "../../../models/canvas_models/canvas";
import {libraryApi} from "../../../context/axios";

export const getRoomCenter = (walls: any) => {
    let sumX = walls.reduce((acc: number, el: any) => acc + el.x, 0);
    let sumY = walls.reduce((acc: number, el: any) => acc + el.y, 0);

    return [sumX / walls.length - 1, sumY / walls.length - 1];
};

export const calculateBookshelfCenterPoint = (item: ElementType | null) => {
    if (item) {
        let {id, x, y, x1, y1, rotation, udk, nb_of_shelves} = item;
        return {
            id,
            x: (x + x1) / 2,
            y: (y + y1) / 2,
            rotation,
            nb_of_shelves,
            udk,
        };
    } else {
        return null;
    }
};

export const makeEntrancesData = (entrances: any) => {
    let entranceArr: any = [];

    entrances.forEach((item: any) => {
        entranceArr.push({
            position: {x: item.position.x, z: item.position.z, y: item.position.y},
            rotation: item.rotation,
        });
    });
    return entranceArr;
};

export const makeBookshelvesData = (recalcArrOfBookShelves: any) => {
    let bookshelves: any = [];

    recalcArrOfBookShelves.forEach((item: any) =>
        Array(Number(item.nb_of_shelves))
            .fill(null)
            .forEach((el: null, index: number, arr: any) => {
                bookshelves.push({
                    udks: item?.udk[arr.length - 1 - index] || [],
                    position: {x: item.x, z: item.z, y: index * 0.64 + 0.4},
                    rotation: item.rotation,
                });
            })
    );
    return bookshelves;
};

