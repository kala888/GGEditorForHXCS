import React from 'react';
import {
  Button,
  // Dialog,
  Divider, Row, Col, Input
} from 'antd';
// import FieldModification from "./fieldModification";
import CheckboxCommon from "./checkboxCommon";
import Blockquote from "./blockquote";
// @ts-ignore
import styles from './index.module.scss';

// const {Row, Col} = Grid;

interface TemplateProps {
  fieldModificationData?: any,
  callbackData?: any,
}

class InsertExpressionCommon extends React.Component<TemplateProps> {
  isActiveEdit: any = null

  constructor(props:any) {
    super(props);
    this.state = {
      fieldModificationData: props.fieldModificationData,
    }
    this.beforeCallBack=this.beforeCallBack.bind(this)
  }

  componentWillReceiveProps(nextProps: Readonly<TemplateProps>, nextContext: any): void {
    
    
    if (nextProps.fieldModificationData !== this.props.fieldModificationData) {
      this.setState({
        fieldModificationData: nextProps.fieldModificationData
      })
    }
   
    
  }
 
  onChange() {
    console.log(`switch to `);
  }

  // 移除表达式
  delExpression = (item:any, index:any) => {
    console.log('pppddd_DATA,I', item, index)
    const {fieldModificationData}: any = this.state
    const _fieldModificationData = fieldModificationData
    _fieldModificationData.fieldModification.splice(index, 1)
    this.setState({
      fieldModificationData: _fieldModificationData
    })
  }

  addNewCondition = () => {
    const {fieldModificationData}: any = this.state
    let _fieldModificationData: any = fieldModificationData
    console.log(_fieldModificationData,"_fieldModificationData");
    
    _fieldModificationData.fieldModification.push({})
    this.setState({
      fieldModificationData: _fieldModificationData
    })
  }
  beforeCallBack(value:any){
    const {fieldModificationData}: any = this.state
    let tempData={fieldModificationState:value,...fieldModificationData}
    this.setState({
      fieldModificationData:tempData
    })
    const {callbackData}=this.props;
    callbackData&&callbackData(tempData)
  }
  render() {
    const {fieldModificationData}: any = this.state
    const {callbackData}=this.props;
    callbackData&&callbackData(fieldModificationData)
    console.log(fieldModificationData,"fieldModificationData");
    //item.fieldName 被修改左面修改的数据
    //item.value     修改  右面要修改内容
    return (
      <div className={styles.isec_con}>
        <div className={styles.nlc_titleCon}>
          <Blockquote content={'修改字段数据'} />
          <CheckboxCommon 
          value={fieldModificationData&&fieldModificationData.fieldModificationState||false}
             fieldValueCb={this.beforeCallBack} 
          />
        </div>
        {fieldModificationData && fieldModificationData.fieldModification && fieldModificationData.fieldModification.length > 0 ?
          <div role="grid">
            {fieldModificationData.fieldModification.map((item: any, index:any) => {
              return <Row>
                <Col><Input aria-label="please input"
                            value={item.fieldName}
                            onChange={(value:any) => {
                              // this.state.nodeTimeXMLData.push({
                              //   // express: '业务数据>立案时间',
                              //   // lebel: '~businessData~',
                              //   value: value
                              // })
                              item.fieldName = value
                              this.forceUpdate()
                            }}
                            onBlur={() => {
                              this.isActiveEdit = 'fieldName'
                              this.forceUpdate()
                            }}
                /></Col>
                <Col>=</Col>
                <Col><Input aria-label="please input"
                            value={item.value}
                            onChange={(value:any) => {
                              item.value = value
                              this.forceUpdate()
                            }}
                            onBlur={() => {
                              this.isActiveEdit = 'value'
                              this.forceUpdate()
                            }}

                /></Col>
                {/* <Col>
                  <FieldModification
                    isActiveEdit={this.isActiveEdit}
                    fieldValueCb={(data: any) => {
                      if (this.isActiveEdit === 'fieldName') {
                        item.nodeTimeXMLDataO = data.nodeTimeXMLData
                        item.fieldName = data.nodeTimeLimitValue
                        this.forceUpdate()
                      } else if (this.isActiveEdit === 'nodeTimeLimitValueT') {
                        item.nodeTimeXMLDataT = data.nodeTimeXMLData
                        item.nodeTimeLimitValueT = data.nodeTimeLimitValue
                        this.forceUpdate()
                      }
                    }}
                  />
                </Col> */}
                <Col>
                  <Button type="danger" onClick={() => this.delExpression(item, index)}>移除</Button>
                </Col>
              </Row>
            })}
          </div>
          : null
        }
        <Button type="primary" onClick={this.addNewCondition}>添加新条件</Button>
        <Divider dashed />
      </div>
    );
  }
};

export default InsertExpressionCommon;
