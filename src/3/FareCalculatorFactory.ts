import NormalFareCalculator from "./NormalFareCalculator";
import OvernightFareCalculator from "./OvernightFareCalculator";
import OvernightSundayFareCalculator from "./OvernightSundayFareCalculator";
import PeakTimeFareCalculator from "./PeakTimeFareCalculator";
import Segment from "./Segment";
import SundayFareCalculator from "./SundayFareCalculator";

export default class FareCalculatorFactory{
     
    static create (segment: Segment){
        if(segment.isPeakTime())return new PeakTimeFareCalculator();
        if (segment.isovernight() && segment.isSunday()) return new OvernightSundayFareCalculator();
        if(segment.isovernight() && !segment.isSunday()) return new OvernightFareCalculator();			
        if (!segment.isovernight() && segment.isSunday()) return new SundayFareCalculator();         
        if (!segment.isovernight() && !segment.isSunday()) return new NormalFareCalculator ();       
        throw new Error();
    }

}