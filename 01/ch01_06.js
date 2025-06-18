

const person1 = {
    name : '허영선',
    age: 25,
    jop : null 
}

console.log(person1.name, person1['name']);

person1.hobby = ['cook', 'game'];
console.log(person1);
console.log(Object.keys(person1));
console.log(Object.values(person1));


person1.addAge = function(){
    this.age = this.age +1;
}

person1.addAge();
console.log(person1);


class personInfo{
    constructor(name,age,address){
        this.name= name;
        this.age = age;
        this.address = address;
    }

    addAge(age){
        this.age = this.age + age;
    }

    getAge(){
        return this.age
    }
}

let p1 = new personInfo('이지훈', 50, '신정동')
console.log(p1);
p1.addAge(50)
console.log(p1.getAge());


class Employee extends personInfo{
    constructor(name,age, address, salary){
        super(name,age, address)
        this.salary=salary;
    }
}

let e1= new Employee('dd', 45, 'dfs', 3000)
console.log(e1);



try{
    //데이터베이스 커넥션 언더와서 데베에 데이터 질의
    const arr = new Array(-1);
}catch(e){
    // 데이터 질의 하다가 예외 발생했을 떄 처리
    console.log('예외발생:', e)
}finally{
    //데이터 베이스 커넥션 닫아주기 
    console.log("예외가 발생해도 이 작업은 반드시 필요")
}

try{
    const err = new Error('나만의 에러')
    err.name = '나만의 에러 잡기'
    err.message = '나만의 에러가 완성 ^0^'
    throw err
} catch(e){
    console.log(e.name, e.message)
}


class CarInfo {
    constructor(brand, color, model){
        this.brand = brand;
        this.color = color;
        this.model = model;
    }
    drive(){
        console.log(`모델 ${this.model}가 충전 중`);
    }

    stop(){
        console.log(`모델 ${this.model}가 멈췄습니다.`);
    }
}


let car = new CarInfo('현대', 'red', '소나타');
console.log(car);

class ElectricCarInfo extends CarInfo{
    constructor(brand, color, model, charge){
        super(brand, color, model);
        this.charge = charge;
    }

    chargeCar() {
        console.log(`모델 ${this.model}가 충전 중`);
    }

}

c1 = new ElectricCarInfo('현대','쥐색','그랜저',80);
c2 = new ElectricCarInfo('기아', '검정','몰라', 50);

console.log(c1);
c1.chargeCar();
c1.stop();