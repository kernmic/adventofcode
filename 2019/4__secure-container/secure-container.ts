import { AdventSolver, IAdventSolution } from '../0__Util/solver';


export class SecureContainerSolver extends AdventSolver {

    min: number;
    max: number;

    constructor() {
        super(__dirname);
        this.min = parseInt(this.input.split('-')[0]);
        this.max = parseInt(this.input.split('-')[1]);
    }

    getPossibilitiesBruteForce(regex: RegExp){
        let matches = 0;
        loop1:
        for(let i = this.min;i<=this.max;i++){
            const numbers = `${i}`.split('').map(x=>parseInt(x));
            for(let a = 1;a<numbers.length;a++){
                if(numbers[a] < numbers[a-1]) continue loop1;
            }
            if(!`${i}`.match(regex)) continue loop1;
            matches++;
        }
        return matches;
    }

    buildRegex = () => {
        let regex = "";
        for(let i = 0;i<10;i++){
            regex += `(?<!${i})${i}{2}(?!${i})|`
        }
        return new RegExp(regex.substring(0, regex.length - 1));
    };


    public solve = (): IAdventSolution => {
        return  {
            result1: this.getPossibilitiesBruteForce(/(\d)\1/),
            result2: this.getPossibilitiesBruteForce(this.buildRegex())
        };
    }

}