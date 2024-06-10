<template>
    <div>        
            <div class="row">
                <div class="col-md-12">
                    <table id="conversation" class="table table-striped">
                        <thead>
                            <tr>
                                <th>Testing Socket Programming..........</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in received_messages" :key="item">
                                <td>{{ item }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "websocketdemo",
  data() {
    return {
      received_messages: [],
      allNotifications: [],
    };
  },
  methods: {
      send() {
            console.log("Send message:" + this.send_message);
            if (this.stompClient && this.stompClient.connected) {
              const msg = { name: "Ashu" };
              this.stompClient.send("/app/hello", JSON.stringify(msg), {});
            }
          },
          connect() {
            this.socket = new SockJS("http://localhost:8081/gs-guide-websocket");
            this.stompClient = Stomp.over(this.socket);
            this.stompClient.connect(
              {},
              frame => {
                this.connected = true;
                this.send();
                console.log(frame);
                this.stompClient.subscribe("/topic/greetings", tick => {
                this.received_messages.push(JSON.parse(tick.body));  
                this.allNotifications = this.received_messages[0]
                });
              },
              error => {
                console.log(error);
                this.connected = false;
              }
            );
          },
  },

  created(){
    this.connect()
  },
  mounted() {
  }
};
</script>

<style scoped>

</style>