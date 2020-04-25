// import { Props } from 'react'

// 工作流触发方式
export const triggerMethodSource = [{
  label: '按钮触发',
  value: 'B',
}, {
  label: '时间点触发',
  value: 'A',
}, {
  label: '条件触发',
  value: 'O',
}]

export const shapeManner = [{
  label: '曲线',
  value: 'flow-smooth',
}, {
  label: '折线',
  value: 'flow-polyline',
}
// , {
//   label: '圆曲折线',
//   value: 'flow-polyline-round',
// }
]

export const XML_ImitateData = {
  // 工作流基本信息
  dataObj: {
    id: '工作流',
    name: '工作流名称',
    remark: '',
  },
  // 节点类型，type(C:子工作流节点,S:开始节点,E:结束节点,U 返回节点)
  nodes: [
    {
      childFlowId: 'node2',
      type: 'S',
      actionId: 'actionId1,actionId4',
      pid: '',
      color: "#FA8C16",
      id: "e44259b9",
      label: "Start",
      name: "开始",
      shape: "flow-circle",
      size: "72*72",
      x: 203.1875,
      y: 104,
      // // 通知信息  type 通知类型，短信SMS 邮箱 EMAIL
      // notificationInformationData: {
        
        
          //     type: 'EMAIL',
          //     // 通知信息 type字段值描述(BA:部门全员,BF:部门负责人,YH:指定用户,JS:角色 )
          //     infoData: [{
            //       type: 'BA',
            //       name: '名称信息',
            //       id: '具体所选id信息',
            //       phone: '电话',
            //       email: '邮箱',
            //       sms: '短信',
            //     }]
            //   }
            // },
            // 节点负责人数据
      // nodeLeaderData: {
      //   nodeLeaderState: true,
      //   // 节点负责人,type字段值描述(BA:部门全员,BF:部门负责人,YH:指定用户,JS:角色 )
      //   nodeLeader: [{
      //     type: 'BA',
      //     name: '部门全员',
      //     id: 'BA',
      //   }, {
      //     type: 'BF',
      //     name: '部门负责人',
      //     id: 'BF',
      //   }, {
        //     type: 'YH',
        //     name: '指定用户',
        //     id: 'YH',
        //   }, {
          //     type: 'JS',
          //     name: '角色',
          //     id: 'JS',
          //   }],
      // },
      //
      // // 节点时限数据
      // nodeTimeLimitData: {
      //   nodeTimeLimitState: true,
      //   // 节点时限
      //   // while表达式 (>,<,=)大于 小于 等于
      //   // itemId 选取关联表字段，信息id信息
      //   nodeTimeLimit: {
      //     while: '>',
      //     itemId: '条件字段id信息',
      //     tableName: '表名',
      //     fieldName: '表中字段名',
      //     fieldNameRemark: '表中字段名汉语说明',
      //     value: '值（小时）信息',//值（小时）信息
      //   },
      // },
      //
      // // 字段修改数据
      // fieldModificationData: {
      //   fieldModificationState: true,
      //   fieldModification: [{
      //     while: '=',
      //     itemId: '条件字段id信息',
      //     tableName: '表名',
      //     fieldName: '表中字段名',
      //     fieldNameRemark: '表中字段名汉语说明',
      //     value: '要修改的内容'
      //   }, {
      //     while: '',
      //     itemId: '条件字段id信息',
      //     tableName: '表名',
      //     fieldName: '表中字段名',
      //     fieldNameRemark: '表中字段名汉语说明',
      //     value: '要修改的内容'
      //   }]
      // },
      //
      //
      // // 修改业务数据值
      // businessDataEditData: {
      //   businessDataEditState: true,
      //   businessDataEdit: [{
      //     tableName: '表名1',
      //     fieldName: '表中字段名',
      //     fieldNameRemark: '表中字段名汉语说明',
      //     value: '要修改的内容',
      //   }],
      // },
      //

      actionData: {
        actionName: 'actionName',
        // 触发方式 type(B 按钮,A 自动,O 立刻)
        touchTypeData: {
          touchDataState: true,
          touchData: {
            type: 'B',
            // type为B按钮节点
            nodeData: {
              name: '按钮名称',
              remark: '按钮描述',
              id: '按钮id',
            }
          },
        },


        triggerTimeData: {
          triggerTimeState: true,
          triggerTime: '',
        },

        actionConditionData: {
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
          // actionConditionState: true,
          // // 动作条件 while表达式 (>,<,=)大于 小于 等于
          // // itemId 选取关联表字段，信息id信息
          // actionCondition: [{
          //   // 此处未设置，库中俩个字段比较判断
          //   while: '>',
          //   itemId: '条件字段id信息',
          //   tableName: '表名',
          //   fieldName: '表中字段名',
          //   fieldNameRemark: '表中字段名汉语说明',
          //   value: '值信息',
          // }],
        },

        nextTypeData: {
          nextTypeState: true,
          // 执行 type（N 下一节点, W 下一流程）
          nextType: {
            type: 'W',
            id: '工作流id（N 下一节点id）',
          }
        },
      },

    },
    // {
    //   id: 'node2',
    //   label: '返回节点',
    //   name: '返回节点',
    //   childFlowId: 'node3',
    //   type: 'U',
    //   actionId: 'actionId2,actionId3',
    //   pid: 'node1',
    //   nodeLeaderData: {
    //     nodeLeaderState: true,
    //     // 节点负责人,type字段值描述(BA:部门全员,BF:部门负责人,YH:指定用户,JS:角色 )
    //     nodeLeader: [{
    //       type: '2222222BA',
    //       name: '部门全员',
    //       id: 'BA',
    //     }, {
    //       type: '222222BF',
    //       name: '部门负责人',
    //       id: 'BF',
    //     }, {
    //       type: '222222YH',
    //       name: '指定用户',
    //       id: 'YH',
    //     }, {
    //       type: '222222JS',
    //       name: '角色',
    //       id: 'JS',
    //     }],
    //   },
    //
    //   // 节点时限数据
    //   nodeTimeLimitData: {
    //     nodeTimeLimitState: true,
    //     // 节点时限
    //     // while表达式 (>,<,=)大于 小于 等于
    //     // itemId 选取关联表字段，信息id信息
    //     nodeTimeLimit: {
    //       while: '222222>',
    //       itemId: '222222条件字段id信息',
    //       tableName: '222222表名',
    //       fieldName: '222222表中字段名',
    //       fieldNameRemark: '表中字段名汉语说明',
    //       value: '值（小时）信息',//值（小时）信息
    //     },
    //   },
    //
    //   // 字段修改数据
    //   fieldModificationData: {
    //     fieldModificationState: true,
    //     fieldModification: [{
    //       while: '>',
    //       itemId: '222222条件字段id信息',
    //       tableName: '222222表名',
    //       fieldName: '222222表中字段名',
    //       fieldNameRemark: '表中字段名汉语说明',
    //       value: '值（小时）信息',//值（小时）信息
    //     }, {
    //       while: '>',
    //       itemId: '222222条件字段id信息',
    //       tableName: '表222222名',
    //       fieldName: '表中字段名',
    //       fieldNameRemark: '222222表中字段名汉语说明',
    //       value: '222222值（小时）信息',//值（小时）信息
    //     }]
    //   },
    //
    //
    //   // 修改业务数据值
    //   businessDataEditData: {
    //     businessDataEditState: true,
    //     businessDataEdit: [{
    //       tableName: '222222表名1',
    //       fieldName: '222222表中字段名',
    //       fieldNameRemark: '222222表中字段名汉语说明',
    //       value: '要修改的内容',
    //     }],
    //   },
    // },
    // {
    //   id: 'node3',
    //   label: '33333子工作流节点',
    //   name: '子工作流节点',
    //   childFlowId: '33333node4',
    //   type: '33333C',
    //   actionId: '33333actionId3',
    //   pid: '33333node2'
    // },
    // {
    //   id: '4444node4',
    //   label: '4444结束节点',
    //   name: '4444结束节点',
    //   type: '4444E',
    //   actionId: '4444actionId2,actionId4',
    //   pid: '4444node3'
    // },
  ],
  // 节点动作
  edges: [
    {
      id: "8765a35c",
      index: 1,
      shape: "flow-polyline",
      source: "db3bbe8c",
      sourceAnchor: 2,
      target: {
        x: 241.171875,
        y: 196
      }
    },
  ]
}

