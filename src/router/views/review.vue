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
      today: true,
      week: false,
      month: false,
      all: false,
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
            borderColor: '#0057d6',
            backgroundColor: '#0057d6',
            pointBackgroundColor: '#77b7cd',
            pointRadius: 4,
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                precision: 2, // точность округления значений по оси y
                maxTicksLimit: 4, // максимальное количество значений (и рёбер сетки) по оси y
              },
            },
          ],
          xAxes: [
            {
              display: true,
              ticks: {
                maxTicksLimit: 5, // максимальное количество значений (и рёбер сетки) по оси x
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      },
    }
  },
  methods: {
    toggleToday: function() {
      if (this.today === false) {
        this.week = false
        this.month = false
        this.all = false

        this.today = true
      }
    },
    toggleWeek: function() {
      if (this.week === false) {
        this.week = true
        this.month = false
        this.all = false

        this.today = false
      }
    },
    toggleMonth: function() {
      if (this.month === false) {
        this.week = false
        this.month = true
        this.all = false

        this.today = false
      }
    },
    toggleAll: function() {
      if (this.all === false) {
        this.week = false
        this.month = false
        this.all = true

        this.today = false
      }
    },
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
            <div class="btns_wrap">
              <button
                class="orders_tab_btn"
                :class="{ activeReviewTab: today }"
                @click="toggleToday"
                >Сегодня</button
              >
              <button
                class="orders_tab_btn"
                :class="{ activeReviewTab: week }"
                @click="toggleWeek"
                >Неделя</button
              >
              <button
                class="orders_tab_btn"
                :class="{ activeReviewTab: month }"
                @click="toggleMonth"
                >Месяц</button
              >
              <button
                class="orders_tab_btn"
                :class="{ activeReviewTab: all }"
                @click="toggleAll"
                >Всегда</button
              >
            </div>
            <div v-if="today" class="tab_item">
              <div class="chart_wrapper"
                ><BarChart :chartdata="chartData" :options="chartOptions"
              /></div>

              <div class="review_info_wrap">
                <div class="review_info_block">
                  <div class="review_info_block_title">
                    <div class="review_info_block_icn">
                      <img src="@assets/customers.svg" />
                    </div>
                    <div class="review_info_block_txt">
                      Пользователи
                    </div>
                  </div>
                  <div class="review_info_block_body">
                    <div class="review_info_block_item">
                      25
                    </div>
                    <div class="review_info_block_diff_more">
                      +5
                    </div>
                  </div>
                </div>
                <div class="review_info_block">
                  <div class="review_info_block_title">
                    <div class="review_info_block_icn">
                      <img src="@assets/orders.svg" />
                    </div>
                    <div class="review_info_block_txt">
                      Заказов
                    </div>
                  </div>
                  <div class="review_info_block_body">
                    <div class="review_info_block_item">
                      28
                    </div>
                    <div class="review_info_block_diff_less">
                      -2
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="week" class="tab_item">
              <div class="chart_wrapper"
                ><LineChart :chartdata="chartData" :options="chartOptions"
              /></div>

              <div class="review_info_wrap">
                <div class="review_info_block">
                  <div class="review_info_block_title">
                    <div class="review_info_block_icn">
                      <img src="@assets/customers.svg" />
                    </div>
                    <div class="review_info_block_txt">
                      Пользователи
                    </div>
                  </div>
                  <div class="review_info_block_body">
                    <div class="review_info_block_item">
                      25
                    </div>
                    <div class="review_info_block_diff_more">
                      +5
                    </div>
                  </div>
                </div>
                <div class="review_info_block">
                  <div class="review_info_block_title">
                    <div class="review_info_block_icn">
                      <img src="@assets/orders.svg" />
                    </div>
                    <div class="review_info_block_txt">
                      Заказов
                    </div>
                  </div>
                  <div class="review_info_block_body">
                    <div class="review_info_block_item">
                      28
                    </div>
                    <div class="review_info_block_diff_less">
                      -2
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="month" class="tab_item">
              <div class="chart_wrapper"
                ><LineChart :chartdata="chartData" :options="chartOptions"
              /></div>

              <div class="review_info_wrap">
                <div class="review_info_block">
                  <div class="review_info_block_title">
                    <div class="review_info_block_icn">
                      <img src="@assets/customers.svg" />
                    </div>
                    <div class="review_info_block_txt">
                      Пользователи
                    </div>
                  </div>
                  <div class="review_info_block_body">
                    <div class="review_info_block_item">
                      25
                    </div>
                    <div class="review_info_block_diff_more">
                      +5
                    </div>
                  </div>
                </div>
                <div class="review_info_block">
                  <div class="review_info_block_title">
                    <div class="review_info_block_icn">
                      <img src="@assets/orders.svg" />
                    </div>
                    <div class="review_info_block_txt">
                      Заказов
                    </div>
                  </div>
                  <div class="review_info_block_body">
                    <div class="review_info_block_item">
                      28
                    </div>
                    <div class="review_info_block_diff_less">
                      -2
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="all" class="tab_item">
              <div class="chart_wrapper"
                ><LineChart :chartdata="chartData" :options="chartOptions"
              /></div>

              <div class="review_info_wrap">
                <div class="review_info_block">
                  <div class="review_info_block_title">
                    <div class="review_info_block_icn">
                      <img src="@assets/customers.svg" />
                    </div>
                    <div class="review_info_block_txt">
                      Пользователи
                    </div>
                  </div>
                  <div class="review_info_block_body">
                    <div class="review_info_block_item">
                      25
                    </div>
                    <div class="review_info_block_diff_more">
                      +5
                    </div>
                  </div>
                </div>
                <div class="review_info_block">
                  <div class="review_info_block_title">
                    <div class="review_info_block_icn">
                      <img src="@assets/orders.svg" />
                    </div>
                    <div class="review_info_block_txt">
                      Заказов
                    </div>
                  </div>
                  <div class="review_info_block_body">
                    <div class="review_info_block_item">
                      28
                    </div>
                    <div class="review_info_block_diff_less">
                      -2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@design';
.btns_wrap {
  margin-top: 5px;
}
.tab_item {
  height: 65vh;
  overflow-y: auto;
}
.orders_active_tab_btn {
  padding: 8px 16px;
  margin-right: 15px;
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
.activeReviewTab {
  color: #fff;
  background-color: $primary-color;
}
.review_info_wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 16px;
  width: 100%;
  margin-top: 20px;
}
.review_info_block {
  min-height: 100px;
  padding: 16px 12px;
  border-top: 1px solid #e7e7eb;
  border-right: 1px solid #e7e7eb;
  border-bottom: 1px solid #e7e7eb;
}
.review_info_block_icn {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.review_info_block_title {
  display: flex;
  align-items: center;
}
.review_info_block_txt {
  color: #676b78;
}
.review_info_block_body {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 5px;
}
.review_info_block_item {
  margin-right: 5px;
  font-size: 32px;
}
.review_info_block_diff_more {
  color: #3ec0ad;
}
.review_info_block_diff_less {
  color: #ff6955;
}
</style>
