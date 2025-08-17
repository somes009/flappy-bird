//获取窗口大小
function getViewportOffset() {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
    };
  } else {
    if (document.compatMode === "BackCompat") {
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight,
      };
    } else {
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      };
    }
  }
}

//获取滚动条所处位置
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    };
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop,
    };
  }
}

//获取元素距文档边框的距离
function getElementPosition(elem) {
  var left = 0,
    top = 0,
    borderLeft = 0,
    borderTop = 0;
  while (elem.offsetParent) {
    left += elem.offsetLeft + borderLeft;
    top += elem.offsetTop + borderTop;
    elem = elem.offsetParent;
    borderLeft = parseInt(getStyle(elem, "borderLeftWidth"));
    borderTop = parseInt(getStyle(elem, "borderTopWidth"));
  }
  return {
    left: left,
    top: top,
  };
}

//获取元素css属性
function getStyle(elem, prop) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(elem, null)[prop];
  } else {
    return elem.currentStyle[prop];
  }
}

//事件处理函数
function addEvent(elem, type, handle, stream) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handle, stream);
  } else if (elem.attachEvent) {
    elem.attachEvent("on" + type, function () {
      handle.call(elem);
    });
  } else {
    elem["on" + type] = handle;
  }
}

//取消事件函数

function delEvent(elem, type, handle, stream) {
  if (elem.addEventListener) {
    elem.removeEventListener(type, handle, stream);
  } else if (elem.attachEvent) {
    elem.detachEvent("on" + type, function () {
      handle();
    });
  } else {
    elem["on" + type] = false;
  }
}

//深度继承函数
function deepClone(Origin, Target) {
  Target = Target || {};
  var toStr = Object.prototype.toString,
    arrStr = "[object Array]";
  for (var prop in Origin) {
    if (Origin.hasOwnProperty(prop)) {
      if (Origin[prop] === null) {
        Target[prop] = Origin[prop];
      } else if (typeof Origin[prop] === "object") {
        Target[prop] = toStr.call(Origin[prop]) === arrStr ? [] : {};
        deepClone(Origin[prop], Target[prop]);
      } else {
        Target[prop] = Origin[prop];
      }
    }
  }
  return Target;
}

//取消冒泡函数
function stopBubble(event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
}

//取消默认事件函数
function cancelHandle(event) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}

//异步加载script函数(需要按需执行函数时使用,此函数可以根据自己的需求来改动)
/*
 * @param url script文件的地址
 * @param callback 回调函数:在需要的时候再调用的函数
 * 1.callback在传实参时用下列方法传
 *     function () {
 *           callback();
 *     }
 * 2.在引用的script里用对来装方法,callback写成字符串形式,loadScript里通过对象调用callback函数
 */
function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  if (script.readyState) {
    if (script.readyState === "complete" || script.readyState === "loaded") {
      callback();
    }
  } else {
    script.onload = function () {
      callback();
    };
  }
  document.head.appendChild(script);
}

//创建新元素
function creataEle(eleName, classArr, cssObj) {
  var ele = document.createElement(eleName);
  for (let i = 0, len = classArr.length; i < len; i++) {
    ele.classList.add(classArr[i]);
  }
  for (var key in cssObj) {
    ele.style[key] = cssObj[key];
  }
  return ele;
}
