import Chart from "./ts/chart.name";

const spline = new Chart.Spline('#graph', {
  
  yLabel: ['test', 'test2', 'test3', 'test4'],
  xLabel: ['test', 'test2', 'test3', 'test4', 'test5','test6',],
  grid: {
    size: 56,
  },
  asymptotes: [
    {
      points: [
        { x: 0, y: 0 },
        { x: 2, y: 4 },
      ],
      color: '#000',
    },
  ]
})
spline.render()