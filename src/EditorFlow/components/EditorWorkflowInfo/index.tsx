import React from 'react';
//import {Button, Dialog, Field, Form, Input} from '@alifd/next';
import {Button, Modal, Form, Input} from 'antd';
// import {withPropsAPI} from 'gg-editor';
// import {connect} from 'react-redux';
// @ts-ignore
import styles from './index.module.scss';
import Blockquote from "../EditorDetailPanel/common/blockquote";
// import {Dispatch, IRootState} from "../../../../store";
// import {withRouter} from "react-router";
import _ from 'lodash';
const FormItem = Form.Item;

interface EditWorkFlowInfoProps {
  dataObj?: any
  setWorkFlow?:Function
}

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
};

class EditWorkFlowInfos extends React.Component<EditWorkFlowInfoProps> {
  myRef: React.RefObject<any>;
  workOptionRef: React.RefObject<any>;
  //field = new Field(this);

  constructor(props:any) {
    super(props);
    this.myRef=React.createRef()
    this.workOptionRef=React.createRef()
    this.state = {
      editflowInfoState: false,
      workFlow:{
        name:"",
        remark:"",
      },
      dataObj: props.dataObj || {
        name: '工作流名称',
        remark: '',
      }
    }
  }

  componentDidMount(): void {

  }
  //Readonly<EditWorkFlowInfoProps>
  componentWillReceiveProps(nextProps:any , nextContext: any): void {
    if (nextProps.dataObj !== this.props.dataObj) {
      this.setState({
        dataObj: nextProps.dataObj
      })
    }
  }

  componentWillUnmount(): void {

  }

  // 设置弹窗
  editFlowInfo = () => {
    this.setState({
      editflowInfoState: true
    })
  }

  // 保存
  saveChange = () => {
    this.saveFlowField()
    this.closeFlowDlg()
    const {workFlow}:any=this.state;
    console.log(Form,"Formxxx",this.myRef.current.state.value);
    this.setState({
      workFlow:{...workFlow,name:this.myRef.current.state.value}
    })
    // this.editFlowInfo()
  }

  // 保存数据
  saveFlowField = () => {
    // 不可设置 此为设置节点 结构不同
    // @ts-ignore
    const {propsAPI}: any = this.props;


   // this.props.setWorkFlow&&this.props.setWorkFlow(_.get(this.field.values,""))

    //console.log('pppddd_propsAPI', propsAPI, this.field, this.props, this.field.values, this.props.workflowData)
    // const {dataObj}: any = this.state;
    // const {getSelected, executeCommand, update, save} = propsAPI;
    // const item = getSelected()[0];
    // if (!item) {
    //   return;
    // }
    // // let _flowInfo = this.item.model.dataObj || {
    // //   name: '工作流名称',
    // //   remark: '',
    // // }
    // let _values = {
    //   dataObj: dataObj
    // }
    // executeCommand(() => {
    //   update(item, {
    //     ..._values,
    //   });
    //   const nodeJson = save()
    //   console.log('pppddd_nodeasdfasdfJson', nodeJson)
    // });
  }

  // 关闭弹窗
  closeFlowDlg = () => {
    this.setState({
      editflowInfoState: false
    })
  }
  workFlowOption(e:any){
    console.log(e,"e");
    
  }
  render() {
    const {
      editflowInfoState,
      // dataObj
      workFlow
    }: any = this.state
    // let _dataObj = dataObj
    return (
      <>
        <div className={styles.editEditorName} onClick={this.editFlowInfo}>
          <div className={styles.editorName}>{workFlow.name}</div>
          <Button type="primary" >编辑</Button>
          <div className={styles.editBbottom} />
        </div>
        <Modal
          footer={<Button  type="primary" onClick={this.saveChange}>保存</Button>}
          visible={editflowInfoState}
          onCancel={this.closeFlowDlg}
          onOk={this.closeFlowDlg}>
          <div className={styles.ewf_block}>
            <Blockquote content={'编辑工作流信息'} />
          </div>
          <Form {...formItemLayout}  initialValues={{name:workFlow.name,remark:workFlow.remark}}>
            <FormItem
              label="工作流名称:"
              hasFeedback
              required
            >
              <Input
                className={styles.editInput}
                maxLength={7}
               
                placeholder="请输入工作流名称"
                // hasLimitHint
                // cutString={false}
                aria-label="长度不能超过10"
                name={'name'}
                ref={this.myRef}
                // onKeyDown={(e, opts) => {
                //   console.log('onKeyDown', opts);
                // }}
              />
            </FormItem>
            <br />
            <FormItem
              label="工作流说明:"
              hasFeedback
              required
            >
              <Input.TextArea
                className={styles.editInput}
                placeholder="请输入工作流说明"
                rows={4}
                // hasLimitHint
                ref={this.workOptionRef}
                name={'remark'}
               
              />
              <br /><br />
            </FormItem>
          </Form>
        </Modal>
      </>
    );
  }
};

// const mapState = (state: IRootState) => {
//   return {
//     workflowData: state.workFlow.workflowData
//   };
// };

// const mapDispatch = (dispatch: Dispatch):any => ({
//   setWorkFlow: () => dispatch.workFlow.setWorkFlow(),
// });

// const EditWorkflowInfo = withRouter(EditWorkFlowInfos as any)
// export default connect(
//   mapState,
//   mapDispatch
// )(EditWorkflowInfo);
export default EditWorkFlowInfos;
