import {
    saveXML
  } from "../components/saveXML";
  //src\components\EditorFlow\common\flowDataSource\index.ts
  import { XMLDataJson } from './flowDataSource';
  //可能需要随时保存 所以把方法提取出来
//解析成后台数据 并 存储

//@ts-ignore
const saveWorkFlow=(item)=>{
    const dataObj={
        id:String(Math.random()*10000),
        // ...dataField
      }
      //节点 节点名字
      const nodes=[
        ...Object.values(item.dataMap)
      ]
      const edges=nodes.filter((item)=>(item.target));
      
      //     id: "29c97575"
      // source: "74bf735e"
      // sourceAnchor: 2
      // target: "b3bbc0fc"
      // targetAnchor: 0
      //
      //{
        //"dataObj":{"id":"3395.5758644768275"},
        //"nodes":[
          //{"type":"S","size":"72*72","shape":"flow-circle","color":
          //"#FA8C16","label":"Start1","name":"开始","x":214.515625,"y":-79,"id":"516e950f"},
          //{"type":"C","size":"80*48","shape":"flow-rect","color":"#1890F0","label":"子工作节点2",
          // "name":"子工作","x":212.515625,"y":80,"id":"5aed684d"},{"source":"516e950f","sourceAnchor":2,"target":"5aed684d",
          // "targetAnchor":0,"id":"eeacfb02"}],
          //"edges"
          //:[{"source":"516e950f","sourceAnchor":2,"target":"5aed684d","targetAnchor":0,"id":"eeacfb02"}]}
          //
          // @ts-ignore
      let JSONData={ dataObj,nodes,
            edges
      }
      let xmldata=XMLDataJson(JSONData)
      console.log('pppddd_e....................',item,xmldata,JSONData)
      let localData=saveXML(xmldata)
      localStorage.setItem("workflowMockItem",localData);
      console.log(localData,"localData",xmldata,JSONData);
      
}

