<script>
    import Chart from 'svelte-frappe-charts';
  
    let data = {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
      
        datasets: [
            {
                name: "Pain level",
                chartType: "line",
                values: [1, 1, 3, 9, 8, 10, 1]
            }

            // {
            // values: [1, 1, 3, 9, 8, 5, 9]
            // }
        ],

    };

</script>

<Chart data={data} height={300} title={""} axisOptions={{xAxisMode: 'tick'}} lineOptions={{spline: 1}} />