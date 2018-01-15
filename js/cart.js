new Vue({
	el:'#app',
	data:{
		totalMoney: 0,
		productList: [],
		checkAllFlag:false,
		delFlag:false,
		curProduct: ''
	},
	filters:{
		formatMoney:function(value,type){
			return "￥"+value.toFixed(2)+type;
		}
	},
	mounted: function () {
		this.$nextTick(function(){
			this.cartView();
		});
	},
	methods:{
	  cartView: function() {
        axios.get("http://localhost:3000/result").then(res=> {
          	this.productList = res.data.list;
          	//this.totalMoney = res.data.totalMoney;
        });
      },
      changeMoney:function(product,way){
      	if(way>0){
      		product.productQuantity++;
      	}else{
      		product.productQuantity--;
      		if (product.productQuantity<1) {
      			product.productQuantity=1;
      		}
      	}
      	this.calcTotalPrice();
      },
      selectedProduct:function(item){
		if (typeof item.checked=='undefined') {
			//Vue.set(item,"checked",true);
			this.$set(item, "checked", true);
		}else{
			item.checked = !item.checked;
		}
		this.calcTotalPrice();
	},
	  checkAll:function(flag){
		this.checkAllFlag=flag;
		this.productList.forEach((item,index)=>{
			if (typeof item.checked=='undefined') {
				this.$set(item,"checked",this.checkAllFlag);
			}else{
				item.checked=this.checkAllFlag;
			}
		});
		this.calcTotalPrice();
	  },
	  calcTotalPrice:function(){
	  	this.totalMoney=0;
	  	this.productList.forEach((item,index)=>{
			if (item.checked) {
				this.totalMoney+=item.productPrice*item.productQuantity;
			}
		});
	  },
	  delConfirm:function(item){
	  	this.delFlag=true;
	  	this.curProduct=item;
	  },
	  delProduct: function(item){
	  	var index = this.productList.indexOf(this.curProduct);
	  	this.productList.splice(index, 1);
	  	this.delFlag = false;
	  }
	}
});
