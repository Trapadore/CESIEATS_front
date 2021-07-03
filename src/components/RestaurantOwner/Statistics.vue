<template>
    <v-container>
        <v-row>
            <v-col>
                <apexchart
                    width="100%"
                    type="bar"
                    :options="barOptions"
                    :series="barSeries"
                    title="barchart"
                ></apexchart>
            </v-col>
            <v-col>
                <apexchart
                    width="100%"
                    type="line"
                    :options="lineChartOptions"
                    :series="lineChartSeries"
                    title=""
                ></apexchart>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";

Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);

export default {
    data: () => ({
        barOptions: {
            chart: {
                id: "barchart",
                foreColor: "#ffffff",
            },
            xaxis: {
                categories: ["janvier", "février", "mars", "avril", "mai", "juin"],
            },
        },
        barSeries: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60],
            },
        ],
        lineChartOptions: {
            chart: {
                id: "linechart",
                foreColor: "#ffffff",
            },
            xaxis: {
                categories: ["janvier", "février", "mars", "avril", "mai", "juin"],
            },
        },
        lineChartSeries: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60],
            },
        ],
    }),
};
</script>
