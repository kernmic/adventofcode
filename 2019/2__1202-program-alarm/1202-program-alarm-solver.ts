import { AdventSolver, IAdventSolution } from '../0__Util/solver';

export class ProgramAlarmSolver extends AdventSolver {

    private readonly separatedInput: number[];

    private OP_LUT: {[key:number]: (a: number, b: number) => number} = {
        1: (a: number, b: number) => a + b,
        2: (a: number, b: number) => a * b
    };

    constructor() {
        super(__dirname);
        this.separatedInput = this.getSeparatedInputs(',').map(x => +x);
    }

    prepareInput(noun: number, verb: number) {
        const input = [...this.separatedInput];
        input[1] = noun;
        input[2] = verb;
        return input;
    }

    applyOPCodesAndReturnFirstValueWithNounAndVerb(noun: number, verb: number) {
        const program = [...this.prepareInput(noun,verb)];
        for (let i = 0; i < program.length; i+=4) {
            if (program[i] === 99) {
                break;
            }
            const address = program[i+3];
            const addressParam1 = program[i+1];
            const addressParam2 = program[i+2];
            const calculationResult = this.OP_LUT[program[i]](program[addressParam1],program[addressParam2]);
            program[address] = calculationResult;
        }
        return program[0];
    }

    applyNounAndVerbTrialAndErrorUntilOutputEquals(expectedOutput: number): {noun: number, verb:number}{

        for(let noun = 0;noun<=99;noun++){
            for(let verb = 99;verb>=0;verb--){
                if(this.applyOPCodesAndReturnFirstValueWithNounAndVerb(noun,verb) === expectedOutput){
                    return {
                        noun,
                        verb
                    }
                }
            }
        }

        throw new Error("No result with expectedOutput");
    }

    calculateResult2() {
        const {noun, verb} = this.applyNounAndVerbTrialAndErrorUntilOutputEquals(19690720);
        return 100 * noun + verb;
    }

    public solve = (): IAdventSolution => ({
        result1: this.applyOPCodesAndReturnFirstValueWithNounAndVerb(12,2),
        result2: this.calculateResult2()
    });

}