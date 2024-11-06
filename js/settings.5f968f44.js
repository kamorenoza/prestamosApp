"use strict";(self["webpackChunkprestamos_app"]=self["webpackChunkprestamos_app"]||[]).push([[571],{9733:function(t,e,a){a.r(e),a.d(e,{default:function(){return Z}});var n=function(){var t=this,e=t._self._c;return e("div",[e("title-general",{attrs:{title:"Configuración"}}),e("content-general",{attrs:{buttonText:"Guardar",buttonAction:t.save}},[e("div",[e("input-general",{attrs:{validate:t.validate,label:"Email",icon:"fa-envelope","is-email":"",disabled:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),e("input-general",{attrs:{validate:t.validate,label:"Nombre completo",icon:"fa-user-group"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),e("input-general",{attrs:{validate:t.validate,label:"Créditos maxi",icon:"fa-money-bill-trend-up","is-number":""},model:{value:t.maxi,callback:function(e){t.maxi=e},expression:"maxi"}}),e("div",{staticClass:"mt-4 border-top pt-3",on:{click:function(e){return t.doBackup()}}},[e("p",[e("b-icon",{staticClass:"mr-1",attrs:{icon:"save"}}),t._v(" Hacer copia de seguridad ")],1)]),e("div",{staticClass:"mt-4 border-top pt-3 border-bottom pb-4",on:{click:function(e){return t.logout()}}},[e("p",[e("b-icon",{staticClass:"mr-1",attrs:{icon:"box-arrow-in-left"}}),t._v(" Cerrar sesión ")],1)])],1)])],1)},i=[],s=a(3923),l=a(1782),r=a(3972),o=a(714),c=a(8829),u=a(2575),d=a(6035),m=a(7329);class p{getSettings(t){const e=(0,d.JU)(m.db,"backup",t);return(0,d.QT)(e)}addSettings(t,e,a,n){const i=a.replaceAll(".",""),s={name:t,email:e,maxi:i,version:n},l=(0,d.JU)(m.db,"backup",e);return(0,d.pl)(l,s)}addSettingsLocal(t,e,a,n){const i=a.replaceAll(".",""),s={name:t,email:e,maxi:i,version:n};localStorage.setItem("settings",JSON.stringify(s))}}var g=a(6797),h=a.n(g),v=new WeakMap;class f{constructor(){(0,o.Z)(this,v,{writable:!0,value:void 0}),(0,u.Z)(this,v,new p)}async updateSettings(t,e,a,n){try{return(0,c.Z)(this,v).addSettingsLocal(t,e,a,n),"Configuración guardada correctamente"}catch(i){return console.error(i),"Error guardando configuración"}}createSettings(t,e,a){try{const n=localStorage.getItem("settings");let i=h()().format("MM/DD/YYYY");return n&&(i=JSON.parse(n).version),(0,c.Z)(this,v).addSettingsLocal(t,e,a,i),"Configuración guardada correctamente"}catch(n){return console.error(n),"Error guardando configuración"}}}var b=a(3822),x=a(3404),y=a(2399),S=a(8483),_={components:{TitleGeneral:s.Z,ContentGeneral:l.Z,InputGeneral:r.Z},data(){return{name:"",email:"",maxi:"",validate:!1,uc:new f,backupUc:new S.Z}},computed:{isValidData(){return this.name&&this.email&&this.maxi},...(0,b.rn)("loginStore",["user"])},methods:{async save(){if(this.validate=!0,this.isValidData){x.P.startLoading();const t=this.uc.createSettings(this.name,this.email,this.maxi);if(t){const t=JSON.parse(localStorage.getItem("settings"));this.setEmail(t.email),this.setSettings(t),this.$router.push("/")}else y.t.notify("Error guardando configuración");x.P.stopLoading()}},setData(){let t=localStorage.getItem("settings");t?(t=JSON.parse(t),this.name=t.name,this.email=t.email,this.maxi=x.P.onlyNumber(t.maxi)):this.email=this.user},async doBackup(){await this.backupUc.createBackup(!0)},async logout(){const t=await this.backupUc.logout();t&&this.$router.push("/login")},...(0,b.OI)("settingsStore",["setEmail","setSettings"])},created(){this.setData()}},k=_,C=a(1001),B=(0,C.Z)(k,n,i,!1,null,null,null),Z=B.exports},1782:function(t,e,a){a.d(e,{Z:function(){return c}});var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"l-general",class:t.classWButton},[e("div",{staticClass:"l-content"},[t._t("default"),t.buttonText?e("div",{staticClass:"l-button"},[e("button",{staticClass:"button-general",on:{click:function(e){return t.buttonAction()}}},[t._v(" "+t._s(t.buttonText)+" ")])]):t._e()],2)])},i=[],s={props:{buttonText:{type:String,default:""},buttonAction:{type:Function,default:()=>{}},isSearch:{type:Boolean,default:!1},hasFilters:{type:Boolean,default:!1}},computed:{showButton(){return this.buttonText},classWButton(){let t="";return this.showButton&&(t+="l-general--button "),this.isSearch&&(t+="l-general--search "),this.hasFilters&&(t+="l-general--filters "),t}}},l=s,r=a(1001),o=(0,r.Z)(l,n,i,!1,null,null,null),c=o.exports},3972:function(t,e,a){a.d(e,{Z:function(){return d}});var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"input-container"},[t.icon?e("f-icon",{staticClass:"input-icon",attrs:{icon:t.icon}}):t._e(),"checkbox"===t.type?e("input",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"input-general",class:t.customClass,attrs:{maxlength:t.max,placeholder:t.label,disabled:t.disabled,type:"checkbox"},domProps:{checked:Array.isArray(t.text)?t._i(t.text,null)>-1:t.text},on:{change:function(e){var a=t.text,n=e.target,i=!!n.checked;if(Array.isArray(a)){var s=null,l=t._i(a,s);n.checked?l<0&&(t.text=a.concat([s])):l>-1&&(t.text=a.slice(0,l).concat(a.slice(l+1)))}else t.text=i}}}):"radio"===t.type?e("input",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"input-general",class:t.customClass,attrs:{maxlength:t.max,placeholder:t.label,disabled:t.disabled,type:"radio"},domProps:{checked:t._q(t.text,null)},on:{change:function(e){t.text=null}}}):e("input",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"input-general",class:t.customClass,attrs:{maxlength:t.max,placeholder:t.label,disabled:t.disabled,type:t.type},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}}),e("valid-alert",{attrs:{"data-value":t.text,validate:t.validate}})],1)},i=[],s=a(3404),l=a(1939),r={name:"InputGeneral",components:{validAlert:l.Z},props:{label:{type:String,default:""},value:{type:[String,Number],default:""},customClass:{type:String,default:""},max:{type:Number},isNumber:{type:Boolean,default:!1},isDocument:{type:Boolean,default:!1},validate:{type:Boolean,default:!1},icon:{type:String,default:""},isEmail:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},data(){return{text:this.value}},watch:{text(t){this.isNumber&&(this.text=s.P.onlyNumber(t)),this.isDocument&&(this.text=s.P.onlyNumberDoc(t)),this.$emit("input",this.text)},value(t){this.text=t}},computed:{type(){return this.isNumber||this.isDocument?"tel":this.isEmail?"email":"text"}}},o=r,c=a(1001),u=(0,c.Z)(o,n,i,!1,null,null,null),d=u.exports},3923:function(t,e,a){a.d(e,{Z:function(){return c}});var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"m-title",class:t.classTitle},[t.buttonBack?e("div",{staticClass:"m-title__button",on:{click:function(e){return t.goTo()}}},[e("f-icon",{attrs:{icon:"fa-arrow-left-long"}})],1):t._e(),e("p",{staticClass:"m-title__text"},[t._v(t._s(t.title))])])},i=[],s={props:{title:{type:String,default:""},buttonBack:{type:String,default:""}},computed:{classTitle(){return this.buttonBack?"m-title--back":""}},methods:{goTo(){this.$router.push(this.buttonBack)}}},l=s,r=a(1001),o=(0,r.Z)(l,n,i,!1,null,null,null),c=o.exports},1939:function(t,e,a){a.d(e,{Z:function(){return c}});var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"valid-alert"},[!t.validate||t.dataValue.toString().trim()&&0!==t.dataValue?t._e():e("small",{staticClass:"text-danger"},[t._v(t._s(t.message))])])},i=[],s={name:"validAlert",props:{message:{type:String,default:"Campo obligatorio"},dataValue:{type:[String,Number,Object,Date],default:""},validate:{type:Boolean,default:!1}}},l=s,r=a(1001),o=(0,r.Z)(l,n,i,!1,null,null,null),c=o.exports}}]);
//# sourceMappingURL=settings.5f968f44.js.map