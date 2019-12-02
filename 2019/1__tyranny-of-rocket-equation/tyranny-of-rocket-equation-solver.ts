import { AdventSolver, IAdventSolution } from "../0__Util/solver";

export class TyrannyOfRocketEquationSolver extends AdventSolver {
    
    constructor(){
        super(__dirname);
    }

    getFuelRequired() {
        return this.getLineInputs()
        .map(mass => parseInt(mass))
        .map(this.calculateFuelOfMass)
        .reduce((acc,val) => acc + val)
    }

    getAdditionalFuelRequired() {
        return this.getLineInputs()
        .map(mass => parseInt(mass))
        .map(this.calculateRecursiveFuelOfMass)
        .reduce((acc,val) => acc + val)
    }

    calculateFuelOfMass = (mass: number) => Math.floor(mass/3) - 2;

    calculateRecursiveFuelOfMass = (mass: number): number => {
        const fuel = this.calculateFuelOfMass(mass);
        if(fuel <= 0){
            return 0;
        }
        return fuel + this.calculateRecursiveFuelOfMass(fuel)
    }

    public solve = (): IAdventSolution => ({
        result1: this.getFuelRequired(),
        result2: this.getAdditionalFuelRequired()
    });

}