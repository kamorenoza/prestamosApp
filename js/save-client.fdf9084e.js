"use strict";(self["webpackChunkprestamos_app"]=self["webpackChunkprestamos_app"]||[]).push([[925],{2169:function(t,e,a){a.r(e),a.d(e,{default:function(){return b}});var l=function(){var t=this,e=t._self._c;return e("div",[e("title-general",{attrs:{title:t.title,buttonBack:t.buttonBack}}),e("content-general",{attrs:{buttonText:"Guardar",buttonAction:t.save}},[e("input-general",{staticClass:"border-bottom pl-2",attrs:{validate:t.validate,label:"Nombre completo",icon:"fa-user"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),e("input-general",{staticClass:"border-bottom pl-2",attrs:{validate:t.validate,"is-document":"",max:15,label:"Cédula",icon:"fa-id-card"},model:{value:t.document,callback:function(e){t.document=e},expression:"document"}}),e("input-general",{staticClass:"border-bottom pl-2",attrs:{validate:t.validate,"is-document":"",max:15,label:"Celular",icon:"fa-mobile-screen"},model:{value:t.mobile,callback:function(e){t.mobile=e},expression:"mobile"}}),e("input-general",{staticClass:"border-bottom pl-2",attrs:{"is-document":"",max:10,label:"Fijo",icon:"fa-phone"},model:{value:t.tel,callback:function(e){t.tel=e},expression:"tel"}}),e("input-general",{staticClass:"border-bottom pl-2",attrs:{validate:t.validate,label:"Dirección",icon:"fa-map-pin"},model:{value:t.address,callback:function(e){t.address=e},expression:"address"}}),e("input-general",{staticClass:"border-bottom pl-2",attrs:{validate:t.validate,label:"Barrio",icon:"fa-map-pin"},model:{value:t.nbh,callback:function(e){t.nbh=e},expression:"nbh"}}),e("input-general",{staticClass:"border-bottom pl-2",attrs:{label:"Comentarios",icon:"fa-message"},model:{value:t.comments,callback:function(e){t.comments=e},expression:"comments"}})],1)],1)},i=[],n=a(3923),s=a(1782),o=a(3972),r=a(9772),c=a(3822),u=a(2399),d={components:{TitleGeneral:n.Z,ContentGeneral:s.Z,InputGeneral:o.Z},data(){return{name:"",document:"",mobile:"",tel:"",address:"",nbh:"",comments:"",id:"",validate:!1,uc:new r.Z}},computed:{title(){return this.id?"Editar cliente":"Nuevo cliente"},isValidData(){return this.name&&this.document&&this.mobile&&this.address&&this.nbh},buttonBack(){return this.clientSelected?"/detail-client":"/clients"},...(0,c.rn)("clientsStore",["clientSelected"])},methods:{async save(){if(this.validate=!0,this.isValidData){if(this.uc.getClientByDocument(this.document)&&!this.id)return u.t.notify("Cliente ya existe");const t=this.uc.saveClient(this.name,this.document,this.mobile,this.tel,this.address,this.nbh,this.comments,this.id);this.setClients(t.clients),this.setClientSelected(t.client),await u.t.notify("Cliente guardado correctamente"),this.$router.push("/detail-client")}},fillData(){this.clientSelected&&(this.name=this.clientSelected.name,this.document=this.clientSelected.document,this.mobile=this.clientSelected.mobile,this.tel=this.clientSelected.tel,this.address=this.clientSelected.address,this.nbh=this.clientSelected.nbh,this.comments=this.clientSelected.comments,this.id=this.clientSelected.id)},...(0,c.OI)("clientsStore",["setClients","setClientSelected"])},created(){this.fillData()}},m=d,h=a(1001),p=(0,h.Z)(m,l,i,!1,null,null,null),b=p.exports},1782:function(t,e,a){a.d(e,{Z:function(){return c}});var l=function(){var t=this,e=t._self._c;return e("div",{staticClass:"l-general",class:t.classWButton},[e("div",{staticClass:"l-content"},[t._t("default"),t.buttonText?e("div",{staticClass:"l-button"},[e("button",{staticClass:"button-general",on:{click:function(e){return t.buttonAction()}}},[t._v(" "+t._s(t.buttonText)+" ")])]):t._e()],2)])},i=[],n={props:{buttonText:{type:String,default:""},buttonAction:{type:Function,default:()=>{}},isSearch:{type:Boolean,default:!1},hasFilters:{type:Boolean,default:!1}},computed:{showButton(){return this.buttonText},classWButton(){let t="";return this.showButton&&(t+="l-general--button "),this.isSearch&&(t+="l-general--search "),this.hasFilters&&(t+="l-general--filters "),t}}},s=n,o=a(1001),r=(0,o.Z)(s,l,i,!1,null,null,null),c=r.exports},3972:function(t,e,a){a.d(e,{Z:function(){return d}});var l=function(){var t=this,e=t._self._c;return e("div",{staticClass:"input-container"},[t.icon?e("f-icon",{staticClass:"input-icon",attrs:{icon:t.icon}}):t._e(),"checkbox"===t.type?e("input",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"input-general",class:t.customClass,attrs:{maxlength:t.max,placeholder:t.label,disabled:t.disabled,type:"checkbox"},domProps:{checked:Array.isArray(t.text)?t._i(t.text,null)>-1:t.text},on:{change:function(e){var a=t.text,l=e.target,i=!!l.checked;if(Array.isArray(a)){var n=null,s=t._i(a,n);l.checked?s<0&&(t.text=a.concat([n])):s>-1&&(t.text=a.slice(0,s).concat(a.slice(s+1)))}else t.text=i}}}):"radio"===t.type?e("input",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"input-general",class:t.customClass,attrs:{maxlength:t.max,placeholder:t.label,disabled:t.disabled,type:"radio"},domProps:{checked:t._q(t.text,null)},on:{change:function(e){t.text=null}}}):e("input",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"input-general",class:t.customClass,attrs:{maxlength:t.max,placeholder:t.label,disabled:t.disabled,type:t.type},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}}),e("valid-alert",{attrs:{"data-value":t.text,validate:t.validate}})],1)},i=[],n=a(3404),s=a(1939),o={name:"InputGeneral",components:{validAlert:s.Z},props:{label:{type:String,default:""},value:{type:[String,Number],default:""},customClass:{type:String,default:""},max:{type:Number},isNumber:{type:Boolean,default:!1},isDocument:{type:Boolean,default:!1},validate:{type:Boolean,default:!1},icon:{type:String,default:""},isEmail:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},data(){return{text:this.value}},watch:{text(t){this.isNumber&&(this.text=n.P.onlyNumber(t)),this.isDocument&&(this.text=n.P.onlyNumberDoc(t)),this.$emit("input",this.text)},value(t){this.text=t}},computed:{type(){return this.isNumber||this.isDocument?"tel":this.isEmail?"email":"text"}}},r=o,c=a(1001),u=(0,c.Z)(r,l,i,!1,null,null,null),d=u.exports},1939:function(t,e,a){a.d(e,{Z:function(){return c}});var l=function(){var t=this,e=t._self._c;return e("div",{staticClass:"valid-alert"},[!t.validate||t.dataValue.toString().trim()&&0!==t.dataValue?t._e():e("small",{staticClass:"text-danger"},[t._v(t._s(t.message))])])},i=[],n={name:"validAlert",props:{message:{type:String,default:"Campo obligatorio"},dataValue:{type:[String,Number,Object,Date],default:""},validate:{type:Boolean,default:!1}}},s=n,o=a(1001),r=(0,o.Z)(s,l,i,!1,null,null,null),c=r.exports},9772:function(t,e,a){a.d(e,{Z:function(){return u}});var l=a(714),i=a(8829),n=a(2575),s=a(889),o=a(4527),r=new WeakMap,c=new WeakMap;class u{constructor(){(0,l.Z)(this,r,{writable:!0,value:void 0}),(0,l.Z)(this,c,{writable:!0,value:void 0}),(0,n.Z)(this,r,new s.Z),(0,n.Z)(this,c,new o.Z)}getClientByDocument(t){return(0,i.Z)(this,r).getClientByDoc(t)}getClientById(t){return(0,i.Z)(this,r).getClientById(t)}getAllClients(){return(0,i.Z)(this,r).getClientsFromLocal()}getClientsByFilter(t){return(0,i.Z)(this,r).getClientsFromLocalBySearch(t)}saveClient(t,e,a,l,n,s,o,c){let u=[];return u=c?(0,i.Z)(this,r).updateClientToLocal(c,t,e,a,l,n,s,o):(0,i.Z)(this,r).addClientToLocal(t,e,a,l,n,s,o),u}deleteClient(t){return(0,i.Z)(this,c).deleteByClient(t),(0,i.Z)(this,r).deleteToLocal(t)}}}}]);
//# sourceMappingURL=save-client.fdf9084e.js.map