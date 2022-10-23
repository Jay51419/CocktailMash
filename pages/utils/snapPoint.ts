 export default function snapPoint(value:number, velocity:number,points:number[]):number {
    var point = value + 0.2 * velocity;
    var deltas = points.map((p) => Math.abs(point - p) );
    var minDelta = Math.min(...deltas);
    return points.find((p) => Math.abs(point - p) == minDelta) as  number;
  }