<template>
  <div>
    <div>
      <h3>{{dataSet.length}}</h3>
      <a-button type="primary" @click="loadProfiles">Load data from Backend</a-button>
    </div>
     <div class="filterBar">
      <a-select :value="location" style="width: 120px" @change="handleLocationChange">
        <a-select-option value="Bangladesh">Bangladesh</a-select-option>
        <a-select-option value="China">China</a-select-option>
        <a-select-option value="United States">United States</a-select-option>
        <a-select-option value="Hong Kong">Hong Kong</a-select-option>
        <a-select-option value="SRI LANKA">SRI LANKA</a-select-option>
        <a-select-option value="Quarry">Quarry</a-select-option>
        <a-select-option value="Australia">Australia</a-select-option>
      </a-select>
    </div>
    <hr>
    <div>
        <a-row class="itemRow" v-for="(item,index) in showItems" :key="item.company_id + index">
            <a-col :span="4">
              <img class="logo" :src="item.image_url">
            </a-col>
            <a-col :span="4">
              <span>{{item.company_name}}</span>
            </a-col>
             <a-col :span="4">
              <span>{{item.primary_location}}</span>
            </a-col>
            <a-col :span="4">
              <span>{{item.description}}</span>
            </a-col>
             <a-col :span="4">
              <span>{{item.link_count}}</span>
             </a-col>
             <a-col :span="4">
              <span>{{item.degree_type}}</span>
             </a-col>
        </a-row>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return {
            dataSet: [],
            showItems: [],
            location: ''
        }
    },
  methods: {
    loadProfiles() {
     let self = this;
      axios.get("/api/profiles").then(result => {
        self.dataSet = self.dataSet.concat(result.data);
        self.showItems = self.dataSet.slice(0,20);
      });
    },
    handleLocationChange(value){
      console.time('filter');
      const filter_result = this.dataSet.filter((item)=>{
        if(!item.degree){
          if(item.degree_type === '2nd'){
            item.degree = 1;
          }else if(item.degree_type === '3rd'){
            item.degree = 2;
          }else{
            item.degree = 3;
          }
        }
        return item.primary_location === value;
      });

      filter_result.sort((a, b)=>{
        if(a.degree > b.degree){
          return 1;
        }
        if(a.degree < b.degree){
          return -1;
        }
        if(a.degree === b.degree){
          return a.link_count - b.link_count;
        }
      });
      console.timeEnd('filter');
      this.showItems = filter_result.slice(0,20);;
    },
    
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
    .filterBar{
      display: flex;
      justify-content: flex-start;
      padding: 20px;
    }

</style>