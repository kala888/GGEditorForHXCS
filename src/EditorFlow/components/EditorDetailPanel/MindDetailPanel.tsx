import { CanvasPanel, DetailPanel, NodePanel } from 'gg-editor';
import {Card} from '@alifd/next';

import React from 'react';
import DetailForm from './DetailForm';
// @ts-ignore
import styles from './index.module.scss';

const MindDetailPanel = () => (
  <DetailPanel className={styles.detailPanel}>
    {/* //右侧设置 */}
    <NodePanel>
      <DetailForm type="node" />
    </NodePanel>
    {/* 中间画布 */}
    <CanvasPanel>
      <Card free>
        <Card.Header title="Canvas"/>
        <Card.Content>
        </Card.Content>
      </Card>
    </CanvasPanel>
  </DetailPanel>
);

export default MindDetailPanel;