enum flowNodeType{
  Start="S",
  End="E",
  Return="U",
  Child="C",
  Work="W"

}
export interface dataObjType{
  id?:string;
  name:string;
  remark?:string;
}

// interface nodeLeaderDataType{
    
//         nodeLeaderState: true,
//         // 节点负责人,type字段值描述(BA:部门全员,BF:部门负责人,YH:指定用户,JS:角色 )
//         nodeLeader: [{
//           type: 'BA',
//           name: '部门全员',
//           id: 'BA',
//         }, {
//           type: '222222BF',
//           name: '部门负责人',
//           id: 'BF',
//         }, {
//           type: '222222YH',
//           name: '指定用户',
//           id: 'YH',
//         }, {
//           type: '222222JS',
//           name: '角色',
//           id: 'JS',
//         }],
  
// }
export interface nodeObjType{
  childFlowId?:string;
  type:flowNodeType;
  actionId?:string;
  pid?:string;
  color:string;
  id:string;
  label:string;
  name:string;
  shape:string;
  size:string;
  x:number;
  y:number;
  // nodeLeaderData:
  actionData?:any;
}
interface edgesType{
  id:string;
  index?:number;
  shape?:string;
  source:string;
  sourceAnchor:number;
  target:string
  targetAnchor:number;
//   id: "29c97575"
// source: "74bf735e"
// sourceAnchor: 2
// target: "b3bbc0fc"
// targetAnchor: 0
}
interface XMLJson{
  dataObj?:dataObjType;
  nodes:[nodeObjType];
  edges:[edgesType]
}

export const XMLDataJson=(props:XMLJson)=>{
  const {dataObj,nodes,edges}=props;
  return {
    dataObj,nodes,edges
  }
}