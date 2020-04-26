import React,{useEffect,useState} from 'react';
import Blockquote from "../common/blockquote";
//src\components\EditorFlow\components\EditorDetailPanel\common\nodeTimeLimitCommon.tsx
import FieldModification from "../common/fieldModificationTs";
import {
  Divider,Row,Input,Col,InputNumber
  } from 'antd';
import styles from '../index.module.scss';

interface trigmodeProps{
    changeActionChild:Function,
    type:string,
    value?:string
    setnextTypeDataKey?:Function
}
export default (props:trigmodeProps)=>{
    const [type,setType]=useState(props.type);

    const [value,setValue]=useState(props.value);

    const [strIndex,setStrIndex]=useState(0)
   
    useEffect(()=>{
        setType(props.type)
    },[props.type])
    
    
   
    // <!--触发方式 type(B 按钮,A 自动,O 立刻)-->
    switch (type) {
        case "A":  
            return(
                <div className={styles.detailform_cons}>
                <div className={styles.detailform_titleCon}>
                  <Blockquote content={'设置时间表达式'} />
                 
                </div>
                <Row>
                  <Col span={5}>
                  <div style={{lineHeight:"32px"}}>时间表达式:</div>
                   </Col>
                  <Col span={14}>
                    <Input
                        value={value}
                        onChange={(e) => {
                            props.changeActionChild(e.target.value)
                            setValue(e.target.value)
                        }}
                        onClick={(e)=>{
                            setStrIndex(Number(e.currentTarget.selectionStart))
                        }}
                    />
                 </Col> 
                  <Col span={4} offset={1}>
                    <FieldModification
                  
                      defaultValue={value}
                      valueIndex={strIndex}
                      fieldValueCb={(value)=>{console.log(value,"xxxxxx");
                      props.changeActionChild(value)
                      setValue(value)
                    }}
                   
                    />
                 </Col> 
                </Row>
                <Divider dashed />
              </div>
            )
        case "O":
            return(
                <div className={styles.detailform_cons}>
                <div className={styles.detailform_titleCon}>
                  <Blockquote content={'触发间隔'} />
                 
                </div>
                <Row>
                <Col span={4}>
                  <div style={{lineHeight:"32px"}}>间隔时间：</div>
                  </Col>
                  <Col span={20}>
                  <InputNumber placeholder="设置间隔时间秒" 
                     defaultValue={Number(props.value)}
                     onChange={(value) => props.changeActionChild(value)}
                     style={{width:"100%"}}
                     />
                </Col>
                </Row>
                <Divider dashed />
              </div>
            )
        default:
            return(
                <div className={styles.detailform_cons}>
                <div className={styles.detailform_titleCon}>
                  <Blockquote content={'按钮名称'} />
               
                </div>
                <Row>
                  <Col span={4}>
                  <div style={{lineHeight:"32px"}}>按钮名称:</div>
                  </Col>
                  <Col span={20}>
                  <Input placeholder="按钮名称" 
                     defaultValue={props.value}
                     onChange={(e) => props.changeActionChild(e.target.value)}
                     />
                    </Col>
                </Row>
                <Divider dashed />
              </div>
            )
    }
}
