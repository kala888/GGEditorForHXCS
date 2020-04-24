import {
  CanvasPanel, DetailPanel, EdgePanel,
  NodePanel,
} from 'gg-editor';
import React from 'react';
import DetailForm from './DetailForm';
// @ts-ignore
import styles from './index.module.scss';
import {Card} from "@alifd/next";

interface DetailFormProps {
  form?: any;
}

class FlowDetailPanel extends React.Component<DetailFormProps> {

  render() {
    return <DetailPanel className={styles.detailPanel}>
      {/* 选中的节点 */}
      <NodePanel>
        <DetailForm type="node" ref={(nodeRef:any) => {
          console.log('pppddd_nodeRef', nodeRef)
        }} />
      </NodePanel>
      {/* //选中的线 */}
      <EdgePanel>
        <DetailForm type="edge" ref={(edgeRef:any) => {
          console.log('pppddd_edgeRef', edgeRef)
        }} />
      </EdgePanel>
      <CanvasPanel>
        <Card free>
          <Card.Header title="画布属性" />
          <Card.Content>
            请选中节点
          </Card.Content>
        </Card>
      </CanvasPanel>
    </DetailPanel>
  }
}

export default FlowDetailPanel;
