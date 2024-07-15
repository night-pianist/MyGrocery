import React, { useState } from 'react';
import Dropdown from './DropdownBtn'; // Adjust the path as per your project structure
import '../styles/Routing.css';

interface RouteInfo {
    distFormatted: string;
    duration: string;
    stepsInstr: string[];
    stepsDist: string[];
    routeCoordinates: any; // Adjust type as per your actual data structure
    routeName: string;
    storeList: string[];
    addressList: string[];
    geoPointsArr: any[]; // Adjust type as per your actual data structure
}

interface Props {
    routeInfos: RouteInfo[];
    selectedRoute: RouteInfo | null;
    setSelectedRoute: React.Dispatch<React.SetStateAction<RouteInfo | null>>;
    displayRoute: (routeCoordinates: any, geoPointsArr: any[]) => void; // Adjust type as per your actual implementation
}

const Routing: React.FC<Props> = ({ routeInfos, selectedRoute, setSelectedRoute, displayRoute }) => {

    const formatPathName = (storeList: string[]) => {
        return storeList.join(' → ');
    };

    // routing return statement
    return (
        <div className="routing-container">
            <Dropdown
                routes={routeInfos.map(route => ({
                    name: route.routeName,
                    coordinates: route.routeCoordinates,
                    geoPointsArr: route.geoPointsArr
                }))}
                onSelectRoute={(routeName, routeCoordinates, geoPointsArr) => {
                    const selected = routeInfos.find(route => route.routeName === routeName);
                    if (selected) {
                        setSelectedRoute(selected);
                    }
                    console.log(`Selected route: ${routeName}`);
                    displayRoute(routeCoordinates, geoPointsArr);
                }}
            />
            {selectedRoute && (
                <div className="route-info">
                    <div className="first-white-background">
                        <div className="white-background" style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{formatPathName(selectedRoute.storeList)}</span>
                        </div>
                    </div>
                    <div className="white-background">
                        <span style={{ color: '#0D99FF', fontSize: '18px', fontWeight: 'bold' }}>{selectedRoute.duration}</span>
                        <span style={{ color: '#757575', fontSize: '18px', fontWeight: 'bold' }}> ({selectedRoute.distFormatted})</span>
                    </div>
                    <div className="white-background" style={{ overflowY: 'auto', maxHeight: '75vh' }}>
                        <div className="pink-background">
                            <div className="text-styling">
                                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Current Location</span>
                                <br />
                                <span style={{ color: 'grey', fontSize: '0.8em' }}>Starting your adventures!</span>
                            </div>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {selectedRoute && (
                                    // Use a for loop to iterate through selectedRoute.stepsInstr length
                                    (() => {
                                        const items = [];
                                        let storeIndex = 0; // Initialize storeIndex

                                        for (let i = 0; i < selectedRoute.stepsInstr.length; i++) {
                                            const step = selectedRoute.stepsInstr[i];

                                            items.push(
                                                <li key={i} className="step-item">
                                                    {step} 
                                                    <br />
                                                    {
                                                        selectedRoute.stepsDist[i] !== "" ? (
                                                            <span style={{ display: 'flex', alignItems: 'center', color: 'grey', fontSize: '0.8em' }}>
                                                                {selectedRoute.stepsDist[i]}
                                                                <span className="grey-line"></span>
                                                            </span>
                                                        ) : (
                                                            <div className="pink-background">
                                                                <div className="text-styling">
                                                                    <span style={{ fontSize: '18px', fontWeight: 'bold'}}>{selectedRoute.storeList[storeIndex]}</span>
                                                                    <br />
                                                                    <span style={{ color: 'grey', fontSize: '0.8em'}}>{selectedRoute.addressList[storeIndex]}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </li>
                                            );
                                            if (selectedRoute.stepsDist[i] === "") {storeIndex += 1}
                                        }
                                        return items;
                                    })()
                                )}
                            </ul>   
                    </div>
                </div>
            )}
        </div>
    );
};

export default Routing;
