import Graph from './ts/graph.name'


const graph = new Graph.Spline('#graph', {
  yLabel: ['15 000', '10 000', '5 000', '0', '-5 000'],
  xLabel: ["Янв' 21", "Фев' 21", "Мар' 21", "Апр' 21", "Май' 21", "Июн' 21", "Июн' 21","Авг' 21", "Сен' 21", "Окт' 21", "Ноя' 21", "Дек' 21"],
})
graph.init()