import {BoxGeometry, BufferGeometry, Matrix4, MeshBasicMaterial} from "three";
import {mergeBufferGeometries} from "three/examples/jsm/utils/BufferGeometryUtils";

export const textMaterial = new MeshBasicMaterial({color: 'white'});
export const size = {width: 0.02, height: 0.08, depth: 0.001}
export const textGeometry = new BoxGeometry(size.width, size.height, size.depth);

let time = 0
setTimeout(() => {
    console.log(time)
}, 3000)

export const generateMatrixForSignGeometry = (sign: string) => {
    const t0 = performance.now()

    const textBuilder = TextBuilderSingleton.getInstance()
    let matrix = textBuilder.getSignMatrix(sign)

    const t1 = performance.now()
    time += t1 - t0

    return matrix
}

class TextBuilderSingleton {
    private static instance: TextBuilderSingleton | null = null
    private signsMatrix: signsMatrixInterface

    private constructor() {
        const numbersMatrix = this.generateNumbersGeometries()
        this.signsMatrix = {
            '0': numbersMatrix.filter((element, index) => index !== 6),
            '1': numbersMatrix.filter((element, index) => index === 1 || index === 2),
            '2': numbersMatrix.filter((element, index) => index !== 2 && index !== 5),
            '3': numbersMatrix.filter((element, index) => index !== 4 && index !== 5),
            '4': numbersMatrix.filter((element, index) => index !== 0 && index !== 3 && index !== 4),
            '5': numbersMatrix.filter((element, index) => index !== 1 && index !== 4),
            '6': numbersMatrix.filter((element, index) => index !== 1),
            '7': numbersMatrix.filter((element, index) => index === 0 || index === 1 || index === 2),
            '8': numbersMatrix,
            '9': numbersMatrix.filter((element, index) => index !== 4),
            '.': this.generateDotGeometry(),
            '(': this.generateLeftBracketMatrix(),
            ')': this.generateRightBracketMatrix(),
            '=': this.generateEqualSignGeometry(),
            '/': this.generateSlashGeometry(),
            ':': this.generateColonGeometry(),
            '-': numbersMatrix.filter((element, index) => index === 6)
        }
    }

    public static getInstance = () => {
        if (TextBuilderSingleton.instance == null)
            TextBuilderSingleton.instance = new TextBuilderSingleton()
        return TextBuilderSingleton.instance
    }
    public getSignMatrix = (sign: string) => {
        const matrix = this.signsMatrix[sign as keyof signsMatrixInterface]
        if (matrix == null)
            return this.signsMatrix['-']
        return matrix
    }


    private generateNumbersGeometries = () => {
        const rightBottomPieceMatrix = new Matrix4().makeTranslation(size.height / 2, -size.height / 2, 0)

        const leftBottomPieceMatrix = new Matrix4().makeTranslation(-size.height / 2, -size.height / 2, 0)

        const rightTopPieceMatrix = new Matrix4().makeTranslation(size.height / 2, size.height / 2, 0)

        const leftTopPieceMatrix = new Matrix4().makeTranslation(-size.height / 2, size.height / 2, 0)

        const upperPieceMatrix = new Matrix4().makeTranslation(0, size.height, 0)
        const upperPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
        upperPieceMatrix.multiply(upperPieceRotationMatrix)

        const bottomPieceMatrix = new Matrix4().makeTranslation(0, -size.height, 0)
        const bottomPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
        bottomPieceMatrix.multiply(bottomPieceRotationMatrix)

        const middlePieceMatrix = new Matrix4().makeRotationZ(Math.PI / 2)

        return [upperPieceMatrix, rightTopPieceMatrix, rightBottomPieceMatrix, bottomPieceMatrix, leftBottomPieceMatrix, leftTopPieceMatrix, middlePieceMatrix]

    }

