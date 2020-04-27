import GGEditor, {Flow} from 'gg-editor';
import {
  // Button,
  Row, Col
} from 'antd';
import React from 'react';
import EditorMinimap from './components/EditorMinimap';
import {FlowContextMenu} from './components/EditorContextMenu';
import {FlowDetailPanel} from './components/EditorDetailPanel';
import {FlowItemPanel} from './components/EditorItemPanel';
import {FlowToolbar} from './components/EditorToolbar';
// @ts-ignore
import styles from './index.module.scss';
import EditWorkFlowInfo from "./components/EditorWorkflowInfo";
import {readerWorkFlow} from './common/saveWorkFlow';
// const {Row, Col} = Grid;
GGEditor.setTrackable(false);

interface Props {
  flowData?: any
}

export default class EditorFlow extends React.Component<Props,any> {
  editorRef: any = React.createRef();


  constructor(props:any) {
    super(props);
    this.state = {
      flowData: {},
      dataObj:{},
      //数据展示
      flowDataModel:{},
    }
   
  }

  componentDidMount(): void {
    // 整理数据
    this.arrangeNodesData()
  }

  setDataObj=(dataObj)=>{
    this.setState({
      dataObj
    })
  }

  setFlowData=(flowDataModel)=>{
    this.setState({
      flowDataModel
    })
  }

  
  // 整理数据
  arrangeNodesData = () => {
    // 读取后台数据
    let workflowMockItem:any = localStorage.getItem('workflowMockItem')||{}

    // 解析前端数据
    let flowData=readerWorkFlow(workflowMockItem);

   
    this.setState({
      flowData,
      flowDataModel:flowData,
      dataObj:flowData.dataObj||{}
    })
  }

  render() {
    // const {flowData} = this.props
    //获取到了就差渲染了
    //
    // @ts-ignore

    const {flowData,dataObj,flowDataModel}: any = this.state
    console.log(flowData,"flowData",this.state.dataObj);
    
    // 流程图
    return <GGEditor className={styles.editor}>
      <Row className={styles.editorHd}>
        
          {/*工具栏*/}
          <FlowToolbar />
        
      </Row>
      <Row className={styles.editorBd}>
        {/*左侧*/}
        <Col span={4} className={styles.editorSidebar}>
          <FlowItemPanel />
        </Col>
        {/*中*/}
        <Col span={14} className={styles.editorContent}>
          {/*工作流标题设置 这里的组件不需要替换 提前备份*/}
          <EditWorkFlowInfo  setDataObj={this.setDataObj} flowData={flowDataModel} dataObj={dataObj}/>
          {/*画图*/}
          {JSON.stringify(flowData)!="{}"?
          <Flow ref={this.editorRef}
          className={styles.flow}
          // graph={{edgeDefaultShape: 'flow-smooth'}}
          // data={arrangeNodes}
          data={flowData} />
        :null}
        </Col>
        {/*右*/}
        <Col span={6} className={styles.editorSidebar}>
          {/*画布属性*/}
          <FlowDetailPanel  dataObj={this.state.dataObj}  setFlowData={this.setFlowData.bind(this)}/>
          {/*缩略图*/}
          <EditorMinimap />
        </Col>
      </Row>
      <FlowContextMenu />
    </GGEditor>
  }
}
