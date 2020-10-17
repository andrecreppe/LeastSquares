import { Component } from 'react';

interface Point {
  index: number,
  x: number,
  y: number
}

class LeastSquares extends Component {
  static Average(arr: number[]) {
    let sum = 0;
    const size = arr.length;

    for(let i=0; i<size; i++) {
      sum += arr[i];
    }

    return (sum / size);
  }

  static SumArrayMultArray(arr1: number[], arr2: number[]) {
    let sum = 0;
    const size = arr1.length;

    for(let i=0; i<size; i++) {
      sum += (arr1[i] * arr2[i]);
    }

    return sum;
  }

  static SumMinusSquare(arr: number[], val: number) {
    let sum = 0;
    const size = arr.length;

    for(let i=0; i<size; i++) {
      sum += Math.pow(arr[i] - val, 2);
    }

    return sum;
  }

  static SumSquare(arr: number[]) {
    let sum = 0;
    const size = arr.length;

    for(let i=0; i<size; i++) {
      sum += Math.pow(arr[i], 2);
    }

    return sum;
  }
  
  static FindA(xVals: number[], yVals: number[], xAvg: number) {
    const xMinusAvg = xVals.map(x => { return (x - xAvg) });

    const xMinusAvgY = this.SumArrayMultArray(xMinusAvg, yVals);
    const xMinusAvg2 = this.SumMinusSquare(xVals, xAvg);

    return (xMinusAvgY / xMinusAvg2)
  }

  static FindDeltaY(xVals: number[], yVals: number[], a: number, b: number) {
    const size = xVals.length;
    let sum = 0;

    for(let i=0; i<size; i++) {
      sum += Math.pow((a*xVals[i]) + b - yVals[i], 2);
    }

    sum /= (size-2);

    return Math.sqrt(sum)
  }

  static FindDeltaA(xVals: number[], xAvg: number, deltaY: number) {
    const den = Math.sqrt(this.SumMinusSquare(xVals, xAvg));

    return (deltaY / den);
  }

  static FindDeltaB(xVals: number[], xAvg: number, deltaY: number) {
    const num = this.SumSquare(xVals);
    const den = xVals.length * this.SumMinusSquare(xVals, xAvg);

    return (Math.sqrt(num/den) * deltaY);
  }

  static Regression(data: Point[]) {
    const xVals = data.map(point => { return point.x })
    const yVals = data.map(point => { return point.y })

    const avgX = this.Average(xVals)
    const avgY = this.Average(yVals)

    const a = this.FindA(xVals, yVals, avgX)
    const b = avgY - (a * avgX);

    const deltaY = this.FindDeltaY(xVals, yVals, a, b);
    const deltaA = this.FindDeltaA(xVals, avgX, deltaY);
    const deltaB = this.FindDeltaB(xVals, avgX, deltaY);

    return {
      a,
      b,
      deltaA,
      deltaB,
      deltaY
    }
  }
}

export default LeastSquares;
