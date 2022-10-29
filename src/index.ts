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
      this.rContent = this.wrapp.append('div').attr('class', 'flex flex-col')
      this.scene = this.rContent.append('svg').attr('id', 'scene')
      this.init()
  }

  private init() {
    // this.eachLabel(this.config.yLabel, this.yLabelWrapp)
    // this.eachLabel(this.config.xLabel, this.xLabelWrapp)
    this.render(this.scene)
  }


  private eachLabel(arr: string[], wrapp: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>) {
    this.scene.append('g')
  }

  private render(scene: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
    let cols: any  = []
    const gridGroup = scene.append('g')
    for (let i = 0; i < this.config.xLabel.length; i++) {      
      cols.push(gridGroup.append<"g">('g'))
    }
    const drawGrid = (x: number, y: number) => {
      cols[x].attr('transform', `translate(${x * 56}, 0)`)
      cols[x]
      .append('rect')
      .attr('width', 56)
      .attr('height', 56)
      .attr('fill', 'none')
      .attr('stroke', 'skyblue')
      .attr('stroke-alignment', 'inner')
      .attr('x', 0)
      .attr('y', y * 56)
    }
    for (let x= 0; x < this.config.xLabel.length; x++) {
      for (let y = 0; y < this.config.yLabel.length; y++) drawGrid(x,y)
    }

    this.scene.attr('style', `height: ${this.config.yLabel.length * 56}px; width: ${this.config.xLabel.length * 56}px`)

  }

}

new Graph('#graph', {
  yLabel: ['15 000', '10 000', '5 000', '0', '-5 000'],
  xLabel: ["Янв' 21", "Фев' 21", "Мар' 21", "Апр' 21", "Май' 21", "Июн' 21", "Июн' 21","Авг' 21", "Сен' 21", "Окт' 21", "Ноя' 21", "Дек' 21"] ,
})