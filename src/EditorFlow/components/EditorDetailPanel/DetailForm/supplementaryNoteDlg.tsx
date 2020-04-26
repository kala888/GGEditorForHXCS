import React from 'react';
//import {Button, Dialog, Field, Form, Input} from '@alifd/next';
import {Button, Modal, Form, Input} from 'antd';
import NodeLeaderCommon from "../common/nodeLeaderCommon";
import NodeTimeLimitCommon from "../common/nodeTimeLimitCommon";
import InsertExpressionCommon from "../common/insertExpressionCommon";
import {withPropsAPI} from 'gg-editor';

// @ts-ignore
import styles from '../index.module.scss';
// import {
//   saveXML
// } from "../../saveXML";
// //src\components\EditorFlow\common\flowDataSource\index.ts
// import { XMLDataJson } from '../../../../EditorFlow/common/flowDataSource';

import saveWorkFlow from '../../../common/saveWorkFlow.jsx';
interface SupplementaryNoteDlgProps {
  closeVisible?: () => void,
  visible: boolean,
  propsAPI?: any,
  nodeOptionState?:any
}

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

class SupplementaryNoteDlg extends React.Component<SupplementaryNoteDlgProps> {

  // field = new Field(this);

  constructor(props:any) {
    super(props);
  
  }

  componentDidMount(): void {
    console.log(this.props,"来啊");
    
  }

  componentWillReceiveProps(nextProps: Readonly<SupplementaryNoteDlgProps>, nextContext: any): void {

  }

  componentWillUnmount(): void {

  }

  get item() {
    const {propsAPI} = this.props;
    return propsAPI.getSelected()[0];
  }

  // 编辑选中node节点数据
  changeNodeField = (values:any) => {
    const {propsAPI} = this.props;
    const {getSelected, executeCommand, update, save} = propsAPI;
    const item = getSelected()[0];
    if (!item) {
      return;
    }
    executeCommand(() => {
      update(item, {
        ...values,
      });
      const nodeJson = save()
      console.log('pppddd_nodeasdfasdfJson', values, nodeJson)

    });
  }

  onCloseSave = (e:any) => {
    
    const {propsAPI} = this.props;
    const {getSelected} = propsAPI;
    const item = getSelected()[0];
    const {closeVisible} = this.props
    //设置格式 并储存
    saveWorkFlow(item);
    // 弹窗
    closeVisible&&closeVisible()
  }
  changeNodeName(e:any){
    console.log(e.target.value,"name");  
   // this.field.setValue('name',e);
  }
  changeNodeRemark(){
    //this.field.setValue('remark',e);
  }
  render() {
    console.log('pppddd_thisasdfasdf.item', this.item,this.props)
    // 默认节点负责人数据
    const _nodeLeaderData:any = []
    // 默认节点时限数据
    const _nodeTimeLimitData = {
      nodeTimeLimitState: false,
      nodeTimeLimit: [{}],
      showText:""
    }
    // 默认节点时限数据
    const _fieldModificationData = {
      nodeTimeLimitState: false,
      fieldModification: [],
      showText:""
    }

    
    const {visible, closeVisible,nodeOptionState} = this.props

    // this.item.itemMap
    return <>
      <Modal
        title=""
        visible={visible}

        footer={<Button type="primary" onClick={this.onCloseSave}>保存</Button>}
        onOk={closeVisible}
        onCancel={closeVisible}
        >
        {/*节点信息*/}
        {/*<Tab onChange={this.onChangeTab}>*/}
        {/*  <Tab.Item title="节点设置" key={0}>*/}
        {/*节点负责人*/}
        <Form {...formItemLayout}>
          <div className={styles.df_nodeCon}>
            <div className={styles.df_nodeInfo}>节点信息</div>
            <div className={styles.df_nodeContent}>
              <i>节点名称：</i><Input className={styles.df_nodeName} onChange={(e)=>this.changeNodeName(e)} readOnly 
              defaultValue={nodeOptionState.name}
              />
            </div>
            <div className={styles.df_nodeContent}>
              <i>节点备注：</i><Input className={styles.df_nodeName} onChange={(e)=>this.changeNodeRemark()} readOnly
              defaultValue={nodeOptionState.remark}
              />
            </div>
          </div>

          <div className={styles.df_nodeHei6} />
          {/*节点设置*/}
          <div className={styles.df_nodeSettings}>
            <div className={styles.df_nodeInfo}>节点设置</div>
            <NodeLeaderCommon
              nodeTitle={'节点负责人'} 
              model={(this.item && this.item.model.nodeLeaderData) || _nodeLeaderData}
              callbackData={(data:any) => {
                // 修改选中的data数据
                console.log('pppddd_datadataasdfasdf', data)
                this.changeNodeField({
                  nodeLeaderData: data
                })
              }}
            />
            {/*节点时限*/}
            <NodeTimeLimitCommon
              nodeTimeLimitData={(this.item && this.item.model.nodeTimeLimitData) || _nodeTimeLimitData}
              callbackData={(data:any) => {
                this.changeNodeField({
                  nodeTimeLimitData: data
                })
              }}
         
            />
          </div>
          <div className={styles.df_nodeHei6} />
          {/*</Tab.Item>*/}
          {/*<Tab.Item title="自动功能" key={1}>*/}
          {/*自动执行*/}
          {/*字段修改*/}
          <div>
            <div className={styles.df_nodeInfo}>自动执行</div>
            <InsertExpressionCommon
              fieldModificationData={(this.item && this.item.model.fieldModificationData) || _fieldModificationData}
              callbackData={(data:any) => {
                this.changeNodeField({
                  fieldModificationData: data
                })
              }}
            />
            <NodeLeaderCommon
              nodeTitle={'通知'}
              model={(this.item && this.item.model.notificationInformationData && this.item.model.notificationInformationData.infoData) || _nodeLeaderData}
              callbackData={(data:any) => {
                // 修改选中的data数据
                this.changeNodeField({
                  notificationInformationData:{
                    type:"EMALL",
                    infoData:data
                  }
                })
              }}
            />
          </div>
        </Form>
        {/*  </Tab.Item>*/}
        {/*</Tab>*/}
      </Modal>
    </>
  }
};

export default withPropsAPI(SupplementaryNoteDlg as any);
