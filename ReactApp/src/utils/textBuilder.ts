import {BoxGeometry, Matrix4, MeshBasicMaterial} from "three";
import {mergeBufferGeometries} from "three/examples/jsm/utils/BufferGeometryUtils";

export const materialForText = new MeshBasicMaterial({color: 'black'});
export const size = {width: 0.1, height: 0.5, depth: 0.001}
export const textGeometry = new BoxGeometry(size.width, size.height, size.depth);

//number 1
const generateGeometriesForSign1 = () => {
    const piece1 = textGeometry.clone()
    const scaleMatrix = new Matrix4().makeScale(1, 2, 1)
    piece1.applyMatrix4(scaleMatrix)
    return mergeBufferGeometries([piece1])
}
const generateGeometriesForSign0 = () => {
    const rightPiece = textGeometry.clone()
    const scaleMatrix = new Matrix4().makeScale(1, 2, 1)
    const rightPieceMatrix = new Matrix4().makeTranslation(size.height, 0, 0)
    rightPiece.applyMatrix4(scaleMatrix)
    rightPiece.applyMatrix4(rightPieceMatrix)

    const leftPiece = textGeometry.clone()
    const leftPieceMatrix = new Matrix4().makeTranslation(0, 0, 0)
    leftPiece.applyMatrix4(scaleMatrix)
    leftPiece.applyMatrix4(leftPieceMatrix)

    const upperPiece = textGeometry.clone()
    const upperPieceMatrix = new Matrix4().makeTranslation(size.height / 2, size.height, 0)
    const upperPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
    upperPiece.applyMatrix4(upperPieceRotationMatrix)
    upperPiece.applyMatrix4(upperPieceMatrix)

    const bottomPiece = textGeometry.clone()
    const bottomPieceMatrix = new Matrix4().makeTranslation(size.height / 2, -size.height, 0)
    const bottomPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
    bottomPiece.applyMatrix4(bottomPieceRotationMatrix)
    bottomPiece.applyMatrix4(bottomPieceMatrix)


    return mergeBufferGeometries([rightPiece, leftPiece, bottomPiece, upperPiece])
}

export const geo1 = generateGeometriesForSign1()
export const geo0 = generateGeometriesForSign0()