export const readerWorkFlow=(workflowMockItem)=>{
    // ||saveXML()
    // string 转xml对象
  
    
    function xmlToJson(xml) {
        // 新建返回的对象
        var obj = {};
        if (xml.nodeType == 1) {
          
          // 处理属性
          if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
          }
        } else if (xml.nodeType == 3) {
          // 文本
          obj = xml.nodeValue;
        }
        // 处理子节点
        // 如果所有子节点都是文本，则把它们拼接起来
        var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
          return node.nodeType === 3;
        });
        if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
          obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
            return text + node.nodeValue;
          }, "");
        } else if (xml.hasChildNodes()) {
          for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof obj[nodeName] == "undefined") {
              obj[nodeName] = xmlToJson(item);
            } else {
              if (typeof obj[nodeName].push == "undefined") {
                var old = obj[nodeName];
                obj[nodeName] = [];
                obj[nodeName].push(old);
              }
              obj[nodeName].push(xmlToJson(item));
            }
          }
        }
        return obj;
      }

      
      var XmlNode = new DOMParser().parseFromString(workflowMockItem, 'text/xml');
  
      // xml转为json对象 及整理并添加其他数据
      
      let dataTemp=xmlToJson(XmlNode);
      //{
      //"dataObj":{"id":"3395.5758644768275"},
      //"nodes":[
      //{"type":"S","size":"72*72","shape":"flow-circle","color":
      //"#FA8C16","label":"Start1","name":"开始","x":214.515625,"y":-79,"id":"516e950f"},
      //{"type":"C","size":"80*48","shape":"flow-rect","color":"#1890F0","label":"子工作节点2",
      // "name":"子工作","x":212.515625,"y":80,"id":"5aed684d"},{"source":"516e950f","sourceAnchor":2,"target":"5aed684d",
      // "targetAnchor":0,"id":"eeacfb02"}],
      //"edges"
      //:[{"source":"516e950f","sourceAnchor":2,"target":"5aed684d","targetAnchor":0,"id":"eeacfb02"}]}
      
      let flowData={
       //dataObj:{},
        nodes:[],
        edges:[],
      }
      //flowData.dataObj=dataTemp.workflow&&dataTemp.workflow[1]["initial-actions"].action["@attributes"];
      console.log(dataTemp.workflow,"dataTemp.workflow");
      
      if(dataTemp.workflow){
        //节点设置
        flowData.nodes=dataTemp.workflow&&dataTemp.workflow[1]["flows"].node.map((item)=>{
          console.log(item,"不思进取");
          //节点负责人
          if(item.set.nodeLeaderData){
            if(item.set.nodeLeaderData.length){
  
              item["@attributes"].nodeLeaderData=item.set.nodeLeaderData["@attributes"]
            }else{
              item["@attributes"].nodeLeaderData=[];
              item["@attributes"].nodeLeaderData.push(item.set.nodeLeaderData["@attributes"])
            }
          }
          //节点时限
          if(item.set.limit){
              item["@attributes"].nodeTimeLimitData={
                  nodeTimeLimitState:true,
                  nodeTimeLimit:[item.set.limit["@attributes"]],
                  showText:item.set.limit["@attributes"].showText
                  }
          }
          //修改字段数据
          if(item.set.updates){
              const tempUpdate=item.set.updates;
              item["@attributes"].fieldModificationData={
                fieldModificationState:tempUpdate["@attributes"].fieldModificationState,
              }
              item["@attributes"].fieldModificationData.fieldModification=[];
              if(tempUpdate.update&&tempUpdate.update.length){
                console.log("1111",tempUpdate.update);
                
                item["@attributes"].fieldModificationData.fieldModification=tempUpdate.update.map((item)=>{
                  return item['@attributes']
                })
              }else if(tempUpdate.update){
                console.log("2222");
                item["@attributes"].fieldModificationData.fieldModification.push(tempUpdate.update["@attributes"])
              }
          }
          //节点通知
          if(item.set.notices){
              const notices=item.set.notices;
              item["@attributes"].notificationInformationData={
                type:"EMAIL"
              }
              // console.log(item.set.notices,"item.set.notices");
              item["@attributes"].notificationInformationData.infoData=[];
              if(notices.notice&&notices.notice.length){
                item["@attributes"].notificationInformationData.infoData=notices.notice.map((item)=>{
                  return item['@attributes']
                })
              }else if(notices.notice){
                item["@attributes"].notificationInformationData.infoData.push(notices.notice["@attributes"])
              }
          }

          if(item["@attributes"].x!=="undefined"){
            item["@attributes"].x=Number(item["@attributes"].x);
            item["@attributes"].y=Number(item["@attributes"].y);
          }
          return item["@attributes"]
        }).filter((item)=>{
  
          return item.x!=="undefined"
        });;
        if(dataTemp.workflow[1]["flows"].edge.length){
          flowData.edges=dataTemp.workflow&&dataTemp.workflow[1]["flows"].edge.map((item)=>{
            return item["@attributes"]
          })
        }else{
          flowData.edges[0]=dataTemp.workflow&&dataTemp.workflow[1]["flows"].edge["@attributes"];
        }
      }
      flowData.edges.map((item)=>{
        if(item.label==="undefined"){
          item.label="流程线"
        }
        return item
      })
  
      
      console.log('pppddd_arrangeNodes',xmlToJson(XmlNode),flowData)
      return flowData;
}
//测试数据
export const modelData={
   
        nodes: [
              {
                id: "597ae1c9",
                label: "Node",
                x: "231.34375",
                y: "92",
                
              },
              {
                id: "0ffb03ef",
                label: "Node",
                x: "265.34375",
                y: "271"
              }
            ],
            edges: [
              {
                label: "Label",
                source: "597ae1c9",
                target: "0ffb03ef"
              }
            ]
      
}
export default saveWorkFlow;