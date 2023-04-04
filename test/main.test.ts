import { calculateRide } from "../src/main";

test("deve fazer uma corrida em um dia de semana e em horário normal", function(){
    //given, arrange
    const segments = [
        {distance: 10, date: new Date("2021-03-10T10:00:00")}
    ]
    //when, act
    const fare = calculateRide(segments)
    // then, assert
    expect(fare).toBe(21);
});

test("deve fazer uma corrida em um dia de semana e em horário noturno", function(){
    //given, arrange
    const segments = [
        {distance: 10, date: new Date("2021-03-10T23:00:00")}
    ]
    //when, act
    const fare = calculateRide(segments)
    // then, assert
    expect(fare).toBe(39);
});

test("deve fazer uma corrida em um domingo e em horário normal", function(){
    //given, arrange
    const segments = [
        {distance: 10, date: new Date("2021-03-07T10:00:00")}
    ]
    //when, act
    const fare = calculateRide(segments)
    // then, assert
    expect(fare).toBe(29);
});


test("deve fazer uma corrida em um domingo e em horário noturno", function(){
    //given, arrange
    const segments = [
        {distance: 10, date: new Date("2021-03-07T23:00:00")}
    ]
    //when, act
    const fare = calculateRide(segments)
    // then, assert
    expect(fare).toBe(50);
});

test("deve lançar um erro se a distanceância for inválida", function(){
    //given, arrange
    const segments = [
        {distance: -10, date: new Date("2021-03-07T23:00:00")}
    ]
    //when, act
    // then, assert
    expect(() => calculateRide(segments)).toThrow(new Error("Invalid Distance"));
});

test("deve retornar -2 se a data for inválida", function(){
    //given, arrange
    const segments = [
        {distance: 10, date: new Date("abc")}
    ]
    //when, act
    // then, assert
    expect(() => calculateRide(segments)).toThrow(new Error("Invalid Date"));
});

test("deve fazer uma corrida com valor mínimo", function(){
    //given, arrange
    const segments = [
        {distance: 1, date: new Date("2021-03-07T23:00:00")}
    ]
    //when, act
    const fare = calculateRide(segments)
    // then, assert
    expect(fare).toBe(10);
});