    private generateLeftBracketMatrix = () => {
        const scale = 3
        const pieceMatrix = new Matrix4().makeScale(1, scale, 1)

        const upperPieceMatrix = new Matrix4().makeTranslation(size.height / 2, size.height * (scale / 2), 0)
        const upperPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
        upperPieceMatrix.multiply(upperPieceRotationMatrix)

        const bottomPieceMatrix = new Matrix4().makeTranslation(size.height / 2, -size.height * (scale / 2), 0)
        const bottomPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
        bottomPieceMatrix.multiply(bottomPieceRotationMatrix)

        return [pieceMatrix, upperPieceMatrix, bottomPieceMatrix]
    }
    private generateRightBracketMatrix = () => {
        const scale = 3
        const pieceScaleMatrix = new Matrix4().makeScale(1, scale, 1)

        const upperPieceMatrix = new Matrix4().makeTranslation(-size.height / 2, size.height * (scale / 2), 0)
        const upperPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
        upperPieceMatrix.multiply(upperPieceRotationMatrix)

        const bottomPieceMatrix = new Matrix4().makeTranslation(-size.height / 2, -size.height * (scale / 2), 0)
        const bottomPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
        bottomPieceMatrix.multiply(bottomPieceRotationMatrix)

        return [pieceScaleMatrix, upperPieceMatrix, bottomPieceMatrix]
    }
    private generateDotGeometry = () => {
        const pieceTranslationMatrix = new Matrix4().makeTranslation(-size.height, -size.height, 0)
        const pieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
        const pieceScaleMatrix = new Matrix4().makeScale(0.2, 1, 1)
        const pieceMatrix = new Matrix4().multiply(pieceScaleMatrix).multiply(pieceTranslationMatrix).multiply(pieceRotationMatrix)
        return [pieceMatrix]
    }

    private generateEqualSignGeometry = () => {
        const upperPieceMatrix = new Matrix4().makeTranslation(0, size.height / 2, 0)
        const upperPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
        upperPieceMatrix.multiply(upperPieceRotationMatrix)

        const bottomPieceMatrix = new Matrix4().makeTranslation(0, -size.height / 2, 0)
        const bottomPieceRotationMatrix = new Matrix4().makeRotationZ(Math.PI / 2)
        bottomPieceMatrix.multiply(bottomPieceRotationMatrix)

        return [upperPieceMatrix, bottomPieceMatrix]
    }
    private generateColonGeometry = () => {
        const topPieceMatrix = new Matrix4().makeTranslation(0, size.height / 2, 0)
        const topPieceScaleMatrix = new Matrix4().makeScale(1, 0.2, 1)
        topPieceMatrix.multiply(topPieceScaleMatrix)

        const bottomPieceMatrix = new Matrix4().makeTranslation(0, -size.height / 2, 0)
        const bottomPieceScaleMatrix = new Matrix4().makeScale(1, 0.2, 1)
        bottomPieceMatrix.multiply(bottomPieceScaleMatrix)

        return [topPieceMatrix, bottomPieceMatrix]
    }

    private generateSlashGeometry = () => {
        const pieceScaleMatrix = new Matrix4().makeScale(1, 3, 1)
        const pieceRotationMatrix = new Matrix4().makeRotationZ(-Math.PI / 12)
        const pieceMatrix = new Matrix4().multiply(pieceRotationMatrix).multiply(pieceScaleMatrix)

        return [pieceMatrix]
    }

}

interface signsMatrixInterface {
    '0': Matrix4[],
    '1': Matrix4[],
    '2': Matrix4[],
    '3': Matrix4[],
    '4': Matrix4[],
    '5': Matrix4[],
    '6': Matrix4[],
    '7': Matrix4[],
    '8': Matrix4[],
    '9': Matrix4[],
    '.': Matrix4[],
    '(': Matrix4[],
    ')': Matrix4[],
    '=': Matrix4[],
    '/': Matrix4[],
    ':': Matrix4[],
    '-': Matrix4[]
}
