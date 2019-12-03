import { AdventSolver, IAdventSolution } from '../0__Util/solver';

type Wire = string[];
type Direction = 'R' | 'D' | 'L' | 'U';
type Coordinate = number[]

export class CrossedWiresSolver extends AdventSolver {

    private readonly wires: Wire[];

    constructor() {
        super(__dirname);
        this.wires = this.getLineInputs().map(x => x.split(','));
    }

    getManhattanDistance = (p1: number[], p2: number[]) => Math.abs(p1[0] - p1[1]) + Math.abs(p2[0] - p2[1]);
    getManhattanDistanceToSource = this.getManhattanDistance.bind(null, [0, 0]);
    getNextPosition = (position: Coordinate, direction: Direction, distance: number) => ({
        'R': (position: Coordinate) => [position[0] + distance, position[1]],
        'L': (position: Coordinate) => [position[0] - distance, position[1]],
        'D': (position: Coordinate) => [position[0], position[1] - distance],
        'U': (position: Coordinate) => [position[0], position[1] + distance],
    }[direction](position));

    interpolateCoordinates = (c1: Coordinate, c2: Coordinate): Coordinate[] => {
        if(c1[0] == c2[0]){
            const distance = c2[1] - c1[1];
        }
    }

    getRoute = (wire: Wire, currentPosition: Coordinate, route: Coordinate[]): Coordinate[] => {
        if(!wire.length){
            return route;
        }
        if(wire[0][0] != 'R' && wire[0][0] != 'U' && wire[0][0] != 'L' && wire[0][0] != 'D'){
            throw new Error(`wrong direction type "${wire[0][0]}"`);
        }
        const direction: Direction = wire[0][0];
        const distance: number = parseInt(wire[0].substr(1));
        return this.getRoute(wire.splice(1),this.getNextPosition(currentPosition,direction,distance),[...route, currentPosition]);
    };

    getNearestIntersectionDistanceToSource() {
        const route1 = this.getRoute(this.wires[0],  [0,0],[]);
        const route2 = this.getRoute(this.wires[1],  [0,0],[]);
        const intersections  = route1.filter(c1 => route2.some(c2 => c1[1] == c2[1] && c1[0] == c2[0]));
        console.log(intersections);
        return '1'
    };

    public solve = (): IAdventSolution => ({
        result1: this.getNearestIntersectionDistanceToSource(),
        result2: 2
    });

}