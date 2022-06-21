import {BoxGeometry, Matrix4, MeshBasicMaterial} from "three";
import {mergeBufferGeometries} from "three/examples/jsm/utils/BufferGeometryUtils";

export const textMaterial = new MeshBasicMaterial({color: 'black'});
export const size = {width: 0.01, height: 0.04, depth: 0.001}
export const textGeometry = new BoxGeometry(size.width, size.height, size.depth);


const generateDotGeometry = () => {
    const piece = textGeometry.clone()
    const pieceMatrix = new Matrix4().makeTranslation(0, -size.height, 0)
    const pieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
    const pieceScaleMatrix = new Matrix4().makeScale(0.2, 1, 1)
    piece.applyMatrix4(pieceRotationMatrix)
    piece.applyMatrix4(pieceMatrix)
    piece.applyMatrix4(pieceScaleMatrix)
    return piece
}
const generateNumber1Geometry = () => {
    const piece = textGeometry.clone()
    const pieceScaleMatrix = new Matrix4().makeScale(1, 2, 1)
    piece.applyMatrix4(pieceScaleMatrix)
    return piece
}
const generateLeftBracketGeometry = () => {
    const scale = 3
    const piece = textGeometry.clone()
    const pieceScaleMatrix = new Matrix4().makeScale(1, scale, 1)
    piece.applyMatrix4(pieceScaleMatrix)

    const upperPiece = textGeometry.clone()
    const upperPieceMatrix = new Matrix4().makeTranslation(size.height / 2, -size.height * (scale / 2), 0)
    const upperPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
    upperPiece.applyMatrix4(upperPieceRotationMatrix)
    upperPiece.applyMatrix4(upperPieceMatrix)

    const bottomPiece = textGeometry.clone()
    const bottomPieceMatrix = new Matrix4().makeTranslation(size.height / 2, size.height * (scale / 2), 0)
    const bottomPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
    bottomPiece.applyMatrix4(bottomPieceRotationMatrix)
    bottomPiece.applyMatrix4(bottomPieceMatrix)

    return [piece, bottomPiece, upperPiece]
}
const generateRightBracketGeometry = () => {
    const scale = 3
    const piece = textGeometry.clone()
    const pieceScaleMatrix = new Matrix4().makeScale(1, scale, 1)
    piece.applyMatrix4(pieceScaleMatrix)

    const upperPiece = textGeometry.clone()
    const upperPieceMatrix = new Matrix4().makeTranslation(-size.height / 2, -size.height * (scale / 2), 0)
    const upperPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
    upperPiece.applyMatrix4(upperPieceRotationMatrix)
    upperPiece.applyMatrix4(upperPieceMatrix)

    const bottomPiece = textGeometry.clone()
    const bottomPieceMatrix = new Matrix4().makeTranslation(-size.height / 2, size.height * (scale / 2), 0)
    const bottomPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
    bottomPiece.applyMatrix4(bottomPieceRotationMatrix)
    bottomPiece.applyMatrix4(bottomPieceMatrix)

    return [piece, bottomPiece, upperPiece]
}

export const generateGeometriesForNumbers = (number: string) => {
    const rightBottomPiece = textGeometry.clone()
    const rightPieceMatrix = new Matrix4().makeTranslation(size.height / 2, -size.height / 2, 0)
    rightBottomPiece.applyMatrix4(rightPieceMatrix)

    const leftBottomPiece = textGeometry.clone()
    const leftPieceMatrix = new Matrix4().makeTranslation(-size.height / 2, -size.height / 2, 0)
    leftBottomPiece.applyMatrix4(leftPieceMatrix)

    const rightTopPiece = textGeometry.clone()
    const rightTopPieceMatrix = new Matrix4().makeTranslation(size.height / 2, size.height / 2, 0)
    rightTopPiece.applyMatrix4(rightTopPieceMatrix)

    const leftTopPiece = textGeometry.clone()
    const leftTopPieceMatrix = new Matrix4().makeTranslation(-size.height / 2, size.height / 2, 0)
    leftTopPiece.applyMatrix4(leftTopPieceMatrix)

    const upperPiece = textGeometry.clone()
    const upperPieceMatrix = new Matrix4().makeTranslation(0, size.height, 0)
    const upperPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
    upperPiece.applyMatrix4(upperPieceRotationMatrix)
    upperPiece.applyMatrix4(upperPieceMatrix)

    const bottomPiece = textGeometry.clone()
    const bottomPieceMatrix = new Matrix4().makeTranslation(0, -size.height, 0)
    const bottomPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
    bottomPiece.applyMatrix4(bottomPieceRotationMatrix)
    bottomPiece.applyMatrix4(bottomPieceMatrix)

    const middlePiece = textGeometry.clone()
    const middlePieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
    middlePiece.applyMatrix4(middlePieceRotationMatrix)


    let geometries = [upperPiece, rightTopPiece, rightBottomPiece, bottomPiece, leftBottomPiece, leftTopPiece, middlePiece]

    switch (number) {
        case '0': {
            geometries = geometries.filter((element, index) => index !== 6)
            break
        }
        case '1': {
            geometries = [generateNumber1Geometry()]
            break
        }
        case '2': {
            geometries = geometries.filter((element, index) => index !== 2 && index !== 5)
            break
        }
        case '3': {
            geometries = geometries.filter((element, index) => index !== 4 && index !== 5)
            break
        }
        case '4': {
            geometries = geometries.filter((element, index) => index !== 0 && index !== 3 && index !== 4)
            break
        }
        case '5': {
            geometries = geometries.filter((element, index) => index !== 1 && index !== 4)
            break
        }
        case '6': {
            geometries = geometries.filter((element, index) => index !== 1)
            break
        }
        case '7': {
            geometries = geometries.filter((element, index) => index === 0 || index === 1 || index === 2)
            break
        }
        case '8': {
            break
        }
        case '9': {
            geometries = geometries.filter((element, index) => index !== 4)
            break
        }
        case '.': {
            geometries = [generateDotGeometry()]
            break
        }
        case '(': {
            geometries = generateLeftBracketGeometry()
            break
        }
        case ')': {
            geometries = generateRightBracketGeometry()
            break
        }
        default: {
            geometries = geometries.filter((element, index) => index === 6)
            break
        }
    }

    return mergeBufferGeometries(geometries)
}
