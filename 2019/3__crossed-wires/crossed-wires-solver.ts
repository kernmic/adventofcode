import { AdventSolver, IAdventSolution } from '../0__Util/solver';

type Wire = string[];
type Coord = {x: number, y: number};
type VisitedCoord = {stepsWire1: number} & Coord;
type Intersection = {stepsWire2:number,total:number} & VisitedCoord
const dirs = ['R','L','U','D'];

export class CrossedWiresSolver extends AdventSolver {

    private readonly wires: Wire[];

    constructor() {
        super(__dirname);
        this.wires = this.getLineInputs().map(x => x.split(','));
    }

    getManhattanDistance = (p1: Coord, p2: Coord) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    moveInDirectionLUT = (p: Coord, dir: 'R'|'U'|'L'|'D') => ({
        'R': ({x,y}: Coord) => ({x:++x,y}),
        'L': ({x,y}: Coord) => ({x:--x,y}),
        'D': ({x,y}: Coord) => ({x,y:--y}),
        'U': ({x,y}: Coord) => ({x,y:++y}),
    }[dir](p));
    areCoordsSame = (a: Coord, b: Coord) => a.x==b.x && a.y == b.y;


    getNearestIntersectionDistanceToSource() {
        const wire1 = this.wires[0];
        const wire2 = this.wires[1];
        const visited: VisitedCoord[] = [];
        const intersect: Intersection[] = [];
        let steps = 1;
        let curr: Coord = {x:0,y:0};
        for(let i = 0;i<wire1.length;i++){
            const move = wire1[i];
            const dir = move[0];
            const n = parseInt(move.slice(1));
            for(let a = 0;a < n;a++,steps++){
                // @ts-ignore
                curr = this.moveInDirectionLUT(curr,dir);
                visited.push({...curr,stepsWire1:steps});
            }
        }
        curr = {x:0,y:0};
        steps = 1;
        for(let i = 0;i<wire2.length;i++){
            const move = wire2[i];
            const dir = move[0];
            const n = parseInt(move.slice(1));
            for(let a = 0;a < n;a++,steps++){
                // @ts-ignore
                curr = this.moveInDirectionLUT(curr,dir);
                const v = visited.find(a=>this.areCoordsSame(a,curr));
                if(v){
                    console.log({...v,stepsWire2:steps,total:steps+v.stepsWire1});
                    intersect.push({...v,stepsWire2:steps,total:steps+v.stepsWire1});
                }
            }
        }
        return {
            closest: intersect.map(this.getManhattanDistance.bind(null,{x:0,y:0})).reduce((acc,val) => val < acc ? val : acc),
            shortest: intersect.map(x=>x.total).reduce((acc,val) => val < acc ? val : acc)
        };
    };

    public solve = (): IAdventSolution => {
        const {closest,shortest} = this.getNearestIntersectionDistanceToSource();
        return  {
            result1: closest,
            result2: shortest
        };
    }

}