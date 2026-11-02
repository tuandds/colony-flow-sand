var vc=Object.defineProperty;var Sc=(i,e,t)=>e in i?vc(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var xe=(i,e,t)=>Sc(i,typeof e!="symbol"?e+"":e,t);import{W as zt,H as Ut,k as El,m as _i,u as Zs,l as Mc,P as yc,i as Ec,n as no,o as Hn,q as Lt,j as bc,r as ni,s as Gn,T as Ai,t as Js,v as Tc,x as Ac,y as io,I as Vn,z as wc,A as Rc,D as Cc,G as Pc,J as so,K as Lc,O as ro}from"./sim-DLVQjbiL.js";import{_ as bl,a as Dc,b as Dt,c as Qs,d as Ic,e as ao,f as Uc,g as Nc}from"./phaser-BzrO1jmB.js";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ra="186",Fc=0,oo=1,Oc=2,Ts=1,Bc=2,Fi=3,Zn=0,Nt=1,en=2,bn=0,zi=1,lo=2,co=3,ho=4,zc=5,gi=100,Hc=101,Gc=102,Vc=103,kc=104,Wc=200,Xc=201,qc=202,Yc=203,Tl=204,Al=205,Kc=206,$c=207,Zc=208,Jc=209,Qc=210,jc=211,eh=212,th=213,nh=214,zr=0,Hr=1,Gr=2,Gi=3,Vr=4,kr=5,Wr=6,Xr=7,Vs=0,ih=1,sh=2,dn=0,wl=1,Rl=2,Cl=3,Pl=4,Ll=5,Dl=6,Il=7,Ul=300,Jn=301,Mi=302,js=303,er=304,ks=306,qr=1e3,En=1001,Yr=1002,Mt=1003,rh=1004,Ji=1005,At=1006,tr=1007,Kn=1008,Vt=1009,Nl=1010,Fl=1011,Vi=1012,Ca=1013,fn=1014,hn=1015,pn=1016,Pa=1017,La=1018,ki=1020,Ol=35902,Bl=35899,zl=1021,Hl=1022,nn=1023,wn=1026,$n=1027,Gl=1028,Da=1029,Qn=1030,Ia=1031,Ua=1033,As=33776,ws=33777,Rs=33778,Cs=33779,Kr=35840,$r=35841,Zr=35842,Jr=35843,Qr=36196,jr=37492,ea=37496,ta=37488,na=37489,Ds=37490,ia=37491,sa=37808,ra=37809,aa=37810,oa=37811,la=37812,ca=37813,ha=37814,ua=37815,da=37816,fa=37817,pa=37818,ma=37819,ga=37820,_a=37821,xa=36492,va=36494,Sa=36495,Ma=36283,ya=36284,Is=36285,Ea=36286,ah=3200,Us=0,oh=1,Bn="",Gt="srgb",Ns="srgb-linear",Fs="linear",Qe="srgb",nr=7680,lh=519,ch=512,hh=513,uh=514,Na=515,dh=516,fh=517,Fa=518,ph=519,mh=35044,uo="300 es",un=2e3,Wi=2001;function gh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Os(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function _h(){const i=Os("canvas");return i.style.display="block",i}const fo={};function po(...i){const e="THREE."+i.shift();console.log(e,...i)}function Vl(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ce(...i){i=Vl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ye(...i){i=Vl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function vi(...i){const e=i.join(" ");e in fo||(fo[e]=!0,Ce(...i))}function xh(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const vh={[zr]:Hr,[Gr]:Wr,[Vr]:Xr,[Gi]:kr,[Hr]:zr,[Wr]:Gr,[Xr]:Vr,[kr]:Gi};class jn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ir=Math.PI/180,ba=180/Math.PI;function qi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bt[i&255]+bt[i>>8&255]+bt[i>>16&255]+bt[i>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]).toLowerCase()}function Ve(i,e,t){return Math.max(e,Math.min(t,i))}function Sh(i,e){return(i%e+e)%e}function sr(i,e,t){return(1-t)*i+t*e}function wi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function It(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ga=class Ga{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ga.prototype.isVector2=!0;let ke=Ga;class Ei{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],p=r[a+1],_=r[a+2],S=r[a+3];if(d!==S||c!==u||l!==p||h!==_){let m=c*u+l*p+h*_+d*S;m<0&&(u=-u,p=-p,_=-_,S=-S,m=-m);let f=1-o;if(m<.9995){const E=Math.acos(m),R=Math.sin(E);f=Math.sin(f*E)/R,o=Math.sin(o*E)/R,c=c*f+u*o,l=l*f+p*o,h=h*f+_*o,d=d*f+S*o}else{c=c*f+u*o,l=l*f+p*o,h=h*f+_*o,d=d*f+S*o;const E=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=E,l*=E,h*=E,d*=E}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],u=r[a+1],p=r[a+2],_=r[a+3];return e[t]=o*_+h*d+c*p-l*u,e[t+1]=c*_+h*u+l*d-o*p,e[t+2]=l*_+h*p+o*u-c*d,e[t+3]=h*_-o*d-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),u=c(n/2),p=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*p*_,this._y=l*p*d-u*h*_,this._z=l*h*_+u*p*d,this._w=l*h*d-u*p*_;break;case"YXZ":this._x=u*h*d+l*p*_,this._y=l*p*d-u*h*_,this._z=l*h*_-u*p*d,this._w=l*h*d+u*p*_;break;case"ZXY":this._x=u*h*d-l*p*_,this._y=l*p*d+u*h*_,this._z=l*h*_+u*p*d,this._w=l*h*d-u*p*_;break;case"ZYX":this._x=u*h*d-l*p*_,this._y=l*p*d+u*h*_,this._z=l*h*_-u*p*d,this._w=l*h*d+u*p*_;break;case"YZX":this._x=u*h*d+l*p*_,this._y=l*p*d+u*h*_,this._z=l*h*_-u*p*d,this._w=l*h*d-u*p*_;break;case"XZY":this._x=u*h*d-l*p*_,this._y=l*p*d-u*h*_,this._z=l*h*_+u*p*d,this._w=l*h*d+u*p*_;break;default:Ce("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(h-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Va=class Va{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(mo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(mo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return rr.copy(this).projectOnVector(e),this.sub(rr)}reflect(e){return this.sub(rr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Va.prototype.isVector3=!0;let B=Va;const rr=new B,mo=new Ei,ka=class ka{constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],p=n[5],_=n[8],S=s[0],m=s[3],f=s[6],E=s[1],R=s[4],M=s[7],b=s[2],y=s[5],w=s[8];return r[0]=a*S+o*E+c*b,r[3]=a*m+o*R+c*y,r[6]=a*f+o*M+c*w,r[1]=l*S+h*E+d*b,r[4]=l*m+h*R+d*y,r[7]=l*f+h*M+d*w,r[2]=u*S+p*E+_*b,r[5]=u*m+p*R+_*y,r[8]=u*f+p*M+_*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,u=o*c-h*r,p=l*r-a*c,_=t*d+n*u+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/_;return e[0]=d*S,e[1]=(s*l-h*n)*S,e[2]=(o*n-s*a)*S,e[3]=u*S,e[4]=(h*t-s*c)*S,e[5]=(s*r-o*t)*S,e[6]=p*S,e[7]=(n*c-l*t)*S,e[8]=(a*t-n*r)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return vi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ar.makeScale(e,t)),this}rotate(e){return vi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ar.makeRotation(-e)),this}translate(e,t){return vi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ar.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ka.prototype.isMatrix3=!0;let Le=ka;const ar=new Le,go=new Le().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_o=new Le().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mh(){const i={enabled:!0,workingColorSpace:Ns,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Qe&&(s.r=Tn(s.r),s.g=Tn(s.g),s.b=Tn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qe&&(s.r=Si(s.r),s.g=Si(s.g),s.b=Si(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bn?Fs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return vi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return vi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ns]:{primaries:e,whitePoint:n,transfer:Fs,toXYZ:go,fromXYZ:_o,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Gt},outputColorSpaceConfig:{drawingBufferColorSpace:Gt}},[Gt]:{primaries:e,whitePoint:n,transfer:Qe,toXYZ:go,fromXYZ:_o,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Gt}}}),i}const Ge=Mh();function Tn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Si(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ii;class yh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ii===void 0&&(ii=Os("canvas")),ii.width=e.width,ii.height=e.height;const s=ii.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ii}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Os("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Tn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Tn(t[n]/255)*255):t[n]=Tn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Eh=0;class Oa{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Eh++}),this.uuid=qi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(or(s[a].image)):r.push(or(s[a]))}else r=or(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function or(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?yh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ce("Texture: Unable to serialize Texture."),{})}let bh=0;const lr=new B;class Ct extends jn{constructor(e=Ct.DEFAULT_IMAGE,t=Ct.DEFAULT_MAPPING,n=En,s=En,r=At,a=Kn,o=nn,c=Vt,l=Ct.DEFAULT_ANISOTROPY,h=Bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bh++}),this.uuid=qi(),this.name="",this.source=new Oa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ke(0,0),this.repeat=new ke(1,1),this.center=new ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(lr).x}get height(){return this.source.getSize(lr).y}get depth(){return this.source.getSize(lr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ce(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ce(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ul)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qr:e.x=e.x-Math.floor(e.x);break;case En:e.x=e.x<0?0:1;break;case Yr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qr:e.y=e.y-Math.floor(e.y);break;case En:e.y=e.y<0?0:1;break;case Yr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ct.DEFAULT_IMAGE=null;Ct.DEFAULT_MAPPING=Ul;Ct.DEFAULT_ANISOTROPY=1;const Wa=class Wa{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],p=c[5],_=c[9],S=c[2],m=c[6],f=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-S)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+S)<.1&&Math.abs(_+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(l+1)/2,M=(p+1)/2,b=(f+1)/2,y=(h+u)/4,w=(d+S)/4,x=(_+m)/4;return R>M&&R>b?R<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(R),s=y/n,r=w/n):M>b?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=y/s,r=x/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=w/r,s=x/r),this.set(n,s,r,t),this}let E=Math.sqrt((m-_)*(m-_)+(d-S)*(d-S)+(u-h)*(u-h));return Math.abs(E)<.001&&(E=1),this.x=(m-_)/E,this.y=(d-S)/E,this.z=(u-h)/E,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this.w=Ve(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this.w=Ve(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Wa.prototype.isVector4=!0;let ct=Wa;class Th extends jn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:At,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new Ct(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:At,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Oa(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class sn extends Th{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class kl extends Ct{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ah extends Ct{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Gs=class Gs{constructor(e,t,n,s,r,a,o,c,l,h,d,u,p,_,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,d,u,p,_,S,m)}set(e,t,n,s,r,a,o,c,l,h,d,u,p,_,S,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=_,f[11]=S,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Gs().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/si.setFromMatrixColumn(e,0).length(),r=1/si.setFromMatrixColumn(e,1).length(),a=1/si.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,p=a*d,_=o*h,S=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=p+_*l,t[5]=u-S*l,t[9]=-o*c,t[2]=S-u*l,t[6]=_+p*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*h,p=c*d,_=l*h,S=l*d;t[0]=u+S*o,t[4]=_*o-p,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-_,t[6]=S+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*h,p=c*d,_=l*h,S=l*d;t[0]=u-S*o,t[4]=-a*d,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*h,t[9]=S-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*h,p=a*d,_=o*h,S=o*d;t[0]=c*h,t[4]=_*l-p,t[8]=u*l+S,t[1]=c*d,t[5]=S*l+u,t[9]=p*l-_,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,p=a*l,_=o*c,S=o*l;t[0]=c*h,t[4]=S-u*d,t[8]=_*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*d+_,t[10]=u-S*d}else if(e.order==="XZY"){const u=a*c,p=a*l,_=o*c,S=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+S,t[5]=a*h,t[9]=p*d-_,t[2]=_*d-p,t[6]=o*h,t[10]=S*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(wh,e,Rh)}lookAt(e,t,n){const s=this.elements;return Ft.subVectors(e,t),Ft.lengthSq()===0&&(Ft.z=1),Ft.normalize(),Dn.crossVectors(n,Ft),Dn.lengthSq()===0&&(Math.abs(n.z)===1?Ft.x+=1e-4:Ft.z+=1e-4,Ft.normalize(),Dn.crossVectors(n,Ft)),Dn.normalize(),Qi.crossVectors(Ft,Dn),s[0]=Dn.x,s[4]=Qi.x,s[8]=Ft.x,s[1]=Dn.y,s[5]=Qi.y,s[9]=Ft.y,s[2]=Dn.z,s[6]=Qi.z,s[10]=Ft.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],p=n[13],_=n[2],S=n[6],m=n[10],f=n[14],E=n[3],R=n[7],M=n[11],b=n[15],y=s[0],w=s[4],x=s[8],A=s[12],D=s[1],N=s[5],P=s[9],F=s[13],C=s[2],z=s[6],q=s[10],W=s[14],te=s[3],X=s[7],Q=s[11],ee=s[15];return r[0]=a*y+o*D+c*C+l*te,r[4]=a*w+o*N+c*z+l*X,r[8]=a*x+o*P+c*q+l*Q,r[12]=a*A+o*F+c*W+l*ee,r[1]=h*y+d*D+u*C+p*te,r[5]=h*w+d*N+u*z+p*X,r[9]=h*x+d*P+u*q+p*Q,r[13]=h*A+d*F+u*W+p*ee,r[2]=_*y+S*D+m*C+f*te,r[6]=_*w+S*N+m*z+f*X,r[10]=_*x+S*P+m*q+f*Q,r[14]=_*A+S*F+m*W+f*ee,r[3]=E*y+R*D+M*C+b*te,r[7]=E*w+R*N+M*z+b*X,r[11]=E*x+R*P+M*q+b*Q,r[15]=E*A+R*F+M*W+b*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],p=e[14],_=e[3],S=e[7],m=e[11],f=e[15],E=c*p-l*u,R=o*p-l*d,M=o*u-c*d,b=a*p-l*h,y=a*u-c*h,w=a*d-o*h;return t*(S*E-m*R+f*M)-n*(_*E-m*b+f*y)+s*(_*R-S*b+f*w)-r*(_*M-S*y+m*w)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(r*h-o*c)+s*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],p=e[11],_=e[12],S=e[13],m=e[14],f=e[15],E=t*o-n*a,R=t*c-s*a,M=t*l-r*a,b=n*c-s*o,y=n*l-r*o,w=s*l-r*c,x=h*S-d*_,A=h*m-u*_,D=h*f-p*_,N=d*m-u*S,P=d*f-p*S,F=u*f-p*m,C=E*F-R*P+M*N+b*D-y*A+w*x;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/C;return e[0]=(o*F-c*P+l*N)*z,e[1]=(s*P-n*F-r*N)*z,e[2]=(S*w-m*y+f*b)*z,e[3]=(u*y-d*w-p*b)*z,e[4]=(c*D-a*F-l*A)*z,e[5]=(t*F-s*D+r*A)*z,e[6]=(m*M-_*w-f*R)*z,e[7]=(h*w-u*M+p*R)*z,e[8]=(a*P-o*D+l*x)*z,e[9]=(n*D-t*P-r*x)*z,e[10]=(_*y-S*M+f*E)*z,e[11]=(d*M-h*y-p*E)*z,e[12]=(o*A-a*N-c*x)*z,e[13]=(t*N-n*A+s*x)*z,e[14]=(S*R-_*b-m*E)*z,e[15]=(h*b-d*R+u*E)*z,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,d=o+o,u=r*l,p=r*h,_=r*d,S=a*h,m=a*d,f=o*d,E=c*l,R=c*h,M=c*d,b=n.x,y=n.y,w=n.z;return s[0]=(1-(S+f))*b,s[1]=(p+M)*b,s[2]=(_-R)*b,s[3]=0,s[4]=(p-M)*y,s[5]=(1-(u+f))*y,s[6]=(m+E)*y,s[7]=0,s[8]=(_+R)*w,s[9]=(m-E)*w,s[10]=(1-(u+S))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=si.set(s[0],s[1],s[2]).length();const o=si.set(s[4],s[5],s[6]).length(),c=si.set(s[8],s[9],s[10]).length();r<0&&(a=-a),$t.copy(this);const l=1/a,h=1/o,d=1/c;return $t.elements[0]*=l,$t.elements[1]*=l,$t.elements[2]*=l,$t.elements[4]*=h,$t.elements[5]*=h,$t.elements[6]*=h,$t.elements[8]*=d,$t.elements[9]*=d,$t.elements[10]*=d,t.setFromRotationMatrix($t),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=un,c=!1){const l=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),p=(n+s)/(n-s);let _,S;if(c)_=r/(a-r),S=a*r/(a-r);else if(o===un)_=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===Wi)_=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=un,c=!1){const l=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),p=-(n+s)/(n-s);let _,S;if(c)_=1/(a-r),S=a/(a-r);else if(o===un)_=-2/(a-r),S=-(a+r)/(a-r);else if(o===Wi)_=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=_,l[14]=S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Gs.prototype.isMatrix4=!0;let ot=Gs;const si=new B,$t=new ot,wh=new B(0,0,0),Rh=new B(1,1,1),Dn=new B,Qi=new B,Ft=new B,xo=new ot,vo=new Ei;class Rn{constructor(e=0,t=0,n=0,s=Rn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ve(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ve(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return xo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vo.setFromEuler(this),this.setFromQuaternion(vo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rn.DEFAULT_ORDER="XYZ";class Wl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ch=0;const So=new B,ri=new Ei,_n=new ot,ji=new B,Ri=new B,Ph=new B,Lh=new Ei,Mo=new B(1,0,0),yo=new B(0,1,0),Eo=new B(0,0,1),bo={type:"added"},Dh={type:"removed"},ai={type:"childadded",child:null},cr={type:"childremoved",child:null};class mt extends jn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new B,t=new Rn,n=new Ei,s=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ot},normalMatrix:{value:new Le}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ri.setFromAxisAngle(e,t),this.quaternion.multiply(ri),this}rotateOnWorldAxis(e,t){return ri.setFromAxisAngle(e,t),this.quaternion.premultiply(ri),this}rotateX(e){return this.rotateOnAxis(Mo,e)}rotateY(e){return this.rotateOnAxis(yo,e)}rotateZ(e){return this.rotateOnAxis(Eo,e)}translateOnAxis(e,t){return So.copy(e).applyQuaternion(this.quaternion),this.position.add(So.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Mo,e)}translateY(e){return this.translateOnAxis(yo,e)}translateZ(e){return this.translateOnAxis(Eo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ji.copy(e):ji.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ri.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(Ri,ji,this.up):_n.lookAt(ji,Ri,this.up),this.quaternion.setFromRotationMatrix(_n),s&&(_n.extractRotation(s.matrixWorld),ri.setFromRotationMatrix(_n),this.quaternion.premultiply(ri.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ye("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bo),ai.child=e,this.dispatchEvent(ai),ai.child=null):Ye("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dh),cr.child=e,this.dispatchEvent(cr),cr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_n.multiply(e.parent.matrixWorld)),e.applyMatrix4(_n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bo),ai.child=e,this.dispatchEvent(ai),ai.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ri,e,Ph),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ri,Lh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}mt.DEFAULT_UP=new B(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Qt extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ih={type:"move"};class hr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const S of e.hand.values()){const m=t.getJointPose(S,n),f=this._getHandJoint(l,S);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,_=.005;l.inputState.pinching&&u>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ih)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Qt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Xl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},In={h:0,s:0,l:0},es={h:0,s:0,l:0};function ur(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ie{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ge.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ge.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ge.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ge.workingColorSpace){if(e=Sh(e,1),t=Ve(t,0,1),n=Ve(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ur(a,r,e+1/3),this.g=ur(a,r,e),this.b=ur(a,r,e-1/3)}return Ge.colorSpaceToWorking(this,s),this}setStyle(e,t=Gt){function n(r){r!==void 0&&parseFloat(r)<1&&Ce("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ce("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ce("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Gt){const n=Xl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ce("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Tn(e.r),this.g=Tn(e.g),this.b=Tn(e.b),this}copyLinearToSRGB(e){return this.r=Si(e.r),this.g=Si(e.g),this.b=Si(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gt){return Ge.workingToColorSpace(Tt.copy(this),e),Math.round(Ve(Tt.r*255,0,255))*65536+Math.round(Ve(Tt.g*255,0,255))*256+Math.round(Ve(Tt.b*255,0,255))}getHexString(e=Gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ge.workingColorSpace){Ge.workingToColorSpace(Tt.copy(this),t);const n=Tt.r,s=Tt.g,r=Tt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ge.workingColorSpace){return Ge.workingToColorSpace(Tt.copy(this),t),e.r=Tt.r,e.g=Tt.g,e.b=Tt.b,e}getStyle(e=Gt){Ge.workingToColorSpace(Tt.copy(this),e);const t=Tt.r,n=Tt.g,s=Tt.b;return e!==Gt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(In),this.setHSL(In.h+e,In.s+t,In.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(In),e.getHSL(es);const n=sr(In.h,es.h,t),s=sr(In.s,es.s,t),r=sr(In.l,es.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tt=new Ie;Ie.NAMES=Xl;class Uh extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rn,this.environmentIntensity=1,this.environmentRotation=new Rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Zt=new B,xn=new B,dr=new B,vn=new B,oi=new B,li=new B,To=new B,fr=new B,pr=new B,mr=new B,gr=new ct,_r=new ct,xr=new ct;class tn{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Zt.subVectors(e,t),s.cross(Zt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Zt.subVectors(s,t),xn.subVectors(n,t),dr.subVectors(e,t);const a=Zt.dot(Zt),o=Zt.dot(xn),c=Zt.dot(dr),l=xn.dot(xn),h=xn.dot(dr),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,p=(l*c-o*h)*u,_=(a*h-o*c)*u;return r.set(1-p-_,_,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,vn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,vn.x),c.addScaledVector(a,vn.y),c.addScaledVector(o,vn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return gr.setScalar(0),_r.setScalar(0),xr.setScalar(0),gr.fromBufferAttribute(e,t),_r.fromBufferAttribute(e,n),xr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(gr,r.x),a.addScaledVector(_r,r.y),a.addScaledVector(xr,r.z),a}static isFrontFacing(e,t,n,s){return Zt.subVectors(n,t),xn.subVectors(e,t),Zt.cross(xn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),Zt.cross(xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return tn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;oi.subVectors(s,n),li.subVectors(r,n),fr.subVectors(e,n);const c=oi.dot(fr),l=li.dot(fr);if(c<=0&&l<=0)return t.copy(n);pr.subVectors(e,s);const h=oi.dot(pr),d=li.dot(pr);if(h>=0&&d<=h)return t.copy(s);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(oi,a);mr.subVectors(e,r);const p=oi.dot(mr),_=li.dot(mr);if(_>=0&&p<=_)return t.copy(r);const S=p*l-c*_;if(S<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(n).addScaledVector(li,o);const m=h*_-p*d;if(m<=0&&d-h>=0&&p-_>=0)return To.subVectors(r,s),o=(d-h)/(d-h+(p-_)),t.copy(s).addScaledVector(To,o);const f=1/(m+S+u);return a=S*f,o=u*f,t.copy(n).addScaledVector(oi,a).addScaledVector(li,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class bi{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Jt):Jt.fromBufferAttribute(r,a),Jt.applyMatrix4(e.matrixWorld),this.expandByPoint(Jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ts.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ts.copy(n.boundingBox)),ts.applyMatrix4(e.matrixWorld),this.union(ts)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jt),Jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ci),ns.subVectors(this.max,Ci),ci.subVectors(e.a,Ci),hi.subVectors(e.b,Ci),ui.subVectors(e.c,Ci),Un.subVectors(hi,ci),Nn.subVectors(ui,hi),kn.subVectors(ci,ui);let t=[0,-Un.z,Un.y,0,-Nn.z,Nn.y,0,-kn.z,kn.y,Un.z,0,-Un.x,Nn.z,0,-Nn.x,kn.z,0,-kn.x,-Un.y,Un.x,0,-Nn.y,Nn.x,0,-kn.y,kn.x,0];return!vr(t,ci,hi,ui,ns)||(t=[1,0,0,0,1,0,0,0,1],!vr(t,ci,hi,ui,ns))?!1:(is.crossVectors(Un,Nn),t=[is.x,is.y,is.z],vr(t,ci,hi,ui,ns))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Sn=[new B,new B,new B,new B,new B,new B,new B,new B],Jt=new B,ts=new bi,ci=new B,hi=new B,ui=new B,Un=new B,Nn=new B,kn=new B,Ci=new B,ns=new B,is=new B,Wn=new B;function vr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Wn.fromArray(i,r);const o=s.x*Math.abs(Wn.x)+s.y*Math.abs(Wn.y)+s.z*Math.abs(Wn.z),c=e.dot(Wn),l=t.dot(Wn),h=n.dot(Wn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const ft=new B,ss=new ke;let Nh=0;class An extends jn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Nh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=mh,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ss.fromBufferAttribute(this,t),ss.applyMatrix3(e),this.setXY(t,ss.x,ss.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix3(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix4(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyNormalMatrix(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.transformDirection(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=It(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),s=It(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),s=It(s,this.array),r=It(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class ql extends An{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Yl extends An{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class St extends An{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Fh=new bi,Pi=new B,Sr=new B;class Yi{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Fh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Pi.subVectors(e,this.center);const t=Pi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Pi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Pi.copy(e.center).add(Sr)),this.expandByPoint(Pi.copy(e.center).sub(Sr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Oh=0;const qt=new ot,Mr=new mt,di=new B,Ot=new bi,Li=new bi,vt=new B;class kt extends jn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Oh++}),this.uuid=qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gh(e)?Yl:ql)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Le().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,n){return qt.makeTranslation(e,t,n),this.applyMatrix4(qt),this}scale(e,t,n){return qt.makeScale(e,t,n),this.applyMatrix4(qt),this}lookAt(e){return Mr.lookAt(e),Mr.updateMatrix(),this.applyMatrix4(Mr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(di).negate(),this.translate(di.x,di.y,di.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new St(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Ot.setFromBufferAttribute(r),this.morphTargetsRelative?(vt.addVectors(this.boundingBox.min,Ot.min),this.boundingBox.expandByPoint(vt),vt.addVectors(this.boundingBox.max,Ot.max),this.boundingBox.expandByPoint(vt)):(this.boundingBox.expandByPoint(Ot.min),this.boundingBox.expandByPoint(Ot.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const n=this.boundingSphere.center;if(Ot.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Li.setFromBufferAttribute(o),this.morphTargetsRelative?(vt.addVectors(Ot.min,Li.min),Ot.expandByPoint(vt),vt.addVectors(Ot.max,Li.max),Ot.expandByPoint(vt)):(Ot.expandByPoint(Li.min),Ot.expandByPoint(Li.max))}Ot.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)vt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(vt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)vt.fromBufferAttribute(o,l),c&&(di.fromBufferAttribute(e,l),vt.add(di)),s=Math.max(s,n.distanceToSquared(vt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new An(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new B,c[x]=new B;const l=new B,h=new B,d=new B,u=new ke,p=new ke,_=new ke,S=new B,m=new B;function f(x,A,D){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,A),d.fromBufferAttribute(n,D),u.fromBufferAttribute(r,x),p.fromBufferAttribute(r,A),_.fromBufferAttribute(r,D),h.sub(l),d.sub(l),p.sub(u),_.sub(u);const N=1/(p.x*_.y-_.x*p.y);isFinite(N)&&(S.copy(h).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(N),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-_.x).multiplyScalar(N),o[x].add(S),o[A].add(S),o[D].add(S),c[x].add(m),c[A].add(m),c[D].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let x=0,A=E.length;x<A;++x){const D=E[x],N=D.start,P=D.count;for(let F=N,C=N+P;F<C;F+=3)f(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const R=new B,M=new B,b=new B,y=new B;function w(x){b.fromBufferAttribute(s,x),y.copy(b);const A=o[x];R.copy(A),R.sub(b.multiplyScalar(b.dot(A))).normalize(),M.crossVectors(y,A);const N=M.dot(c[x])<0?-1:1;a.setXYZW(x,R.x,R.y,R.z,N)}for(let x=0,A=E.length;x<A;++x){const D=E[x],N=D.start,P=D.count;for(let F=N,C=N+P;F<C;F+=3)w(e.getX(F+0)),w(e.getX(F+1)),w(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new An(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const s=new B,r=new B,a=new B,o=new B,c=new B,l=new B,h=new B,d=new B;if(e)for(let u=0,p=e.count;u<p;u+=3){const _=e.getX(u+0),S=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,S),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,S),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(S,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)vt.fromBufferAttribute(e,t),vt.normalize(),e.setXYZ(t,vt.x,vt.y,vt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let p=0,_=0;for(let S=0,m=c.length;S<m;S++){o.isInterleavedBufferAttribute?p=c[S]*o.data.stride+o.offset:p=c[S]*h;for(let f=0;f<h;f++)u[_++]=l[p++]}return new An(u,h,d)}if(this.index===null)return Ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new kt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],p=e(u,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const p=l[d];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yr=new B,Bh=new B,zh=new Le;class On{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=yr.subVectors(n,t).cross(Bh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(yr),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||zh.getNormalMatrix(e),s=this.coplanarPoint(yr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Hh=0;class mn extends jn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=qi(),this.name="",this.type="Material",this.blending=zi,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Tl,this.blendDst=Al,this.blendEquation=gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ie(0,0,0),this.blendAlpha=0,this.depthFunc=Gi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=nr,this.stencilZFail=nr,this.stencilZPass=nr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ce(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ce(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ie().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new On().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ke().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ke().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Mn=new B,Er=new B,rs=new B,as=new B;class Ba{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Mn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mn.copy(this.origin).addScaledVector(this.direction,t),Mn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Er.copy(e).add(t).multiplyScalar(.5),rs.copy(t).sub(e).normalize(),as.copy(this.origin).sub(Er);const r=e.distanceTo(t)*.5,a=-this.direction.dot(rs),o=as.dot(this.direction),c=-as.dot(rs),l=as.lengthSq(),h=Math.abs(1-a*a);let d,u,p,_;if(h>0)if(d=a*c-o,u=a*o-c,_=r*h,d>=0)if(u>=-_)if(u<=_){const S=1/h;d*=S,u*=S,p=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u<=-_?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l):u<=_?(d=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Er).addScaledVector(rs,u),p}intersectSphere(e,t){if(e.radius<0)return null;Mn.subVectors(e.center,this.origin);const n=Mn.dot(this.direction),s=Mn.dot(Mn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Mn)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,p=e.z-a.z,_=t.x-a.x,S=t.y-a.y,m=t.z-a.z,f=n.x-a.x,E=n.y-a.y,R=n.z-a.z,M=Math.abs(c),b=Math.abs(l),y=Math.abs(h);let w,x,A,D,N,P,F,C,z,q,W,te;if(M>=b&&M>=y?(A=c,P=d,z=_,te=f,c>=0?(w=l,x=h,D=u,N=p,F=S,C=m,q=E,W=R):(w=h,x=l,D=p,N=u,F=m,C=S,q=R,W=E)):b>=y?(A=l,P=u,z=S,te=E,l>=0?(w=h,x=c,D=p,N=d,F=m,C=_,q=R,W=f):(w=c,x=h,D=d,N=p,F=_,C=m,q=f,W=R)):(A=h,P=p,z=m,te=R,h>=0?(w=c,x=l,D=d,N=u,F=_,C=S,q=f,W=E):(w=l,x=c,D=u,N=d,F=S,C=_,q=E,W=f)),A===0)return null;const X=w/A,Q=x/A,ee=1/A,be=D-X*P,Me=N-Q*P,tt=F-X*z,We=C-Q*z,Ke=q-X*te,K=W-Q*te,j=Ke*We-K*tt,_e=be*K-Me*Ke,Pe=tt*Me-We*be;if(s){if(j<0||_e<0||Pe<0)return null}else if((j<0||_e<0||Pe<0)&&(j>0||_e>0||Pe>0))return null;const me=j+_e+Pe;if(me===0)return null;const Oe=ee*(j*P+_e*z+Pe*te);return(me>0?Oe<0:Oe>0)?null:this.at(Oe/me,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kl extends mn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=Vs,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ao=new ot,Xn=new Ba,os=new Yi,wo=new B,ls=new B,cs=new B,hs=new B,br=new B,us=new B,Ro=new B,ds=new B;class Wt extends mt{constructor(e=new kt,t=new Kl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){us.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(br.fromBufferAttribute(d,e),a?us.addScaledVector(br,h):us.addScaledVector(br.sub(t),h))}t.add(us)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),os.copy(n.boundingSphere),os.applyMatrix4(r),Xn.copy(e.ray).recast(e.near),!(os.containsPoint(Xn.origin)===!1&&(Xn.intersectSphere(os,wo)===null||Xn.origin.distanceToSquared(wo)>(e.far-e.near)**2))&&(Ao.copy(r).invert(),Xn.copy(e.ray).applyMatrix4(Ao),!(n.boundingBox!==null&&Xn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Xn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,S=u.length;_<S;_++){const m=u[_],f=a[m.materialIndex],E=Math.max(m.start,p.start),R=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let M=E,b=R;M<b;M+=3){const y=o.getX(M),w=o.getX(M+1),x=o.getX(M+2);s=fs(this,f,e,n,l,h,d,y,w,x),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),S=Math.min(o.count,p.start+p.count);for(let m=_,f=S;m<f;m+=3){const E=o.getX(m),R=o.getX(m+1),M=o.getX(m+2);s=fs(this,a,e,n,l,h,d,E,R,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,S=u.length;_<S;_++){const m=u[_],f=a[m.materialIndex],E=Math.max(m.start,p.start),R=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let M=E,b=R;M<b;M+=3){const y=M,w=M+1,x=M+2;s=fs(this,f,e,n,l,h,d,y,w,x),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),S=Math.min(c.count,p.start+p.count);for(let m=_,f=S;m<f;m+=3){const E=m,R=m+1,M=m+2;s=fs(this,a,e,n,l,h,d,E,R,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Gh(i,e,t,n,s,r,a,o){let c;if(e.side===Nt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Zn,o),c===null)return null;ds.copy(o),ds.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ds);return l<t.near||l>t.far?null:{distance:l,point:ds.clone(),object:i}}function fs(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,ls),i.getVertexPosition(c,cs),i.getVertexPosition(l,hs);const h=Gh(i,e,t,n,ls,cs,hs,Ro);if(h){const d=new B;tn.getBarycoord(Ro,ls,cs,hs,d),s&&(h.uv=tn.getInterpolatedAttribute(s,o,c,l,d,new ke)),r&&(h.uv1=tn.getInterpolatedAttribute(r,o,c,l,d,new ke)),a&&(h.normal=tn.getInterpolatedAttribute(a,o,c,l,d,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new B,materialIndex:0};tn.getNormal(ls,cs,hs,u.normal),h.face=u,h.barycoord=d}return h}class Vh extends Ct{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Mt,h=Mt,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const qn=new Yi,kh=new ke(.5,.5),ps=new B;class za{constructor(e=new On,t=new On,n=new On,s=new On,r=new On,a=new On){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=un,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],p=r[7],_=r[8],S=r[9],m=r[10],f=r[11],E=r[12],R=r[13],M=r[14],b=r[15];if(s[0].setComponents(l-a,p-h,f-_,b-E).normalize(),s[1].setComponents(l+a,p+h,f+_,b+E).normalize(),s[2].setComponents(l+o,p+d,f+S,b+R).normalize(),s[3].setComponents(l-o,p-d,f-S,b-R).normalize(),n)s[4].setComponents(c,u,m,M).normalize(),s[5].setComponents(l-c,p-u,f-m,b-M).normalize();else if(s[4].setComponents(l-c,p-u,f-m,b-M).normalize(),t===un)s[5].setComponents(l+c,p+u,f+m,b+M).normalize();else if(t===Wi)s[5].setComponents(c,u,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qn)}intersectsSprite(e){qn.center.set(0,0,0);const t=kh.distanceTo(e.center);return qn.radius=.7071067811865476+t,qn.applyMatrix4(e.matrixWorld),this.intersectsSphere(qn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ps.x=s.normal.x>0?e.max.x:e.min.x,ps.y=s.normal.y>0?e.max.y:e.min.y,ps.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ps)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ps extends mn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Bs=new B,zs=new B,Co=new ot,Di=new Ba,ms=new Yi,Tr=new B,Po=new B;class Wh extends mt{constructor(e=new kt,t=new Ps){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Bs.fromBufferAttribute(t,s-1),zs.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Bs.distanceTo(zs);e.setAttribute("lineDistance",new St(n,1))}else Ce("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ms.copy(n.boundingSphere),ms.applyMatrix4(s),ms.radius+=r,e.ray.intersectsSphere(ms)===!1)return;Co.copy(s).invert(),Di.copy(e.ray).applyMatrix4(Co);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const p=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let S=p,m=_-1;S<m;S+=l){const f=h.getX(S),E=h.getX(S+1),R=gs(this,e,Di,c,f,E,S);R&&t.push(R)}if(this.isLineLoop){const S=h.getX(_-1),m=h.getX(p),f=gs(this,e,Di,c,S,m,_-1);f&&t.push(f)}}else{const p=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let S=p,m=_-1;S<m;S+=l){const f=gs(this,e,Di,c,S,S+1,S);f&&t.push(f)}if(this.isLineLoop){const S=gs(this,e,Di,c,_-1,p,_-1);S&&t.push(S)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function gs(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Bs.fromBufferAttribute(o,s),zs.fromBufferAttribute(o,r),t.distanceSqToSegment(Bs,zs,Tr,Po)>n)return;Tr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Tr);if(!(l<e.near||l>e.far))return{distance:l,point:Po.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Lo=new B,Do=new B;class Io extends Wh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Lo.fromBufferAttribute(t,s),Do.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Lo.distanceTo(Do);e.setAttribute("lineDistance",new St(n,1))}else Ce("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Oi extends mn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Uo=new ot,Ta=new Ba,_s=new Yi,xs=new B;class Ar extends mt{constructor(e=new kt,t=new Oi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_s.copy(n.boundingSphere),_s.applyMatrix4(s),_s.radius+=r,e.ray.intersectsSphere(_s)===!1)return;Uo.copy(s).invert(),Ta.copy(e.ray).applyMatrix4(Uo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let _=u,S=p;_<S;_++){const m=l.getX(_);xs.fromBufferAttribute(d,m),No(xs,m,c,s,e,t,this)}}else{const u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let _=u,S=p;_<S;_++)xs.fromBufferAttribute(d,_),No(xs,_,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function No(i,e,t,n,s,r,a){const o=Ta.distanceSqToPoint(i);if(o<t){const c=new B;Ta.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class $l extends Ct{constructor(e=[],t=Jn,n,s,r,a,o,c,l,h){super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Xi extends Ct{constructor(e,t,n=fn,s,r,a,o=Mt,c=Mt,l,h=wn,d=1){if(h!==wn&&h!==$n)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Oa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Xh extends Xi{constructor(e,t=fn,n=Jn,s,r,a=Mt,o=Mt,c,l=wn){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Zl extends Ct{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ki extends kt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,p=0;_("z","y","x",-1,-1,n,t,e,a,r,0),_("z","y","x",1,-1,n,t,-e,a,r,1),_("x","z","y",1,1,e,n,t,s,a,2),_("x","z","y",1,-1,e,n,-t,s,a,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new St(l,3)),this.setAttribute("normal",new St(h,3)),this.setAttribute("uv",new St(d,2));function _(S,m,f,E,R,M,b,y,w,x,A){const D=M/w,N=b/x,P=M/2,F=b/2,C=y/2,z=w+1,q=x+1;let W=0,te=0;const X=new B;for(let Q=0;Q<q;Q++){const ee=Q*N-F;for(let be=0;be<z;be++){const Me=be*D-P;X[S]=Me*E,X[m]=ee*R,X[f]=C,l.push(X.x,X.y,X.z),X[S]=0,X[m]=0,X[f]=y>0?1:-1,h.push(X.x,X.y,X.z),d.push(be/w),d.push(1-Q/x),W+=1}}for(let Q=0;Q<x;Q++)for(let ee=0;ee<w;ee++){const be=u+ee+z*Q,Me=u+ee+z*(Q+1),tt=u+(ee+1)+z*(Q+1),We=u+(ee+1)+z*Q;c.push(be,Me,We),c.push(Me,tt,We),te+=6}o.addGroup(p,te,A),p+=te,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ki(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ws extends kt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=e/o,u=t/c,p=[],_=[],S=[],m=[];for(let f=0;f<h;f++){const E=f*u-a;for(let R=0;R<l;R++){const M=R*d-r;_.push(M,-E,0),S.push(0,0,1),m.push(R/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let E=0;E<o;E++){const R=E+l*f,M=E+l*(f+1),b=E+1+l*(f+1),y=E+1+l*f;p.push(R,M,y),p.push(M,b,y)}this.setIndex(p),this.setAttribute("position",new St(_,3)),this.setAttribute("normal",new St(S,3)),this.setAttribute("uv",new St(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ws(e.width,e.height,e.widthSegments,e.heightSegments)}}function yi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Fo(s))s.isRenderTargetTexture?(Ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Fo(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Rt(i){const e={};for(let t=0;t<i.length;t++){const n=yi(i[t]);for(const s in n)e[s]=n[s]}return e}function Fo(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function qh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Jl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ge.workingColorSpace}const Yh={clone:yi,merge:Rt};var Kh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$h=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gn extends mn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kh,this.fragmentShader=$h,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=yi(e.uniforms),this.uniformsGroups=qh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ie().setHex(s.value);break;case"v2":this.uniforms[n].value=new ke().fromArray(s.value);break;case"v3":this.uniforms[n].value=new B().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ct().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Le().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ot().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Zh extends gn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ql extends mn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ie(16777215),this.specular=new Ie(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Us,this.normalScale=new ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=Vs,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Jh extends mn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Us,this.normalScale=new ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=Vs,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Qh extends mn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ah,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class jh extends mn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Oo={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Bo(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Bo(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Bo(i){try{const e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class eu{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){const d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){const p=l[d],_=l[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const tu=new eu;class Ha{constructor(e){this.manager=e!==void 0?e:tu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ha.DEFAULT_MATERIAL_NAME="__DEFAULT";const yn={};class nu extends Error{constructor(e,t){super(e),this.response=t}}class iu extends Ha{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Oo.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(yn[e]!==void 0){yn[e].push({onLoad:t,onProgress:n,onError:s});return}yn[e]=[],yn[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ce("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=yn[e],d=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=u?parseInt(u):0,_=p!==0;let S=0;const m=new ReadableStream({start(f){E();function E(){d.read().then(({done:R,value:M})=>{if(R)f.close();else{S+=M.byteLength;const b=new ProgressEvent("progress",{lengthComputable:_,loaded:S,total:p});for(let y=0,w=h.length;y<w;y++){const x=h[y];x.onProgress&&x.onProgress(b)}f.enqueue(M),E()}},R=>{f.error(R)})}}});return new Response(m)}else throw new nu(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,p=new TextDecoder(u);return l.arrayBuffer().then(_=>p.decode(_))}}}).then(l=>{Oo.add(`file:${e}`,l);const h=yn[e];delete yn[e];for(let d=0,u=h.length;d<u;d++){const p=h[d];p.onLoad&&p.onLoad(l)}}).catch(l=>{const h=yn[e];if(h===void 0)throw this.manager.itemError(e),l;delete yn[e];for(let d=0,u=h.length;d<u;d++){const p=h[d];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class jl extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ie(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class su extends jl{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ie(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const wr=new ot,zo=new B,Ho=new B;class ru{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ke(512,512),this.mapType=Vt,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new za,this._frameExtents=new ke(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;zo.setFromMatrixPosition(e.matrixWorld),t.position.copy(zo),Ho.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ho),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){wr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(wr,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Wi||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(wr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const vs=new B,Ss=new Ei,on=new B;class ec extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(vs,Ss,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vs,Ss,on.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(vs,Ss,on),on.x===1&&on.y===1&&on.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vs,Ss,on.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Fn=new B,Go=new ke,Vo=new ke;class jt extends ec{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ba*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ir*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ba*2*Math.atan(Math.tan(ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z)}getViewSize(e,t){return this.getViewBounds(e,Go,Vo),t.subVectors(Vo,Go)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ir*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Xs extends ec{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class au extends ru{constructor(){super(new Xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ou extends jl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new au}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const fi=-90,pi=1;class lu extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new jt(fi,pi,e,t);s.layers=this.layers,this.add(s);const r=new jt(fi,pi,e,t);r.layers=this.layers,this.add(r);const a=new jt(fi,pi,e,t);a.layers=this.layers,this.add(a);const o=new jt(fi,pi,e,t);o.layers=this.layers,this.add(o);const c=new jt(fi,pi,e,t);c.layers=this.layers,this.add(c);const l=new jt(fi,pi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===un)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Wi)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=S,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class cu extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Xa=class Xa{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Xa.prototype.isMatrix2=!0;let ko=Xa;function Wo(i,e,t,n){const s=hu(n);switch(t){case zl:return i*e;case Gl:return i*e/s.components*s.byteLength;case Da:return i*e/s.components*s.byteLength;case Qn:return i*e*2/s.components*s.byteLength;case Ia:return i*e*2/s.components*s.byteLength;case Hl:return i*e*3/s.components*s.byteLength;case nn:return i*e*4/s.components*s.byteLength;case Ua:return i*e*4/s.components*s.byteLength;case As:case ws:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Rs:case Cs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case $r:case Jr:return Math.max(i,16)*Math.max(e,8)/4;case Kr:case Zr:return Math.max(i,8)*Math.max(e,8)/2;case Qr:case jr:case ta:case na:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ea:case Ds:case ia:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ra:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case aa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case oa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case la:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ca:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ha:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ua:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case da:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case fa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case pa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ma:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ga:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case _a:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case xa:case va:case Sa:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ma:case ya:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Is:case Ea:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function hu(i){switch(i){case Vt:case Nl:return{byteLength:1,components:1};case Vi:case Fl:case pn:return{byteLength:2,components:1};case Pa:case La:return{byteLength:2,components:4};case fn:case Ca:case hn:return{byteLength:4,components:1};case Ol:case Bl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ra}}));typeof window<"u"&&(window.__THREE__?Ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ra);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function tc(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function uu(i){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((p,_)=>p.start-_.start);let u=0;for(let p=1;p<d.length;p++){const _=d[u],S=d[p];S.start<=_.start+_.count+1?_.count=Math.max(_.count,S.start+S.count-_.start):(++u,d[u]=S)}d.length=u+1;for(let p=0,_=d.length;p<_;p++){const S=d[p];i.bufferSubData(l,S.start*h.BYTES_PER_ELEMENT,h,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var du=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,pu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_u=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,vu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Su=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Mu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Eu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Tu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Au=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,wu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ru=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Pu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Du=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Iu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Uu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Nu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ou=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Bu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vu="gl_FragColor = linearToOutputTexel( gl_FragColor );",ku=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Wu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Xu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,qu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Yu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ku=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$u=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ju=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ju=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ed=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,td=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,nd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,id=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,sd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,rd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ad=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,od=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ld=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,hd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ud=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,dd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,fd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pd=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,md=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_d=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Md=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,yd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ed=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Td=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ad=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Cd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ld=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Dd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Id=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ud=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Nd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Fd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Od=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Vd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,$d=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Zd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Jd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Qd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ef=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,nf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,af=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,of=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,lf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,df=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ff=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Sf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Mf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,yf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Af=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Rf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Df=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,If=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Uf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Nf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ff=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Of=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Bf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Vf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ne={alphahash_fragment:du,alphahash_pars_fragment:fu,alphamap_fragment:pu,alphamap_pars_fragment:mu,alphatest_fragment:gu,alphatest_pars_fragment:_u,aomap_fragment:xu,aomap_pars_fragment:vu,batching_pars_vertex:Su,batching_vertex:Mu,begin_vertex:yu,beginnormal_vertex:Eu,bsdfs:bu,iridescence_fragment:Tu,bumpmap_pars_fragment:Au,clipping_planes_fragment:wu,clipping_planes_pars_fragment:Ru,clipping_planes_pars_vertex:Cu,clipping_planes_vertex:Pu,color_fragment:Lu,color_pars_fragment:Du,color_pars_vertex:Iu,color_vertex:Uu,common:Nu,cube_uv_reflection_fragment:Fu,defaultnormal_vertex:Ou,displacementmap_pars_vertex:Bu,displacementmap_vertex:zu,emissivemap_fragment:Hu,emissivemap_pars_fragment:Gu,colorspace_fragment:Vu,colorspace_pars_fragment:ku,envmap_fragment:Wu,envmap_common_pars_fragment:Xu,envmap_pars_fragment:qu,envmap_pars_vertex:Yu,envmap_physical_pars_fragment:sd,envmap_vertex:Ku,fog_vertex:$u,fog_pars_vertex:Zu,fog_fragment:Ju,fog_pars_fragment:Qu,gradientmap_pars_fragment:ju,lightmap_pars_fragment:ed,lights_lambert_fragment:td,lights_lambert_pars_fragment:nd,lights_pars_begin:id,lights_toon_fragment:rd,lights_toon_pars_fragment:ad,lights_phong_fragment:od,lights_phong_pars_fragment:ld,lights_physical_fragment:cd,lights_physical_pars_fragment:hd,lights_fragment_begin:ud,lights_fragment_maps:dd,lights_fragment_end:fd,lightprobes_pars_fragment:pd,logdepthbuf_fragment:md,logdepthbuf_pars_fragment:gd,logdepthbuf_pars_vertex:_d,logdepthbuf_vertex:xd,map_fragment:vd,map_pars_fragment:Sd,map_particle_fragment:Md,map_particle_pars_fragment:yd,metalnessmap_fragment:Ed,metalnessmap_pars_fragment:bd,morphinstance_vertex:Td,morphcolor_vertex:Ad,morphnormal_vertex:wd,morphtarget_pars_vertex:Rd,morphtarget_vertex:Cd,normal_fragment_begin:Pd,normal_fragment_maps:Ld,normal_pars_fragment:Dd,normal_pars_vertex:Id,normal_vertex:Ud,normalmap_pars_fragment:Nd,clearcoat_normal_fragment_begin:Fd,clearcoat_normal_fragment_maps:Od,clearcoat_pars_fragment:Bd,iridescence_pars_fragment:zd,opaque_fragment:Hd,packing:Gd,premultiplied_alpha_fragment:Vd,project_vertex:kd,dithering_fragment:Wd,dithering_pars_fragment:Xd,roughnessmap_fragment:qd,roughnessmap_pars_fragment:Yd,shadowmap_pars_fragment:Kd,shadowmap_pars_vertex:$d,shadowmap_vertex:Zd,shadowmask_pars_fragment:Jd,skinbase_vertex:Qd,skinning_pars_vertex:jd,skinning_vertex:ef,skinnormal_vertex:tf,specularmap_fragment:nf,specularmap_pars_fragment:sf,tonemapping_fragment:rf,tonemapping_pars_fragment:af,transmission_fragment:of,transmission_pars_fragment:lf,uv_pars_fragment:cf,uv_pars_vertex:hf,uv_vertex:uf,worldpos_vertex:df,background_vert:ff,background_frag:pf,backgroundCube_vert:mf,backgroundCube_frag:gf,cube_vert:_f,cube_frag:xf,depth_vert:vf,depth_frag:Sf,distance_vert:Mf,distance_frag:yf,equirect_vert:Ef,equirect_frag:bf,linedashed_vert:Tf,linedashed_frag:Af,meshbasic_vert:wf,meshbasic_frag:Rf,meshlambert_vert:Cf,meshlambert_frag:Pf,meshmatcap_vert:Lf,meshmatcap_frag:Df,meshnormal_vert:If,meshnormal_frag:Uf,meshphong_vert:Nf,meshphong_frag:Ff,meshphysical_vert:Of,meshphysical_frag:Bf,meshtoon_vert:zf,meshtoon_frag:Hf,points_vert:Gf,points_frag:Vf,shadow_vert:kf,shadow_frag:Wf,sprite_vert:Xf,sprite_frag:qf},he={common:{diffuse:{value:new Ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Le}},envmap:{envMap:{value:null},envMapRotation:{value:new Le},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Le},normalScale:{value:new ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new Ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0},uvTransform:{value:new Le}},sprite:{diffuse:{value:new Ie(16777215)},opacity:{value:1},center:{value:new ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}}},cn={basic:{uniforms:Rt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:Rt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ie(0)},envMapIntensity:{value:1}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:Rt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ie(0)},specular:{value:new Ie(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:Rt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:Rt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Ie(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:Rt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:Rt([he.points,he.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:Rt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:Rt([he.common,he.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:Rt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:Rt([he.sprite,he.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Le}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distance:{uniforms:Rt([he.common,he.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distance_vert,fragmentShader:Ne.distance_frag},shadow:{uniforms:Rt([he.lights,he.fog,{color:{value:new Ie(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};cn.physical={uniforms:Rt([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Le},clearcoatNormalScale:{value:new ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Le},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Le},sheen:{value:0},sheenColor:{value:new Ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Le},transmissionSamplerSize:{value:new ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Le},attenuationDistance:{value:0},attenuationColor:{value:new Ie(0)},specularColor:{value:new Ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Le},anisotropyVector:{value:new ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Le}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const Ms={r:0,b:0,g:0},Yf=new ot,nc=new Le;nc.set(-1,0,0,0,1,0,0,0,1);function Kf(i,e,t,n,s,r){const a=new Ie(0);let o=s===!0?0:1,c,l,h=null,d=0,u=null;function p(E){let R=E.isScene===!0?E.background:null;if(R&&R.isTexture){const M=E.backgroundBlurriness>0;R=e.get(R,M)}return R}function _(E){let R=!1;const M=p(E);M===null?m(a,o):M&&M.isColor&&(m(M,1),R=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function S(E,R){const M=p(R);M&&(M.isCubeTexture||M.mapping===ks)?(l===void 0&&(l=new Wt(new Ki(1,1,1),new gn({name:"BackgroundCubeMaterial",uniforms:yi(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Nt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(b,y,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Yf.makeRotationFromEuler(R.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(nc),l.material.toneMapped=Ge.getTransfer(M.colorSpace)!==Qe,(h!==M||d!==M.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,u=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Wt(new Ws(2,2),new gn({name:"BackgroundMaterial",uniforms:yi(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.toneMapped=Ge.getTransfer(M.colorSpace)!==Qe,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,d=M.version,u=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function m(E,R){E.getRGB(Ms,Jl(i)),t.buffers.color.setClear(Ms.r,Ms.g,Ms.b,R,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,R=1){a.set(E),o=R,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,m(a,o)},render:_,addToRenderList:S,dispose:f}}function $f(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(N,P,F,C,z){let q=!1;const W=d(N,C,F,P);r!==W&&(r=W,l(r.object)),q=p(N,C,F,z),q&&_(N,C,F,z),z!==null&&e.update(z,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,M(N,P,F,C),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function c(){return i.createVertexArray()}function l(N){return i.bindVertexArray(N)}function h(N){return i.deleteVertexArray(N)}function d(N,P,F,C){const z=C.wireframe===!0;let q=n[P.id];q===void 0&&(q={},n[P.id]=q);const W=N.isInstancedMesh===!0?N.id:0;let te=q[W];te===void 0&&(te={},q[W]=te);let X=te[F.id];X===void 0&&(X={},te[F.id]=X);let Q=X[z];return Q===void 0&&(Q=u(c()),X[z]=Q),Q}function u(N){const P=[],F=[],C=[];for(let z=0;z<t;z++)P[z]=0,F[z]=0,C[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:C,object:N,attributes:{},index:null}}function p(N,P,F,C){const z=r.attributes,q=P.attributes;let W=0;const te=F.getAttributes();for(const X in te)if(te[X].location>=0){const ee=z[X];let be=q[X];if(be===void 0&&(X==="instanceMatrix"&&N.instanceMatrix&&(be=N.instanceMatrix),X==="instanceColor"&&N.instanceColor&&(be=N.instanceColor)),ee===void 0||ee.attribute!==be||be&&ee.data!==be.data)return!0;W++}return r.attributesNum!==W||r.index!==C}function _(N,P,F,C){const z={},q=P.attributes;let W=0;const te=F.getAttributes();for(const X in te)if(te[X].location>=0){let ee=q[X];ee===void 0&&(X==="instanceMatrix"&&N.instanceMatrix&&(ee=N.instanceMatrix),X==="instanceColor"&&N.instanceColor&&(ee=N.instanceColor));const be={};be.attribute=ee,ee&&ee.data&&(be.data=ee.data),z[X]=be,W++}r.attributes=z,r.attributesNum=W,r.index=C}function S(){const N=r.newAttributes;for(let P=0,F=N.length;P<F;P++)N[P]=0}function m(N){f(N,0)}function f(N,P){const F=r.newAttributes,C=r.enabledAttributes,z=r.attributeDivisors;F[N]=1,C[N]===0&&(i.enableVertexAttribArray(N),C[N]=1),z[N]!==P&&(i.vertexAttribDivisor(N,P),z[N]=P)}function E(){const N=r.newAttributes,P=r.enabledAttributes;for(let F=0,C=P.length;F<C;F++)P[F]!==N[F]&&(i.disableVertexAttribArray(F),P[F]=0)}function R(N,P,F,C,z,q,W){W===!0?i.vertexAttribIPointer(N,P,F,z,q):i.vertexAttribPointer(N,P,F,C,z,q)}function M(N,P,F,C){S();const z=C.attributes,q=F.getAttributes(),W=P.defaultAttributeValues;for(const te in q){const X=q[te];if(X.location>=0){let Q=z[te];if(Q===void 0&&(te==="instanceMatrix"&&N.instanceMatrix&&(Q=N.instanceMatrix),te==="instanceColor"&&N.instanceColor&&(Q=N.instanceColor)),Q!==void 0){const ee=Q.normalized,be=Q.itemSize,Me=e.get(Q);if(Me===void 0)continue;const tt=Me.buffer,We=Me.type,Ke=Me.bytesPerElement,K=We===i.INT||We===i.UNSIGNED_INT||Q.gpuType===Ca;if(Q.isInterleavedBufferAttribute){const j=Q.data,_e=j.stride,Pe=Q.offset;if(j.isInstancedInterleavedBuffer){for(let me=0;me<X.locationSize;me++)f(X.location+me,j.meshPerAttribute);N.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let me=0;me<X.locationSize;me++)m(X.location+me);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let me=0;me<X.locationSize;me++)R(X.location+me,be/X.locationSize,We,ee,_e*Ke,(Pe+be/X.locationSize*me)*Ke,K)}else{if(Q.isInstancedBufferAttribute){for(let j=0;j<X.locationSize;j++)f(X.location+j,Q.meshPerAttribute);N.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let j=0;j<X.locationSize;j++)m(X.location+j);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let j=0;j<X.locationSize;j++)R(X.location+j,be/X.locationSize,We,ee,be*Ke,be/X.locationSize*j*Ke,K)}}else if(W!==void 0){const ee=W[te];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(X.location,ee);break;case 3:i.vertexAttrib3fv(X.location,ee);break;case 4:i.vertexAttrib4fv(X.location,ee);break;default:i.vertexAttrib1fv(X.location,ee)}}}}E()}function b(){A();for(const N in n){const P=n[N];for(const F in P){const C=P[F];for(const z in C){const q=C[z];for(const W in q)h(q[W].object),delete q[W];delete C[z]}}delete n[N]}}function y(N){if(n[N.id]===void 0)return;const P=n[N.id];for(const F in P){const C=P[F];for(const z in C){const q=C[z];for(const W in q)h(q[W].object),delete q[W];delete C[z]}}delete n[N.id]}function w(N){for(const P in n){const F=n[P];for(const C in F){const z=F[C];if(z[N.id]===void 0)continue;const q=z[N.id];for(const W in q)h(q[W].object),delete q[W];delete z[N.id]}}}function x(N){for(const P in n){const F=n[P],C=N.isInstancedMesh===!0?N.id:0,z=F[C];if(z!==void 0){for(const q in z){const W=z[q];for(const te in W)h(W[te].object),delete W[te];delete z[q]}delete F[C],Object.keys(F).length===0&&delete n[P]}}}function A(){D(),a=!0,r!==s&&(r=s,l(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:D,dispose:b,releaseStatesOfGeometry:y,releaseStatesOfObject:x,releaseStatesOfProgram:w,initAttributes:S,enableAttribute:m,disableUnusedAttributes:E}}function Zf(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let p=0;p<h;p++)u+=l[p];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Jf(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==nn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const x=w===pn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Vt&&w!==hn&&!x&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(Ce("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ce("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),R=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),y=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:E,maxVaryings:R,maxFragmentUniforms:M,maxSamples:b,samples:y}}function Qf(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new On,o=new Le,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||n!==0||s;return s=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){const _=d.clippingPlanes,S=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||_===null||_.length===0||r&&!m)r?h(null):l();else{const E=r?0:n,R=E*4;let M=f.clippingState||null;c.value=M,M=h(_,u,R,p);for(let b=0;b!==R;++b)M[b]=t[b];f.clippingState=M,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,p,_){const S=d!==null?d.length:0;let m=null;if(S!==0){if(m=c.value,_!==!0||m===null){const f=p+S*4,E=u.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<f)&&(m=new Float32Array(f));for(let R=0,M=p;R!==S;++R,M+=4)a.copy(d[R]).applyMatrix4(E,o),a.normal.toArray(m,M),m[M+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}const xi=4,jf=6,ep=20,tp=256,Ii=new Xs,Xo=new Ie;let Rr=null,Cr=0,Pr=0,Lr=!1;const np=new B,Yn=new B;class qo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=np}=r;Rr=this._renderer.getRenderTarget(),Cr=this._renderer.getActiveCubeFace(),Pr=this._renderer.getActiveMipmapLevel(),Lr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$o(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ko(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Rr,Cr,Pr),this._renderer.xr.enabled=Lr,e.scissorTest=!1,mi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Jn||e.mapping===Mi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Rr=this._renderer.getRenderTarget(),Cr=this._renderer.getActiveCubeFace(),Pr=this._renderer.getActiveMipmapLevel(),Lr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:At,minFilter:At,generateMipmaps:!1,type:pn,format:nn,colorSpace:Ns,depthBuffer:!1},s=Yo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yo(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ip(r)),this._blurMaterial=rp(r,e,t),this._ggxMaterial=sp(r,e,t)}return s}_compileMaterial(e){const t=new Wt(new kt,e);this._renderer.compile(t,Ii)}_sceneToCubeUV(e,t,n,s,r){const c=new jt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Xo),d.toneMapping=dn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Wt(new Ki,new Kl({name:"PMREM.Background",side:Nt,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,m=S.material;let f=!1;const E=e.background;E?E.isColor&&(m.color.copy(E),e.background=null,f=!0):(m.color.copy(Xo),f=!0);for(let R=0;R<6;R++){const M=R%3;M===0?(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[R],r.y,r.z)):M===1?(c.up.set(0,0,l[R]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[R],r.z)):(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[R]));const b=this._cubeSize;mi(s,M*b,R>2?b:0,b,b),d.setRenderTarget(s),f&&d.render(S,c),d.render(e,c)}d.toneMapping=p,d.autoClear=u,e.background=E}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Jn||e.mapping===Mi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$o()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ko());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;mi(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Ii)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=l*1.25,p=d*u,{_lodMax:_}=this,S=this._sizeLods[n],m=3*S*(n>_-xi?n-_+xi:0),f=4*(this._cubeSize-S);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=_-t,mi(r,m,f,3*S,2*S),s.setRenderTarget(r),s.render(o,Ii),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=_-n,mi(e,m,f,3*S,2*S),s.setRenderTarget(e),s.render(o,Ii)}_blur(e,t,n,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;const h=this._sizeLods[s],d=3*h*(s>this._lodMax-xi?s-this._lodMax+xi:0),u=4*(this._cubeSize-h);mi(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(c,Ii)}}function ip(i){const e=[],t=[];let n=i;const s=i-xi+1+jf;for(let r=0;r<s;r++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,u=6,p=3,_=new Float32Array(p*u*d),S=new Float32Array(p*u*d);for(let f=0;f<d;f++){const E=f%3*2/3-1,R=f>2?0:-1,M=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];_.set(M,p*u*f);for(let b=0;b<u;b++){const y=h[b*2]*2-1,w=h[b*2+1]*2-1;f===0?Yn.set(1,w,y):f===1?Yn.set(-y,1,-w):f===2?Yn.set(-y,w,1):f===3?Yn.set(-1,w,-y):f===4?Yn.set(-y,-1,w):Yn.set(y,w,-1),Yn.toArray(S,(f*u+b)*p)}}const m=new kt;m.setAttribute("position",new An(_,p)),m.setAttribute("outputDirection",new An(S,p)),t.push(new Wt(m,null)),n>xi&&n--}return{lodMeshes:t,sizeLods:e}}function Yo(i,e,t){const n=new sn(i,e,t);return n.texture.mapping=ks,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function mi(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function sp(i,e,t){return new gn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:tp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function rp(i,e,t){return new gn({name:"SphericalGaussianBlur",defines:{SAMPLES:ep,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:qs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Ko(){return new gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function $o(){return new gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function qs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class ic extends sn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new $l(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ki(5,5,5),r=new gn({name:"CubemapFromEquirect",uniforms:yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Nt,blending:bn});r.uniforms.tEquirect.value=t;const a=new Wt(s,r),o=t.minFilter;return t.minFilter===Kn&&(t.minFilter=At),new lu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function ap(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===js||p===er)if(e.has(u)){const _=e.get(u).texture;return o(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const S=new ic(_.height);return S.fromEquirectangularTexture(i,u),e.set(u,S),u.addEventListener("dispose",l),o(S.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,_=p===js||p===er,S=p===Jn||p===Mi;if(_||S){let m=t.get(u);const f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new qo(i)),m=_?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const E=u.image;return _&&E&&E.height>0||S&&E&&c(E)?(n===null&&(n=new qo(i)),m=_?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,p){return p===js?u.mapping=Jn:p===er&&(u.mapping=Mi),u}function c(u){let p=0;const _=6;for(let S=0;S<_;S++)u[S]!==void 0&&p++;return p===_}function l(u){const p=u.target;p.removeEventListener("dispose",l);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function op(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&vi("WebGLRenderer: "+n+" extension not supported."),s}}}function lp(i,e,t,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const _ in u.attributes)e.remove(u.attributes[_]);u.removeEventListener("dispose",a),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function c(d){const u=d.attributes;for(const p in u)e.update(u[p],i.ARRAY_BUFFER)}function l(d){const u=[],p=d.index,_=d.attributes.position;let S=0;if(_===void 0)return;if(p!==null){const E=p.array;S=p.version;for(let R=0,M=E.length;R<M;R+=3){const b=E[R+0],y=E[R+1],w=E[R+2];u.push(b,y,y,w,w,b)}}else{const E=_.array;S=_.version;for(let R=0,M=E.length/3-1;R<M;R+=3){const b=R+0,y=R+1,w=R+2;u.push(b,y,y,w,w,b)}}const m=new(_.count>=65535?Yl:ql)(u,1);m.version=S;const f=r.get(d);f&&e.remove(f),r.set(d,m)}function h(d){const u=r.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function cp(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function l(d,u,p){p!==0&&(i.drawElementsInstanced(n,u,r,d*a,p),t.update(u,n,p))}function h(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,p);let S=0;for(let m=0;m<p;m++)S+=u[m];t.update(S,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function hp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ye("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function up(i,e,t){const n=new WeakMap,s=new ct;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let A=function(){w.dispose(),n.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let R=0;p===!0&&(R=1),_===!0&&(R=2),S===!0&&(R=3);let M=o.attributes.position.count*R,b=1;M>e.maxTextureSize&&(b=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const y=new Float32Array(M*b*4*d),w=new kl(y,M,b,d);w.type=hn,w.needsUpdate=!0;const x=R*4;for(let D=0;D<d;D++){const N=m[D],P=f[D],F=E[D],C=M*b*4*D;for(let z=0;z<N.count;z++){const q=z*x;p===!0&&(s.fromBufferAttribute(N,z),y[C+q+0]=s.x,y[C+q+1]=s.y,y[C+q+2]=s.z,y[C+q+3]=0),_===!0&&(s.fromBufferAttribute(P,z),y[C+q+4]=s.x,y[C+q+5]=s.y,y[C+q+6]=s.z,y[C+q+7]=0),S===!0&&(s.fromBufferAttribute(F,z),y[C+q+8]=s.x,y[C+q+9]=s.y,y[C+q+10]=s.z,y[C+q+11]=F.itemSize===4?s.w:1)}}u={count:d,texture:w,size:new ke(M,b)},n.set(o,u),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let S=0;S<l.length;S++)p+=l[S];const _=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function dp(i,e,t,n,s){let r=new WeakMap;function a(l){const h=s.render.frame,d=l.geometry,u=e.get(l,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function o(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const fp={[wl]:"LINEAR_TONE_MAPPING",[Rl]:"REINHARD_TONE_MAPPING",[Cl]:"CINEON_TONE_MAPPING",[Pl]:"ACES_FILMIC_TONE_MAPPING",[Dl]:"AGX_TONE_MAPPING",[Il]:"NEUTRAL_TONE_MAPPING",[Ll]:"CUSTOM_TONE_MAPPING"};function pp(i,e,t,n,s,r){const a=new sn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new kt;l.setAttribute("position",new St([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new St([0,2,0,0,2,0],2));const h=new Zh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Wt(l,h),u=new Xs(-1,1,1,-1,0,1);let p=null,_=null,S=!1,m,f=null,E=[],R=!1;this.setSize=function(M,b){a.setSize(M,b),o!==null&&o.setSize(M,b),c!==null&&c.setSize(M,b);for(let y=0;y<E.length;y++){const w=E[y];w.setSize&&w.setSize(M,b)}},this.setEffects=function(M){E=M,R=E.length>0&&E[0].isRenderPass===!0;const b=a.width,y=a.height;E.length>0&&o===null&&(o=new sn(b,y,{type:pn,depthBuffer:!1,stencilBuffer:!1}),c=new sn(b,y,{type:pn,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<E.length;w++){const x=E[w];x.setSize&&x.setSize(b,y)}},this.begin=function(M,b){if(S||M.toneMapping===dn&&E.length===0)return!1;if(f=b,b!==null){const y=b.width,w=b.height;(a.width!==y||a.height!==w)&&this.setSize(y,w)}return R===!1&&M.setRenderTarget(a),m=M.toneMapping,M.toneMapping=dn,!0},this.hasRenderPass=function(){return R},this.end=function(M,b){M.toneMapping=m,S=!0;let y=a,w=o;for(let x=0;x<E.length;x++){const A=E[x];A.enabled!==!1&&(A.render(M,w,y,b),A.needsSwap!==!1&&(y=w,w=w===o?c:o))}if(p!==M.outputColorSpace||_!==M.toneMapping){p=M.outputColorSpace,_=M.toneMapping,h.defines={},Ge.getTransfer(p)===Qe&&(h.defines.SRGB_TRANSFER="");const x=fp[_];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=y.texture,M.setRenderTarget(f),M.render(d,u),f=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}const sc=new Ct,Aa=new Xi(1,1),rc=new kl,ac=new Ah,oc=new $l,Zo=[],Jo=[],Qo=new Float32Array(16),jo=new Float32Array(9),el=new Float32Array(4);function Ti(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Zo[s];if(r===void 0&&(r=new Float32Array(s),Zo[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function gt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function _t(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ys(i,e){let t=Jo[e];t===void 0&&(t=new Int32Array(e),Jo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function mp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2fv(this.addr,e),_t(t,e)}}function _p(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(gt(t,e))return;i.uniform3fv(this.addr,e),_t(t,e)}}function xp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4fv(this.addr,e),_t(t,e)}}function vp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;el.set(n),i.uniformMatrix2fv(this.addr,!1,el),_t(t,n)}}function Sp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;jo.set(n),i.uniformMatrix3fv(this.addr,!1,jo),_t(t,n)}}function Mp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;Qo.set(n),i.uniformMatrix4fv(this.addr,!1,Qo),_t(t,n)}}function yp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Ep(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2iv(this.addr,e),_t(t,e)}}function bp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;i.uniform3iv(this.addr,e),_t(t,e)}}function Tp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4iv(this.addr,e),_t(t,e)}}function Ap(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function wp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2uiv(this.addr,e),_t(t,e)}}function Rp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;i.uniform3uiv(this.addr,e),_t(t,e)}}function Cp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4uiv(this.addr,e),_t(t,e)}}function Pp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Aa.compareFunction=t.isReversedDepthBuffer()?Fa:Na,r=Aa):r=sc,t.setTexture2D(e||r,s)}function Lp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ac,s)}function Dp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||oc,s)}function Ip(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||rc,s)}function Up(i){switch(i){case 5126:return mp;case 35664:return gp;case 35665:return _p;case 35666:return xp;case 35674:return vp;case 35675:return Sp;case 35676:return Mp;case 5124:case 35670:return yp;case 35667:case 35671:return Ep;case 35668:case 35672:return bp;case 35669:case 35673:return Tp;case 5125:return Ap;case 36294:return wp;case 36295:return Rp;case 36296:return Cp;case 35678:case 36198:case 36298:case 36306:case 35682:return Pp;case 35679:case 36299:case 36307:return Lp;case 35680:case 36300:case 36308:case 36293:return Dp;case 36289:case 36303:case 36311:case 36292:return Ip}}function Np(i,e){i.uniform1fv(this.addr,e)}function Fp(i,e){const t=Ti(e,this.size,2);i.uniform2fv(this.addr,t)}function Op(i,e){const t=Ti(e,this.size,3);i.uniform3fv(this.addr,t)}function Bp(i,e){const t=Ti(e,this.size,4);i.uniform4fv(this.addr,t)}function zp(i,e){const t=Ti(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Hp(i,e){const t=Ti(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Gp(i,e){const t=Ti(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Vp(i,e){i.uniform1iv(this.addr,e)}function kp(i,e){i.uniform2iv(this.addr,e)}function Wp(i,e){i.uniform3iv(this.addr,e)}function Xp(i,e){i.uniform4iv(this.addr,e)}function qp(i,e){i.uniform1uiv(this.addr,e)}function Yp(i,e){i.uniform2uiv(this.addr,e)}function Kp(i,e){i.uniform3uiv(this.addr,e)}function $p(i,e){i.uniform4uiv(this.addr,e)}function Zp(i,e,t){const n=this.cache,s=e.length,r=Ys(t,s);gt(n,r)||(i.uniform1iv(this.addr,r),_t(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Aa:a=sc;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Jp(i,e,t){const n=this.cache,s=e.length,r=Ys(t,s);gt(n,r)||(i.uniform1iv(this.addr,r),_t(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ac,r[a])}function Qp(i,e,t){const n=this.cache,s=e.length,r=Ys(t,s);gt(n,r)||(i.uniform1iv(this.addr,r),_t(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||oc,r[a])}function jp(i,e,t){const n=this.cache,s=e.length,r=Ys(t,s);gt(n,r)||(i.uniform1iv(this.addr,r),_t(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||rc,r[a])}function em(i){switch(i){case 5126:return Np;case 35664:return Fp;case 35665:return Op;case 35666:return Bp;case 35674:return zp;case 35675:return Hp;case 35676:return Gp;case 5124:case 35670:return Vp;case 35667:case 35671:return kp;case 35668:case 35672:return Wp;case 35669:case 35673:return Xp;case 5125:return qp;case 36294:return Yp;case 36295:return Kp;case 36296:return $p;case 35678:case 36198:case 36298:case 36306:case 35682:return Zp;case 35679:case 36299:case 36307:return Jp;case 35680:case 36300:case 36308:case 36293:return Qp;case 36289:case 36303:case 36311:case 36292:return jp}}class tm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Up(t.type)}}class nm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=em(t.type)}}class im{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Dr=/(\w+)(\])?(\[|\.)?/g;function tl(i,e){i.seq.push(e),i.map[e.id]=e}function sm(i,e,t){const n=i.name,s=n.length;for(Dr.lastIndex=0;;){const r=Dr.exec(n),a=Dr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){tl(t,l===void 0?new tm(o,i,e):new nm(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new im(o),tl(t,d)),t=d}}}class Ls{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);sm(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function nl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const rm=37297;let am=0;function om(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const il=new Le;function lm(i){Ge._getMatrix(il,Ge.workingColorSpace,i);const e=`mat3( ${il.elements.map(t=>t.toFixed(4))} )`;switch(Ge.getTransfer(i)){case Fs:return[e,"LinearTransferOETF"];case Qe:return[e,"sRGBTransferOETF"];default:return Ce("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function sl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+om(i.getShaderSource(e),o)}else return r}function cm(i,e){const t=lm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const hm={[wl]:"Linear",[Rl]:"Reinhard",[Cl]:"Cineon",[Pl]:"ACESFilmic",[Dl]:"AgX",[Il]:"Neutral",[Ll]:"Custom"};function um(i,e){const t=hm[e];return t===void 0?(Ce("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ys=new B;function dm(){Ge.getLuminanceCoefficients(ys);const i=ys.x.toFixed(4),e=ys.y.toFixed(4),t=ys.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bi).join(`
`)}function pm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function mm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Bi(i){return i!==""}function rl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function al(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const gm=/^[ \t]*#include +<([\w\d./]+)>/gm;function wa(i){return i.replace(gm,xm)}const _m=new Map;function xm(i,e){let t=Ne[e];if(t===void 0){const n=_m.get(e);if(n!==void 0)t=Ne[n],Ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return wa(t)}const vm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ol(i){return i.replace(vm,Sm)}function Sm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ll(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Mm={[Ts]:"SHADOWMAP_TYPE_PCF",[Fi]:"SHADOWMAP_TYPE_VSM"};function ym(i){return Mm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Em={[Jn]:"ENVMAP_TYPE_CUBE",[Mi]:"ENVMAP_TYPE_CUBE",[ks]:"ENVMAP_TYPE_CUBE_UV"};function bm(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Em[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Tm={[Mi]:"ENVMAP_MODE_REFRACTION"};function Am(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Tm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const wm={[Vs]:"ENVMAP_BLENDING_MULTIPLY",[ih]:"ENVMAP_BLENDING_MIX",[sh]:"ENVMAP_BLENDING_ADD"};function Rm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":wm[i.combine]||"ENVMAP_BLENDING_NONE"}function Cm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Pm(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=ym(t),l=bm(t),h=Am(t),d=Rm(t),u=Cm(t),p=fm(t),_=pm(r),S=s.createProgram();let m,f,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Bi).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Bi).join(`
`),f.length>0&&(f+=`
`)):(m=[ll(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bi).join(`
`),f=[ll(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==dn?"#define TONE_MAPPING":"",t.toneMapping!==dn?Ne.tonemapping_pars_fragment:"",t.toneMapping!==dn?um("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,cm("linearToOutputTexel",t.outputColorSpace),dm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Bi).join(`
`)),a=wa(a),a=rl(a,t),a=al(a,t),o=wa(o),o=rl(o,t),o=al(o,t),a=ol(a),o=ol(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===uo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===uo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const R=E+m+a,M=E+f+o,b=nl(s,s.VERTEX_SHADER,R),y=nl(s,s.FRAGMENT_SHADER,M);s.attachShader(S,b),s.attachShader(S,y),t.index0AttributeName!==void 0?s.bindAttribLocation(S,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function w(N){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(S)||"",F=s.getShaderInfoLog(b)||"",C=s.getShaderInfoLog(y)||"",z=P.trim(),q=F.trim(),W=C.trim();let te=!0,X=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(te=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,S,b,y);else{const Q=sl(s,b,"vertex"),ee=sl(s,y,"fragment");Ye("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+z+`
`+Q+`
`+ee)}else z!==""?Ce("WebGLProgram: Program Info Log:",z):(q===""||W==="")&&(X=!1);X&&(N.diagnostics={runnable:te,programLog:z,vertexShader:{log:q,prefix:m},fragmentShader:{log:W,prefix:f}})}s.deleteShader(b),s.deleteShader(y),x=new Ls(s,S),A=mm(s,S)}let x;this.getUniforms=function(){return x===void 0&&w(this),x};let A;this.getAttributes=function(){return A===void 0&&w(this),A};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(S,rm)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=am++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=b,this.fragmentShader=y,this}let Lm=0;class Dm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Im(e),t.set(e,n)),n}}class Im{constructor(e){this.id=Lm++,this.code=e,this.usedTimes=0}}function Um(i){return i===Qn||i===Ds||i===Is}function Nm(i,e,t,n,s,r){const a=new Wl,o=new Dm,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return c.add(x),x===0?"uv":`uv${x}`}function S(x,A,D,N,P,F){const C=N.fog,z=P.geometry,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?N.environment:null,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,te=e.get(x.envMap||q,W),X=te&&te.mapping===ks?te.image.height:null,Q=p[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&Ce("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const ee=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,be=ee!==void 0?ee.length:0;let Me=0;z.morphAttributes.position!==void 0&&(Me=1),z.morphAttributes.normal!==void 0&&(Me=2),z.morphAttributes.color!==void 0&&(Me=3);let tt,We,Ke,K;if(Q){const it=cn[Q];tt=it.vertexShader,We=it.fragmentShader}else{tt=x.vertexShader,We=x.fragmentShader;const it=o.getVertexShaderStage(x),$e=o.getFragmentShaderStage(x);o.update(x,it,$e),Ke=it.id,K=$e.id}const j=i.getRenderTarget(),_e=i.state.buffers.depth.getReversed(),Pe=P.isInstancedMesh===!0,me=P.isBatchedMesh===!0,Oe=!!x.map,pt=!!x.matcap,Be=!!te,qe=!!x.aoMap,nt=!!x.lightMap,He=!!x.bumpMap&&x.wireframe===!1,at=!!x.normalMap,xt=!!x.displacementMap,Pt=!!x.emissiveMap,lt=!!x.metalnessMap,ut=!!x.roughnessMap,U=x.anisotropy>0,yt=x.clearcoat>0,Je=x.dispersion>0,T=x.retroreflectivity>0,g=x.iridescence>0,O=x.sheen>0,V=x.transmission>0,Y=U&&!!x.anisotropyMap,ie=yt&&!!x.clearcoatMap,se=yt&&!!x.clearcoatNormalMap,$=yt&&!!x.clearcoatRoughnessMap,J=g&&!!x.iridescenceMap,re=g&&!!x.iridescenceThicknessMap,Te=O&&!!x.sheenColorMap,ce=O&&!!x.sheenRoughnessMap,ae=!!x.specularMap,Ae=!!x.specularColorMap,Re=!!x.specularIntensityMap,De=V&&!!x.transmissionMap,I=V&&!!x.thicknessMap,oe=!!x.gradientMap,Z=!!x.alphaMap,le=x.alphaTest>0,fe=!!x.alphaHash,ne=!!x.extensions;let we=dn;x.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(we=i.toneMapping);const ye={shaderID:Q,shaderType:x.type,shaderName:x.name,vertexShader:tt,fragmentShader:We,defines:x.defines,customVertexShaderID:Ke,customFragmentShaderID:K,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:me,batchingColor:me&&P._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&P.instanceColor!==null,instancingMorph:Pe&&P.morphTexture!==null,outputColorSpace:j===null?i.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Ge.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Oe,matcap:pt,envMap:Be,envMapMode:Be&&te.mapping,envMapCubeUVHeight:X,aoMap:qe,lightMap:nt,bumpMap:He,normalMap:at,displacementMap:xt,emissiveMap:Pt,normalMapObjectSpace:at&&x.normalMapType===oh,normalMapTangentSpace:at&&x.normalMapType===Us,packedNormalMap:at&&x.normalMapType===Us&&Um(x.normalMap.format),metalnessMap:lt,roughnessMap:ut,anisotropy:U,anisotropyMap:Y,clearcoat:yt,clearcoatMap:ie,clearcoatNormalMap:se,clearcoatRoughnessMap:$,dispersion:Je,retroreflection:T,iridescence:g,iridescenceMap:J,iridescenceThicknessMap:re,sheen:O,sheenColorMap:Te,sheenRoughnessMap:ce,specularMap:ae,specularColorMap:Ae,specularIntensityMap:Re,transmission:V,transmissionMap:De,thicknessMap:I,gradientMap:oe,opaque:x.transparent===!1&&x.blending===zi&&x.alphaToCoverage===!1,alphaMap:Z,alphaTest:le,alphaHash:fe,combine:x.combine,mapUv:Oe&&_(x.map.channel),aoMapUv:qe&&_(x.aoMap.channel),lightMapUv:nt&&_(x.lightMap.channel),bumpMapUv:He&&_(x.bumpMap.channel),normalMapUv:at&&_(x.normalMap.channel),displacementMapUv:xt&&_(x.displacementMap.channel),emissiveMapUv:Pt&&_(x.emissiveMap.channel),metalnessMapUv:lt&&_(x.metalnessMap.channel),roughnessMapUv:ut&&_(x.roughnessMap.channel),anisotropyMapUv:Y&&_(x.anisotropyMap.channel),clearcoatMapUv:ie&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:se&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:re&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:ce&&_(x.sheenRoughnessMap.channel),specularMapUv:ae&&_(x.specularMap.channel),specularColorMapUv:Ae&&_(x.specularColorMap.channel),specularIntensityMapUv:Re&&_(x.specularIntensityMap.channel),transmissionMapUv:De&&_(x.transmissionMap.channel),thicknessMapUv:I&&_(x.thicknessMap.channel),alphaMapUv:Z&&_(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(at||U),vertexNormals:!!z.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!z.attributes.uv&&(Oe||Z),fog:!!C,useFog:x.fog===!0,fogExp2:!!C&&C.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||z.attributes.normal===void 0&&at===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:_e,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:Me,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:we,decodeVideoTexture:Oe&&x.map.isVideoTexture===!0&&Ge.getTransfer(x.map.colorSpace)===Qe,decodeVideoTextureEmissive:Pt&&x.emissiveMap.isVideoTexture===!0&&Ge.getTransfer(x.emissiveMap.colorSpace)===Qe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===en,flipSided:x.side===Nt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ne&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ne&&x.extensions.multiDraw===!0||me)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ye.vertexUv1s=c.has(1),ye.vertexUv2s=c.has(2),ye.vertexUv3s=c.has(3),c.clear(),ye}function m(x){const A=[];if(x.shaderID?A.push(x.shaderID):(A.push(x.customVertexShaderID),A.push(x.customFragmentShaderID)),x.defines!==void 0)for(const D in x.defines)A.push(D),A.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(f(A,x),E(A,x),A.push(i.outputColorSpace)),A.push(x.customProgramCacheKey),A.join()}function f(x,A){x.push(A.precision),x.push(A.outputColorSpace),x.push(A.envMapMode),x.push(A.envMapCubeUVHeight),x.push(A.mapUv),x.push(A.alphaMapUv),x.push(A.lightMapUv),x.push(A.aoMapUv),x.push(A.bumpMapUv),x.push(A.normalMapUv),x.push(A.displacementMapUv),x.push(A.emissiveMapUv),x.push(A.metalnessMapUv),x.push(A.roughnessMapUv),x.push(A.anisotropyMapUv),x.push(A.clearcoatMapUv),x.push(A.clearcoatNormalMapUv),x.push(A.clearcoatRoughnessMapUv),x.push(A.iridescenceMapUv),x.push(A.iridescenceThicknessMapUv),x.push(A.sheenColorMapUv),x.push(A.sheenRoughnessMapUv),x.push(A.specularMapUv),x.push(A.specularColorMapUv),x.push(A.specularIntensityMapUv),x.push(A.transmissionMapUv),x.push(A.thicknessMapUv),x.push(A.combine),x.push(A.fogExp2),x.push(A.sizeAttenuation),x.push(A.morphTargetsCount),x.push(A.morphAttributeCount),x.push(A.numSunLights),x.push(A.numDirLights),x.push(A.numPointLights),x.push(A.numSpotLights),x.push(A.numSpotLightMaps),x.push(A.numHemiLights),x.push(A.numRectAreaLights),x.push(A.numSunLightShadows),x.push(A.numDirLightShadows),x.push(A.numPointLightShadows),x.push(A.numSpotLightShadows),x.push(A.numSpotLightShadowsWithMaps),x.push(A.numLightProbes),x.push(A.shadowMapType),x.push(A.toneMapping),x.push(A.numClippingPlanes),x.push(A.numClipIntersection),x.push(A.depthPacking)}function E(x,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function R(x){const A=p[x.type];let D;if(A){const N=cn[A];D=Yh.clone(N.uniforms)}else D=x.uniforms;return D}function M(x,A){let D=h.get(A);return D!==void 0?++D.usedTimes:(D=new Pm(i,A,x,s),l.push(D),h.set(A,D)),D}function b(x){if(--x.usedTimes===0){const A=l.indexOf(x);l[A]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function y(x){o.remove(x)}function w(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:R,acquireProgram:M,releaseProgram:b,releaseShaderCache:y,programs:l,dispose:w}}function Fm(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Om(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function cl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function hl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,_,S,m,f){let E=i[e];return E===void 0?(E={id:u.id,object:u,geometry:p,material:_,materialVariant:a(u),groupOrder:S,renderOrder:u.renderOrder,z:m,group:f},i[e]=E):(E.id=u.id,E.object=u,E.geometry=p,E.material=_,E.materialVariant=a(u),E.groupOrder=S,E.renderOrder=u.renderOrder,E.z=m,E.group=f),e++,E}function c(u,p,_,S,m,f,E){E.reversedDepth===!0&&(m=-m);const R=o(u,p,_,S,m,f);_.transmission>0?n.push(R):_.transparent===!0?s.push(R):t.push(R)}function l(u,p,_,S,m,f){const E=o(u,p,_,S,m,f);_.transmission>0?n.unshift(E):_.transparent===!0?s.unshift(E):t.unshift(E)}function h(u,p){t.length>1&&t.sort(u||Om),n.length>1&&n.sort(p||cl),s.length>1&&s.sort(p||cl)}function d(){for(let u=e,p=i.length;u<p;u++){const _=i[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function Bm(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new hl,i.set(n,[a])):s>=r.length?(a=new hl,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function zm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new B,color:new Ie};break;case"SpotLight":t={position:new B,direction:new B,color:new Ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Ie,groundColor:new Ie};break;case"RectAreaLight":t={color:new Ie,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function Hm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Gm=0;function Vm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function km(i){const e=new zm,t=Hm(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new B);const s=new B,r=new ot,a=new ot;function o(l){let h=0,d=0,u=0;for(let P=0;P<9;P++)n.probe[P].set(0,0,0);let p=0,_=0,S=0,m=0,f=0,E=0,R=0,M=0,b=0,y=0,w=0,x=0,A=0,D=0;l.sort(Vm);for(let P=0,F=l.length;P<F;P++){const C=l[P],z=C.color,q=C.intensity,W=C.distance;let te=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Qn?te=C.shadow.map.texture:te=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=z.r*q,d+=z.g*q,u+=z.b*q;else if(C.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(C.sh.coefficients[X],q);D++}else if(C.isSunLight){const X=e.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Q=C.shadow,ee=t.get(C);ee.shadowIntensity=Q.intensity,ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[_]=ee,n.sunShadowMap[_]=te;const be=Q.getViewportCount();for(let Me=0;Me<be;Me++)n.sunShadowMatrix[S+Me]=Q.getMatrix(Me),n.sunShadowCascade[S+Me]=Q._cascadeData[Me];S+=be,_++}n.sun[p]=X,p++}else if(C.isDirectionalLight){const X=e.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Q=C.shadow,ee=t.get(C);ee.shadowIntensity=Q.intensity,ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,n.directionalShadow[m]=ee,n.directionalShadowMap[m]=te,n.directionalShadowMatrix[m]=C.shadow.matrix,b++}n.directional[m]=X,m++}else if(C.isSpotLight){const X=e.get(C);X.position.setFromMatrixPosition(C.matrixWorld),X.color.copy(z).multiplyScalar(q),X.distance=W,X.coneCos=Math.cos(C.angle),X.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),X.decay=C.decay,n.spot[E]=X;const Q=C.shadow;if(C.map&&(n.spotLightMap[x]=C.map,x++,Q.updateMatrices(C),C.castShadow&&A++),n.spotLightMatrix[E]=Q.matrix,C.castShadow){const ee=t.get(C);ee.shadowIntensity=Q.intensity,ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,n.spotShadow[E]=ee,n.spotShadowMap[E]=te,w++}E++}else if(C.isRectAreaLight){const X=e.get(C);X.color.copy(z).multiplyScalar(q),X.halfWidth.set(C.width*.5,0,0),X.halfHeight.set(0,C.height*.5,0),n.rectArea[R]=X,R++}else if(C.isPointLight){const X=e.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity),X.distance=C.distance,X.decay=C.decay,C.castShadow){const Q=C.shadow,ee=t.get(C);ee.shadowIntensity=Q.intensity,ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,ee.shadowCameraNear=Q.camera.near,ee.shadowCameraFar=Q.camera.far,n.pointShadow[f]=ee,n.pointShadowMap[f]=te,n.pointShadowMatrix[f]=C.shadow.matrix,y++}n.point[f]=X,f++}else if(C.isHemisphereLight){const X=e.get(C);X.skyColor.copy(C.color).multiplyScalar(q),X.groundColor.copy(C.groundColor).multiplyScalar(q),n.hemi[M]=X,M++}}R>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const N=n.hash;(N.sunLength!==p||N.directionalLength!==m||N.pointLength!==f||N.spotLength!==E||N.rectAreaLength!==R||N.hemiLength!==M||N.numSunShadows!==_||N.numDirectionalShadows!==b||N.numPointShadows!==y||N.numSpotShadows!==w||N.numSpotMaps!==x||N.numLightProbes!==D)&&(n.sun.length=p,n.directional.length=m,n.spot.length=E,n.rectArea.length=R,n.point.length=f,n.hemi.length=M,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=S,n.sunShadowCascade.length=S,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=y,n.pointShadowMap.length=y,n.pointShadowMatrix.length=y,n.spotShadow.length=w,n.spotShadowMap.length=w,n.spotLightMatrix.length=w+x-A,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=D,N.sunLength=p,N.directionalLength=m,N.pointLength=f,N.spotLength=E,N.rectAreaLength=R,N.hemiLength=M,N.numSunShadows=_,N.numDirectionalShadows=b,N.numPointShadows=y,N.numSpotShadows=w,N.numSpotMaps=x,N.numLightProbes=D,n.version=Gm++)}function c(l,h){let d=0,u=0,p=0,_=0,S=0,m=0;const f=h.matrixWorldInverse;for(let E=0,R=l.length;E<R;E++){const M=l[E];if(M.isSunLight){const b=n.sun[d];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(f),d++}else if(M.isDirectionalLight){const b=n.directional[u];b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(f),u++}else if(M.isSpotLight){const b=n.spot[_];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(f),b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(f),_++}else if(M.isRectAreaLight){const b=n.rectArea[S];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(f),a.identity(),r.copy(M.matrixWorld),r.premultiply(f),a.extractRotation(r),b.halfWidth.set(M.width*.5,0,0),b.halfHeight.set(0,M.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),S++}else if(M.isPointLight){const b=n.point[p];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(f),p++}else if(M.isHemisphereLight){const b=n.hemi[m];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(f),m++}}}return{setup:o,setupView:c,state:n}}function ul(i){const e=new km(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function c(u){s.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Wm(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new ul(i),e.set(s,[o])):r>=a.length?(o=new ul(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Xm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ym=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],Km=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],dl=new ot,Ui=new B,Ir=new B;function $m(i,e,t){let n=new za;const s=new ke,r=new ke,a=new ct,o=new Qh,c=new jh,l={},h=t.maxTextureSize,d={[Zn]:Nt,[Nt]:Zn,[en]:en},u=new gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ke},radius:{value:4}},vertexShader:Xm,fragmentShader:qm}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const _=new kt;_.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Wt(_,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ts;let f=this.type;this.render=function(y,w,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;this.type===Bc&&(Ce("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ts);const A=i.getRenderTarget(),D=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),P=i.state;P.setBlending(bn),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const F=f!==this.type;F&&w.traverse(function(C){C.material&&(Array.isArray(C.material)?C.material.forEach(z=>z.needsUpdate=!0):C.material.needsUpdate=!0)});for(let C=0,z=y.length;C<z;C++){const q=y[C],W=q.shadow;if(W===void 0){Ce("WebGLShadowMap:",q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const te=W.getFrameExtents();s.multiply(te),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/te.x),s.x=r.x*te.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/te.y),s.y=r.y*te.y,W.mapSize.y=r.y));const X=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=X,W.map===null||F===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Fi){if(q.isPointLight){Ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new sn(s.x,s.y,{format:Qn,type:pn,minFilter:At,magFilter:At,generateMipmaps:!1}),W.map.texture.name=q.name+".shadowMap",W.map.depthTexture=new Xi(s.x,s.y,hn),W.map.depthTexture.name=q.name+".shadowMapDepth",W.map.depthTexture.format=wn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Mt,W.map.depthTexture.magFilter=Mt}else q.isPointLight?(W.map=new ic(s.x),W.map.depthTexture=new Xh(s.x,fn)):(W.map=new sn(s.x,s.y),W.map.depthTexture=new Xi(s.x,s.y,fn)),W.map.depthTexture.name=q.name+".shadowMap",W.map.depthTexture.format=wn,this.type===Ts?(W.map.depthTexture.compareFunction=X?Fa:Na,W.map.depthTexture.minFilter=At,W.map.depthTexture.magFilter=At):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Mt,W.map.depthTexture.magFilter=Mt);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);const Q=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();q.isPointLight!==!0&&W.updateMatrices(q,x);for(let ee=0;ee<Q;ee++){const be=W.getCamera(ee);if(q.isPointLight){const Me=W.camera,tt=W.matrix,We=q.distance||Me.far;We!==Me.far&&(Me.far=We,Me.updateProjectionMatrix()),Ui.setFromMatrixPosition(q.matrixWorld),Me.position.copy(Ui),Ir.copy(Me.position),Ir.add(Ym[ee]),Me.up.copy(Km[ee]),Me.lookAt(Ir),Me.updateMatrixWorld(),tt.makeTranslation(-Ui.x,-Ui.y,-Ui.z),dl.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),W._frustum.setFromProjectionMatrix(dl,Me.coordinateSystem,Me.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,ee),i.clear();else{ee===0&&(i.setRenderTarget(W.map),i.clear());const Me=W.getViewport(ee);a.set(r.x*Me.x,r.y*Me.y,r.x*Me.z,r.y*Me.w),P.viewport(a)}n=W.getFrustum(ee),M(w,x,be,q,this.type)}W.isPointLightShadow!==!0&&this.type===Fi&&E(W,x),W.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(A,D,N)};function E(y,w){const x=e.update(S);u.defines.VSM_SAMPLES!==y.blurSamples&&(u.defines.VSM_SAMPLES=y.blurSamples,p.defines.VSM_SAMPLES=y.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),y.mapPass===null?y.mapPass=new sn(s.x,s.y,{format:Qn,type:pn}):(y.mapPass.width!==y.map.width||y.mapPass.height!==y.map.height)&&y.mapPass.setSize(y.map.width,y.map.height),u.uniforms.shadow_pass.value=y.map.depthTexture,u.uniforms.resolution.value.set(y.map.width,y.map.height),u.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(w,null,x,u,S,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value.set(y.map.width,y.map.height),p.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(w,null,x,p,S,null)}function R(y,w,x,A){let D=null;const N=x.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(N!==void 0)D=N;else if(D=x.isPointLight===!0?c:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const P=D.uuid,F=w.uuid;let C=l[P];C===void 0&&(C={},l[P]=C);let z=C[F];z===void 0&&(z=D.clone(),C[F]=z,w.addEventListener("dispose",b)),D=z}if(D.visible=w.visible,D.wireframe=w.wireframe,A===Fi?D.side=w.shadowSide!==null?w.shadowSide:w.side:D.side=w.shadowSide!==null?w.shadowSide:d[w.side],D.alphaMap=w.alphaMap,D.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,D.map=w.map,D.clipShadows=w.clipShadows,D.clippingPlanes=w.clippingPlanes,D.clipIntersection=w.clipIntersection,D.displacementMap=w.displacementMap,D.displacementScale=w.displacementScale,D.displacementBias=w.displacementBias,D.wireframeLinewidth=w.wireframeLinewidth,D.linewidth=w.linewidth,x.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const P=i.properties.get(D);P.light=x}return D}function M(y,w,x,A,D){if(y.visible===!1)return;if(y.layers.test(w.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&D===Fi)&&(!y.frustumCulled||y.intersectsFrustum(n))){y.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,y.matrixWorld);const F=e.update(y),C=y.material;if(Array.isArray(C)){const z=F.groups;for(let q=0,W=z.length;q<W;q++){const te=z[q],X=C[te.materialIndex];if(X&&X.visible){const Q=R(y,X,A,D);y.onBeforeShadow(i,y,w,x,F,Q,te),i.renderBufferDirect(x,null,F,Q,y,te),y.onAfterShadow(i,y,w,x,F,Q,te)}}}else if(C.visible){const z=R(y,C,A,D);y.onBeforeShadow(i,y,w,x,F,z,null),i.renderBufferDirect(x,null,F,z,y,null),y.onAfterShadow(i,y,w,x,F,z,null)}}const P=y.children;for(let F=0,C=P.length;F<C;F++)M(P[F],w,x,A,D)}function b(y){y.target.removeEventListener("dispose",b);for(const x in l){const A=l[x],D=y.target.uuid;D in A&&(A[D].dispose(),delete A[D])}}}function Zm(i,e){function t(){let I=!1;const oe=new ct;let Z=null;const le=new ct(0,0,0,0);return{setMask:function(fe){Z!==fe&&!I&&(i.colorMask(fe,fe,fe,fe),Z=fe)},setLocked:function(fe){I=fe},setClear:function(fe,ne,we,ye,it){it===!0&&(fe*=ye,ne*=ye,we*=ye),oe.set(fe,ne,we,ye),le.equals(oe)===!1&&(i.clearColor(fe,ne,we,ye),le.copy(oe))},reset:function(){I=!1,Z=null,le.set(-1,0,0,0)}}}function n(){let I=!1,oe=!1,Z=null,le=null,fe=null;return{setReversed:function(ne){if(oe!==ne){const we=e.get("EXT_clip_control");ne?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),oe=ne;const ye=fe;fe=null,this.setClear(ye)}},getReversed:function(){return oe},setTest:function(ne){ne?j(i.DEPTH_TEST):_e(i.DEPTH_TEST)},setMask:function(ne){Z!==ne&&!I&&(i.depthMask(ne),Z=ne)},setFunc:function(ne){if(oe&&(ne=vh[ne]),le!==ne){switch(ne){case zr:i.depthFunc(i.NEVER);break;case Hr:i.depthFunc(i.ALWAYS);break;case Gr:i.depthFunc(i.LESS);break;case Gi:i.depthFunc(i.LEQUAL);break;case Vr:i.depthFunc(i.EQUAL);break;case kr:i.depthFunc(i.GEQUAL);break;case Wr:i.depthFunc(i.GREATER);break;case Xr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}le=ne}},setLocked:function(ne){I=ne},setClear:function(ne){fe!==ne&&(fe=ne,oe&&(ne=1-ne),i.clearDepth(ne))},reset:function(){I=!1,Z=null,le=null,fe=null,oe=!1}}}function s(){let I=!1,oe=null,Z=null,le=null,fe=null,ne=null,we=null,ye=null,it=null;return{setTest:function($e){I||($e?j(i.STENCIL_TEST):_e(i.STENCIL_TEST))},setMask:function($e){oe!==$e&&!I&&(i.stencilMask($e),oe=$e)},setFunc:function($e,Kt,rn){(Z!==$e||le!==Kt||fe!==rn)&&(i.stencilFunc($e,Kt,rn),Z=$e,le=Kt,fe=rn)},setOp:function($e,Kt,rn){(ne!==$e||we!==Kt||ye!==rn)&&(i.stencilOp($e,Kt,rn),ne=$e,we=Kt,ye=rn)},setLocked:function($e){I=$e},setClear:function($e){it!==$e&&(i.clearStencil($e),it=$e)},reset:function(){I=!1,oe=null,Z=null,le=null,fe=null,ne=null,we=null,ye=null,it=null}}}const r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let h={},d={},u={},p=new WeakMap,_=[],S=null,m=!1,f=null,E=null,R=null,M=null,b=null,y=null,w=null,x=new Ie(0,0,0),A=0,D=!1,N=null,P=null,F=null,C=null,z=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,te=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(X)[1]),W=te>=1):X.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),W=te>=2);let Q=null,ee={};const be=i.getParameter(i.SCISSOR_BOX),Me=i.getParameter(i.VIEWPORT),tt=new ct().fromArray(be),We=new ct().fromArray(Me);function Ke(I,oe,Z,le){const fe=new Uint8Array(4),ne=i.createTexture();i.bindTexture(I,ne),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let we=0;we<Z;we++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,le,0,i.RGBA,i.UNSIGNED_BYTE,fe):i.texImage2D(oe+we,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,fe);return ne}const K={};K[i.TEXTURE_2D]=Ke(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=Ke(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=Ke(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=Ke(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),j(i.DEPTH_TEST),a.setFunc(Gi),He(!1),at(oo),j(i.CULL_FACE),qe(bn);function j(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function _e(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Pe(I,oe){return u[I]!==oe?(i.bindFramebuffer(I,oe),u[I]=oe,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=oe),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function me(I,oe){let Z=_,le=!1;if(I){Z=p.get(oe),Z===void 0&&(Z=[],p.set(oe,Z));const fe=I.textures;if(Z.length!==fe.length||Z[0]!==i.COLOR_ATTACHMENT0){for(let ne=0,we=fe.length;ne<we;ne++)Z[ne]=i.COLOR_ATTACHMENT0+ne;Z.length=fe.length,le=!0}}else Z[0]!==i.BACK&&(Z[0]=i.BACK,le=!0);le&&i.drawBuffers(Z)}function Oe(I){return S!==I?(i.useProgram(I),S=I,!0):!1}const pt={[gi]:i.FUNC_ADD,[Hc]:i.FUNC_SUBTRACT,[Gc]:i.FUNC_REVERSE_SUBTRACT};pt[Vc]=i.MIN,pt[kc]=i.MAX;const Be={[Wc]:i.ZERO,[Xc]:i.ONE,[qc]:i.SRC_COLOR,[Tl]:i.SRC_ALPHA,[Qc]:i.SRC_ALPHA_SATURATE,[Zc]:i.DST_COLOR,[Kc]:i.DST_ALPHA,[Yc]:i.ONE_MINUS_SRC_COLOR,[Al]:i.ONE_MINUS_SRC_ALPHA,[Jc]:i.ONE_MINUS_DST_COLOR,[$c]:i.ONE_MINUS_DST_ALPHA,[jc]:i.CONSTANT_COLOR,[eh]:i.ONE_MINUS_CONSTANT_COLOR,[th]:i.CONSTANT_ALPHA,[nh]:i.ONE_MINUS_CONSTANT_ALPHA};function qe(I,oe,Z,le,fe,ne,we,ye,it,$e){if(I===bn){m===!0&&(_e(i.BLEND),m=!1);return}if(m===!1&&(j(i.BLEND),m=!0),I!==zc){if(I!==f||$e!==D){if((E!==gi||b!==gi)&&(i.blendEquation(i.FUNC_ADD),E=gi,b=gi),$e)switch(I){case zi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case lo:i.blendFunc(i.ONE,i.ONE);break;case co:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ho:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ye("WebGLState: Invalid blending: ",I);break}else switch(I){case zi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case lo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case co:Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ho:Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ye("WebGLState: Invalid blending: ",I);break}R=null,M=null,y=null,w=null,x.set(0,0,0),A=0,f=I,D=$e}return}fe=fe||oe,ne=ne||Z,we=we||le,(oe!==E||fe!==b)&&(i.blendEquationSeparate(pt[oe],pt[fe]),E=oe,b=fe),(Z!==R||le!==M||ne!==y||we!==w)&&(i.blendFuncSeparate(Be[Z],Be[le],Be[ne],Be[we]),R=Z,M=le,y=ne,w=we),(ye.equals(x)===!1||it!==A)&&(i.blendColor(ye.r,ye.g,ye.b,it),x.copy(ye),A=it),f=I,D=!1}function nt(I,oe){I.side===en?_e(i.CULL_FACE):j(i.CULL_FACE);let Z=I.side===Nt;oe&&(Z=!Z),He(Z),I.blending===zi&&I.transparent===!1?qe(bn):qe(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const le=I.stencilWrite;o.setTest(le),le&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Pt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):_e(i.SAMPLE_ALPHA_TO_COVERAGE)}function He(I){N!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),N=I)}function at(I){I!==Fc?(j(i.CULL_FACE),I!==P&&(I===oo?i.cullFace(i.BACK):I===Oc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):_e(i.CULL_FACE),P=I}function xt(I){I!==F&&(W&&i.lineWidth(I),F=I)}function Pt(I,oe,Z){I?(j(i.POLYGON_OFFSET_FILL),(C!==oe||z!==Z)&&(C=oe,z=Z,a.getReversed()&&(oe=-oe),i.polygonOffset(oe,Z))):_e(i.POLYGON_OFFSET_FILL)}function lt(I){I?j(i.SCISSOR_TEST):_e(i.SCISSOR_TEST)}function ut(I){I===void 0&&(I=i.TEXTURE0+q-1),Q!==I&&(i.activeTexture(I),Q=I)}function U(I,oe,Z){Z===void 0&&(Q===null?Z=i.TEXTURE0+q-1:Z=Q);let le=ee[Z];le===void 0&&(le={type:void 0,texture:void 0},ee[Z]=le),(le.type!==I||le.texture!==oe)&&(Q!==Z&&(i.activeTexture(Z),Q=Z),i.bindTexture(I,oe||K[I]),le.type=I,le.texture=oe)}function yt(){const I=ee[Q];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Je(){try{i.compressedTexImage2D(...arguments)}catch(I){Ye("WebGLState:",I)}}function T(){try{i.compressedTexImage3D(...arguments)}catch(I){Ye("WebGLState:",I)}}function g(){try{i.texSubImage2D(...arguments)}catch(I){Ye("WebGLState:",I)}}function O(){try{i.texSubImage3D(...arguments)}catch(I){Ye("WebGLState:",I)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(I){Ye("WebGLState:",I)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(I){Ye("WebGLState:",I)}}function ie(){try{i.texStorage2D(...arguments)}catch(I){Ye("WebGLState:",I)}}function se(){try{i.texStorage3D(...arguments)}catch(I){Ye("WebGLState:",I)}}function $(){try{i.texImage2D(...arguments)}catch(I){Ye("WebGLState:",I)}}function J(){try{i.texImage3D(...arguments)}catch(I){Ye("WebGLState:",I)}}function re(I){return d[I]!==void 0?d[I]:i.getParameter(I)}function Te(I,oe){d[I]!==oe&&(i.pixelStorei(I,oe),d[I]=oe)}function ce(I){tt.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),tt.copy(I))}function ae(I){We.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),We.copy(I))}function Ae(I,oe){let Z=l.get(oe);Z===void 0&&(Z=new WeakMap,l.set(oe,Z));let le=Z.get(I);le===void 0&&(le=i.getUniformBlockIndex(oe,I.name),Z.set(I,le))}function Re(I,oe){const le=l.get(oe).get(I);c.get(oe)!==le&&(i.uniformBlockBinding(oe,le,I.__bindingPointIndex),c.set(oe,le))}function De(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},Q=null,ee={},u={},p=new WeakMap,_=[],S=null,m=!1,f=null,E=null,R=null,M=null,b=null,y=null,w=null,x=new Ie(0,0,0),A=0,D=!1,N=null,P=null,F=null,C=null,z=null,tt.set(0,0,i.canvas.width,i.canvas.height),We.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:j,disable:_e,bindFramebuffer:Pe,drawBuffers:me,useProgram:Oe,setBlending:qe,setMaterial:nt,setFlipSided:He,setCullFace:at,setLineWidth:xt,setPolygonOffset:Pt,setScissorTest:lt,activeTexture:ut,bindTexture:U,unbindTexture:yt,compressedTexImage2D:Je,compressedTexImage3D:T,texImage2D:$,texImage3D:J,pixelStorei:Te,getParameter:re,updateUBOMapping:Ae,uniformBlockBinding:Re,texStorage2D:ie,texStorage3D:se,texSubImage2D:g,texSubImage3D:O,compressedTexSubImage2D:V,compressedTexSubImage3D:Y,scissor:ce,viewport:ae,reset:De}}function Jm(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ke,h=new WeakMap,d=new Set;let u;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(T,g){return _?new OffscreenCanvas(T,g):Os("canvas")}function m(T,g,O){let V=1;const Y=Je(T);if((Y.width>O||Y.height>O)&&(V=O/Math.max(Y.width,Y.height)),V<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const ie=Math.floor(V*Y.width),se=Math.floor(V*Y.height);u===void 0&&(u=S(ie,se));const $=g?S(ie,se):u;return $.width=ie,$.height=se,$.getContext("2d").drawImage(T,0,0,ie,se),Ce("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+ie+"x"+se+")."),$}else return"data"in T&&Ce("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),T;return T}function f(T){return T.generateMipmaps}function E(T){i.generateMipmap(T)}function R(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(T,g,O,V,Y,ie=!1){if(T!==null){if(i[T]!==void 0)return i[T];Ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let se;V&&(se=e.get("EXT_texture_norm16"),se||Ce("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=g;if(g===i.RED&&(O===i.FLOAT&&($=i.R32F),O===i.HALF_FLOAT&&($=i.R16F),O===i.UNSIGNED_BYTE&&($=i.R8),O===i.UNSIGNED_SHORT&&se&&($=se.R16_EXT),O===i.SHORT&&se&&($=se.R16_SNORM_EXT)),g===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.R8UI),O===i.UNSIGNED_SHORT&&($=i.R16UI),O===i.UNSIGNED_INT&&($=i.R32UI),O===i.BYTE&&($=i.R8I),O===i.SHORT&&($=i.R16I),O===i.INT&&($=i.R32I)),g===i.RG&&(O===i.FLOAT&&($=i.RG32F),O===i.HALF_FLOAT&&($=i.RG16F),O===i.UNSIGNED_BYTE&&($=i.RG8),O===i.UNSIGNED_SHORT&&se&&($=se.RG16_EXT),O===i.SHORT&&se&&($=se.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RG8UI),O===i.UNSIGNED_SHORT&&($=i.RG16UI),O===i.UNSIGNED_INT&&($=i.RG32UI),O===i.BYTE&&($=i.RG8I),O===i.SHORT&&($=i.RG16I),O===i.INT&&($=i.RG32I)),g===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGB8UI),O===i.UNSIGNED_SHORT&&($=i.RGB16UI),O===i.UNSIGNED_INT&&($=i.RGB32UI),O===i.BYTE&&($=i.RGB8I),O===i.SHORT&&($=i.RGB16I),O===i.INT&&($=i.RGB32I)),g===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGBA8UI),O===i.UNSIGNED_SHORT&&($=i.RGBA16UI),O===i.UNSIGNED_INT&&($=i.RGBA32UI),O===i.BYTE&&($=i.RGBA8I),O===i.SHORT&&($=i.RGBA16I),O===i.INT&&($=i.RGBA32I)),g===i.RGB&&(O===i.UNSIGNED_SHORT&&se&&($=se.RGB16_EXT),O===i.SHORT&&se&&($=se.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),g===i.RGBA){const J=ie?Fs:Ge.getTransfer(Y);O===i.FLOAT&&($=i.RGBA32F),O===i.HALF_FLOAT&&($=i.RGBA16F),O===i.UNSIGNED_BYTE&&($=J===Qe?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&se&&($=se.RGBA16_EXT),O===i.SHORT&&se&&($=se.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function b(T,g){let O;return T?g===null||g===fn||g===ki?O=i.DEPTH24_STENCIL8:g===hn?O=i.DEPTH32F_STENCIL8:g===Vi&&(O=i.DEPTH24_STENCIL8,Ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===fn||g===ki?O=i.DEPTH_COMPONENT24:g===hn?O=i.DEPTH_COMPONENT32F:g===Vi&&(O=i.DEPTH_COMPONENT16),O}function y(T,g){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==Mt&&T.minFilter!==At?Math.log2(Math.max(g.width,g.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?g.mipmaps.length:1}function w(T){const g=T.target;g.removeEventListener("dispose",w),A(g),g.isVideoTexture&&h.delete(g),g.isHTMLTexture&&d.delete(g)}function x(T){const g=T.target;g.removeEventListener("dispose",x),N(g)}function A(T){const g=n.get(T);if(g.__webglInit===void 0)return;const O=T.source,V=p.get(O);if(V){const Y=V[g.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&D(T),Object.keys(V).length===0&&p.delete(O)}n.remove(T)}function D(T){const g=n.get(T);i.deleteTexture(g.__webglTexture);const O=T.source,V=p.get(O);delete V[g.__cacheKey],a.memory.textures--}function N(T){const g=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(g.__webglFramebuffer[V]))for(let Y=0;Y<g.__webglFramebuffer[V].length;Y++)i.deleteFramebuffer(g.__webglFramebuffer[V][Y]);else i.deleteFramebuffer(g.__webglFramebuffer[V]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[V])}else{if(Array.isArray(g.__webglFramebuffer))for(let V=0;V<g.__webglFramebuffer.length;V++)i.deleteFramebuffer(g.__webglFramebuffer[V]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let V=0;V<g.__webglColorRenderbuffer.length;V++)g.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[V]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const O=T.textures;for(let V=0,Y=O.length;V<Y;V++){const ie=n.get(O[V]);ie.__webglTexture&&(i.deleteTexture(ie.__webglTexture),a.memory.textures--),n.remove(O[V])}n.remove(T)}let P=0;function F(){P=0}function C(){return P}function z(T){P=T}function q(){const T=P;return T>=s.maxTextures&&Ce("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),P+=1,T}function W(T){const g=[];return g.push(T.wrapS),g.push(T.wrapT),g.push(T.wrapR||0),g.push(T.magFilter),g.push(T.minFilter),g.push(T.anisotropy),g.push(T.internalFormat),g.push(T.format),g.push(T.type),g.push(T.generateMipmaps),g.push(T.premultiplyAlpha),g.push(T.flipY),g.push(T.unpackAlignment),g.push(T.colorSpace),g.join()}function te(T,g){const O=n.get(T);if(T.isVideoTexture&&U(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&O.__version!==T.version){const V=T.image;if(V===null)Ce("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ce("WebGLRenderer: Texture marked for update but image is incomplete");else{_e(O,T,g);return}}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+g)}function X(T,g){const O=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){_e(O,T,g);return}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+g)}function Q(T,g){const O=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){_e(O,T,g);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+g)}function ee(T,g){const O=n.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&O.__version!==T.version){Pe(O,T,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+g)}const be={[qr]:i.REPEAT,[En]:i.CLAMP_TO_EDGE,[Yr]:i.MIRRORED_REPEAT},Me={[Mt]:i.NEAREST,[rh]:i.NEAREST_MIPMAP_NEAREST,[Ji]:i.NEAREST_MIPMAP_LINEAR,[At]:i.LINEAR,[tr]:i.LINEAR_MIPMAP_NEAREST,[Kn]:i.LINEAR_MIPMAP_LINEAR},tt={[ch]:i.NEVER,[ph]:i.ALWAYS,[hh]:i.LESS,[Na]:i.LEQUAL,[uh]:i.EQUAL,[Fa]:i.GEQUAL,[dh]:i.GREATER,[fh]:i.NOTEQUAL};function We(T,g){if(g.type===hn&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===At||g.magFilter===tr||g.magFilter===Ji||g.magFilter===Kn||g.minFilter===At||g.minFilter===tr||g.minFilter===Ji||g.minFilter===Kn)&&Ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,be[g.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,be[g.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,be[g.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,Me[g.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,Me[g.minFilter]),g.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,tt[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Mt||g.minFilter!==Ji&&g.minFilter!==Kn||g.type===hn&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function Ke(T,g){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,g.addEventListener("dispose",w));const V=g.source;let Y=p.get(V);Y===void 0&&(Y={},p.set(V,Y));const ie=W(g);if(ie!==T.__cacheKey){Y[ie]===void 0&&(Y[ie]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Y[ie].usedTimes++;const se=Y[T.__cacheKey];se!==void 0&&(Y[T.__cacheKey].usedTimes--,se.usedTimes===0&&D(g)),T.__cacheKey=ie,T.__webglTexture=Y[ie].texture}return O}function K(T,g,O){return Math.floor(Math.floor(T/O)/g)}function j(T,g,O,V){const ie=T.updateRanges;if(ie.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,O,V,g.data);else{ie.sort((Te,ce)=>Te.start-ce.start);let se=0;for(let Te=1;Te<ie.length;Te++){const ce=ie[se],ae=ie[Te],Ae=ce.start+ce.count,Re=K(ae.start,g.width,4),De=K(ce.start,g.width,4);ae.start<=Ae+1&&Re===De&&K(ae.start+ae.count-1,g.width,4)===Re?ce.count=Math.max(ce.count,ae.start+ae.count-ce.start):(++se,ie[se]=ae)}ie.length=se+1;const $=t.getParameter(i.UNPACK_ROW_LENGTH),J=t.getParameter(i.UNPACK_SKIP_PIXELS),re=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let Te=0,ce=ie.length;Te<ce;Te++){const ae=ie[Te],Ae=Math.floor(ae.start/4),Re=Math.ceil(ae.count/4),De=Ae%g.width,I=Math.floor(Ae/g.width),oe=Re,Z=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,De),t.pixelStorei(i.UNPACK_SKIP_ROWS,I),t.texSubImage2D(i.TEXTURE_2D,0,De,I,oe,Z,O,V,g.data)}T.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,$),t.pixelStorei(i.UNPACK_SKIP_PIXELS,J),t.pixelStorei(i.UNPACK_SKIP_ROWS,re)}}function _e(T,g,O){let V=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(V=i.TEXTURE_3D);const Y=Ke(T,g),ie=g.source;t.bindTexture(V,T.__webglTexture,i.TEXTURE0+O);const se=n.get(ie);if(ie.version!==se.__version||Y===!0){if(t.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){const Z=Ge.getPrimaries(Ge.workingColorSpace),le=g.colorSpace===Bn?null:Ge.getPrimaries(g.colorSpace),fe=g.colorSpace===Bn||Z===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe)}t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let J=m(g.image,!1,s.maxTextureSize);J=yt(g,J);const re=r.convert(g.format,g.colorSpace),Te=r.convert(g.type);let ce=M(g.internalFormat,re,Te,g.normalized,g.colorSpace,g.isVideoTexture);We(V,g);let ae;const Ae=g.mipmaps,Re=g.isVideoTexture!==!0,De=se.__version===void 0||Y===!0,I=ie.dataReady,oe=y(g,J);if(g.isDepthTexture)ce=b(g.format===$n,g.type),De&&(Re?t.texStorage2D(i.TEXTURE_2D,1,ce,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,ce,J.width,J.height,0,re,Te,null));else if(g.isDataTexture)if(Ae.length>0){Re&&De&&t.texStorage2D(i.TEXTURE_2D,oe,ce,Ae[0].width,Ae[0].height);for(let Z=0,le=Ae.length;Z<le;Z++)ae=Ae[Z],Re?I&&t.texSubImage2D(i.TEXTURE_2D,Z,0,0,ae.width,ae.height,re,Te,ae.data):t.texImage2D(i.TEXTURE_2D,Z,ce,ae.width,ae.height,0,re,Te,ae.data);g.generateMipmaps=!1}else Re?(De&&t.texStorage2D(i.TEXTURE_2D,oe,ce,J.width,J.height),I&&j(g,J,re,Te)):t.texImage2D(i.TEXTURE_2D,0,ce,J.width,J.height,0,re,Te,J.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Re&&De&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,ce,Ae[0].width,Ae[0].height,J.depth);for(let Z=0,le=Ae.length;Z<le;Z++)if(ae=Ae[Z],g.format!==nn)if(re!==null)if(Re){if(I)if(g.layerUpdates.size>0){const fe=Wo(ae.width,ae.height,g.format,g.type);for(const ne of g.layerUpdates){const we=ae.data.subarray(ne*fe/ae.data.BYTES_PER_ELEMENT,(ne+1)*fe/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,ne,ae.width,ae.height,1,re,we)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,ae.width,ae.height,J.depth,re,ae.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Z,ce,ae.width,ae.height,J.depth,0,ae.data,0,0);else Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Re?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,ae.width,ae.height,J.depth,re,Te,ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Z,ce,ae.width,ae.height,J.depth,0,re,Te,ae.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{Re&&De&&t.texStorage2D(i.TEXTURE_2D,oe,ce,Ae[0].width,Ae[0].height);for(let Z=0,le=Ae.length;Z<le;Z++)ae=Ae[Z],g.format!==nn?re!==null?Re?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,Z,0,0,ae.width,ae.height,re,ae.data):t.compressedTexImage2D(i.TEXTURE_2D,Z,ce,ae.width,ae.height,0,ae.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?I&&t.texSubImage2D(i.TEXTURE_2D,Z,0,0,ae.width,ae.height,re,Te,ae.data):t.texImage2D(i.TEXTURE_2D,Z,ce,ae.width,ae.height,0,re,Te,ae.data)}else if(g.isDataArrayTexture)if(Re){if(De&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,ce,J.width,J.height,J.depth),I)if(g.layerUpdates.size>0){const Z=Wo(J.width,J.height,g.format,g.type);for(const le of g.layerUpdates){const fe=J.data.subarray(le*Z/J.data.BYTES_PER_ELEMENT,(le+1)*Z/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,le,J.width,J.height,1,re,Te,fe)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,re,Te,J.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ce,J.width,J.height,J.depth,0,re,Te,J.data);else if(g.isData3DTexture)Re?(De&&t.texStorage3D(i.TEXTURE_3D,oe,ce,J.width,J.height,J.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,re,Te,J.data)):t.texImage3D(i.TEXTURE_3D,0,ce,J.width,J.height,J.depth,0,re,Te,J.data);else if(g.isFramebufferTexture){if(De)if(Re)t.texStorage2D(i.TEXTURE_2D,oe,ce,J.width,J.height);else{let Z=J.width,le=J.height;for(let fe=0;fe<oe;fe++)t.texImage2D(i.TEXTURE_2D,fe,ce,Z,le,0,re,Te,null),Z>>=1,le>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){const Z=i.canvas;if(Z.hasAttribute("layoutsubtree")||Z.setAttribute("layoutsubtree","true"),J.parentNode!==Z){Z.appendChild(J),d.add(g),Z.onpaint=le=>{const fe=le.changedElements;for(const ne of d)fe.includes(ne.image)&&(ne.needsUpdate=!0)},Z.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,J);else{const fe=i.RGBA,ne=i.RGBA,we=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,fe,ne,we,J)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ae.length>0){if(Re&&De){const Z=Je(Ae[0]);t.texStorage2D(i.TEXTURE_2D,oe,ce,Z.width,Z.height)}for(let Z=0,le=Ae.length;Z<le;Z++)ae=Ae[Z],Re?I&&t.texSubImage2D(i.TEXTURE_2D,Z,0,0,re,Te,ae):t.texImage2D(i.TEXTURE_2D,Z,ce,re,Te,ae);g.generateMipmaps=!1}else if(Re){if(De){const Z=Je(J);t.texStorage2D(i.TEXTURE_2D,oe,ce,Z.width,Z.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,re,Te,J)}else t.texImage2D(i.TEXTURE_2D,0,ce,re,Te,J);f(g)&&E(V),se.__version=ie.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function Pe(T,g,O){if(g.image.length!==6)return;const V=Ke(T,g),Y=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+O);const ie=n.get(Y);if(Y.version!==ie.__version||V===!0){t.activeTexture(i.TEXTURE0+O);const se=Ge.getPrimaries(Ge.workingColorSpace),$=g.colorSpace===Bn?null:Ge.getPrimaries(g.colorSpace),J=g.colorSpace===Bn||se===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const re=g.isCompressedTexture||g.image[0].isCompressedTexture,Te=g.image[0]&&g.image[0].isDataTexture,ce=[];for(let ne=0;ne<6;ne++)!re&&!Te?ce[ne]=m(g.image[ne],!0,s.maxCubemapSize):ce[ne]=Te?g.image[ne].image:g.image[ne],ce[ne]=yt(g,ce[ne]);const ae=ce[0],Ae=r.convert(g.format,g.colorSpace),Re=r.convert(g.type),De=M(g.internalFormat,Ae,Re,g.normalized,g.colorSpace),I=g.isVideoTexture!==!0,oe=ie.__version===void 0||V===!0,Z=Y.dataReady;let le=y(g,ae);We(i.TEXTURE_CUBE_MAP,g);let fe;if(re){I&&oe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,le,De,ae.width,ae.height);for(let ne=0;ne<6;ne++){fe=ce[ne].mipmaps;for(let we=0;we<fe.length;we++){const ye=fe[we];g.format!==nn?Ae!==null?I?Z&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,we,0,0,ye.width,ye.height,Ae,ye.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,we,De,ye.width,ye.height,0,ye.data):Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,we,0,0,ye.width,ye.height,Ae,Re,ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,we,De,ye.width,ye.height,0,Ae,Re,ye.data)}}}else{if(fe=g.mipmaps,I&&oe){fe.length>0&&le++;const ne=Je(ce[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,le,De,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(Te){I?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ce[ne].width,ce[ne].height,Ae,Re,ce[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,De,ce[ne].width,ce[ne].height,0,Ae,Re,ce[ne].data);for(let we=0;we<fe.length;we++){const it=fe[we].image[ne].image;I?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,we+1,0,0,it.width,it.height,Ae,Re,it.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,we+1,De,it.width,it.height,0,Ae,Re,it.data)}}else{I?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ae,Re,ce[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,De,Ae,Re,ce[ne]);for(let we=0;we<fe.length;we++){const ye=fe[we];I?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,we+1,0,0,Ae,Re,ye.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,we+1,De,Ae,Re,ye.image[ne])}}}f(g)&&E(i.TEXTURE_CUBE_MAP),ie.__version=Y.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function me(T,g,O,V,Y,ie){const se=r.convert(O.format,O.colorSpace),$=r.convert(O.type),J=M(O.internalFormat,se,$,O.normalized,O.colorSpace),re=n.get(g),Te=n.get(O);if(Te.__renderTarget=g,!re.__hasExternalTextures){const ce=Math.max(1,g.width>>ie),ae=Math.max(1,g.height>>ie);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?t.texImage3D(Y,ie,J,ce,ae,g.depth,0,se,$,null):t.texImage2D(Y,ie,J,ce,ae,0,se,$,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),ut(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,Y,Te.__webglTexture,0,lt(g)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,Y,Te.__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(T,g,O){if(i.bindRenderbuffer(i.RENDERBUFFER,T),g.depthBuffer){const V=g.depthTexture,Y=V&&V.isDepthTexture?V.type:null,ie=b(g.stencilBuffer,Y),se=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ut(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt(g),ie,g.width,g.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt(g),ie,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,ie,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,T)}else{const V=g.textures;for(let Y=0;Y<V.length;Y++){const ie=V[Y],se=r.convert(ie.format,ie.colorSpace),$=r.convert(ie.type),J=M(ie.internalFormat,se,$,ie.normalized,ie.colorSpace);ut(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt(g),J,g.width,g.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt(g),J,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,J,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pt(T,g,O){const V=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=n.get(g.depthTexture);if(Y.__renderTarget=g,(!Y.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),V){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,g.depthTexture.addEventListener("dispose",w)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),We(i.TEXTURE_CUBE_MAP,g.depthTexture);const re=r.convert(g.depthTexture.format),Te=r.convert(g.depthTexture.type);let ce;g.depthTexture.format===wn?ce=i.DEPTH_COMPONENT24:g.depthTexture.format===$n&&(ce=i.DEPTH24_STENCIL8);for(let ae=0;ae<6;ae++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,ce,g.width,g.height,0,re,Te,null)}}else te(g.depthTexture,0);const ie=Y.__webglTexture,se=lt(g),$=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,J=g.depthTexture.format===$n?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===wn)ut(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,$,ie,0,se):i.framebufferTexture2D(i.FRAMEBUFFER,J,$,ie,0);else if(g.depthTexture.format===$n)ut(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,$,ie,0,se):i.framebufferTexture2D(i.FRAMEBUFFER,J,$,ie,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Be(T){const g=n.get(T),O=T.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==T.depthTexture){const V=T.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),V){const Y=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,V.removeEventListener("dispose",Y)};V.addEventListener("dispose",Y),g.__depthDisposeCallback=Y}g.__boundDepthTexture=V}if(T.depthTexture&&!g.__autoAllocateDepthBuffer)if(O)for(let V=0;V<6;V++)pt(g.__webglFramebuffer[V],T,V);else{const V=T.texture.mipmaps;V&&V.length>0?pt(g.__webglFramebuffer[0],T,0):pt(g.__webglFramebuffer,T,0)}else if(O){g.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[V]),g.__webglDepthbuffer[V]===void 0)g.__webglDepthbuffer[V]=i.createRenderbuffer(),Oe(g.__webglDepthbuffer[V],T,!1);else{const Y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=g.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,ie)}}else{const V=T.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),Oe(g.__webglDepthbuffer,T,!1);else{const Y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,ie)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function qe(T,g,O){const V=n.get(T);g!==void 0&&me(V.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Be(T)}function nt(T){const g=T.texture,O=n.get(T),V=n.get(g);T.addEventListener("dispose",x);const Y=T.textures,ie=T.isWebGLCubeRenderTarget===!0,se=Y.length>1;if(se||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=g.version,a.memory.textures++),ie){O.__webglFramebuffer=[];for(let $=0;$<6;$++)if(g.mipmaps&&g.mipmaps.length>0){O.__webglFramebuffer[$]=[];for(let J=0;J<g.mipmaps.length;J++)O.__webglFramebuffer[$][J]=i.createFramebuffer()}else O.__webglFramebuffer[$]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){O.__webglFramebuffer=[];for(let $=0;$<g.mipmaps.length;$++)O.__webglFramebuffer[$]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(se)for(let $=0,J=Y.length;$<J;$++){const re=n.get(Y[$]);re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&ut(T)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let $=0;$<Y.length;$++){const J=Y[$];O.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[$]);const re=r.convert(J.format,J.colorSpace),Te=r.convert(J.type),ce=M(J.internalFormat,re,Te,J.normalized,J.colorSpace,T.isXRRenderTarget===!0),ae=lt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,ce,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,O.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Oe(O.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ie){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),We(i.TEXTURE_CUBE_MAP,g);for(let $=0;$<6;$++)if(g.mipmaps&&g.mipmaps.length>0)for(let J=0;J<g.mipmaps.length;J++)me(O.__webglFramebuffer[$][J],T,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,J);else me(O.__webglFramebuffer[$],T,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);f(g)&&E(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(se){for(let $=0,J=Y.length;$<J;$++){const re=Y[$],Te=n.get(re);let ce=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ce=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,Te.__webglTexture),We(ce,re),me(O.__webglFramebuffer,T,re,i.COLOR_ATTACHMENT0+$,ce,0),f(re)&&E(ce)}t.unbindTexture()}else{let $=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&($=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture($,V.__webglTexture),We($,g),g.mipmaps&&g.mipmaps.length>0)for(let J=0;J<g.mipmaps.length;J++)me(O.__webglFramebuffer[J],T,g,i.COLOR_ATTACHMENT0,$,J);else me(O.__webglFramebuffer,T,g,i.COLOR_ATTACHMENT0,$,0);f(g)&&E($),t.unbindTexture()}T.depthBuffer&&Be(T)}function He(T){const g=T.textures;for(let O=0,V=g.length;O<V;O++){const Y=g[O];if(f(Y)){const ie=R(T),se=n.get(Y).__webglTexture;t.bindTexture(ie,se),E(ie),t.unbindTexture()}}}const at=[],xt=[];function Pt(T){if(T.samples>0){if(ut(T)===!1){const g=T.textures,O=T.width,V=T.height;let Y=i.COLOR_BUFFER_BIT;const ie=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=n.get(T),$=g.length>1;if($)for(let re=0;re<g.length;re++)t.bindFramebuffer(i.FRAMEBUFFER,se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,se.__webglMultisampledFramebuffer);const J=T.texture.mipmaps;J&&J.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,se.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,se.__webglFramebuffer);for(let re=0;re<g.length;re++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,se.__webglColorRenderbuffer[re]);const Te=n.get(g[re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Te,0)}i.blitFramebuffer(0,0,O,V,0,0,O,V,Y,i.NEAREST),c===!0&&(at.length=0,xt.length=0,at.push(i.COLOR_ATTACHMENT0+re),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&(at.push(ie),xt.push(ie),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,xt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,at))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let re=0;re<g.length;re++){t.bindFramebuffer(i.FRAMEBUFFER,se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,se.__webglColorRenderbuffer[re]);const Te=n.get(g[re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,Te,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,se.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&c){const g=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function lt(T){return Math.min(s.maxSamples,T.samples)}function ut(T){const g=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function U(T){const g=a.render.frame;h.get(T)!==g&&(h.set(T,g),T.update())}function yt(T,g){const O=T.colorSpace,V=T.format,Y=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==Ns&&O!==Bn&&(Ge.getTransfer(O)===Qe?(V!==nn||Y!==Vt)&&Ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ye("WebGLTextures: Unsupported texture color space:",O)),g}function Je(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=q,this.resetTextureUnits=F,this.getTextureUnits=C,this.setTextureUnits=z,this.setTexture2D=te,this.setTexture2DArray=X,this.setTexture3D=Q,this.setTextureCube=ee,this.rebindTextures=qe,this.setupRenderTarget=nt,this.updateRenderTargetMipmap=He,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=me,this.useMultisampledRTT=ut,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Qm(i,e){function t(n,s=Bn){let r;const a=Ge.getTransfer(s);if(n===Vt)return i.UNSIGNED_BYTE;if(n===Pa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===La)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ol)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Bl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Nl)return i.BYTE;if(n===Fl)return i.SHORT;if(n===Vi)return i.UNSIGNED_SHORT;if(n===Ca)return i.INT;if(n===fn)return i.UNSIGNED_INT;if(n===hn)return i.FLOAT;if(n===pn)return i.HALF_FLOAT;if(n===zl)return i.ALPHA;if(n===Hl)return i.RGB;if(n===nn)return i.RGBA;if(n===wn)return i.DEPTH_COMPONENT;if(n===$n)return i.DEPTH_STENCIL;if(n===Gl)return i.RED;if(n===Da)return i.RED_INTEGER;if(n===Qn)return i.RG;if(n===Ia)return i.RG_INTEGER;if(n===Ua)return i.RGBA_INTEGER;if(n===As||n===ws||n===Rs||n===Cs)if(a===Qe)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===As)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ws)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Rs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Cs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===As)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ws)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Rs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Cs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Kr||n===$r||n===Zr||n===Jr)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Kr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===$r)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Zr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Jr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qr||n===jr||n===ea||n===ta||n===na||n===Ds||n===ia)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Qr||n===jr)return a===Qe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ea)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ta)return r.COMPRESSED_R11_EAC;if(n===na)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ds)return r.COMPRESSED_RG11_EAC;if(n===ia)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===sa||n===ra||n===aa||n===oa||n===la||n===ca||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===_a)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===sa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ra)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===aa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===oa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===la)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ca)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ha)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ua)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===da)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===pa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ma)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ga)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===_a)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===xa||n===va||n===Sa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===xa)return a===Qe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===va)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ma||n===ya||n===Is||n===Ea)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ma)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ya)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Is)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ea)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ki?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const jm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,eg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class tg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Zl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new gn({vertexShader:jm,fragmentShader:eg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Wt(new Ws(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ng extends jn{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,p=null,_=null;const S=typeof XRWebGLBinding<"u",m=new tg,f={},E=t.getContextAttributes();let R=null,M=null;const b=[],y=[],w=new ke;let x=null,A=null;const D=new jt;D.viewport=new ct;const N=new jt;N.viewport=new ct;const P=[D,N],F=new cu;let C=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let j=b[K];return j===void 0&&(j=new hr,b[K]=j),j.getTargetRaySpace()},this.getControllerGrip=function(K){let j=b[K];return j===void 0&&(j=new hr,b[K]=j),j.getGripSpace()},this.getHand=function(K){let j=b[K];return j===void 0&&(j=new hr,b[K]=j),j.getHandSpace()};function q(K){const j=y.indexOf(K.inputSource);if(j===-1)return;const _e=b[j];_e!==void 0&&(_e.update(K.inputSource,K.frame,l||a),_e.dispatchEvent({type:K.type,data:K.inputSource}))}function W(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",te);for(let K=0;K<b.length;K++){const j=y[K];j!==null&&(y[K]=null,b[K].disconnect(j))}C=null,z=null,m.reset();for(const K in f)delete f[K];if(e.setRenderTarget(R),p=null,u=null,d=null,s=null,M=null,Ke.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(w.width,w.height,!1),A!==null){const K=A.camera;K.fov=A.fov,K.zoom=A.zoom,K.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&Ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&S&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(R=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",W),s.addEventListener("inputsourceschange",te),E.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(w),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,Pe=null,me=null;E.depth&&(me=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=E.stencil?$n:wn,Pe=E.stencil?ki:fn);const Oe={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Oe),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new sn(u.textureWidth,u.textureHeight,{format:nn,type:Vt,depthTexture:new Xi(u.textureWidth,u.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const _e={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,_e),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new sn(p.framebufferWidth,p.framebufferHeight,{format:nn,type:Vt,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Ke.setContext(s),Ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function te(K){for(let j=0;j<K.removed.length;j++){const _e=K.removed[j],Pe=y.indexOf(_e);Pe>=0&&(y[Pe]=null,b[Pe].disconnect(_e))}for(let j=0;j<K.added.length;j++){const _e=K.added[j];let Pe=y.indexOf(_e);if(Pe===-1){for(let Oe=0;Oe<b.length;Oe++)if(Oe>=y.length){y.push(_e),Pe=Oe;break}else if(y[Oe]===null){y[Oe]=_e,Pe=Oe;break}if(Pe===-1)break}const me=b[Pe];me&&me.connect(_e)}}const X=new B,Q=new B;function ee(K,j,_e){X.setFromMatrixPosition(j.matrixWorld),Q.setFromMatrixPosition(_e.matrixWorld);const Pe=X.distanceTo(Q),me=j.projectionMatrix.elements,Oe=_e.projectionMatrix.elements,pt=me[14]/(me[10]-1),Be=me[14]/(me[10]+1),qe=(me[9]+1)/me[5],nt=(me[9]-1)/me[5],He=(me[8]-1)/me[0],at=(Oe[8]+1)/Oe[0],xt=pt*He,Pt=pt*at,lt=Pe/(-He+at),ut=lt*-He;if(j.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ut),K.translateZ(lt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),me[10]===-1)K.projectionMatrix.copy(j.projectionMatrix),K.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const U=pt+lt,yt=Be+lt,Je=xt-ut,T=Pt+(Pe-ut),g=qe*Be/yt*U,O=nt*Be/yt*U;K.projectionMatrix.makePerspective(Je,T,g,O,U,yt),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function be(K,j){j===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(j.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let j=K.near,_e=K.far;m.texture!==null&&(m.depthNear>0&&(j=m.depthNear),m.depthFar>0&&(_e=m.depthFar)),F.near=N.near=D.near=j,F.far=N.far=D.far=_e,(C!==F.near||z!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),C=F.near,z=F.far),F.layers.mask=K.layers.mask|6,D.layers.mask=F.layers.mask&-5,N.layers.mask=F.layers.mask&-3;const Pe=K.parent,me=F.cameras;be(F,Pe);for(let Oe=0;Oe<me.length;Oe++)be(me[Oe],Pe);me.length===2?ee(F,D,N):F.projectionMatrix.copy(D.projectionMatrix),A===null&&K.isPerspectiveCamera&&(A={camera:K,fov:K.fov,zoom:K.zoom}),Me(K,F,Pe)};function Me(K,j,_e){_e===null?K.matrix.copy(j.matrixWorld):(K.matrix.copy(_e.matrixWorld),K.matrix.invert(),K.matrix.multiply(j.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(j.projectionMatrix),K.projectionMatrixInverse.copy(j.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ba*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(K){return f[K]};let tt=null;function We(K,j){if(h=j.getViewerPose(l||a),_=j,h!==null){const _e=h.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let Pe=!1;_e.length!==F.cameras.length&&(F.cameras.length=0,Pe=!0);for(let Be=0;Be<_e.length;Be++){const qe=_e[Be];let nt=null;if(p!==null)nt=p.getViewport(qe);else{const at=d.getViewSubImage(u,qe);nt=at.viewport,Be===0&&(e.setRenderTargetTextures(M,at.colorTexture,at.depthStencilTexture),e.setRenderTarget(M))}let He=P[Be];He===void 0&&(He=new jt,He.layers.enable(Be),He.viewport=new ct,P[Be]=He),He.matrix.fromArray(qe.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(qe.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(nt.x,nt.y,nt.width,nt.height),Be===0&&(F.matrix.copy(He.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Pe===!0&&F.cameras.push(He)}const me=s.enabledFeatures;if(me&&me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){d=n.getBinding();const Be=d.getDepthInformation(_e[0]);Be&&Be.isValid&&Be.texture&&m.init(Be,s.renderState)}if(me&&me.includes("camera-access")&&S){e.state.unbindTexture(),d=n.getBinding();for(let Be=0;Be<_e.length;Be++){const qe=_e[Be].camera;if(qe){let nt=f[qe];nt||(nt=new Zl,f[qe]=nt);const He=d.getCameraImage(qe);nt.sourceTexture=He}}}}for(let _e=0;_e<b.length;_e++){const Pe=y[_e],me=b[_e];Pe!==null&&me!==void 0&&me.update(Pe,j,l||a)}tt&&tt(K,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),_=null}const Ke=new tc;Ke.setAnimationLoop(We),this.setAnimationLoop=function(K){tt=K},this.dispose=function(){}}}const ig=new ot,lc=new Le;lc.set(-1,0,0,0,1,0,0,0,1);function sg(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Jl(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,E,R,M){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,M)):f.isMeshMatcapMaterial?(r(m,f),_(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),S(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,E,R):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Nt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Nt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const E=e.get(f),R=E.envMap,M=E.envMapRotation;R&&(m.envMap.value=R,m.envMapRotation.value.setFromMatrix4(ig.makeRotationFromEuler(M)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(lc),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,E,R){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*E,m.scale.value=R*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,E){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Nt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function S(m,f){const E=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function rg(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,b){const y=b.program;n.uniformBlockBinding(M,y)}function l(M,b){let y=s[M.id];y===void 0&&(m(M),y=h(M),s[M.id]=y,M.addEventListener("dispose",E));const w=b.program;n.updateUBOMapping(M,w);const x=e.render.frame;r[M.id]!==x&&(u(M),r[M.id]=x)}function h(M){const b=d();M.__bindingPointIndex=b;const y=i.createBuffer(),w=M.__size,x=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,w,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,y),y}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Ye("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const b=s[M.id],y=M.uniforms,w=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let x=0,A=y.length;x<A;x++){const D=y[x];if(Array.isArray(D))for(let N=0,P=D.length;N<P;N++)p(D[N],x,N,w);else p(D,x,0,w)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,b,y,w){if(S(M,b,y,w)===!0){const x=M.__offset,A=M.value;if(Array.isArray(A)){let D=0;for(let N=0;N<A.length;N++){const P=A[N],F=f(P);_(P,M.__data,D),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(D+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(A,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,M.__data)}}function _(M,b,y){typeof M=="number"||typeof M=="boolean"?b[0]=M:M.isMatrix3?(b[0]=M.elements[0],b[1]=M.elements[1],b[2]=M.elements[2],b[3]=0,b[4]=M.elements[3],b[5]=M.elements[4],b[6]=M.elements[5],b[7]=0,b[8]=M.elements[6],b[9]=M.elements[7],b[10]=M.elements[8],b[11]=0):ArrayBuffer.isView(M)?b.set(new M.constructor(M.buffer,M.byteOffset,b.length)):M.toArray(b,y)}function S(M,b,y,w){const x=M.value,A=b+"_"+y;if(w[A]===void 0)return typeof x=="number"||typeof x=="boolean"?w[A]=x:ArrayBuffer.isView(x)?w[A]=x.slice():w[A]=x.clone(),!0;{const D=w[A];if(typeof x=="number"||typeof x=="boolean"){if(D!==x)return w[A]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(D.equals(x)===!1)return D.copy(x),!0}}return!1}function m(M){const b=M.uniforms;let y=0;const w=16;for(let A=0,D=b.length;A<D;A++){const N=Array.isArray(b[A])?b[A]:[b[A]];for(let P=0,F=N.length;P<F;P++){const C=N[P],z=Array.isArray(C.value)?C.value:[C.value];for(let q=0,W=z.length;q<W;q++){const te=z[q],X=f(te),Q=y%w,ee=Q%X.boundary,be=Q+ee;y+=ee,be!==0&&w-be<X.storage&&(y+=w-be),C.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=y,y+=X.storage}}}const x=y%w;return x>0&&(y+=w-x),M.__size=y,M.__cache={},this}function f(M){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?Ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(b.boundary=16,b.storage=M.byteLength):Ce("WebGLRenderer: Unsupported uniform value type.",M),b}function E(M){const b=M.target;b.removeEventListener("dispose",E);const y=a.indexOf(b.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function R(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:R}}const ag=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ln=null;function og(){return ln===null&&(ln=new Vh(ag,16,16,Qn,pn),ln.name="DFG_LUT",ln.minFilter=At,ln.magFilter=At,ln.wrapS=En,ln.wrapT=En,ln.generateMipmaps=!1,ln.needsUpdate=!0),ln}class lg{constructor(e={}){const{canvas:t=_h(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Vt}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const S=p,m=new Set([Ua,Ia,Da]),f=new Set([Vt,fn,Vi,ki,Pa,La]),E=new Uint32Array(4),R=new Int32Array(4),M=new B;let b=null,y=null;const w=[],x=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=dn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let N=!1,P=null,F=null,C=null,z=null;this._outputColorSpace=Gt;let q=0,W=0,te=null,X=-1,Q=null;const ee=new ct,be=new ct;let Me=null;const tt=new Ie(0);let We=0,Ke=t.width,K=t.height,j=1,_e=null,Pe=null;const me=new ct(0,0,Ke,K),Oe=new ct(0,0,Ke,K);let pt=!1;const Be=new za;let qe=!1,nt=!1;const He=new ot,at=new B,xt=new ct,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let lt=!1;function ut(){return te===null?j:1}let U=n;function yt(v,L){return t.getContext(v,L)}let Je,T,g,O,V,Y,ie,se,$,J,re,Te,ce,ae,Ae,Re,De,I,oe,Z,le,fe,ne;try{const v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ra}`),t.addEventListener("webglcontextlost",it,!1),t.addEventListener("webglcontextrestored",$e,!1),t.addEventListener("webglcontextcreationerror",Kt,!1),U===null){const L="webgl2";if(U=yt(L,v),U===null)throw yt(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}we()}catch(v){throw t.removeEventListener("webglcontextlost",it,!1),t.removeEventListener("webglcontextrestored",$e,!1),t.removeEventListener("webglcontextcreationerror",Kt,!1),Ye("WebGLRenderer: "+v.message),v}function we(){Je=new op(U),Je.init(),le=new Qm(U,Je),T=new Jf(U,Je,e,le),g=new Zm(U,Je),T.reversedDepthBuffer&&u&&g.buffers.depth.setReversed(!0),F=U.createFramebuffer(),C=U.createFramebuffer(),z=U.createFramebuffer(),O=new hp(U),V=new Fm,Y=new Jm(U,Je,g,V,T,le,O),ie=new ap(D),se=new uu(U),fe=new $f(U,se),$=new lp(U,se,O,fe),J=new dp(U,$,se,fe,O),I=new up(U,T,Y),Ae=new Qf(V),re=new Nm(D,ie,Je,T,fe,Ae),Te=new sg(D,V),ce=new Bm,ae=new Wm(Je),De=new Kf(D,ie,g,J,_,c),Re=new $m(D,J,T),ne=new rg(U,O,T,g),oe=new Zf(U,Je,O),Z=new cp(U,Je,O),O.programs=re.programs,D.capabilities=T,D.extensions=Je,D.properties=V,D.renderLists=ce,D.shadowMap=Re,D.state=g,D.info=O}S!==Vt&&(A=new pp(S,t.width,t.height,o,s,r));const ye=new ng(D,U);this.xr=ye,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const v=Je.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Je.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(v){v!==void 0&&(j=v,this.setSize(Ke,K,!1))},this.getSize=function(v){return v.set(Ke,K)},this.setSize=function(v,L,k=!0){if(ye.isPresenting){Ce("WebGLRenderer: Can't change size while VR device is presenting.");return}Ke=v,K=L,t.width=Math.floor(v*j),t.height=Math.floor(L*j),k===!0&&(t.style.width=v+"px",t.style.height=L+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,v,L)},this.getDrawingBufferSize=function(v){return v.set(Ke*j,K*j).floor()},this.setDrawingBufferSize=function(v,L,k){Ke=v,K=L,j=k,t.width=Math.floor(v*k),t.height=Math.floor(L*k),this.setViewport(0,0,v,L)},this.setEffects=function(v){if(S===Vt){Ye("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let L=0;L<v.length;L++)if(v[L].isOutputPass===!0){Ce("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(ee)},this.getViewport=function(v){return v.copy(me)},this.setViewport=function(v,L,k,H){v.isVector4?me.set(v.x,v.y,v.z,v.w):me.set(v,L,k,H),g.viewport(ee.copy(me).multiplyScalar(j).round())},this.getScissor=function(v){return v.copy(Oe)},this.setScissor=function(v,L,k,H){v.isVector4?Oe.set(v.x,v.y,v.z,v.w):Oe.set(v,L,k,H),g.scissor(be.copy(Oe).multiplyScalar(j).round())},this.getScissorTest=function(){return pt},this.setScissorTest=function(v){g.setScissorTest(pt=v)},this.setOpaqueSort=function(v){_e=v},this.setTransparentSort=function(v){Pe=v},this.getClearColor=function(v){return v.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(v=!0,L=!0,k=!0){let H=0;if(v){let G=!1;if(te!==null){const de=te.texture.format;G=m.has(de)}if(G){const de=te.texture.type,ge=f.has(de),ue=De.getClearColor(),ve=De.getClearAlpha(),Ee=ue.r,Ue=ue.g,ze=ue.b;ge?(E[0]=Ee,E[1]=Ue,E[2]=ze,E[3]=ve,U.clearBufferuiv(U.COLOR,0,E)):(R[0]=Ee,R[1]=Ue,R[2]=ze,R[3]=ve,U.clearBufferiv(U.COLOR,0,R))}else H|=U.COLOR_BUFFER_BIT}L&&(H|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),k&&(H|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&U.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),P=v},this.dispose=function(){t.removeEventListener("webglcontextlost",it,!1),t.removeEventListener("webglcontextrestored",$e,!1),t.removeEventListener("webglcontextcreationerror",Kt,!1),De.dispose(),ce.dispose(),ae.dispose(),V.dispose(),ie.dispose(),J.dispose(),fe.dispose(),ne.dispose(),re.dispose(),ye.dispose(),ye.removeEventListener("sessionstart",Ya),ye.removeEventListener("sessionend",Ka),zn.stop()};function it(v){v.preventDefault(),po("WebGLRenderer: Context Lost."),N=!0}function $e(){po("WebGLRenderer: Context Restored."),N=!1;const v=O.autoReset,L=Re.enabled,k=Re.autoUpdate,H=Re.needsUpdate,G=Re.type;we(),O.autoReset=v,Re.enabled=L,Re.autoUpdate=k,Re.needsUpdate=H,Re.type=G}function Kt(v){Ye("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function rn(v){const L=v.target;L.removeEventListener("dispose",rn),dc(L)}function dc(v){fc(v),V.remove(v)}function fc(v){const L=V.get(v).programs;L!==void 0&&(L.forEach(function(k){re.releaseProgram(k)}),v.isShaderMaterial&&re.releaseShaderCache(v))}this.renderBufferDirect=function(v,L,k,H,G,de){L===null&&(L=Pt);const ge=G.isMesh&&G.matrixWorld.determinantAffine()<0,ue=gc(v,L,k,H,G);g.setMaterial(H,ge);let ve=k.index,Ee=1;if(H.wireframe===!0){if(ve=$.getWireframeAttribute(k),ve===void 0)return;Ee=2}const Ue=k.drawRange,ze=k.attributes.position;let Se=Ue.start*Ee,Ze=(Ue.start+Ue.count)*Ee;de!==null&&(Se=Math.max(Se,de.start*Ee),Ze=Math.min(Ze,(de.start+de.count)*Ee)),ve!==null?(Se=Math.max(Se,0),Ze=Math.min(Ze,ve.count)):ze!=null&&(Se=Math.max(Se,0),Ze=Math.min(Ze,ze.count));const dt=Ze-Se;if(dt<0||dt===1/0)return;fe.setup(G,H,ue,k,ve);let rt,et=oe;if(ve!==null&&(rt=se.get(ve),et=Z,et.setIndex(rt)),G.isMesh)H.wireframe===!0?(g.setLineWidth(H.wireframeLinewidth*ut()),et.setMode(U.LINES)):et.setMode(U.TRIANGLES);else if(G.isLine){let Et=H.linewidth;Et===void 0&&(Et=1),g.setLineWidth(Et*ut()),G.isLineSegments?et.setMode(U.LINES):G.isLineLoop?et.setMode(U.LINE_LOOP):et.setMode(U.LINE_STRIP)}else G.isPoints?et.setMode(U.POINTS):G.isSprite&&et.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(Je.get("WEBGL_multi_draw"))et.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Et=G._multiDrawStarts,pe=G._multiDrawCounts,wt=G._multiDrawCount,Xe=ve?se.get(ve).bytesPerElement:1,Xt=V.get(H).currentProgram.getUniforms();for(let an=0;an<wt;an++)Xt.setValue(U,"_gl_DrawID",an),et.render(Et[an]/Xe,pe[an])}else if(G.isInstancedMesh)et.renderInstances(Se,dt,G.count);else if(k.isInstancedBufferGeometry){const Et=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,pe=Math.min(k.instanceCount,Et);et.renderInstances(Se,dt,pe)}else et.render(Se,dt)};function qa(v,L,k,H){P!==null&&v.isNodeMaterial&&P.setObject(H,v),qe===!0&&Ae.setState(v,k,!1),v.transparent===!0&&v.side===en&&v.forceSinglePass===!1?(v.side=Nt,v.needsUpdate=!0,Zi(v,L,H),v.side=Zn,v.needsUpdate=!0,Zi(v,L,H),v.side=en):Zi(v,L,H)}this.compile=function(v,L,k=null){k===null&&(k=v),P!==null&&P.renderStart(v,L,k),y=ae.get(k),y.init(L),x.push(y),k.traverseVisible(function(G){G.isLight&&G.layers.test(L.layers)&&(y.pushLight(G),G.castShadow&&y.pushShadow(G))}),v!==k&&v.traverseVisible(function(G){G.isLight&&G.layers.test(L.layers)&&(y.pushLight(G),G.castShadow&&y.pushShadow(G))}),y.setupLights(),P!==null&&P.updateLights(y.state.lightsArray),nt=this.localClippingEnabled,qe=Ae.init(this.clippingPlanes,nt),qe===!0&&Ae.setGlobalState(this.clippingPlanes,L),P!==null&&Re.render(y.state.shadowsArray,k,L);const H=new Set;return v.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const de=G.material;if(de)if(Array.isArray(de))for(let ge=0;ge<de.length;ge++){const ue=de[ge];qa(ue,k,L,G),H.add(ue)}else qa(de,k,L,G),H.add(de)}),y=x.pop(),P!==null&&P.renderEnd(),H},this.compileAsync=function(v,L,k=null){const H=this.compile(v,L,k);return new Promise(G=>{function de(){if(H.forEach(function(ge){const ve=V.get(ge).currentProgram;(ve===void 0||ve.isReady())&&H.delete(ge)}),H.size===0){G(v);return}setTimeout(de,10)}Je.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Ks=null;function pc(v){Ks&&Ks(v)}function Ya(){zn.stop()}function Ka(){zn.start()}const zn=new tc;zn.setAnimationLoop(pc),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(v){Ks=v,ye.setAnimationLoop(v),v===null?zn.stop():zn.start()},ye.addEventListener("sessionstart",Ya),ye.addEventListener("sessionend",Ka),this.render=function(v,L){if(L!==void 0&&L.isCamera!==!0){Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;P!==null&&P.renderStart(v,L);const k=ye.enabled===!0&&ye.isPresenting===!0,H=A!==null&&(te===null||k)&&A.begin(D,te);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),ye.enabled===!0&&ye.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(ye.cameraAutoUpdate===!0&&ye.updateCamera(L),L=ye.getCamera()),v.isScene===!0&&v.onBeforeRender(D,v,L,te),y=ae.get(v,x.length),y.init(L),y.state.textureUnits=Y.getTextureUnits(),x.push(y),He.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Be.setFromProjectionMatrix(He,un,L.reversedDepth),nt=this.localClippingEnabled,qe=Ae.init(this.clippingPlanes,nt),b=ce.get(v,w.length),b.init(),w.push(b),ye.enabled===!0&&ye.isPresenting===!0){const ge=D.xr.getDepthSensingMesh();ge!==null&&$s(ge,L,-1/0,D.sortObjects)}$s(v,L,0,D.sortObjects),b.finish(),P!==null&&P.updateLights(y.state.lightsArray),D.sortObjects===!0&&b.sort(_e,Pe),lt=ye.enabled===!1||ye.isPresenting===!1||ye.hasDepthSensing()===!1,lt&&De.addToRenderList(b,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),qe===!0&&Ae.beginShadows();const G=y.state.shadowsArray;if(Re.render(G,v,L),qe===!0&&Ae.endShadows(),(H&&A.hasRenderPass())===!1){const ge=b.opaque,ue=b.transmissive;if(y.setupLights(),L.isArrayCamera){const ve=L.cameras;if(ue.length>0)for(let Ee=0,Ue=ve.length;Ee<Ue;Ee++){const ze=ve[Ee];Za(ge,ue,v,ze)}lt&&De.render(v);for(let Ee=0,Ue=ve.length;Ee<Ue;Ee++){const ze=ve[Ee];$a(b,v,ze,ze.viewport)}}else ue.length>0&&Za(ge,ue,v,L),lt&&De.render(v),$a(b,v,L)}te!==null&&W===0&&(Y.updateMultisampleRenderTarget(te),Y.updateRenderTargetMipmap(te)),H&&A.end(D),v.isScene===!0&&v.onAfterRender(D,v,L),fe.resetDefaultState(),X=-1,Q=null,x.pop(),x.length>0?(y=x[x.length-1],Y.setTextureUnits(y.state.textureUnits),qe===!0&&Ae.setGlobalState(D.clippingPlanes,y.state.camera)):y=null,w.pop(),w.length>0?b=w[w.length-1]:b=null,P!==null&&P.renderEnd()};function $s(v,L,k,H){if(v.visible===!1)return;if(v.layers.test(L.layers)){if(v.isGroup)k=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(L);else if(v.isLightProbeGrid)y.pushLightProbeGrid(v);else if(v.isLight)y.pushLight(v),v.castShadow&&y.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(Be)){H&&xt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(He);const ge=J.update(v),ue=v.material;ue.visible&&b.push(v,ge,ue,k,xt.z,null,L)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(Be))){const ge=J.update(v),ue=v.material;if(H&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),xt.copy(v.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),xt.copy(ge.boundingSphere.center)),xt.applyMatrix4(v.matrixWorld).applyMatrix4(He)),Array.isArray(ue)){const ve=ge.groups;for(let Ee=0,Ue=ve.length;Ee<Ue;Ee++){const ze=ve[Ee],Se=ue[ze.materialIndex];Se&&Se.visible&&b.push(v,ge,Se,k,xt.z,ze,L)}}else ue.visible&&b.push(v,ge,ue,k,xt.z,null,L)}}const de=v.children;for(let ge=0,ue=de.length;ge<ue;ge++)$s(de[ge],L,k,H)}function $a(v,L,k,H){const{opaque:G,transmissive:de,transparent:ge}=v;y.setupLightsView(k),qe===!0&&Ae.setGlobalState(D.clippingPlanes,k),H&&g.viewport(ee.copy(H)),G.length>0&&$i(G,L,k),de.length>0&&$i(de,L,k),ge.length>0&&$i(ge,L,k),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function Za(v,L,k,H){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[H.id]===void 0){const Se=Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[H.id]=new sn(1,1,{generateMipmaps:!0,type:Se?pn:Vt,minFilter:Kn,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ge.workingColorSpace})}const de=y.state.transmissionRenderTarget[H.id],ge=H.viewport||ee;de.setSize(ge.z*D.transmissionResolutionScale,ge.w*D.transmissionResolutionScale);const ue=D.getRenderTarget(),ve=D.getActiveCubeFace(),Ee=D.getActiveMipmapLevel();D.setRenderTarget(de),D.getClearColor(tt),We=D.getClearAlpha(),We<1&&D.setClearColor(16777215,.5),D.clear(),lt&&De.render(k);const Ue=D.toneMapping;D.toneMapping=dn;const ze=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),y.setupLightsView(H),qe===!0&&Ae.setGlobalState(D.clippingPlanes,H),$i(v,k,H),Y.updateMultisampleRenderTarget(de),Y.updateRenderTargetMipmap(de),Je.has("WEBGL_multisampled_render_to_texture")===!1){let Se=!1;for(let Ze=0,dt=L.length;Ze<dt;Ze++){const rt=L[Ze],{object:et,geometry:Et,material:pe,group:wt}=rt;if(pe.side===en&&et.layers.test(H.layers)){const Xe=pe.side;pe.side=Nt,pe.needsUpdate=!0,Ja(et,k,H,Et,pe,wt),pe.side=Xe,pe.needsUpdate=!0,Se=!0}}Se===!0&&(Y.updateMultisampleRenderTarget(de),Y.updateRenderTargetMipmap(de))}D.setRenderTarget(ue,ve,Ee),D.setClearColor(tt,We),ze!==void 0&&(H.viewport=ze),D.toneMapping=Ue}function $i(v,L,k){const H=L.isScene===!0?L.overrideMaterial:null;for(let G=0,de=v.length;G<de;G++){const ge=v[G],{object:ue,geometry:ve,group:Ee}=ge;let Ue=ge.material;Ue.allowOverride===!0&&H!==null&&(Ue=H),ue.layers.test(k.layers)&&Ja(ue,L,k,ve,Ue,Ee)}}function Ja(v,L,k,H,G,de){P!==null&&G.isNodeMaterial&&P.setObject(v,G),v.onBeforeRender(D,L,k,H,G,de),v.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),G.onBeforeRender(D,L,k,H,v,de),G.transparent===!0&&G.side===en&&G.forceSinglePass===!1?(G.side=Nt,G.needsUpdate=!0,D.renderBufferDirect(k,L,H,G,v,de),G.side=Zn,G.needsUpdate=!0,D.renderBufferDirect(k,L,H,G,v,de),G.side=en):D.renderBufferDirect(k,L,H,G,v,de),v.onAfterRender(D,L,k,H,G,de)}function Zi(v,L,k){L.isScene!==!0&&(L=Pt);const H=V.get(v),G=y.state.lights,de=y.state.shadowsArray,ge=G.state.version,ue=re.getParameters(v,G.state,de,L,k,y.state.lightProbeGridArray),ve=re.getProgramCacheKey(ue);let Ee=H.programs;H.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?L.environment:null,H.fog=L.fog;const Ue=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;H.envMap=ie.get(v.envMap||H.environment,Ue),H.envMapRotation=H.environment!==null&&v.envMap===null?L.environmentRotation:v.envMapRotation,Ee===void 0&&(v.addEventListener("dispose",rn),Ee=new Map,H.programs=Ee);let ze=Ee.get(ve);if(ze!==void 0){if(H.currentProgram===ze&&H.lightsStateVersion===ge)return ja(v,ue),ze}else ue.uniforms=re.getUniforms(v),P!==null&&v.isNodeMaterial&&P.build(v,k,ue),v.onBeforeCompile(ue,D),ze=re.acquireProgram(ue,ve),Ee.set(ve,ze),H.uniforms=ue.uniforms;const Se=H.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Se.clippingPlanes=Ae.uniform),ja(v,ue),H.needsLights=xc(v),H.lightsStateVersion=ge,H.needsLights&&(Se.ambientLightColor.value=G.state.ambient,Se.lightProbe.value=G.state.probe,Se.sunLights.value=G.state.sun,Se.sunLightShadows.value=G.state.sunShadow,Se.directionalLights.value=G.state.directional,Se.directionalLightShadows.value=G.state.directionalShadow,Se.spotLights.value=G.state.spot,Se.spotLightShadows.value=G.state.spotShadow,Se.rectAreaLights.value=G.state.rectArea,Se.ltc_1.value=G.state.rectAreaLTC1,Se.ltc_2.value=G.state.rectAreaLTC2,Se.pointLights.value=G.state.point,Se.pointLightShadows.value=G.state.pointShadow,Se.hemisphereLights.value=G.state.hemi,Se.sunShadowMatrix.value=G.state.sunShadowMatrix,Se.sunShadowCascade.value=G.state.sunShadowCascade,Se.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Se.spotLightMatrix.value=G.state.spotLightMatrix,Se.spotLightMap.value=G.state.spotLightMap,Se.pointShadowMatrix.value=G.state.pointShadowMatrix),H.lightProbeGrid=y.state.lightProbeGridArray.length>0,H.currentProgram=ze,H.uniformsList=null,ze}function Qa(v){if(v.uniformsList===null){const L=v.currentProgram.getUniforms();v.uniformsList=Ls.seqWithValue(L.seq,v.uniforms)}return v.uniformsList}function ja(v,L){const k=V.get(v);k.outputColorSpace=L.outputColorSpace,k.batching=L.batching,k.batchingColor=L.batchingColor,k.instancing=L.instancing,k.instancingColor=L.instancingColor,k.instancingMorph=L.instancingMorph,k.skinning=L.skinning,k.morphTargets=L.morphTargets,k.morphNormals=L.morphNormals,k.morphColors=L.morphColors,k.morphTargetsCount=L.morphTargetsCount,k.numClippingPlanes=L.numClippingPlanes,k.numIntersection=L.numClipIntersection,k.vertexAlphas=L.vertexAlphas,k.vertexTangents=L.vertexTangents,k.toneMapping=L.toneMapping}function mc(v,L){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;M.setFromMatrixPosition(L.matrixWorld);for(let k=0,H=v.length;k<H;k++){const G=v[k];if(G.texture!==null&&G.boundingBox.containsPoint(M))return G}return null}function gc(v,L,k,H,G){L.isScene!==!0&&(L=Pt),Y.resetTextureUnits();const de=L.fog,ge=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?L.environment:null,ue=te===null?D.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Ge.workingColorSpace,ve=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Ee=ie.get(H.envMap||ge,ve),Ue=H.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,ze=!!k.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Se=!!k.morphAttributes.position,Ze=!!k.morphAttributes.normal,dt=!!k.morphAttributes.color;let rt=dn;H.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(rt=D.toneMapping);const et=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Et=et!==void 0?et.length:0,pe=V.get(H),wt=y.state.lights;if(qe===!0&&(nt===!0||v!==Q)){const st=v===Q&&H.id===X;Ae.setState(H,v,st)}let Xe=!1;H.version===pe.__version?(pe.needsLights&&pe.lightsStateVersion!==wt.state.version||pe.outputColorSpace!==ue||G.isBatchedMesh&&pe.batching===!1||!G.isBatchedMesh&&pe.batching===!0||G.isBatchedMesh&&pe.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&pe.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&pe.instancing===!1||!G.isInstancedMesh&&pe.instancing===!0||G.isSkinnedMesh&&pe.skinning===!1||!G.isSkinnedMesh&&pe.skinning===!0||G.isInstancedMesh&&pe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&pe.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&pe.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&pe.instancingMorph===!1&&G.morphTexture!==null||pe.envMap!==Ee||H.fog===!0&&pe.fog!==de||pe.numClippingPlanes!==void 0&&(pe.numClippingPlanes!==Ae.numPlanes||pe.numIntersection!==Ae.numIntersection)||pe.vertexAlphas!==Ue||pe.vertexTangents!==ze||pe.morphTargets!==Se||pe.morphNormals!==Ze||pe.morphColors!==dt||pe.toneMapping!==rt||pe.morphTargetsCount!==Et||!!pe.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(Xe=!0):(Xe=!0,pe.__version=H.version);let Xt=pe.currentProgram;Xe===!0&&(Xt=Zi(H,L,G),P&&H.isNodeMaterial&&P.onUpdateProgram(H,Xt,pe));let an=!1,Cn=!1,ei=!1;const je=Xt.getUniforms(),ht=pe.uniforms;if(g.useProgram(Xt.program)&&(an=!0,Cn=!0,ei=!0),H.id!==X&&(X=H.id,Cn=!0),pe.needsLights){const st=mc(y.state.lightProbeGridArray,G);pe.lightProbeGrid!==st&&(pe.lightProbeGrid=st,Cn=!0)}if(an||Q!==v){g.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),je.setValue(U,"projectionMatrix",v.projectionMatrix),je.setValue(U,"viewMatrix",v.matrixWorldInverse);const Ln=je.map.cameraPosition;Ln!==void 0&&Ln.setValue(U,at.setFromMatrixPosition(v.matrixWorld)),T.logarithmicDepthBuffer&&je.setValue(U,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&je.setValue(U,"isOrthographic",v.isOrthographicCamera===!0),Q!==v&&(Q=v,Cn=!0,ei=!0)}if(pe.needsLights&&(wt.state.sunShadowMap.length>0&&je.setValue(U,"sunShadowMap",wt.state.sunShadowMap,Y),wt.state.directionalShadowMap.length>0&&je.setValue(U,"directionalShadowMap",wt.state.directionalShadowMap,Y),wt.state.spotShadowMap.length>0&&je.setValue(U,"spotShadowMap",wt.state.spotShadowMap,Y),wt.state.pointShadowMap.length>0&&je.setValue(U,"pointShadowMap",wt.state.pointShadowMap,Y)),G.isSkinnedMesh){je.setOptional(U,G,"bindMatrix"),je.setOptional(U,G,"bindMatrixInverse");const st=G.skeleton;st&&(st.boneTexture===null&&st.computeBoneTexture(),je.setValue(U,"boneTexture",st.boneTexture,Y))}G.isBatchedMesh&&(je.setOptional(U,G,"batchingTexture"),je.setValue(U,"batchingTexture",G._matricesTexture,Y),je.setOptional(U,G,"batchingIdTexture"),je.setValue(U,"batchingIdTexture",G._indirectTexture,Y),je.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&je.setValue(U,"batchingColorTexture",G._colorsTexture,Y));const Pn=k.morphAttributes;if((Pn.position!==void 0||Pn.normal!==void 0||Pn.color!==void 0)&&I.update(G,k,Xt),(Cn||pe.receiveShadow!==G.receiveShadow)&&(pe.receiveShadow=G.receiveShadow,je.setValue(U,"receiveShadow",G.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&L.environment!==null&&(ht.envMapIntensity.value=L.environmentIntensity),ht.dfgLUT!==void 0&&(ht.dfgLUT.value=og()),Cn){if(je.setValue(U,"toneMappingExposure",D.toneMappingExposure),pe.needsLights&&_c(ht,ei),de&&H.fog===!0&&Te.refreshFogUniforms(ht,de),Te.refreshMaterialUniforms(ht,H,j,K,y.state.transmissionRenderTarget[v.id]),pe.needsLights&&pe.lightProbeGrid){const st=pe.lightProbeGrid;ht.probesSH.value=st.texture,ht.probesMin.value.copy(st.boundingBox.min),ht.probesMax.value.copy(st.boundingBox.max),ht.probesResolution.value.copy(st.resolution)}Ls.upload(U,Qa(pe),ht,Y)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Ls.upload(U,Qa(pe),ht,Y),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&je.setValue(U,"center",G.center),je.setValue(U,"modelViewMatrix",G.modelViewMatrix),je.setValue(U,"normalMatrix",G.normalMatrix),je.setValue(U,"modelMatrix",G.matrixWorld),H.uniformsGroups!==void 0){const st=H.uniformsGroups;for(let Ln=0,ti=st.length;Ln<ti;Ln++){const to=st[Ln];ne.update(to,Xt),ne.bind(to,Xt)}}return Xt}function _c(v,L){v.ambientLightColor.needsUpdate=L,v.lightProbe.needsUpdate=L,v.sunLights.needsUpdate=L,v.sunLightShadows.needsUpdate=L,v.directionalLights.needsUpdate=L,v.directionalLightShadows.needsUpdate=L,v.pointLights.needsUpdate=L,v.pointLightShadows.needsUpdate=L,v.spotLights.needsUpdate=L,v.spotLightShadows.needsUpdate=L,v.rectAreaLights.needsUpdate=L,v.hemisphereLights.needsUpdate=L}function xc(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(v,L,k){const H=V.get(v);H.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),V.get(v.texture).__webglTexture=L,V.get(v.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:k,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,L){const k=V.get(v);k.__webglFramebuffer=L,k.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(v,L=0,k=0){te=v,q=L,W=k;let H=null,G=!1,de=!1;if(v){const ue=V.get(v);if(ue.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(U.FRAMEBUFFER,ue.__webglFramebuffer),ee.copy(v.viewport),be.copy(v.scissor),Me=v.scissorTest,g.viewport(ee),g.scissor(be),g.setScissorTest(Me),X=-1;return}else if(ue.__webglFramebuffer===void 0)Y.setupRenderTarget(v);else if(ue.__hasExternalTextures)Y.rebindTextures(v,V.get(v.texture).__webglTexture,V.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Ue=v.depthTexture;if(ue.__boundDepthTexture!==Ue){if(Ue!==null&&V.has(Ue)&&(v.width!==Ue.image.width||v.height!==Ue.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(v)}}const ve=v.texture;(ve.isData3DTexture||ve.isDataArrayTexture||ve.isCompressedArrayTexture)&&(de=!0);const Ee=V.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ee[L])?H=Ee[L][k]:H=Ee[L],G=!0):v.samples>0&&Y.useMultisampledRTT(v)===!1?H=V.get(v).__webglMultisampledFramebuffer:Array.isArray(Ee)?H=Ee[k]:H=Ee,ee.copy(v.viewport),be.copy(v.scissor),Me=v.scissorTest}else ee.copy(me).multiplyScalar(j).floor(),be.copy(Oe).multiplyScalar(j).floor(),Me=pt;if(k!==0&&(H=F),g.bindFramebuffer(U.FRAMEBUFFER,H)&&g.drawBuffers(v,H),g.viewport(ee),g.scissor(be),g.setScissorTest(Me),G){const ue=V.get(v.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+L,ue.__webglTexture,k)}else if(de){const ue=L;for(let ve=0;ve<v.textures.length;ve++){const Ee=V.get(v.textures[ve]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+ve,Ee.__webglTexture,k,ue)}}else if(v!==null&&k!==0){const ue=V.get(v.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ue.__webglTexture,k)}X=-1};function eo(v){const L=V.get(v);return(L.__readFormat!==v.format||L.__readType!==v.type)&&(L.__readFormat=v.format,L.__readType=v.type,L.__formatReadable=T.textureFormatReadable(v.format),L.__typeReadable=T.textureTypeReadable(v.type)),L}this.readRenderTargetPixels=function(v,L,k,H,G,de,ge,ue=0){if(!(v&&v.isWebGLRenderTarget)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=V.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ge!==void 0&&(ve=ve[ge]),ve){g.bindFramebuffer(U.FRAMEBUFFER,ve);try{const Ee=v.textures[ue],Ue=Ee.format,ze=Ee.type;v.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ue);const Se=eo(Ee);if(Se.__formatReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Se.__typeReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=v.width-H&&k>=0&&k<=v.height-G&&U.readPixels(L,k,H,G,le.convert(Ue),le.convert(ze),de)}finally{const Ee=te!==null?V.get(te).__webglFramebuffer:null;g.bindFramebuffer(U.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(v,L,k,H,G,de,ge,ue=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=V.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ge!==void 0&&(ve=ve[ge]),ve)if(L>=0&&L<=v.width-H&&k>=0&&k<=v.height-G){g.bindFramebuffer(U.FRAMEBUFFER,ve);const Ee=v.textures[ue],Ue=Ee.format,ze=Ee.type;v.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ue);const Se=eo(Ee);if(Se.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Se.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ze=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ze),U.bufferData(U.PIXEL_PACK_BUFFER,de.byteLength,U.STREAM_READ),U.readPixels(L,k,H,G,le.convert(Ue),le.convert(ze),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);const dt=te!==null?V.get(te).__webglFramebuffer:null;g.bindFramebuffer(U.FRAMEBUFFER,dt);const rt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await xh(U,rt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ze),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,de),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(Ze),U.deleteSync(rt),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,L=null,k=0){const H=Math.pow(2,-k),G=Math.floor(v.image.width*H),de=Math.floor(v.image.height*H),ge=L!==null?L.x:0,ue=L!==null?L.y:0;Y.setTexture2D(v,0),U.copyTexSubImage2D(U.TEXTURE_2D,k,0,0,ge,ue,G,de),g.unbindTexture()},this.copyTextureToTexture=function(v,L,k=null,H=null,G=0,de=0){let ge,ue,ve,Ee,Ue,ze,Se,Ze,dt;const rt=v.isCompressedTexture?v.mipmaps[de]:v.image;if(k!==null)ge=k.max.x-k.min.x,ue=k.max.y-k.min.y,ve=k.isBox3?k.max.z-k.min.z:1,Ee=k.min.x,Ue=k.min.y,ze=k.isBox3?k.min.z:0;else{const ht=Math.pow(2,-G);ge=Math.floor(rt.width*ht),ue=Math.floor(rt.height*ht),v.isDataArrayTexture?ve=rt.depth:v.isData3DTexture?ve=Math.floor(rt.depth*ht):ve=1,Ee=0,Ue=0,ze=0}H!==null?(Se=H.x,Ze=H.y,dt=H.z):(Se=0,Ze=0,dt=0);const et=le.convert(L.format),Et=le.convert(L.type);let pe;L.isData3DTexture?(Y.setTexture3D(L,0),pe=U.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(Y.setTexture2DArray(L,0),pe=U.TEXTURE_2D_ARRAY):(Y.setTexture2D(L,0),pe=U.TEXTURE_2D),g.activeTexture(U.TEXTURE0),g.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,L.flipY),g.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),g.pixelStorei(U.UNPACK_ALIGNMENT,L.unpackAlignment);const wt=g.getParameter(U.UNPACK_ROW_LENGTH),Xe=g.getParameter(U.UNPACK_IMAGE_HEIGHT),Xt=g.getParameter(U.UNPACK_SKIP_PIXELS),an=g.getParameter(U.UNPACK_SKIP_ROWS),Cn=g.getParameter(U.UNPACK_SKIP_IMAGES);g.pixelStorei(U.UNPACK_ROW_LENGTH,rt.width),g.pixelStorei(U.UNPACK_IMAGE_HEIGHT,rt.height),g.pixelStorei(U.UNPACK_SKIP_PIXELS,Ee),g.pixelStorei(U.UNPACK_SKIP_ROWS,Ue),g.pixelStorei(U.UNPACK_SKIP_IMAGES,ze);const ei=v.isDataArrayTexture||v.isData3DTexture,je=L.isDataArrayTexture||L.isData3DTexture;if(v.isDepthTexture){const ht=V.get(v),Pn=V.get(L),st=V.get(ht.__renderTarget),Ln=V.get(Pn.__renderTarget);g.bindFramebuffer(U.READ_FRAMEBUFFER,st.__webglFramebuffer),g.bindFramebuffer(U.DRAW_FRAMEBUFFER,Ln.__webglFramebuffer);for(let ti=0;ti<ve;ti++)ei&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,V.get(v).__webglTexture,G,ze+ti),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,V.get(L).__webglTexture,de,dt+ti)),U.blitFramebuffer(Ee,Ue,ge,ue,Se,Ze,ge,ue,U.DEPTH_BUFFER_BIT,U.NEAREST);g.bindFramebuffer(U.READ_FRAMEBUFFER,null),g.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(G!==0||v.isRenderTargetTexture||V.has(v)){const ht=V.get(v),Pn=V.get(L);g.bindFramebuffer(U.READ_FRAMEBUFFER,C),g.bindFramebuffer(U.DRAW_FRAMEBUFFER,z);for(let st=0;st<ve;st++)ei?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ht.__webglTexture,G,ze+st):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ht.__webglTexture,G),je?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pn.__webglTexture,de,dt+st):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Pn.__webglTexture,de),G!==0?U.blitFramebuffer(Ee,Ue,ge,ue,Se,Ze,ge,ue,U.COLOR_BUFFER_BIT,U.NEAREST):je?U.copyTexSubImage3D(pe,de,Se,Ze,dt+st,Ee,Ue,ge,ue):U.copyTexSubImage2D(pe,de,Se,Ze,Ee,Ue,ge,ue);g.bindFramebuffer(U.READ_FRAMEBUFFER,null),g.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else je?v.isDataTexture||v.isData3DTexture?U.texSubImage3D(pe,de,Se,Ze,dt,ge,ue,ve,et,Et,rt.data):L.isCompressedArrayTexture?U.compressedTexSubImage3D(pe,de,Se,Ze,dt,ge,ue,ve,et,rt.data):U.texSubImage3D(pe,de,Se,Ze,dt,ge,ue,ve,et,Et,rt):v.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,de,Se,Ze,ge,ue,et,Et,rt.data):v.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,de,Se,Ze,rt.width,rt.height,et,rt.data):U.texSubImage2D(U.TEXTURE_2D,de,Se,Ze,ge,ue,et,Et,rt);g.pixelStorei(U.UNPACK_ROW_LENGTH,wt),g.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Xe),g.pixelStorei(U.UNPACK_SKIP_PIXELS,Xt),g.pixelStorei(U.UNPACK_SKIP_ROWS,an),g.pixelStorei(U.UNPACK_SKIP_IMAGES,Cn),de===0&&L.generateMipmaps&&U.generateMipmap(pe),g.unbindTexture()},this.initRenderTarget=function(v){V.get(v).__webglFramebuffer===void 0&&Y.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Y.setTextureCube(v,0):v.isData3DTexture?Y.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Y.setTexture2DArray(v,0):Y.setTexture2D(v,0),g.unbindTexture()},this.resetState=function(){q=0,W=0,te=null,g.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ge._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ge._getUnpackColorSpace()}}const cg=/^[og]\s*(.+)?/,hg=/^mtllib /,ug=/^usemtl /,dg=/^usemap /,fl=/\s+/,pl=new B,Ur=new B,ml=new B,gl=new B,Yt=new B,Es=new Ie;function fg(){const i={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}const n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(s,r){const a=this._finalize(!1);a&&(a.inherited||a.groupCount<=0)&&this.materials.splice(a.index,1);const o={index:this.materials.length,name:s||"",mtllib:Array.isArray(r)&&r.length>0?r[r.length-1]:"",smooth:a!==void 0?a.smooth:this.smooth,groupStart:a!==void 0?a.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(c){const l={index:typeof c=="number"?c:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return l.clone=this.clone.bind(l),l}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(s){const r=this.currentMaterial();if(r&&r.groupEnd===-1&&(r.groupEnd=this.geometry.vertices.length/3,r.groupCount=r.groupEnd-r.groupStart,r.inherited=!1),s&&this.materials.length>1)for(let a=this.materials.length-1;a>=0;a--)this.materials[a].groupCount<=0&&this.materials.splice(a,1);return s&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),r}},n&&n.name&&typeof n.clone=="function"){const s=n.clone(0);s.inherited=!0,this.object.materials.push(s)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseNormalIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseUVIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/2)*2},addVertex:function(e,t,n){const s=this.vertices,r=this.object.geometry.vertices;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2])},addVertexPoint:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){const s=this.normals,r=this.object.geometry.normals;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2])},addFaceNormal:function(e,t,n){const s=this.vertices,r=this.object.geometry.normals;pl.fromArray(s,e),Ur.fromArray(s,t),ml.fromArray(s,n),Yt.subVectors(ml,Ur),gl.subVectors(pl,Ur),Yt.cross(gl),Yt.normalize(),r.push(Yt.x,Yt.y,Yt.z),r.push(Yt.x,Yt.y,Yt.z),r.push(Yt.x,Yt.y,Yt.z)},addColor:function(e,t,n){const s=this.colors,r=this.object.geometry.colors;s[e]!==void 0&&r.push(s[e+0],s[e+1],s[e+2]),s[t]!==void 0&&r.push(s[t+0],s[t+1],s[t+2]),s[n]!==void 0&&r.push(s[n+0],s[n+1],s[n+2])},addUV:function(e,t,n){const s=this.uvs,r=this.object.geometry.uvs;r.push(s[e+0],s[e+1]),r.push(s[t+0],s[t+1]),r.push(s[n+0],s[n+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,n,s,r,a,o,c,l){const h=this.vertices.length;let d=this.parseVertexIndex(e,h),u=this.parseVertexIndex(t,h),p=this.parseVertexIndex(n,h);if(this.addVertex(d,u,p),this.addColor(d,u,p),o!==void 0&&o!==""){const _=this.normals.length;d=this.parseNormalIndex(o,_),u=this.parseNormalIndex(c,_),p=this.parseNormalIndex(l,_),this.addNormal(d,u,p)}else this.addFaceNormal(d,u,p);if(s!==void 0&&s!==""){const _=this.uvs.length;d=this.parseUVIndex(s,_),u=this.parseUVIndex(r,_),p=this.parseUVIndex(a,_),this.addUV(d,u,p),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const t=this.vertices.length;for(let n=0,s=e.length;n<s;n++){const r=this.parseVertexIndex(e[n],t);this.addVertexPoint(r),this.addColor(r)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";const n=this.vertices.length,s=this.uvs.length;for(let r=0,a=e.length;r<a;r++)this.addVertexLine(this.parseVertexIndex(e[r],n));for(let r=0,a=t.length;r<a;r++)this.addUVLine(this.parseUVIndex(t[r],s))}};return i.startObject("",!1),i}class pg extends Ha{constructor(e){super(e),this.materials=null}load(e,t,n,s){const r=this,a=new iu(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(r.parse(o))}catch(c){s?s(c):console.error(c),r.manager.itemError(e)}},n,s)}setMaterials(e){return this.materials=e,this}parse(e){const t=new fg;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));const n=e.split(`
`);let s=[];for(let o=0,c=n.length;o<c;o++){const l=n[o].trimStart();if(l.length===0)continue;const h=l.charAt(0);if(h!=="#")if(h==="v"){const d=l.split(fl);switch(d[0]){case"v":t.vertices.push(parseFloat(d[1]),parseFloat(d[2]),parseFloat(d[3])),d.length>=7?(Es.setRGB(parseFloat(d[4]),parseFloat(d[5]),parseFloat(d[6]),Gt),t.colors.push(Es.r,Es.g,Es.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(d[1]),parseFloat(d[2]),parseFloat(d[3]));break;case"vt":t.uvs.push(parseFloat(d[1]),parseFloat(d[2]));break}}else if(h==="f"){const u=l.slice(1).trim().split(fl),p=[];for(let S=0,m=u.length;S<m;S++){const f=u[S];if(f.length>0){const E=f.split("/");p.push(E)}}const _=p[0];for(let S=1,m=p.length-1;S<m;S++){const f=p[S],E=p[S+1];t.addFace(_[0],f[0],E[0],_[1],f[1],E[1],_[2],f[2],E[2])}}else if(h==="l"){const d=l.substring(1).trim().split(" ");let u=[];const p=[];if(l.indexOf("/")===-1)u=d;else for(let _=0,S=d.length;_<S;_++){const m=d[_].split("/");m[0]!==""&&u.push(m[0]),m[1]!==""&&p.push(m[1])}t.addLineGeometry(u,p)}else if(h==="p"){const u=l.slice(1).trim().split(" ");t.addPointGeometry(u)}else if((s=cg.exec(l))!==null){const d=(" "+s[0].slice(1).trim()).slice(1);t.startObject(d)}else if(ug.test(l))t.object.startMaterial(l.substring(7).trim(),t.materialLibraries);else if(hg.test(l))t.materialLibraries.push(l.substring(7).trim());else if(dg.test(l))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(h==="s"){if(s=l.split(" "),s.length>1){const u=s[1].trim().toLowerCase();t.object.smooth=u!=="0"&&u!=="off"}else t.object.smooth=!0;const d=t.object.currentMaterial();d&&(d.smooth=t.object.smooth)}else{if(l==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+l+'"')}}t.finalize();const r=new Qt;if(r.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let o=0,c=t.objects.length;o<c;o++){const l=t.objects[o],h=l.geometry,d=l.materials,u=h.type==="Line",p=h.type==="Points";let _=!1;if(h.vertices.length===0)continue;const S=new kt;S.setAttribute("position",new St(h.vertices,3)),h.normals.length>0&&S.setAttribute("normal",new St(h.normals,3)),h.colors.length>0&&(_=!0,S.setAttribute("color",new St(h.colors,3))),h.hasUVIndices===!0&&S.setAttribute("uv",new St(h.uvs,2));const m=[];for(let E=0,R=d.length;E<R;E++){const M=d[E],b=M.name+"_"+M.smooth+"_"+_;let y=t.materials[b];if(this.materials!==null){if(y=this.materials.create(M.name),u&&y&&!(y instanceof Ps)){const w=new Ps;mn.prototype.copy.call(w,y),w.color.copy(y.color),y=w}else if(p&&y&&!(y instanceof Oi)){const w=new Oi({size:10,sizeAttenuation:!1});mn.prototype.copy.call(w,y),w.color.copy(y.color),w.map=y.map,y=w}}y===void 0&&(u?y=new Ps:p?y=new Oi({size:1,sizeAttenuation:!1}):y=new Ql,y.name=M.name,y.flatShading=!M.smooth,y.vertexColors=_,t.materials[b]=y),m.push(y)}let f;if(m.length>1){for(let E=0,R=d.length;E<R;E++){const M=d[E];S.addGroup(M.groupStart,M.groupCount,E)}u?f=new Io(S,m):p?f=new Ar(S,m):f=new Wt(S,m)}else u?f=new Io(S,m[0]):p?f=new Ar(S,m[0]):f=new Wt(S,m[0]);f.name=l.name,r.add(f)}else if(t.vertices.length>0){const o=new Oi({size:1,sizeAttenuation:!1}),c=new kt;c.setAttribute("position",new St(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(c.setAttribute("color",new St(t.colors,3)),o.vertexColors=!0);const l=new Ar(c,o);r.add(l)}return r}}const mg=.95,gg=74,_g=26,Nr=.95,_l=1,xg=i=>{const e=[];return i.traverse(t=>{t.isMesh&&e.push(t.geometry)}),e};function xl(i){const e=xg(i),t=new bi;for(const s of e)s.computeBoundingBox(),t.union(s.boundingBox);const n=t.getCenter(new B);for(const s of e)s.translate(-n.x,-t.min.y,-n.z),s.computeVertexNormals();return{parts:e,size:t.getSize(new B)}}function vg(i){return new Jh({color:i,side:en,transparent:!0})}function cc(i){return new Ql({color:i,specular:5921370,shininess:60,side:en,transparent:!0})}function Sg(i){const e=new Ie(i),t={h:0,s:0,l:0};return e.getHSL(t),t.l<.06&&e.setHSL(t.h,t.s,.06),e}function Mg(i,e){const t=cc(Sg(i));return t.userData.time={value:0},t.userData.phase={value:Math.random()*6.28},t.onBeforeCompile=n=>{n.uniforms.uTime=t.userData.time,n.uniforms.uPhase=t.userData.phase,n.vertexShader=`uniform float uTime; uniform float uPhase;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       float leg = smoothstep(${(e*.3).toFixed(2)}, ${(e*.85).toFixed(2)}, abs(position.x));
       float side = position.x > 0.0 ? 0.0 : 3.14159;
       transformed.z += sin(uTime * 15.0 + uPhase + side + position.z * 0.7) * ${(e*.18).toFixed(2)} * leg;
       transformed.y += abs(sin(uTime * 15.0 + uPhase + side)) * ${(e*.06).toFixed(2)} * leg;
       transformed.y += abs(sin(uTime * 15.0 + uPhase)) * ${(e*.04).toFixed(2)} * (1.0 - leg);`)},t}class yg{constructor(){xe(this,"canvas",document.createElement("canvas"));xe(this,"renderer");xe(this,"scene",new Uh);xe(this,"camera",new Xs(0,zt,0,-Ut,1,12e3));xe(this,"models",{});xe(this,"live",new Map);this.renderer=new lg({canvas:this.canvas,alpha:!0,antialias:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0}),this.renderer.setClearColor(0,0),this.renderer.setPixelRatio(1),this.renderer.setSize(Math.round(zt*_l),Math.round(Ut*_l),!1),this.camera.position.set(0,0,6e3),this.scene.add(new su(16777215,10123866,1.9));const e=new ou(16777215,1.5);e.position.set(-.4,.8,1),this.scene.add(e)}async load(e){const t=new pg,[n,s]=await Promise.all(["ant","cube"].map(r=>t.loadAsync(`${e}assets/models/${r}.obj`)));this.models={ant:xl(n),cube:xl(s)}}cubeMesh(e,t){const n=this.models.cube,s=t/n.size.x,r=new Qt;for(const a of n.parts)r.add(new Wt(a,vg(e)));return r.scale.setScalar(s),r}make(e){const t=new Qt,n={root:t,kind:e.kind,color:e.color,mats:[]};if(e.kind==="ant"){const s=this.models.ant,r=gg/s.size.z,a=new Qt;a.rotation.x=mg;const o=new Qt,c=new Qt;c.scale.setScalar(r),s.parts.forEach((h,d)=>{const u=d===0?Mg(e.color,s.size.x/2):cc("#ffffff");n.mats.push(u),c.add(new Wt(h,u))}),o.add(c);const l=this.cubeMesh("#ffffff",_g);l.position.set(0,s.size.y*r*1.05,s.size.z*r*.42),l.visible=!1,o.add(l),a.add(o),t.add(a),n.yaw=o,n.carry=l}else{const s=new Qt;s.rotation.x=Nr,n.tilt=s,n.half=(e.size??50)/2;const r=this.cubeMesh(e.color,e.size??50);r.traverse(a=>{const o=a.material;o&&n.mats.push(o)}),s.add(r),t.add(s)}return this.scene.add(t),n}dispose(e){this.scene.remove(e.root);for(const t of e.mats)t.dispose()}render(e,t){const n=new Set;for(const s of e){let r=this.live.get(s.ref);r&&(r.kind!==s.kind||r.color!==s.color)&&(this.dispose(r),r=void 0),r||(r=this.make(s),this.live.set(s.ref,r)),n.add(s.ref);const a=s.scale??1,o=s.alpha??1;let c=0;const l=s.y;if(s.kind==="ant"&&(c=4e3,r.yaw.rotation.y=Math.PI/2-(s.ang??0)),s.kind==="cube"){r.root.rotation.z=s.ang??0;const h=s.centered?r.half:0;r.tilt.position.set(0,-h*Math.cos(Nr),-h*Math.sin(Nr))}r.root.position.set(s.x,-l,c+l*.2),r.root.scale.setScalar(a);for(const h of r.mats)h.opacity=o,h.userData.time&&(h.userData.time.value=t);if(r.carry&&(r.carry.visible=s.carry!=null,s.carry!=null)){const h=s.carry;r.carry.traverse(d=>{const u=d.material;u&&u.color.set(h)})}}for(const[s,r]of this.live)n.has(s)||(this.dispose(r),this.live.delete(s));this.renderer.render(this.scene,this.camera)}clear(){for(const e of this.live.values())this.dispose(e);this.live.clear()}}const Eg=["win_bg","amazing","rewards","btn_reward","btn_continue","icon_coin","icon_ads","glow_rays","glow","confetti_ribbon","confetti_star"],bg=["bg","frame","frame_stroke","conveyor","conveyor_hold","progress_bar","progress","nest_frame",...El.map(([i])=>i),"btn_settings","btn_speed_on","btn_speed_off","bst_btn","bst_btn_locked","icon_lock","bst_frame","badge_red","badge_plus","bst_claw","bst_shuffle","bst_flower","bst_cannon","ant_shadow","hand","logo"],Tg=["board","btn_blue","btn_gray","btn_close","btn_green","btn_red","music_on","music_off","sound_on","sound_off","vibe_on","vibe_off","icon_retry","icon_home"],Ag=["lose_board","btn_close","heart_break","btn_rv","icon_rv","btn_purchase","icon_coin","btn_try_again","heart","heart_blank","heart_timebox"],wg={pop:"pop.ogg",drop:"cube_break_1.ogg",pick:"SFX_INGAME_COIN_PICK.ogg",nest:"count_reach.ogg",lose:"sfx-Lose.wav",win:"QuestRewardGet.ogg",click:"ui_button_click.ogg",add:"SFX_INGAME_ADD.ogg",music:"music_gameplay.ogg"};class Rg extends bl{constructor(){super("Boot");xe(this,"label")}preload(){const{width:t,height:n}=this.scale,s=this.label=this.add.text(t/2,n/2,"Loading...",{fontFamily:"Arial",fontSize:"48px",color:"#7a4a24",align:"center",wordWrap:{width:t-120}}).setOrigin(.5);this.load.on("progress",r=>s.setText(`Loading... ${Math.round(r*100)}%`)),this.load.setPath("assets/");for(const r of bg)this.load.image(r,`img/${r}.png`);for(const r of Tg)this.load.image(`set_${r}`,`settings/${r}.png`);for(const[r,a]of Object.entries(wg))this.load.audio(r,`sfx/${a}`);for(const r of Eg)this.load.image(r,`win/${r}.png`);for(const r of Ag)this.load.image(`lose_${r}`,`lose/${r}.png`);this.load.spritesheet("confetti","win/confetti.png",{frameWidth:102,frameHeight:102})}async create(){try{const t=new yg,n=Promise.race([document.fonts.load('48px "Lilita One"').catch(()=>{}),new Promise(s=>setTimeout(s,2500))]);await Promise.all([t.load(""),n]),this.scene.start("Game",{three:t})}catch(t){console.error(t),this.label.setText(`Could not start the game:
${t instanceof Error?t.message:String(t)}`)}}}function Cg(i,e=300){for(let t=0;t<e&&i.state==="play";t+=.5){hc(i);for(let n=0;n<30;n++)i.update(1/60)}return i.state==="play"?"stuck":i.state}function hc(i){const e=Hi(i);e&&uc(i,e)}function Hi(i,e="play"){if(e==="play"&&i.boardFalling())return null;const t=Object.values(i.looseByColour()).reduce((l,h)=>l+h,0),n=i.slots.filter(Boolean).length+i.pipe.length+Math.round(t/64),s=new Set(i.cols.map(l=>l[0]).filter(Boolean).map(l=>l.color)),r=i.G,a=[],o=[],c=[];for(let l=0;l<r;l+=4)for(let h=r-1;h>=0;h--){const d=h*r+l;if(!i.key[d]||i.loose[d])continue;const u=[i.ox+(l+.5)*i.gs,i.oy+(h+.5)*i.gs];c.push(u),(s.has(i.keys[i.key[d]])?a:o).push(u);break}if(e==="jam"){const l=o.length?o:c,h=Math.max(0,(l.length>>1)-5);return l.length?l.slice(h,h+10):null}return a.length&&n<_i-2?a.slice(0,n<10?4:1):!a.length&&c.length&&n<_i-4?[c[c.length>>1]]:null}function Pg(i,e,t,n){for(;t<e.length&&e[t][0]<=n;)uc(i,e[t++][1]);return t}function uc(i,e){i.endSwipe();for(const[t,n]of e)i.swipeTo(t,n);i.endSwipe()}const Lg=["down","diagL","up","sweepR","diagR","sweepL","zigzag"],Dg={drops30:{title:"Drops, 30 s",level:0,length:30,strokes:["down","diagL","down","zigzag","down","diagR"],steps:[{speed:!0},{wait:.3},{swipe:"varied"},{wait:.3},{swipe:"varied"},{auto:3},{cut:3,ff:15},{auto:5},{cut:6,ff:20},{auto:5},{cut:8,ff:10},{auto:12}]},sweeps30:{title:"Sweeps, 30 s",level:1,length:30,strokes:["sweepR","up","sweepL","down","sweepR","sweepL"],steps:[{speed:!0},{wait:.3},{swipe:"varied"},{wait:.3},{swipe:"varied"},{auto:3},{cut:4,ff:10},{auto:5},{cut:7,ff:12},{auto:5},{cut:9,ff:8},{auto:12}]},zigzag30:{title:"Zigzags, 30 s",level:2,length:30,strokes:["zigzag","up","zigzag","diagR","zigzag","down"],steps:[{speed:!0},{wait:.3},{swipe:"varied"},{wait:.3},{swipe:"varied"},{auto:3},{cut:5,ff:20},{auto:5},{cut:8,ff:10},{auto:5},{cut:0},{auto:12}]},diagonals30:{title:"Diagonals, 30 s",level:3,length:30,strokes:["diagL","diagR","sweepR","diagR","diagL","up"],steps:[{speed:!0},{wait:.3},{swipe:"varied"},{wait:.3},{swipe:"varied"},{auto:3},{cut:9,ff:8},{auto:5},{cut:1,ff:3},{auto:5},{cut:6,ff:20},{auto:12}]},rises30:{title:"Rises, 30 s",level:4,length:30,strokes:["up","sweepL","up","down","up","zigzag"],steps:[{speed:!0},{wait:.3},{swipe:"varied"},{wait:.3},{swipe:"varied"},{auto:3},{cut:7,ff:12},{auto:5},{cut:2,ff:12},{auto:5},{cut:5,ff:20},{auto:12}]},mix60:{title:"Mix, 60 s",level:0,length:60,steps:[{speed:!0},{wait:.3},{swipe:"varied"},{wait:.3},{swipe:"varied"},{auto:3},{cut:2,ff:12},{auto:5.5},{cut:4,ff:10},{auto:5.5},{cut:6,ff:20},{auto:5.5},{cut:8,ff:10},{auto:5.5},{cut:1,ff:3},{auto:5.5},{cut:3,ff:15},{auto:5.5},{cut:5,ff:20},{auto:12}]},tour60:{title:"Tour, 60 s",level:9,length:60,strokes:["zigzag","sweepL","diagR","up","down","sweepR","diagL"],steps:[{speed:!0},{wait:.3},{swipe:"varied"},{auto:3},{cut:8,ff:10},{auto:4},{cut:7,ff:12},{auto:4},{cut:6,ff:20},{auto:4},{cut:5,ff:20},{auto:4},{cut:4,ff:10},{auto:4},{cut:3,ff:15},{auto:4},{cut:2,ff:12},{auto:4},{cut:1,ff:3},{auto:4},{cut:0},{auto:10}]}},vl={x:150,y:12},bs=.85,Ig=1200,Ug=550,Ng=3;class Fg{constructor(e,t){xe(this,"hand");xe(this,"ring");xe(this,"step",0);xe(this,"kind",0);xe(this,"act",null);xe(this,"t0",-1);xe(this,"card",!1);this.host=e,this.demo=t;const n=e.scene;this.hand=n.add.image(1180,1500,"hand").setOrigin(vl.x/178,vl.y/217).setScale(bs).setDepth(40),this.ring=n.add.circle(0,0,40,16777215,0).setStrokeStyle(8,16777215,.9).setDepth(39).setVisible(!1)}update(e,t,n){if(!this.card){if(this.t0<0&&(this.t0=n),n-this.t0>=this.demo.length-Ng){this.endCard();return}if(!t){for(;!this.act;)this.act=this.begin(this.demo.steps[this.step++]??{auto:1});this.act(e)&&(this.act=null)}}}endCard(){const e=this.host.scene,t=1080,n=1920;this.card=!0,this.hand.setVisible(!1),this.ring.setVisible(!1),e.game.renderer.snapshot(s=>{e.textures.exists("demo_end")&&e.textures.remove("demo_end"),e.textures.addImage("demo_end",s);const a=e.add.image(0,0,"demo_end").setOrigin(0).setDisplaySize(t,n).setScrollFactor(0).setDepth(50).enableFilters().filters.internal.addBlur(1,2,2,0),o=e.add.rectangle(0,0,t,n,0,0).setOrigin(0).setScrollFactor(0).setDepth(51);e.tweens.add({targets:a,strength:2.5,duration:400}),e.tweens.add({targets:o,fillAlpha:.55,duration:400});const c=e.add.image(t/2,760,"logo").setScrollFactor(0).setDepth(52).setScale(0);e.tweens.add({targets:c,scale:.94,duration:500,delay:150,ease:"Back.easeOut"});const l=e.add.container(t/2,1320).setScrollFactor(0).setDepth(52).setScale(0);l.add([e.add.image(0,0,"btn_continue"),this.host.label(0,-8,"PLAY NOW",76,"#ffffff","#1f7a12",10)]),e.tweens.add({targets:l,scale:1.35,duration:350,delay:450,ease:"Back.easeOut",onComplete:()=>e.tweens.add({targets:l,scale:1.12,duration:420,yoyo:!0,repeat:-1,ease:"Sine.easeInOut"})})})}begin(e){const t=this.host.sim();if("wait"in e){let r=e.wait;return a=>(r-=a)<=0}if("speed"in e)return this.host.setSpeed(e.speed),null;if("hide"in e)return this.moveTo(1180,this.hand.y);if("cut"in e)return this.cut(e);if("tap"in e)return this.tap(e.tap);if("swipe"in e){const r=e.swipe==="varied"?this.varied(t,!0):e.swipe==="auto"||e.swipe==="jam"?Hi(t,e.swipe==="jam"?"jam":"play"):e.swipe;return r?this.stroke(r):null}if("until"in e){let r=e.max;return a=>{const o=this.host.sim(),c=o.slots.filter(Boolean).length;return(e.until==="belt"?c>=(e.belt??16):e.until==="calm"?!this.host.busy():e.until==="end"?this.host.overlay()==="end":o.state===e.until&&this.host.overlay()==="end")||(r-=a)<=0}}let n=e.auto,s=null;return r=>{n-=r;const a=this.host.sim();if(s&&!s(r))return!1;if(s=null,n<=0||a.state!=="play"||this.host.overlay()||!e.finish&&e.mode!=="jam"&&a.left<a.total*.3||e.mode==="jam"&&a.slots.filter(Boolean).length>=(e.belt??20))return!0;if(this.host.busy())return!1;const o=e.mode??"varied",c=o==="varied"?this.varied(a):Hi(a,o);return c&&(s=this.stroke(c)),!1}}cut(e){const t=this.host.scene,n=t.cameras.main,s=1080,r=1920,a=.5;let o=null,c=!0,l=0;return t.game.renderer.snapshot(h=>{t.textures.exists("demo_cut")&&t.textures.remove("demo_cut"),t.textures.addImage("demo_cut",h),o=t.add.image(0,0,"demo_cut").setOrigin(0).setDisplaySize(s,r).setScrollFactor(0).setDepth(45),this.host.goLevel(e.cut),e.ff&&this.host.fastForward(e.ff,e.ffMode??"play",e.ffBelt),this.hand.setPosition(1180,1300),n.scrollX=-s,c=!1}),h=>{if(c)return!1;l=Math.min(1,l+h/a);const d=l<.5?4*l*l*l:1-(-2*l+2)**3/2;return n.scrollX=-s*(1-d),o.x=-s*d,l<1?!1:(o.destroy(),n.scrollX=0,!0)}}varied(e,t=!1){const n=Object.values(e.looseByColour()).reduce((P,F)=>P+F,0),s=e.slots.filter(Boolean).length+e.pipe.length+n/64;if(!t&&s>8)return null;const r=e.G,a=new Set(e.cols.map(P=>P[0]).filter(Boolean).map(P=>P.color));let o=r,c=-1,l=r,h=-1;const d=new Array(r).fill(-1);for(let P=0;P<r*r;P++)if(e.key[P]&&!e.loose[P]){const F=P%r,C=P/r|0;F<o&&(o=F),F>c&&(c=F),C<l&&(l=C),C>h&&(h=C),d[F]=C}if(c<0)return null;const u=P=>e.ox+(P+.5)*e.gs,p=P=>e.oy+(P+.5)*e.gs,_=u(o),S=u(c),m=p(l),f=S-_,E=p(h)-m,R=Math.random,M=P=>{const F=Math.round((P-e.ox)/e.gs-.5);let C=-1;for(let z=F-2;z<=F+2;z++)z>=0&&z<r&&(C=Math.max(C,d[z]));return p(C<0?h:C)+e.gs*2},b=(P,F)=>{const C=Math.max(2,Math.ceil(Math.abs(F-P)/40)),z=[];for(let q=0;q<=C;q++){const W=P+(F-P)*q/C;z.push([W,M(W)-e.gs*4])}return z},y={down:()=>{const P=_+f*(.25+.5*R()),F=m+E*(.1+.35*R()),C=P+30*(R()-.5);return[[P,F],[C,M(C)]]},diagL:()=>{const P=_+f*(.05+.3*R()),F=m+E*(.1+.3*R()),C=P+f*(.25+.2*R());return[[P,F],[C,M(C)]]},up:()=>{const P=_+f*(.1+.8*R()),F=M(P);return[[P,F],[P+30*(R()-.5),F-E*(.45+.3*R())]]},sweepR:()=>{const P=_+f*.3*R();return b(P,P+f*(.45+.25*R()))},diagR:()=>{const P=S-f*(.05+.3*R()),F=m+E*(.1+.3*R()),C=P-f*(.25+.2*R());return[[P,F],[C,M(C)]]},sweepL:()=>{const P=S-f*.3*R();return b(P,P-f*(.45+.25*R()))},zigzag:()=>{const P=_+f*(.25+.5*R()),F=m+E*(.1+.2*R()),C=70,z=[],q=M(P);for(let W=0,te=5;W<=te;W++){const X=P+(W%2?C:-C)/2;z.push([X,W===te?M(X):F+(q-F)*W/te])}return z}},w=this.demo.strokes??Lg,x=y[w[this.kind++%w.length]],A=P=>{let F=0;for(let C=0;C+1<P.length;C++){const[z,q]=P[C],[W,te]=P[C+1],X=Math.ceil(Math.hypot(W-z,te-q)/10);for(let Q=0;Q<=X;Q++){const ee=Math.floor((z+(W-z)*Q/X-e.ox)/e.gs),be=Math.floor((q+(te-q)*Q/X-e.oy)/e.gs);if(ee<0||be<0||ee>=r||be>=r)continue;const Me=be*r+ee;e.key[Me]&&!e.loose[Me]&&(F+=a.has(e.keys[e.key[Me]])?1:-.6)}}return F};let D=null,N=0;for(let P=0;P<12;P++){const F=x(),C=A(F);C>N&&(N=C,D=F)}return D??Hi(e,"play")}moveTo(e,t){const n=this.hand.x,s=this.hand.y,r=Math.hypot(e-n,t-s),a=Math.max(.15,r/Ig);let o=0;return c=>{o=Math.min(1,o+c/a);const l=o*o*(3-2*o);return this.hand.setPosition(n+(e-n)*l,s+(t-s)*l),o>=1}}stroke(e){const t=e.length>1?e:[[e[0][0]-50,e[0][1]+10],[e[0][0]+50,e[0][1]-10]],n=()=>this.host.sim();let s=0,r=this.moveTo(t[0][0],t[0][1]),a=0,o=0;return c=>{if(s===0){if(!r(c))return!1;s=1,o=0}if(s===1){if(o+=c,this.hand.setScale(bs*(1-.12*Math.min(1,o/.08))),o<.08)return!1;n().endSwipe(),n().swipeTo(t[0][0],t[0][1]),s=2}if(s===2){let l=Ug*c;for(;l>0&&a<t.length-1;){const[h,d]=t[a+1],u=h-this.hand.x,p=d-this.hand.y,_=Math.hypot(u,p);_<=l?(this.hand.setPosition(h,d),l-=_,a++):(this.hand.setPosition(this.hand.x+u/_*l,this.hand.y+p/_*l),l=0),n().state==="play"&&n().swipeTo(this.hand.x,this.hand.y)}if(a<t.length-1)return!1;n().endSwipe(),s=3,o=0}return o+=c,this.hand.setScale(bs*(.88+.12*Math.min(1,o/.1))),o>=.18}}tap(e){let t=0,n=null,s=0;return r=>{const a=this.host.target(e);if(!a)return(s+=r)>3;if(t===0){if(n??(n=this.moveTo(a.x,a.y)),!n(r))return!1;t=1,s=0}return s+=r,this.hand.setScale(bs*(1-.15*Math.sin(Math.PI*Math.min(1,s/.25)))),t===1&&s>=.12&&(t=2,this.ring.setPosition(a.x,a.y).setVisible(!0).setScale(.4).setAlpha(1),this.host.scene.tweens.add({targets:this.ring,scale:1.4,alpha:0,duration:380,onComplete:()=>this.ring.setVisible(!1)}),a.tap()),s>=.4}}}const Og='"Lilita One", "Arial Rounded MT Bold", sans-serif',Sl="cf_prefs",Ml={nest:25,win:[60,40,60],lose:200},yl=[1,1,1],Fr=[3,6,9],Ni={a:.45,light:224,text:176},Fe={bg:0,board:3,sand:4,belt:5,shadows:6,three:7,labels:8,fx:9,tray:10,hud:11,overlay:20},Ht={x:540,y:900,size:300,drop:.45,suck:.5},Or={focus:.5,move:.5},Br=30,Hs={x:66,y:285},Bt={x:Ht.x+(Hs.x-373/2)/381*Ht.size,y:Ht.y+(Hs.y-381/2)/381*Ht.size};class Bg extends bl{constructor(){super("Game");xe(this,"three");xe(this,"sim");xe(this,"levelIndex",0);xe(this,"levelKey","cf_level");xe(this,"demo");xe(this,"capture",!1);xe(this,"taps",new Map);xe(this,"started",!1);xe(this,"paused",!1);xe(this,"speedUp",!1);xe(this,"autoFast",!1);xe(this,"speedBefore",!1);xe(this,"autoplay",!1);xe(this,"botT",0);xe(this,"moves",null);xe(this,"moveAt",0);xe(this,"replayAcc",0);xe(this,"replayFrame",0);xe(this,"swiping",!1);xe(this,"music");xe(this,"lastSfx",{});xe(this,"prefs",(()=>{try{return{music:!0,sound:!0,vibe:!0,...JSON.parse(localStorage.getItem(Sl)||"{}")}}catch{return{music:!0,sound:!0,vibe:!0}}})());xe(this,"sandTex");xe(this,"sandCanvas");xe(this,"sandImg");xe(this,"sandImage");xe(this,"threeTex");xe(this,"threeCtx");xe(this,"holds",[]);xe(this,"antShadows",[]);xe(this,"shadowGfx");xe(this,"fxGfx");xe(this,"fullText");xe(this,"fullBar");xe(this,"nestBoxes",[]);xe(this,"nestFrames",[]);xe(this,"levelText");xe(this,"speedBtn");xe(this,"speedParts",[]);xe(this,"boosters",[]);xe(this,"lockHint");xe(this,"picking",!1);xe(this,"pickHint");xe(this,"fanFx",null);xe(this,"shuffleFx",null);xe(this,"labels",[]);xe(this,"overlay",null);xe(this,"overlayBox")}init(t){this.three=t.three}create(){var l,h,d;const t=new URLSearchParams(location.search),n=t.get("custom");n?(Zs(Mc(n==="preview"?yc:Ec)),this.levelKey=n==="preview"?"":"cf_level_custom"):Zs(no());let s=0;try{this.levelKey&&(s=Math.min(Hn()-1,parseInt(localStorage.getItem(this.levelKey)||"0",10)||0))}catch{}const r=t.get("level");r&&(s=Math.max(0,Math.min(Hn()-1,parseInt(r,10)-1))),this.add.image(0,0,"bg").setOrigin(0).setDisplaySize(zt,Ut).setDepth(Fe.bg),this.drawBoard(),this.sandImage=this.add.image(0,0,"__WHITE").setOrigin(0).setDepth(Fe.sand),this.drawBeltBase();for(let u=0;u<_i;u++)this.holds.push(this.add.image(0,0,"conveyor_hold").setDisplaySize(22,22).setDepth(Fe.belt));this.fullText=this.text(540,Lt.cy+1,"0%",24,"#14203a",null).setDepth(Fe.belt+.5),this.shadowGfx=this.add.graphics().setDepth(Fe.shadows);const a=document.createElement("canvas");a.width=this.three.canvas.width,a.height=this.three.canvas.height,this.threeCtx=a.getContext("2d"),this.threeTex=this.textures.addCanvas("three",a),this.add.image(0,0,"three").setOrigin(0).setDisplaySize(zt,Ut).setDepth(Fe.three),this.fxGfx=this.add.graphics().setDepth(Fe.fx),this.buildTray(),this.buildHud(),this.input.on("pointerdown",(u,p)=>this.onDown(u,p)),this.input.on("pointermove",u=>{this.swiping&&this.sim.state==="play"&&!this.overlay&&this.sim.swipeTo(u.x,u.y)});const o=()=>{var u;this.swiping=!1,(u=this.sim)==null||u.endSwipe()};this.input.on("pointerup",o),this.input.on("pointerupoutside",o),(l=this.input.keyboard)==null||l.on("keydown-N",()=>this.startLevel((this.levelIndex+1)%Hn())),(h=this.input.keyboard)==null||h.on("keydown-P",()=>this.startLevel((this.levelIndex+Hn()-1)%Hn())),(d=this.input.keyboard)==null||d.on("keydown-R",()=>this.startLevel(this.levelIndex));const c=Dg[t.get("demo")??""];c&&(s=c.level,this.levelKey=""),this.startLevel(s),this.showStart(),c&&(this.demo=new Fg({scene:this,sim:()=>this.sim,overlay:()=>this.overlay,setSpeed:u=>this.setSpeed(u),goLevel:u=>{this.startLevel(u),this.started=!0},fastForward:(u,p,_)=>{const S=()=>this.sim.slots.filter(Boolean).length+this.sim.pipe.length+Object.values(this.sim.looseByColour()).reduce((m,f)=>m+f,0)/64;for(let m=0;m<u&&this.sim.state==="play"&&!(_&&S()>=_);m+=.5){const f=Hi(this.sim,p);if(f){this.sim.endSwipe();for(const[E,R]of f)this.sim.swipeTo(E,R);this.sim.endSwipe()}for(let E=0;E<30;E++)this.sim.update(1/60)}},target:u=>this.demoTarget(u),label:(u,p,_,S,m,f,E)=>this.text(u,p,_,S,m,f,E),busy:()=>!!this.fanFx||!!this.shuffleFx||this.picking},c)),c&&t.has("capture")&&this.startCapture(c.length),this.exposeTestHook()}startLevel(t){new URLSearchParams(location.search).get("custom")||Zs(no()),this.levelIndex=t;try{this.levelKey&&localStorage.setItem(this.levelKey,String(t))}catch{}this.three.clear(),this.sim?this.sim.start(t):this.sim=new bc(t,(r,a)=>this.sfx(r,a)),this.levelText.setText("Level "+(t+1));const{G:n,GH:s}=this.sim;this.textures.exists("sand")&&this.textures.remove("sand"),this.sandCanvas=document.createElement("canvas"),this.sandCanvas.width=n,this.sandCanvas.height=s,this.sandImg=this.sandCanvas.getContext("2d").createImageData(n,s),this.sandTex=this.textures.addCanvas("sand",this.sandCanvas),this.sandTex.setFilter(Dc.FilterMode.NEAREST),this.sandImage.setTexture("sand").setPosition(this.sim.ox,this.sim.oy).setDisplaySize(n*this.sim.gs,s*this.sim.gs),this.closeOverlay(),this.setPicking(!1),this.endFan(),this.endShuffle(),this.setAutoFast(!1),this.boosters.forEach((r,a)=>{this.setLocked(a,this.levelIndex+1<Fr[a]),this.setUses(a,yl[a])})}update(t,n){var a;const s=Math.min(.05,n/1e3),r=this.started&&!this.paused&&this.overlay!=="settings";if(r&&this.fanFx&&this.stepFan(s),r&&((a=this.fanFx)!=null&&a.blown)&&!this.fanFx.leaving&&this.sim.stepFlyersOnly(this.speedUp?s*2:s),r&&this.shuffleFx&&this.stepShuffle(s),r&&!this.picking&&!this.shuffleFx&&!(this.fanFx&&!this.fanFx.leaving)){const o=this.speedUp?s*2:s;if(this.autoplay&&this.moves){this.replayAcc+=o;for(let c=0;this.replayAcc>=1/60&&c<8;c++)this.replayAcc-=1/60,this.sim.state==="play"&&this.replayFrame%30===0&&(this.moveAt=Pg(this.sim,this.moves,this.moveAt,this.replayFrame/60)),this.sim.update(1/60),this.replayFrame++}else this.autoplay&&this.sim.state==="play"&&(this.botT-=o)<=0&&(this.botT=.5,hc(this.sim)),this.sim.update(o)}this.demo&&this.started&&this.demo.update(s,this.paused,(this.capture?this.time.now:performance.now())/1e3),this.sim.left===0&&this.sim.state==="play"&&this.setAutoFast(!0),this.sim.state!=="play"&&this.overlay!=="end"&&this.sim.endT>=(this.sim.state==="win"?.9:0)&&this.showEnd(),this.boosters.forEach((o,c)=>{o.bump=Math.max(0,o.bump-s*5);const l=1+o.bump*.12+(this.picking&&c===0?.06+.04*Math.sin(this.time.now/120):0);for(const h of[o.base,o.img,o.frame,o.lockBase,o.lock,o.lockText])h.setScale((h.getData("sx")??h.getData("s"))*l,(h.getData("sy")??h.getData("s"))*l)}),this.render()}render(){var o,c,l;const t=this.sim;t.picDirty&&this.redrawSand(),this.drawBelt();const n=[],s=this.shadowGfx;s.clear(),s.fillStyle(2372702,.25);for(let h=0;h<_i;h++){const d=t.slots[h];if(!d)continue;let[u,p]=t.slotPos(h);if(d.drop<1){const S=d.drop;u=ni.x+(u-ni.x)*S,p=ni.y+10+(p-ni.y-10)*S}const _=this.fanLift(h,u,p);_.e>=1||(s.fillStyle(2372702,.25*(1-_.e)),s.fillEllipse(u,p+Gn*.55,Gn*1.05*(1-_.e*.5),Gn*.32*(1-_.e*.5)),_.e>0?n.push({ref:d,kind:"cube",x:_.x,y:_.y,color:t.colors[d.k],size:Gn,ang:_.ang,scale:_.scale,centered:!0}):n.push({ref:d,kind:"cube",x:u,y:p+Gn*.36,color:t.colors[d.k],size:Gn}))}t.pipe.length&&n.push({ref:t.pipe,kind:"cube",x:ni.x,y:ni.y+16,color:t.colors[t.pipe[0]],size:25});for(const h of t.flyers){const d=(o=this.fanFx)==null?void 0:o.shots.get(h);let u=Math.min(1,h.t);if(d!==void 0){const R=this.shotAge(h,d);if(R<0)continue;u=Math.min(1,R/Lc)}const p=u*(2-u),_=h.nest.dx??h.sx,S=(h.nest.dy??h.sy)-Ai*.2,m=h.sx+(_-h.sx)*p,f=h.sy+(S-h.sy)*p-Math.sin(Math.PI*u)*140,E=1.5*Math.min(1,.25+u*3)*(1-.3*u*u);n.push({ref:h,kind:"cube",x:m,y:f,color:t.colors[h.k],size:Gn,scale:E,ang:(1-u)*6,centered:!0})}let r=0;const a=Ai*.92/302;for(let h=5;h>=0;h--)for(let d=0;d<t.cols.length;d++){const u=t.cols[d][h];if(!u||u.dy===null||u.dx===null)continue;const p=u.dy;if(p-Ai/2>Ut)continue;let _=1+u.bump*.07,S=1;u.pop>0&&(_=1+u.pop*.3,S=1-u.pop);const m=t.isActive(u,h);this.picking&&this.canWake(d,h)&&(_*=1.04+.04*Math.sin(this.time.now/110));const f=t.colors[u.color],E=a*_,R=E*(m?1:.8),M=Fe.three-.3+h*.01;((c=this.nestBoxes)[r]??(c[r]=this.add.image(0,0,"nest_frame").setOrigin(151/302,136/387))).setTexture(this.nestTexture(m?f:"#"+Js(f,Ni.a,Ni.light).toString(16).padStart(6,"0"))).setPosition(u.dx,p).setScale(E,R).setAlpha(S).setDepth(M).setVisible(!0),((l=this.nestFrames)[r]??(l[r]=this.add.image(0,0,"nest_frame").setOrigin(167.5/335,202/404))).setPosition(u.dx,p+48*R).setScale(E,R).setAlpha(S).setDepth(M+.005).setVisible(m);const w=this.label(r++);w.setText(String(u.need-u.got)).setPosition(u.dx,p+2).setVisible(!0),w.setFontSize(Math.round((m?50:46)*_));const x=A=>"#"+A.toString(16).padStart(6,"0");m?w.setColor("#ffffff").setStroke("#000000",9*_):w.setColor(x(Js("#ffffff",Ni.a,Ni.text))).setStroke(x(Js("#000000",.6,Ni.text)),8*_),w.setAlpha(S)}for(let h=r;h<this.nestBoxes.length;h++)this.nestBoxes[h].setVisible(!1),this.nestFrames[h].setVisible(!1);for(;r<this.labels.length;r++)this.labels[r].setVisible(!1);t.ants.forEach((h,d)=>{var p;((p=this.antShadows)[d]??(p[d]=this.add.image(0,0,"ant_shadow").setDepth(Fe.three-.05).setAlpha(.85))).setPosition(h.x+5,h.y+18).setDisplaySize(100,40).setRotation(h.ang).setVisible(!0)});for(let h=t.ants.length;h<this.antShadows.length;h++)this.antShadows[h].setVisible(!1);for(const h of t.ants)n.push({ref:h,kind:"ant",x:h.x,y:h.y+10,ang:h.ang,color:t.colors[h.nest.color],carry:h.carry?parseInt(t.colors[h.carry].slice(1),16):null});this.three.render(n,t.time),this.threeCtx.clearRect(0,0,this.threeCtx.canvas.width,this.threeCtx.canvas.height),this.threeCtx.drawImage(this.three.canvas,0,0),this.threeTex.refresh(),this.drawWind(),this.fxGfx.clear();for(const h of t.fx)this.fxGfx.fillStyle(h.color,Math.max(0,1-h.t/h.life)),this.fxGfx.fillRect(h.x-h.s/2,h.y-h.s/2,h.s,h.s)}redrawSand(){const t=this.sim,n=new Uint32Array(this.sandImg.data.buffer),{key:s,rgb:r,loose:a}=t,o=(c,l)=>{const h=c&255,d=c>>8&255,u=c>>16&255;return(255<<24|u+(255-u)*l<<16|d+(255-d)*l<<8|h+(255-h)*l)>>>0};for(let c=0;c<s.length;c++)n[c]=s[c]?a[c]?o(r[c],.22):r[c]:0;this.sandCanvas.getContext("2d").putImageData(this.sandImg,0,0),this.sandTex.refresh(),t.picDirty=!1}drawBoard(){const t=Tc,n=Vn.w/t.w,s=Vn.h/t.h,r=Vn.x-t.x*n,a=Vn.y-t.y*s;this.add.image(r,a,"frame").setOrigin(0).setDisplaySize(t.imgW*n,t.imgH*s).setDepth(Fe.board),this.add.image(r,a,"frame_stroke").setOrigin(0).setDisplaySize(t.imgW*n,t.imgH*s).setDepth(Fe.sand+.5)}drawBeltBase(){const t=Lt.r+Lt.band/2,n=2*t/332,s=(Lt.cxR-Lt.cxL+2*t)/n+71+70;this.add.nineslice(540,Lt.cy,"conveyor",void 0,s,void 0,250,250,0,0).setScale(n).setDepth(Fe.belt-.5);const r=Lt.cxR-Lt.cxL+12,a=r/1400;this.add.image(540,Lt.cy,"progress_bar").setScale(a).setDepth(Fe.belt+.1),this.fullBar=this.add.nineslice(540-r/2+22*a,Lt.cy+(40-47.5)*a,"progress",void 0,52,void 0,26,26,0,0).setOrigin(0,.5).setScale(a).setDepth(Fe.belt+.2).setData("max",1356)}drawBelt(){const t=this.sim;this.holds.forEach((r,a)=>{const[o,c]=t.slotPos(a);r.setPosition(o,c+4)});const n=t.slots.filter(Boolean).length,s=Math.round(100*n/_i);this.fullBar.setVisible(s>0).width=Math.max(52,this.fullBar.getData("max")*s/100),this.fullText.setText(s+"%")}text(t,n,s,r,a="#ffffff",o="#3a3550",c=8){const l=this.add.text(t,n,s,{fontFamily:Og,fontSize:`${r}px`,color:a,align:"center"}).setOrigin(.5);return o&&l.setStroke(o,c),l}nestTexture(t){const n=`nest_box:${t}`;if(this.textures.exists(n))return n;const s=parseInt(t.slice(1),16),r=[s>>16&255,s>>8&255,s&255],a=M=>M.reduce((b,y,w)=>b+(y-r[w])**2,0),[o,c]=El.reduce((M,b)=>a(b[1])<a(M[1])?b:M),l=this.textures.get(o).getSourceImage(),h=this.textures.createCanvas(n,l.width,l.height),d=h.getContext();d.drawImage(l,0,0);const u=d.getImageData(0,0,l.width,l.height),p=u.data,_=(M,b,y)=>{const w=Math.max(M,b,y),x=Math.min(M,b,y),A=w-x;return[(A===0?0:w===M?((b-y)/A+6)%6:w===b?(y-M)/A+2:(M-b)/A+4)*60,w?A/w:0,w/255]},[S,m,f]=_(r[0],r[1],r[2]),[,E,R]=_(...c);for(let M=0;M<p.length;M+=4){if(!p[M+3])continue;const[,b,y]=_(p[M],p[M+1],p[M+2]),w=Math.min(1,b*m/E),x=Math.min(1,y*f/R),A=x*w,D=A*(1-Math.abs(S/60%2-1)),N=x-A,P=Math.floor(S/60)%6,[F,C,z]=[[A,D,0],[D,A,0],[0,A,D],[0,D,A],[D,0,A],[A,0,D]][P];p[M]=(F+N)*255,p[M+1]=(C+N)*255,p[M+2]=(z+N)*255}return d.putImageData(u,0,0),h.refresh(),n}label(t){return this.labels[t]||(this.labels[t]=this.text(0,0,"",50,"#ffffff","#2e2433",9).setDepth(Fe.labels)),this.labels[t]}buildTray(){Ac.forEach((t,n)=>{const{x:s,y:r}=io[n],a=ro/394,o=ro/150,c=R=>r+(R-221)*a,l=this.add.image(s,r,"bst_btn").setScale(a).setData("s",a).setDepth(Fe.tray+.1),h=this.add.image(s,c(178.5),"bst_frame").setDepth(Fe.tray+.15).setDisplaySize(394*a,357*a).setVisible(!1);h.setData("sx",h.scaleX).setData("sy",h.scaleY);const d=this.add.image(s,c(194.5),t).setDepth(Fe.tray+.2);d.setData("s",100*o/Math.max(d.width,d.height)).setScale(d.getData("s"));const u=this.add.container(s+58*o,r+58*o).setDepth(Fe.tray+.3),p=this.text(0,1,"1",Math.round(36*o),"#ffffff","#7a1020",6);u.add([this.add.image(0,0,"badge_red").setDisplaySize(58*o,58*o),p]);const _=this.add.image(s+58*o,r+58*o,"badge_plus").setDisplaySize(58*o,58*o).setDepth(Fe.tray+.3).setVisible(!1),S=this.add.image(s,c(205),"bst_btn_locked").setDepth(Fe.tray+.1).setDisplaySize(394*a,410*a).setVisible(!1);S.setData("sx",S.scaleX).setData("sy",S.scaleY);const m=this.add.image(s,r-24*o,"icon_lock").setDepth(Fe.tray+.2).setVisible(!1);m.setData("s",66*o/m.height).setScale(m.getData("s"));const f=this.text(s,r+34*o,`Level ${Fr[n]}`,Math.round(30*o),"#ffffff","#3a3a3a",6).setDepth(Fe.tray+.2).setData("s",1).setVisible(!1),E={img:d,base:l,frame:h,badge:u,plus:_,count:p,bump:0,uses:yl[n],lockBase:S,lock:m,lockText:f,locked:!1};for(const R of[l,S])R.setInteractive({useHandCursor:!0}).on("pointerdown",()=>this.useBooster(n));this.boosters.push(E)}),this.pickHint=this.text(540,Vn.y+40,"Tap a waiting nest to wake it up",40,"#ffffff","#3a3550",8).setDepth(Fe.hud).setVisible(!1),this.lockHint=this.text(540,Vn.y+40,"",40,"#ffffff","#3a3550",8).setDepth(Fe.hud).setAlpha(0)}setLocked(t,n){const s=this.boosters[t];s.locked=n,s.lockBase.setVisible(n),s.lock.setVisible(n),s.lockText.setVisible(n),s.base.setVisible(!n),s.img.setVisible(!n)}setUses(t,n){const s=this.boosters[t];s.uses=n,s.count.setText(String(n)),s.badge.setVisible(!s.locked&&n>0),s.plus.setVisible(!s.locked&&n<=0)}setPicking(t){var n,s;this.picking=t,(n=this.pickHint)==null||n.setVisible(t),(s=this.boosters[0])==null||s.frame.setVisible(t)}canWake(t,n){var r;const s=(r=this.sim.cols[t])==null?void 0:r[n];return!!s&&n<=2&&!this.sim.isActive(s,n)&&!s.pop&&s.dy!==null}useBooster(t){if(this.overlay||this.sim.state!=="play"||this.fanFx||this.shuffleFx)return;const n=this.boosters[t];if(this.sfx("click"),n.bump=1,t===0&&this.picking){this.setPicking(!1);return}if(n.locked){this.setPicking(!1),this.tweens.killTweensOf(this.lockHint),this.lockHint.setText(`Unlocks at Level ${Fr[t]}`).setAlpha(1),this.tweens.add({targets:this.lockHint,alpha:0,delay:1200,duration:300});return}if(!(n.uses<=0)){if(t===0){this.sim.cols.some((s,r)=>s.some((a,o)=>this.canWake(r,o)))&&this.setPicking(!0);return}this.setPicking(!1),t===1?this.sim.canShuffle()&&(this.setUses(t,n.uses-1),this.startShuffle()):this.sim.slots.some(Boolean)&&this.startFan()}}startShuffle(){for(const t of this.sim.cols)for(const n of t)n.bump=1;this.shuffleFx={t:0,swapped:!1}}stepShuffle(t){const n=this.shuffleFx;n.t+=t,this.sim.stepNestsOnly(t),!n.swapped&&n.t>=Or.focus&&(n.swapped=!0,this.sim.shuffle()),n.t>=Or.focus+Or.move&&this.endShuffle()}endShuffle(){this.shuffleFx=null}startFan(t=!1){const n=Vn.y-14,s=[this.add.rectangle(0,n,zt,Ut-n,0,.55).setOrigin(0).setDepth(Fe.shadows-.05),this.add.rectangle(0,0,zt,n,0,.55).setOrigin(0).setDepth(Fe.hud+.5)];for(const h of s)h.setAlpha(0),this.tweens.add({targets:h,alpha:1,duration:200});const r=this.add.image(Bt.x,-300,"bst_cannon").setDepth(Fe.hud+1);r.setOrigin(Hs.x/r.width,Hs.y/r.height),r.setScale(Ht.size/Math.max(r.width,r.height)).setData("s",r.scale),this.tweens.add({targets:r,y:Bt.y,duration:Ht.drop*1e3,ease:"Bounce.Out",onComplete:()=>r.setDepth(Fe.three-.1)});const a=this.sim,o=[];for(let h=0;h<_i;h++){if(!a.slots[h])continue;const[d,u]=a.slotPos(h);o.push({i:h,d:Math.hypot(d-Bt.x,u-Bt.y)})}o.sort((h,d)=>h.d-d.d);const c=Math.min(.06,1/Math.max(1,o.length)),l=new Map(o.map(({i:h},d)=>[h,d*c]));this.fanFx={t:0,blown:!1,leaving:!1,icon:r,dims:s,wind:this.add.graphics().setDepth(Fe.hud+.9),gusts:[],gustAcc:0,order:l,gap:c,shots:new Map,fired:new Set,free:t},this.sfx("click")}fanLift(t,n,s){const r=this.fanFx,a=r==null?void 0:r.order.get(t);if(!r||r.blown||a===void 0)return{x:n,y:s,e:0,ang:0,scale:1};const o=Dt.Clamp((r.t-Ht.drop-a)/Ht.suck,0,1),c=o*o,l=n,h=Bt.y+60,d=1-c;return{x:d*d*n+2*d*c*l+c*c*Bt.x,y:d*d*s+2*d*c*h+c*c*Bt.y,e:c,ang:o*6,scale:1-.85*c}}stepFan(t){const n=this.fanFx;if(n.t+=t,!n.blown&&n.t>Ht.drop*.8)for(n.gustAcc+=t*40;n.gustAcc>=1;n.gustAcc--){const c=Lt.cxL-40+Math.random()*(Lt.cxR-Lt.cxL+80),l=Lt.cy+(Math.random()-.5)*140;n.gusts.push({x:c,y:l,sx:c,sy:l,t:0,life:.35+Math.random()*.15,len:50+Math.random()*50})}for(let c=n.gusts.length-1;c>=0;c--){const l=n.gusts[c];l.t+=t;const h=Math.min(1,l.t/l.life)**2;l.x=l.sx+(Bt.x-l.sx)*h,l.y=l.sy+(Bt.y-l.sy)*h,l.t>l.life&&n.gusts.splice(c,1)}const r=n.icon.getData("s");let a=0;if(!n.blown)for(const[,c]of n.order){const l=(n.t-Ht.drop-c)/Ht.suck;l>.9&&l<1.15&&(a=Math.max(a,.05))}for(const[c,l]of n.shots){const h=this.shotAge(c,l);h>=0&&!n.fired.has(c)&&(n.fired.add(c),this.sfx("pop",.8)),h>=0&&h<.12&&(a=Math.max(a,.1*(1-h/.12)))}n.icon.setScale(r*(1+a),r*(1-a*.5));const o=Math.max(0,...n.order.values());!n.blown&&n.t>=Ht.drop+o+Ht.suck+.15&&this.blowFan(),n.blown&&!n.leaving&&!this.sim.flyers.length&&this.leaveFan()}shotAge(t,n){return t.t*t.dur-n*wc}blowFan(){const t=this.fanFx,n=this.sim,s=n.flyers.length;n.fan()&&!t.free&&this.setUses(2,this.boosters[2].uses-1),t.blown=!0,n.flyers.slice(s).forEach((r,a)=>{r.sx=Bt.x,r.sy=Bt.y,t.shots.set(r,a)})}leaveFan(){const t=this.fanFx;t.leaving=!0,t.icon.setDepth(Fe.hud+1),this.tweens.add({targets:t.icon,y:-300,duration:350,ease:"Back.In"}),this.tweens.add({targets:t.dims,alpha:0,duration:350,onComplete:()=>this.endFan()})}endFan(){const t=this.fanFx;if(t){this.tweens.killTweensOf([t.icon,...t.dims]),t.icon.destroy(),t.wind.destroy();for(const n of t.dims)n.destroy();this.fanFx=null}}drawWind(){const t=this.fanFx;if(!t)return;const n=t.wind.clear();for(const s of t.gusts){const r=s.t/s.life,a=Bt.x-s.sx,o=Bt.y-s.sy,c=Math.hypot(a,o)||1;n.lineStyle(6*(1-r*.5),16777215,.6*Math.sin(Math.PI*Math.min(1,r))),n.lineBetween(s.x,s.y,s.x-a/c*s.len,s.y-o/c*s.len)}}setSpeed(t){this.speedUp=t||this.autoFast,this.speedBtn.setTexture(t?"btn_speed_on":"btn_speed_off")}buildHud(){const t=Rc,n=Cc;this.add.image(t.x,t.y,"btn_settings").setOrigin(0).setDisplaySize(t.w,t.w*224/212).setDepth(Fe.hud).setInteractive({useHandCursor:!0}).on("pointerdown",()=>{this.overlay||(this.sfx("click"),this.showSettings())}),this.levelText=this.text(540,94,"Level 1",72,"#ffffff","#1b1a4a",12).setDepth(Fe.hud),this.speedBtn=this.add.image(n.x,n.y,"btn_speed_off").setOrigin(0).setDisplaySize(n.w,n.w*150/291).setDepth(Fe.hud).setInteractive({useHandCursor:!0}).on("pointerdown",()=>{this.overlay||this.autoFast||(this.sfx("click"),this.setSpeed(!this.speedUp))});const s=n.w/291;this.speedParts=[this.speedBtn,this.text(n.x+82*s,n.y+62*s,"x2",Math.round(50*s*291/190),"#2b2a6b",null).setDepth(Fe.hud+.1)]}setAutoFast(t){if(t!==this.autoFast){t&&(this.speedBefore=this.speedUp),this.autoFast=t,this.setSpeed(t||this.speedBefore);for(const n of this.speedParts)n.setVisible(!t)}}showWin(){const t=this.add.container(0,0).setDepth(Fe.overlay);t.add(this.add.image(0,0,"win_bg").setOrigin(0).setDisplaySize(zt,Ut).setInteractive());const n=(p,_,S)=>{p.setScale(0),t.add(p),this.tweens.add({targets:p,scale:_,duration:380,delay:S,ease:"Back.Out"})},s=880,r=this.add.image(540,s,"glow").setScale(2.6).setTint(16774856).setAlpha(0),a=this.add.image(540,s,"glow_rays").setScale(5.5).setAlpha(0);t.add([r,a]),this.tweens.add({targets:r,alpha:.75,duration:400}),this.tweens.add({targets:a,alpha:.35,duration:500}),this.tweens.add({targets:a,angle:360,duration:24e3,repeat:-1});const o=this.text(540,250,`Level ${this.levelIndex+1}`,64,"#ffffff","#1f4fa8",10).setAlpha(0);t.add(o),this.tweens.add({targets:o,alpha:1,duration:300,delay:100});const c=this.add.image(540,450,"amazing");n(c,1.15,150),this.tweens.add({targets:c,y:436,duration:900,delay:700,yoyo:!0,repeat:-1,ease:"Sine.InOut"}),n(this.add.image(540,s,"rewards"),1,400);const l=this.add.container(540,1170);l.add([this.add.image(-60,0,"icon_coin").setDisplaySize(84,95),this.text(36,-4,"+40",76,"#ffffff","#1f4fa8",12)]),n(l,1,650),this.addConfetti(t);const h=()=>this.startLevel((this.levelIndex+1)%Hn()),d=this.add.container(540,1400);d.add([this.add.image(0,0,"btn_reward"),this.add.image(-150,-52,"icon_ads").setDisplaySize(112,109).setAngle(-6),this.text(40,-56,"Claim x2",64,"#ffffff","#a8480a",10),this.add.image(-38,76,"icon_coin").setDisplaySize(48,54),this.text(26,74,"80",52,"#ffffff","#a8660a",8)]),n(this.tapTarget(d,517,304,h,"claim"),1,900);const u=this.add.container(540,1660);u.add([this.add.image(0,0,"btn_continue"),this.text(0,-8,"Continue",68,"#ffffff","#1f7a12",10)]),n(this.tapTarget(u,472,210,h,"continue"),.9,1050),this.overlayBox=t}demoTarget(t){var o;const[n,s]=t.split(":");if(n==="booster"){const c=+s,l=io[c];return{x:l.x,y:l.y-6,tap:()=>this.useBooster(c)}}if(n==="nest"){const[c,l]=s.split(",").map(Number),h=(o=this.sim.cols[c])==null?void 0:o[l];if(!h||h.dx===null||h.dy===null)return null;const d=h.dx,u=h.dy;return{x:d,y:u,tap:()=>this.onDown({x:d,y:u},[])}}const r=this.taps.get(t);if(!r||!r.c.active||r.c.scale<.85)return null;const a=r.c.getBounds();return{x:a.centerX,y:a.centerY,tap:r.onTap}}tapTarget(t,n,s,r,a){return a&&this.taps.set(a,{c:t,onTap:r}),t.setSize(n,s).setInteractive({useHandCursor:!0}).on("pointerdown",()=>{this.sfx("click"),r()})}addConfetti(t){const n=[5231103,16734810,16769357,8257386,16747224,16777215,5930495,16752430];if(!this.textures.exists("streamer")){const a=this.make.graphics({},!1).lineStyle(5,16777215);a.beginPath(),a.moveTo(10,4);for(let o=4;o<=156;o+=4)a.lineTo(10+Math.sin(o/16)*7,o);a.strokePath(),a.generateTexture("streamer",22,160),a.destroy()}const s=(a,o=1)=>{const c=a.x,l=Dt.Between(2600,4800)*o;t.add(a),this.tweens.add({targets:a,y:Ut+80,duration:l,delay:Dt.Between(0,3e3),repeat:-1}),this.tweens.add({targets:a,x:c+Dt.Between(-60,60),duration:Dt.Between(700,1300),yoyo:!0,repeat:-1,ease:"Sine.InOut"}),this.tweens.add({targets:a,angle:Dt.Between(-400,400),duration:l,repeat:-1})},r=()=>[Dt.Between(10,zt-10),Dt.Between(-400,-40)];for(let a=0;a<110;a++){const o=this.add.image(...r(),"confetti_ribbon").setTint(Qs.Array.GetRandom(n));o.setDisplaySize(Dt.Between(7,11),Dt.Between(20,34)),s(o),this.tweens.add({targets:o,scaleX:-o.scaleX,duration:Dt.Between(250,500),yoyo:!0,repeat:-1})}for(let a=0;a<26;a++){const o=this.add.image(...r(),"confetti_star").setTint(Qs.Array.GetRandom([16777215,16777215,16769357,8381439]));o.setDisplaySize(...(()=>{const c=Dt.Between(26,44);return[c,c]})()),s(o,1.2)}for(let a=0;a<20;a++)s(this.add.image(...r(),"confetti",Dt.Between(0,24)).setScale(Dt.FloatBetween(.4,.7)));for(let a=0;a<6;a++)s(this.add.image(...r(),"streamer").setTint(Qs.Array.GetRandom(n)).setScale(1.4),1.5)}closeOverlay(){var t,n;this.overlayBox&&this.tweens.killTweensOf(this.overlayBox.getAll()),(t=this.overlayBox)==null||t.each(s=>{s instanceof Ic.Container&&this.tweens.killTweensOf(s.getAll())}),(n=this.overlayBox)==null||n.destroy(),this.overlayBox=void 0,this.overlay=null,this.paused=!1}showStart(){this.overlay="start";const t=this.add.container(0,0).setDepth(Fe.overlay),n=this.add.rectangle(0,0,zt,Ut,2627856,.45).setOrigin(0).setInteractive();n.on("pointerdown",()=>{this.started=!0,this.closeOverlay(),this.playMusic()}),t.add([n,this.text(540,960,"Tap to play",80),this.text(540,1050,"Swipe the sand to set it free",38,"#fffbe8","#5a3a20",6)]),t.add(this.text(zt-20,Ut-24,"latest",24,"#fffbe8",null).setOrigin(1,.5)),this.overlayBox=t}playMusic(){this.prefs.music&&(this.music??(this.music=this.sound.add("music",{loop:!0,volume:.3})),this.music.isPlaying||this.music.play())}setPref(t,n){var s,r;this.prefs[t]=n;try{localStorage.setItem(Sl,JSON.stringify(this.prefs))}catch{}t==="music"&&(n?this.playMusic():(s=this.music)==null||s.stop()),t==="vibe"&&n&&((r=navigator.vibrate)==null||r.call(navigator,30))}showSettings(){this.overlay="settings",this.paused=!0;const t=this.add.container(0,0).setDepth(Fe.overlay);t.add(this.add.rectangle(0,0,zt,Ut,659488,.62).setOrigin(0).setInteractive());const n=this.add.container(540,960-Ut*.1).setScale(.8);t.add(n);const s=888,r=-1098/2;n.add(this.add.image(0,0,"set_board")),n.add(this.text(0,r+98,"Pause",84,"#ffffff","#1d2a44",12)),n.add(this.artButton(s/2-70,r+96,"set_btn_close",1,null,"",()=>this.closeOverlay())),["music","sound","vibe"].forEach((l,h)=>{const d=this.add.container((h-1)*240,r+300),u=()=>{d.removeAll(!0);const p=this.prefs[l],_=this.add.image(0,-10,`set_${l}_${p?"on":"off"}`);_.setScale((p?118:150)/Math.max(_.width,_.height)),d.add([this.add.image(0,0,p?"set_btn_blue":"set_btn_gray").setScale(.8),_])};u(),d.setSize(204,220).setInteractive({useHandCursor:!0}).on("pointerdown",()=>{this.setPref(l,!this.prefs[l]),this.sfx("click"),u()}),n.add(d)}),n.add(this.artButton(0,r+520,"set_btn_green",.8,"set_icon_retry","Restart",()=>this.startLevel(this.levelIndex))),n.add(this.artButton(0,r+712,"set_btn_red",.8,"set_icon_home","Home",()=>this.goHome())),n.add(this.text(0,r+846,"Cheat: go to level",38,"#33507e",null));const a=5,o=88,c=16;for(let l=0;l<Hn();l++){const h=this.add.container(-252+o/2+l%a*(o+c),r+912+Math.floor(l/a)*98);h.add([this.add.image(0,0,l===this.levelIndex?"set_btn_gray":"set_btn_blue").setScale(.34),this.text(0,-6,String(l+1),38,"#ffffff","#1d2a44",7)]),h.setSize(o,94).setInteractive({useHandCursor:!0}).on("pointerdown",()=>{this.sfx("click"),this.startLevel(l)}),n.add(h)}this.overlayBox=t}artButton(t,n,s,r,a,o,c){const l=this.add.container(t,n),h=this.add.image(0,0,s).setScale(r);if(l.add(h),a){const d=this.add.image(o?-h.displayWidth/2+78:0,-8,a);d.setScale(80/Math.max(d.width,d.height)),l.add(d)}return o&&l.add(this.text(a?36:0,-10,o,60,"#ffffff","#1d2a44",10)),l.setSize(h.displayWidth,h.displayHeight).setInteractive({useHandCursor:!0}).on("pointerdown",()=>{this.sfx("click"),c()}),l}goHome(){if(/\/demo\/(index\.html)?$/.test(location.pathname)){location.href="../";return}this.started=!1,this.startLevel(0),this.showStart()}showEnd(){this.overlay="end",this.swiping=!1,this.sim.state==="win"?this.showWin():this.showOutOfSpace()}losePanel(t,n){const s=this.add.container(0,0).setDepth(Fe.overlay);s.add(this.add.rectangle(0,0,zt,Ut,660528,.6).setOrigin(0).setInteractive());const r=this.add.container(540,940);return r.add([this.add.image(0,0,"lose_lose_board"),this.text(0,-452,t,76,"#ffffff","#0a3a8a",12),this.add.image(408,-500,"lose_btn_close").setScale(.9).setInteractive({useHandCursor:!0}).on("pointerdown",()=>{this.sfx("click"),n()})]),r.setScale(.8),this.tweens.add({targets:r,scale:1,duration:300,ease:"Back.Out"}),s.add(r),this.overlayBox=s,r}showOutOfSpace(){const t=this.losePanel("Out of Space!",()=>{this.closeOverlay(),this.overlay="end",this.showFailed()});t.add(this.add.image(0,-150,"lose_heart_break").setScale(.85)),t.add(this.text(0,20,"The conveyor is full!",46,"#1f4fa8",null)),t.add(this.text(0,140,"Clear it and keep playing?",40,"#3a5a8a",null));const n=()=>{this.closeOverlay(),this.sim.revive(),this.startFan(!0)},s=this.add.container(-170,300);s.add([this.add.image(0,0,"lose_btn_rv").setScale(.66),this.add.image(-70,-12,"lose_icon_rv").setDisplaySize(84,85),this.text(42,-14,"Free",58,"#ffffff","#a8480a",10)]);const r=this.add.container(170,300);r.add([this.add.image(0,0,"lose_btn_purchase").setScale(.8),this.add.image(-66,-12,"lose_icon_coin").setDisplaySize(64,70),this.text(38,-14,"900",58,"#ffffff","#1f7a12",10)]),t.add([this.tapTarget(s,323,194,n,"free"),this.tapTarget(r,319,196,n,"coins")])}showFailed(){const t=()=>this.startLevel(this.levelIndex),n=this.losePanel(`Level ${this.levelIndex+1}`,t);for(let o=0;o<5;o++)n.add(this.add.image((o-2)*132,-192,o<4?"lose_heart":"lose_heart_blank").setDisplaySize(124,122));const s=this.text(40,-26,"30:00",60,"#ffffff","#0a3a8a",10);n.add([this.add.image(0,-24,"lose_heart_timebox").setScale(.9),this.add.image(-110,-26,"lose_heart").setDisplaySize(82,81),s]);let r=30*60;this.tweens.add({targets:s,alpha:1,duration:1e3,repeat:-1,onRepeat:()=>{r=Math.max(0,r-1),s.setText(`${Math.floor(r/60)}:${String(r%60).padStart(2,"0")}`)}}),n.add(this.text(0,150,"Level failed!",58,"#1f5fc8",null));const a=this.add.container(0,330);a.add([this.add.image(0,0,"lose_btn_try_again"),this.text(0,-10,"Try Again",70,"#ffffff","#1f7a12",10)]),n.add(this.tapTarget(a,471,210,t,"try"))}onDown(t,n){if(!(this.overlay||n.length||this.sim.state!=="play"||this.fanFx)){if(this.picking){const s=this.sim;s.cols.forEach((r,a)=>r.forEach((o,c)=>{!this.picking||!this.canWake(a,c)||Math.abs(t.x-o.dx)>Ai/2||Math.abs(t.y-o.dy)>Ai/2||s.activate(a,c)&&this.setUses(0,this.boosters[0].uses-1)})),this.setPicking(!1);return}this.swiping=!0,this.sim.endSwipe(),this.sim.swipeTo(t.x,t.y)}}sfx(t,n=.7){var r;const s=performance.now();this.lastSfx[t]&&s-this.lastSfx[t]<60||(this.lastSfx[t]=s,this.prefs.vibe&&Ml[t]&&((r=navigator.vibrate)==null||r.call(navigator,Ml[t])),!(this.sound.locked||!this.prefs.sound)&&this.sound.play(t,{volume:n}))}startCapture(t){const n=this.game,s=1e3/Br;this.capture=!0,n.loop.sleep(),this.started=!0,this.closeOverlay();let r=this.time.now;window.__capture={fps:Br,frames:Math.round(t*Br),step(a=1){for(let o=0;o<a;o++)r+=s,n.step(r,s)}}}exposeTestHook(){const t=this;window.__cf={get state(){return t.sim},levelOverride:Pc,start(n){t.started=!0,t.startLevel(n)},sim(n){for(let s=0;s<n;s+=1/60)t.sim.update(1/60);t.render()},win(){t.sim.state="win",t.sim.endT=1},bot(n=300){return t.started=!0,Cg(t.sim,n)},autoplay(n=!0,s=2,r){t.autoplay=n,t.moves=r??null,t.moveAt=0,t.replayAcc=0,t.replayFrame=0,n&&(r&&t.startLevel(t.levelIndex),t.started=!0,t.closeOverlay()),t.setSpeed(n&&s>1)},hold(n=!0){t.paused=n},booster(n,s=0,r=1){return n===0?t.sim.activate(s,r):n===1?t.sim.shuffle():t.sim.fan()},swipeCells(n){const s=t.sim;s.endSwipe();for(const[r,a]of n)s.swipeTo(so.x+(r+.5)*s.cell,so.y+(a+.5)*s.cell);s.endSwipe()}}}}const zg={type:Nc,title:"Colony Flow Sand",backgroundColor:"#f6c48e",scale:{mode:ao.FIT,autoCenter:ao.CENTER_BOTH,parent:"game-container",width:zt,height:Ut},scene:[Rg,Bg]};new Uc(zg);
