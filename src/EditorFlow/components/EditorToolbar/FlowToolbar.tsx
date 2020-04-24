import {Divider} from '@alifd/next';
import React from 'react';
import {Toolbar} from 'gg-editor';
import ToolbarButton from './ToolbarButton';
// @ts-ignore
import styles from './index.module.scss';

const FlowToolbar = () => (
  <Toolbar className={styles.toolbar}>
    <ToolbarButton command="undo" />
    <ToolbarButton command="redo" />
    <Divider direction="ver" />
    <ToolbarButton command="copy" />
    <ToolbarButton command="paste" />
    <ToolbarButton command="delete" />
    <Divider direction="ver" />
    <ToolbarButton command="zoomIn" icon="zoom-in" text="Zoom In" />
    <ToolbarButton command="zoomOut" icon="zoom-out" text="Zoom Out" />
    <ToolbarButton command="autoZoom" icon="fit-map" text="Fit Map" />
    <ToolbarButton command="resetZoom" icon="actual-size" text="Actual Size" />
    <Divider direction="ver" />
    <ToolbarButton command="toBack" icon="to-back" text="To Back" />
    <ToolbarButton command="toFront" icon="to-front" text="To Front" />
  </Toolbar>
);

export default FlowToolbar;
