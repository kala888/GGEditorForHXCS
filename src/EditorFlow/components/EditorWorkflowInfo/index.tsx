import React from 'react';
//import {Button, Dialog, Field, Form, Input} from '@alifd/next';
import {Button, Modal, Form, Input} from 'antd';
// import {withPropsAPI} from 'gg-editor';
// import {connect} from 'react-redux';

// @ts-ignore
import styles from './index.module.scss';
import Blockquote from "../EditorDetailPanel/common/blockquote";
// import {Dispatch, IRootState} from "../../../../store";
import {setWorkFlowOnlyDataObj} from '../../common/saveWorkFlow';
import _ from 'lodash';
const FormItem = Form.Item;

interface EditWorkFlowInfoProps {
  dataObj?: any
  setWorkFlow?:Function,
  setDataObj?:Function,
  flowData?:any
}

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
};

class EditWorkFlowInfos extends React.Component<EditWorkFlowInfoProps,any> {
  myRef: React.RefObject<any>;
  workOptionRef: React.RefObject<any>;
  //field = new Field(this);

  constructor(props:any) {
    super(props);
    this.myRef=React.createRef()
    this.workOptionRef=React.createRef()
    this.state = {
      editflowInfoState: false,

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
    
    this.closeFlowDlg()
    console.log(Form,"Formxxx",this.myRef.current.state.value);
    this.setState({
      dataObj:{remark:this.workOptionRef.current.state.value,name:this.myRef.current.state.value}
    },()=>{
      this.saveFlowField()
    })
    // this.editFlowInfo()
  }

  // 保存数据
  saveFlowField = () => {
    // 不可设置 此为设置节点 结构不同
    // @ts-ignore
    const {dataObj}=this.state;
    const {setDataObj,flowData}: any = this.props;
    setDataObj(dataObj)
    console.log(this.props,"编辑工作流信息");
    setWorkFlowOnlyDataObj(dataObj,flowData);
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
      dataObj
    }: any = this.state
    // let _dataObj = dataObj
    return (
      <>
        <div className={styles.editEditorName} onClick={this.editFlowInfo}>
          <div className={styles.editorName}>{dataObj.name}</div>
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
          <Form {...formItemLayout} >
            <FormItem
              label="工作流名称:"
              hasFeedback
              required
            >
              <Input
                className={styles.editInput}
                maxLength={7}
                defaultValue={dataObj.name}
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
                defaultValue={dataObj.remark}
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
//     workflowData: state.dataObj.workflowData
//   };
// };

// const mapDispatch = (dispatch: Dispatch):any => ({
//   setWorkFlow: () => dispatch.dataObj.setWorkFlow(),
// });

// const EditWorkflowInfo = withRouter(EditWorkFlowInfos as any)
// export default connect(
//   mapState,
//   mapDispatch
// )(EditWorkflowInfo);
export default EditWorkFlowInfos;
