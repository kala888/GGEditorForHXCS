import React from 'react';
// import {
//   Input,
//   // Tag, Button
// } from '@alifd/next';
import {Row,Col,Input,Button} from 'antd';
import FieldModification from "./fieldModificationTs";
import CheckboxCommon from "./checkboxCommon";
import Blockquote from "./blockquote";
// @ts-ignore
import styles from './index.module.scss';

//引用位置
//src\components\EditorFlow\components\EditorDetailPanel\DetailForm\supplementaryNoteDlg.tsx
//src\components\EditorFlow\components\EditorDetailPanel\DetailForm\index.tsx
interface TemplateProps {
  nodeTimeLimitData?: any,
  callbackData?: any,
  componentTitle?:string,
  componentLabel?:string,

}
//节点时限 和 执行条件 公用组件 
// 有时间还可以拆分 更小的组件 
class NodeTimeLimitCommon extends React.Component<TemplateProps,any> {
  TimeBoxRef: React.RefObject<any>;
 
  
 
 
  constructor(props:any) {
    
    super(props);
    console.log(props,"propsnodeTimeLimitData");
    this.state = {
      nodeTimeLimitData: props.nodeTimeLimitData||{},
      domTree:[{key:0}]
    }
    this.TimeBoxRef=React.createRef()
    this.addDomTree=this.addDomTree.bind(this);
    this.beforeFieldModification=this.beforeFieldModification.bind(this);
  }
  //添加form
  addDomTree(){
    const {nodeTimeLimitState,nodeTimeLimit,type}=this.state.nodeTimeLimitData;
    console.log(nodeTimeLimit,"nodeTimeLimit");
    
    this.setState({
      nodeTimeLimitData:{
        nodeTimeLimitState,
        nodeTimeLimit:[...nodeTimeLimit,{showText:""}],
        type
      }
    },()=>{
    console.log(this.state.nodeTimeLimitData.nodeTimeLimit,"laternodeTimeLimit");

    })
  }
  //只有执行条件 才会走 流程线 执行人
  delDomTree(key:any){
    const {nodeTimeLimitState,nodeTimeLimit,type}=this.state.nodeTimeLimitData;

    if(nodeTimeLimit.length>1){
        const tempNodeTimeLimit=nodeTimeLimit;
        nodeTimeLimit.map((item:any,index:any)=>{
          
          if(index===key){
            tempNodeTimeLimit.splice(index,1)

          }
        })
        console.log(nodeTimeLimitState,type,tempNodeTimeLimit);
        
        this.setState({
          nodeTimeLimitData:{
            nodeTimeLimitState,
            type,
            nodeTimeLimit:tempNodeTimeLimit
          }
        })
    }
  }

  componentWillReceiveProps(nextProps: Readonly<TemplateProps>, nextContext: any): void {
    if (nextProps.nodeTimeLimitData !== this.props.nodeTimeLimitData) {
      this.setState({
        nodeTimeLimitData: nextProps.nodeTimeLimitData
      })
    }
  }
  //节点时限前面的处理
  beforeChangeNoteTimeLimitDataCb=(selectedItems:any)=>{
    const {nodeTimeLimitData}: any = this.state
    const nodeCurrent={
      ...nodeTimeLimitData,
      nodeTimeLimitState:selectedItems
    }
    console.log('onChange callback', selectedItems,nodeTimeLimitData);
    this.changeNoteTimeLimitDataCb(nodeCurrent)
  }

  changeNoteTimeLimitDataCb = (val:any) => {
    const {callbackData} = this.props
    this.setState({
      nodeTimeLimitData: val
    }, () => {
      callbackData && callbackData(val)
    })
  }
 
  //插入表达式 选择表达式 节点时限 和执行人
  beforeFieldModification=(value:any,key:any)=>{
    const {nodeTimeLimitData}=this.state;
    console.log(value,key,"999xxxx",nodeTimeLimitData);
    if(nodeTimeLimitData.type){
      //执行人操作
      console.log(value,key,"999");
      nodeTimeLimitData.nodeTimeLimit.map((item:any,index:any)=>{
        if(index===key){
          item.showText=value;
        }
        return item;
      })
      this.setState({
        nodeTimeLimitData
      })
      // 重构设这个对象
      // const actionConditionData={actionConditionState:false,actionCondition:[]};
      // actionConditionData.actionConditionState=nodeTimeLimitData.nodeTimeLimitState;
      // actionConditionData.actionCondition=nodeTimeLimitData.nodeTimeLimit;
      //最后保存这个克拉斯
      const {callbackData}=this.props;
      callbackData && callbackData(nodeTimeLimitData);
    }else{
      console.log(value,"valueXXXXXXXX");
      let _fieldValues = {
        nodeTimeLimitState:true,
        nodeTimeLimit:[{
          while:value,
          itemId: '条件字段id信息',
          tableName: '表名',
          fieldName: '表中字段名',
          fieldNameRemark: '表中字段名汉语说明',
          value: '',//值（小时）信息
        }],
        showText:value
      }
      this.changeNoteTimeLimitDataCb(_fieldValues)
    }
  }

