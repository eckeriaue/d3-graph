import  * as d3 from 'd3'
namespace Chart {

  type Asymptotes = {
    data: number[]
    color: string
   }
  interface SplineProperty {
    yLabel?: string[]
    xLabel?: string[]
    asymptotes?: Array<Asymptotes>
  }

  export class Spline {
    yLabel: string[]
    xLabel: string[]
    target: string
    path: d3.Path = d3.path()
    asymptotes: Array<Asymptotes>
    constructor(target: string, {yLabel, xLabel, asymptotes}: SplineProperty) {
      this.target = target
      this.yLabel = yLabel
      this.xLabel = xLabel
      this.asymptotes = asymptotes
    }
  }

}
export default Chart