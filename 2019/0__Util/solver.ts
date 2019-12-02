import fs from 'fs'
import path from 'path'

export interface IAdventSolution {
    result1?: string | number;
    result2?: string | number;
}

export interface IAdventSolver {

    solve: () => IAdventSolution;

}

export class AdventSolver {

    protected input: string;

    constructor(directory: string){
        this.input = fs.readFileSync(path.resolve(directory, 'input.txt'), 'utf8');
    }

    protected getLineInputs(){
        return this.getSeparatedInputs('\n');
    }

    protected getSeparatedInputs(separator:string = ','){
        return this.input.split(separator);
    }

}