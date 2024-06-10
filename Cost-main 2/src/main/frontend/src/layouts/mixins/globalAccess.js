import axios from 'axios'
import Vue from 'vue';
// import $ from 'jquery'
// import Window from 'window'
// var window.iAmGlobal = "some val";
Vue.prototype.$dataConfiguration = "axios"

export default {
        data(){
            return {
                applicationBackgroundColor: 'background-color: #29539b; background-image: linear-gradient(315deg, #6daddb 0%, #1e3b70 74%)',//'#537895'//'#1E3F68',//'linear-gradient(to bottom, #cadaf0, #d0dcef, #d6deee, #dbe0ed, #e0e2ec)',
                emrBackgroundColor: '#629191',
                daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                perPage: 25,
                currentPage: 1,
                format: "yyyy-MM-dd",
                specificSearchKeyLength: 3,
                genders: ["Male", "Female"],
                onlineBackendAddress: 'http://192.168.1.100:8081',
                pickUp: "",
                readyForPickUp: 'Ready For Pickup',
                ordered: 'Ordered',
                pickedUp: 'Picked Up',
                configdateTimePicker: {
                  enableTime: true,
                  dateFormat: "Y-m-d H:i",
                  position: "auto"
                },
            }
        },
        methods: {
            arrayEquals(a, b) {
                return Array.isArray(a) &&
                Array.isArray(b) &&
                a.length === b.length &&
                a.every((val, index) => val === b[index]);
            },
            adjustSelectHeight(){
                window.setTimeout(function() {
                $('.vs-select--input').css('height', '28px')
                }, 30);
            },
            isGranted(action){
                // return;
                // alert(action);
                // const assignedCollectionSiteIds = localStorage.getItem('assignedCollectionSiteIds');
                // const grantedPrivileges = localStorage.getItem('grantedPrivileges');
                // var allPrivileges=JSON.parse(localStorage.getItem('allPrivileges'));
                // alert(grantedPrivileges)
                // if((allPrivileges!=null && allPrivileges.filter(p=>p.privilegeName==action).length>0 && !grantedPrivileges.includes(action)))
                //     return false;
                // else
                    return true;
            },
            getDaysInMonth(month, year) {
               return new Date(year, month, 0).getDate();
            },
            getInstantFromDate(dateValue) {
                if(JSON.stringify(dateValue).indexOf('Z')>0)
                return;
                let processedDate = dateValue + ":00Z";
                return processedDate;
            },
            getDateFormatted(date){
                return new Date(date).toLocaleDateString(['en-US'],{timeZone: "Africa/Addis_Ababa", month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})
            },
        }
    }
