import * as d3 from 'd3'
class Graph {
  wrapp: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
  scene: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
  yLabelWrapp: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
  xLabelWrapp: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
  private rContent:  d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
  constructor(wrapp: string,
    
    public config: {
      yLabel: string[]
      xLabel: string[]
    }
    
    ) {

      this.wrapp = d3.select(wrapp).attr('class', 'flex')
      this.yLabelWrapp = this.wrapp.append('div').attr('class', 'flex flex-col')
      this.rContent = this.wrapp.append('div').attr('class', 'flex flex-col')
      this.scene = this.rContent.append('svg').attr('id', 'scene')
      this.xLabelWrapp = this.rContent.append('div')
      this.init()
  }

  private init() {
    this.eachLabel(this.config.yLabel, this.yLabelWrapp)
    this.eachLabel(this.config.xLabel, this.xLabelWrapp)
    this.render(this.scene)
  }


  private eachLabel(arr: string[], wrapp: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>) {
    for (let i = 0; i < arr.length; i++) {
      wrapp.append('span').text(arr[i])
    }
  }

  private render(scene: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
    const gridGroup = scene.append('g')
    const drawGrid = (index: number) => {
      gridGroup
      .append('rect')
      .attr('width', 56)
      .attr('height', 56)
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .attr('stroke-alignment', 'inner')
      .attr('x', 0)
      .attr('y', index * 56)
    }

    for (let i = 0; i < this.config.yLabel.length; i++) drawGrid(i)

    this.scene.attr('style', `height: ${this.config.yLabel.length * 56}px`)

  }

}

new Graph('#graph', {
  yLabel: ['test', 'test2', 'test3'],
  xLabel: ['test', 'test2', 'test3'],
})