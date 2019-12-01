import fs from 'fs'
import path from 'path'

export interface IAdventSolver {

    solve: () => string;

}

export class AdventSolver {

    protected input: string;

    constructor(directory: string){
        this.input = fs.readFileSync(path.resolve(directory, 'input.txt'), 'utf8');
    }

}