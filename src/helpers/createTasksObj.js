export const createTasksObj = arr => {
   let result = {};
   arr.forEach(obj=>{
      result[obj.key] = [];
   });
   return result
};