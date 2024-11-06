"use strict";(self["webpackChunkprestamos_app"]=self["webpackChunkprestamos_app"]||[]).push([[497],{3362:function(t,e,a){a.r(e),a.d(e,{default:function(){return X}});var s=function(){var t=this,e=t._self._c;return e("div",[e("title-general",{attrs:{title:"",buttonBack:t.goToBack}}),e("div",{staticClass:"o-detail-loan"},[e("div",{staticClass:"o-detail-loan__header"},[e("p",[t._v(t._s(t.clientName))]),e("div",{staticClass:"d-flex align-items-center justify-content-between"},[e("p",{staticClass:"amount"},[t._v(" $ "+t._s(t._f("formatNumber")(t.loanSelected.balance)))]),e("loan-actions")],1)]),e("div",{staticClass:"o-detail-loan__body"},[e("loan-card",{attrs:{balance:t.loanSelected.balance,"total-amount":t.total}}),e("div",{staticClass:"d-flex align-items-center"},[e("div",{staticClass:"o-detail-loan__calendar"}),e("div",[e("p",{staticClass:"o-card__text-gray"},[t._v("Fecha de inicio del préstamo")]),e("p",{staticClass:"text-book"},[t._v(t._s(t._f("formatDate")(t.loanSelected.date)))])])]),e("div",{staticClass:"d-flex align-items-center mt-2"},[e("div",{staticClass:"o-detail-loan__fees"}),e("div",[e("p",{staticClass:"o-card__text-gray"},[t._v("Plazo del préstamo")]),e("p",{staticClass:"text-book"},[t._v(" "+t._s(t.loanSelected.feesNum)+" "+t._s(t.typeTime))])])]),e("loan-fees",{attrs:{fees:t.fees,"num-paid":t.numPaid}})],1)])],1)},o=[],n=a(3923),l=a(3822),i=a(6973),c=function(){var t=this,e=t._self._c;return e("div",{staticClass:"o-detail-loan__card"},[e("div",{staticClass:"o-detail-loan__card-item"},[e("p",{staticClass:"o-card__text-gray"},[t._v("Pendiente")]),e("p",{staticClass:"amount"},[e("span",{staticClass:"point point--danger"}),t._v(" $ "+t._s(t._f("formatNumber")(parseInt(t.balance)-parseInt(t.totalAmount))))])]),e("div",{staticClass:"o-detail-loan__card-item"},[e("p",{staticClass:"o-card__text-gray"},[t._v("Pagado")]),e("p",{staticClass:"amount"},[e("span",{staticClass:"point point--success"}),t._v(" $ "+t._s(t._f("formatNumber")(t.totalAmount)))])])])},d=[],r={name:"LoanCard",props:{balance:{type:[Number,String],default:0},totalAmount:{type:[Number,String],default:0}}},u=r,m=a(1001),_=(0,m.Z)(u,c,d,!1,null,null,null),f=_.exports,h=function(){var t=this,e=t._self._c;return e("div",{staticClass:"p-2 mt-2"},[e("div",{staticClass:"d-flex align-items-center justify-content-between mb-2"},[e("div",{staticClass:"d-flex align-items-center"},[e("p",{staticClass:"text-book"},[t._v("Cuotas")]),e("b-icon-plus-circle-fill",{staticClass:"ml-2 m-fee__add-fee",on:{click:function(e){return t.openModal()}}})],1),e("p",{staticClass:"o-card__text-gray o-detail-loan__counter"},[t._v(t._s(t.numPaid)+" de "+t._s(t.numTotalFees))])]),e("div",{staticClass:"o-detail-loan__fees-container"},t._l(t.fees,(function(a){return e("fee-row",{key:a.id,attrs:{fee:a,action:t.getFees}})})),1),e("add-fee-modal",{attrs:{action:t.getFees}}),e("possible-date-modal",{attrs:{action:t.getFees}}),e("paid-amount-modal",{attrs:{action:t.getFees}})],1)},p=[],v=function(){var t=this,e=t._self._c;return e("b-modal",{attrs:{id:"feeModal","hide-footer":"",centered:"","hide-header":"","content-class":"border-0","body-class":"p-0"},on:{show:t.fillData}},[e("div",{staticClass:"o-modal"},[e("div",{staticClass:"o-modal__header"},[e("p",[t._v("Agregar cuota")])]),e("div",{staticClass:"o-modal__body"},[e("input-date",{model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),e("input-general",{attrs:{"is-number":"",icon:"fa-hand-holding-dollar",label:"Valor"},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}})],1),e("div",{staticClass:"o-modal__footer"},[e("p",{staticClass:"o-modal__action",on:{click:function(e){return t.closeModal()}}},[t._v("CANCELAR")]),e("p",{staticClass:"o-modal__action",on:{click:function(e){return t.addFee()}}},[t._v("ACEPTAR")])])])])},C=[],S=a(8866),b=a(3972),g=a(2399),y=a(6797),x=a.n(y),k=a(3404),F={name:"AddFeeModal",props:{action:{type:Function,default:()=>{}}},components:{InputGeneral:b.Z,InputDate:S.Z},data(){return{date:new Date,amount:"",uc:new i.Z,id:""}},computed:{...(0,l.rn)("loansStore",["loanSelected","feeSelected"])},methods:{closeModal(){this.$bvModal.hide("feeModal"),this.date=new Date,this.amount="",this.setFeeSelected(null)},addFee(){const t=x()(this.date).format("DD-MM-YYYY"),e=this.uc.addFee(t,this.amount,this.loanSelected.id,this.id);e&&(g.t.notify("Cuota agregada corrrectamente"),this.closeModal(),this.action())},fillData(){if(this.feeSelected){const t=this.feeSelected.date.split("-");this.date=new Date(`${t[1]}/${t[0]}/${t[2]}`),this.amount=k.P.formatNumber(this.feeSelected.amount),this.id=this.feeSelected.id}},...(0,l.OI)("loansStore",["setFeeSelected"])},created(){this.fillData()}},L=F,M=(0,m.Z)(L,v,C,!1,null,null,null),w=M.exports,D=a(2545),Z=a(9519),A=a(2840),P={name:"LoanFees",components:{FeeRow:A.Z,PaidAmountModal:Z.Z,PossibleDateModal:D.Z,AddFeeModal:w},props:{fees:{type:Array},numPaid:{type:[String,Number]}},data(){return{uc:new i.Z}},computed:{numTotalFees(){return this.fees.length},...(0,l.rn)("loansStore",["loanSelected"])},methods:{getFees(){const t=this.uc.getFeesByLoan(this.loanSelected.id),e=this.uc.getTotalFees(this.loanSelected.id);this.setFees({fees:t,total:e.total,numPaid:e.numPaid})},openModal(){this.$bvModal.show("feeModal")},...(0,l.OI)("loansStore",["setFees"])}},$=P,I=(0,m.Z)($,h,p,!1,null,null,null),N=I.exports,T=function(){var t=this,e=t._self._c;return e("div",{staticClass:"o-detail-loan__actions"},[e("div",{staticClass:"text-center mr-3"},[e("f-icon",{attrs:{icon:"fa-circle-info"},on:{click:function(e){return t.amountDetails()}}}),e("p",[t._v("Detalles")])],1),e("div",{staticClass:"text-center mr-3"},[e("f-icon",{attrs:{icon:"fa-pen"},on:{click:function(e){return t.editLoan()}}}),e("p",[t._v("Editar")])],1),e("div",{staticClass:"text-center"},[e("f-icon",{attrs:{icon:"fa-trash-can"},on:{click:function(e){return t.deleteLoan()}}}),e("p",[t._v("Eliminar")])],1),e("amount-loan-details")],1)},R=[],B=a(7695),E=a(9772),U=function(){var t=this,e=t._self._c;return e("b-modal",{attrs:{id:"amountLoanDetails","hide-footer":"",centered:"","hide-header":"","content-class":"border-0","body-class":"p-0"}},[e("div",{staticClass:"o-modal"},[e("div",{staticClass:"o-modal__header"},[e("p",[t._v("Detalles del préstamo")])]),e("div",{staticClass:"o-modal__body"},[e("div",{staticClass:"d-flex align-items-center"},[e("div",{staticClass:"o-detail-loan__fees"}),e("div",[e("p",{staticClass:"o-card__text-gray"},[t._v("Capital")]),e("p",{staticClass:"text-book"},[t._v("$ "+t._s(t._f("formatNumber")(t.loanSelected.amount)))])])]),e("div",{staticClass:"d-flex align-items-center mt-2"},[e("div",{staticClass:"o-detail-loan__fees"}),e("div",[e("p",{staticClass:"o-card__text-gray"},[t._v("Interés")]),e("p",{staticClass:"text-book"},[t._v("$ "+t._s(t._f("formatNumber")(t.loanSelected.interes)))])])])]),e("div",{staticClass:"o-modal__footer"},[e("p",{staticClass:"o-modal__action",on:{click:function(e){return t.closeModal()}}},[t._v("CERRAR")])])])])},O=[],Y={name:"AmountLoanDetails",computed:{...(0,l.rn)("loansStore",["loanSelected"])},methods:{closeModal(){this.$bvModal.hide("amountLoanDetails")}}},j=Y,z=(0,m.Z)(j,U,O,!1,null,null,null),G=z.exports,Q={name:"LoanActions",components:{AmountLoanDetails:G},data(){return{uc:new B.Z,clientsUc:new E.Z}},computed:{...(0,l.rn)("loansStore",["loanSelected"])},methods:{editLoan(){this.setClientSelected(this.clientsUc.getClientById(this.loanSelected.clientId)),this.setBackRoute("/detail-loan"),this.$router.push("/save-loan")},async deleteLoan(){const t=await g.t.confirm("Se eliminará el prestamo y todos los abonos hechos, ¿Está seguro?");t.isConfirmed&&(this.uc.deleteLoan(this.loanSelected.id),this.setLoanSelected(null),await g.t.notify("Préstamos eliminado"),this.$router.push("/detail-client"))},amountDetails(){this.$bvModal.show("amountLoanDetails")},...(0,l.OI)("loansStore",["setLoanSelected","setBackRoute"]),...(0,l.OI)("clientsStore",["setClientSelected"])}},V=Q,q=(0,m.Z)(V,T,R,!1,null,null,null),H=q.exports,J={components:{LoanActions:H,LoanFees:N,LoanCard:f,TitleGeneral:n.Z},data(){return{uc:new i.Z,clientsUc:new E.Z,loansUc:new B.Z}},computed:{typeTime(){if(this.loanSelected.feesNum&&this.loanSelected.typeTime){const t=this.loanSelected.feesNum;return 1===this.loanSelected.typeTime?t>1?"días":"Día":8===this.loanSelected.typeTime?t>1?"Semanas":"Semana":15===this.loanSelected.typeTime?t>1?"Quincenas":"Quincena":t>1?"Meses":"Mes"}return"Sin plazo definido"},clientName(){const t=this.clientsUc.getClientById(this.loanSelected.clientId);return t.name},goToBack(){if("/clients"===this.backMainRoute){const t=this.loansUc.getLoansByClient(this.loanSelected.clientId),e=t.length;return e>1?"/loans-client":"/detail-client"}return this.backMainRoute},...(0,l.rn)("loansStore",["backRoute","loanSelected","fees","total","numPaid","backMainRoute"])},methods:{getFees(){const t=this.uc.getFeesByLoan(this.loanSelected.id),e=this.uc.getTotalFees(this.loanSelected.id);this.setFees({fees:t,total:e.total,numPaid:e.numPaid})},async validateLoan(){if(this.total===this.loanSelected.balance){const t=await g.t.confirm("El préstamos ya está pagado, dese cerrarlo?");t.isConfirmed&&(this.loansUc.closeLoan(this.loanSelected.id),await g.t.notify("Préstamo cerrado"),this.$router.push(this.backRoute))}},...(0,l.OI)("loansStore",["setFees"])},created(){if(!this.loanSelected)return this.$router.push("/loans");this.getFees(),this.validateLoan()}},K=J,W=(0,m.Z)(K,s,o,!1,null,null,null),X=W.exports}}]);
//# sourceMappingURL=detail-loan.0765ccb3.js.map