<script>
import appConfig from '@src/app.config'
// import axios from 'axios'
import Menu from '@layouts/menu.vue'
import Header from '@layouts/header.vue'
import BarChart from '@components/bar_chart.vue'
import LineChart from '@components/line_chart.vue'
export default {
  page: {
    title: 'Обзор',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Header, Menu, BarChart, LineChart },
  data() {
    return {
      chartData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Data One',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
}
</script>

<template>
  <div class="wrapper">
    <div class="screen">
      <Header></Header>
      <div class="row height_wrap">
        <Menu></Menu>
        <div class="col-10 main_screen">
          <div class="main_screen_title">
            Обзор
          </div>
          <div class="row">
            <div>
              <b-card no-body>
                <b-tabs
                  pills
                  active-nav-item-class="orders_active_tab_btn"
                  nav-item-class="orders_tab_btn"
                  no-nav-style
                >
                  <b-tab title="Сегодня" active>
                    <BarChart :chartdata="chartData" :options="chartOptions"/>
                    <div class="review_info_wrap">
                      <div class="review_info_block"></div>
                      <div class="review_info_block"></div>
                      <div class="review_info_block"></div>
                      <div class="review_info_block"></div> </div
                  ></b-tab>
                  <b-tab title="Неделя"
                    ><LineChart
                      :chartdata="chartData"
                      :options="chartOptions"
                    />
                    <div class="review_info_wrap">
                      <div class="review_info_block"></div>
                      <div class="review_info_block"></div>
                      <div class="review_info_block"></div>
                      <div class="review_info_block"></div>
                    </div>
                  </b-tab>
                  <b-tab title="Месяц"
                    ><LineChart
                      :chartdata="chartData"
                      :options="chartOptions"
                    />
                    <div class="review_info_wrap">
                      <div class="review_info_block"></div>
                      <div class="review_info_block"></div>
                      <div class="review_info_block"></div>
                      <div class="review_info_block"></div>
                    </div>
                  </b-tab>
                  <b-tab title="Всегда"
                    ><LineChart
                      :chartdata="chartData"
                      :options="chartOptions"
                    />
                    <div class="review_info_wrap">
                      <div class="review_info_block"></div>
                      <div class="review_info_block"></div>
                      <div class="review_info_block"></div>
                      <div class="review_info_block"></div>
                    </div>
                  </b-tab>
                </b-tabs>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@design';
.tab-pane {
  height: 65vh;
  padding-bottom: 20px;
  overflow-y: auto;
}
.orders_active_tab_btn {
  padding: 8px 16px;
  color: #fff;
  background-color: $primary-color;
  border-radius: 8px;
}
.orders_tab_btn {
  padding: 8px 16px;
  margin-right: 15px;
  font-size: 15px;
  color: $color-text;
  background-color: #eaeaef;
  border-radius: 8px;
}
.review_info_wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 16px;
  width: 100%;
}
.review_info_block {
  min-height: 100px;
  padding: 16px 12px;
  background: #fff;
  border-top: 1px solid #e7e7eb;
  border-right: 1px solid #e7e7eb;
  border-bottom: 1px solid #e7e7eb;
}
</style>
