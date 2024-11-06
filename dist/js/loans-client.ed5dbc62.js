"use strict";(self["webpackChunkprestamos_app"]=self["webpackChunkprestamos_app"]||[]).push([[178],{1715:function(t,e,a){a.d(e,{Z:function(){return d}});var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"o-card",on:{click:function(e){return t.goToLoan()}}},[e("div",{staticClass:"o-card-header"},[e("div",{staticClass:"d-flex align-items-center o-card__name"},[e("f-icon",{staticClass:"o-card__icon",attrs:{icon:"fa-circle-dollar-to-slot"}}),e("p",{staticClass:"o-card__title pl-2"},[t._v(t._s(t.name))])],1),e("p",{staticClass:"o-card__text-gray"},[t._v(t._s(t._f("formatDate")(t.loan.date)))])]),e("div",{staticClass:"d-flex justify-content-end o-card__total"},[e("p",[t._v("$ "+t._s(t._f("formatNumber")(t.loan.balance)))])]),e("div",{staticClass:"o-card-body"},[e("div",{staticClass:"d-flex align-items-center justify-content-between"},[e("p",[t._v("Pagado:")]),e("p",{staticClass:"text-book"},[t._v("$ "+t._s(t._f("formatNumber")(t.total)))])]),e("div",{staticClass:"d-flex align-items-center justify-content-between"},[e("p",[t._v("Saldo:")]),e("p",{staticClass:"text-danger text-book"},[t._v("$ "+t._s(t._f("formatNumber")(t.balance(t.loan.balance))))])]),e("div",{staticClass:"d-flex align-items-center justify-content-between"},[e("p",{staticClass:"o-card__text-gray"},[t._v("Abonos: "+t._s(t.numPaid)+" de "+t._s(t.totalFees))])])])])},s=[],o=a(6973),l=a(3822),i={props:{loan:{type:Object},name:{type:String},backRoute:{type:String}},data(){return{uc:new o.Z,fees:[],total:0,numPaid:0}},computed:{totalFees(){return this.fees.length}},methods:{getFees(){this.fees=this.uc.getFeesByLoan(this.loan.id);const t=this.uc.getTotalFees(this.loan.id);this.total=t.total,this.numPaid=t.numPaid},goToLoan(){this.setBackRoute(this.backRoute),this.setLoanSelected(this.loan),this.$router.push("/detail-loan")},balance(t){return t-this.total},...(0,l.OI)("loansStore",["setBackRoute","setLoanSelected"])},created(){this.getFees()}},r=i,c=a(1001),u=(0,c.Z)(r,n,s,!1,null,null,null),d=u.exports},5365:function(t,e,a){a.r(e),a.d(e,{default:function(){return p}});var n=function(){var t=this,e=t._self._c;return e("div",[e("title-general",{attrs:{title:"Prestamos del cliente",buttonBack:"/detail-client"}}),e("p",{staticClass:"text-white-title ml-4"},[t._v(t._s(t.clientSelected.name))]),e("content-general",{attrs:{buttonText:"Nuevo Préstamo",buttonAction:t.goToSaveLoan}},t._l(t.loans,(function(a){return e("loan-row",{key:a.id,attrs:{loan:a,name:t.clientSelected.name,"back-route":"/detail-client"}})})),1)],1)},s=[],o=a(3923),l=a(1782),i=a(7695),r=a(3822),c=a(1715),u={components:{TitleGeneral:o.Z,ContentGeneral:l.Z,LoanRow:c.Z},data(){return{loans:[],uc:new i.Z}},computed:{...(0,r.rn)("clientsStore",["clientSelected"])},methods:{getLoans(){this.loans=this.uc.getLoansByClient(this.clientSelected.id)},goToSaveLoan(){this.$router.push("save-loan")}},created(){this.getLoans()}},d=u,h=a(1001),f=(0,h.Z)(d,n,s,!1,null,null,null),p=f.exports},1782:function(t,e,a){a.d(e,{Z:function(){return c}});var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"l-general",class:t.classWButton},[e("div",{staticClass:"l-content"},[t._t("default"),t.buttonText?e("div",{staticClass:"l-button"},[e("button",{staticClass:"button-general",on:{click:function(e){return t.buttonAction()}}},[t._v(" "+t._s(t.buttonText)+" ")])]):t._e()],2)])},s=[],o={props:{buttonText:{type:String,default:""},buttonAction:{type:Function,default:()=>{}},isSearch:{type:Boolean,default:!1},hasFilters:{type:Boolean,default:!1}},computed:{showButton(){return this.buttonText},classWButton(){let t="";return this.showButton&&(t+="l-general--button "),this.isSearch&&(t+="l-general--search "),this.hasFilters&&(t+="l-general--filters "),t}}},l=o,i=a(1001),r=(0,i.Z)(l,n,s,!1,null,null,null),c=r.exports},6973:function(t,e,a){a.d(e,{Z:function(){return r}});var n=a(714),s=a(8829),o=a(2575),l=a(9844),i=new WeakMap;class r{constructor(){(0,n.Z)(this,i,{writable:!0,value:void 0}),(0,o.Z)(this,i,new l.Z)}addFee(t,e,a,n){let o="";return o=n?(0,s.Z)(this,i).updateFee(t,e,n):(0,s.Z)(this,i).addFeeToLocal(t,e,a),o}getFeesByLoan(t){return(0,s.Z)(this,i).getFeesByLoan(t)}getTotalFees(t){return(0,s.Z)(this,i).getTotalFees(t)}paidFee(t){return(0,s.Z)(this,i).paidFee(t)}deleteFee(t){return(0,s.Z)(this,i).deleteFee(t)}possibleDateFee(t,e){return(0,s.Z)(this,i).possibleDateFee(t,e)}paidAmountFee(t,e){return(0,s.Z)(this,i).paidAmountFee(t,e)}getFeesByDate(t,e){return(0,s.Z)(this,i).getFeesByDate(t,e)}}},7695:function(t,e,a){a.d(e,{Z:function(){return u}});var n=a(714),s=a(8829),o=a(2575),l=a(9844),i=a(4527),r=new WeakMap,c=new WeakMap;class u{constructor(){(0,n.Z)(this,r,{writable:!0,value:void 0}),(0,n.Z)(this,c,{writable:!0,value:void 0}),(0,o.Z)(this,r,new i.Z),(0,o.Z)(this,c,new l.Z)}getLoansByClient(t){return(0,s.Z)(this,r).getLoansByClient(t)}getLoanById(t){return(0,s.Z)(this,r).getLoanById(t)}getAllLoans(t,e){return(0,s.Z)(this,r).getLoansFromLocal(t,e)}saveLoan(t,e,a,n,o,l,i,u,d,h,f){let p={};return d?(p=(0,s.Z)(this,r).updateLoanToLocal(d,t,e,a,n,o,l,i,u),(0,s.Z)(this,c).deleteByLoan(d)):p=(0,s.Z)(this,r).addLoanToLocal(t,e,a,n,o,l),l&&o&&(0,s.Z)(this,c).addFeesToLocal(p.loan.id,h,f),p}deleteLoan(t){return(0,s.Z)(this,r).deleteToLocal(t)}deleteByClient(t){return(0,s.Z)(this,r).deleteByClient(t)}closeLoan(t){return(0,s.Z)(this,r).closeLoan(t)}}}}]);
//# sourceMappingURL=loans-client.ed5dbc62.js.map