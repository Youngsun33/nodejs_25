// let arr = [5,23,45, 'world', true, -4];
// console.log(arr);
// console.log(arr[1]);


// for (let i=0; i<arr.length; i++){
//     console.log(`${i} is  ${arr[i]}`);
// }

// console.log('-----for in--------');

// for (i in arr){
//     console.log(`${i} is  ${arr[i]}`);
// }

// console.log('-----for of--------');

// for(e of arr){
//     console.log(e);
// }



console.log('-------------');

const arr1 = [1,2,'stop', 3,4,true, false];
for(let i=0; i<arr1.length; i++){
    if (arr1[i] == 'stop'){
        console.log('STOP!')
        break;
    }
    console.log(i);
}

console.log('-------------');

const arr2 = [5,10,15,20,25];
for (i in arr2){
    if(arr2[i] > 20 ){
        break;
    }
    console.log(arr2[i]);
}

console.log('-------------');

const arr3 = [1,2,3,4,5,6,7,8,9,10];
for(i in arr3){
    if(arr3[i]%2 == 1){
        continue;
    }
    console.log(arr3[i]);
}

console.log('-------------');


for(i in arr3){
    if(arr3[i]%3 == 0){
        continue;
    }
    console.log(arr3[i]);
}

console.log('-------------');
const arr4 = ['apple', 1, 'banana', 2, 'mango', false];
for(i in arr4){
    if(typeof arr4[i] === 'string'){
        console.log(arr4[i]);
        
    }
    
}







