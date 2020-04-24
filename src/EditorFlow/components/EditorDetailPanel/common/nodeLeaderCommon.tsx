import React from 'react';
// import {Button, Dialog, Divider, List} from '@alifd/next';
import {Button, Modal, Divider, List} from 'antd';
// import CheckboxCommon from "./checkboxCommon";
import Blockquote from "./blockquote";

// @ts-ignore
import styles from './index.module.scss';

interface NodeLeaderProps {
  model?: any,
  callbackData?: any,
  nodeTitle?: any,
}

class NodeLeaderCommon extends React.Component<NodeLeaderProps,any> {
  constructor(props:any) {
    super(props);
    console.log(props.model,"nodeLeaderData负责人",this.props);
    
    this.state = {
      fullDepartmentVisible: false,
      departmentHeadVisible: false,
      specifiedUserVisible: false,
      roleVisible: false,
      nodeLeaderData: props.model||[],
      
    }
  }

  // componentWillReceiveProps(nextProps: Readonly<NodeLeaderProps>, nextContext: any): void {
  //   if (nextProps.nodeLeaderData !== this.props.nodeLeaderData) {
  //     this.setState({
  //       nodeLeaderData: nextProps.nodeLeaderData
  //     })
  //   }
  // }

  // 部门全员
  addFullDepartmentDlg = () => {
    this.setState({
      fullDepartmentVisible: true
    })
  }

  // 部门负责人
  addDepartmentHeadDlg = () => {
    this.setState({
      departmentHeadVisible: true
    })
  }

  // 指定用户
  addSpecifiedUserDlg = () => {
    this.setState({
      specifiedUserVisible: true
    })
  }

  // 角色
  addRoleDlg = () => {
    this.setState({
      roleVisible: true
    })
  }

  changeNoteLeaderDataCb = (val:any) => {
    const {callbackData} = this.props
    this.setState({
      nodeLeaderData: val
    }, () => {
      callbackData && callbackData(val)
    })
  }

  // 删除节点负责人
  delNoteLeaderData = (index:any) => {
    const {nodeLeaderData}: any = this.state
    const _nodeLeaderData = nodeLeaderData
    _nodeLeaderData.splice(index, 1)
    this.changeNoteLeaderDataCb(_nodeLeaderData)
  }

  // 开关
  onChange(checked:any) {
    const {nodeLeaderData}: any = this.state
    const _nodeLeaderData = nodeLeaderData
    _nodeLeaderData.nodeLeaderState = checked
    this.changeNoteLeaderDataCb(_nodeLeaderData)
  }

  // 关闭弹窗
  onCloseData = () => {
    this.setState({
      fullDepartmentVisible: false,
      departmentHeadVisible: false,
      specifiedUserVisible: false,
      roleVisible: false,
      expressionVisible: false
    })
  }

  addNodeLeader = (type:any) => {
    const {nodeLeaderData}: any = this.state
    const _nodeLeaderData: any =nodeLeaderData
    console.log(_nodeLeaderData,"_nodeLeaderData");
    
    // nodeLeader
    switch (type) {
      case 'fullDepartment':
        _nodeLeaderData.push({
          name: 'fullDepartment',
          label: 'fullDepartment部门全员',
          type:"BA",
        })
        break;
      case 'departmentHead':
        _nodeLeaderData.push({
          name: 'departmentHead',
          label: 'departmentHead部门负责人',
          type:"BF"
        })
        break;
      case 'specifiedUser':
        _nodeLeaderData.push({
          name: 'specifiedUser',
          label: 'specifiedUser指定用户',
          type: 'YH',
        })
        break;
      case 'role':
        _nodeLeaderData.push({
          name: 'role',
          label: 'role角色',
          type: 'JS',
        })
        break;
    }
    this.changeNoteLeaderDataCb(_nodeLeaderData)
  }

