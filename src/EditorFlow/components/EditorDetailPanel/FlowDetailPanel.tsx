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
  dataObj?:any,
  setFlowData?:Function
}

class FlowDetailPanel extends React.Component<DetailFormProps> {

  render() {
   
    
    return <DetailPanel className={styles.detailPanel}>
      {/* 选中的节点 */}
      <NodePanel>
        <DetailForm type="node" ref={(nodeRef:any) => {
          console.log('pppddd_nodeRef', nodeRef)
        }} dataObj={this.props.dataObj}  setFlowData={this.props.setFlowData}/>
      </NodePanel>
      {/* //选中的线 */}
      <EdgePanel>
        <DetailForm type="edge" ref={(edgeRef:any) => {
          console.log('pppddd_edgeRef', edgeRef)
        }} dataObj={this.props.dataObj}  setFlowData={this.props.setFlowData}/>
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
