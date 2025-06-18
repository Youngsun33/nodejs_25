let date = new Date();

if(date.getHours() <12){
    console.log('오전')
} else{
    console.log('오후')
}

const hour = date.getHours();
const timeOfDay = hour<12? '오전' : '오후' ;
console.log(`현재는 ${timeOfDay}입니다.  `) ;

const  temperature = 24;

if (temperature >= 30){
    console.log('더운 날씨입니다.')
} else if (temperature >=20){
    console.log( '따듯한 날씨입니다.')
}else if (temperature>= 10){
    console.log('선선한 날씨입니다.')
}else{
    console.log('추운 날씨입니다.')
}

const day = date.getDay();
console.log(day);

switch(day) {
    case 1:
        console.log('월')
        break;
    case 2:
        console.log('화');
        break;
    case 3:
        console.log('수');
        break;
    case 4:
        console.log('목');
        break;
    case 5:
        console.log('금');
        break;
    case 6:
        console.log('토');
        break;
    case 0:
        console.log('일');
        break;

    default:
        console.log('error')
}


const name = '영선님';
const displayName = name ||'익명님'
console.log(`환영합니다 ${displayName}`);

const userInput = 'dgds';
const defaultValue = '기본값';
const result = userInput ?? defaultValue;
console.log(`결과 :${result}`); 


//조건부 실행 
const isLoggedIn = true;
isLoggedIn && console.log("로그인 되었습니다.");











