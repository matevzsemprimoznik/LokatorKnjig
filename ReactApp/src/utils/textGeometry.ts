import * as THREE from "three";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import Roboto from "../assets/Roboto_Bold.json";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";

export const textMaterial = new THREE.MeshPhongMaterial({color: 'white'})
export const textSize = 0.1
export const numberOfDifferentSigns = 14
const font = new FontLoader().parse(Roboto);

const sign0Index = 0
const textGeometry0 = new TextGeometry('0', {
    font: font,
    size: textSize,
    height: 0.01
})

const sign1Index = 1
const textGeometry1 = new TextGeometry('1', {
    font: font,
    size: textSize,
    height: 0.01
})

const sign2Index = 2
const textGeometry2 = new TextGeometry('2', {
    font: font,
    size: textSize,
    height: 0.01
})

const sign3Index = 3
const textGeometry3 = new TextGeometry('3', {
    font: font,
    size: textSize,
    height: 0.01
})

const sign4Index = 4
const textGeometry4 = new TextGeometry('4', {
    font: font,
    size: textSize,
    height: 0.01
})

const sign5Index = 5
const textGeometry5 = new TextGeometry('5', {
    font: font,
    size: textSize,
    height: 0.01
})

const sign6Index = 6
const textGeometry6 = new TextGeometry('6', {
    font: font,
    size: textSize,
    height: 0.01
})

const sign7Index = 7
const textGeometry7 = new TextGeometry('7', {
    font: font,
    size: textSize,
    height: 0.01
})

const sign8Index = 8
const textGeometry8 = new TextGeometry('8', {
    font: font,
    size: textSize,
    height: 0.01
})

const sign9Index = 9
const textGeometry9 = new TextGeometry('9', {
    font: font,
    size: textSize,
    height: 0.01
})

const signDotIndex = 10
const textGeometryDot = new TextGeometry('.', {
    font: font,
    size: textSize,
    height: 0.01
})

const signColonIndex = 11
const textGeometryColon = new TextGeometry(':', {
    font: font,
    size: textSize,
    height: 0.01
})

const signSlashIndex = 12
const textGeometrySlash = new TextGeometry('/', {
    font: font,
    size: textSize,
    height: 0.01
})

const signHyphenIndex = 13
const textGeometryHyphen = new TextGeometry('-', {
    font: font,
    size: textSize,
    height: 0.01
})

export const getTextGeoClone = (sign: string) => {
    switch (sign) {
        case '0': {
            return {geometry: textGeometry0.clone(), index: sign0Index}
            break
        }
        case '1': {
            return {geometry: textGeometry1.clone(), index: sign1Index}
            break
        }
        case '2': {
            return {geometry: textGeometry2.clone(), index: sign2Index}
            break
        }
        case '3': {
            return {geometry: textGeometry3.clone(), index: sign3Index}
            break
        }
        case '4': {
            return {geometry: textGeometry4.clone(), index: sign4Index}
            break
        }
        case '5': {
            return {geometry: textGeometry5.clone(), index: sign5Index}
            break
        }
        case '6': {
            return {geometry: textGeometry6.clone(), index: sign6Index}
            break
        }
        case '7': {
            return {geometry: textGeometry7.clone(), index: sign7Index}
            break
        }
        case '8': {
            return {geometry: textGeometry8.clone(), index: sign8Index}
            break
        }
        case '9': {
            return {geometry: textGeometry9.clone(), index: sign9Index}
            break
        }
        case '.': {
            return {geometry: textGeometryDot.clone(), index: signDotIndex}
            break
        }
        case ':': {
            return {geometry: textGeometryColon.clone(), index: signColonIndex}
            break
        }
        case '/': {
            return {geometry: textGeometrySlash.clone(), index: signSlashIndex}
            break
        }
        case '-':
        default: {
            return {geometry: textGeometryHyphen.clone(), index: signHyphenIndex}
            break
        }

    }
}