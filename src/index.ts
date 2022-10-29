import * as d3 from 'd3'
class Graph {
  wrapp: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
  scene: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
  yLabelWrapp: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
  xLabelWrapp: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
  gridGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>
  private rContent:  d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
  private path: d3.Path = d3.path()
  private indent: {top: number,  right: number, bottom: number, left: number,  }
  constructor(wrapp: string,
    
    public config: {
      yLabel: string[]
      xLabel: string[]
    }
    
    ) {


      this.wrapp = d3.select(wrapp).attr('class', 'flex')
      this.rContent = this.wrapp.append('div').attr('class', 'flex flex-col')
      this.scene = this.rContent.append('svg').attr('id', 'scene')
      this.gridGroup = this.scene.append('g').attr('id', 'grid')

      this.indent = {
        top: 0,  right: 0, bottom: 0, left: 0,
      }
      this.init()
  }

  private init() {
    this.render()
  }
  
  
  private render() {

    this.renderYLabel()
    this.renderXLabel()

    this.scene.attr('style', `
      height: ${(this.config.yLabel.length * 56) + this.indent.bottom}px;
      width: ${(this.config.xLabel.length * 56) + this.indent.left}px;
    `)

    this.drawGrid(this.scene)
    
  }

  private drawGrid(scene: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
    let cols: any[]  = []
    
    const
    xLabel = this.config.xLabel,
    yLabel = this.config.yLabel
    
    
    for (let i = 0; i < xLabel.length; i++) {      
      cols.push(this.gridGroup.append<"g">('g'))
    }
    const drawGrid = (x: number, y: number) => {
      cols[x]
      .attr('transform', `translate(${x * 56}, 0)`)
      .attr('stroke', 'skyblue')
      .attr('fill', 'none')
      .attr('stroke-alignment', 'inner')
      .append('rect')
      .attr('width', 56)
      .attr('height', 56)
      .attr('x', 0)
      .attr('y', y * 56)
    }
    for (let x= 0; x < xLabel.length; x++) {
      for (let y = 0; y < yLabel.length - 1; y++) drawGrid(x,y)
    }


  }

  private renderYLabel() {
    this.indent.left = 56
    this.gridGroup.attr('transform', `translate(${this.indent.left}, ${56})`)
    const labelWrapper = this.scene.append('g')
    
    for (let i = 0; i < this.config.yLabel.length; i++) {
      labelWrapper.append('text')
      .text(this.config.yLabel[i])
      .attr('x', 56 - 10)
      .attr('y', i * 56 + 56)
      .attr('text-anchor', 'end')
      .attr('font-size', '10px')
    }

  }


  private renderXLabel() {
    this.indent.bottom = 56
    const group = this.scene.append('g')
    group.attr('transform', `translate(${this.indent.left}, ${(56 * this.config.yLabel.length) + 20 })`)
    for (let i = 0; i < this.config.xLabel.length; i++) {
      group.append('text')
      .text(this.config.xLabel[i])
      .attr('y', 0)
      .attr('x', i * 56)
      .attr('font-size', '10px')
    }
  }
}

new Graph('#graph', {
  yLabel: ['15 000', '10 000', '5 000', '0', '-5 000'],
  xLabel: ["Янв' 21", "Фев' 21", "Мар' 21", "Апр' 21", "Май' 21", "Июн' 21", "Июн' 21","Авг' 21", "Сен' 21", "Окт' 21", "Ноя' 21", "Дек' 21"],
})