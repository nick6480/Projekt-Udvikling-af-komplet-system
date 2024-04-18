// Handeling the graphs
export default class GraphHandler {
    constructor(element, data) {
        this.element = element
        this.data = data
    }


    newChart(){ // Creates new Chart
        
        // setup 
        const data = {
            labels: ['0', '1', '2', '3', '4', '5', '6', "7", "8","9"],
            datasets: [{
            label: '',
            data: this.data,
            fill: true, 
            backgroundColor: "rgba(125, 42, 232, 0.7)",
            borderWidth: 1
            }]
        };
    
        // config 
        const config = {
            type: 'line',
            data,
            options: {
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: "#595959"
                    }
                    
                  },
                  x: {
                    
                    grid: {
                        color: "#595959"
                    }
                  }
                },
                plugins: {
                    legend: {
                        display: false,
                    }
                }
              }
        };

        this.chart = new Chart(this.element, config);

    }

    newValue(value){ //Update the chart

        this.chart.data.datasets.forEach((dataset) => {
            if (dataset.data.length == this.chart.data.labels.length)
                dataset.data.shift();  

            dataset.data.push(value);

        });
        this.chart.update();
    }


}



