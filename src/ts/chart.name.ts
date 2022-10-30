import  * as d3 from 'd3'
namespace Chart {

  type Point = {
    x: number
    y: number
  }

  type Asymptotes = {
    color: string
    points: Array<Point>
   }

  interface SplineProperty {
    yLabel?: string[]
    xLabel?: string[]
    asymptotes?: Array<Asymptotes>
    grid?: {
      size?: number
    }
  }

  export class Spline {
    path: d3.Path = d3.path()
    private x: d3.ScaleTime<number, number, never> = d3.scaleTime()
   
    yLabel: string[]
    xLabel: string[]
    grid: {size: number}
    asymptotes: Array<Asymptotes>
    target: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
    scene: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
   
    constructor(target: string,
      {
        yLabel,
        xLabel,
        asymptotes,
        grid,
      }: SplineProperty) {
      this.target = d3.select(target)
      this.scene = this.target.append('svg').attr('id', 'scene')
      this.yLabel = yLabel
      this.grid = {
        size: grid.size
      }
      this.xLabel = xLabel
      this.asymptotes = asymptotes
    
    }
    public render() {
      if (this.xLabel && this.yLabel) this.drawGrid()
      if (this.yLabel) {
        this.scene
        .attr('height', this.yLabel.length * this.grid.size - 55)
        this.renderYLabel()
      }
    

    }
    private renderYLabel() {

        this.scene
          .append('g')
          .attr('transform', `translate(${this.grid.size}, 10)`)
          .selectAll('text')
          .data(this.yLabel)
          .enter()
          .append('text')
          .attr('text-anchor', 'end')
          .attr('font-size', '10px')
          .attr('y', (_, i): number => {
            return i * (56 - i)
          })
          .text(d => {return d})

    }

    private drawGrid() {
      const scopedGroup = this.scene.append('g')
      scopedGroup
        .attr('transform', `translate(${this.grid.size + 10}, 0)`)
        .append('defs')

        .append('pattern')
        .attr('id', 'p10')
        .attr('width', this.grid.size)
        .attr('height', this.grid.size)
        .attr('patternUnits', 'userSpaceOnUse')

        .append('path')
        .attr('d', 'M 56 0 L 0 0 0 56')
        .attr('fill', 'none')
        .attr('stroke', 'skyblue')
        .attr('stroke-width', '2')

      scopedGroup
        .append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', 'url(#p10)')
    }
  }

}
export default Chart