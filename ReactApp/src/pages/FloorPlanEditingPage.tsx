import React, {useContext, useEffect, useRef, useState} from 'react';
import Draggable, {DraggableEvent} from 'react-draggable';
import '../styles/floorEditingPage/FlooPlanEditingPage.css';
import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch';
import Button from '../components/Button';
import Drawer from '../components/Drawer';
import {LibraryContext, ServerRoute} from '../context/libraryContext';
import {useNavigate, useParams} from 'react-router-dom';
import {MenuContext} from '../context/menuContext';

const MenuIconUrl = '../../menu-button.svg';
const RotateIconUrl = '../../rotate.png';

const FloorPlanEditingPage = () => {
    const navigate = useNavigate();
    const {toggleMenuOpen} = React.useContext(MenuContext);
    const {abbr} = useParams();
    const {getSpecificFloorData, floorData} = useContext(LibraryContext);
    const [scale, setScale] = useState(1);
    const [elements, setElements] = useState<Array<{ rotation: number, isRotationButtonHidden: boolean, label: string }>>([]);
    const positions = useRef<Array<{ x: number; y: number }>>([]);
    const [rooms, setRooms] = useState([...floorData]);

    useEffect(() => {
        if (abbr) getSpecificFloorData(ServerRoute.EDITOR, abbr, 0);
    }, []);

    useEffect(() => {
        setRooms(floorData);
    }, [floorData.length]);

    const rotateElement = (index: number) => {
        setElements((prevState) => {
            prevState[index].rotation += 90;
            console.log(prevState);
            return [...prevState];
        });
    };

    console.log(floorData);

    const selectElement = (index: number) => {
        setElements((prevState) =>
            prevState.map((element, i) => {
                if (i === index) return {...element, isRotationButtonHidden: false};
                else return {...element, isRotationButtonHidden: true};
            })
        );
    };

    const onSubmit = () => {
        const center = {
            x:
                positions.current.reduce((previousValue, currentValue) => previousValue + currentValue.x, 0) /
                positions.current.length,
            y:
                positions.current.reduce((previousValue, currentValue) => previousValue + currentValue.y, 0) /
                positions.current.length,
        };
        const roomCenters = positions.current.map(position => {
            return {
                x: position.x - center.x,
                y: 0,
                z: position.y - center.y
            }
        })
        saveCenterOfAllRooms(roomCenters)
    };
    const saveElementPosition = (e: DraggableEvent, index: number) => {
        if ('clientX' in e && 'clientY' in e) {
            positions.current[index] = {x: e.clientX, y: e.clientY};
        }
    };

    const saveCenterOfAllRooms = async (roomCenters: { x: number; y: number; z: number }[]) => {
        try {
            //const response = await libraryApi.post(`/libraries/`);
            navigate(`/add-floor-plan/${abbr}`);

        } catch (err) {
            console.log(err);
        }
    }

    const onClickDrawerBodyElement = (element: any) => {
        console.log(element)
        setRooms((prevState) => [...prevState.filter(room => room.label !== element.text)]);
        setElements(prevState => [...prevState, {
            rotation: 0,
            isRotationButtonHidden: true,
            label: element.text
        }])

    };
    return (
        <>
            <Button onClick={onSubmit} position={{top: 8, right: 2}} text={'Save'}/>
            <TransformWrapper
                initialScale={1}
                disabled={false}
                minScale={0.5}
                maxScale={3}
                limitToBounds={false}
                pinch={{step: 5}}
                panning={{disabled: true}}
                onZoom={(ref) => setScale(ref.state.scale)}
            >
                <TransformComponent contentClass='main' wrapperStyle={{height: '100%', width: '100%'}}>
                    {elements.map((element, index) => {
                        console.log(element);
                        return (
                            <Draggable
                                key={index}
                                defaultPosition={{x: window.screen.width / 2 - 150, y: 100}}
                                scale={scale}
                                onDrag={(e) => saveElementPosition(e, index)}
                            >
                                <div className='draggable'>
                                    <svg
                                        style={{transform: `rotate(${element.rotation}deg)`}}
                                        onClick={() => selectElement(index)}
                                        width='300px'
                                        height='300px'
                                        viewBox='0 0 912 1426'
                                    >
                                        <path
                                            d='M 48,280 L 48,280'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 48,280 L 56,941'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 56,941 L 832,937'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 832,937 L 844,274'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 844,274 L 47,281'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 90,505 L 140,505 L 140,535 L 90,535'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 90,505 S 101.59226901853295,505 113.1845380370659,505 M 90,505 S 108.60476178822557,505 127.20952357645115,505 M 140,505 S 140,516.8127995728656 140,528.6255991457313 M 140,505 S 140,511.9401508306903 140,518.8803016613806 M 140,535 S 126.76963675090192,535 113.53927350180386,535 M 140,535 S 127.18406729494757,535 114.36813458989513,535 M 90,535 S 90,527.1342160252635 90,519.268432050527 M 90,535 S 90,527.4643423764527 90,519.9286847529054'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 140,505 L 190,505 L 190,535 L 140,535'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 140,505 S 151.48862550379178,505 162.97725100758356,505 M 140,505 S 150.5905173841915,505 161.18103476838297,505 M 190,505 S 190,515.8042009253579 190,526.6084018507158 M 190,505 S 190,516.5758991720328 190,528.1517983440656 M 190,535 S 174.77354754025885,535 159.54709508051772,535 M 190,535 S 171.67924821990763,535 153.35849643981527,535 M 140,535 S 140,524.9279922270736 140,514.8559844541472 M 140,535 S 140,526.4825954743354 140,517.9651909486709'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 320,310 L 370,310 L 370,340 L 320,340'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 320,310 S 333.7548296048164,310 347.5096592096328,310 M 320,310 S 339.42442447158436,310 358.8488489431687,310 M 370,310 S 370,316.7253086004936 370,323.4506172009872 M 370,310 S 370,319.31579161171715 370,328.6315832234343 M 370,340 S 359.05376069581905,340 348.10752139163816,340 M 370,340 S 358.26899652457746,340 346.5379930491549,340 M 320,340 S 320,329.9878361837951 320,319.97567236759016 M 320,340 S 320,329.8237791847572 320,319.64755836951434'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 370,310 L 420,310 L 420,340 L 370,340'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 370,310 S 384.40556807561285,310 398.8111361512257,310 M 370,310 S 380.5984222742647,310 391.1968445485294,310 M 420,310 S 420,320.07838675652846 420,330.15677351305686 M 420,310 S 420,319.1988274403909 420,328.3976548807819 M 420,340 S 409.80551748009077,340 399.6110349601816,340 M 420,340 S 409.0093205833328,340 398.0186411666656,340 M 370,340 S 370,330.34683678353485 370,320.69367356706965 M 370,340 S 370,330.26266391320587 370,320.52532782641174'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 480,310 L 530,310 L 530,340 L 480,340'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 480,310 S 499.1326062264461,310 518.2652124528922,310 M 480,310 S 491.5422925700087,310 503.0845851400175,310 M 530,310 S 530,320.92889783949016 530,331.8577956789803 M 530,310 S 530,316.3772990284175 530,322.75459805683494 M 530,340 S 517.2095216906395,340 504.41904338127887,340 M 530,340 S 511.7440573802418,340 493.4881147604837,340 M 480,340 S 480,328.8297792709081 480,317.6595585418161 M 480,340 S 480,331.34361456699236 480,322.68722913398466'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 530,310 L 580,310 L 580,340 L 530,340'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 530,310 S 541.2130641386073,310 552.4261282772144,310 M 530,310 S 545.7969267844594,310 561.5938535689187,310 M 580,310 S 580,319.3690842819462 580,328.7381685638924 M 580,310 S 580,319.0895650211324 580,328.17913004226483 M 580,340 S 569.3692507304205,340 558.738501460841,340 M 580,340 S 560.8444740902929,340 541.6889481805858,340 M 530,340 S 530,332.8388046131703 530,325.67760922634056 M 530,340 S 530,331.26595517007996 530,322.5319103401599'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 240,510 L 290,510 L 290,540 L 240,540'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 240,510 S 253.34411302368096,510 266.6882260473619,510 M 240,510 S 254.43936411794166,510 268.87872823588333,510 M 290,510 S 290,521.7997748589396 290,533.5995497178791 M 290,510 S 290,520.0530774033853 290,530.1061548067705 M 290,540 S 277.2207432785669,540 264.4414865571338,540 M 290,540 S 273.05564388170694,540 256.11128776341394,540 M 240,540 S 240,531.2249273094541 240,522.4498546189081 M 240,540 S 240,531.4498521228887 240,522.8997042457773'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 290,510 L 340,510 L 340,540 L 290,540'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 290,510 S 306.04885999996424,510 322.0977199999284,510 M 290,510 S 306.3369589184961,510 322.6739178369923,510 M 340,510 S 340,520.6127550107028 340,531.2255100214055 M 340,510 S 340,518.9004562865506 340,527.8009125731013 M 340,540 S 328.4126229588247,540 316.82524591764945,540 M 340,540 S 327.4761041940122,540 314.95220838802436,540 M 290,540 S 290,529.3592277355575 290,518.7184554711149 M 290,540 S 290,532.8093723936016 290,525.6187447872032'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 435,500 L 485,500 L 485,530 L 435,530'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 435,500 S 446.25255503042814,500 457.5051100608563,500 M 435,500 S 451.03149341478206,500 467.0629868295642,500 M 485,500 S 485,511.38779870352266 485,522.7755974070453 M 485,500 S 485,507.44283802825646 485,514.8856760565129 M 485,530 S 469.2612681699559,530 453.5225363399117,530 M 485,530 S 467.45212100203577,530 449.9042420040715,530 M 435,530 S 435,520.9648845722734 435,511.9297691445467 M 435,530 S 435,520.5983624621757 435,511.1967249243515'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 485,500 L 535,500 L 535,530 L 485,530'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 485,500 S 504.06821135723067,500 523.1364227144613,500 M 485,500 S 499.4369529322538,500 513.8739058645076,500 M 535,500 S 535,507.21678433603677 535,514.4335686720735 M 535,500 S 535,508.28500033808655 535,516.5700006761731 M 535,530 S 517.4645014237376,530 499.9290028474753,530 M 535,530 S 520.7752684452305,530 506.550536890461,530 M 485,530 S 485,520.0929699975418 485,510.1859399950836 M 485,530 S 485,519.8415948730031 485,509.68318974600635'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 685,470 L 735,470 L 735,500 L 685,500'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 685,470 S 695.8463167454868,470 706.6926334909735,470 M 685,470 S 699.2736078728881,470 713.5472157457763,470 M 735,470 S 735,479.7788236153543 735,489.5576472307087 M 735,470 S 735,476.0084625709686 735,482.01692514193724 M 735,500 S 720.1338926617448,500 705.2677853234894,500 M 735,500 S 723.6555315595837,500 712.3110631191673,500 M 685,500 S 685,492.34408061808966 685,484.6881612361793 M 685,500 S 685,492.71462302807015 685,485.42924605614024'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 735,470 L 785,470 L 785,500 L 735,500'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 735,470 S 753.2277601414008,470 771.4555202828018,470 M 735,470 S 746.5706639556457,470 758.1413279112915,470 M 785,470 S 785,480.8067940815543 785,491.6135881631086 M 785,470 S 785,478.2724894311448 785,486.5449788622896 M 785,500 S 766.4501110713225,500 747.9002221426449,500 M 785,500 S 769.9494725961806,500 754.8989451923612,500 M 735,500 S 735,491.67251871758134 735,483.34503743516274 M 735,500 S 735,489.42417110652553 735,478.84834221305107'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 85,655 L 135,655 L 135,685 L 85,685'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 85,655 S 103.20893977371308,655 121.41787954742617,655 M 85,655 S 103.34547931169206,655 121.6909586233841,655 M 135,655 S 135,661.1837426873843 135,667.3674853747688 M 135,655 S 135,662.579738685389 135,670.159477370778 M 135,685 S 123.76965326085613,685 112.53930652171226,685 M 135,685 S 119.20075013956533,685 103.40150027913066,685 M 85,685 S 85,677.5337965036891 85,670.0675930073783 M 85,685 S 85,677.9970179447288 85,670.9940358894576'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 135,655 L 185,655 L 185,685 L 135,685'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 135,655 S 149.2663211899522,655 163.53264237990442,655 M 135,655 S 148.72097958381138,655 162.44195916762277,655 M 185,655 S 185,664.740082736265 185,674.4801654725301 M 185,655 S 185,664.5499734739443 185,674.0999469478886 M 185,685 S 167.83643557187878,685 150.67287114375756,685 M 185,685 S 170.30699949775442,685 155.61399899550887,685 M 135,685 S 135,674.591391984784 135,664.182783969568 M 135,685 S 135,676.4406270712544 135,667.8812541425089'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 260,665 L 310,665 L 310,695 L 260,695'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 260,665 S 272.9350116234664,665 285.87002324693276,665 M 260,665 S 274.17546965290353,665 288.35093930580706,665 M 310,665 S 310,671.1103314959125 310,677.2206629918252 M 310,665 S 310,674.3847868797795 310,683.7695737595591 M 310,695 S 290.2460757504729,695 270.49215150094585,695 M 310,695 S 294.98069334576775,695 279.96138669153555,695 M 260,695 S 260,683.0946188324909 260,671.1892376649818 M 260,695 S 260,686.5715673616422 260,678.1431347232843'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 310,665 L 360,665 L 360,695 L 310,695'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 310,665 S 324.7508358597067,665 339.5016717194134,665 M 310,665 S 323.56934595328426,665 337.1386919065685,665 M 360,665 S 360,671.1309007981855 360,677.2618015963709 M 360,665 S 360,672.1902067958499 360,679.3804135917 M 360,695 S 343.20239753315644,695 326.4047950663129,695 M 360,695 S 345.09367370044544,695 330.18734740089087,695 M 310,695 S 310,687.7243475922209 310,680.4486951844417 M 310,695 S 310,685.4613666449196 310,675.9227332898394'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 520,645 L 570,645 L 570,675 L 520,675'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 520,645 S 538.5713486198456,645 557.1426972396912,645 M 520,645 S 534.8641468811351,645 549.7282937622701,645 M 570,645 S 570,651.6826045867408 570,658.3652091734816 M 570,645 S 570,656.3443129206948 570,667.6886258413896 M 570,675 S 550.6193522243991,675 531.2387044487982,675 M 570,675 S 556.9123325942838,675 543.8246651885677,675 M 520,675 S 520,665.1518829932937 520,655.3037659865873 M 520,675 S 520,665.438879014807 520,655.8777580296139'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 570,645 L 620,645 L 620,675 L 570,675'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 570,645 S 584.8439650357257,645 599.6879300714513,645 M 570,645 S 580.0665852816926,645 590.1331705633851,645 M 620,645 S 620,655.7111869260348 620,666.4223738520695 M 620,645 S 620,656.0945196544719 620,667.1890393089438 M 620,675 S 607.2572223499232,675 594.5144446998462,675 M 620,675 S 607.0789551497174,675 594.1579102994348,675 M 570,675 S 570,666.6942580340793 570,658.3885160681585 M 570,675 S 570,667.7044757961178 570,660.4089515922357'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 670,650 L 720,650 L 720,680 L 670,680'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 670,650 S 683.7733560931492,650 697.5467121862985,650 M 670,650 S 686.6698464195434,650 703.3396928390869,650 M 720,650 S 720,659.0353097987401 720,668.0706195974801 M 720,650 S 720,656.0996833058152 720,662.1993666116305 M 720,680 S 708.2120427228637,680 696.4240854457274,680 M 720,680 S 702.2651321757945,680 684.530264351589,680 M 670,680 S 670,668.5144805674219 670,657.0289611348437 M 670,680 S 670,671.5426980631171 670,663.0853961262343'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 720,650 L 770,650 L 770,680 L 720,680'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 720,650 S 739.4268635858886,650 758.8537271717771,650 M 720,650 S 730.952474030936,650 741.9049480618719,650 M 770,650 S 770,660.3119898696925 770,670.623979739385 M 770,650 S 770,657.7189895526285 770,665.437979105257 M 770,680 S 752.9372401782732,680 735.8744803565465,680 M 770,680 S 751.1862857393577,680 732.3725714787154,680 M 720,680 S 720,669.5064299698334 720,659.0128599396668 M 720,680 S 720,668.5785222129887 720,657.1570444259772'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 375,780 L 425,780 L 425,810 L 375,810'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 375,780 S 387.5900946341006,780 400.18018926820116,780 M 375,780 S 390.2735661750932,780 405.5471323501864,780 M 425,780 S 425,789.1825831167735 425,798.3651662335468 M 425,780 S 425,790.93913937306 425,801.87827874612 M 425,810 S 412.09287067403767,810 399.18574134807534,810 M 425,810 S 413.33334154400734,810 401.6666830880146,810 M 375,810 S 375,803.0873149446261 375,796.1746298892522 M 375,810 S 375,799.8780846629304 375,789.7561693258608'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 425,780 L 475,780 L 475,810 L 425,810'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 425,780 S 443.89324942485973,780 462.78649884971946,780 M 425,780 S 438.4246847329164,780 451.84936946583275,780 M 475,780 S 475,787.2526961046779 475,794.5053922093557 M 475,780 S 475,791.8673754489367 475,803.7347508978734 M 475,810 S 457.11617072936536,810 439.2323414587308,810 M 475,810 S 461.87214898003515,810 448.7442979600703,810 M 425,810 S 425,798.0809320885887 425,786.1618641771774 M 425,810 S 425,802.1291161168148 425,794.2582322336295'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 120,810 L 170,810 L 170,840 L 120,840'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 120,810 S 130.1055794843312,810 140.21115896866237,810 M 120,810 S 130.43580540737844,810 140.87161081475688,810 M 170,810 S 170,820.5114113249293 170,831.0228226498587 M 170,810 S 170,816.8195861693366 170,823.6391723386733 M 170,840 S 154.89763849194213,840 139.79527698388424,840 M 170,840 S 157.72430371874037,840 145.44860743748072,840 M 120,840 S 120,830.5599916298034 120,821.119983259607 M 120,840 S 120,830.5013981373171 120,821.0027962746342'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 170,810 L 220,810 L 220,840 L 170,840'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 170,810 S 186.61464700311922,810 203.22929400623846,810 M 170,810 S 187.1689547249137,810 204.33790944982738,810 M 220,810 S 220,820.790074960269 220,831.5801499205378 M 220,810 S 220,820.4874217448236 220,830.9748434896472 M 220,840 S 206.6388263255915,840 193.277652651183,840 M 220,840 S 203.33398519059895,840 186.6679703811979,840 M 170,840 S 170,833.5306239000579 170,827.0612478001158 M 170,840 S 170,832.7112929730894 170,825.4225859461786'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 575,820 L 625,820 L 625,850 L 575,850'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 575,820 S 593.6315385653638,820 612.2630771307277,820 M 575,820 S 586.7471845851604,820 598.4943691703207,820 M 625,820 S 625,830.2611873462567 625,840.5223746925136 M 625,820 S 625,831.4880292297581 625,842.9760584595163 M 625,850 S 605.2867909688252,850 585.5735819376504,850 M 625,850 S 609.4085406205517,850 593.8170812411033,850 M 575,850 S 575,841.2807851829544 575,832.5615703659089 M 575,850 S 575,841.001075398624 575,832.0021507972482'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 625,820 L 675,820 L 675,850 L 625,850'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 625,820 S 643.5058407834472,820 662.0116815668943,820 M 625,820 S 644.8325195556721,820 664.6650391113442,820 M 675,820 S 675,829.1093459831905 675,838.2186919663808 M 675,820 S 675,827.455931016068 675,834.9118620321361 M 675,850 S 660.6903752019385,850 646.3807504038772,850 M 675,850 S 661.2539682038157,850 647.5079364076314,850 M 625,850 S 625,842.4804434363114 625,834.9608868726227 M 625,850 S 625,840.7526023299367 625,831.5052046598734'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 330,575 L 380,575 L 380,605 L 330,605'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 330,575 S 348.7477881113553,575 367.49557622271067,575 M 330,575 S 341.6373984791539,575 353.2747969583077,575 M 380,575 S 380,584.8834721733487 380,594.7669443466973 M 380,575 S 380,583.9662033300025 380,592.932406660005 M 380,605 S 363.583156486334,605 347.16631297266804,605 M 380,605 S 364.5753136152912,605 349.15062723058236,605 M 330,605 S 330,596.5977158975926 330,588.1954317951852 M 330,605 S 330,598.6637170421164 330,592.3274340842329'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 380,575 L 430,575 L 430,605 L 380,605'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 380,575 S 399.67786248680557,575 419.3557249736112,575 M 380,575 S 391.9821320171584,575 403.9642640343167,575 M 430,575 S 430,582.4878436442864 430,589.9756872885728 M 430,575 S 430,586.7219835866715 430,598.443967173343 M 430,605 S 416.9598996140858,605 403.91979922817166,605 M 430,605 S 418.88310792875683,605 407.76621585751366,605 M 380,605 S 380,596.6916308075532 380,588.3832616151063 M 380,605 S 380,594.2347190682042 380,583.4694381364085'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 600,560 L 650,560 L 650,590 L 600,590'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 600,560 S 614.308420415326,560 628.6168408306522,560 M 600,560 S 614.487325030147,560 628.9746500602939,560 M 650,560 S 650,569.3101000505749 650,578.6202001011499 M 650,560 S 650,569.6103979620465 650,579.2207959240928 M 650,590 S 632.6345906596665,590 615.269181319333,590 M 650,590 S 634.6622040493186,590 619.3244080986373,590 M 600,590 S 600,580.579874850967 600,571.1597497019341 M 600,590 S 600,579.077440407558 600,568.1548808151161'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 650,560 L 700,560 L 700,590 L 650,590'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 650,560 S 663.6692734101579,560 677.3385468203157,560 M 650,560 S 666.4630027855445,560 682.926005571089,560 M 700,560 S 700,569.7671115258173 700,579.5342230516346 M 700,560 S 700,569.6083706054771 700,579.2167412109543 M 700,590 S 683.0050928573133,590 666.0101857146268,590 M 700,590 S 685.8393675044914,590 671.6787350089829,590 M 650,590 S 650,579.8574984019501 650,569.7149968039002 M 650,590 S 650,582.201958308062 650,574.403916616124'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 595,400 L 645,400 L 645,430 L 595,430'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 595,400 S 610.8371775855858,400 626.6743551711717,400 M 595,400 S 613.8373131488978,400 632.6746262977956,400 M 645,400 S 645,406.0527594973242 645,412.1055189946484 M 645,400 S 645,407.64179791292383 645,415.28359582584767 M 645,430 S 632.3199757450583,430 619.6399514901166,430 M 645,430 S 632.6349766805782,430 620.2699533611565,430 M 595,430 S 595,419.0211381325578 595,408.04227626511556 M 595,430 S 595,418.98922596968964 595,407.9784519393793'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 645,400 L 695,400 L 695,430 L 645,430'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 645,400 S 664.3074227217941,400 683.614845443588,400 M 645,400 S 660.6563950908836,400 676.3127901817672,400 M 695,400 S 695,409.68074009953784 695,419.3614801990757 M 695,400 S 695,408.3179479533595 695,416.635895906719 M 695,430 S 675.290547513873,430 655.5810950277458,430 M 695,430 S 676.0493868662004,430 657.0987737324008,430 M 645,430 S 645,422.22558376442913 645,414.4511675288582 M 645,430 S 645,420.6766421867274 645,411.35328437345487'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 725,305 L 775,305 L 775,335 L 725,335'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 725,305 S 736.261294257137,305 747.522588514274,305 M 725,305 S 744.7614435621688,305 764.5228871243376,305 M 775,305 S 775,311.4358108332378 775,317.8716216664755 M 775,305 S 775,315.1942513157545 775,325.388502631509 M 775,335 S 758.9840931294211,335 742.9681862588421,335 M 775,335 S 755.2931265007921,335 735.5862530015842,335 M 725,335 S 725,326.46126901997644 725,317.9225380399529 M 725,335 S 725,324.21894033587887 725,313.4378806717577'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 775,305 L 825,305 L 825,335 L 775,335'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 775,305 S 794.5087993123025,305 814.017598624605,305 M 775,305 S 793.9508917848204,305 812.9017835696409,305 M 825,305 S 825,314.5110409486333 825,324.0220818972666 M 825,305 S 825,314.7221885539771 825,324.4443771079542 M 825,335 S 812.9590115317518,335 800.9180230635035,335 M 825,335 S 813.2136911931093,335 801.4273823862186,335 M 775,335 S 775,325.7721493142011 775,316.5442986284022 M 775,335 S 775,325.9751253931247 775,316.95025078624934'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 335,410 L 385,410 L 385,440 L 335,440'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 335,410 S 350.22585483120133,410 365.4517096624026,410 M 335,410 S 349.0733315136031,410 363.1466630272061,410 M 385,410 S 385,419.60103850439805 385,429.2020770087961 M 385,410 S 385,418.3224420550089 385,426.6448841100177 M 385,440 S 366.85199996546686,440 348.7039999309337,440 M 385,440 S 372.3460668633912,440 359.6921337267824,440 M 335,440 S 335,432.9581346789631 335,425.91626935792624 M 335,440 S 335,430.81703350809494 335,421.6340670161899'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 385,410 L 435,410 L 435,440 L 385,440'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 385,410 S 403.70280834063965,410 422.40561668127935,410 M 385,410 S 404.6646090643804,410 424.3292181287608,410 M 435,410 S 435,416.8791435683054 435,423.75828713661076 M 435,410 S 435,421.0483564567188 435,432.09671291343767 M 435,440 S 419.15254684457074,440 403.30509368914153,440 M 435,440 S 417.63323343526736,440 400.26646687053466,440 M 385,440 S 385,428.11259416891426 385,416.22518833782846 M 385,440 S 385,428.6091880245553 385,417.2183760491106'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 48,280 S 48,280 48,280 M 48,280 S 48,280 48,280'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='5'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 48.434077099989764,280.53924502154644 S 47.539873984066396,479.10727387712035 49.624616021721906,680.4689504861005 M 47.969711085203556,279.9087153210848 S 48.4402515283718,532.2491683810955 51.66068907799323,783.6829560974799'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='5'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 55.78733454403856,941.5804926087129 S 258.3427577317058,940.0819962981697 460.0106752455614,938.1002414376848 M 56.39640955456723,940.7136696732526 S 339.10983867612464,941.4558589078848 622.9568131457665,940.2277105221716'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='5'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 832.7057774523449,937.3872507323906 S 833.8299347745493,695.6155383687707 838.9070760163082,454.17340324674547 M 831.9979239590905,937.2392926069053 S 837.2138901073117,714.996346049798 841.4000012206861,493.22392912074935'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='5'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 844.0297823386235,273.8894725841873 S 680.7895762234555,278.4909803242459 518.4402795527811,280.19064749099647 M 844.0990206798158,274.29329490040874 S 583.6017749293283,277.66282775184396 323.0715569640601,279.9236662405648'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='5'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                        <path
                                            d='M 540,90 L 640,90 L 640,120 L 540,120'
                                            opacity='1'
                                            fill='rgb(49,38,15)'
                                            stroke='none'
                                        ></path>
                                        <path
                                            d='M 540,90 S 565.1007638685795,90 590.201527737159,90 M 540,90 S 568.5289451503704,90 597.057890300741,90 M 640,90 S 640,100.64508898479451 640,111.29017796958901 M 640,90 S 640,101.65178779182105 640,113.3035755836421 M 640,120 S 612.3647402427484,120 584.7294804854968,120 M 640,120 S 617.7927011745217,120 595.5854023490432,120 M 540,120 S 540,112.39803780425868 540,104.79607560851736 M 540,120 S 540,110.81480588689199 540,101.62961177378398'
                                            opacity='1'
                                            fill='none'
                                            stroke='#000'
                                            stroke-width='1'
                                            stroke-linecap='butt'
                                            stroke-linejoin='miter'
                                            stroke-miterlimit='10'
                                        ></path>
                                    </svg>
                                    {!element.isRotationButtonHidden &&
                                        <button onClick={() => rotateElement(index)}><img src={RotateIconUrl}/>
                                        </button>}
                                </div>
                            </Draggable>
                        );
                    })}
                </TransformComponent>
            </TransformWrapper>
            <Drawer
                section={'Prostori'}
                defaultFloor={-1}
                bodyElements={rooms.map((floor) => {
                    return {text: floor.label};
                })}
                onClickBodyElement={onClickDrawerBodyElement}
            />
            <Button position={{top: 8, left: 2}} onClick={toggleMenuOpen} image={MenuIconUrl}/>
        </>
    );
};

export default FloorPlanEditingPage;
