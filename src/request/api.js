// import axios from 'axios'
// import { Message } from 'element-ui'
// import router from '../router';
// // 
// //响应拦截器
// axios.interceptors.response.use(success=>{
//     //业务逻辑错误
//     if (success.status && success.status == 200) {
//         if(success.data.code==500||success.data.code==401||success.data.code==403){
//             Message.error({message:success.data.message});
//             return;
//         }
//         if(success.data.message){
//             Message.success({message:success.data.message});
//         }
//     }
//     return success.data;
// }),error =>{
//     if(error.response.code==504||error.response.code==404) {
//         Message.error({message: '服务器被吃了'});
//     }else if (error.response.code==403){
//         Message.error({message: '权限不足'});
//     }else if (error.response.code==401){
//         Message.error({message: '尚未登录'});
//         router.replace('/');
//     }else {
//          Message.error({message: '未知错误'});
//     }
// }

// let base = '';
// //封装请求
// export const postRequest = (url,params)=>{
//     return axios({
//         method:'post',
//         url:'${base}${url}',
//         data:params
//     })
// }