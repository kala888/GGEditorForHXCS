import React from 'react';
import {
  Button,
  Card, Collapse,
  Modal, Divider, Form,
   Input, Radio, Select,
  Table
  // , TimePicker
  ,Row
} from 'antd';
import {withPropsAPI} from 'gg-editor';
import TrigMode from './TRIGMODE';

import NodeTimeLimitCommon from "../common/nodeTimeLimitCommon";
import _ from 'lodash'

import {
  // XML_ImitateData,
  triggerMethodSource,
  shapeManner
} from "../../../common/flowDataSource";

// @ts-ignore
import styles from '../index.module.scss';
import CheckboxCommon from "../common/checkboxCommon";
import Blockquote from "../common/blockquote";
import SupplementaryNoteDlg from "./supplementaryNoteDlg";
import {commonJSONData,commonSave} from '../../../common/saveWorkFlow.jsx';
const Panel = Collapse.Panel;

const RadioGroup = Radio.Group;

const {Option} = Select;
// @ts-ignore

const FormItem = Form.Item;


const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span:10
  }
};



interface DetailFormProps {
  type: string;
  propsAPI?: any;
  dataObj?:any,
  setFlowData?:any
}


//第二个参数是state
class DetailForm extends React.Component<DetailFormProps,any> {
  // field = new Field(this);

  constructor(props:any){
    super(props)
  
  const {label,nodeRemark,shape,touchTypeData}=this.item.getModel()
    
    
    this.state = {
      visible: false,
      noteActionState: false,
      editNoteState: false,
      delNoteState: false,
      nodeLeaderList: [],
      expressionVisible: false,
      nodeTimeLimitValue: '',
      nodeTimeXMLData: [],
      selectedNodeIndex: null,
      activeTab: 0,
      nodeDataClose:{},
      //节点名称和备注
      nodeOptionState:{name:label||"",remark:nodeRemark||""},
      //动作名称和线型
      actionOptionState:{name:label||"",shape:shape||""},
      //节点动作弹窗刷新Key
      nextTypeDataKey:"B",
      //类型
      touchType:_.get(touchTypeData,"label","按钮触发")
    };
  }

  get item() {
    const {propsAPI} = this.props;
    return propsAPI.getSelected()[0];
  }



