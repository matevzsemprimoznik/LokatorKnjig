export interface Position{
    x: number,
    y: number,
    z: number
}
export interface Entrance{
    position: Position,
    rotation: number
}
export interface Bookshelf{
    udks: Array<string>,
    position: Position
    rotation: number
}
export interface Room{
    label: string,
    floor: number,
    bookshelves: Array<Bookshelf>
    entrances: Array<Entrance>
    ground: Array<Position>
    center: Position
}