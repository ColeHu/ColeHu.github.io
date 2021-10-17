!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e||self).threePathfinding={},e.THREE)}(this,function(e,t){function r(e,t){return r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},r(e,t)}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var o=0;return function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=function(){function e(){}return e.roundNumber=function(e,t){var r=Math.pow(10,t);return Math.round(e*r)/r},e.sample=function(e){return e[Math.floor(Math.random()*e.length)]},e.distanceToSquared=function(e,t){var r=e.x-t.x,n=e.y-t.y,o=e.z-t.z;return r*r+n*n+o*o},e.isPointInPoly=function(e,t){for(var r=!1,n=-1,o=e.length,i=o-1;++n<o;i=n)(e[n].z<=t.z&&t.z<e[i].z||e[i].z<=t.z&&t.z<e[n].z)&&t.x<(e[i].x-e[n].x)*(t.z-e[n].z)/(e[i].z-e[n].z)+e[n].x&&(r=!r);return r},e.isVectorInPolygon=function(e,t,r){var n=1e5,o=-1e5,i=[];return t.vertexIds.forEach(function(e){n=Math.min(r[e].y,n),o=Math.max(r[e].y,o),i.push(r[e])}),!!(e.y<o+.5&&e.y>n-.5&&this.isPointInPoly(i,e))},e.triarea2=function(e,t,r){return(r.x-e.x)*(t.z-e.z)-(t.x-e.x)*(r.z-e.z)},e.vequal=function(e,t){return this.distanceToSquared(e,t)<1e-5},e.mergeVertices=function(e,r){void 0===r&&(r=1e-4),r=Math.max(r,Number.EPSILON);for(var n={},o=e.getIndex(),i=e.getAttribute("position"),s=o?o.count:i.count,a=0,u=[],h=[],c=Math.log10(1/r),f=Math.pow(10,c),l=0;l<s;l++){var p=o?o.getX(l):l,d="";d+=~~(i.getX(p)*f)+",",d+=~~(i.getY(p)*f)+",",(d+=~~(i.getZ(p)*f)+",")in n?u.push(n[d]):(h.push(i.getX(p)),h.push(i.getY(p)),h.push(i.getZ(p)),n[d]=a,u.push(a),a++)}var v=new t.BufferAttribute(new Float32Array(h),i.itemSize,i.normalized),g=new t.BufferGeometry;return g.setAttribute("position",v),g.setIndex(u),g},e}(),a=function(){function e(e){this.content=[],this.scoreFunction=e}var t=e.prototype;return t.push=function(e){this.content.push(e),this.sinkDown(this.content.length-1)},t.pop=function(){var e=this.content[0],t=this.content.pop();return this.content.length>0&&(this.content[0]=t,this.bubbleUp(0)),e},t.remove=function(e){var t=this.content.indexOf(e),r=this.content.pop();t!==this.content.length-1&&(this.content[t]=r,this.scoreFunction(r)<this.scoreFunction(e)?this.sinkDown(t):this.bubbleUp(t))},t.size=function(){return this.content.length},t.rescoreElement=function(e){this.sinkDown(this.content.indexOf(e))},t.sinkDown=function(e){for(var t=this.content[e];e>0;){var r=(e+1>>1)-1,n=this.content[r];if(!(this.scoreFunction(t)<this.scoreFunction(n)))break;this.content[r]=t,this.content[e]=n,e=r}},t.bubbleUp=function(e){for(var t=this.content.length,r=this.content[e],n=this.scoreFunction(r);;){var o=e+1<<1,i=o-1,s=null,a=void 0;if(i<t&&(a=this.scoreFunction(this.content[i]))<n&&(s=i),o<t&&this.scoreFunction(this.content[o])<(null===s?n:a)&&(s=o),null===s)break;this.content[e]=this.content[s],this.content[s]=r,e=s}},e}(),u=function(){function e(){}return e.init=function(e){for(var t=0;t<e.length;t++){var r=e[t];r.f=0,r.g=0,r.h=0,r.cost=1,r.visited=!1,r.closed=!1,r.parent=null}},e.cleanUp=function(e){for(var t=0;t<e.length;t++){var r=e[t];delete r.f,delete r.g,delete r.h,delete r.cost,delete r.visited,delete r.closed,delete r.parent}},e.heap=function(){return new a(function(e){return e.f})},e.search=function(e,t,r){this.init(e);var n=this.heap();for(n.push(t);n.size()>0;){var o=n.pop();if(o===r){for(var i=o,s=[];i.parent;)s.push(i),i=i.parent;return this.cleanUp(s),s.reverse()}o.closed=!0;for(var a=this.neighbours(e,o),u=0,h=a.length;u<h;u++){var c=a[u];if(!c.closed){var f=o.g+c.cost,l=c.visited;if(!l||f<c.g){if(c.visited=!0,c.parent=o,!c.centroid||!r.centroid)throw new Error("Unexpected state");c.h=c.h||this.heuristic(c.centroid,r.centroid),c.g=f,c.f=c.g+c.h,l?n.rescoreElement(c):n.push(c)}}}}return[]},e.heuristic=function(e,t){return s.distanceToSquared(e,t)},e.neighbours=function(e,t){for(var r=[],n=0;n<t.neighbours.length;n++)r.push(e[t.neighbours[n]]);return r},e}(),h=function(){function e(){}return e.buildZone=function(e,r){var n=this,o=this._buildNavigationMesh(e,r),i={};o.vertices.forEach(function(e){e.x=s.roundNumber(e.x,2),e.y=s.roundNumber(e.y,2),e.z=s.roundNumber(e.z,2)}),i.vertices=o.vertices;var a=this._buildPolygonGroups(o);return i.groups=new Array(a.length),a.forEach(function(e,r){var o=new Map;e.forEach(function(e,t){o.set(e,t)});var a=new Array(e.length);e.forEach(function(e,r){var u=[];e.neighbours.forEach(function(e){return u.push(o.get(e))});var h=[];e.neighbours.forEach(function(t){return h.push(n._getSharedVerticesInOrder(e,t))});var c=new t.Vector3(0,0,0);c.add(i.vertices[e.vertexIds[0]]),c.add(i.vertices[e.vertexIds[1]]),c.add(i.vertices[e.vertexIds[2]]),c.divideScalar(3),c.x=s.roundNumber(c.x,2),c.y=s.roundNumber(c.y,2),c.z=s.roundNumber(c.z,2),a[r]={id:r,neighbours:u,vertexIds:e.vertexIds,centroid:c,portals:h}}),i.groups[r]=a}),i},e._buildNavigationMesh=function(e,t){return e=s.mergeVertices(e,t),this._buildPolygonsFromGeometry(e)},e._spreadGroupId=function(e){for(var t=new Set([e]);t.size>0;){var r=t;t=new Set,r.forEach(function(r){r.group=e.group,r.neighbours.forEach(function(e){void 0===e.group&&t.add(e)})})}},e._buildPolygonGroups=function(e){var t=this,r=[];return e.polygons.forEach(function(e){void 0!==e.group?r[e.group].push(e):(e.group=r.length,t._spreadGroupId(e),r.push([e]))}),r},e._buildPolygonNeighbours=function(e,t){var r=new Set,n=t[e.vertexIds[1]],o=t[e.vertexIds[2]];return t[e.vertexIds[0]].forEach(function(t){t!==e&&(n.includes(t)||o.includes(t))&&r.add(t)}),n.forEach(function(t){t!==e&&o.includes(t)&&r.add(t)}),r},e._buildPolygonsFromGeometry=function(e){for(var r=this,n=[],o=[],i=e.attributes.position,s=e.index,a=[],u=0;u<i.count;u++)o.push((new t.Vector3).fromBufferAttribute(i,u)),a[u]=[];for(var h=0;h<e.index.count;h+=3){var c=s.getX(h),f=s.getX(h+1),l=s.getX(h+2),p={vertexIds:[c,f,l],neighbours:null};n.push(p),a[c].push(p),a[f].push(p),a[l].push(p)}return n.forEach(function(e){e.neighbours=r._buildPolygonNeighbours(e,a)}),{polygons:n,vertices:o}},e._getSharedVerticesInOrder=function(e,t){var r=e.vertexIds,n=r[0],o=r[1],i=r[2],s=t.vertexIds,a=s.includes(n),u=s.includes(o),h=s.includes(i);return a&&u&&h?Array.from(r):a&&u?[n,o]:u&&h?[o,i]:a&&h?[i,n]:(console.warn("Error processing navigation mesh neighbors; neighbors with <2 shared vertices found."),[])},e}(),c=function(){function e(){this.portals=[]}var t=e.prototype;return t.push=function(e,t){void 0===t&&(t=e),this.portals.push({left:e,right:t})},t.stringPull=function(){var e,t,r,n=this.portals,o=[],i=0,a=0,u=0;t=n[0].left,r=n[0].right,o.push(e=n[0].left);for(var h=1;h<n.length;h++){var c=n[h].left,f=n[h].right;if(s.triarea2(e,r,f)<=0){if(!(s.vequal(e,r)||s.triarea2(e,t,f)>0)){o.push(t),t=e=t,r=e,a=i=a,u=i,h=i;continue}r=f,u=h}if(s.triarea2(e,t,c)>=0){if(!(s.vequal(e,t)||s.triarea2(e,r,c)<0)){o.push(r),t=e=r,r=e,a=i=u,u=i,h=i;continue}t=c,a=h}}return 0!==o.length&&s.vequal(o[o.length-1],n[n.length-1].left)||o.push(n[n.length-1].left),this.path=o,o},e}(),f=function(){function e(){this.zones={}}e.createZone=function(e,t){return void 0===t&&(t=1e-4),h.buildZone(e,t)};var r=e.prototype;return r.setZoneData=function(e,t){this.zones[e]=t},r.getRandomNode=function(e,r,n,o){if(!this.zones[e])return new t.Vector3;n=n||null,o=o||0;var i=[];return this.zones[e].groups[r].forEach(function(e){n&&o?s.distanceToSquared(n,e.centroid)<o*o&&i.push(e.centroid):i.push(e.centroid)}),s.sample(i)||new t.Vector3},r.getClosestNode=function(e,t,r,n){void 0===n&&(n=!1);var o=this.zones[t].vertices,i=null,a=Infinity;return this.zones[t].groups[r].forEach(function(t){var r=s.distanceToSquared(t.centroid,e);r<a&&(!n||s.isVectorInPolygon(e,t,o))&&(i=t,a=r)}),i},r.findPath=function(e,r,n,o){var i=this.zones[n].groups[o],s=this.zones[n].vertices,a=this.getClosestNode(e,n,o,!0),h=this.getClosestNode(r,n,o,!0);if(!a||!h)return null;var f=u.search(i,a,h),l=function(e,t){for(var r=0;r<e.neighbours.length;r++)if(e.neighbours[r]===t.id)return e.portals[r]},p=new c;p.push(e);for(var d=0;d<f.length;d++){var v=f[d+1];if(v){var g=l(f[d],v);p.push(s[g[0]],s[g[1]])}}p.push(r),p.stringPull();var y=p.path.map(function(e){return new t.Vector3(e.x,e.y,e.z)});return y.shift(),y},e}();f.prototype.getGroup=(i=new t.Plane,function(e,t,r){if(void 0===r&&(r=!1),!this.zones[e])return null;for(var n=null,a=Math.pow(50,2),u=this.zones[e],h=0;h<u.groups.length;h++)for(var c,f=o(u.groups[h]);!(c=f()).done;){var l=c.value;if(r&&(i.setFromCoplanarPoints(u.vertices[l.vertexIds[0]],u.vertices[l.vertexIds[1]],u.vertices[l.vertexIds[2]]),Math.abs(i.distanceToPoint(t))<.01&&s.isPointInPoly([u.vertices[l.vertexIds[0]],u.vertices[l.vertexIds[1]],u.vertices[l.vertexIds[2]]],t)))return h;var p=s.distanceToSquared(l.centroid,t);p<a&&(n=h,a=p)}return n}),f.prototype.clampStep=function(){var e,r,n=new t.Vector3,o=new t.Plane,i=new t.Triangle,s=new t.Vector3,a=new t.Vector3;return function(t,u,h,c,f,l){var p=this.zones[c].vertices,d=this.zones[c].groups[f],v=[h],g={};g[h.id]=0,e=void 0,a.set(0,0,0),r=Infinity,o.setFromCoplanarPoints(p[h.vertexIds[0]],p[h.vertexIds[1]],p[h.vertexIds[2]]),o.projectPoint(u,n),s.copy(n);for(var y=v.pop();y;y=v.pop()){i.set(p[y.vertexIds[0]],p[y.vertexIds[1]],p[y.vertexIds[2]]),i.closestPointToPoint(s,n),n.distanceToSquared(s)<r&&(e=y,a.copy(n),r=n.distanceToSquared(s));var b=g[y.id];if(!(b>2))for(var m=0;m<y.neighbours.length;m++){var M=d[y.neighbours[m]];M.id in g||(v.push(M),g[M.id]=b+1)}}return l.copy(a),e}}();var l={PLAYER:new t.Color(15631215).convertGammaToLinear(2.2).getHex(),TARGET:new t.Color(14469912).convertGammaToLinear(2.2).getHex(),PATH:new t.Color(41903).convertGammaToLinear(2.2).getHex(),WAYPOINT:new t.Color(41903).convertGammaToLinear(2.2).getHex(),CLAMPED_STEP:new t.Color(14472114).convertGammaToLinear(2.2).getHex(),CLOSEST_NODE:new t.Color(4417387).convertGammaToLinear(2.2).getHex()},p=function(e){var n,o;function i(){var r;return(r=e.call(this)||this)._playerMarker=new t.Mesh(new t.SphereBufferGeometry(1,32,32),new t.MeshBasicMaterial({color:l.PLAYER})),r._targetMarker=new t.Mesh(new t.BoxBufferGeometry(.3,.3,.3),new t.MeshBasicMaterial({color:l.TARGET})),r._nodeMarker=new t.Mesh(new t.BoxBufferGeometry(.1,.8,.1),new t.MeshBasicMaterial({color:l.CLOSEST_NODE})),r._stepMarker=new t.Mesh(new t.BoxBufferGeometry(.1,1,.1),new t.MeshBasicMaterial({color:l.CLAMPED_STEP})),r._pathMarker=new t.Object3D,r._pathLineMaterial=new t.LineBasicMaterial({color:l.PATH,linewidth:2}),r._pathPointMaterial=new t.MeshBasicMaterial({color:l.WAYPOINT}),r._pathPointGeometry=new t.SphereBufferGeometry(.08),r._markers=[r._playerMarker,r._targetMarker,r._nodeMarker,r._stepMarker,r._pathMarker],r._markers.forEach(function(e){e.visible=!1,r.add(e)}),r}o=e,(n=i).prototype=Object.create(o.prototype),n.prototype.constructor=n,r(n,o);var s=i.prototype;return s.setPath=function(e){for(;this._pathMarker.children.length;)this._pathMarker.children[0].visible=!1,this._pathMarker.remove(this._pathMarker.children[0]);e=[this._playerMarker.position].concat(e);var r=new t.BufferGeometry;r.setAttribute("position",new t.BufferAttribute(new Float32Array(3*e.length),3));for(var n=0;n<e.length;n++)r.attributes.position.setXYZ(n,e[n].x,e[n].y+.2,e[n].z);this._pathMarker.add(new t.Line(r,this._pathLineMaterial));for(var o=0;o<e.length-1;o++){var i=new t.Mesh(this._pathPointGeometry,this._pathPointMaterial);i.position.copy(e[o]),i.position.y+=.2,this._pathMarker.add(i)}return this._pathMarker.visible=!0,this},s.setPlayerPosition=function(e){return this._playerMarker.position.copy(e),this._playerMarker.visible=!0,this},s.setTargetPosition=function(e){return this._targetMarker.position.copy(e),this._targetMarker.visible=!0,this},s.setNodePosition=function(e){return this._nodeMarker.position.copy(e),this._nodeMarker.visible=!0,this},s.setStepPosition=function(e){return this._stepMarker.position.copy(e),this._stepMarker.visible=!0,this},s.reset=function(){for(;this._pathMarker.children.length;)this._pathMarker.children[0].visible=!1,this._pathMarker.remove(this._pathMarker.children[0]);return this._markers.forEach(function(e){e.visible=!1}),this},i}(t.Object3D);e.Pathfinding=f,e.PathfindingHelper=p});
//# sourceMappingURL=three-pathfinding.umd.js.map
