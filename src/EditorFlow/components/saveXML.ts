import {XML_ImitateData} from "../common/flowDataSource";


declare global {
  interface Window {
    ActiveXObject?: any;
  }
}

interface RecursiveArgs {
  dataObj?: any,
  nodes?: any,
  edges?: any,
}

// 保存xml
export function saveXML(json: any = XML_ImitateData, createFile?: any) {
  // debugger;
  // json = XML_ImitateData
  
  
  let BPMNCommon = `<workflow>\n` +
  `<initial-actions>\n` +
  `<action id="${json.dataObj.id}" name="${json.dataObj.name}" remark="${json.dataObj.remark}">\n` +
  `<results>\n` +
  `<unconditional-result old-status="Finished" status="Underway" step="1"/>\n` +
  `</results>\n` +
  `</action>\n` +
  `</initial-actions>\n` +
  `<flows>\n`;
  let BPMNShape = ``;
  let BPMNEdge = ``;
  json.nodes && json.nodes.length > 0 && json.nodes.forEach((node:any) => {
    console.log(node,"jsonnnn");
    
    BPMNShape += `<node name="${node.name}" childFlowId="${node.childFlowId}" type="${node.type}" actionId="${node.actionId}" pid="${node.pid}" shape="${node.shape}" size="${node.size}" x="${node.x}" y="${node.y}" id="${node.id}" label="${node.label}" color="${node.color}">\n` +
 
    `<set>\n`
    if (node.nodeLeaderData &&node.nodeLeaderData.length > 0 ) {
      BPMNShape += `<principals>\n`
      node.nodeLeaderData.forEach((nodeLeader:any) => {
        BPMNShape += `<principal  type="${nodeLeader.type}" name="${nodeLeader.name}" id="${nodeLeader.id}" />\n`
      })
      BPMNShape += `</principals>\n`
      node.nodeLeaderData.forEach((nodeLeader:any) => {
        BPMNShape += `<nodeLeaderData  type="${nodeLeader.type}" name="${nodeLeader.name}" label="${nodeLeader.label}" 
        />\n`
      })
    }
    if (node.nodeTimeLimitData && node.nodeTimeLimitData.nodeTimeLimitState && Object.keys(node.nodeTimeLimitData.nodeTimeLimit).length > 0) {
      BPMNShape += `<limit while="${node.nodeTimeLimitData.nodeTimeLimit.while}" itemId="${node.nodeTimeLimitData.nodeTimeLimit.itemId}" tableName="${node.nodeTimeLimitData.nodeTimeLimit.tableName}" fieldName="${node.nodeTimeLimitData.nodeTimeLimit.fieldName}" fieldNameRemark="${node.nodeTimeLimitData.nodeTimeLimit.fieldNameRemark}" value="${node.nodeTimeLimitData.nodeTimeLimit.value}"
        showText="${node.nodeTimeLimitData.showText}" nodeTimeLimitState="${node.nodeTimeLimitData.nodeTimeLimitState}"/>\n`
    }
    // if (node.businessDataEditData && node.businessDataEditData.businessDataEdit && node.businessDataEditData.businessDataEdit.length > 0 && node.businessDataEditData.businessDataEditState) {
    //   BPMNShape += `<updates>\n`
    //   node.businessDataEditData.businessDataEdit.forEach((businessEdit) => {
    //     BPMNShape += `<update tableName="${businessEdit.tableName}" fieldName="${businessEdit.fieldName}" fieldNameRemark="${businessEdit.fieldNameRemark}" value="${businessEdit.value}"/>\n`
    //   })
    //   BPMNShape += `</updates>\n`
    // }
    if (node.fieldModificationData && node.fieldModificationData.fieldModification && node.fieldModificationData.fieldModification.length > 0) {
      BPMNShape += `<updates fieldModificationState="${node.fieldModificationData.fieldModificationState}">\n`
      node.fieldModificationData.fieldModification.forEach((f:any) => {
        BPMNShape += `<update tableName="${f.tableName}" fieldName="${f.fieldName}" fieldNameRemark="${f.fieldNameRemark}" value="${f.value}"/>\n`
      })
      BPMNShape += `</updates>\n`
    }
    if (node.notificationInformationData && node.notificationInformationData.infoData && Object.keys(node.notificationInformationData.infoData).length > 0) {
      BPMNShape += `<notices type="${node.notificationInformationData.type}">\n`
      if (node.notificationInformationData.infoData && node.notificationInformationData.infoData.length > 0) {
        node.notificationInformationData.infoData.forEach((i:any) => {
          BPMNShape += `<notice type="${i.type}" name="${i.name}"  label="${i.label}" id="${i.id}" phone="${i.phone}" email="${i.email}" sms="${i.sms}"/>\n`
        })
      }
      BPMNShape += `</notices>\n`
    }
    BPMNShape += `</set>\n` +
    `</node>\n`;
    
    // BPMNShape += `<action id="${node.id}" nodeId="${node.source}"  target="${node.target}" source="${node.source}" label="${node.label}">\n`
    // if (node.actionData && node.actionData.touchTypeData && node.actionData.touchTypeData.touchDataState && node.actionData.touchTypeData.touchData && Object.keys(node.actionData.touchTypeData.touchData).length > 0) {
    //   BPMNShape += `<touch type="${node.actionData.touchTypeData.touchData.type}">\n` +
    //   `<button name="${node.actionData.touchTypeData.touchData.nodeData.name}" remark="${node.actionData.touchTypeData.touchData.nodeData.remark}" id="${node.actionData.touchTypeData.touchData.nodeData.id}" />\n` +
    //   `</touch>\n`
    // }
    // if (node.actionData && node.actionData.actionConditionData && node.actionData.actionConditionData.actionConditionState && node.actionData.actionConditionData.actionCondition && node.actionData.actionConditionData.actionCondition.length > 0) {
    //   BPMNShape += `<whiles>\n`
    //   node.actionData.actionConditionData.actionCondition.forEach((actionCon) => {
    //     BPMNShape += `<while while="${actionCon.while}" itemId="${actionCon.itemId}" tableName="${actionCon.tableName}" fieldName="${actionCon.fieldName}" fieldNameRemark="${actionCon.fieldNameRemark}" value="${actionCon.value}"/>\n`
    //   })
    //   BPMNShape += `</whiles>\n`
    // }
    // if (node.actionData && node.actionData.nextTypeData && node.actionData.nextTypeData.nextTypeState && node.actionData.nextTypeData.nextType && Object.keys(node.actionData.nextTypeData.nextType).length > 0) {
    //   BPMNShape += `<next type="${node.actionData.nextTypeData.nextType.type}" id="${node.actionData.nextTypeData.nextType.id}"/>\n`
    // }
    // BPMNShape += `</action>\n`
    
  });
  
  // 指向线
  if (json.edges && json.edges.length > 0) {
    // BPMNShape += `<edges>\n`
    json.edges.forEach((jedge:any) => {
      BPMNShape += `<edge target="${jedge.target}" source="${jedge.source}" label="${jedge.label}" 
      while="${jedge.while}" itemId="${jedge.id}" tableName="${jedge.tableName}" fieldName="${jedge.fieldName}" fieldNameRemark="${jedge.fieldNameRemark}" value="${jedge.value}"
      ></edge>\n`
    })
    // BPMNShape += `</edges>\n`
  }
  
  
  let xml = `<?xml version="1.0" encoding="GBK"?>\n`;
  xml += `<!DOCTYPE workflow PUBLIC "-//OpenSymphony Group//DTD OSWorkflow 2.6//EN" "http://www.opensymphony.com/osworkflow/workflow_2_8.dtd">\n`;
  xml += BPMNCommon;
  xml += BPMNShape;
  xml += BPMNEdge;
  xml += `</flows>\n` +
  `</workflow>`;
  // 下载xml
  if (createFile) {
    const blob = new Blob([xml], {type: 'application/xml;charset=utf-8;'});
    const filename = `${"name"}.bpmn20.xml`;
    let link = document.createElement('a');
    if (link.download !== undefined) {
      let url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  return xml;
}


//将字符串转换为xml对象
export function String2XML(xmlstring:any) {
  // for IE
  if (window.ActiveXObject) {
    // @ts-ignore
    var xmlobject = new ActiveXObject("Microsoft.XMLDOM");
    xmlobject.async = "false";
    xmlobject.loadXML(xmlstring);
    return xmlobject;
  }
  // for other browsers
  else {
    var parser = new DOMParser();
    var xmlobject = parser.parseFromString(xmlstring, "text/xml");
    return xmlobject;
  }
}

//将xml对象转换为字符串
export function XML2String(xmlobject:any) {
  // for IE
  if (window.ActiveXObject) {
    return xmlobject.xml;
  }
  // for other browsers
  else {
    return (new XMLSerializer()).serializeToString(xmlobject);
  }
}

// 将xml对象转化为json 并整理数据
// @ts-ignore
export function XML2Json(recursiveNodes) {
  if (recursiveNodes) {
    let nodeData: RecursiveArgs = {
      dataObj: {},
      edges: [],
      nodes: [],
    }
    for (let i = 0; i < recursiveNodes.length; i++) {
      let nodeName = recursiveNodes[i].nodeName
      let nodes = recursiveNodes[i].childNodes
      let attrNodes = recursiveNodes[i].attributes
      if (nodes && nodes.length > 0 && nodeName !== 'parsererror') {
        XML2Json(nodes)
      }
      if (recursiveNodes[i].parentNode && recursiveNodes[i].parentNode.nodeName && (recursiveNodes[i].parentNode.nodeName === 'initial-actions') && nodeName === 'action') {
        // if (attrNodes && attrNodes.length > 0) {
        //   attrNodes.forEach((aData, index) => {
        //     nodeData.dataObj[aData.nodeName] = aData.nodeValue
        //     console.log('pppddd_aData.nodeValue', nodeData.dataObj[aData.nodeName], nodeData, aData.nodeValue)
        //   })
        // }
      } else {
        let nodeLeaderDatas: any = []
        let nodesDatas: any = {}
        if (attrNodes && attrNodes.length > 0) {
          //let nDatas: any = []
          // attrNodes.forEach((aData, index) => {
          //   // let nodesDatas = {}
          //   // nodesDatas = {
          //   //   ...nodesDatas,
          //   //   [attrNodes.item(index).name]: attrNodes.item(index).value
          //   // }
          //   nodesDatas[attrNodes.item(index).name] = attrNodes.item(index).value
          //   if (Object.keys(nodesDatas).length > 0) {
          //     nDatas.push(nodesDatas)
          //   }
          // })
          console.log('pppddd__fData', nodesDatas)
          if (nodeName !== 'parsererror') {
            switch (nodeName) {
              case 'action':
              case 'touch':
              case 'button':
              case 'while':
              case 'next':
                nodeData.edges.push(nodesDatas)
                break;
              case 'node':
                nodesDatas.x = Number(nodesDatas.x)
                nodesDatas.y = Number(nodesDatas.y)
                nodeData.nodes.push(nodesDatas)
                break;
              case 'principal':
                nodeLeaderDatas.push(nodesDatas)
                console.log('pppddd_nodeLeaderDatas', nodeLeaderDatas)
                nodesDatas.nodeLeaderData = {
                  nodeLeaderState: nodeLeaderDatas.length > 0,
                  nodeLeader: nodeLeaderDatas
                }
              case 'limit':
                nodesDatas.nodeTimeLimitData = {
                  nodeTimeLimitState: Object.keys(nodesDatas).length > 0,
                  nodeTimeLimit: nodesDatas
                }
              case 'updates':
                console.log('pppddasfad_nodesDatas', nodesDatas)
                nodeLeaderDatas.push(nodesDatas)
                nodesDatas.businessDataEditData = {
                  businessDataEditState: nodeLeaderDatas.length > 0,
                  businessDataEdit: nodeLeaderDatas
                }
              case 'notice':
                nodeData.nodes.push(nodesDatas)
                break;
            }
          }
        }
      }
    }
    // name value
    console.log('pppddd_aData.nodeValue22222222', nodeData)
    return nodeData
  }
}

