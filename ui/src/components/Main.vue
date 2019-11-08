<template>
  <div>
    <span>{{items.length}}</span>
    <button @click="loadProfiles">Load data from Backend</button>
    <hr>
    <div>
        <div class="itemRow" v-for="item in showItems" :key="item.company_id">
            <img class="logo" :src="item.image_url">
            <span>{{item.company_name}}</span>
            <span>{{item.primary_location}}</span>
            <span>{{item.description}}</span>
            <span>{{item.link_count}}</span>
            <span>{{item.degree_type}}</span>
        </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return {
            items: [],
            showItems: []
        }
    },
  methods: {
    loadProfiles() {
     let self = this;
      axios.get("/api/profiles").then(result => {
        self.items = result.data;
        self.showItems = self.items.slice(0,20);
      });
    }
  }
};
</script>
<style scoped>
    .itemRow{
        display: flex;
        border-bottom: 1px solid grey;
        padding: 10px;
        justify-content: space-between;
    }
    .logo{
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }
    span{
        max-width:300px; 
    }
</style>