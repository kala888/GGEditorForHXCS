import React from 'react';
// import {Button, Radio, Dialog} from '@alifd/next';
import {Button, Radio, Modal} from 'antd';

interface TemplateProps {

  fieldValueCb?: any,
  isActiveEdit?: any,
  nodeTimeLimitData?:any,
  compoentTitle?:string,
  componentLabel?:string,
  IndexKey?:any
}

class FieldModification extends React.Component<TemplateProps> {
  state = {
    expressionVisible: false,
  }

  // 插入表达式
  insetExpression = () => {
    this.setState({
      expressionVisible: true
    })
  }

  onCloseData = () => {
    this.setState({
      expressionVisible: false
    })
  }

  // 插入表达式
  onExpressChange = (e:any) => {
 
    const {value}=e.target;
    const {fieldValueCb,IndexKey}: any = this.props
    let finnalValue =  `${value.express}`

    // let _fieldValues = {
    //   nodeTimeLimitState:true,
    //   nodeTimeLimit:{
    //     while:finnalValue,
    //     itemId: '条件字段id信息',
    //     tableName: '表名',
    //     fieldName: '表中字段名',
    //     fieldNameRemark: '表中字段名汉语说明',
    //     value: '',//值（小时）信息
    //   },
    //   showText:finnalValue
    // }
    
    
    fieldValueCb && fieldValueCb(finnalValue,IndexKey)
  }

  // 表达式弹窗
  expressionDlg = () => {
    const expressionData = [{
      express: '业务数据>立案时间',
      label: '~businessData~',
      tableName: 'busin'
    }, {
      express: '用户数据>评级',
      label: '$userData$',
      tableName: 'userDat'
    }
    // , {
    //   express: '=',
    //   label: '_equal_',
    //   tableName: 'equals'
    // }, {
    //   express: '速度',
    //   label: '$speed$',
    //   tableName: 'speeeeeed'
    // }
  ]

    return <>
      <Modal
        title="插入表达式"
        
        visible={this.state.expressionVisible}
        onOk={this.onCloseData.bind(this, 'role')}
        onCancel={this.onCloseData.bind(this, 'cancelClick')}
        
      >
        {expressionData && expressionData.length > 0 ?
          // @ts-ignore
          <Radio.Group itemDirection="hoz" onChange={this.onExpressChange}>
            {expressionData.map((item: any) => {
              return <Radio value={item}>{item.express}</Radio>
            })}
          </Radio.Group>
          : null}
      </Modal>
    </>
  }

  render() {
    return (
      <>
        <Button onClick={this.insetExpression}>插入表达式</Button>
        {/*插入表达式弹窗*/}
        {this.expressionDlg()}
      </>
    );
  }
};

export default FieldModification;
