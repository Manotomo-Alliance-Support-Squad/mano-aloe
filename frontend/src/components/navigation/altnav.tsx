import React from 'react';
import { useLocation } from 'react-router-dom';
import InPageNav from '../../components/inPageNav/inPageNav';
import {GitHub} from "@material-ui/icons";

export const creditsNav = [                                                                                                         
    {
        link: 'https://github.com/Manotomo-Alliance-Support-Squad/coco-grad',
        buttonContent: "GitHub",
        page: "",                                                                                                            
        startIcon: <GitHub/>
    },                                                                                                                       
];

export default function AltNav() {
    const location = useLocation();                                                                                          
    if (location.pathname === "/home") {                                                                                      
        return <InPageNav navButtons={creditsNav}/>;                                                                         
    }                                                                                                                        
    return <span/>
}
