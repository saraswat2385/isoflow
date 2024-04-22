import React from 'react';
import Isoflow from 'src/Isoflow';
import { initialData } from '../initialData';

export const PresentationEditor = () => {
 return (<Isoflow initialData={{ ...initialData, fitToView: true }} editorMode="PRESENTATION" showGrid={false}/>);
};
