(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(11),c=n.n(u),i=n(2),l=function(e){var t=e.person,n=e.removeFunction;return r.a.createElement("div",{className:"person"},r.a.createElement("br",null),r.a.createElement("div",null,t.name),r.a.createElement("div",null,t.number),r.a.createElement("button",{name:t.name,value:t.id,onClick:n}," Delete"))},o=function(e){var t=e.filterCriteria,n=e.changeHandler;return r.a.createElement("form",null,r.a.createElement("div",null,"Rajaa n\xe4ytett\xe4vi\xe4"),r.a.createElement("input",{value:t,onChange:n}))},m=function(e){var t=e.name,n=e.number,a=e.nameHandler,u=e.numberHandler,c=e.addFunction;return r.a.createElement("form",{onSubmit:c},r.a.createElement("div",null,"Nimi: "),r.a.createElement("input",{value:t,onChange:a}),r.a.createElement("div",null,"Numero: "),r.a.createElement("input",{value:n,onChange:u}),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"tallenna")))},f=n(3),d=n.n(f),s="/api/people",v=function(){return d.a.get(s).then(function(e){return e.data})},p=function(e){return d.a.post(s,e).then(function(e){return e.data})},b=function(e,t){return d.a.put("".concat(s,"/").concat(e),t).then(function(e){return e.data})},E=function(e){return d.a.delete("".concat(s,"/").concat(e)).then(function(e){return e.data})},h=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"error"},t)},g=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],u=t[1],c=Object(a.useState)(""),f=Object(i.a)(c,2),d=f[0],s=f[1],g=Object(a.useState)(""),j=Object(i.a)(g,2),O=j[0],w=j[1],y=Object(a.useState)(""),k=Object(i.a)(y,2),H=k[0],C=k[1],S=n.filter(function(e){return e.name.includes(H)}),F=Object(a.useState)(null),N=Object(i.a)(F,2),D=N[0],x=N[1];Object(a.useEffect)(function(){v().then(function(e){u(e)})},[]);var J=function(e){e.preventDefault(),window.confirm("Poistetaanko ".concat(e.target.name,"?"))&&(E(e.target.value).then(u(n.filter(function(t){return t.id!=e.target.value}))),x("".concat(e.target.name," poistettiin puhelinluettelosta.")))};return r.a.createElement("div",null,r.a.createElement(h,{message:D}),r.a.createElement("h1",null,"Puhelinluettelo"),r.a.createElement(o,{filterCriteria:H,changeHandler:function(e){C(e.target.value)}}),r.a.createElement(m,{name:d,number:O,nameHandler:function(e){s(e.target.value)},numberHandler:function(e){w(e.target.value)},addFunction:function(e){e.preventDefault();var t={name:d,number:O};if(n.find(function(e){return e.name===d})){var a=n.find(function(e){return e.name===d});if(window.confirm("".concat(d," on jo luettelossa. Haluatko korvata yhteystiedon?"))){var r={name:d,number:O,id:a.id};b(r.id,r).catch(function(e){x('Yhteystieto "'.concat(r.name,'" on jo poistettu palvelimelta.'))});var c=n.find(function(e){return e.id===r.id}),i=n.indexOf(c);n.splice(i,1,r),s(""),w(""),x('Yhteystiedon "'.concat(r.name,'" tiedot p\xe4ivitettiin.'))}}else p(t).then(function(e){u(n.concat(e)),s(""),w(""),x("".concat(e.name," lis\xe4ttiin puhelinluetteloon."))})}}),S.map(function(e){return r.a.createElement(l,{key:e.id,person:e,removeFunction:J})}))};n(37);c.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.da60f786.chunk.js.map