<template>
<div class="file">
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
    <div class="fields"></div>
        <input type="file" ref="file" name="file" @change="onSelect" />
        
        <button type="button" v-on:click="onSubmit()">Upload</button>
    </form>
</div>
</template>
<script>
export default {
  name: 'FileUpload',
  data(){
      return{
       file:"",
       message:"",
      }
  },
  methods:{
      onSelect(){
        const file=this.$refs.file.files[0];
        this.file=file;
      },
      async onSubmit(){
          let userId=localStorage.getItem('userId');
          const formData=new FormData();
          formData.append('profilePicture',this.file);
          formData.append('userId',userId);  
          try{
            this.$http.post("/accounts/uploadprofile",formData).then(response=>{
              console.log(response);
            });
          }catch(error){

          }
      }
  }
}
</script>