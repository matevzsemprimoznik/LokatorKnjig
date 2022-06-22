import {BoxGeometry, BufferGeometry, Matrix4, MeshBasicMaterial} from "three";
import {mergeBufferGeometries} from "three/examples/jsm/utils/BufferGeometryUtils";

export const textMaterial = new MeshBasicMaterial({color: 'white'});
export const size = {width: 0.02, height: 0.08, depth: 0.001}
export const textGeometry = new BoxGeometry(size.width, size.height, size.depth);
const thinnerSigns = ['.']

export const generateTextGeometry = (text: string) => {
    const splittedText = text.split('')
    let offset = -(splittedText.length / 2 * (size.height * 1.4))

    const signGeometries = splittedText.map((sign, index) => {
        const signGeometry = generateSignGeometry(sign)
        signGeometry.applyMatrix4(new Matrix4().makeTranslation(offset, 0, 0));

        if (thinnerSigns.includes(sign))
            offset += size.height / 1.5
        else
            offset += size.height * 1.4

        return signGeometry.clone()
    })

    return mergeBufferGeometries(signGeometries)
}


const generateSignGeometry = (sign: string) => {
    const textBuilder = TextBuilderSingleton.getInstance()
    let geometries = textBuilder.getGeometriesForNumbers()

    switch (sign) {
        case '0': {
            geometries = geometries.filter((element, index) => index !== 6)
            break
        }
        case '1': {
            geometries = geometries.filter((element, index) => index === 1 || index === 2)
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
            geometries = textBuilder.getDotGeometries()
            break
        }
        case '(': {
            geometries = textBuilder.getLeftBracketGeometries()
            break
        }
        case ')': {
            geometries = textBuilder.getRightBracketGeometries()
            break
        }
        case '=': {
            geometries = textBuilder.getEqualSignGeometries()
            break
        }
        case ':': {
            geometries = textBuilder.getColonGeometries()
            break
        }
        case '/': {
            geometries = textBuilder.getSlashGeometries()
            break
        }
        default: {
            geometries = geometries.filter((element, index) => index === 6)
            break
        }
    }

    return mergeBufferGeometries(geometries)
}

class TextBuilderSingleton {
    private static instance: TextBuilderSingleton | null = null
    private geometriesForNumbers: BufferGeometry[] = []
    private geometriesForLeftBracket: BufferGeometry[] = []
    private geometriesForRightBracket: BufferGeometry[] = []
    private geometriesForDot: BufferGeometry[] = []
    private geometriesForEqualSign: BufferGeometry[] = []
    private geometriesForColon: BufferGeometry[] = []
    private geometriesForSlash: BufferGeometry[] = []

    private constructor() {
        this.geometriesForNumbers = this.generateNumbersGeometries()
        this.geometriesForLeftBracket = this.generateLeftBracketGeometry()
        this.geometriesForRightBracket = this.generateRightBracketGeometry()
        this.geometriesForDot = this.generateDotGeometry()
        this.geometriesForEqualSign = this.generateEqualSignGeometry()
        this.geometriesForColon = this.generateColonGeometry()
        this.geometriesForSlash = this.generateSlashGeometry()
    }

    public static getInstance = () => {
        if (TextBuilderSingleton.instance == null)
            TextBuilderSingleton.instance = new TextBuilderSingleton()
        return TextBuilderSingleton.instance
    }

    public getGeometriesForNumbers = () => {
        return this.geometriesForNumbers
    }
    public getLeftBracketGeometries = () => {
        return this.geometriesForLeftBracket
    }
    public getRightBracketGeometries = () => {
        return this.geometriesForRightBracket
    }
    public getDotGeometries = () => {
        return this.geometriesForDot
    }

    public getEqualSignGeometries = () => {
        return this.geometriesForEqualSign;
    }

    public getColonGeometries = () => {
        return this.geometriesForColon
    }
    public getSlashGeometries = () => {
        return this.geometriesForSlash
    }

    private generateNumbersGeometries = () => {
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

        return [upperPiece, rightTopPiece, rightBottomPiece, bottomPiece, leftBottomPiece, leftTopPiece, middlePiece]

    }

    private generateLeftBracketGeometry = () => {
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
    private generateRightBracketGeometry = () => {
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
    private generateDotGeometry = () => {
        const piece = textGeometry.clone()
        const pieceMatrix = new Matrix4().makeTranslation(-size.height, -size.height, 0)
        const pieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
        const pieceScaleMatrix = new Matrix4().makeScale(0.2, 1, 1)
        piece.applyMatrix4(pieceRotationMatrix)
        piece.applyMatrix4(pieceMatrix)
        piece.applyMatrix4(pieceScaleMatrix)
        return [piece]
    }

    private generateEqualSignGeometry = () => {
        const upperPiece = textGeometry.clone()
        const upperPieceMatrix = new Matrix4().makeTranslation(0, size.height / 2, 0)
        const upperPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
        upperPiece.applyMatrix4(upperPieceRotationMatrix)
        upperPiece.applyMatrix4(upperPieceMatrix)

        const bottomPiece = textGeometry.clone()
        const bottomPieceMatrix = new Matrix4().makeTranslation(0, -size.height / 2, 0)
        const bottomPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
        bottomPiece.applyMatrix4(bottomPieceRotationMatrix)
        bottomPiece.applyMatrix4(bottomPieceMatrix)

        return [upperPiece, bottomPiece]
    }
    private generateColonGeometry = () => {
        const topPiece = textGeometry.clone()
        const topPieceMatrix = new Matrix4().makeTranslation(0, size.height / 2, 0)
        const topPieceScaleMatrix = new Matrix4().makeScale(1, 0.2, 1)
        topPiece.applyMatrix4(topPieceScaleMatrix)
        topPiece.applyMatrix4(topPieceMatrix)

        const bottomPiece = textGeometry.clone()
        const bottomPieceMatrix = new Matrix4().makeTranslation(0, -size.height / 2, 0)
        const bottomPieceScaleMatrix = new Matrix4().makeScale(1, 0.2, 1)
        bottomPiece.applyMatrix4(bottomPieceScaleMatrix)
        bottomPiece.applyMatrix4(bottomPieceMatrix)

        return [topPiece, bottomPiece]
    }

    public generateSlashGeometry = () => {
        const piece = textGeometry.clone()
        const pieceScaleMatrix = new Matrix4().makeScale(1, 3, 1)
        const pieceRotationMatrix = new Matrix4().makeRotationZ(-Math.PI / 12)
        piece.applyMatrix4(pieceScaleMatrix)
        piece.applyMatrix4(pieceRotationMatrix)

        return [piece]
    }


}