  // 编辑选中node节点数据
  changeNodeField = (values: any) => {
    const {propsAPI} = this.props;
    const {getSelected, executeCommand, update, save} = propsAPI;
    const item = getSelected()[0];
    // console.log(getSelected()[0]," getSelected()");
    
    if (!item) {
      return;
    }
    executeCommand(() => {
      update(item, {
        ...values,
      });
      const nodeJson = save()
      //
      
      console.log('pppddd_nodeasdfasdfJson', values, nodeJson)
    });
  }

// 编辑选中node动作数据
  changeEdgeField = (values: any) => {
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
      //
      
      console.log('pppddd_nodeasdfasdfJson', values, nodeJson)
  });
}



  // 读取数据
  readNodeField = (data: any) => {
    console.log('pppddd_xczvzxcdata', data)
    const {propsAPI} = this.props;
    const {getSelected, executeCommand, read} = propsAPI;
    const item = getSelected()[0];
    if (!item) {
      return;
    }
    executeCommand(() => {
      // let finnalData = read(XML_ImitateData);
      let finnalData = read(data);
      // update(item, {
      //   ...finnalData,
      // });
      console.log('pppddd_fasdfasdfinnalData', finnalData, data)
    });
  }

  // 保存node节点数据 保存按钮操作
  saveNodeField = () => {
    const {propsAPI,dataObj,setFlowData} = this.props;
    const {getSelected, executeCommand, save} = propsAPI;
    const item = getSelected()[0];
    if (!item) {
      return;
    }
    // 保存JSON
    executeCommand(() => {
      const nodeJson = save()
      console.log('pppddd_sss', nodeJson)
      
    });
    //
    
   
    // saveWorkFlow(item,dataObj);
    let JSONData=commonJSONData(item,dataObj);
    commonSave(JSONData);
    const newJSONData={
      ...JSONData,
      nodes:JSONData.nodes.map((item)=>{
        return !item.target
      }),
      edges:JSONData.action
    }
    delete newJSONData.action;
    setFlowData(newJSONData);
    console.log(setFlowData,JSONData,"🐕");
   
    this.onCloseSave()
  
    
  }



  onClose = (reason: any) => {
    console.log(reason, 'reason');
    this.setState({
      noteActionState: false,
      editNoteState: false,
      delNoteState: false,
    });
  };

  onCloseData = (reason: any) => {
    this.setState({
      expressionVisible: false
    })
  }

  onChange(checked: any, type: any) {
    const {touchTypeData}: any = this.state
    const _touchTypeData = touchTypeData
    console.log(`switch to `);
    // triggerMethod
    switch (type) {
      case 'triggerMethod':
        _touchTypeData.touchDataState = checked
        this.setState({
          touchTypeData: _touchTypeData
        })
        break;
      case 'buttonName':
        break;
    }
  }

  onCloseSave = () => {
    // 弹窗
    this.setState({
      noteActionState: false,
      editNoteState: false,
      delNoteState: false,
    });
  }

  makeSureToDelDlg = () => {
    return <Modal
      title="确认删除？"
      visible={this.state.delNoteState}
      onOk={this.okToDeleteNode.bind(this, 'okClick')}
      onCancel={this.onClose.bind(this, 'cancelClick')}
      >
      是否确认删除
    </Modal>
  }

  // 再次确定删除
  okToDeleteNode = () => {
    const {propsAPI} = this.props;
    const {selectedNodeIndex}: any = this.state;
    const {getSelected, executeCommand, remove, data} = propsAPI;
    const item = getSelected()[0];
    console.log('pppddd_selectedNodeIndex', getSelected(), executeCommand(), selectedNodeIndex, data, propsAPI)
    executeCommand(() => {
      remove(item)
    });
    this.setState({
      delNoteState: false,
    });
  }

  // 切换tab
  onChangeTab = (key: any) => {
    console.log('pppddd_keyxzc;l.,v.zx', key)
    this.setState({
      activeTab: key
    })
  }

  // change
  changeAction = (val: any,options:any) => {
    console.log('pppddd_val, typeasdfasdf', this.item.model,options)
    const {touchTypeData}=this.item.model;
    const {touchType}=this.state;
    this.changeNodeField({
      touchTypeData:{
        type:val,
        touchDataState:_.get(touchTypeData,'touchDataState',false),
        showText:touchType!==val?"":_.get(touchTypeData,'showText',""),
        label:options.children
      }
    })

    this.setnextTypeDataKey(val)
  }

  setnextTypeDataKey=(key:any)=>{
    this.setState({
      setnextTypeDataKey:key
    })
  }

  //修改触发方式
  changeActionChild = (value: any) => {
    console.log('pppddd_val, typeasdfasdf', this.item.model,value)
    const {touchTypeData}=this.item.model;
    this.changeNodeField({
      touchTypeData:{
        type:_.get(touchTypeData,'type','B'),
        touchDataState:_.get(touchTypeData,'touchDataState',false),
        showText:value,
        label:_.get(touchTypeData,'label','按钮触发'),
      }
    })

  }


  changeNextType=(e)=>{
    const {model}=this.item;
     const {value}=e.target;
    console.log(value,model,"modelxxxx");
    const {nextTypeData}=model;
    this.changeNodeField({
      nextTypeData:{
        nextTypeState:nextTypeData&&nextTypeData.nextTypeState||false,
        type:value,
        id:Math.round(Math.random()*100)
      }
    })

  }

  //执行人的数据处理2
  beforeActionRequirement=(value:any)=>{
    console.log(value,"beforeActionRequirement");
    this.changeNodeField({
      actionConditionData:value
    })
  }
  // 设置动作
  actionNoteDlg = () => {
    const {model}=this.item;

    const {touchTypeData}=model;
    // let _touchDataType = touchTypeData&&touchTypeData.label||"按钮触发"
    let _touchDataType = _.get(touchTypeData,"label","按钮触发")
    let _touchDataShowText = _.get(touchTypeData,"showText","")

    const list = [
      {
        value: 'N',
        label: '跳转下一节点'
      }, {
        value: 'W',
        label: '启动新流程'
      }
    ];
    console.log(this.item.model,"11111");
    
    const actionConditionData=model.actionConditionData||{
      //启用状态以后 都 用这个属性名字
      nodeTimeLimitState: false,
      // 公用组件的内部属性名尽量一致 可以最后后台交互的时候改变属性名字 外面的属性名字 一定不要一样
      nodeTimeLimit: [{
            // 此处未设置，库中俩个字段比较判断
            while: '>',
            itemId: '条件字段id信息',
            tableName: '表名',
            fieldName: '表中字段名',
            fieldNameRemark: '表中字段名汉语说明',
            value: '值信息',
            showText:"公式",
            
          }],
      //加入区分类型
      type:'action'
    }
    const {actionOptionState}=this.state;
    return <>
      <Modal
        title=""
        visible={this.state.noteActionState}
        // visible={true}
        footer={<Button  type="primary" onClick={()=>this.saveNodeField()}>保存</Button>}
        
        onCancel={this.onClose.bind(this, 'cancelClick')}
        
      >

        <div className={styles.df_nodeCon}>
          <div className={styles.df_nodeInfo}>节点动作</div>
          <div className={styles.df_nodeContent}>
            <i>动作名称：</i><Input className={styles.df_nodeName} 
            defaultValue={actionOptionState.name}  
            onChange={(e)=>{
              this.changeNodeField({
                label:e.target.value
              })
            }}
            />
          </div>
        </div>
        {/*this.onChangeTab*/}
        <div className={styles.detailform_cons}>
          <div className={styles.detailform_titleCon}>
            <Blockquote content={'触发'} />
            <CheckboxCommon />
          </div>
          <Row>
            <div style={{lineHeight:"32px"}}>触发方式：</div>
            <Select aria-label="设置触发方式" showSearch 
                    defaultValue={_touchDataType}
                    style={{width:"179px"}}
                    dropdownMatchSelectWidth
                    onChange={(val,options) => this.changeAction(val,options)} >
                      {triggerMethodSource.map((item)=>{
                        return <Option value={item.value}>{item.label}</Option>
                      })}
              </Select>
          </Row>
          <Divider dashed />
        </div>
        <TrigMode type={_.get(model,'touchTypeData.type',"")}
        changeActionChild={this.changeActionChild}  
        value={_touchDataShowText}
        setnextTypeDataKey={this.setnextTypeDataKey}
        />
        {/*动作条件*/}
        <NodeTimeLimitCommon componentTitle={"执行条件"} componentLabel={"动作条件"}
        nodeTimeLimitData={actionConditionData}
        callbackData={this.beforeActionRequirement}
        
        />
        <div className={styles.detailform_con}>
          <div className={styles.detailform_titleCon}>
            <Blockquote content={'执行动作'} />
            <CheckboxCommon />
          </div>
          <div style={{paddingBottom: '8px'}}>
            专利类型:
            <RadioGroup options={list}
                        defaultValue={model.nextTypeData&&model.nextTypeData.type}
                        onChange={(val) => {
                          this.changeNextType(val)
                        }}
            />
          </div>
          <Row>
            <div>选择新流程：</div>
            <Select
              onChange={(val) => console.log(val)}
              aria-label="选择新流程"
              showSearch>
              <Option value="下拉流程列表">下拉流程列表</Option>
            </Select>
          </Row>
          <Divider dashed />
        </div>
      </Modal>
    </>
  }
  componentDidMount(){
    console.log(this.props,"属性节点或线");
    
  }
  // 插入表达式
  insetExpression = () => {
    this.setState({
      expressionVisible: true
    })
  }

  // 移除表达式
  delExpression = () => {

  }

  // 设置节点动作
  setNoteActionData = () => {
    this.setState({
      noteActionState: true
    })
  }

  // 编辑节点数据
  editNoteData = (e:any) => {
    console.log(e,"节点其他设置");
    
    this.setState({
      editNoteState: true
    })
  }

  // 删除节点
  delNoteData = (D: any) => {
    // makeSureToDel
    this.setState({
      delNoteState: true,
      selectedNodeIndex: D
    })
  }

  // 节点编辑
  nodeAction = (E: any, D: any) => {
    console.log('pppddd_E,D', E, D)
    return <>
      <Button type="default"  onClick={this.editNoteData}>编辑</Button>
      <Button type="default"  onClick={this.setNoteActionData}>设置动作</Button>
      <Button type="primary"  onClick={() => this.delNoteData(D)}>删除</Button>
    </>
  }

  // 获取节点数据列表
  nodeAndEdgeList = () => {
    const dataSource = ():any => {
      const result: any = (this.item && this.item.itemMap && this.item.itemMap._nodes) || [];
      return result;
    };
    return <>
      <Table dataSource={dataSource()}>
        <Table.Column title="节点名称" 
        // htmlTitle="Unique Id" 
        dataIndex="model.name" />
        <Table.Column title="类型" dataIndex="model.type" />
        <Table.Column title="动作" dataIndex="未设置" />
        <Table.Column 
        // cell={this.nodeAction} 
        />
      </Table>
    </>
  }

  // type = edge
  edgeTypePannel = () => {
    const {shape = 'flow-smooth',label=""} = this.item.getModel();
    return <Panel header="设置节点动作" key={'nodeAction'}>
      <ul>
        <li>
          <FormItem
            // labelAlign={_labelAlign}
            label="动作名称:"
            hasFeedback
            // required
          >
            <Input placeholder="请输入动作名称" name="actionName" value={label} 
              onChange={(e)=>{
                const {actionOptionState}=this.state;
                this.setState({
                  actionOptionState:{...actionOptionState,name:e.target.value}
                })
                this.changeNodeField({
                    label: e.target.value
                })
               
              }}
            />
          </FormItem>
        </li>
        <li>
          <FormItem
            // labelAlign={_labelAlign}
            label="形状:"
            hasFeedback
            // required
          >
            <Select  value={shape} onChange={(val) => {
               const {actionOptionState}=this.state;
               this.setState({
                 actionOptionState:{...actionOptionState,shape:val}
               })
              this.changeNodeField({
                shape: val
              })
            }} >
              {shapeManner.map((item)=>{
                return <Option value={item.value}>{item.label}</Option>
              })}
              </Select>
          </FormItem>
        </li>
        <li>
          <Button type="primary" onClick={this.setNoteActionData}>其他动作设置</Button>
        </li>
      </ul>
    </Panel>
  }
 

  // type = node
  
  nodeTypePannel = () => {
    const {label = '', nodeRemark = ''} = this.item.getModel();
    console.log(label,"xxxxx");
    
    return  <Panel header="设置节点名称" key={'nodeAttr'}>
      <ul>
        <li>
        <FormItem
           
            label="节点名称:"
            
          >
        <Input placeholder="请输入节点名称"  value={label}  onChange={(e)=>{
          const {nodeOptionState}=this.state
          this.setState({
            nodeOptionState:{...nodeOptionState,name:e.target.value}
          })
          this.changeNodeField({
              label: e.target.value
          })
          
        }}/>
            
            </FormItem>
        </li>
        <li>
          <FormItem
         
            label="节点备注:"
         
          >
            <Input placeholder="请输入节点备注" name="nodeRemark" value={nodeRemark} onChange={(e) => {
              const {nodeOptionState}=this.state
              this.setState({
                nodeOptionState:{...nodeOptionState,remark:e.target.value}
              })
              this.changeNodeField({
                  nodeRemark: e.target.value
              })
            }} />
          </FormItem>
        </li>
        <li>
          <Button type="primary"  onClick={this.editNoteData} >节点其他设置</Button>
        </li>
      </ul>
    </Panel>
  }

  // 基本面板
  basicPanel = () => {
    const {type} = this.props;
    console.log(type);
    
    return <Form {...formItemLayout}>
      <Collapse 
      bordered={false}
      defaultActiveKey={['nodeAttr', 'nodeAction']}
      >
        {type === 'node' && this.nodeTypePannel()}
        {type === 'edge' && this.edgeTypePannel()}
      </Collapse>
    </Form>
  }

  render() {
    const {type} = this.props;
    const {editNoteState} = this.state
 
    
    if (!this.item) {
      return null;
    }
    return (
      <Card  bodyStyle={{padding:0}} >
        <Card title={type === 'node' ? '节点设置' : '流程线设置'}
        headStyle={{padding:0}}  bordered={false} bodyStyle={{padding:0}}
       >
         
          {this.basicPanel()}
         
          {/*获取节点数据列表*/}
          {/*{this.nodeAndEdgeList()}*/}
          {/*设置节点弹窗*/}
          {/*{this.supplementaryNoteDlg()}*/}
          {editNoteState
          ?
          <SupplementaryNoteDlg changeNodeField={this.changeNodeField}
          nodeOptionState={this.state.nodeOptionState}
          dataObj={this.props.dataObj}
          setFlowData={this.props.setFlowData}
          visible={editNoteState} closeVisible={() => {
            this.setState({
              editNoteState: false
            })
          }} />:null}
          {/*设置动作弹窗*/}
          <div key={this.state.nextTypeDataKey}>
            {this.actionNoteDlg()}
          </div>
          {/*确定删除弹窗*/}
          {this.makeSureToDelDlg()}
        </Card>
      </Card>
    );
  }
}
//@ts-ignore
export default withPropsAPI(DetailForm);
