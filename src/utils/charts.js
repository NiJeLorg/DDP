const PIE_CHART_CONFIG = {
  colors: ['#ADC8EF', '#D5D654', '#FF9E15', '#009382', '#00A0DF'],
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    width: 200,
    height: 200,
  },
  title: {
    text: ''
  },
  subtitle: {
    text: ''
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  },
  legend: {
    enabled: false
  },
  tooltip: {
    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
    shared: true,
    useHTML: true,
    borderColor: null,
    followPointer: true,
  },
  series: [{
    name: 'Education Level',
    colorByPoint: true,
    data: [{
      name: 'No Degree',
      y: 56.33
    }, {
      name: 'High School',
      y: 24.03,
    }, {
      name: 'Some College',
      y: 10.38
    }, {
      name: 'Bachelors',
      y: 4.77
    }, {
      name: 'Post Grad',
      y: 0.91
    }]
  }]
};

export default {
  PIE_CHART_CONFIG,
};