  //
  onChange(checked:any) {
    const {nodeTimeLimitData}: any = this.state
    const _nodeTimeLimitData = nodeTimeLimitData
    _nodeTimeLimitData.nodeTimeLimitState = checked
    this.changeNoteTimeLimitDataCb(_nodeTimeLimitData)
  }

  //这个是执行人的数据
  changeactionCondition=(value:any,key:any)=>{
    //先走这个吧
    this.beforeFieldModification(value,key)
  }

  render() {
    const nodeTimeLimitData=JSON.stringify(this.state.nodeTimeLimitData)==="{}"?this.props.nodeTimeLimitData
    :this.state.nodeTimeLimitData
  
    const {nodeTimeLimit}=nodeTimeLimitData;

    const H6Text = (<span>{this.props.componentLabel||"节点时间"}:</span>);
    console.log('pppddd_asdfasdf',nodeTimeLimitData)
    return (
      <div>
        <div className={styles.nlc_titleCon} style={{padding:"0 16px"}}>
          <Blockquote content={this.props.componentTitle||'节点时限'} />
          {/* //@ts-ignore */}
          <CheckboxCommon value={nodeTimeLimitData.nodeTimeLimitState}
              key={"nodeTimeLimitDataBox"}
              fieldValueCb={
                this.beforeChangeNoteTimeLimitDataCb
              }
              
              
              />
        </div>
        {
          nodeTimeLimit.map((item:any,index:any)=>{
            console.log(index,"index");
            
          return(
           <div role="grid" key={index}>
            <Row>
              <Col span={4} style={{textAlign:"center",lineHeight:"32px"}}>{H6Text}</Col>
              <Col span={this.props.componentLabel?9:13}>
                {this.props.componentLabel?
                <Input  aria-label="请输入"
                      value={item.showText}
                      // @ts-ignore
                      onChange={(e) => {
                        const {value}=e.target;
                        this.changeactionCondition(value,index)
                        return false
                      }
                      }

                />
                :
                <Input  aria-label="请输入"
                      value={nodeTimeLimitData.showText}
                      // @ts-ignore
                      onChange={(e) => {
                            //获取的节点时限表达式 解构赋值
                        const {nodeTimeLimit}=nodeTimeLimitData;
                        const {value}=e.target;
                        this.setState({
                          nodeTimeLimitData:{...nodeTimeLimitData,showText:value}
                        })
                        if(nodeTimeLimit){
                          const str=nodeTimeLimit.while;
                          const Index=value.indexOf(str)
                          if(Index!=-1){
                          
                            var strArr=value.split(str);
                            // console.log(value,"value+++++",value.substring(Index),Index);
                            
                            this.changeNoteTimeLimitDataCb({
                              nodeTimeLimitState:nodeTimeLimitData.nodeTimeLimitState,
                              nodeTimeLimit:{...nodeTimeLimitData.nodeTimeLimit,
                              value:strArr[Index>1?0:1]
                            },showText:value
                          })
                          }

                        }
                        return false
                      }
                      }

                />
              }
              </Col>
              <Col span={6} offset={1}>
                <FieldModification
                  fieldValueCb={this.beforeFieldModification}
                  IndexKey={index}
                />
              </Col>
              {
                this.props.componentLabel?
                <Col span={4}>
                  <Button danger onClick={()=>this.delDomTree(index)}>删除</Button>
                </Col>:null
              }
            </Row>
          </div>
                        
            )
          })
        }
        {
           this.props.componentLabel?
           <div style={{padding:"0 16px"}}>
             <Button type="primary" onClick={this.addDomTree}>添加</Button>
           </div>:
           null
        }
      </div>
    );
  }
};

export default NodeTimeLimitCommon;
