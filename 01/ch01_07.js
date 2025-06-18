// const fetchData = (callback)=>{
//     setTimeout(()=>{
//         const data = '서버에서 받은 데이터'
//         callback(data);
//     }, 1000)
// }

// const handleData = (data)=>{
//     console.log("콜백에서 받은 데이터", data)
// }

// //fetchData(handleData);

// const fetchDataPromise = ()=>{
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             const success = true;
//             if(success){
//                 resolve()
//             }else{
//                 reject()
//             }
//         }, 1000);
//     });
// }

// fetchDataPromise()
//     .then((data)=> { //resolve
//         console.log("프로미스에서 받은 데이터", data)
//     })
//     .catch((error)=>{ //reject
//         console.log('에러', error)
//     })

// const getData = async()=>{
//     try{
//         const data = await fetchDataPromise();
//         console.log('async/await data', data);
//     }catch(e){
//         console.log('error', e);
//     }
// }

const greet = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve();
      } else {
        reject();
      }
    }, 2000);
  });
};

greet()
  .then(() => {
    console.log("안녕하세요!");
  })
  .catch((e) => {
    console.log("error", e);
  });

const sayHi = async () => {
  try {
    const data = await greet();
    console.log(data);
  } catch {
    console.log("error", e);
  }
};
