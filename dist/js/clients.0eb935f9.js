"use strict";(self["webpackChunkprestamos_app"]=self["webpackChunkprestamos_app"]||[]).push([[30],{1841:function(t,e,n){n.r(e),n.d(e,{default:function(){return b}});var l=function(){var t=this,e=t._self._c;return e("div",[e("title-general",{attrs:{title:"Clientes"}}),e("content-general",{attrs:{buttonText:"Nuevo cliente",buttonAction:t.goToSave,"is-search":""}},[e("search-input",{attrs:{label:"Buscar cliente"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._l(t.clients,(function(t){return e("client-row",{key:t.id,attrs:{client:t}})}))],2)],1)},s=[],i=n(3923),a=n(1782),c=n(6466),r=n(9772),o=n(3822),u=function(){var t=this,e=t._self._c;return e("div",{staticClass:"m-client-row"},[e("div",{on:{click:function(e){return t.goToDetails()}}},[e("p",{staticClass:"m-client-row__name"},[t._v(t._s(t.client.name))])]),e("div",{staticClass:"d-flex align-items-center"},[e("div",{staticClass:"m-client-row__icon",on:{click:function(e){return t.makeCall()}}},[e("f-icon",{attrs:{icon:"fa-phone"}})],1),e("div",{staticClass:"m-client-row__body"},[e("p",{staticClass:"m-client-row__text",on:{click:function(e){return t.goToDetails()}}},[t._v(" "+t._s(t.client.mobile)+" ")]),e("p",{staticClass:"m-client-row__text",on:{click:function(e){return t.goToDetails()}}},[t._v(" "+t._s(t.client.address)+" "+t._s(t.client.nbh)+" ")])])])])},h=[],d={props:{client:{type:Object,required:!0}},methods:{makeCall(){window.open("tel:+57"+this.client.mobile,"_self")},goToDetails(){this.setClientSelected(this.client),this.$router.push("/detail-client")},...(0,o.OI)("clientsStore",["setClientSelected"])}},p=d,C=n(1001),v=(0,C.Z)(p,u,h,!1,null,null,null),f=v.exports,m={components:{TitleGeneral:i.Z,ContentGeneral:a.Z,SearchInput:c.Z,ClientRow:f},data(){return{search:"",uc:new r.Z}},watch:{search(t){this.setClients(this.uc.getClientsByFilter(t))}},computed:{...(0,o.rn)("clientsStore",["clients"])},methods:{goToSave(){this.$router.push("/save-client")},init(){this.setClients(this.uc.getAllClients()),this.setClientSelected(null),this.setLoanSelected(null),this.setBackMainRoute("/clients"),this.setBackRoute("/clients")},...(0,o.OI)("clientsStore",["setClients","setClientSelected"]),...(0,o.OI)("loansStore",["setLoanSelected","setBackRoute","setBackMainRoute"])},created(){this.init()}},_=m,g=(0,C.Z)(_,l,s,!1,null,null,null),b=g.exports},1782:function(t,e,n){n.d(e,{Z:function(){return o}});var l=function(){var t=this,e=t._self._c;return e("div",{staticClass:"l-general",class:t.classWButton},[e("div",{staticClass:"l-content"},[t._t("default"),t.buttonText?e("div",{staticClass:"l-button"},[e("button",{staticClass:"button-general",on:{click:function(e){return t.buttonAction()}}},[t._v(" "+t._s(t.buttonText)+" ")])]):t._e()],2)])},s=[],i={props:{buttonText:{type:String,default:""},buttonAction:{type:Function,default:()=>{}},isSearch:{type:Boolean,default:!1},hasFilters:{type:Boolean,default:!1}},computed:{showButton(){return this.buttonText},classWButton(){let t="";return this.showButton&&(t+="l-general--button "),this.isSearch&&(t+="l-general--search "),this.hasFilters&&(t+="l-general--filters "),t}}},a=i,c=n(1001),r=(0,c.Z)(a,l,s,!1,null,null,null),o=r.exports},6466:function(t,e,n){n.d(e,{Z:function(){return o}});var l=function(){var t=this,e=t._self._c;return e("div",{staticClass:"search-container"},[e("b-icon",{staticClass:"search-icon",attrs:{icon:"search"}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"search-input",attrs:{type:"text",maxlength:t.max,placeholder:t.label},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}})],1)},s=[],i={props:{label:{type:String,default:""},value:{type:[String,Number],default:""},max:{type:Number}},data(){return{text:this.value}},watch:{text(){this.$emit("input",this.text)},value(t){this.text=t}}},a=i,c=n(1001),r=(0,c.Z)(a,l,s,!1,null,null,null),o=r.exports},9772:function(t,e,n){n.d(e,{Z:function(){return u}});var l=n(714),s=n(8829),i=n(2575),a=n(889),c=n(4527),r=new WeakMap,o=new WeakMap;class u{constructor(){(0,l.Z)(this,r,{writable:!0,value:void 0}),(0,l.Z)(this,o,{writable:!0,value:void 0}),(0,i.Z)(this,r,new a.Z),(0,i.Z)(this,o,new c.Z)}getClientByDocument(t){return(0,s.Z)(this,r).getClientByDoc(t)}getClientById(t){return(0,s.Z)(this,r).getClientById(t)}getAllClients(){return(0,s.Z)(this,r).getClientsFromLocal()}getClientsByFilter(t){return(0,s.Z)(this,r).getClientsFromLocalBySearch(t)}saveClient(t,e,n,l,i,a,c,o){let u=[];return u=o?(0,s.Z)(this,r).updateClientToLocal(o,t,e,n,l,i,a,c):(0,s.Z)(this,r).addClientToLocal(t,e,n,l,i,a,c),u}deleteClient(t){return(0,s.Z)(this,o).deleteByClient(t),(0,s.Z)(this,r).deleteToLocal(t)}}}}]);
//# sourceMappingURL=clients.0eb935f9.js.map