  // 部门全员
  fullDepartmentDlg = () => {
    const {fullDepartmentVisible}: any = this.state
    return <>
      <Modal
        title=""
        visible={fullDepartmentVisible}
        onOk={this.onCloseData.bind(this, 'fullDepartment')}
        onCancel={this.onCloseData.bind(this, 'cancelClick')}
        >
        部门全员
        <List size="small" header={<div>Notifications</div>}>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('fullDepartment')}>List Item
            1</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('fullDepartment')}>List Item
            2</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('fullDepartment')}>List Item
            3</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('fullDepartment')}>List Item
            4</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('fullDepartment')}>List Item
            5</List.Item>
        </List>
      </Modal>
    </>
  }

  // 部门负责人
  departmentHeadDlg = () => {
    const {departmentHeadVisible}: any = this.state
    return <>
      <Modal
        title=""
        visible={departmentHeadVisible}
        onOk={this.onCloseData.bind(this, 'departmentHead')}
        onCancel={this.onCloseData.bind(this, 'cancelClick')}
        >
        部门负责人
        <List size="small" header={<div>Notifications</div>}>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('departmentHead')}>List Item
            1</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('departmentHead')}>List Item
            2</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('departmentHead')}>List Item
            3</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('departmentHead')}>List Item
            4</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('departmentHead')}>List Item
            5</List.Item>
        </List>
      </Modal>
    </>
  }

  // 指定用户
  specifiedUserDlg = () => {
    const {specifiedUserVisible}: any = this.state
    return <>
      <Modal
        title=""
        visible={specifiedUserVisible}
        onOk={this.onCloseData.bind(this, 'specifiedUser')}
        onCancel={this.onCloseData.bind(this, 'cancelClick')}
        >
        指定用户
        <List size="small" header={<div>Notifications</div>}>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('specifiedUser')}>List Item
            1</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('specifiedUser')}>List Item
            2</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('specifiedUser')}>List Item
            3</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('specifiedUser')}>List Item
            4</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('specifiedUser')}>List Item
            5</List.Item>
        </List>
      </Modal>
    </>
  }

  // 角色
  roleDlg = () => {
    const {roleVisible}: any = this.state
    return <>
      <Modal
        title=""
        visible={roleVisible}
        onOk={this.onCloseData.bind(this, 'role')}
        onCancel={this.onCloseData.bind(this, 'cancelClick')}
      
      >
        角色
        <List size="small" header={<div>Notifications</div>}>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('role')}>List Item
            1</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('role')}>List Item
            2</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('role')}>List Item
            3</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('role')}>List Item
            4</List.Item>
          <List.Item extra={'$20'} title="Title" onClick={() => this.addNodeLeader('role')}>List Item
            5</List.Item>
        </List>
      </Modal>
    </>
  }

  render() {
    const nodeLeaderData =JSON.stringify(this.state.nodeLeaderData)==="{}"?this.props.model:
    this.state.nodeLeaderData;
    const {nodeTitle} = this.props
    console.log('fasdfpppddd_nodeLeaderData', nodeLeaderData)
    return (
      <>
        <div className={styles.nlc_content}>
          <div className={styles.nlc_titleCon}>
            <Blockquote content={nodeTitle} />
            {/* <CheckboxCommon /> */}
          </div>
          {nodeLeaderData && nodeLeaderData.length > 0 ? <List size="small">
            {nodeLeaderData.map((item: any, index:any) => {
              return <List.Item extra={<Button    onClick={() => {
                this.delNoteLeaderData(index)
              }}>移除</Button>}>Title{item.label}</List.Item>
            })}
          </List> : null}
          <div>
            <Button style={{margin: '0 8px'}}  onClick={this.addFullDepartmentDlg}>+部门全员</Button>
            <Button style={{margin: '0 8px'}}  onClick={this.addDepartmentHeadDlg}>+部门负责人</Button>
            <Button style={{margin: '0 8px'}}  onClick={this.addSpecifiedUserDlg}>+指定用户</Button>
            <Button style={{margin: '0 8px'}}  onClick={this.addRoleDlg}>+角色</Button>
          </div>
          <Divider dashed />
        </div>

        {/*部门全员弹窗*/}
        {this.fullDepartmentDlg()}
        {/*部门负责人弹窗*/}
        {this.departmentHeadDlg()}
        {/*指定用户弹窗*/}
        {this.specifiedUserDlg()}
        {/*角色弹窗*/}
        {this.roleDlg()}
      </>
    );
  }
};

export default NodeLeaderCommon;
