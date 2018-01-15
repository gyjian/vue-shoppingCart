new Vue({
  el: '.container',
  data: {
    limitNum: 3,
    addressList: [],
    currentIndex: 0,
    shippingMethod: 1,
    showOverLay:false,
    delFlag:false,

    newusername:"",
    newstreetname:"",
    newtel:"",
    id:100006
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getAddressList();
    });
  },
  computed:{
    filterAddress:function(){
     return this.addressList.slice(0,this.limitNum);
    }
  },
  methods: {
    getAddressList: function() {
       axios.get("http://localhost:3000/result").then(res=> {
          	this.addressList = res.data.results;
          	//this.totalMoney = res.data.totalMoney;
        });
    },
    loadMore:function(){
      if (this.limitNum==3) {
        this.limitNum=this.addressList.length;
      }else{
        this.limitNum=3;
      }
    },
    setDefault:function(addressId){
      this.addressList.forEach((address,index)=>{
        if (address.addressId==addressId) {
          address.isDefault=true;
        }else{
          address.isDefault=false;
        }
      });
    },
    addConfirm:function(item){
      this.showOverLay=true;
      this.newusername=item.userName;
      this.newstreetname=item.streetName;
      this.newtel=item.tel;
      
    },
    addProduct:function(){
      var username=this.newusername;
      var streetname=this.newstreetname;
      var tel=this.newtel;
      if (!username&&!streetname&&!tel) {
        return;
      }
      this.addressList.push({
        "addressId": this.id++,
        "userName": username,
        "streetName":streetname,
        "tel":tel,
        "isDefault":false
      });
      this.showOverLay=false;
      this.newusername="";
      this.newstreetname="";
      this.newtel="";
    },
    delConfirm:function(item){
      this.delFlag=true;
      this.delcurProduct=item;
    },
     delProduct: function(){
      var index = this.addressList.indexOf(this.delcurProduct);
      this.addressList.splice(index, 1);
      this.delFlag = false;
    }
    
  }
});