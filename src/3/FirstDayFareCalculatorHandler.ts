import FareCalculatorHandler from "./FareCalculatorHandler";
import Segment from "./Segment";

export default class FirstDayFareCalculatorHandler implements FareCalculatorHandler{
    FARE = 0;

    constructor(readonly next?: FareCalculatorHandler){

    }

    calculate(segment: Segment): number {
        if (segment.isFirstDay()) {
            return 100;       
        }
        if(!this.next) throw new Error();
        return this.next.calculate(segment);
    }

}