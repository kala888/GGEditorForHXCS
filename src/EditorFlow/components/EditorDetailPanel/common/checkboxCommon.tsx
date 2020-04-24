import React from 'react';
import {Checkbox} from 'antd';

// import styles from './index.module.scss';

interface CheckboxCommonProps {
  value?:any,
  fieldValueCb?:Function,
  nodeTimeLimitData?:any,

}

class CheckboxCommon extends React.Component<CheckboxCommonProps> {
  constructor(props:any) {
    super(props);
    console.log(props,"nodeTimeLimitData");
    
    
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(): void {

  }

  componentWillReceiveProps(nextProps: Readonly<CheckboxCommonProps>, nextContext: any): void {

    console.log(nextProps,"valuenextProps");
  }

  componentWillUnmount(): void {

  }
  //公共组件不能暴露太多 这里需要父组件做的更多
  onChange(selectedItems:any) {
    const {checked}=selectedItems.target
    const {fieldValueCb}: any = this.props
  
    
    fieldValueCb && fieldValueCb(checked)
    // console.log(selectedItems,"valuenextProps");
    
  }

  render() {
    const {value}: any = this.props;
    
    return (
      <Checkbox onChange={this.onChange} defaultChecked={value}>启用</Checkbox>
    );
  }
};

export default CheckboxCommon;
