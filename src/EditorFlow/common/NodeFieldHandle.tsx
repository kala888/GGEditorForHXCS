interface nodeHandleType{
    type:string;
    propsAPI:any;
    values?:any;
    warpState?:Boolean
}
//操作工作流的方法
export default (props:nodeHandleType)=>{
    console.log(props.type);
    const {getSelected, 
        executeCommand, update,remove
    } =props.propsAPI;
    const item = getSelected()[0];
 
    
    if (!item) {
        return;
    }
    switch (props.type) {
        case "update":
            executeCommand(() => {
                update(item, {
                  ...props.values,
                });
              });
            
        case "remove":
            executeCommand(() => {
                remove(item)
            });
            break;
        case "save":
            return item;
        default:
            break;
    }
}