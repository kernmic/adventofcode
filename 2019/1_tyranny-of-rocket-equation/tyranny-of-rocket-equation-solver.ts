import { AdventSolver } from "../0_Util/solver";

export class TyrannyOfRocketEquationSolver extends AdventSolver {
    
    constructor(){
        super(__dirname);
    }

    public solve(){
        console.log(this.input);
        return `${this.input}`;
    };


}