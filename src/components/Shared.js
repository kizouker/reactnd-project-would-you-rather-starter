
export function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0  ) ? true : false;
  }
  
 export function isEmptyObj(obj){
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

 export function isEmptyAndObj(val){
    return (val === undefined || val == null || val.length <= 0  || isEmptyObj(val)) ? true : false;
  }
      