const PIE_CHART_CONFIG = {
  colors: ['#00A0DF', '#D5D654', '#FF9E15', '#009382', '#ADC8EF'],
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    width: 300,
    height: 300,
  },
  exporting: {
    chartOptions: { // specific options for the exported image
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          }
        }
      },

    },
    buttons: {
      contextButton: {
        menuItems:['downloadJPEG', 'downloadPNG', 'downloadCSV', 'downloadXLS', 'downloadPDF']
      }
    },
    fallbackToExportServer: false
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
    shared: false,
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

const AREA_CHART_CONFIG = {
  chart: {
    type: 'area',
    width: 250,
    height: 250,
  },
  exporting: {
    chartOptions: { // specific options for the exported image
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          }
        }
      },

    },
    buttons: {
      contextButton: {
        menuItems:['downloadJPEG', 'downloadPNG', 'downloadCSV', 'downloadXLS', 'downloadPDF']
      }
    },
    fallbackToExportServer: false
  },
  title: {
    text: ''
  },

  xAxis: {
    allowDecimals: false,
  },
  yAxis: {
    title: {
      text: ''
    },
    labels: {
      formatter: function () {
        return this.value / 1000 + 'k';
      }
    }
  },
  plotOptions: {
    area: {
      pointStart: 2011,
      fillOpacity: 0.3
    }
  },
  tooltip: {
    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:,.0f}</b>',
    shared: false,
    useHTML: true,
    borderColor: null,
    followPointer: true,
  },
  series: []
};



export default {
  PIE_CHART_CONFIG,
  AREA_CHART_CONFIG
};