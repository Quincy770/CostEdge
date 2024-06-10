<template>
  <vx-card title="">
        <h3 >{{$t('All registered companies')}}</h3>
    <vx-card id="internal-card" class="mt-10" title no-shadow card-border>    
      <loading :active.sync="isLoading" :can-cancel="true"></loading>
    <div class="chat__profile-search flex p-4 mt-6">
      <div id="dropdown">
        <vs-dropdown vs-custom-content vs-trigger-click>
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span class="mr-2"><p>{{(currentPage-1)*limit+1}}-{{currentPage*limit}} of {{total*limit}}</p></span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <vs-dropdown-menu>
            <vs-dropdown-item>
              <span @click="pageLimit(15)">15</span>
            </vs-dropdown-item>
            <vs-dropdown-item>
              <span @click="pageLimit(25)">25</span>
            </vs-dropdown-item>
            <vs-dropdown-item>
              <span @click="pageLimit(50)">50</span>
            </vs-dropdown-item>
            <vs-dropdown-item>
              <span @click="pageLimit(75)">75</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <div id="search" class="float-right">
        <vs-input
          :placeholder="$t('Search')"
          @keyup="search(searchCompany)"
          icon="icon-search"
          icon-pack="feather"
          class="w-full mx-2 input-rounded-full no-icon-border"
          v-model="searchCompany"
        />
      </div>
    </div>
    <vs-table  class="stripe" :max-items="currentPage" :data="companies">
      <template slot="thead">
        <vs-th>#</vs-th>
        <vs-th class="p-4" sort-key="companyName">{{$t('companyName')}}</vs-th>
        <vs-th class="p-0" sort-key="licenceNumber">{{$t('licenceNumber')}}</vs-th>
        <vs-th class="p-0" sort-key="tinNumber">{{$t('tinNumber')}}</vs-th>
        <vs-th class="p-0" sort-key="companyStatus">{{$t('Status')}}</vs-th>
        <vs-th class="p-0" sort-key="region">{{$t('Address')}}</vs-th>
        <vs-th class="p-0" >{{$t('Edit')}}</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr  :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td 
            >{{indextr+1}}</vs-td>
          <vs-td class=" p-4" :data="data[indextr].companyName">{{data[indextr].companyName}}</vs-td>
          <vs-td class="p-0" :data="data[indextr].licenceNumber">{{data[indextr].licenceNumber}}</vs-td>
          <vs-td class="p-0" :data="data[indextr].tinNumber">{{data[indextr].tinNumber}}</vs-td>
          <vs-td class="p-0" :data="data[indextr].companyStatus">{{data[indextr].companyStatus}}</vs-td>
          <vs-td class="p-0" :data="data[indextr].region">{{data[indextr].region}} {{data[indextr].woredaCity}} {{data[indextr].street}}</vs-td>
          <vs-td class="p-0" :data="data[indextr].id">
            <span @click="updateCompany(data[indextr].companyId)">
              <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
            </span>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <vs-pagination class="m-5" @change="pagination()" :total="total" v-model="currentPage"></vs-pagination>
  </vx-card>
  </vx-card>
</template>
<script>
import router from "@/router";
import Loading from "vue-loading-overlay";
// // Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components:{
   Loading
  },
  data() {
    return {
      selected: [],
      companies: [],
      limit: 15,
      currentPage: 1,
      total: 0,
      searchCompany: "",
      isLoading:false
    };
  },
  methods: {
    search: function(searchKey) {
      this.isLoading=true
      this.$http
        .post(
          "/company/search",
          {
            searchKey: searchKey
          },
          { params: { page: this.currentPage, limit: this.limit } }
        )
        .then(response => {
          this.isLoading=false
          this.companies = response.data;
          this.total = thisIns.companies[0].totalPages;
        }).catch(error=>{
          this.isLoading=false
        })
    },
    pageLimit: function(limit) {
      this.limit = limit;
      this.pagination();
    },
    pagination: function() {
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/company", {
          params: { page: this.currentPage, limit: this.limit }
        })
        .then(function(response) {
              thisIns.isLoading=false
              thisIns.companies = response.data;
              thisIns.total = thisIns.companies[0].totalPages;
              thisIns.$store.dispatch('company/populateCompany',response.data);
        }).catch(error=>{
          thisIns.isLoading=false
        })
    },

    updateCompany: function(id) {
      this.$router.push({ path: "/pages/update-company/" + id });
    }
  },
  created() {
    this.pagination()
  }
};
</script>
<style  lang='scss' scoped>
#search {
  margin-left: 500px;
  width: 300px;
}
#dropdown {
  width: 500px;
}
.loader-overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.1);
        z-index: 999;
        cursor: pointer;
        span.text {
            display: inline-block;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            color: #fff;
        }
        .loader {
            animation: loader-animate 1.5s linear infinite;
            clip: rect(0, 80px, 80px, 40px);
            height: 80px;
            width: 80px;
            position: absolute;
            left: calc(50% - 40px);
            top: calc(50% - 40px);
            &:after {
                animation: loader-animate-after 1.5s ease-in-out infinite;
                clip: rect(0, 80px, 80px, 40px);
                content: '';
                border-radius: 50%;
                height: 80px;
                width: 80px;
                position: absolute;
            }
        }
        @keyframes loader-animate {
            0% {
                transform: rotate(0deg)
            }
            100% {
                transform: rotate(220deg)
            }
        }
        @keyframes loader-animate-after {
            0% {
                box-shadow: inset #fff 0 0 0 17px;
                transform: rotate(-140deg);
            }
            50% {
                box-shadow: inset #fff 0 0 0 2px;
            }
            100% {
                box-shadow: inset #fff 0 0 0 17px;
                transform: rotate(140deg);
            }
        }
    }
    #search {
    margin-left: 500px;
    width: 300px;
    }
    #dropdown {
      width: 500px;
      margin-left: 50px;
    }
</style>