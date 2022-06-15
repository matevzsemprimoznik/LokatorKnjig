
export const cursorStyle = (position: any) => {
    switch (position) {
        // case "on":
        //     return "move";
        case "tl":
        case "br":
            // return "nwse-resize";
            return "resize";
        case "tr":
        case "bl":
            // return "nesw-resize";
            return "resize";
        case "inside":
            return "move";
        // default:
        //     // tu je lahko move
        //     return "move";
    }
};

// A, B, P [AB -> line segment, P -> točka

// client x in y 3.4. prvi elementi 5.6 drugi elementi

export function getClosestPoint(
    x: number,
    y: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
) {
    let a_to_p = [x - x1, y - y1];
    let a_to_b = [x2 - x1, y2 - y1];

    let atb2 = a_to_b[0] ** 2 + a_to_b[1] ** 2;

    let atp_dot_atb = a_to_p[0] * a_to_b[0] + a_to_p[1] * a_to_b[1];

    let t = atp_dot_atb / atb2;

    return {
        x: x + a_to_b[0] * t,
        y: y + a_to_b[1] * t,
    };
}

export const calculateCoordinates = (
    clientX: number,
    clientY: number
): { clientX: number; clientY: number } => {
    /*round to 10 nearest*/
    // Math.ceil(N / 10) * 10;

    /*round to 5 nearest*/
    clientX =
        clientX % 5 >= 2.5
            ? parseInt(String(clientX / 5)) * 5 + 5
            : parseInt(String(clientX / 5)) * 5;
    clientY =
        clientY % 5 >= 2.5
            ? parseInt(String(clientY / 5)) * 5 + 5
            : parseInt(String(clientY / 5)) * 5;

    return {clientX, clientY};
};

export const adjustElementCoordinates = (roomBoundaryElement: any) => {
    const {x,y,x1,y1} = roomBoundaryElement;
    const minX = Math.min(x, x1);
    const maxX = Math.max(x, x1);
    const minY = Math.min(y, y1);
    const maxY = Math.max(y, y1);
    return {x: minX, y: minY, x1: maxX, y1: maxY}
}

export const resizedCoordinates = (clientX: number, clientY: number, position: any, coordinates: any): {x: number, y: number, x1: number, y1: number} | null => {
    const {x,y,x1,y1} = coordinates;
     switch(position) {
         case "tl":
             return {x: clientX, y: clientY, x1, y1};
         case "tr":
             return {x, y: clientY, x1: clientX, y1};
         case "bl":
             return {x: clientX, y, x1, y1: clientY};
         case "br":
             return {x, y, x1: clientX, y1: clientY};
         default: {
             return null;
         }
     }
}
export const distance = (a: any, b: any) =>
    Math.sqrt(Math.pow(a.x - b.x, 1) + Math.pow(a.y - b.y, 1));

export const nearPoint = (
    x: number,
    y: number,
    x1: number,
    y1: number,
    name: string
) => {
    return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
};

