import FirstDayFareCalculatorHandler from "../../src/3/FirstDayFareCalculatorHandler";
import NormalFareCalculatorHandler from "../../src/3/NormalFareCalculatorHandler";
import OvernightFareCalculatorHandler from "../../src/3/OvernightFareCalculatorHandler";
import OvernightSundayFareCalculatorHandler from "../../src/3/OvernightSundayFareCalculatorHandler";
import PeakTimeFareCalculatorHandler from "../../src/3/PeakTimeFareCalculatorHandler";
import Ride from "../../src/3/Ride";
import SundayFareCalculatorHandler from "../../src/3/SundayFareCalculatorHandler";

let ride: Ride;

beforeEach(function(){ 
    const normalFare = new NormalFareCalculatorHandler();
    const overnightSunday = new OvernightSundayFareCalculatorHandler(normalFare);
    const overnight = new OvernightFareCalculatorHandler(overnightSunday);
    const sunday = new SundayFareCalculatorHandler(overnight);
    const peakTime = new PeakTimeFareCalculatorHandler(sunday);
    const firstDay = new FirstDayFareCalculatorHandler(peakTime);
    ride = new Ride(firstDay);
});

test("deve fazer uma corrida em um dia de semana e em horário normal", function(){
    ride.addSegment(10, new Date("2021-03-10T10:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(21);
});

test("deve fazer uma corrida em um dia de semana e em horário noturno", function(){ 
    ride.addSegment(10, new Date("2021-03-10T23:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(39);
});


test("deve fazer uma corrida em um domingo e em horário normal", function(){
    ride.addSegment(10, new Date("2021-03-07T10:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(29);
});


test("deve fazer uma corrida em um domingo e em horário noturno", function(){
    ride.addSegment(10, new Date("2021-03-07T23:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(50);
});

test.each([
    "2021-03-10T07:00:00",
    "2021-03-10T07:30:00",
    "2021-03-10T08:00:00",
    "2021-03-10T08:30:00"
])("deve fazer uma corrida em horário de pico %p", function(date){
    ride.addSegment(10, new Date(date));
    const fare = ride.calculateFare();
    expect(fare).toBe(60);
});


test("deve lançar um erro se a distância for inválida", function(){
    //given, arrange
    expect(() => ride.addSegment(-10,  new Date("2021-03-07T23:00:00"))).toThrow(new Error("Invalid Distance"))
});

test("deve lançar um erro se a data for inválida", function(){
    //given, arrange
    expect(() => ride.addSegment(10,  new Date("abc"))).toThrow(new Error("Invalid Date"))
});

test("deve fazer uma corrida com valor mínimo", function(){
    ride.addSegment(1, new Date("2021-03-10T10:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(10);
});

test("deve fazer uma corrida no dia primeiro", function(){
    ride.addSegment(1, new Date("2021-03-01T10:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(100);
});
